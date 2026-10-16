import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/AuthContext';

const LOGO_SOURCE = require('../../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, profile, signOut, isDevUser } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const displayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'BioCraft User';

  const email = user?.email || '';
  const initials = displayName
    .split(' ')
    .slice(0, 2)
    .map((n: string) => n.charAt(0).toUpperCase())
    .join('');

  const handleSignOut = useCallback(() => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          setIsSigningOut(true);
          await signOut();
          setIsSigningOut(false);
          router.replace('/(auth)/welcome' as any);
        },
      },
    ]);
  }, [signOut]);

  const MENU_ITEMS: MenuItem[] = [
    {
      id: 'profile-create-biodata',
      icon: 'pencil',
      label: 'Create Biodata',
      subtitle: 'Start or continue your biodata',
      onPress: () => router.push('/create' as any),
    },
    {
      id: 'profile-my-biodatas',
      icon: 'document-text-outline',
      label: 'My Biodatas',
      subtitle: 'View and manage saved drafts',
      onPress: () => router.push('/(tabs)/my-biodatas' as any),
    },
    {
      id: 'profile-templates',
      icon: 'grid-outline',
      label: 'Browse Templates',
      subtitle: '12 professional designs',
      onPress: () => router.push('/(tabs)/templates' as any),
    },
  ];

  const SUPPORT_ITEMS: MenuItem[] = [
    {
      id: 'profile-privacy',
      icon: 'shield-checkmark-outline',
      label: 'Privacy Policy',
      onPress: () => {
        Alert.alert(
          'Privacy Policy',
          'BioCraft stores your biodata draft locally on your device only. No personal data is uploaded to servers without your consent. Supabase is used only for authentication — your biodata content is never sent to Supabase.'
        );
      },
    },
    {
      id: 'profile-help',
      icon: 'help-circle-outline',
      label: 'Help & Support',
      onPress: () => {
        Alert.alert(
          'Help & Support',
          'For support, please contact us at support@biocraft.app\n\nApp Version: 1.0.0\nExpo SDK: 57'
        );
      },
    },
    {
      id: 'profile-sign-out',
      icon: 'log-out-outline',
      label: 'Sign Out',
      onPress: handleSignOut,
      danger: true,
    },
  ];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* User card */}
        <View style={styles.userCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{initials || '?'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userEmail} numberOfLines={1}>{email}</Text>
            <View style={[styles.verifiedBadge, isDevUser && styles.devBadge]}>
              <Ionicons
                name={isDevUser ? 'flash' : 'checkmark-circle'}
                size={13}
                color={isDevUser ? '#D97706' : '#047857'}
              />
              <Text style={[styles.verifiedText, isDevUser && styles.devBadgeText]}>
                {isDevUser ? 'Dev Account (Offline / Local)' : 'BioCraft Account'}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Pressable
                id={item.id}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                onPress={item.onPress}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={styles.menuItemIcon}>
                  <Ionicons name={item.icon as any} size={20} color="#047857" />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                  {item.subtitle ? (
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  ) : null}
                </View>
                <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
              </Pressable>
              {idx < MENU_ITEMS.length - 1 ? <View style={styles.menuDivider} /> : null}
            </React.Fragment>
          ))}
        </View>

        {/* Support & account */}
        <Text style={styles.sectionLabel}>ACCOUNT & SUPPORT</Text>
        <View style={styles.menuCard}>
          {SUPPORT_ITEMS.map((item, idx) => (
            <React.Fragment key={item.id}>
              <Pressable
                id={item.id}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                onPress={item.onPress}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <View style={[styles.menuItemIcon, item.danger && styles.menuItemIconDanger]}>
                  <Ionicons
                    name={item.icon as any}
                    size={20}
                    color={item.danger ? '#DC2626' : '#6B7280'}
                  />
                </View>
                <View style={styles.menuItemText}>
                  <Text style={[styles.menuItemLabel, item.danger && styles.menuItemLabelDanger]}>
                    {item.label}
                  </Text>
                </View>
                {item.id === 'profile-sign-out' && isSigningOut ? (
                  <ActivityIndicator size="small" color="#DC2626" />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                )}
              </Pressable>
              {idx < SUPPORT_ITEMS.length - 1 ? <View style={styles.menuDivider} /> : null}
            </React.Fragment>
          ))}
        </View>

        {/* App branding */}
        <View style={styles.brandRow}>
          <Image source={LOGO_SOURCE} style={styles.brandLogo} resizeMode="cover" />
          <Text style={styles.brandText}>
            Bio<Text style={styles.brandAccent}>Craft</Text>
          </Text>
          <Text style={styles.brandVersion}>v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 12 },
  // User card
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
    }),
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#047857',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarLargeText: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 3 },
  userEmail: { fontSize: 13, color: '#6B7280', marginBottom: 6 },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  verifiedText: { fontSize: 11.5, color: '#047857', fontWeight: '600' },
  devBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  devBadgeText: { color: '#B45309', fontWeight: '700' },
  // Sections
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
    marginTop: 4,
    marginBottom: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 1 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    minHeight: 56,
  },
  menuItemPressed: { backgroundColor: '#F9FAFB' },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemIconDanger: { backgroundColor: '#FEF2F2' },
  menuItemText: { flex: 1 },
  menuItemLabel: { fontSize: 15, fontWeight: '600', color: '#111827' },
  menuItemLabelDanger: { color: '#DC2626' },
  menuItemSubtitle: { fontSize: 12.5, color: '#9CA3AF', marginTop: 2 },
  menuDivider: { height: 1, backgroundColor: '#F3F4F6', marginLeft: 64 },
  // Branding
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 8,
    marginTop: 4,
  },
  brandLogo: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  brandText: { fontSize: 16, fontWeight: '800', color: '#374151' },
  brandAccent: { color: '#047857' },
  brandVersion: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
});
