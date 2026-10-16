import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/AuthContext';

const LOGO_SOURCE = require('../../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { signIn, signInWithDev } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDevLoading, setIsDevLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const passwordRef = useRef<TextInput>(null);

  const validateInputs = useCallback(() => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    }

    return valid;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validateInputs() || isLoading) return;

    setIsLoading(true);
    setGeneralError('');

    const { error } = await signIn(email.trim(), password);
    setIsLoading(false);

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
        setGeneralError('Incorrect email or password. Please try again.');
      } else if (msg.includes('email not confirmed')) {
        setGeneralError(
          'Your email is not verified yet. Please check your inbox and click the verification link.'
        );
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setGeneralError('Network error. Please check your connection and try again.');
      } else {
        setGeneralError(error.message || 'Sign in failed. Please try again.');
      }
      return;
    }

    // Success — RootNavigator will redirect to (tabs)/home automatically
    router.replace('/(tabs)/home' as any);
  }, [email, password, isLoading, signIn, validateInputs]);

  // ── Dev Direct Sign In (No Supabase) ──────────────────────────────────────
  const handleFillWithDev = useCallback(async () => {
    if (isLoading || isDevLoading) return;

    setIsDevLoading(true);
    setGeneralError('');
    setEmailError('');
    setPasswordError('');

    const devEmail = email.trim() || 'dev@biocraft.app';
    setEmail(devEmail);
    setPassword('DevPass123!');

    try {
      await signInWithDev({
        fullName: 'Dev User',
        email: devEmail,
      });
      router.replace('/(tabs)/home' as any);
    } catch (err: any) {
      setGeneralError(err?.message || 'Failed to sign in with dev account');
      setIsDevLoading(false);
    }
  }, [email, isDevLoading, isLoading, signInWithDev]);

  const handleAutofillInputsOnly = useCallback(() => {
    setEmail('dev@biocraft.app');
    setPassword('DevPassword123!');
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom + 24, 40) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back button */}
        <Pressable
          id="login-back-btn"
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </Pressable>

        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoWrapper}>
            <Image source={LOGO_SOURCE} style={styles.logo} resizeMode="cover" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to your BioCraft account</Text>

        {/* General error */}
        {generalError ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
            <Text style={styles.errorBannerText}>{generalError}</Text>
          </View>
        ) : null}

        {/* Developer Direct Login Card */}
        <View style={styles.devCard}>
          <View style={styles.devHeader}>
            <View style={styles.devIconBadge}>
              <Ionicons name="flash" size={16} color="#047857" />
            </View>
            <View style={styles.devHeaderTextWrap}>
              <View style={styles.devTitleRow}>
                <Text style={styles.devTitle}>Developer Access</Text>
                <View style={styles.devPill}>
                  <Text style={styles.devPillText}>OFFLINE DEV</Text>
                </View>
              </View>
              <Text style={styles.devSubtitle}>
                Instant sign in with local dev account. No Supabase authentication required.
              </Text>
            </View>
          </View>

          <Pressable
            id="login-fill-with-dev-btn"
            style={({ pressed }) => [
              styles.devSubmitBtn,
              pressed && styles.btnPressed,
              isDevLoading && styles.btnDisabled,
            ]}
            onPress={handleFillWithDev}
            disabled={isDevLoading || isLoading}
            accessibilityRole="button"
            accessibilityLabel="Fill with dev and sign in directly"
          >
            {isDevLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="flash-outline" size={16} color="#FFFFFF" />
                <Text style={styles.devSubmitBtnText}>Fill with Dev</Text>
                <Ionicons name="arrow-forward" size={16} color="#A7F3D0" />
              </>
            )}
          </Pressable>

          <Pressable
            id="login-autofill-inputs-btn"
            style={({ pressed }) => [styles.devAutofillBtn, pressed && { opacity: 0.7 }]}
            onPress={handleAutofillInputsOnly}
            accessibilityRole="button"
            accessibilityLabel="Autofill login inputs only"
          >
            <Text style={styles.devAutofillBtnText}>
              or <Text style={styles.devAutofillBtnUnderline}>autofill inputs only</Text>
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR SIGN IN WITH EMAIL</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="login-email-input"
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(t) => { setEmail(t); setEmailError(''); setGeneralError(''); }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              accessibilityLabel="Email address"
            />
          </View>
          {emailError ? <Text style={styles.fieldError}>{emailError}</Text> : null}
        </View>

        {/* Password */}
        <View style={styles.fieldGroup}>
          <View style={styles.fieldLabelRow}>
            <Text style={styles.fieldLabel}>Password</Text>
            <Pressable
              id="login-forgot-password-link"
              onPress={() => router.push('/(auth)/forgot-password' as any)}
              accessibilityRole="button"
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.forgotLink}>Forgot Password?</Text>
            </Pressable>
          </View>
          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="login-password-input"
              ref={passwordRef}
              style={[styles.input, styles.inputFlex]}
              placeholder="Your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(t) => { setPassword(t); setPasswordError(''); setGeneralError(''); }}
              secureTextEntry={!showPassword}
              autoComplete="password"
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              accessibilityLabel="Password"
            />
            <Pressable
              id="login-toggle-password-btn"
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeBtn}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          </View>
          {passwordError ? <Text style={styles.fieldError}>{passwordError}</Text> : null}
        </View>

        {/* Login button */}
        <Pressable
          id="login-submit-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed, isLoading && styles.btnDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Sign in"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.submitBtnText}>Sign In</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </>
          )}
        </Pressable>

        {/* Sign up link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <Pressable
            id="login-signup-link"
            onPress={() => router.replace('/(auth)/signup' as any)}
            accessibilityRole="button"
            accessibilityLabel="Create an account"
          >
            <Text style={styles.signupLink}>Create Account</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 18,
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 4 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 10,
      },
    }),
  },
  logo: { width: '100%', height: '100%' },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  errorBannerText: {
    flex: 1,
    fontSize: 13.5,
    color: '#DC2626',
    lineHeight: 19,
    fontWeight: '500',
  },
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  forgotLink: {
    fontSize: 13,
    color: '#047857',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    minHeight: 52,
  },
  inputError: {
    borderColor: '#F87171',
    backgroundColor: '#FFF5F5',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  inputFlex: {
    flex: 1,
  },
  eyeBtn: {
    padding: 4,
    marginLeft: 8,
  },
  fieldError: {
    fontSize: 12.5,
    color: '#DC2626',
    marginTop: 5,
    marginLeft: 2,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#047857',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 20,
    minHeight: 54,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
    }),
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.985 }],
  },
  btnDisabled: {
    opacity: 0.7,
  },
  signupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  signupText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '700',
  },
  // Dev Quick Access Card
  devCard: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
    }),
  },
  devHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 14,
  },
  devIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  devHeaderTextWrap: { flex: 1 },
  devTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 3,
  },
  devTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065F46',
  },
  devPill: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  devPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#047857',
    letterSpacing: 0.5,
  },
  devSubtitle: {
    fontSize: 12.5,
    color: '#065F46',
    opacity: 0.85,
    lineHeight: 17,
  },
  devSubmitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#047857',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    minHeight: 48,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
    }),
  },
  devSubmitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  devAutofillBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 4,
  },
  devAutofillBtnText: {
    fontSize: 12.5,
    color: '#047857',
    fontWeight: '500',
  },
  devAutofillBtnUnderline: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.8,
  },
});
