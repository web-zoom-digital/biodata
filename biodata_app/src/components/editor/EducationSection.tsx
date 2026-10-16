import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { EducationData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface EducationSectionProps {
  data: EducationData;
  onChange: (field: keyof EducationData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Education"
      iconName="school-outline"
      description="Highest degree, qualifications, and colleges attended"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Highest Qualification"
          value={data.highestQualification}
          onChangeText={(v) => onChange('highestQualification', v)}
          placeholder="e.g. B.Tech in Computer Science"
        />

        <FormField
          label="Degree"
          value={data.degree}
          onChangeText={(v) => onChange('degree', v)}
          placeholder="e.g. Bachelor of Technology"
        />

        <FormField
          label="College / University"
          value={data.institution}
          onChangeText={(v) => onChange('institution', v)}
          placeholder="e.g. Malaviya National Institute of Technology"
        />

        <FormField
          label="Additional Education"
          value={data.additional}
          onChangeText={(v) => onChange('additional', v)}
          placeholder="e.g. Certifications, Schooling, Diplomas"
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
