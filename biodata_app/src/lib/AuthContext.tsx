import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// ─── Dev Storage Constants & Helpers ──────────────────────────────────────────

const DEV_SESSION_KEY = 'biocraft_dev_session_v1';

interface StoredDevSession {
  user: User;
  profile: UserProfile;
  session: Session;
}

async function getStoredDevSession(): Promise<StoredDevSession | null> {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(DEV_SESSION_KEY);
      return raw ? (JSON.parse(raw) as StoredDevSession) : null;
    }
    const raw = await AsyncStorage.getItem(DEV_SESSION_KEY);
    return raw ? (JSON.parse(raw) as StoredDevSession) : null;
  } catch {
    return null;
  }
}

async function saveStoredDevSession(data: StoredDevSession): Promise<void> {
  try {
    const raw = JSON.stringify(data);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.setItem(DEV_SESSION_KEY, raw);
      return;
    }
    await AsyncStorage.setItem(DEV_SESSION_KEY, raw);
  } catch (err) {
    console.warn('[BioCraft Auth] Failed to save dev session:', err);
  }
}

async function removeStoredDevSession(): Promise<void> {
  try {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.removeItem(DEV_SESSION_KEY);
      return;
    }
    await AsyncStorage.removeItem(DEV_SESSION_KEY);
  } catch (err) {
    console.warn('[BioCraft Auth] Failed to remove dev session:', err);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthContextValue {
  /** null = unauthenticated, User = authenticated */
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  /** true while the initial session is being restored */
  isLoading: boolean;
  /** true if the active user is an offline/local dev account */
  isDevUser: boolean;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: AuthError | null; needsEmailVerification: boolean }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  /** Direct dev signup / sign in without storing or checking with Supabase */
  signInWithDev: (options?: { fullName?: string; email?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isDevUser = Boolean(user?.id?.startsWith('dev-'));

  // ── Fetch user profile from Supabase ──────────────────────────────────────
  const fetchProfile = useCallback(async (userId: string) => {
    if (userId.startsWith('dev-')) {
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
      }
    } catch {
      // Profile table may not exist yet — silently ignore
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user?.id && !user.id.startsWith('dev-')) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  // ── Bootstrap: restore session once on mount ──────────────────────────────
  useEffect(() => {
    let isMounted = true;

    const restore = async () => {
      // 1. Check for stored dev session first (offline / bypassed)
      const storedDev = await getStoredDevSession();
      if (!isMounted) return;

      if (storedDev?.user) {
        setSession(storedDev.session);
        setUser(storedDev.user);
        setProfile(storedDev.profile);
        setIsLoading(false);
        return;
      }

      // 2. Fall back to Supabase session
      supabase.auth.getSession().then(({ data: { session: s } }) => {
        if (!isMounted) return;
        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) {
          fetchProfile(s.user.id).finally(() => {
            if (isMounted) setIsLoading(false);
          });
        } else {
          setIsLoading(false);
        }
      });
    };

    restore();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, s) => {
        if (!isMounted) return;
        // If a dev session is stored, do not let Supabase empty state overwrite it
        const storedDev = await getStoredDevSession();
        if (storedDev?.user) return;

        setSession(s);
        setUser(s?.user ?? null);
        if (s?.user?.id) {
          fetchProfile(s.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  // ── Sign Up with Supabase ─────────────────────────────────────────────────
  const signUp = useCallback(
    async (email: string, password: string, fullName: string) => {
      // Clear any leftover dev session before normal Supabase sign up
      await removeStoredDevSession();

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { full_name: fullName.trim() },
        },
      });

      if (error) {
        return { error, needsEmailVerification: false };
      }

      // If session is null but user exists → email confirmation required
      const needsEmailVerification =
        !!data.user && !data.session;

      return { error: null, needsEmailVerification };
    },
    []
  );

  // ── Sign In with Supabase ─────────────────────────────────────────────────
  const signIn = useCallback(async (email: string, password: string) => {
    // Clear any leftover dev session before normal Supabase sign in
    await removeStoredDevSession();

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    return { error: error ?? null };
  }, []);

  // ── Direct Sign In / Sign Up with Dev Account (Bypasses Supabase) ─────────
  const signInWithDev = useCallback(
    async (options?: { fullName?: string; email?: string }) => {
      const devName = options?.fullName?.trim() || 'Dev User';
      const devEmail = options?.email?.trim().toLowerCase() || 'dev@biocraft.app';
      const now = new Date().toISOString();

      const devUser: User = {
        id: 'dev-user-001',
        app_metadata: { provider: 'dev' },
        user_metadata: { full_name: devName },
        aud: 'authenticated',
        confirmation_sent_at: now,
        recovery_sent_at: '',
        email_change_sent_at: '',
        new_email: '',
        invited_at: '',
        action_link: '',
        email: devEmail,
        phone: '',
        created_at: now,
        confirmed_at: now,
        email_confirmed_at: now,
        phone_confirmed_at: '',
        last_sign_in_at: now,
        role: 'authenticated',
        updated_at: now,
      };

      const devProfile: UserProfile = {
        id: 'dev-user-001',
        full_name: devName,
        created_at: now,
        updated_at: now,
      };

      const devSession: Session = {
        access_token: 'dev-mock-access-token-' + Date.now(),
        refresh_token: 'dev-mock-refresh-token',
        expires_in: 3600 * 24 * 365,
        expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
        token_type: 'bearer',
        user: devUser,
      };

      await saveStoredDevSession({
        user: devUser,
        profile: devProfile,
        session: devSession,
      });

      setUser(devUser);
      setProfile(devProfile);
      setSession(devSession);
    },
    []
  );

  // ── Sign Out ─────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await removeStoredDevSession();
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore Supabase errors for offline / dev sign out
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  }, []);

  // ── Reset Password ────────────────────────────────────────────────────────
  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      {
        redirectTo: 'biodataapp://reset-password',
      }
    );
    return { error: error ?? null };
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    profile,
    isLoading,
    isDevUser,
    signUp,
    signIn,
    signInWithDev,
    signOut,
    resetPassword,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
