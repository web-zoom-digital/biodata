import React, { useState, useMemo, memo } from 'react';
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
import { templates } from '@/templates/registry';
import { calculateCardPreviewDimensions } from '@/templates/shared/constants';
import { SAMPLE_BIODATA, SAMPLE_BIODATA_GIRL } from '@/data/sample-biodata';
import type { TemplateDefinition } from '@/types/template';
import type { BiodataModel } from '@/types/biodata';
import { BrandLogo } from '../BrandLogo';

interface TemplateSelectorModalProps {
  visible: boolean;
  activeTemplateId: string;
  onSelectTemplate: (template: TemplateDefinition) => void;
  onClose: () => void;
  selectedAccent?: string;
  onAccentChange?: (accent: string) => void;
  model?: BiodataModel;
}

const CATEGORIES = ['All', 'Traditional', 'Modern', 'Floral', 'Islamic', 'Jain'];

interface TemplateCardItemProps {
  template: TemplateDefinition;
  isSelected: boolean;
  cardWidth: number;
  previewHeight: number;
  scale: number;
  onSelect: (t: TemplateDefinition) => void;
  model?: BiodataModel;
}

const TemplateCardItem = memo(function TemplateCardItem({
  template,
  isSelected,
  cardWidth,
  previewHeight,
  scale,
  onSelect,
}: TemplateCardItemProps) {
  const sampleModel = template.previewSample === 'girl' ? SAMPLE_BIODATA_GIRL : SAMPLE_BIODATA;

  return (
    <Pressable
      id={`template-select-card-${template.id}`}
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        isSelected && styles.cardActive,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onSelect(template)}
      accessibilityRole="button"
      accessibilityLabel={`Select ${template.name} template${isSelected ? ' (currently active)' : ''}`}
    >
      {/* 1. Genuine Scaled Visual Preview (Template Image) */}
      <View style={[styles.previewWrap, { height: previewHeight }]} pointerEvents="none">
        <template.component
          model={sampleModel}
          settings={{
            ...template.defaultSettings,
            showPhotoPlaceholder: template.defaultSettings.showPhotoPlaceholder ?? true,
          }}
          scale={scale}
        />

        {/* Floating Active Badge */}
        {isSelected ? (
          <View style={styles.floatingActiveBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" />
            <Text style={styles.floatingActiveBadgeText}>Active</Text>
          </View>
        ) : null}
      </View>

      {/* 2. Card Bottom Bar */}
      <View style={[styles.cardFooter, isSelected && styles.cardFooterActive]}>
        <View style={styles.cardInfoCol}>
          <Text
            style={[styles.cardName, isSelected && styles.cardNameActive]}
            numberOfLines={1}
          >
            {template.name}
          </Text>
          {/* <Text style={styles.cardCategory} numberOfLines={1}>
            {template.categories?.[0] || template.style?.split(',')[0] || 'Design'}
          </Text> */}
        </View>

        {isSelected ? (
          <View style={styles.activeCheckPill}>
            <Ionicons name="checkmark" size={13} color="#047857" />
          </View>
        ) : (
          <View style={styles.usePill}>
            <Text style={styles.usePillText}>Use</Text>
            <Ionicons name="arrow-forward" size={11} color="#047857" />
          </View>
        )}
      </View>
    </Pressable>
  );
});

export const TemplateSelectorModal: React.FC<TemplateSelectorModalProps> = ({
  visible,
  activeTemplateId,
  onSelectTemplate,
  onClose,
  model,
}) => {
  const insets = useSafeAreaInsets();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sheet Height
  const sheetHeight = Math.min(Math.round(windowHeight * 0.88), 740);

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    if (selectedCategory === 'All') return templates;
    return templates.filter((t) => {
      const matchCat = t.categories?.some(
        (c) => c.toLowerCase() === selectedCategory.toLowerCase()
      );
      const matchStyle = t.style?.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchId = t.id?.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchCat || matchStyle || matchId;
    });
  }, [selectedCategory]);

  // Responsive Grid Calculations
  const numColumns = windowWidth >= 640 ? 3 : 2;
  const maxModalWidth = 760;
  const containerWidth = Math.min(windowWidth, maxModalWidth);
  const padding = 14;
  const gap = 12;
  const rawCardWidth = Math.floor(
    (containerWidth - padding * 2 - (numColumns - 1) * gap) / numColumns
  );
  const { cardWidth, cardHeight: previewHeight, scale } = calculateCardPreviewDimensions(rawCardWidth);

  const handleSelect = (tmpl: TemplateDefinition) => {
    onSelectTemplate(tmpl);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        {/* Backdrop overlay */}
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Close template selector"
        />

        {/* Bottom Sheet Modal */}
        <View
          style={[
            styles.sheetContainer,
            {
              height: sheetHeight,
              paddingBottom: Math.max(insets.bottom, 14),
            },
          ]}
          onStartShouldSetResponder={() => true}
        >
          {/* Top Grab Handle */}
          <View style={styles.handleContainer}>
            <View style={styles.handleBar} />
          </View>

          {/* Header */}
          <View style={styles.sheetHeader}>
            <View style={styles.headerTitleCol}>
              <View style={styles.headerTitleRow}>
                <BrandLogo size={20} imageOnly={true} />
                <Text style={styles.sheetTitle}>Choose Template</Text>
                <View style={styles.templateCountBadge}>
                  <Text style={styles.templateCountText}>{templates.length}</Text>
                </View>
              </View>
              {/* <Text style={styles.sheetSubtitle} numberOfLines={1}>
                Tap any design to switch · Typed biodata is preserved
              </Text> */}
            </View>

            <Pressable
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={({ pressed }) => [styles.closeBtn, pressed && styles.closeBtnPressed]}
              accessibilityRole="button"
              accessibilityLabel="Close template selector"
            >
              <Ionicons name="close" size={20} color="#0F172A" />
            </Pressable>
          </View>

          {/* Category Filter Pills */}
          {/* <View style={styles.categoriesSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesContent}
              keyboardShouldPersistTaps="handled"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <Pressable
                    key={cat}
                    onPress={() => setSelectedCategory(cat)}
                    style={({ pressed }) => [
                      styles.categoryChip,
                      isActive && styles.categoryChipActive,
                      pressed && { opacity: 0.8 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Filter by ${cat}`}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        isActive && styles.categoryChipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View> */}

          {/* Scrollable Visual Templates Grid */}
          <ScrollView
            style={styles.templateScroll}
            contentContainerStyle={styles.templateGrid}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
            bounces={true}
          >
            {filteredTemplates.map((tmpl) => (
              <TemplateCardItem
                key={tmpl.id}
                template={tmpl}
                isSelected={tmpl.id === activeTemplateId}
                cardWidth={cardWidth}
                previewHeight={previewHeight}
                scale={scale}
                onSelect={handleSelect}
                model={model}
              />
            ))}
          </ScrollView>
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
    maxWidth: 760,
    alignSelf: 'center',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.16,
        shadowRadius: 18,
      },
      android: {
        elevation: 16,
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
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitleCol: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  templateCountBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  templateCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  sheetSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
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

  // Categories Filter Section
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingVertical: 8,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  categoryChipActive: {
    backgroundColor: '#047857',
    borderColor: '#047857',
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  categoryChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // Templates Grid
  templateScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  templateGrid: {
    padding: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
      android: {
        elevation: 2,
      },
      web: { cursor: 'pointer' },
    }),
  },
  cardActive: {
    borderColor: '#047857',
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  previewWrap: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  floatingActiveBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#047857',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  floatingActiveBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cardFooterActive: {
    backgroundColor: '#F0FDF4',
    borderTopColor: '#DCFCE7',
  },
  cardInfoCol: {
    flex: 1,
    paddingRight: 6,
  },
  cardName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 1,
  },
  cardNameActive: {
    color: '#047857',
  },
  cardCategory: {
    fontSize: 10.5,
    color: '#64748B',
    fontWeight: '500',
  },
  activeCheckPill: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  usePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    borderRadius: 12,
    gap: 2,
  },
  usePillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
});
