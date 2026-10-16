import { shade, tint, alpha } from '@/lib/color';

export function auroraSagePalette(accent = '#3D5A4C') {
  const effectiveAccent = accent || '#3D5A4C';
  const GOLD = '#C8A97E';
  const GOLD_BRIGHT = '#D4AF37';

  return {
    accent: effectiveAccent,
    accentDark: shade(effectiveAccent, 0.35),
    accentDeep: '#1C2B24',
    accentLight: tint(effectiveAccent, 0.88),
    accentSoft: alpha(effectiveAccent, 0.12),
    accentBadge: '#EFF4F1',
    gold: GOLD,
    goldBright: GOLD_BRIGHT,
    goldDark: '#9C7A4A',
    goldLight: '#F5EADB',
    goldSoft: alpha(GOLD, 0.3),
    page: '#F9F7F2',
    pageSecondary: '#F3EFE7',
    card: '#FFFFFF',
    cardBorder: '#E8E4DA',
    cardSoftBorder: '#EFECE4',
    ink: '#1C2B24',
    inkMuted: '#54665C',
    inkSubtle: '#8A9990',
    statBadgeBg: '#FAF5EE',
    statBadgeBorder: '#E8DBC9',
    timelineDot: '#C8A97E',
    quoteMark: alpha(effectiveAccent, 0.15),
    trademark: '#7D9185',
  };
}
