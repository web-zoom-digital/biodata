import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ProfessionData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface ProfessionSectionProps {
  data: ProfessionData;
  onChange: (field: keyof ProfessionData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const ProfessionSection: React.FC<ProfessionSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Professional Details"
      iconName="briefcase-outline"
      description="Occupation, current employer, role, location, and income"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Occupation"
          value={data.occupation}
          onChangeText={(v) => onChange('occupation', v)}
          placeholder="e.g. Software Engineer"
        />

        <FormField
          label="Designation"
          value={data.designation}
          onChangeText={(v) => onChange('designation', v)}
          placeholder="e.g. Senior Software Engineer"
        />

        <FormField
          label="Company / Employer"
          value={data.company}
          onChangeText={(v) => onChange('company', v)}
          placeholder="e.g. Tech Solutions Pvt. Ltd."
        />

        <FormField
          label="Work Location"
          value={data.workLocation}
          onChangeText={(v) => onChange('workLocation', v)}
          placeholder="e.g. Gurugram, Haryana"
        />

        <FormField
          label="Annual Income"
          value={data.annualIncome}
          onChangeText={(v) => onChange('annualIncome', v)}
          placeholder="e.g. INR 18 LPA (Optional)"
        />

        <FormField
          label="Business Details"
          value={data.businessDetails}
          onChangeText={(v) => onChange('businessDetails', v)}
          placeholder="e.g. Family business or startup details"
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
