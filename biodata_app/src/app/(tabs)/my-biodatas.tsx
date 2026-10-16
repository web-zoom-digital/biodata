import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  loadStoredBiodataAsync,
  clearStoredBiodataAsync,
  getSavedBiodatasListAsync,
  deleteSavedBiodataAsync,
  SavedBiodataItem,
} from '@/lib/biodataStorage';
import { getTemplateOrDefault } from '@/templates/registry';

interface StoredBiodataInfo {
  name: string;
  templateName: string;
  templateId: string;
  updatedAt?: number;
}

export default function MyBiodatasScreen() {
  const insets = useSafeAreaInsets();
  const [savedList, setSavedList] = useState<SavedBiodataItem[]>([]);
  const [storedDraft, setStoredDraft] = useState<StoredBiodataInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Reload data whenever this screen comes into focus
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      Promise.all([getSavedBiodatasListAsync(), loadStoredBiodataAsync()]).then(
        ([savedItems, stored]) => {
          if (!isMounted) return;

          setSavedList(savedItems || []);

          if (stored?.data) {
            const template = getTemplateOrDefault(stored.templateId);
            setStoredDraft({
              name: stored.data.personal?.fullName || 'Untitled Biodata',
              templateName: template.name,
              templateId: template.id,
              updatedAt: (stored as any).updatedAt,
            });
          } else {
            setStoredDraft(null);
          }

          setIsLoading(false);
        }
      );

      return () => {
        isMounted = false;
      };
    }, [])
  );

  const handleEditSaved = useCallback((item: SavedBiodataItem) => {
    router.push(`/create?template=${item.templateId}&savedId=${item.id}` as any);
  }, []);

  const handleDeleteSaved = useCallback((id: string, name: string) => {
    Alert.alert(
      'Delete Saved Biodata',
      `Delete "${name}" from My Biodatas? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteSavedBiodataAsync(id);
            setSavedList((prev) => prev.filter((b) => b.id !== id));
          },
        },
      ]
    );
  }, []);

  const handleEditDraft = useCallback(() => {
    if (storedDraft) {
      router.push(`/create?template=${storedDraft.templateId}` as any);
    }
  }, [storedDraft]);

  const handleDeleteDraft = useCallback(() => {
    Alert.alert(
      'Delete Draft',
      'This will permanently delete your active working draft from this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await clearStoredBiodataAsync();
            setStoredDraft(null);
          },
        },
      ]
    );
  }, []);

  const handleCreate = useCallback(() => {
    router.push('/create' as any);
  }, []);

  const formatDate = (ts?: number) => {
    if (!ts) return 'Recently';
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const hasContent = savedList.length > 0 || storedDraft !== null;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Biodata</Text>
          <Text style={styles.headerSubtitle}>
            {savedList.length > 0
              ? `${savedList.length} biodata${savedList.length > 1 ? 's' : ''} saved on this device`
              : 'Your saved & downloaded marriage resumes'}
          </Text>
        </View>
        <Pressable
          id="my-biodatas-header-new-btn"
          style={({ pressed }) => [styles.headerCreateBtn, pressed && styles.btnPressed]}
          onPress={handleCreate}
          accessibilityRole="button"
          accessibilityLabel="Create New Biodata"
        >
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.headerCreateBtnText}>New</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.loadingState}>
            <Text style={styles.loadingText}>Loading your biodatas...</Text>
          </View>
        ) : hasContent ? (
          <>
            {/* 1. Downloaded & Saved Biodatas Section */}
            {savedList.length > 0 ? (
              <View style={styles.sectionWrap}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionLabel}>SAVED & DOWNLOADED BIODATAS</Text>
                  {/* <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{savedList.length}</Text>
                  </View> */}
                </View>

                {savedList.map((item) => (
                  <View key={item.id} style={styles.biodataCard}>
                    <View style={styles.biodataCardHeader}>
                      <View
                        style={[
                          styles.biodataIconWrap,
                          item.accent ? { backgroundColor: `${item.accent}15` } : null,
                        ]}
                      >
                        <Ionicons
                          name="document-text"
                          size={24}
                          color={item.accent || '#047857'}
                        />
                      </View>
                      <View style={styles.biodataCardInfo}>
                        <Text style={styles.biodataCardName} numberOfLines={1}>
                          {item.name || 'Untitled Biodata'}
                        </Text>
                        <Text style={styles.biodataCardMeta}>
                          {item.templateName || 'Template'}
                        </Text>
                      </View>
                      <View style={styles.savedBadge}>
                        <Ionicons name="checkmark-circle" size={13} color="#065F46" />
                        <Text style={styles.savedBadgeText}>
                          {item.format || 'Downloaded'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.biodataCardDivider} />

                    <View style={styles.biodataCardFooter}>
                      <View style={styles.footerDateRow}>
                        <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                        <Text style={styles.biodataCardDate}>
                          Saved: {formatDate(item.downloadedAt)}
                        </Text>
                      </View>
                    </View>

                    {/* Action buttons */}
                    <View style={styles.actionsRow}>
                      <Pressable
                        id={`edit-saved-btn-${item.id}`}
                        style={({ pressed }) => [
                          styles.actionBtn,
                          styles.actionBtnPrimary,
                          pressed && styles.btnPressed,
                        ]}
                        onPress={() => handleEditSaved(item)}
                        accessibilityRole="button"
                        accessibilityLabel={`Edit ${item.name}`}
                      >
                        <Ionicons name="pencil" size={16} color="#FFFFFF" />
                        <Text style={styles.actionBtnPrimaryText}>Edit & Export</Text>
                      </Pressable>

                      <Pressable
                        id={`delete-saved-btn-${item.id}`}
                        style={({ pressed }) => [
                          styles.actionBtn,
                          styles.actionBtnDanger,
                          pressed && styles.btnPressed,
                        ]}
                        onPress={() => handleDeleteSaved(item.id, item.name)}
                        accessibilityRole="button"
                        accessibilityLabel={`Delete ${item.name}`}
                      >
                        <Ionicons name="trash-outline" size={16} color="#DC2626" />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}

            {/* 2. Working Draft Section (if exists) */}
            {storedDraft ? (
              <View style={[styles.sectionWrap, { marginTop: savedList.length > 0 ? 12 : 0 }]}>
                <Text style={styles.sectionLabel}>CURRENT WORKING DRAFT</Text>
                <View style={styles.biodataCard}>
                  <View style={styles.biodataCardHeader}>
                    <View style={styles.biodataIconWrap}>
                      <Ionicons name="create-outline" size={24} color="#047857" />
                    </View>
                    <View style={styles.biodataCardInfo}>
                      <Text style={styles.biodataCardName} numberOfLines={1}>
                        {storedDraft.name || 'Untitled Draft'}
                      </Text>
                      <Text style={styles.biodataCardMeta}>
                        {storedDraft.templateName}
                      </Text>
                    </View>
                    <View style={styles.localBadge}>
                      <Text style={styles.localBadgeText}>Draft</Text>
                    </View>
                  </View>

                  <View style={styles.biodataCardDivider} />

                  <View style={styles.biodataCardFooter}>
                    <View style={styles.footerDateRow}>
                      <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                      <Text style={styles.biodataCardDate}>
                        Last edited: {formatDate(storedDraft.updatedAt)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionsRow}>
                    <Pressable
                      id="my-biodatas-edit-draft-btn"
                      style={({ pressed }) => [
                        styles.actionBtn,
                        styles.actionBtnPrimary,
                        pressed && styles.btnPressed,
                      ]}
                      onPress={handleEditDraft}
                      accessibilityRole="button"
                      accessibilityLabel="Resume editing draft"
                    >
                      <Ionicons name="pencil" size={16} color="#FFFFFF" />
                      <Text style={styles.actionBtnPrimaryText}>Resume Editing</Text>
                    </Pressable>
                    <Pressable
                      id="my-biodatas-delete-draft-btn"
                      style={({ pressed }) => [
                        styles.actionBtn,
                        styles.actionBtnDanger,
                        pressed && styles.btnPressed,
                      ]}
                      onPress={handleDeleteDraft}
                      accessibilityRole="button"
                      accessibilityLabel="Delete working draft"
                    >
                      <Ionicons name="trash-outline" size={16} color="#DC2626" />
                    </Pressable>
                  </View>
                </View>
              </View>
            ) : null}

            {/* Create Another Button */}
            <Pressable
              id="my-biodatas-create-another-btn"
              style={({ pressed }) => [styles.createNewBtn, pressed && styles.btnPressed]}
              onPress={handleCreate}
              accessibilityRole="button"
              accessibilityLabel="Create another biodata"
            >
              <Ionicons name="add-circle-outline" size={20} color="#047857" />
              <Text style={styles.createNewBtnText}>Create New Biodata</Text>
            </Pressable>
          </>
        ) : (
          /* Empty state */
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['#ECFDF5', '#F0FDF4']}
              style={styles.emptyIconWrap}
            >
              <Ionicons name="document-text-outline" size={48} color="#10B981" />
            </LinearGradient>
            <Text style={styles.emptyTitle}>No saved biodatas yet</Text>
            <Text style={styles.emptyBody}>
              Create your marriage biodata! When you customize and download any template,
              it automatically saves right here so you can access, edit, or re-download it anytime.
            </Text>

            <Pressable
              id="my-biodatas-start-creating-btn"
              style={({ pressed }) => [styles.emptyBtn, pressed && styles.btnPressed]}
              onPress={handleCreate}
              accessibilityRole="button"
              accessibilityLabel="Start creating biodata"
            >
              <LinearGradient
                colors={['#047857', '#065F46']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emptyBtnGradient}
              >
                <Ionicons name="pencil" size={18} color="#FFFFFF" />
                <Text style={styles.emptyBtnText}>Start Creating</Text>
              </LinearGradient>
            </Pressable>

            <View style={styles.emptyTipCard}>
              <Ionicons name="sparkles" size={16} color="#047857" />
              <Text style={styles.emptyTipText}>
                Every biodata you download is automatically preserved in My Biodata for quick sharing & re-edits.
              </Text>
            </View>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },
  headerSubtitle: { fontSize: 12.5, color: '#6B7280', marginTop: 2 },
  headerCreateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#047857',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  headerCreateBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 14 },
  loadingState: { paddingTop: 60, alignItems: 'center' },
  loadingText: { fontSize: 14, color: '#9CA3AF' },
  sectionWrap: { gap: 10 },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1,
  },
  countBadge: {
    backgroundColor: '#E0E7FF',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#3730A3',
  },
  biodataCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
    }),
  },
  biodataCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  biodataIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#ECFDF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  biodataCardInfo: { flex: 1 },
  biodataCardName: { fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 3 },
  biodataCardMeta: { fontSize: 13, color: '#6B7280' },
  savedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  savedBadgeText: { fontSize: 11, fontWeight: '700', color: '#065F46' },
  localBadge: {
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  localBadgeText: { fontSize: 11, fontWeight: '700', color: '#92400E' },
  biodataCardDivider: { height: 1, backgroundColor: '#F3F4F6' },
  biodataCardFooter: { paddingHorizontal: 14, paddingVertical: 8 },
  footerDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  biodataCardDate: { fontSize: 12, color: '#9CA3AF' },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    minHeight: 44,
  },
  actionBtnPrimary: {
    flex: 1,
    backgroundColor: '#047857',
    justifyContent: 'center',
    ...Platform.select({ android: { elevation: 2 } }),
  },
  actionBtnPrimaryText: { fontSize: 14, fontWeight: '700', color: '#FFFFFF' },
  actionBtnDanger: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  btnPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },
  createNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 6,
  },
  createNewBtnText: { fontSize: 15, fontWeight: '700', color: '#047857' },
  // Empty state
  emptyState: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 20 },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyBody: {
    fontSize: 14.5,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 320,
  },
  emptyBtn: { width: '100%', maxWidth: 300, borderRadius: 16, overflow: 'hidden', marginBottom: 20 },
  emptyBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  emptyBtnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  emptyTipCard: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    maxWidth: 340,
  },
  emptyTipText: { flex: 1, fontSize: 12.5, color: '#166534', lineHeight: 18 },
});
