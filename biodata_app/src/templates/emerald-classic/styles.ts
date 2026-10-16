import { alpha, shade, tint } from '@/lib/color';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export function emeraldPalette(accent = '#059669') {
  return {
    accent,
    dark: shade(accent, 0.28),
    soft: tint(accent, 0.92),
    line: alpha(accent, 0.35),
    ink: '#0F172A',
    muted: '#64748B',
    page: '#FFFFFF',
    border: '#E2E8F0',
  };
}

export function emeraldSection(accent = '#059669'): SectionStyles {
  const p = emeraldPalette(accent);
  return {
    wrapper: {
      marginBottom: 8,
    },
    title: {
      fontFamily: FONT_DISPLAY,
      fontSize: 13.5,
      fontWeight: '700',
      color: p.dark,
      paddingBottom: 2,
      borderBottomWidth: 1.5,
      borderBottomColor: p.line,
      marginBottom: 3,
    },
    row: {
      borderBottomWidth: 1,
      borderBottomColor: '#F1F5F9',
      paddingVertical: 1.5,
      marginBottom: 1,
    },
    label: {
      fontFamily: FONT_BODY,
      color: p.muted,
      fontSize: 9.5,
      fontWeight: '500',
    },
    value: {
      fontFamily: FONT_BODY,
      color: p.ink,
      fontSize: 10,
      fontWeight: '500',
    },
    text: {
      fontFamily: FONT_BODY,
      color: p.ink,
      lineHeight: 14,
      fontSize: 9.5,
    },
    labelWidth: 114,
  };
}
