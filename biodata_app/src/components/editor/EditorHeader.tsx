import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import { BrandLogo } from '../BrandLogo';

interface EditorHeaderProps {
  saveStatus?: 'idle' | 'saving' | 'saved' | 'error';
  onOpenTemplates?: () => void;
  onOpenDownload?: () => void;
  selectedTemplateName?: string;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  saveStatus = 'saved',
  onOpenTemplates,
  onOpenDownload,
  selectedTemplateName,
}) => {
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 12 : 8);

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/home' as any);
    }
  };

  return (
    <View style={[styles.headerWrapper, { paddingTop: topPadding }]}>
      <View style={styles.headerBar}>
        {/* Left: Back & BioCraft Logo */}
        <View style={styles.leftGroup}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.75 }]}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
            <Text style={styles.backBtnText}>Back</Text>
          </Pressable>
          {/* <View style={styles.logoDivider} />
          <BrandLogo size={28} showText={false} /> */}
        </View>
        <View style={styles.rightActions}>
          {/* Save Status Badge */}
          <View style={styles.saveBadge}>
            {saveStatus === 'saving' ? (
              <>
                <Ionicons name="sync" size={12} color="#D97706" style={styles.spinIcon} />
                <Text style={styles.saveBadgeTextSaving}>Saving</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={13} color="#047857" />
                <Text style={styles.saveBadgeTextSaved}>Saved</Text>
              </>
            )}
          </View>

          {/* Template Button (Moved to top as requested) */}
          {onOpenTemplates ? (
            <Pressable
              onPress={onOpenTemplates}
              style={({ pressed }) => [styles.headerTemplateBtn, pressed && { opacity: 0.8 }]}
              accessibilityRole="button"
              accessibilityLabel={`Change template, currently ${selectedTemplateName || 'Template'}`}
            >
              <Ionicons name="grid-outline" size={14} color="#047857" />
              <Text style={styles.headerTemplateBtnText} numberOfLines={1}>
                {'Template'}
              </Text>
              <Ionicons name="chevron-down" size={11} color="#047857" />
            </Pressable>
          ) : null}

          {/* Download Button (Moved to top as requested) */}
          {onOpenDownload ? (
            <Pressable
              onPress={onOpenDownload}
              style={({ pressed }) => [styles.headerDownloadBtn, pressed && { opacity: 0.88 }]}
              accessibilityRole="button"
              accessibilityLabel="Download Biodata"
            >
              <Ionicons name="download-outline" size={15} color="#FFFFFF" />
              <Text style={styles.headerDownloadBtnText}>Download</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 50,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        position: 'sticky',
        top: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      } as any,
    }),
  },
  headerBar: {
    height: 56,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1280,
    width: '100%',
    alignSelf: 'center',
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 2,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingRight: 6,
    minHeight: 40,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  brandWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  saveBadgeTextSaved: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#047857',
  },
  saveBadgeTextSaving: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#D97706',
  },
  spinIcon: {
    marginRight: 1,
  },
  templateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    maxWidth: 120,
    minHeight: 34,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  templateBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  headerTemplateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    minHeight: 36,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  headerTemplateBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  headerDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#047857',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    minHeight: 36,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  headerDownloadBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
