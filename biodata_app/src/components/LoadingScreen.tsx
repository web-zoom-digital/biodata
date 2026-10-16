import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  Platform,
  AccessibilityInfo,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LOGO_SOURCE = require('../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

export interface LoadingScreenProps {
  message?: string;
  subMessage?: string;
  overlay?: boolean;
  backgroundStyle?: 'white' | 'slate' | 'transparent';
  timeoutSeconds?: number;
  onTimeout?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
  errorMessage?: string;
  testID?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Preparing your biodata experience...',
  subMessage,
  overlay = false,
  backgroundStyle = 'white',
  timeoutSeconds,
  onTimeout,
  onRetry,
  onCancel,
  errorMessage,
  testID = 'biocraft-loading-screen',
}) => {
  // Respect user preference for reduced motion
  const [reduceMotion, setReduceMotion] = useState<boolean>(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch {
        return false;
      }
    }
    return false;
  });

  const [hasTimedOut, setHasTimedOut] = useState(false);

  // React Native Animated values initialized via state (idiomatic React 19 pattern)
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [spinValue] = useState(() => new Animated.Value(0));
  const [pulseValue] = useState(() => new Animated.Value(1));
  const timeoutTimerRef = useRef<any>(null);

  // Listen for reduced motion changes
  useEffect(() => {
    let isMounted = true;

    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined' && window.matchMedia) {
          const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
          const listener = (e: MediaQueryListEvent) => {
            if (isMounted) setReduceMotion(e.matches);
          };
          mql.addEventListener?.('change', listener);
          return () => {
            isMounted = false;
            mql.removeEventListener?.('change', listener);
          };
        }
      } catch {
        // Fallback for older browsers
      }
    } else {
      AccessibilityInfo.isReduceMotionEnabled()
        .then((enabled) => {
          if (isMounted && enabled) setReduceMotion(true);
        })
        .catch(() => {});

      const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
        if (isMounted) setReduceMotion(enabled);
      });

      return () => {
        isMounted = false;
        sub?.remove?.();
      };
    }
  }, []);

  // Subtle fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Continuous 360-degree rotation / Pulse animation
  useEffect(() => {
    if (reduceMotion) {
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 0.85,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();
      return () => {
        pulseLoop.stop();
      };
    }

    spinValue.setValue(0);
    const spinLoop = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1150,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spinLoop.start();

    return () => {
      spinLoop.stop();
    };
  }, [reduceMotion, spinValue, pulseValue]);

  // Timeout guard to prevent infinite waiting
  useEffect(() => {
    if (timeoutSeconds && timeoutSeconds > 0) {
      timeoutTimerRef.current = setTimeout(() => {
        setHasTimedOut(true);
        onTimeout?.();
      }, timeoutSeconds * 1000);

      return () => {
        if (timeoutTimerRef.current) {
          clearTimeout(timeoutTimerRef.current);
        }
      };
    }
  }, [timeoutSeconds, onTimeout]);

  // Interpolated rotation style memoized
  const spinInterpolate = useMemo(() => {
    return spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  }, [spinValue]);

  const isErrorState = Boolean(errorMessage || hasTimedOut);

  // Background styling
  const bgStyle =
    backgroundStyle === 'slate'
      ? styles.bgSlate
      : backgroundStyle === 'transparent'
      ? styles.bgTransparent
      : styles.bgWhite;

  return (
    <Animated.View
      testID={testID}
      style={[
        overlay ? styles.overlayContainer : styles.fullScreenContainer,
        bgStyle,
        { opacity: fadeAnim },
      ]}
      accessibilityRole="progressbar"
      accessibilityLabel={errorMessage || message}
    >
      <View style={styles.contentWrap}>
        {/* ================= 1. CIRCULAR SPINNER & CENTER LOGO ================= */}
        <View style={styles.spinnerAnchor}>
          {/* Subtle Outer Track Ring */}
          <View style={styles.trackRing} />

          {/* Rotating Emerald Brand Indicator (360° Smooth Arc) */}
          {!reduceMotion ? (
            <Animated.View
              style={[
                styles.spinnerRing,
                { transform: [{ rotate: spinInterpolate }] },
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.spinnerRing,
                { opacity: pulseValue },
              ]}
            />
          )}

          {/* Centered BioCraft Brand Logo */}
          <View style={styles.logoBadge}>
            <Image
              source={LOGO_SOURCE}
              style={styles.logoImage}
              resizeMode="cover"
              accessibilityLabel="BioCraft Logo"
            />
          </View>
        </View>

        {/* ================= 2. BRAND LABEL & STATUS MESSAGE ================= */}
        <View style={styles.textBlock}>
          <Text style={styles.brandTitle}>
            Bio<Text style={styles.brandAccent}>Craft</Text>
          </Text>

          {isErrorState ? (
            /* Error or Timeout Recovery State */
            <View style={styles.errorContainer}>
              <View style={styles.errorIconWrap}>
                <Ionicons name="alert-circle-outline" size={24} color="#DC2626" />
              </View>
              <Text style={styles.errorTitle}>
                {errorMessage || 'Taking longer than usual'}
              </Text>
              <Text style={styles.errorSubtitle}>
                Please check your connection or retry this action.
              </Text>

              <View style={styles.actionRow}>
                {onRetry ? (
                  <Pressable
                    onPress={onRetry}
                    style={({ pressed }) => [styles.retryBtn, pressed && { opacity: 0.85 }]}
                    accessibilityRole="button"
                    accessibilityLabel="Retry"
                  >
                    <Ionicons name="refresh" size={16} color="#FFFFFF" />
                    <Text style={styles.retryBtnText}>Retry</Text>
                  </Pressable>
                ) : null}

                {onCancel ? (
                  <Pressable
                    onPress={onCancel}
                    style={({ pressed }) => [styles.cancelBtn, pressed && { opacity: 0.75 }]}
                    accessibilityRole="button"
                    accessibilityLabel="Cancel"
                  >
                    <Text style={styles.cancelBtnText}>Dismiss</Text>
                  </Pressable>
                ) : null}
              </View>
            </View>
          ) : (
            /* Normal Elegant Loading Message */
            <>
              <Text style={styles.messageText}>{message}</Text>
              {subMessage ? (
                <Text style={styles.subMessageText}>{subMessage}</Text>
              ) : (
                <Text style={styles.subMessageText}>Please wait a moment...</Text>
              )}
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: 24,
    ...Platform.select({
      web: { backdropFilter: 'blur(8px)' },
    }),
  },
  bgWhite: {
    backgroundColor: '#FFFFFF',
  },
  bgSlate: {
    backgroundColor: '#F8FAFC',
  },
  bgTransparent: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
  },
  contentWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 380,
    width: '100%',
  },

  /* Spinner layout: 124x124 anchor with 72x72 inner logo */
  spinnerAnchor: {
    width: 124,
    height: 124,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  trackRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3.5,
    borderColor: '#E2E8F0',
  },
  spinnerRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3.5,
    borderColor: 'transparent',
    borderTopColor: '#047857',
    borderRightColor: '#10B981',
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: '0 4px 14px rgba(15, 23, 42, 0.08)',
      },
    }),
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },

  /* Text & Labels */
  textBlock: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  brandAccent: {
    color: '#16A34A',
  },
  messageText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  subMessageText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },

  /* Error / Timeout State */
  errorContainer: {
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 8,
  },
  errorIconWrap: {
    marginBottom: 6,
  },
  errorTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 4,
  },
  errorSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#047857',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    gap: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
  },
  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  cancelBtnText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 13.5,
  },
});
