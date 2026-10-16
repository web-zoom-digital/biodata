import React, { useState, useCallback } from 'react';
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

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = useCallback(async () => {
    setEmailError('');
    setGeneralError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    const { error } = await resetPassword(trimmed);
    setIsLoading(false);

    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes('network') || msg.includes('fetch')) {
        setGeneralError('Network error. Please check your connection and try again.');
      } else {
        // Never confirm or deny whether an email exists
        setSent(true);
      }
      return;
    }

    setSent(true);
  }, [email, resetPassword]);

  if (sent) {
    return (
      <View
        style={[
          styles.root,
          styles.centeredContainer,
          { paddingTop: insets.top + 16, paddingBottom: Math.max(insets.bottom + 24, 40) },
        ]}
      >
        <Pressable
          id="forgot-password-back-btn-sent"
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </Pressable>

        <View style={styles.successIcon}>
          <Ionicons name="mail-open-outline" size={40} color="#047857" />
        </View>
        <Text style={styles.successTitle}>Reset link sent</Text>
        <Text style={styles.successBody}>
          If an account exists for{' '}
          <Text style={styles.successEmail}>{email.trim()}</Text>, you&apos;ll receive a
          password reset email shortly.
        </Text>
        <Text style={styles.successInstructions}>
          Check your inbox (and spam folder) for an email from BioCraft, then click
          the link to set a new password.
        </Text>

        <Pressable
          id="forgot-password-login-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed]}
          onPress={() => router.replace('/(auth)/login' as any)}
          accessibilityRole="button"
          accessibilityLabel="Back to sign in"
        >
          <Text style={styles.submitBtnText}>Back to Sign In</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
        <Pressable
          id="forgot-password-back-btn"
          style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color="#374151" />
        </Pressable>

        <View style={styles.logoRow}>
          <View style={styles.logoWrapper}>
            <Image source={LOGO_SOURCE} style={styles.logo} resizeMode="cover" />
          </View>
        </View>

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          Enter the email you used to create your BioCraft account and we&apos;ll send you
          a reset link.
        </Text>

        {generalError ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle-outline" size={16} color="#DC2626" />
            <Text style={styles.errorBannerText}>{generalError}</Text>
          </View>
        ) : null}

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Email Address</Text>
          <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
            <Ionicons name="mail-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="forgot-password-email-input"
              style={styles.input}
              placeholder="you@example.com"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={(t) => { setEmail(t); setEmailError(''); setGeneralError(''); }}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="done"
              onSubmitEditing={handleReset}
              accessibilityLabel="Email address"
            />
          </View>
          {emailError ? <Text style={styles.fieldError}>{emailError}</Text> : null}
        </View>

        <Pressable
          id="forgot-password-submit-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed, isLoading && styles.btnDisabled]}
          onPress={handleReset}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Send reset link"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitBtnText}>Send Reset Link</Text>
          )}
        </Pressable>

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Remember your password? </Text>
          <Pressable
            id="forgot-password-login-link"
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
  centeredContainer: { paddingHorizontal: 24, flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, flexGrow: 1 },
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14.5,
    color: '#6B7280',
    lineHeight: 21,
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
  fieldGroup: { marginBottom: 20 },
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
  input: { flex: 1, fontSize: 15, color: '#111827' },
  fieldError: { fontSize: 12.5, color: '#DC2626', marginTop: 5, marginLeft: 2 },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
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
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  btnPressed: { opacity: 0.85, transform: [{ scale: 0.985 }] },
  btnDisabled: { opacity: 0.7 },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#047857', fontWeight: '700' },
  // Success state
  successIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
    textAlign: 'center',
  },
  successBody: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
  },
  successEmail: { fontWeight: '700', color: '#047857' },
  successInstructions: {
    fontSize: 13.5,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
});
