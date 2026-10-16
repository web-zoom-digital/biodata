import { tint, shade } from '@/lib/color';
import type { SectionStyles } from '../shared/TemplateSection';
import { FONT_BODY } from '../shared/constants';

export function islamicIvoryPalette(accent = '#047857') {
  return {
    accent,
    page: '#FAFAF9',
    soft: tint(accent, 0.94),
    ink: '#1C1917',
    deep: shade(accent, 0.35),
    border: tint(accent, 0.75),
    line: tint(accent, 0.5),
    muted: '#475569',
    trademark: accent,
  };
}

export function islamicIvorySection(accent = '#047857'): SectionStyles {
  const p = islamicIvoryPalette(accent);
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
    label: { fontFamily: FONT_BODY, color: '#475569', fontSize: 9.5, fontWeight: '400' },
    value: { fontFamily: FONT_BODY, color: '#0F172A', fontSize: 10, fontWeight: '600', lineHeight: 13.5 },
    text: { fontFamily: FONT_BODY, color: '#1E293B', fontSize: 9.5, lineHeight: 14 },
    labelWidth: 114,
  };
}
