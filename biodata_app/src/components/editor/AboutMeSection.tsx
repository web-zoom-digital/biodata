import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface AboutMeSectionProps {
  about: string;
  onChange: (value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({
  about,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="About Me"
      iconName="document-text-outline"
      description="Brief summary of personality, values, and life outlook"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.container}>
        <FormField
          label="About Me (Personal Bio)"
          value={about}
          onChangeText={onChange}
          placeholder="I am a calm, family-oriented person who enjoys my work and weekends equally..."
          multiline={true}
          numberOfLines={4}
          hint="2–4 sentences describing your nature and values"
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
