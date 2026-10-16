import { tint, shade } from '@/lib/color';
import { FONT_BODY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export function goldPalette(accent = '#BF8226') {
  return {
    accent,
    deep: shade(accent, 0.45),
    ribbon: accent,
    page: '#FFFDF7',
    ink: '#1F1A14',
    muted: '#7A6652',
    line: accent,
    lineSoft: tint(accent, 0.65),
    labelBg: tint(accent, 0.92),
    trademark: accent,
  };
}

export function goldSection(accent = '#BF8226'): SectionStyles {
  const p = goldPalette(accent);
  return {
    wrapper: { marginBottom: 10 },
    rowLayout: 'inline',
    labelWidth: 115,
    row: {
      borderBottomWidth: 1,
      borderBottomColor: p.lineSoft,
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    label: {
      backgroundColor: p.labelBg,
      color: p.deep,
      paddingHorizontal: 8,
      paddingVertical: 3.5,
      borderRightWidth: 1,
      borderRightColor: p.lineSoft,
      fontWeight: '600',
      fontSize: 10.5,
      fontFamily: FONT_BODY,
    },
    value: {
      paddingHorizontal: 8,
      paddingVertical: 3.5,
      color: p.ink,
      fontSize: 11,
      fontWeight: '500',
      fontFamily: FONT_BODY,
    },
    text: {
      color: '#372E26',
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 10.5,
      lineHeight: 16,
      fontFamily: FONT_BODY,
    },
  };
}
