import { tint, shade } from '@/lib/color';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import type { SectionStyles } from '../shared/TemplateSection';

export function rosePalette(accent = '#BE5B75') {
  return {
    accent,
    deep: shade(accent, 0.4),
    page: '#FAF7F5',
    card: '#FFFFFF',
    border: tint(accent, 0.82),
    ink: '#1F2430',
    muted: '#6B7280',
    subtitle: '#6B7280',
    bodyText: '#374151',
    tealRing: shade(accent, 0.2),
    trademark: accent,
  };
}

export function roseSection(accent = '#BE5B75'): SectionStyles {
  const p = rosePalette(accent);
  return {
    wrapper: { marginBottom: 12 },
    title: {
      fontFamily: FONT_DISPLAY,
      fontStyle: 'italic',
      fontSize: 15,
      fontWeight: '700',
      color: p.deep,
    },
    row: { paddingVertical: 1.5, marginBottom: 3.5 },
    label: { fontFamily: FONT_BODY, color: p.muted, fontSize: 10.5, fontWeight: '400' },
    value: { fontFamily: FONT_BODY, color: p.ink, fontSize: 11, fontWeight: '600', lineHeight: 15 },
    text: { fontFamily: FONT_BODY, color: p.bodyText, lineHeight: 16, fontSize: 10.5, fontWeight: '400' },
    labelWidth: 128,
  };
}
