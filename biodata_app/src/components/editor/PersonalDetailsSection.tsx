import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { PersonalDetailsData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface PersonalDetailsSectionProps {
  data: PersonalDetailsData;
  onChange: (field: keyof PersonalDetailsData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Personal Details"
      iconName="person-outline"
      description="Name, date of birth, height, and personal appearance"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={true}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Full Name *"
          value={data.fullName}
          onChangeText={(v) => onChange('fullName', v)}
          placeholder="e.g. Aarav Sharma"
        />

        <FormField
          label="Date of Birth"
          value={data.dateOfBirth}
          onChangeText={(v) => onChange('dateOfBirth', v)}
          placeholder="e.g. 1998-03-12 or 12 March 1998"
          hint="Supports YYYY-MM-DD or readable text"
        />

        <FormField
          label="Time of Birth"
          value={data.timeOfBirth}
          onChangeText={(v) => onChange('timeOfBirth', v)}
          placeholder="e.g. 06:45 AM"
        />

        <FormField
          label="Place of Birth"
          value={data.placeOfBirth}
          onChangeText={(v) => onChange('placeOfBirth', v)}
          placeholder="e.g. Jaipur, Rajasthan"
        />

        <FormField
          label="Height"
          value={data.height}
          onChangeText={(v) => onChange('height', v)}
          placeholder="e.g. 5 ft 10 in"
        />

        <FormField
          label="Age"
          value={data.age}
          onChangeText={(v) => onChange('age', v)}
          placeholder="e.g. 27 years (auto-calculated if blank)"
        />

        <FormField
          label="Blood Group"
          value={data.bloodGroup}
          onChangeText={(v) => onChange('bloodGroup', v)}
          placeholder="e.g. B+, O+, AB+"
        />

        <FormField
          label="Complexion"
          value={data.complexion}
          onChangeText={(v) => onChange('complexion', v)}
          placeholder="e.g. Fair, Wheatish"
        />

        <FormField
          label="Marital Status"
          value={data.maritalStatus}
          onChangeText={(v) => onChange('maritalStatus', v)}
          placeholder="e.g. Never married"
        />

        <FormField
          label="Weight"
          value={data.weight}
          onChangeText={(v) => onChange('weight', v)}
          placeholder="e.g. 70 kg"
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
