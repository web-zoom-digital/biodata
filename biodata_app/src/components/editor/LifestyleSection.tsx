import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { LifestyleData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface LifestyleSectionProps {
  data: LifestyleData;
  onChange: (field: keyof LifestyleData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const LifestyleSection: React.FC<LifestyleSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Lifestyle & Interests"
      iconName="cafe-outline"
      description="Dietary habits, smoking, drinking, languages, and hobbies"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Food Preference"
          value={data.food}
          onChangeText={(v) => onChange('food', v)}
          placeholder="e.g. Vegetarian, Non-Vegetarian, Eggetarian"
        />

        <FormField
          label="Smoking"
          value={data.smoking}
          onChangeText={(v) => onChange('smoking', v)}
          placeholder="e.g. No, Never"
        />

        <FormField
          label="Drinking"
          value={data.drinking}
          onChangeText={(v) => onChange('drinking', v)}
          placeholder="e.g. No, Socially"
        />

        <FormField
          label="Hobbies"
          value={data.hobbies}
          onChangeText={(v) => onChange('hobbies', v)}
          placeholder="e.g. Traveling, Photography, Music, Cooking"
        />

        <FormField
          label="Interests"
          value={data.interests}
          onChangeText={(v) => onChange('interests', v)}
          placeholder="e.g. Fitness, Reading, Technology"
        />

        <FormField
          label="Languages Known"
          value={data.languages}
          onChangeText={(v) => onChange('languages', v)}
          placeholder="e.g. Hindi, English, Gujarati"
        />
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  formGrid: {
    paddingTop: 8,
  },
});
