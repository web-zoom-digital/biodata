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

// ─── Password validation ───────────────────────────────────────────────────────

function validatePassword(pw: string): string {
  if (pw.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(pw)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(pw)) return 'Password must contain at least one number.';
  return '';
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { signUp, signInWithDev } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDevLoading, setIsDevLoading] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [generalError, setGeneralError] = useState('');

  // Success state (email confirmation required)
  const [verificationSent, setVerificationSent] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const clearErrors = useCallback(() => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmError('');
    setGeneralError('');
  }, []);

  const validateInputs = useCallback(() => {
    clearErrors();
    let valid = true;

    if (!fullName.trim()) {
      setNameError('Full name is required.');
      valid = false;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError('Email address is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }

    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmError('Please confirm your password.');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    }

    return valid;
  }, [clearErrors, fullName, email, password, confirmPassword]);

  const handleSignUp = useCallback(async () => {
    if (!validateInputs() || isLoading) return;

    setIsLoading(true);
    setGeneralError('');

    const { error } = await signUp(
      email.trim(),
      password,
      fullName.trim()
    );

    setIsLoading(false);

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('already registered') || msg.includes('user already exists')) {
        setEmailError('This email is already registered. Try signing in instead.');
      } else if (msg.includes('invalid email')) {
        setEmailError('Please enter a valid email address.');
      } else if (msg.includes('weak password') || msg.includes('password should be')) {
        setPasswordError(error.message);
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setGeneralError('Network error. Please check your connection and try again.');
      } else {
        setGeneralError(error.message || 'Registration failed. Please try again.');
      }
      return;
    }

    // if (needsEmailVerification) {
    //   setVerifiedEmail(email.trim());
    //   setVerificationSent(true);
    //   return;
    // }

    // Auto-logged in (email confirmation disabled)
    router.replace('/(tabs)/home' as any);
  }, [fullName, email, password, isLoading, signUp, validateInputs]);

  // ── Dev Direct Signup (No Supabase) ───────────────────────────────────────
  const handleFillWithDev = useCallback(async () => {
    if (isLoading || isDevLoading) return;

    setIsDevLoading(true);
    setGeneralError('');
    clearErrors();

    // Populate dev account values for visual feedback
    const devName = fullName.trim() || 'Dev User';
    const devEmail = email.trim() || 'dev@biocraft.app';
    setFullName(devName);
    setEmail(devEmail);
    setPassword('DevPass123!');
    setConfirmPassword('DevPass123!');

    try {
      await signInWithDev({
        fullName: devName,
        email: devEmail,
      });
      // Direct navigation into app, skipping Supabase completely
      router.replace('/(tabs)/home' as any);
    } catch (err: any) {
      setGeneralError(err?.message || 'Failed to sign in with dev account');
      setIsDevLoading(false);
    }
  }, [clearErrors, email, fullName, isDevLoading, isLoading, signInWithDev]);

  const handleAutofillInputsOnly = useCallback(() => {
    setFullName('Dev User');
    setEmail('dev@biocraft.app');
    setPassword('DevPassword123!');
    setConfirmPassword('DevPassword123!');
    clearErrors();
  }, [clearErrors]);

  // ── Email verification sent screen ────────────────────────────────────────

  if (verificationSent) {
    return (
      <View style={[styles.root, styles.verifyContainer, { paddingTop: insets.top + 16 }]}>
        <View style={styles.verifyIcon}>
          <Ionicons name="mail" size={40} color="#047857" />
        </View>
        <Text style={styles.verifyTitle}>Check your email</Text>
        <Text style={styles.verifyBody}>
          We&apos;ve sent a verification link to{'\n'}
          <Text style={styles.verifyEmail}>{verifiedEmail}</Text>
        </Text>
        <Text style={styles.verifyInstructions}>
          Tap the link in that email to activate your account, then come back and sign in.
        </Text>

        <Pressable
          id="signup-verify-login-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed]}
          onPress={() => router.replace('/(auth)/login' as any)}
          accessibilityRole="button"
          accessibilityLabel="Go to sign in"
        >
          <Text style={styles.submitBtnText}>Go to Sign In</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  }

  // ── Main sign-up form ─────────────────────────────────────────────────────

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
          id="signup-back-btn"
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

        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Join BioCraft and start crafting your biodata</Text>

        {/* General error */}
        {generalError ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
            <Text style={styles.errorBannerText}>{generalError}</Text>
          </View>
        ) : null}

        {/* Developer Direct Signup Card */}
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
                Instant signup with local dev account. Bypasses Supabase & skips email verification.
              </Text>
            </View>
          </View>

          <Pressable
            id="signup-fill-with-dev-btn"
            style={({ pressed }) => [
              styles.devSubmitBtn,
              pressed && styles.btnPressed,
              isDevLoading && styles.btnDisabled,
            ]}
            onPress={handleFillWithDev}
            disabled={isDevLoading || isLoading}
            accessibilityRole="button"
            accessibilityLabel="Fill with dev and sign up directly"
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
            id="signup-autofill-inputs-btn"
            style={({ pressed }) => [styles.devAutofillBtn, pressed && { opacity: 0.7 }]}
            onPress={handleAutofillInputsOnly}
            accessibilityRole="button"
            accessibilityLabel="Autofill form inputs only"
          >
            <Text style={styles.devAutofillBtnText}>
              or <Text style={styles.devAutofillBtnUnderline}>autofill inputs only</Text>
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR SIGN UP WITH EMAIL</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Full Name */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <View style={[styles.inputWrapper, nameError ? styles.inputError : null]}>
            <Ionicons name="person-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="signup-name-input"
              style={styles.input}
              placeholder="Your full name"
              placeholderTextColor="#9CA3AF"
              value={fullName}
              onChangeText={(t) => { setFullName(t); setNameError(''); }}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
              accessibilityLabel="Full name"
            />
          </View>
          {nameError ? <Text style={styles.fieldError}>{nameError}</Text> : null}
        </View>

        {/* Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="signup-email-input"
              ref={emailRef}
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
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="signup-password-input"
              ref={passwordRef}
              style={[styles.input, styles.inputFlex]}
              placeholder="Min. 8 characters with uppercase & number"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
              secureTextEntry={!showPassword}
              autoComplete="new-password"
              returnKeyType="next"
              onSubmitEditing={() => confirmRef.current?.focus()}
              accessibilityLabel="Password"
            />
            <Pressable
              id="signup-toggle-password-btn"
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

        {/* Confirm Password */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Confirm Password</Text>
          <View style={[styles.inputWrapper, confirmError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="signup-confirm-password-input"
              ref={confirmRef}
              style={[styles.input, styles.inputFlex]}
              placeholder="Re-enter your password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setConfirmError(''); }}
              secureTextEntry={!showConfirm}
              autoComplete="new-password"
              returnKeyType="done"
              onSubmitEditing={handleSignUp}
              accessibilityLabel="Confirm password"
            />
            <Pressable
              id="signup-toggle-confirm-btn"
              onPress={() => setShowConfirm((v) => !v)}
              style={styles.eyeBtn}
              accessibilityRole="button"
              accessibilityLabel={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              <Ionicons
                name={showConfirm ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#6B7280"
              />
            </Pressable>
          </View>
          {confirmError ? <Text style={styles.fieldError}>{confirmError}</Text> : null}
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          By creating an account, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>

        {/* Submit */}
        <Pressable
          id="signup-submit-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed, isLoading && styles.btnDisabled]}
          onPress={handleSignUp}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Create account"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.submitBtnText}>Create Account</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </>
          )}
        </Pressable>

        {/* Login link */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Pressable
            id="signup-login-link"
            onPress={() => router.replace('/(auth)/login' as any)}
            accessibilityRole="button"
            accessibilityLabel="Sign in"
          >
            <Text style={styles.loginLink}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, flexGrow: 1 },
  verifyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  verifyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  verifyTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  verifyBody: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  verifyEmail: {
    fontWeight: '700',
    color: '#047857',
  },
  verifyInstructions: {
    fontSize: 13.5,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
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
  logoRow: { alignItems: 'center', marginBottom: 20 },
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
  subtitle: { fontSize: 15, color: '#6B7280', marginBottom: 20 },
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
  fieldGroup: { marginBottom: 16 },
  fieldLabel: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
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
  inputError: { borderColor: '#F87171', backgroundColor: '#FFF5F5' },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: '#111827', paddingVertical: 0 },
  inputFlex: { flex: 1 },
  eyeBtn: { padding: 4, marginLeft: 8 },
  fieldError: { fontSize: 12.5, color: '#DC2626', marginTop: 5, marginLeft: 2 },
  termsText: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 17,
    marginBottom: 16,
    textAlign: 'center',
  },
  termsLink: { color: '#047857', fontWeight: '600' },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#047857',
    borderRadius: 16,
    paddingVertical: 16,
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
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },
  btnDisabled: { opacity: 0.7 },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#047857', fontWeight: '700' },
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
