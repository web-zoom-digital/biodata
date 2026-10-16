import { tint, shade, alpha } from '@/lib/color';
import type { SectionStyles } from '../shared/TemplateSection';
import { FONT_BODY } from '../shared/constants';

export function islamicEmeraldPalette(accent = '#F59E0B') {
  return {
    accent,
    page: '#0D3B3E',
    soft: '#134E4A',
    ink: '#FFFFFF',
    gold: accent,
    border: alpha(accent, 0.45),
    line: tint(accent, 0.4),
    muted: '#A7F3D0',
    trademark: accent,
  };
}

export function islamicEmeraldSection(accent = '#F59E0B'): SectionStyles {
  const p = islamicEmeraldPalette(accent);
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
    label: { fontFamily: FONT_BODY, color: '#A7F3D0', fontSize: 9.5, fontWeight: '400' },
    value: { fontFamily: FONT_BODY, color: '#FFFFFF', fontSize: 10, fontWeight: '600', lineHeight: 13.5 },
    text: { fontFamily: FONT_BODY, color: '#FFFFFF', fontSize: 9.5, lineHeight: 14 },
    labelWidth: 114,
  };
}
