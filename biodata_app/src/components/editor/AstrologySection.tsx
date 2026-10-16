import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { AstrologyData } from '@/types/biodata';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface AstrologySectionProps {
  data: AstrologyData;
  onChange: (field: keyof AstrologyData, value: string) => void;
  isEnabled?: boolean;
  onToggleEnabled?: (enabled: boolean) => void;
}

export const AstrologySection: React.FC<AstrologySectionProps> = ({
  data,
  onChange,
  isEnabled = true,
  onToggleEnabled,
}) => {
  return (
    <FormSectionCard
      title="Religion & Astrology"
      iconName="moon-outline"
      description="Religion, caste, gotra, rashi, nakshatra, and horoscope details"
      isEnabled={isEnabled}
      onToggleEnabled={onToggleEnabled}
      defaultOpen={false}
    >
      <View style={styles.formGrid}>
        <FormField
          label="Religion"
          value={data.religion}
          onChangeText={(v) => onChange('religion', v)}
          placeholder="e.g. Hindu, Jain, Muslim, Sikh"
        />

        <FormField
          label="Caste"
          value={data.caste}
          onChangeText={(v) => onChange('caste', v)}
          placeholder="e.g. Brahmin, Rajput, Kayastha"
        />

        <FormField
          label="Sub-caste"
          value={data.subCaste}
          onChangeText={(v) => onChange('subCaste', v)}
          placeholder="e.g. Gaur, Kanyakubja"
        />

        <FormField
          label="Gotra"
          value={data.gotra}
          onChangeText={(v) => onChange('gotra', v)}
          placeholder="e.g. Kashyap, Vatsa, Bharadwaj"
        />

        <FormField
          label="Rashi"
          value={data.rashi}
          onChangeText={(v) => onChange('rashi', v)}
          placeholder="e.g. Mithun, Mesh, Vrishchik"
        />

        <FormField
          label="Nakshatra"
          value={data.nakshatra}
          onChangeText={(v) => onChange('nakshatra', v)}
          placeholder="e.g. Ardra, Rohini, Anuradha"
        />

        <FormField
          label="Manglik Status"
          value={data.manglik}
          onChangeText={(v) => onChange('manglik', v)}
          placeholder="e.g. No, Yes, Anshik / Partial"
        />

        <FormField
          label="Kuldevta / Kuldevi"
          value={data.kuldevta}
          onChangeText={(v) => onChange('kuldevta', v)}
          placeholder="e.g. Shree Krishna, Khandoba"
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
