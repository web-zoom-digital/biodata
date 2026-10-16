import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { alpha, tint, shade } from '@/lib/color';
import { FONT_DISPLAY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export const GOLD = '#B58B3A';
export const BURGUNDY = '#681A25';

export function royalPalette(accent = BURGUNDY) {
  return {
    accent,
    deep: shade(accent, 0.25),
    gold: accent,
    goldSoft: alpha(accent, 0.55),
    page: '#FBF6EA',
    ink: '#3A2A24',
    muted: '#7A6658',
    card: tint(accent, 0.95),
  };
}

export function royalSection(accent = BURGUNDY): SectionStyles {
  const p = royalPalette(accent);
  return {
    wrapper: { marginBottom: 6 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: p.goldSoft,
      paddingVertical: 1.2,
    },
    label: {
      color: p.muted,
      fontSize: 10,
      fontWeight: '400',
    },
    value: {
      color: p.ink,
      fontSize: 10.5,
      fontWeight: '500',
    },
    text: {
      color: p.ink,
      textAlign: 'center',
      fontStyle: 'italic',
      fontFamily: FONT_DISPLAY,
      fontSize: 10.5,
      lineHeight: 15,
    },
    labelWidth: 106,
    renderTitle: (title) => (
      <View style={styles.titleWrap}>
        <Text style={[styles.title, { color: p.deep }]}>{title}</Text>
        <View style={styles.lineContainer}>
          <View style={[styles.goldLine, { backgroundColor: p.gold }]} />
          <View style={[styles.goldDiamond, { backgroundColor: p.gold }]} />
          <View style={[styles.goldLine, { backgroundColor: p.gold }]} />
        </View>
      </View>
    ),
  };
}

const styles = StyleSheet.create({
  titleWrap: {
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: FONT_DISPLAY,
    fontSize: 15,
    fontWeight: '600',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 8,
    marginTop: 2,
    marginBottom: 3,
  },
  goldLine: {
    width: 34,
    height: 1,
  },
  goldDiamond: {
    width: 6.5,
    height: 6.5,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 3.5,
  },
});
