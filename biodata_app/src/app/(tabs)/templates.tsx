import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { templates } from '@/templates/registry';
import { calculateCardPreviewDimensions } from '@/templates/shared/constants';
import type { TemplateDefinition } from '@/types/template';
import { SAMPLE_BIODATA, SAMPLE_BIODATA_GIRL } from '@/data/sample-biodata';


const TemplateListCard = React.memo(function TemplateListCard({
  template,
  cardWidth,
  onPress,
}: {
  template: TemplateDefinition;
  cardWidth: number;
  onPress: (t: TemplateDefinition) => void;
}) {
  const { cardHeight, scale } = calculateCardPreviewDimensions(cardWidth);
  const sampleModel = template.previewSample === 'girl' ? SAMPLE_BIODATA_GIRL : SAMPLE_BIODATA;

  return (
    <Pressable
      id={`template-card-${template.id}`}
      style={({ pressed }) => [
        styles.card,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(template)}
      accessibilityRole="button"
      accessibilityLabel={`Use ${template.name} template`}
    >
      {/* Genuine Template Preview */}
      <View style={[styles.preview, { width: cardWidth, height: cardHeight }]}>
        <template.component
          model={sampleModel}
          settings={{
            ...template.defaultSettings,
            showPhotoPlaceholder: template.defaultSettings.showPhotoPlaceholder ?? true,
          }}
          scale={scale}
        />
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <View style={styles.cardFooterLeft}>
          <Text style={styles.cardName} numberOfLines={1}>
            {template.name}
          </Text>
        </View>
        <Pressable
          id={`template-use-btn-${template.id}`}
          style={({ pressed }) => [styles.useBtn, pressed && { opacity: 0.8 }]}
          onPress={() => onPress(template)}
          accessibilityRole="button"
          accessibilityLabel={`Use ${template.name}`}
        >
          <Text style={styles.useBtnText}>Use →</Text>
        </Pressable>
      </View>
    </Pressable>
  );
});


export default function TemplatesScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const PADDING = 16;
  const GAP = 12;
  const numColumns = 2;
  const cardWidth = Math.floor((width - PADDING * 2 - GAP) / numColumns);

  const handleUseTemplate = useCallback((template: TemplateDefinition) => {
    router.push(`/create?template=${template.id}` as any);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: TemplateDefinition }) => (
      <TemplateListCard
        template={item}
        cardWidth={cardWidth}
        onPress={handleUseTemplate}
      />
    ),
    [cardWidth, handleUseTemplate]
  );

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Templates</Text>
        <Text style={styles.headerCount}>{templates.length} designs</Text>
      </View>

      {/* Grid */}
      <FlatList
        data={templates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            
          </View>
        }
      />
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
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },
  headerCount: { fontSize: 13, color: '#9CA3AF', fontWeight: '500' },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  listHeaderText: {
    fontSize: 13.5,
    color: '#6B7280',
    lineHeight: 19,
  },
  listContent: { paddingHorizontal: 16 },
  row: { gap: 12, marginBottom: 12 },
  card: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
    }),
  },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },
  preview: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  cardFooterLeft: { flex: 1, marginRight: 8 },
  cardName: { fontSize: 12.5, fontWeight: '700', color: '#111827', marginBottom: 3 },
  tagsRow: { flexDirection: 'row', gap: 4, flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: { fontSize: 10, color: '#6B7280', fontWeight: '500' },
  useBtn: {
    backgroundColor: '#047857',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  useBtnText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
});
