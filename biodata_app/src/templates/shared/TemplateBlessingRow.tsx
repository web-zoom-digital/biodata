import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import type { BiodataModel, GodSymbol } from '@/types/biodata';
import { TemplateGodSymbol } from './TemplateGodSymbol';
import { FONT_BODY } from './constants';

interface Props {
  model: BiodataModel;
  color?: string;
  symbolColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  symbolSize?: number;
  fontSize?: number;
  theme?: 'hindu' | 'islamic' | 'jain' | 'generic';
  defaultBlessing?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  center?: boolean;
}

export const TemplateBlessingRow: React.FC<Props> = ({
  model,
  color = '#B58B3A',
  symbolColor,
  borderColor,
  backgroundColor = '#FFFFFF',
  symbolSize = 22,
  fontSize = 12.5,
  theme = 'hindu',
  defaultBlessing,
  style,
  textStyle,
  center = true,
}) => {
  // Determine resolved symbol
  let resolvedSymbol: GodSymbol | undefined = model.godSymbol;

  if (theme === 'islamic') {
    const isIslamic = resolvedSymbol?.id?.startsWith('islamic');
    if (!isIslamic) {
      resolvedSymbol = { id: 'islamic-bismillah', name: 'Bismillah', text: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ' };
    }
  } else if (theme === 'jain') {
    if (!resolvedSymbol || resolvedSymbol.id === 'ganesha') {
      resolvedSymbol = { id: 'jain-namokar', name: 'Jain Namokar', text: '|| ॐ नमः सिद्धेभ्यः ||' };
    }
  } else {
    // Hindu / Generic
    if (!resolvedSymbol) {
      resolvedSymbol = { id: 'ganesha', name: 'Ganesha', text: '॥ श्री गणेशाय नमः ॥' };
    }
  }

  // Determine blessing text
  let blessingText = model.blessing?.trim();
  if (theme === 'islamic') {
    const isHindu =
      blessingText &&
      (blessingText.includes('गणेश') ||
        blessingText.includes('शिवाय') ||
        blessingText.includes('कृष्ण') ||
        blessingText.includes('समर्थ') ||
        blessingText.includes('ॐ') ||
        blessingText.includes('नमः') ||
        blessingText.toLowerCase().includes('ganesh'));
    if (!blessingText || isHindu) {
      blessingText = resolvedSymbol?.text || defaultBlessing || 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ';
    }
  } else {
    if (!blessingText) {
      blessingText = defaultBlessing || resolvedSymbol?.text || '॥ श्री गणेशाय नमः ॥';
    }
  }

  const sColor = symbolColor || color;
  const bColor = borderColor || sColor;

  return (
    <View
      style={[
        styles.row,
        center ? styles.centerAlign : styles.leftAlign,
        style,
      ]}
    >
      <TemplateGodSymbol
        symbol={resolvedSymbol}
        size={symbolSize}
        color={sColor}
        borderColor={bColor}
        backgroundColor={backgroundColor}
      />
      <Text
        style={[
          styles.text,
          { color, fontSize },
          textStyle,
        ]}
        numberOfLines={1}
      >
        {blessingText}
      </Text>
      <TemplateGodSymbol
        symbol={resolvedSymbol}
        size={symbolSize}
        color={sColor}
        borderColor={bColor}
        backgroundColor={backgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    marginBottom: 4,
  },
  centerAlign: {
    justifyContent: 'center',
  },
  leftAlign: {
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: FONT_BODY,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
