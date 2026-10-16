import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import type { GodSymbol } from '@/types/biodata';

interface Props {
  symbol?: GodSymbol;
  size?: number;
  style?: ViewStyle;
  color?: string;
  borderColor?: string;
  backgroundColor?: string;
}

export const TemplateGodSymbol: React.FC<Props> = ({
  symbol,
  size = 28,
  style,
  color = '#B58B3A',
  borderColor = '#B58B3A',
  backgroundColor = '#FFFFFF',
}) => {
  if (!symbol) return null;

  const glyph =
    symbol.id === 'islamic-bismillah'
      ? '﷽'
      : symbol.id === 'islamic-crescent'
      ? '☪'
      : symbol.id === 'islamic-786'
      ? '۷۸۶'
      : symbol.id === 'islamic-allah'
      ? 'ﷻ'
      : symbol.id === 'jain-namokar'
      ? '卐'
      : symbol.id === 'sikh-ik-onkar'
      ? 'ੴ'
      : 'ॐ';

  const isBismillah = symbol.id === 'islamic-bismillah';

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor,
          backgroundColor,
        },
        style,
      ]}
    >
      {symbol.src ? (
        <Image
          source={{ uri: symbol.src }}
          style={{ width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }}
          resizeMode="contain"
        />
      ) : (
        <Text
          style={[
            styles.symbolText,
            {
              color,
              fontSize: isBismillah ? size * 0.48 : size * 0.56,
            },
          ]}
        >
          {glyph}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#B58B3A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  symbolText: {
    color: '#B58B3A',
    fontWeight: '700',
    textAlign: 'center',
  },
});
