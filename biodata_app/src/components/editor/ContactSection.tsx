import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { ContactData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface ContactSectionProps {
  data: ContactData;
  onChange: (field: keyof ContactData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Contact Details"
      iconName="call-outline"
      description="Primary phone number, contact person, email, and address"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Contact Person"
          value={data.contactPerson}
          onChangeText={(v) => onChange('contactPerson', v)}
          placeholder="e.g. Rajesh Sharma (Father)"
        />

        <FormField
          label="Phone Number"
          value={data.phone}
          onChangeText={(v) => onChange('phone', v)}
          placeholder="e.g. +91 98765 43210"
          keyboardType="phone-pad"
        />

        <FormField
          label="Email Address"
          value={data.email}
          onChangeText={(v) => onChange('email', v)}
          placeholder="e.g. family.sharma@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          label="Street Address / Residence"
          value={data.address}
          onChangeText={(v) => onChange('address', v)}
          placeholder="e.g. Flat 402, Green Avenue, Sector 21"
        />

        <FormField
          label="City"
          value={data.city}
          onChangeText={(v) => onChange('city', v)}
          placeholder="e.g. Gurugram"
        />

        <FormField
          label="State"
          value={data.state}
          onChangeText={(v) => onChange('state', v)}
          placeholder="e.g. Haryana"
        />

        <FormField
          label="Country"
          value={data.country}
          onChangeText={(v) => onChange('country', v)}
          placeholder="e.g. India"
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
