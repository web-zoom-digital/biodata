import { Platform } from 'react-native';

/**
 * Standard A4 Page Dimensions (Portrait)
 * Physical: 210mm × 297mm
 * Digital at 96 DPI: 794px × 1123px (Aspect Ratio: ~0.70703)
 * PDF Points at 72 DPI: 595.28pt × 841.89pt
 */
export const A4_WIDTH = 794;
export const A4_HEIGHT = 1123;
export const A4_ASPECT_RATIO = A4_WIDTH / A4_HEIGHT; // ~0.7070347
export const A4_HEIGHT_TO_WIDTH_RATIO = A4_HEIGHT / A4_WIDTH; // ~1.4143576

export const A4_PDF_POINTS_WIDTH = 595.28;
export const A4_PDF_POINTS_HEIGHT = 841.89;

/**
 * Calculate scale to fit the entire A4 page (both width AND height)
 * into any container while preserving aspect ratio and showing all four edges.
 */
export function calculateFitScale(
  availableWidth: number,
  availableHeight: number,
  padding = 0,
  maxScale = 1.05,
  minScale = 0.2
): number {
  const usableW = Math.max(availableWidth - padding * 2, 80);
  const usableH = Math.max(availableHeight - padding * 2, 120);

  const scaleW = usableW / A4_WIDTH;
  const scaleH = usableH / A4_HEIGHT;

  // Fit both dimensions without clipping either edge
  const fitScale = Math.min(scaleW, scaleH);
  return Math.min(Math.max(fitScale, minScale), maxScale);
}

/**
 * Calculate dimensions for a gallery card preview that preserves exact A4 aspect ratio.
 */
export function calculateCardPreviewDimensions(cardWidth: number): {
  cardWidth: number;
  cardHeight: number;
  scale: number;
} {
  const w = Math.max(Math.floor(cardWidth), 60);
  const h = Math.round(w * A4_HEIGHT_TO_WIDTH_RATIO);
  const scale = w / A4_WIDTH;
  return { cardWidth: w, cardHeight: h, scale };
}

export const FONT_DISPLAY = Platform.select({
  ios: 'Georgia',
  android: 'serif',
  default: 'serif',
});

export const FONT_BODY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'sans-serif',
});
