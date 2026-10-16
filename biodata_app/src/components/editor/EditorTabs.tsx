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

export type EditorTabKey = 'edit' | 'preview';

interface EditorTabsProps {
  activeTab: EditorTabKey;
  onTabChange: (tab: EditorTabKey) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 10 : 8);

  return (
    <View style={[styles.tabContainer, { paddingBottom: bottomPadding }]}>
      <View style={styles.tabTrack}>
        {/* EDIT TAB */}
        <Pressable
          onPress={() => onTabChange('edit')}
          style={[
            styles.tabButton,
            activeTab === 'edit' && styles.tabButtonActive,
          ]}
          accessibilityRole="tab"
          accessibilityLabel="Edit Biodata Form"
          accessibilityState={{ selected: activeTab === 'edit' }}
        >
          <Ionicons
            name="create-outline"
            size={18}
            color={activeTab === 'edit' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'edit' && styles.tabTextActive,
            ]}
          >
            EDIT
          </Text>
        </Pressable>

        {/* PREVIEW TAB */}
        <Pressable
          onPress={() => onTabChange('preview')}
          style={[
            styles.tabButton,
            activeTab === 'preview' && styles.tabButtonActive,
          ]}
          accessibilityRole="tab"
          accessibilityLabel="Preview A4 Biodata"
          accessibilityState={{ selected: activeTab === 'preview' }}
        >
          <Ionicons
            name="eye-outline"
            size={18}
            color={activeTab === 'preview' ? '#FFFFFF' : '#475569'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'preview' && styles.tabTextActive,
            ]}
          >
            PREVIEW
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    alignItems: 'center',
    width: '100%',
    zIndex: 40,
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
  tabTrack: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 999,
    padding: 3,
    maxWidth: 380,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 999,
    minHeight: 44,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  tabButtonActive: {
    backgroundColor: '#047857',
    ...Platform.select({
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 2px 6px rgba(4, 120, 87, 0.25)',
      } as any,
    }),
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    letterSpacing: 0.6,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
});
