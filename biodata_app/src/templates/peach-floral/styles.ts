import { tint, shade } from '@/lib/color';
import type { SectionStyles } from '../shared/TemplateSection';
import { FONT_BODY } from '../shared/constants';

export function peachPalette(accent = '#EA580C') {
  return {
    accent,
    page: '#FFFDF7',
    soft: tint(accent, 0.93),
    ink: '#1C1917',
    deep: shade(accent, 0.38),
    border: tint(accent, 0.78),
    line: tint(accent, 0.5),
    muted: '#78716C',
    trademark: accent,
  };
}

export function peachSection(accent = '#EA580C'): SectionStyles {
  const p = peachPalette(accent);
  return {
    wrapper: { marginBottom: 8 },
    title: {
      fontFamily: FONT_BODY,
      fontSize: 13,
      fontWeight: '700',
      color: accent,
      borderBottomWidth: 1.5,
      borderBottomColor: p.line,
      paddingBottom: 2,
      marginBottom: 4,
    },
    row: { paddingVertical: 1, marginBottom: 2.5 },
    label: { fontFamily: FONT_BODY, color: '#78716C', fontSize: 9.5, fontWeight: '400' },
    value: { fontFamily: FONT_BODY, color: '#1C1917', fontSize: 10, fontWeight: '600', lineHeight: 13.5 },
    text: { fontFamily: FONT_BODY, color: '#44403C', fontSize: 9.5, lineHeight: 14 },
    labelWidth: 114,
  };
}
