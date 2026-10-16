export interface ClassicGaneshaPalette {
  page: string;
  accent: string;
  accentSoft: string;
  line: string;
  lineSoft: string;
  ink: string;
  inkMuted: string;
  label: string;
  border: string;
  trademark: string;
}

import { tint } from '@/lib/color';

export const classicGaneshaPalette = (accent = '#7C2D12'): ClassicGaneshaPalette => {
  const primary = accent || '#7C2D12';
  return {
    page: '#FFFFFF',
    accent: primary,
    accentSoft: tint(primary, 0.94),
    line: primary,
    lineSoft: '#E5E7EB',
    ink: '#111827',
    inkMuted: '#374151',
    label: '#1F2937',
    border: '#D1D5DB',
    trademark: '#9CA3AF',
  };
};
