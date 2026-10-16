import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { tint, shade } from '@/lib/color';
import type { TemplateDefinition, AccentOption } from '@/types/template';

interface ColorThemeModalProps {
  visible: boolean;
  template: TemplateDefinition;
  selectedAccent: string;
  onAccentChange: (accent: string) => void;
  onClose: () => void;
}

// Universal curated marriage biodata colors
const UNIVERSAL_BIODATA_COLORS: AccentOption[] = [
  { name: 'Emerald Green', value: '#059669' },
  { name: 'Royal Maroon', value: '#7A1F2B' },
  { name: 'Regal Gold', value: '#B58B3A' },
  { name: 'Deep Navy', value: '#1E3A5F' },
  { name: 'Elegant Rose', value: '#9D174D' },
  { name: 'Royal Plum', value: '#6B2D5C' },
  { name: 'Classic Teal', value: '#0F766E' },
  { name: 'Traditional Ochre', value: '#B45309' },
  { name: 'Charcoal Black', value: '#1F2937' },
  { name: 'Modern Indigo', value: '#4F46E5' },
];

export const ColorThemeModal: React.FC<ColorThemeModalProps> = ({
  visible,
  template,
  selectedAccent,
  onAccentChange,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();

  const currentAccent = selectedAccent || template.defaultSettings.accent;

  // Combine template's specific options with universal options, deduplicating by hex value
  const templateOptions = template.accentOptions || [];
  const existingValues = new Set(templateOptions.map((o) => o.value.toLowerCase()));

  const additionalOptions = UNIVERSAL_BIODATA_COLORS.filter(
    (o) => !existingValues.has(o.value.toLowerCase())
  );

  const activeColorName =
    [...templateOptions, ...additionalOptions].find(
      (o) => o.value.toLowerCase() === currentAccent.toLowerCase()
    )?.name || 'Custom Color';

  const sheetHeight = Math.min(Math.round(windowHeight * 0.62), 520);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close color options"
        />

        {/* Bottom Sheet Container */}
        <View
          style={[
            styles.sheetContainer,
            {
              height: sheetHeight,
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          {/* Top Grab Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </View>

          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.headerTitleCol}>
              <View style={styles.headerTitleRow}>
                <View
                  style={[
                    styles.headerColorDot,
                    { backgroundColor: currentAccent },
                  ]}
                />
                <Text style={styles.sheetTitle}>Change Theme Color</Text>
              </View>
              <Text style={styles.sheetSubtitle} numberOfLines={1}>
                {template.name} · Active: {activeColorName}
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close color selector"
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </Pressable>
          </View>

          {/* Color Palettes Scroll Area */}
          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
          >
            {/* Section 1: Template's Curated Palette */}
            {templateOptions.length > 0 ? (
              <View style={styles.sectionWrap}>
                <Text style={styles.sectionLabel}>
                  CURATED FOR {template.name.toUpperCase()}
                </Text>
                <View style={styles.paletteGrid}>
                  {templateOptions.map((opt) => {
                    const isSelected =
                      currentAccent.toLowerCase() === opt.value.toLowerCase();
                    return (
                      <Pressable
                        key={opt.value}
                        onPress={() => onAccentChange(opt.value)}
                        style={({ pressed }) => [
                          styles.colorCard,
                          isSelected && [
                            styles.colorCardActive,
                            { borderColor: opt.value, backgroundColor: tint(opt.value, 0.93) },
                          ],
                          pressed && { opacity: 0.8 },
                        ]}
                        accessibilityRole="button"
                        accessibilityLabel={`Select ${opt.name} color`}
                      >
                        <View
                          style={[
                            styles.colorSwatch,
                            { backgroundColor: opt.value },
                          ]}
                        >
                          {isSelected ? (
                            <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                          ) : null}
                        </View>
                        <Text
                          style={[
                            styles.colorCardText,
                            isSelected && [
                              styles.colorCardTextActive,
                              { color: shade(opt.value, 0.35) },
                            ],
                          ]}
                          numberOfLines={1}
                        >
                          {opt.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : null}

            {/* Section 2: Universal Marriage Biodata Colors */}
            <View style={styles.sectionWrap}>
              <Text style={styles.sectionLabel}>MORE CLASSIC THEME COLORS</Text>
              <View style={styles.paletteGrid}>
                {additionalOptions.map((opt) => {
                  const isSelected =
                    currentAccent.toLowerCase() === opt.value.toLowerCase();
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() => onAccentChange(opt.value)}
                      style={({ pressed }) => [
                        styles.colorCard,
                        isSelected && [
                          styles.colorCardActive,
                          { borderColor: opt.value, backgroundColor: tint(opt.value, 0.93) },
                        ],
                        pressed && { opacity: 0.8 },
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={`Select ${opt.name} color`}
                    >
                      <View
                        style={[
                          styles.colorSwatch,
                          { backgroundColor: opt.value },
                        ]}
                      >
                        {isSelected ? (
                          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                        ) : null}
                      </View>
                      <Text
                        style={[
                          styles.colorCardText,
                          isSelected && [
                            styles.colorCardTextActive,
                            { color: shade(opt.value, 0.35) },
                          ],
                        ]}
                        numberOfLines={1}
                      >
                        {opt.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>

          {/* Bottom Action Footer */}
          <View style={styles.footerWrap}>
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.doneBtn,
                { backgroundColor: currentAccent },
                pressed && { opacity: 0.88 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Done changing color"
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" />
              <Text style={styles.doneBtnText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  handleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  handleBar: {
    width: 40,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleCol: {
    flex: 1,
    paddingRight: 12,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerColorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sheetSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  closeBtnPressed: {
    backgroundColor: '#E2E8F0',
    transform: [{ scale: 0.95 }],
  },
  scrollArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  sectionWrap: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  paletteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
    minWidth: 120,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  colorCardActive: {
    borderColor: '#047857',
    backgroundColor: '#ECFDF5',
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  colorCardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  colorCardTextActive: {
    color: '#047857',
    fontWeight: '700',
  },
  footerWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFFFFF',
  },
  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#047857',
    borderRadius: 12,
    paddingVertical: 12,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
