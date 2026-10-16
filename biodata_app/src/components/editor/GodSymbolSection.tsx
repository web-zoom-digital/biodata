import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { GOD_SYMBOLS } from '@/data/god-symbols';
import type { GodSymbol } from '@/types/biodata';
import { TemplateGodSymbol } from '@/templates/shared/TemplateGodSymbol';
import { FormSectionCard } from './FormSectionCard';
import { FormField } from './FormField';

interface GodSymbolSectionProps {
  selectedSymbol?: GodSymbol;
  blessing?: string;
  onSymbolChange: (symbol: GodSymbol | undefined, defaultBlessing?: string) => void;
  onBlessingChange: (blessing: string) => void;
}

export const GodSymbolSection: React.FC<GodSymbolSectionProps> = ({
  selectedSymbol,
  blessing = '',
  onSymbolChange,
  onBlessingChange,
}) => {
  return (
    <FormSectionCard
      title="Sacred Symbol & Blessing"
      iconName="sparkles-outline"
      description="Top header sacred symbol and invocation mantra"
      defaultOpen={false}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Select Symbol:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.symbolRow}
        >
          {/* Option: None */}
          <Pressable
            onPress={() => onSymbolChange(undefined, '')}
            style={({ pressed }) => [
              styles.symbolChip,
              !selectedSymbol && styles.symbolChipActive,
              pressed && { opacity: 0.8 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="No symbol"
          >
            <Text style={[styles.symbolChipText, !selectedSymbol && styles.symbolChipTextActive]}>
              None
            </Text>
          </Pressable>

          {/* God Symbols */}
          {GOD_SYMBOLS.map((sym) => {
            const isSelected = selectedSymbol?.id === sym.id;
            return (
              <Pressable
                key={sym.id}
                onPress={() => {
                  onSymbolChange(sym, sym.text || '');
                }}
                style={({ pressed }) => [
                  styles.symbolChip,
                  isSelected && styles.symbolChipActive,
                  pressed && { opacity: 0.8 },
                ]}
                accessibilityRole="button"
                accessibilityLabel={sym.name}
              >
                <TemplateGodSymbol symbol={sym} size={22} />
                <Text
                  style={[
                    styles.symbolChipText,
                    isSelected && styles.symbolChipTextActive,
                  ]}
                >
                  {sym.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <FormField
          label="Blessing Mantra / Invocational Text"
          value={blessing}
          onChangeText={onBlessingChange}
          placeholder="e.g. || Shree Ganeshaya Namah ||"
        />
      </View>
    </FormSectionCard>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  symbolRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 14,
  },
  symbolChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    gap: 6,
    minHeight: 40,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  symbolChipActive: {
    borderColor: '#047857',
    backgroundColor: '#ECFDF5',
  },
  symbolChipText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  symbolChipTextActive: {
    color: '#047857',
    fontWeight: '700',
  },
});
