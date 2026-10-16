import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CustomFieldItem } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface CustomFieldsSectionProps {
  customFields: CustomFieldItem[];
  onChange: (fields: CustomFieldItem[]) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const CustomFieldsSection: React.FC<CustomFieldsSectionProps> = ({
  customFields = [],
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  const handleAddField = () => {
    const newField: CustomFieldItem = {
      id: `cf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      label: '',
      value: '',
    };
    onChange([...customFields, newField]);
  };

  const handleUpdateField = (id: string, updates: Partial<CustomFieldItem>) => {
    const next = customFields.map((f) =>
      f.id === id ? { ...f, ...updates } : f
    );
    onChange(next);
  };

  const handleRemoveField = (id: string) => {
    const next = customFields.filter((f) => f.id !== id);
    onChange(next);
  };

  return (
    <FormSectionCard
      title="Additional Information"
      iconName="add-circle-outline"
      description="Add any custom labels & values (e.g. Property, Visa status, Marriage plan)"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.container}>
        {customFields.map((field) => (
          <View key={field.id} style={styles.fieldCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Custom Field</Text>
              <Pressable
                onPress={() => handleRemoveField(field.id)}
                style={({ pressed }) => [styles.deleteBtn, pressed && { opacity: 0.7 }]}
                accessibilityRole="button"
                accessibilityLabel="Delete this field"
              >
                <Ionicons name="trash-outline" size={17} color="#DC2626" />
              </Pressable>
            </View>

            <FormField
              label="Field Name / Label"
              value={field.label}
              onChangeText={(v) => handleUpdateField(field.id, { label: v })}
              placeholder="e.g. Visa Status, Property, Marriage Plan"
            />

            <FormField
              label="Field Value"
              value={field.value}
              onChangeText={(v) => handleUpdateField(field.id, { value: v })}
              placeholder="e.g. Permanent Resident, Within 6 months"
            />
          </View>
        ))}

        <Pressable
          onPress={handleAddField}
          style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.85 }]}
          accessibilityRole="button"
          accessibilityLabel="Add custom field"
        >
          <Ionicons name="add" size={18} color="#047857" />
          <Text style={styles.addBtnText}>+ Add Custom Field</Text>
        </Pressable>
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
  fieldCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  deleteBtn: {
    padding: 4,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#047857',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#ECFDF5',
    paddingVertical: 12,
    minHeight: 46,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#047857',
  },
});
