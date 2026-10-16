import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormSectionCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  description?: string;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export const FormSectionCard: React.FC<FormSectionCardProps> = ({
  title,
  iconName,
  description,
  isEnabled = true,
  onToggleEnabled,
  defaultOpen = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View
      style={[
        styles.card,
        !isEnabled && styles.cardDisabled,
      ]}
    >
      {/* Header Row */}
      <View style={styles.header}>
        {/* Accordion Toggle Area */}
        <Pressable
          onPress={() => setIsOpen(!isOpen)}
          style={({ pressed }) => [styles.headerMain, pressed && { opacity: 0.85 }]}
          accessibilityRole="button"
          accessibilityLabel={`${title} section, ${isOpen ? 'collapse' : 'expand'}`}
          accessibilityState={{ expanded: isOpen }}
        >
          <View style={[styles.iconCircle, !isEnabled && styles.iconCircleMuted]}>
            <Ionicons
              name={iconName}
              size={18}
              color={isEnabled ? '#047857' : '#94A3B8'}
            />
          </View>

          <View style={styles.titleColumn}>
            <Text style={[styles.title, !isEnabled && styles.titleMuted]}>
              {title}
            </Text>
            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : null}
          </View>

          <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={18}
            color="#64748B"
            style={styles.chevron}
          />
        </Pressable>

        {/* Section Visibility Toggle (if toggleable) */}
        {onToggleEnabled ? (
          <Pressable
            onPress={() => onToggleEnabled(!isEnabled)}
            style={({ pressed }) => [
              styles.visibilityBadge,
              isEnabled ? styles.visibilityBadgeActive : styles.visibilityBadgeInactive,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityRole="switch"
            accessibilityLabel={`Include ${title} in biodata preview`}
            accessibilityState={{ checked: isEnabled }}
          >
            <Ionicons
              name={isEnabled ? 'eye' : 'eye-off'}
              size={14}
              color={isEnabled ? '#047857' : '#64748B'}
            />
            <Text
              style={[
                styles.visibilityText,
                isEnabled ? styles.visibilityTextActive : styles.visibilityTextInactive,
              ]}
            >
              {isEnabled ? 'Shown' : 'Hidden'}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {/* Card Content */}
      {isOpen ? (
        <View style={styles.body}>
          {!isEnabled ? (
            <View style={styles.disabledBanner}>
              <Ionicons name="information-circle-outline" size={16} color="#64748B" />
              <Text style={styles.disabledBannerText}>
                This section is hidden from the final biodata preview.
              </Text>
            </View>
          ) : null}
          {children}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
      } as any,
    }),
  },
  cardDisabled: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    opacity: 0.85,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 56,
  },
  headerMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconCircleMuted: {
    backgroundColor: '#E2E8F0',
  },
  titleColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  titleMuted: {
    color: '#64748B',
  },
  description: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1,
  },
  chevron: {
    marginLeft: 6,
    marginRight: 8,
  },
  visibilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    minHeight: 32,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  visibilityBadgeActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  visibilityBadgeInactive: {
    backgroundColor: '#F1F5F9',
    borderColor: '#CBD5E1',
  },
  visibilityText: {
    fontSize: 11,
    fontWeight: '600',
  },
  visibilityTextActive: {
    color: '#047857',
  },
  visibilityTextInactive: {
    color: '#64748B',
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 16,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  disabledBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  disabledBannerText: {
    fontSize: 12,
    color: '#64748B',
    flex: 1,
  },
});
