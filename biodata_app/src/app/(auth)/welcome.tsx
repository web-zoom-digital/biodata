import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Image,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/AuthContext';

const LOGO_SOURCE = require('../../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  // If already logged in, navigate to home immediately
  useEffect(() => {
    if (user) {
      router.replace('/(tabs)/home' as any);
    }
  }, [user]);

  // Animations
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(40));
  const [logoScale] = useState(() => new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScale]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background gradient */}
      <LinearGradient
        colors={['#F0FDF4', '#FFFFFF', '#F8FAFC']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Decorative circles */}
      <View style={[styles.decorCircle, styles.decorCircleTop]} />
      <View style={[styles.decorCircle, styles.decorCircleBottom]} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Logo + Brand */}
        <Animated.View
          style={[styles.logoSection, { transform: [{ scale: logoScale }] }]}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={LOGO_SOURCE}
              style={styles.logoImage}
              resizeMode="cover"
              accessibilityLabel="BioCraft logo"
            />
          </View>
          <Text style={styles.brandName}>
            Bio<Text style={styles.brandAccent}>Craft</Text>
          </Text>
          <Text style={styles.tagline}>
            Beautiful Marriage Biodata — Made on Your Phone
          </Text>
        </Animated.View>

        {/* Feature highlights */}
        <View style={styles.featuresRow}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.featureChip}>
              <Ionicons name={f.icon as any} size={16} color="#047857" />
              <Text style={styles.featureLabel}>{f.label}</Text>
            </View>
          ))}
        </View>

        {/* Template preview strip */}
        <View style={styles.previewStrip}>
          <View style={[styles.previewCard, { backgroundColor: '#EFF6FF' }]}>
            <Text style={styles.previewCardText}>🌸 Traditional</Text>
          </View>
          <View style={[styles.previewCard, { backgroundColor: '#F0FDF4' }]}>
            <Text style={styles.previewCardText}>💎 Modern</Text>
          </View>
          <View style={[styles.previewCard, { backgroundColor: '#FFF7ED' }]}>
            <Text style={styles.previewCardText}>🌺 Floral</Text>
          </View>
          <View style={[styles.previewCard, { backgroundColor: '#FDF4FF' }]}>
            <Text style={styles.previewCardText}>✨ Minimal</Text>
          </View>
        </View>
      </Animated.View>

      {/* CTA Buttons */}
      <Animated.View
        style={[
          styles.ctaSection,
          {
            opacity: fadeAnim,
            paddingBottom: Math.max(insets.bottom + 24, 40),
          },
        ]}
      >
        <Pressable
          id="welcome-get-started-btn"
          style={({ pressed }) => [styles.primaryBtn, pressed && styles.btnPressed]}
          onPress={() => router.push('/(auth)/signup' as any)}
          accessibilityRole="button"
          accessibilityLabel="Get started — create a free account"
        >
          <LinearGradient
            colors={['#047857', '#065F46']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.primaryBtnGradient}
          >
            <Text style={styles.primaryBtnText}>Get Started Free</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </LinearGradient>
        </Pressable>

        <Pressable
          id="welcome-login-btn"
          style={({ pressed }) => [styles.secondaryBtn, pressed && styles.btnPressed]}
          onPress={() => router.push('/(auth)/login' as any)}
          accessibilityRole="button"
          accessibilityLabel="Sign in to existing account"
        >
          <Text style={styles.secondaryBtnText}>I already have an account</Text>
        </Pressable>

        <Text style={styles.termsText}>
          By continuing you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>.
        </Text>
      </Animated.View>
    </View>
  );
}

const FEATURES = [
  { icon: 'document-text-outline', label: '12 Templates' },
  { icon: 'share-social-outline', label: 'PDF Export' },
  { icon: 'shield-checkmark-outline', label: 'Secure' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },
  decorCircleTop: {
    width: 280,
    height: 280,
    backgroundColor: '#BBF7D0',
    top: -80,
    right: -80,
  },
  decorCircleBottom: {
    width: 200,
    height: 200,
    backgroundColor: '#A7F3D0',
    bottom: 120,
    left: -60,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingTop: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoWrapper: {
    width: 90,
    height: 90,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.22,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -1,
    marginBottom: 8,
  },
  brandAccent: {
    color: '#047857',
  },
  tagline: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featureLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#166534',
  },
  previewStrip: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  previewCard: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  previewCardText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#374151',
  },
  ctaSection: {
    paddingHorizontal: 24,
    gap: 12,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    maxWidth: 380,
    borderRadius: 16,
    overflow: 'hidden',
  },
  primaryBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  secondaryBtn: {
    width: '100%',
    maxWidth: 380,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  btnPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  termsText: {
    fontSize: 11.5,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 17,
    maxWidth: 320,
    marginTop: 4,
  },
  termsLink: {
    color: '#047857',
    fontWeight: '600',
  },
});
