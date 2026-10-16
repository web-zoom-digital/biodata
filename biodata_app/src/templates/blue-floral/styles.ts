import { tint, shade } from '@/lib/color';
import type { SectionStyles } from '../shared/TemplateSection';
import { FONT_BODY } from '../shared/constants';

export function bluePalette(accent = '#2563EB') {
  return {
    accent,
    page: '#FFFFFF',
    soft: tint(accent, 0.93),
    ink: '#0F172A',
    deep: shade(accent, 0.4),
    border: tint(accent, 0.78),
    line: tint(accent, 0.45),
    muted: '#475569',
    trademark: tint(accent, 0.45),
  };
}

export function blueSection(accent = '#2563EB'): SectionStyles {
  const p = bluePalette(accent);
  return {
    wrapper: { marginBottom: 12 },
    title: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      fontWeight: '700',
      color: accent,
      borderBottomWidth: 1.5,
      borderBottomColor: p.line,
      paddingBottom: 2,
      marginBottom: 6,
    },
    row: { paddingVertical: 1, marginBottom: 3 },
    label: { fontFamily: FONT_BODY, color: '#475569', fontSize: 10, fontWeight: '400' },
    value: { fontFamily: FONT_BODY, color: '#0F172A', fontSize: 10.5, fontWeight: '600', lineHeight: 14 },
    text: { fontFamily: FONT_BODY, color: '#334151', fontSize: 10.5, lineHeight: 16 },
    labelWidth: 104,
  };
}
