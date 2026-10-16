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
import { LinearGradient } from 'expo-linear-gradient';

interface MobileBottomBarProps {
  onOpenTemplates: () => void;
  onOpenDownload: () => void;
  templateName?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenTemplates,
  onOpenDownload,
  templateName = 'Template',
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 12 : 8);

  return (
    <View style={[styles.wrapper, { paddingBottom: bottomPadding }]}>
      <View style={styles.bar}>
        {/* Change Template Button */}
        <Pressable
          onPress={onOpenTemplates}
          style={({ pressed }) => [styles.templateBtn, pressed && { opacity: 0.85 }]}
          accessibilityRole="button"
          accessibilityLabel={`Change template, currently ${templateName}`}
        >
          <Ionicons name="color-palette-outline" size={17} color="#047857" />
          <Text style={styles.templateBtnText} numberOfLines={1}>
            Template: {templateName}
          </Text>
        </Pressable>

        {/* Download Action Button */}
        <Pressable
          onPress={onOpenDownload}
          style={({ pressed }) => [styles.downloadBtnWrap, pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
          accessibilityRole="button"
          accessibilityLabel="Download biodata"
        >
          <LinearGradient
            colors={['#16A34A', '#15803D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.downloadGradient}
          >
            <Ionicons name="download-outline" size={17} color="#FFFFFF" />
            <Text style={styles.downloadBtnText}>Download</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    paddingHorizontal: 12,
    zIndex: 40,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      web: {
        position: 'sticky',
        bottom: 0,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.06)',
      } as any,
    }),
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    minHeight: 48,
  },
  templateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 999,
    paddingVertical: 11,
    paddingHorizontal: 14,
    minHeight: 46,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  templateBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  downloadBtnWrap: {
    borderRadius: 999,
    overflow: 'hidden',
    minWidth: 130,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  downloadGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    minHeight: 46,
  },
  downloadBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
