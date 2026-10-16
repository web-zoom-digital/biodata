import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface PartnerExpectationsSectionProps {
  expectations: string;
  onChange: (value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const PartnerExpectationsSection: React.FC<PartnerExpectationsSectionProps> = ({
  expectations,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Partner Expectations"
      iconName="heart-outline"
      description="Qualities and preferences sought in a prospective partner"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.container}>
        <FormField
          label="Partner Expectations"
          value={expectations}
          onChangeText={onChange}
          placeholder="Looking for a well-educated, kind, and family-oriented partner with mutual respect..."
          multiline={true}
          numberOfLines={4}
          hint="Clearly state your preferences politely"
        />
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
  },
});
