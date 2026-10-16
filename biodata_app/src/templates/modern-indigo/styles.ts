import { tint, shade } from '@/lib/color';
import { FONT_BODY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export function indigoPalette(accent = '#5A52E0') {
  return {
    accent,
    deep: shade(accent, 0.4),
    soft: tint(accent, 0.94),
    ink: '#111827',
    muted: '#4B5563',
    labelGray: '#6B7280',
    bodyText: '#374151',
    sidebarBg: accent,
    sidebarText: '#FFFFFF',
    sidebarLabel: 'rgba(255, 255, 255, 0.72)',
    page: '#FFFFFF',
    trademark: tint(accent, 0.45),
  };
}

export function sidebarSection(): SectionStyles {
  return {
    wrapper: { marginBottom: 14 },
    rowLayout: 'stacked',
    title: {
      fontFamily: FONT_BODY,
      fontSize: 14,
      fontWeight: '700',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    row: { paddingVertical: 1, marginBottom: 5 },
    label: { color: 'rgba(255, 255, 255, 0.72)', fontSize: 10, fontWeight: '400', marginBottom: 1 },
    value: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', lineHeight: 15 },
  };
}

export function mainSection(accent = '#5A52E0'): SectionStyles {
  const p = indigoPalette(accent);
  return {
    wrapper: { marginBottom: 13 },
    title: {
      fontFamily: FONT_BODY,
      fontSize: 15,
      fontWeight: '700',
      color: p.deep,
      borderLeftWidth: 3.5,
      borderLeftColor: p.accent,
      paddingLeft: 8,
      marginBottom: 7,
    },
    row: { paddingVertical: 1.5, marginBottom: 3 },
    label: { color: p.labelGray, fontSize: 10.5, fontWeight: '400' },
    value: { color: p.ink, fontSize: 11, fontWeight: '600', lineHeight: 15 },
    text: { color: p.bodyText, lineHeight: 16, fontSize: 10.5, fontWeight: '400' },
    labelWidth: 146,
  };
}
