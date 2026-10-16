import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FamilyData, SiblingItem } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface FamilyDetailsSectionProps {
  data: FamilyData;
  onChange: (field: keyof FamilyData, value: any) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const FamilyDetailsSection: React.FC<FamilyDetailsSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  const handleAddSibling = (relation: 'Brother' | 'Sister') => {
    const newSibling: SiblingItem = {
      id: `sib_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      relation,
      name: '',
      details: '',
    };
    onChange('siblings', [...(data.siblings || []), newSibling]);
  };

  const handleUpdateSibling = (id: string, updates: Partial<SiblingItem>) => {
    const next = (data.siblings || []).map((s) =>
      s.id === id ? { ...s, ...updates } : s
    );
    onChange('siblings', next);
  };

  const handleRemoveSibling = (id: string) => {
    const next = (data.siblings || []).filter((s) => s.id !== id);
    onChange('siblings', next);
  };

  return (
    <FormSectionCard
      title="Family Details"
      iconName="people-outline"
      description="Parents, siblings, family type, and native background"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Father's Name"
          value={data.fatherName}
          onChangeText={(v) => onChange('fatherName', v)}
          placeholder="e.g. Rajesh Sharma"
        />

        <FormField
          label="Father's Occupation"
          value={data.fatherOccupation}
          onChangeText={(v) => onChange('fatherOccupation', v)}
          placeholder="e.g. Retired Bank Manager"
        />

        <FormField
          label="Mother's Name"
          value={data.motherName}
          onChangeText={(v) => onChange('motherName', v)}
          placeholder="e.g. Sunita Sharma"
        />

        <FormField
          label="Mother's Occupation"
          value={data.motherOccupation}
          onChangeText={(v) => onChange('motherOccupation', v)}
          placeholder="e.g. Homemaker"
        />

        {/* Siblings Sub-Section */}
        <View style={styles.siblingsBox}>
          <View style={styles.siblingsHeader}>
            <Text style={styles.subHeading}>Siblings (Brothers & Sisters)</Text>
            <View style={styles.addBtnRow}>
              <Pressable
                onPress={() => handleAddSibling('Brother')}
                style={({ pressed }) => [styles.addPill, pressed && { opacity: 0.8 }]}
                accessibilityRole="button"
                accessibilityLabel="Add Brother"
              >
                <Ionicons name="add" size={14} color="#047857" />
                <Text style={styles.addPillText}>+ Brother</Text>
              </Pressable>

              <Pressable
                onPress={() => handleAddSibling('Sister')}
                style={({ pressed }) => [styles.addPill, pressed && { opacity: 0.8 }]}
                accessibilityRole="button"
                accessibilityLabel="Add Sister"
              >
                <Ionicons name="add" size={14} color="#047857" />
                <Text style={styles.addPillText}>+ Sister</Text>
              </Pressable>
            </View>
          </View>

          {(data.siblings || []).map((sib, index) => (
            <View key={sib.id} style={styles.siblingRowCard}>
              <View style={styles.siblingRowTop}>
                {/* Relation Switcher */}
                <View style={styles.relationToggle}>
                  <Pressable
                    onPress={() => handleUpdateSibling(sib.id, { relation: 'Brother' })}
                    style={[
                      styles.relationOption,
                      sib.relation === 'Brother' && styles.relationOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.relationOptionText,
                        sib.relation === 'Brother' && styles.relationOptionTextActive,
                      ]}
                    >
                      Brother
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleUpdateSibling(sib.id, { relation: 'Sister' })}
                    style={[
                      styles.relationOption,
                      sib.relation === 'Sister' && styles.relationOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.relationOptionText,
                        sib.relation === 'Sister' && styles.relationOptionTextActive,
                      ]}
                    >
                      Sister
                    </Text>
                  </Pressable>
                </View>

                {/* Delete Sibling */}
                <Pressable
                  onPress={() => handleRemoveSibling(sib.id)}
                  style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}
                  accessibilityRole="button"
                  accessibilityLabel="Remove this sibling"
                >
                  <Ionicons name="close-circle-outline" size={20} color="#DC2626" />
                </Pressable>
              </View>

              <FormField
                label="Name"
                value={sib.name}
                onChangeText={(v) => handleUpdateSibling(sib.id, { name: v })}
                placeholder="e.g. Riya Sharma"
              />

              <FormField
                label="Status / Details"
                value={sib.details || ''}
                onChangeText={(v) => handleUpdateSibling(sib.id, { details: v })}
                placeholder="e.g. Younger, MBA student, Married"
              />
            </View>
          ))}
        </View>

        <FormField
          label="Family Type"
          value={data.familyType}
          onChangeText={(v) => onChange('familyType', v)}
          placeholder="e.g. Nuclear or Joint"
        />

        <FormField
          label="Family Values"
          value={data.familyValues}
          onChangeText={(v) => onChange('familyValues', v)}
          placeholder="e.g. Traditional, Moderate, Progressive"
        />

        <FormField
          label="Native Place"
          value={data.nativePlace}
          onChangeText={(v) => onChange('nativePlace', v)}
          placeholder="e.g. Jaipur, Rajasthan"
        />
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  formGrid: {
    paddingTop: 8,
  },
  siblingsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 14,
  },
  siblingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  subHeading: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  addBtnRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  addPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#047857',
  },
  siblingRowCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 10,
  },
  siblingRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  relationToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
  },
  relationOption: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  relationOptionActive: {
    backgroundColor: '#047857',
  },
  relationOptionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  relationOptionTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  deleteBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
});
