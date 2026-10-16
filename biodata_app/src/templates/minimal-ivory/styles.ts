import { alpha } from '@/lib/color';
import { FONT_DISPLAY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export function ivoryPalette(accent = '#57534E') {
  return {
    accent,
    page: '#FAF8F3',
    ink: '#25221E',
    muted: '#8A8378',
    line: '#E4DFD3',
    faint: alpha(accent, 0.12),
  };
}

export function ivorySection(accent = '#57534E'): SectionStyles {
  const p = ivoryPalette(accent);
  return {
    wrapper: {
      marginBottom: 6,
    },
    title: {
      fontFamily: FONT_DISPLAY,
      fontSize: 13,
      fontWeight: '500',
      fontStyle: 'italic',
      color: p.accent,
      marginBottom: 2.5,
    },
    row: {
      borderBottomWidth: 1,
      borderBottomColor: p.line,
      paddingVertical: 1.2,
    },
    label: {
      color: p.muted,
      fontSize: 9.8,
      fontWeight: '500',
    },
    value: {
      color: p.ink,
      fontSize: 10.2,
      fontWeight: '500',
    },
    text: {
      color: p.ink,
      lineHeight: 14.5,
      fontSize: 10,
    },
    labelWidth: 106,
  };
}
