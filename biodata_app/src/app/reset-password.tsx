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
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';

function validatePassword(pw: string): string {
  if (pw.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(pw)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(pw)) return 'Password must contain at least one number.';
  return '';
}

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = useCallback(async () => {
    setPasswordError('');
    setConfirmError('');

    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsLoading(false);

    if (error) {
      Alert.alert('Error', error.message || 'Failed to update password. Please try again.');
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.replace('/(tabs)/home' as any);
    }, 2000);
  }, [password, confirmPassword]);

  if (success) {
    return (
      <View style={[styles.root, styles.centered, { paddingTop: insets.top }]}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={48} color="#047857" />
        </View>
        <Text style={styles.successTitle}>Password Updated!</Text>
        <Text style={styles.successBody}>
          Your password has been updated successfully. Redirecting to home...
        </Text>
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
        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.subtitle}>
          Enter and confirm your new password below.
        </Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>New Password</Text>
          <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="reset-password-new-input"
              style={[styles.input, styles.inputFlex]}
              placeholder="Min. 8 chars, uppercase, number"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={(t) => { setPassword(t); setPasswordError(''); }}
              secureTextEntry={!showPassword}
              returnKeyType="next"
              accessibilityLabel="New password"
            />
            <Pressable
              id="reset-password-toggle-btn"
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeBtn}
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

        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Confirm New Password</Text>
          <View style={[styles.inputWrapper, confirmError ? styles.inputError : null]}>
            <Ionicons name="lock-closed-outline" size={18} color="#9CA3AF" style={styles.inputIcon} />
            <TextInput
              id="reset-password-confirm-input"
              style={[styles.input, styles.inputFlex]}
              placeholder="Re-enter new password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={(t) => { setConfirmPassword(t); setConfirmError(''); }}
              secureTextEntry={!showConfirm}
              returnKeyType="done"
              onSubmitEditing={handleReset}
              accessibilityLabel="Confirm new password"
            />
            <Pressable
              id="reset-password-toggle-confirm-btn"
              onPress={() => setShowConfirm((v) => !v)}
              style={styles.eyeBtn}
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

        <Pressable
          id="reset-password-submit-btn"
          style={({ pressed }) => [styles.submitBtn, pressed && styles.btnPressed, isLoading && styles.btnDisabled]}
          onPress={handleReset}
          disabled={isLoading}
          accessibilityRole="button"
          accessibilityLabel="Update password"
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.submitBtnText}>Update Password</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, flexGrow: 1 },
  successIcon: { marginBottom: 20 },
  successTitle: { fontSize: 26, fontWeight: '800', color: '#111827', marginBottom: 10, textAlign: 'center' },
  successBody: { fontSize: 15, color: '#6B7280', textAlign: 'center', lineHeight: 22 },
  title: { fontSize: 28, fontWeight: '800', color: '#0F172A', letterSpacing: -0.5, marginBottom: 8 },
  subtitle: { fontSize: 14.5, color: '#6B7280', lineHeight: 21, marginBottom: 24 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13.5, fontWeight: '600', color: '#374151', marginBottom: 8 },
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
  inputFlex: { flex: 1 },
  eyeBtn: { padding: 4, marginLeft: 8 },
  fieldError: { fontSize: 12.5, color: '#DC2626', marginTop: 5 },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#047857',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 8,
    minHeight: 54,
  },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  btnPressed: { opacity: 0.85 },
  btnDisabled: { opacity: 0.7 },
});
