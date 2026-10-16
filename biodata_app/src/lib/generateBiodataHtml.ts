import type { BiodataModel, GodSymbol, ResolvedSection } from '@/types/biodata';
import type { TemplateDefinition } from '@/types/template';
import { balanceColumns, omit, pick } from '@/templates/shared/layout';
import { alpha, shade, tint } from '@/lib/color';
import { BACKGROUND_DATA_URIS } from '@/data/backgroundBase64';

export function getGodSymbolGlyph(symbol?: GodSymbol): string {
  if (!symbol) return '';
  switch (symbol.id) {
    case 'islamic-bismillah':
      return '﷽';
    case 'islamic-crescent':
      return '☪';
    case 'islamic-786':
      return '۷۸۶';
    case 'islamic-allah':
      return 'ﷻ';
    case 'jain-namokar':
      return '卐';
    case 'sikh-ik-onkar':
      return 'ੴ';
    default:
      return 'ॐ';
  }
}

function escapeHtml(str?: string | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isNonIslamicBlessing(b?: string): boolean {
  if (!b) return true;
  const lower = b.toLowerCase();
  return (
    b.includes('गणेश') ||
    b.includes('शिवाय') ||
    b.includes('कृष्ण') ||
    b.includes('समर्थ') ||
    b.includes('ॐ') ||
    b.includes('नमः') ||
    lower.includes('ganesh') ||
    lower.includes('shree') ||
    lower.includes('namah') ||
    lower.includes('om')
  );
}

function renderGodSymbolHtml(
  symbol?: GodSymbol,
  size = 28,
  color = '#B58B3A',
  borderColor = '#B58B3A',
  backgroundColor = '#FFFFFF'
): string {
  if (!symbol) return '';
  if (symbol.src) {
    return `<img src="${symbol.src}" alt="${escapeHtml(symbol.name || 'God Symbol')}" style="width: ${size}px; height: ${size}px; object-fit: contain; border-radius: 999px; background: ${backgroundColor}; border: 1.5px solid ${borderColor}; padding: 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);" />`;
  }
  const glyph = getGodSymbolGlyph(symbol);
  const isBismillah = symbol.id === 'islamic-bismillah';
  const fontSize = Math.round(isBismillah ? size * 0.48 : size * 0.56);
  return `<span style="display: inline-flex; align-items: center; justify-content: center; width: ${size}px; height: ${size}px; border-radius: 999px; background: ${backgroundColor}; border: 1.5px solid ${borderColor}; color: ${color}; font-size: ${fontSize}px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">${glyph}</span>`;
}

function renderBlessingHeaderHtml(
  model: BiodataModel,
  options: {
    color?: string;
    symbolColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    symbolSize?: number;
    fontSize?: number;
    theme?: 'hindu' | 'islamic' | 'jain' | 'generic';
    defaultBlessing?: string;
    center?: boolean;
    marginBottom?: number;
  } = {}
): string {
  const {
    color = '#B58B3A',
    symbolColor,
    borderColor,
    backgroundColor = '#FFFFFF',
    symbolSize = 22,
    fontSize = 13,
    theme = 'hindu',
    defaultBlessing,
    center = true,
    marginBottom = 6,
  } = options;

  let resolvedSymbol: GodSymbol | undefined = model.godSymbol;

  if (theme === 'islamic') {
    const isIslamic = resolvedSymbol?.id?.startsWith('islamic');
    if (!isIslamic) {
      resolvedSymbol = { id: 'islamic-bismillah', name: 'Bismillah', text: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ' };
    }
  } else if (theme === 'jain') {
    if (!resolvedSymbol || resolvedSymbol.id === 'ganesha') {
      resolvedSymbol = { id: 'jain-namokar', name: 'Jain Namokar', text: '|| ॐ नमः सिद्धेभ्यः ||' };
    }
  } else {
    if (!resolvedSymbol) {
      resolvedSymbol = { id: 'ganesha', name: 'Ganesha', text: '॥ श्री गणेशाय नमः ॥' };
    }
  }

  let blessingText = model.blessing?.trim();
  if (theme === 'islamic') {
    if (!blessingText || isNonIslamicBlessing(blessingText)) {
      blessingText = resolvedSymbol?.text || defaultBlessing || 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ';
    }
  } else {
    if (!blessingText) {
      blessingText = defaultBlessing || resolvedSymbol?.text || '॥ श्री गणेशाय नमः ॥';
    }
  }

  const sColor = symbolColor || color;
  const bColor = borderColor || sColor;
  const symbolHtml = renderGodSymbolHtml(resolvedSymbol, symbolSize, sColor, bColor, backgroundColor);

  return `
    <div style="display: flex; align-items: center; justify-content: ${center ? 'center' : 'flex-start'}; gap: 10px; margin-bottom: ${marginBottom}px;">
      ${symbolHtml}
      <span style="font-weight: 700; color: ${color}; font-size: ${fontSize}px; letter-spacing: 0.05em; font-family: ${theme === 'islamic' ? `'Scheherazade New', serif` : `'Playfair Display', serif, sans-serif`};">
        ${escapeHtml(blessingText)}
      </span>
      ${symbolHtml}
    </div>
  `;
}

function renderPhotoHtml(
  photoUrl?: string,
  width = 120,
  height = 150,
  borderRadius = '8px',
  border = '3px solid #fff',
  boxShadow = '0 6px 18px rgba(0,0,0,0.15)'
): string {
  if (photoUrl) {
    return `
      <div style="width: ${width}px; height: ${height}px; border-radius: ${borderRadius}; border: ${border}; box-shadow: ${boxShadow}; overflow: hidden; flex-shrink: 0; background: #f1f5f9;">
        <img src="${photoUrl}" alt="Candidate Photo" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
      </div>
    `;
  }
  return `
    <div style="width: ${width}px; height: ${height}px; border-radius: ${borderRadius}; border: ${border}; box-shadow: ${boxShadow}; overflow: hidden; flex-shrink: 0; background: #e2e8f0; display: flex; align-items: flex-end; justify-content: center;">
      <svg viewBox="0 0 100 120" width="70%" height="80%" fill="#94a3b8">
        <circle cx="50" cy="42" r="22" />
        <path d="M6 120c0-30 20-44 44-44s44 14 44 44z" />
      </svg>
    </div>
  `;
}

function renderRowsHtml(
  rows: ResolvedSection['rows'],
  labelWidth = 112,
  rowStyle = '',
  labelStyle = '',
  valueStyle = '',
  showColon = true,
  colonColor = '#94A3B8'
): string {
  return (rows || [])
    .filter((r) => r.value && r.value.trim().length > 0)
    .map(
      (r) => `
      <div style="display: flex; align-items: flex-start; gap: 4px; padding: 2px 0; font-size: 11.8px; line-height: 1.42; ${rowStyle}">
        <span style="flex: 0 0 ${labelWidth}px; font-weight: 600; overflow-wrap: anywhere; word-break: break-word; ${labelStyle}">
          ${escapeHtml(r.label)}
        </span>
        ${showColon ? `<span style="flex: 0 0 10px; text-align: center; font-weight: 600; color: ${colonColor}; user-select: none;">:</span>` : ''}
        <span style="flex: 1; min-width: 0; font-weight: 500; overflow-wrap: anywhere; word-break: break-word; ${valueStyle}">
          ${escapeHtml(r.value)}
        </span>
      </div>
    `
    )
    .join('');
}

function renderSectionBlock(
  sec: ResolvedSection,
  titleStyle: string,
  labelWidth = 112,
  rowStyle = '',
  labelStyle = '',
  valueStyle = '',
  textStyle = '',
  showColon = true,
  colonColor = '#94A3B8'
): string {
  const validRows = (sec.rows || []).filter((r) => r.value && r.value.trim().length > 0);
  const hasText = Boolean(sec.text && sec.text.trim().length > 0);
  if (validRows.length === 0 && !hasText) return '';

  return `
    <div style="margin-bottom: 11px;">
      <div style="margin-bottom: 4px;">
        <h3 style="margin: 0; font-size: 14px; font-weight: 700; ${titleStyle}">${escapeHtml(sec.title)}</h3>
      </div>
      <div>
        ${renderRowsHtml(validRows, labelWidth, rowStyle, labelStyle, valueStyle, showColon, colonColor)}
        ${hasText ? `<p style="margin: 4px 0 0; font-size: 11.5px; line-height: 1.5; white-space: pre-line; ${textStyle}">${escapeHtml(sec.text)}</p>` : ''}
      </div>
    </div>
  `;
}

function renderDecorativeBackgroundHtml(
  theme: 'traditional' | 'floral' | 'islamic' | 'jain' | 'modern' | 'royal',
  accent: string,
  gold = '#C5A059',
  opacity = 0.16,
  imageOpacity = 0.28
): string {
  const bgDataUri = BACKGROUND_DATA_URIS[theme] || BACKGROUND_DATA_URIS.traditional;
  const imgTag = bgDataUri
    ? `<img src="${bgDataUri}" alt="Decorative Background" style="position: absolute; top: 0; left: 0; width: 794px; height: 1123px; object-fit: cover; opacity: ${imageOpacity}; pointer-events: none; z-index: 0;" />`
    : '';

  if (theme === 'traditional') {
    return `
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
        ${imgTag}
        <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
          <!-- Center Mandala Watermark -->
          <svg width="340" height="340" viewBox="0 0 340 340" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.75;">
            <circle cx="170" cy="170" r="140" stroke-dasharray="4 6" />
            <circle cx="170" cy="170" r="110" />
            <circle cx="170" cy="170" r="80" stroke="${accent}" stroke-width="1" />
            <circle cx="170" cy="170" r="50" fill="${alpha(gold, 0.05)}" />
            <circle cx="170" cy="170" r="20" fill="${alpha(accent, 0.08)}" />
            ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
              .map(
                (deg) =>
                  `<g transform="rotate(${deg} 170 170)"><path d="M170 60 C155 100 155 125 170 145 C185 125 185 100 170 60 Z" fill="${alpha(gold, 0.04)}" stroke="${gold}" /><circle cx="170" cy="55" r="2.5" fill="${gold}" /></g>`
              )
              .join('')}
          </svg>
          <!-- Top-Left Corner Mandala -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; left: 12px;">
            <path d="M6 6 L6 60 A54 54 0 0 0 60 6 Z" fill="${alpha(gold, 0.06)}" />
            <circle cx="28" cy="28" r="14" stroke="${accent}" />
            <circle cx="28" cy="28" r="5" fill="${gold}" />
            <path d="M6 30 Q30 30 30 6 M6 45 Q45 45 45 6" stroke-dasharray="2 3" />
          </svg>
          <!-- Top-Right Corner Mandala -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; right: 12px; transform: scaleX(-1);">
            <path d="M6 6 L6 60 A54 54 0 0 0 60 6 Z" fill="${alpha(gold, 0.06)}" />
            <circle cx="28" cy="28" r="14" stroke="${accent}" />
            <circle cx="28" cy="28" r="5" fill="${gold}" />
            <path d="M6 30 Q30 30 30 6 M6 45 Q45 45 45 6" stroke-dasharray="2 3" />
          </svg>
          <!-- Bottom-Left Corner Mandala -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; left: 12px; transform: scaleY(-1);">
            <path d="M6 6 L6 60 A54 54 0 0 0 60 6 Z" fill="${alpha(gold, 0.06)}" />
            <circle cx="28" cy="28" r="14" stroke="${accent}" />
            <circle cx="28" cy="28" r="5" fill="${gold}" />
            <path d="M6 30 Q30 30 30 6 M6 45 Q45 45 45 6" stroke-dasharray="2 3" />
          </svg>
          <!-- Bottom-Right Corner Mandala -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; right: 12px; transform: scale(-1, -1);">
            <path d="M6 6 L6 60 A54 54 0 0 0 60 6 Z" fill="${alpha(gold, 0.06)}" />
            <circle cx="28" cy="28" r="14" stroke="${accent}" />
            <circle cx="28" cy="28" r="5" fill="${gold}" />
            <path d="M6 30 Q30 30 30 6 M6 45 Q45 45 45 6" stroke-dasharray="2 3" />
          </svg>
        </div>
      </div>
    `;
  }

  if (theme === 'royal') {
    return `
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
        ${imgTag}
        <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; left: 12px;">
            <path d="M8 8 L105 8 M8 8 L8 105" stroke-width="2" />
            <path d="M16 16 L90 16 M16 16 L16 90" stroke-dasharray="3 3" />
            <circle cx="36" cy="36" r="18" stroke="${accent}" fill="${alpha(accent, 0.06)}" />
            <circle cx="36" cy="36" r="6" fill="${gold}" />
          </svg>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; right: 12px; transform: scaleX(-1);">
            <path d="M8 8 L105 8 M8 8 L8 105" stroke-width="2" />
            <path d="M16 16 L90 16 M16 16 L16 90" stroke-dasharray="3 3" />
            <circle cx="36" cy="36" r="18" stroke="${accent}" fill="${alpha(accent, 0.06)}" />
            <circle cx="36" cy="36" r="6" fill="${gold}" />
          </svg>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; left: 12px; transform: scaleY(-1);">
            <path d="M8 8 L105 8 M8 8 L8 105" stroke-width="2" />
            <circle cx="36" cy="36" r="18" stroke="${accent}" fill="${alpha(accent, 0.06)}" />
          </svg>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; right: 12px; transform: scale(-1, -1);">
            <path d="M8 8 L105 8 M8 8 L8 105" stroke-width="2" />
            <circle cx="36" cy="36" r="18" stroke="${accent}" fill="${alpha(accent, 0.06)}" />
          </svg>
        </div>
      </div>
    `;
  }

  if (theme === 'floral') {
    return `
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
        ${imgTag}
        <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
          <!-- Top-Left Floral Vine -->
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; top: 10px; left: 10px;">
            <path d="M10 10 Q40 18 75 50 T118 118" stroke-width="1.5" />
            <path d="M10 10 Q18 40 50 75 T118 118" stroke-dasharray="3 3" opacity="0.6" />
            <circle cx="44" cy="24" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="24" cy="44" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="72" cy="46" r="11" fill="${alpha(accent, 0.18)}" />
            <circle cx="46" cy="72" r="11" fill="${alpha(accent, 0.18)}" />
            <circle cx="100" cy="82" r="7" fill="${alpha(accent, 0.28)}" />
            <circle cx="82" cy="100" r="7" fill="${alpha(accent, 0.28)}" />
          </svg>
          <!-- Top-Right Floral Vine -->
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; top: 10px; right: 10px; transform: scaleX(-1);">
            <path d="M10 10 Q40 18 75 50 T118 118" stroke-width="1.5" />
            <path d="M10 10 Q18 40 50 75 T118 118" stroke-dasharray="3 3" opacity="0.6" />
            <circle cx="44" cy="24" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="24" cy="44" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="72" cy="46" r="11" fill="${alpha(accent, 0.18)}" />
            <circle cx="46" cy="72" r="11" fill="${alpha(accent, 0.18)}" />
          </svg>
          <!-- Bottom-Left Floral Vine -->
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; bottom: 10px; left: 10px; transform: scaleY(-1);">
            <path d="M10 10 Q40 18 75 50 T118 118" stroke-width="1.5" />
            <circle cx="44" cy="24" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="24" cy="44" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="72" cy="46" r="11" fill="${alpha(accent, 0.18)}" />
          </svg>
          <!-- Bottom-Right Floral Vine -->
          <svg width="130" height="130" viewBox="0 0 130 130" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; bottom: 10px; right: 10px; transform: scale(-1, -1);">
            <path d="M10 10 Q40 18 75 50 T118 118" stroke-width="1.5" />
            <circle cx="44" cy="24" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="24" cy="44" r="8" fill="${alpha(accent, 0.22)}" />
            <circle cx="72" cy="46" r="11" fill="${alpha(accent, 0.18)}" />
          </svg>
        </div>
      </div>
    `;
  }

  if (theme === 'islamic') {
    return `
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
        ${imgTag}
        <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
          <!-- 8-Point Star Medallion Watermark -->
          <svg width="300" height="300" viewBox="0 0 300 300" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.7;">
            <rect x="75" y="75" width="150" height="150" fill="${alpha(gold, 0.04)}" stroke="${gold}" />
            <rect x="75" y="75" width="150" height="150" transform="rotate(45 150 150)" fill="${alpha(accent, 0.04)}" stroke="${accent}" />
            <circle cx="150" cy="150" r="60" stroke-dasharray="3 4" stroke="${gold}" />
            <circle cx="150" cy="150" r="30" fill="${alpha(gold, 0.1)}" stroke="${gold}" />
          </svg>
          <!-- Top-Left Corner Arch -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; left: 12px;">
            <path d="M8 8 L100 8 M8 8 L8 100" stroke-width="2" />
            <path d="M16 16 L85 16 M16 16 L16 85" stroke-dasharray="3 3" />
            <rect x="22" y="22" width="32" height="32" fill="${alpha(gold, 0.08)}" />
            <rect x="22" y="22" width="32" height="32" transform="rotate(45 38 38)" fill="${alpha(accent, 0.08)}" />
          </svg>
          <!-- Top-Right Corner Arch -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; top: 12px; right: 12px; transform: scaleX(-1);">
            <path d="M8 8 L100 8 M8 8 L8 100" stroke-width="2" />
            <path d="M16 16 L85 16 M16 16 L16 85" stroke-dasharray="3 3" />
            <rect x="22" y="22" width="32" height="32" fill="${alpha(gold, 0.08)}" />
            <rect x="22" y="22" width="32" height="32" transform="rotate(45 38 38)" fill="${alpha(accent, 0.08)}" />
          </svg>
          <!-- Bottom-Left Corner Arch -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; left: 12px; transform: scaleY(-1);">
            <path d="M8 8 L100 8 M8 8 L8 100" stroke-width="2" />
            <path d="M16 16 L85 16 M16 16 L16 85" stroke-dasharray="3 3" />
          </svg>
          <!-- Bottom-Right Corner Arch -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${gold}" stroke-width="1.2" style="position: absolute; bottom: 12px; right: 12px; transform: scale(-1, -1);">
            <path d="M8 8 L100 8 M8 8 L8 100" stroke-width="2" />
            <path d="M16 16 L85 16 M16 16 L16 85" stroke-dasharray="3 3" />
          </svg>
        </div>
      </div>
    `;
  }

  if (theme === 'jain') {
    return `
      <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
        ${imgTag}
        <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
          <!-- Auspicious Jain Corner Flourishes -->
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; top: 12px; left: 12px;">
            <path d="M8 8 L95 8 M8 8 L8 95" stroke-width="2" stroke="${gold}" />
            <path d="M15 15 L80 15 M15 15 L15 80" stroke-dasharray="2 3" stroke="${accent}" />
            <circle cx="34" cy="34" r="16" stroke="${accent}" fill="${alpha(accent, 0.08)}" />
            <circle cx="34" cy="34" r="6" fill="${gold}" />
          </svg>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; top: 12px; right: 12px; transform: scaleX(-1);">
            <path d="M8 8 L95 8 M8 8 L8 95" stroke-width="2" stroke="${gold}" />
            <path d="M15 15 L80 15 M15 15 L15 80" stroke-dasharray="2 3" stroke="${accent}" />
            <circle cx="34" cy="34" r="16" stroke="${accent}" fill="${alpha(accent, 0.08)}" />
            <circle cx="34" cy="34" r="6" fill="${gold}" />
          </svg>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; bottom: 12px; left: 12px; transform: scaleY(-1);">
            <path d="M8 8 L95 8 M8 8 L8 95" stroke-width="2" stroke="${gold}" />
            <circle cx="34" cy="34" r="16" stroke="${accent}" fill="${alpha(accent, 0.08)}" />
          </svg>
          <svg width="110" height="110" viewBox="0 0 110 110" fill="none" stroke="${accent}" stroke-width="1.2" style="position: absolute; bottom: 12px; right: 12px; transform: scale(-1, -1);">
            <path d="M8 8 L95 8 M8 8 L8 95" stroke-width="2" stroke="${gold}" />
            <circle cx="34" cy="34" r="16" stroke="${accent}" fill="${alpha(accent, 0.08)}" />
          </svg>
        </div>
      </div>
    `;
  }

  // Modern Minimal theme
  return `
    <div style="position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;">
      ${imgTag}
      <div style="position: absolute; inset: 0; opacity: ${opacity}; pointer-events: none; z-index: 1;">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="${accent}" stroke-width="1" style="position: absolute; top: 12px; left: 12px;">
          <path d="M10 10 L85 10 M10 10 L10 85" stroke-width="1.6" />
          <path d="M18 18 L68 18 M18 18 L18 68" stroke-dasharray="3 3" opacity="0.6" />
          <polygon points="36,22 50,36 36,50 22,36" fill="${alpha(accent, 0.08)}" stroke="${accent}" />
        </svg>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="${accent}" stroke-width="1" style="position: absolute; top: 12px; right: 12px; transform: scaleX(-1);">
          <path d="M10 10 L85 10 M10 10 L10 85" stroke-width="1.6" />
          <polygon points="36,22 50,36 36,50 22,36" fill="${alpha(accent, 0.08)}" stroke="${accent}" />
        </svg>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="${accent}" stroke-width="1" style="position: absolute; bottom: 12px; left: 12px; transform: scaleY(-1);">
          <path d="M10 10 L85 10 M10 10 L10 85" stroke-width="1.6" />
        </svg>
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="${accent}" stroke-width="1" style="position: absolute; bottom: 12px; right: 12px; transform: scale(-1, -1);">
          <path d="M10 10 L85 10 M10 10 L10 85" stroke-width="1.6" />
        </svg>
      </div>
    </div>
  `;
}

function renderQuoteBannerHtml(
  quote?: string,
  color = '#64748B',
  lineColor = 'rgba(0,0,0,0.12)'
): string {
  const text =
    quote ||
    '“Rooted in culture, growing with values, seeking a life partner for a meaningful journey.”';
  return `
    <div style="display: flex; align-items: center; justify-content: center; gap: 14px; margin: 8px auto 4px; padding: 0 16px; width: 90%; max-width: 680px; position: relative; z-index: 2;">
      <div style="flex: 1; height: 1px; background: ${lineColor};"></div>
      <p style="margin: 0; font-family: 'Cinzel', 'Playfair Display', 'Georgia', serif; font-size: 11px; font-style: italic; color: ${color}; text-align: center; max-width: 82%; line-height: 1.45; letter-spacing: 0.02em;">${escapeHtml(text)}</p>
      <div style="flex: 1; height: 1px; background: ${lineColor};"></div>
    </div>
  `;
}

function renderTrademarkHtml(color: string): string {
  return `
    <div style="width: 100%; text-align: center; padding-top: 14px; padding-bottom: 4px; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; opacity: 0.55; color: ${color}; position: relative; z-index: 2;">
      zoomdigital™
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE SPECIFIC RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

// 1. Emerald Classic
function renderEmeraldClassic(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    dark: shade(accent, 0.28),
    soft: tint(accent, 0.93),
    line: alpha(accent, 0.28),
    ink: '#1F2937',
    muted: '#6B7280',
    page: '#FFFFFF',
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; display: flex; flex-direction: column; position: relative;">
      ${renderDecorativeBackgroundHtml('traditional', p.accent, '#C5A059', 0.14)}
      <header style="background: ${p.accent}; color: #fff; padding: 30px 46px 34px; min-height: 140px; position: relative;">
        ${renderBlessingHeaderHtml(model, {
          color: '#ffffff',
          symbolColor: p.accent,
          borderColor: '#ffffff',
          backgroundColor: '#ffffff',
          symbolSize: 22,
          center: false,
          marginBottom: 10,
        })}
        <div style="max-width: ${hasPhoto ? '520px' : '100%'};">
          <div style="font-size: 12px; opacity: 0.85; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em;">Marriage Biodata</div>
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 36px; line-height: 1.1; font-weight: 700;">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 8px 0 0; font-size: 13.5px; opacity: 0.92;">${escapeHtml(model.subtitle)}</p>` : ''}
        </div>
        ${hasPhoto
      ? `<div style="position: absolute; right: 46px; top: 22px; z-index: 2;">
                 ${renderPhotoHtml(model.photo, 122, 152, '12px', '4px solid #fff', '0 8px 22px rgba(0,0,0,0.22)')}
               </div>`
      : ''
    }
      </header>

      <div style="padding: ${hasPhoto ? 38 : 26}px 46px 28px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 34px; align-items: start;">
            <div>
              ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', Georgia, serif; color: ${p.dark}; border-bottom: 1.5px solid ${p.line}; padding-bottom: 3px; font-size: 15px;`,
          112,
          `border-bottom: 1px solid #F1F2F4;`,
          `color: ${p.muted};`,
          `color: ${p.ink};`
        )
      )
      .join('')}
            </div>
            <div>
              ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', Georgia, serif; color: ${p.dark}; border-bottom: 1.5px solid ${p.line}; padding-bottom: 3px; font-size: 15px;`,
          112,
          `border-bottom: 1px solid #F1F2F4;`,
          `color: ${p.muted};`,
          `color: ${p.ink};`
        )
      )
      .join('')}
            </div>
          </div>

          ${wide.length > 0
      ? `
            <div style="display: grid; grid-template-columns: ${wide.length > 1 ? '1fr 1fr' : '1fr'}; column-gap: 34px; margin-top: 6px;">
              ${wide
        .map(
          (s) => `
                <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px;">
                  ${renderSectionBlock(
            s,
            `font-family: 'Playfair Display', Georgia, serif; color: ${p.dark}; font-size: 14.5px; border-bottom: none;`,
            112,
            '',
            `color: ${p.muted};`,
            `color: ${p.ink};`,
            `color: ${p.ink};`
          )}
                </div>
              `
        )
        .join('')}
            </div>
          `
      : ''
    }
        </div>
        ${renderQuoteBannerHtml(model.quote, p.accent, p.line)}
        ${renderTrademarkHtml(p.accent)}
      </div>
    </div>
  `;
}

// 2. Royal Heritage
function renderRoyalHeritage(model: BiodataModel, accent: string): string {
  const GOLD = '#B58B3A';
  const p = {
    accent,
    deep: shade(accent, 0.15),
    gold: GOLD,
    goldSoft: alpha(GOLD, 0.55),
    page: '#FBF6EA',
    ink: '#3A2A24',
    muted: '#7A6658',
    card: tint(accent, 0.95),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  const cornerSvg = `
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" stroke="${p.gold}" stroke-width="1.4">
      <path d="M2 52V14C2 7 7 2 14 2h38" />
      <path d="M10 52V22c0-6 6-12 12-12h30" opacity=".55" />
      <path d="M2 2l12 12" />
      <circle cx="14" cy="14" r="3" fill="${p.gold}" stroke="none" />
    </svg>
  `;

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; position: relative; padding: 34px 58px 30px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
      ${renderDecorativeBackgroundHtml('royal', p.accent, p.gold, 0.14)}
      <div style="position: absolute; top: 18px; left: 18px; right: 18px; bottom: 18px; border: 1.5px solid ${p.gold}; pointer-events: none;"></div>
      <div style="position: absolute; top: 24px; left: 24px; right: 24px; bottom: 24px; border: 0.75px solid ${p.goldSoft}; pointer-events: none;"></div>
      
      <div style="position: absolute; top: 14px; left: 14px;">${cornerSvg}</div>
      <div style="position: absolute; top: 14px; right: 14px; transform: scaleX(-1);">${cornerSvg}</div>
      <div style="position: absolute; bottom: 14px; left: 14px; transform: scaleY(-1);">${cornerSvg}</div>
      <div style="position: absolute; bottom: 14px; right: 14px; transform: scale(-1,-1);">${cornerSvg}</div>

      <div>
        <header style="text-align: center; margin-bottom: 12px; position: relative; z-index: 2;">
          ${renderBlessingHeaderHtml(model, {
            color: p.gold,
            symbolSize: 24,
            center: true,
            marginBottom: 6,
          })}
          <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 13px; letter-spacing: 0.22em; color: ${p.muted}; margin-bottom: 8px;">MARRIAGE BIO-DATA</div>
          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center; margin-bottom: 8px;">
              ${renderPhotoHtml(model.photo, 98, 124, '999px 999px 10px 10px', `3px solid ${p.gold}`, `0 0 0 4px ${p.page}, 0 0 0 5.5px ${p.goldSoft}`)}
            </div>
          `
      : ''
    }
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 30px; font-weight: 600; color: ${p.deep}; line-height: 1.15;">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 5px 0 0; font-style: italic; color: ${p.muted}; font-size: 13.5px;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 32px; align-items: start;">
          <div>
            ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', Georgia, serif; font-size: 15px; font-weight: 600; color: ${p.deep}; text-align: center;`,
          104,
          `border-bottom: 1px dotted ${p.goldSoft}; padding: 1.5px 0;`,
          `color: ${p.muted};`,
          `color: ${p.ink};`
        )
      )
      .join('')}
          </div>
          <div>
            ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', Georgia, serif; font-size: 15px; font-weight: 600; color: ${p.deep}; text-align: center;`,
          104,
          `border-bottom: 1px dotted ${p.goldSoft}; padding: 1.5px 0;`,
          `color: ${p.muted};`,
          `color: ${p.ink};`
        )
      )
      .join('')}
          </div>
        </div>

        ${wide.length > 0
      ? `
          <div style="display: grid; grid-template-columns: ${wide.length > 1 ? '1fr 1fr' : '1fr'}; column-gap: 32px; margin-top: 4px;">
            ${wide
        .map((s) =>
          renderSectionBlock(
            s,
            `font-family: 'Playfair Display', Georgia, serif; font-size: 14.5px; font-weight: 600; color: ${p.deep}; text-align: center;`,
            104,
            `border-bottom: 1px dotted ${p.goldSoft};`,
            `color: ${p.muted};`,
            `color: ${p.ink};`,
            `color: ${p.ink}; font-style: italic; text-align: center; font-family: 'Playfair Display', serif;`
          )
        )
        .join('')}
          </div>
        `
      : ''
    }
      </div>
      ${renderQuoteBannerHtml(model.quote, p.gold, p.goldSoft)}
      ${renderTrademarkHtml(p.gold)}
    </div>
  `;
}

// 3. Minimal Ivory
function renderMinimalIvory(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#FAF8F3',
    ink: '#25221E',
    muted: '#8A8378',
    line: '#E4DFD3',
    faint: alpha(accent, 0.12),
  };
  const hasPhoto = Boolean(model.photo);
  const [left, right] = balanceColumns(model.sections, 2);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 44px 56px 36px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('modern', p.accent, '#C5A059', 0.14)}
      <div>
        <header style="display: flex; justify-content: space-between; align-items: flex-end; gap: 28px; padding-bottom: 20px; border-bottom: 1.5px solid ${p.ink}; margin-bottom: 22px;">
          <div style="min-width: 0; flex: 1;">
            ${renderBlessingHeaderHtml(model, {
              color: p.accent,
              symbolSize: 20,
              center: false,
              marginBottom: 10,
              defaultBlessing: '॥ श्री गणेशाय नमः ॥',
            })}
            <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-weight: 300; font-size: 42px; line-height: 1.05; letter-spacing: -0.02em;">
              ${escapeHtml(model.name || 'Your Full Name')}
            </h1>
            ${model.subtitle ? `<p style="margin: 10px 0 0; color: ${p.muted}; font-size: 13.5px;">${escapeHtml(model.subtitle)}</p>` : ''}
          </div>
          ${hasPhoto ? renderPhotoHtml(model.photo, 100, 124, '2px', 'none', 'none') : ''}
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 44px; align-items: start;">
          <div>
            ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 500; font-style: italic; color: ${p.accent};`,
          104,
          `border-bottom: 1px solid ${p.line}; padding: 2.5px 0;`,
          `color: ${p.muted}; font-size: 11px;`,
          `color: ${p.ink};`
        )
      )
      .join('')}
          </div>
          <div>
            ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 500; font-style: italic; color: ${p.accent};`,
          104,
          `border-bottom: 1px solid ${p.line}; padding: 2.5px 0;`,
          `color: ${p.muted}; font-size: 11px;`,
          `color: ${p.ink};`
        )
      )
      .join('')}
          </div>
        </div>
      </div>
      ${renderQuoteBannerHtml(model.quote, p.muted, p.line)}
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 4. Modern Indigo
function renderModernIndigo(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    deep: shade(accent, 0.3),
    soft: tint(accent, 0.94),
    ink: '#1F2430',
    muted: '#6B7280',
    page: '#FFFFFF',
  };
  const SIDEBAR_KEYS = ['personal', 'contact', 'astrology'];
  const side = pick(model.sections, SIDEBAR_KEYS);
  const main = omit(model.sections, SIDEBAR_KEYS);
  const hasPhoto = Boolean(model.photo);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; display: flex; align-items: stretch;">
      <!-- Sidebar -->
      <aside style="width: 240px; flex-shrink: 0; background: ${p.accent}; color: #fff; padding: 28px 24px 24px; box-sizing: border-box;">
        ${hasPhoto ? `<div style="margin-bottom: 18px;">${renderPhotoHtml(model.photo, 180, 212, '18px', '3px solid rgba(255,255,255,0.75)', '0 6px 18px rgba(0,0,0,0.2)')}</div>` : ''}
        ${side
      .map(
        (s) => `
          <div style="margin-bottom: 14px;">
            <h3 style="margin: 0 0 6px 0; font-size: 13px; font-weight: 700; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.28); padding-bottom: 4px;">${escapeHtml(s.title)}</h3>
            ${(s.rows || [])
            .filter((r) => r.value && r.value.trim().length > 0)
            .map(
              (r) => `
              <div style="padding: 2.5px 0; line-height: 1.3; display: flex; align-items: baseline; gap: 4px;">
                <span style="font-size: 10px; color: rgba(255,255,255,0.7); text-transform: uppercase; width: 85px; flex-shrink: 0;">${escapeHtml(r.label)}</span>
                <span style="font-size: 10px; color: rgba(255,255,255,0.5); width: 8px; text-align: center; flex-shrink: 0;">:</span>
                <span style="font-size: 11.5px; color: #fff; font-weight: 500; flex: 1;">${escapeHtml(r.value)}</span>
              </div>
            `
            )
            .join('')}
          </div>
        `
      )
      .join('')}
      </aside>

      <!-- Main Column -->
      <div style="flex: 1; min-width: 0; padding: 30px 38px 24px 36px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        ${renderDecorativeBackgroundHtml('modern', p.accent, '#C5A059', 0.12)}
        <div>
          <header style="margin-bottom: 18px;">
            ${renderBlessingHeaderHtml(model, {
              color: p.deep,
              symbolColor: p.accent,
              borderColor: p.accent,
              symbolSize: 22,
              center: false,
              marginBottom: 8,
            })}
            <div style="font-size: 12px; color: ${p.accent}; font-weight: 600; margin-bottom: 4px; text-transform: uppercase;">Marriage Biodata</div>
            <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 32px; line-height: 1.1; font-weight: 700; color: ${p.deep};">
              ${escapeHtml(model.name || 'Your Full Name')}
            </h1>
            ${model.subtitle ? `<p style="margin: 6px 0 0; color: ${p.muted}; font-size: 13.5px;">${escapeHtml(model.subtitle)}</p>` : ''}
          </header>

          ${main
      .map((s) =>
        renderSectionBlock(
          s,
          `font-family: 'Playfair Display', Georgia, serif; font-size: 15.5px; font-weight: 650; color: ${p.deep}; border-left: 4px solid ${p.accent}; padding-left: 9px;`,
          116,
          `padding: 1.5px 0;`,
          `color: ${p.muted};`,
          `color: ${p.ink};`
        )
      )
      .join('')}
        </div>
        ${renderTrademarkHtml(p.accent)}
      </div>
    </div>
  `;
}

// 5. Elegant Rose
function renderElegantRose(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    deep: shade(accent, 0.3),
    page: tint(accent, 0.96),
    card: '#FFFFFF',
    border: alpha(accent, 0.26),
    ink: '#3B2A30',
    muted: '#8A7078',
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 30px 46px 26px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('floral', p.accent, '#C5A059', 0.15)}
      <div>
        <header style="text-align: center; margin-bottom: 14px;">
          ${renderBlessingHeaderHtml(model, {
            color: p.accent,
            symbolColor: p.accent,
            borderColor: p.accent,
            symbolSize: 22,
            center: true,
            marginBottom: 8,
          })}
          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center; margin-bottom: 10px;">
              ${renderPhotoHtml(model.photo, 96, 96, '50%', '3px solid #fff', `0 0 0 2px ${p.accent}, 0 6px 18px ${p.border}`)}
            </div>
          `
      : ''
    }
          <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 600; font-size: 32px; line-height: 1.12; color: ${p.deep};">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 5px 0 0; color: ${p.muted}; font-size: 13px;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 14px; align-items: start;">
          <div>
            ${left
      .map(
        (s) => `
              <div style="background: ${p.card}; border: 1px solid ${p.border}; border-radius: 14px; padding: 8px 15px 7px; margin-bottom: 9px;">
                ${renderSectionBlock(
          s,
          `font-family: 'Playfair Display', serif; font-style: italic; font-size: 15px; font-weight: 600; color: ${p.deep};`,
          108,
          `padding: 2px 0;`,
          `color: ${p.muted}; font-size: 11px;`,
          `color: ${p.ink};`
        )}
              </div>
            `
      )
      .join('')}
          </div>
          <div>
            ${right
      .map(
        (s) => `
              <div style="background: ${p.card}; border: 1px solid ${p.border}; border-radius: 14px; padding: 8px 15px 7px; margin-bottom: 9px;">
                ${renderSectionBlock(
          s,
          `font-family: 'Playfair Display', serif; font-style: italic; font-size: 15px; font-weight: 600; color: ${p.deep};`,
          108,
          `padding: 2px 0;`,
          `color: ${p.muted}; font-size: 11px;`,
          `color: ${p.ink};`
        )}
              </div>
            `
      )
      .join('')}
          </div>
        </div>

        ${wide.length > 0
      ? `
          <div style="display: grid; grid-template-columns: ${wide.length > 1 ? '1fr 1fr' : '1fr'}; column-gap: 14px; margin-top: 4px;">
            ${wide
        .map(
          (s) => `
              <div style="background: ${p.card}; border: 1px solid ${p.border}; border-radius: 14px; padding: 8px 15px 7px; margin-bottom: 9px;">
                ${renderSectionBlock(
            s,
            `font-family: 'Playfair Display', serif; font-style: italic; font-size: 14.5px; font-weight: 600; color: ${p.deep};`,
            108,
            `padding: 2px 0;`,
            `color: ${p.muted}; font-size: 11px;`,
            `color: ${p.ink};`,
            `color: ${p.ink};`
          )}
              </div>
            `
        )
        .join('')}
          </div>
        `
      : ''
    }
      </div>
      ${renderQuoteBannerHtml(model.quote, p.accent, p.border)}
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 6. Traditional Gold
function renderTraditionalGold(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    deep: shade(accent, 0.35),
    page: '#FFFAEE',
    ink: '#3B2A1A',
    muted: '#8A6F4D',
    line: alpha(accent, 0.55),
    labelBg: tint(accent, 0.88),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; position: relative; padding: 24px 42px 22px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
      ${renderDecorativeBackgroundHtml('traditional', p.accent, '#D4AF37', 0.14)}
      <div style="position: absolute; inset: 0; border: 10px solid ${p.accent}; pointer-events: none;"></div>
      <div style="position: absolute; inset: 10px; border: 1px solid ${p.line}; pointer-events: none;"></div>

      <div style="position: relative; z-index: 2;">
        <header style="display: flex; gap: 24px; align-items: center; padding: 12px 4px 14px; border-bottom: 1.5px solid ${p.line}; margin-bottom: 16px;">
          ${hasPhoto ? renderPhotoHtml(model.photo, 104, 130, '4px', `3px double ${p.accent}`, `0 0 0 4px ${p.page}, 0 0 0 5px ${p.line}`) : ''}
          <div style="flex: 1; min-width: 0;">
            ${renderBlessingHeaderHtml(model, {
              color: p.accent,
              symbolColor: p.accent,
              borderColor: p.accent,
              symbolSize: 22,
              center: false,
              marginBottom: 4,
            })}
            <div style="font-family: 'Playfair Display', serif; font-size: 14px; color: ${p.muted}; margin-bottom: 4px;">Marriage Bio-Data</div>
            <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 34px; line-height: 1.1; font-weight: 700; color: ${p.deep};">
              ${escapeHtml(model.name || 'Your Full Name')}
            </h1>
            ${model.subtitle ? `<p style="margin: 6px 0 0; color: ${p.muted}; font-size: 13.5px;">${escapeHtml(model.subtitle)}</p>` : ''}
          </div>
        </header>

        <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 26px; align-items: start;">
          <div>
            ${left
      .map(
        (s) => `
              <div style="margin-bottom: 10px;">
                <h3 style="margin: 0 0 4px; font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 650; color: #FFF7E0; background: linear-gradient(90deg, ${p.deep}, ${p.accent}); padding: 3px 10px; border-radius: 3px;">
                  ${escapeHtml(s.title)}
                </h3>
                <div style="border: 1px solid ${p.line};">
                  ${(s.rows || [])
            .filter((r) => r.value && r.value.trim().length > 0)
            .map(
              (r) => `
                    <div style="display: flex; border-bottom: 1px solid ${p.line}; font-size: 11.5px;">
                      <div style="flex: 0 0 110px; background: ${p.labelBg}; color: ${p.deep}; font-weight: 600; padding: 2px 8px; border-right: 1px solid ${p.line};">${escapeHtml(r.label)}</div>
                      <div style="flex: 1; padding: 2px 8px; color: ${p.ink};">${escapeHtml(r.value)}</div>
                    </div>
                  `
            )
            .join('')}
                </div>
              </div>
            `
      )
      .join('')}
          </div>
          <div>
            ${right
      .map(
        (s) => `
              <div style="margin-bottom: 10px;">
                <h3 style="margin: 0 0 4px; font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 650; color: #FFF7E0; background: linear-gradient(90deg, ${p.deep}, ${p.accent}); padding: 3px 10px; border-radius: 3px;">
                  ${escapeHtml(s.title)}
                </h3>
                <div style="border: 1px solid ${p.line};">
                  ${(s.rows || [])
            .filter((r) => r.value && r.value.trim().length > 0)
            .map(
              (r) => `
                    <div style="display: flex; border-bottom: 1px solid ${p.line}; font-size: 11.5px;">
                      <div style="flex: 0 0 110px; background: ${p.labelBg}; color: ${p.deep}; font-weight: 600; padding: 2px 8px; border-right: 1px solid ${p.line};">${escapeHtml(r.label)}</div>
                      <div style="flex: 1; padding: 2px 8px; color: ${p.ink};">${escapeHtml(r.value)}</div>
                    </div>
                  `
            )
            .join('')}
                </div>
              </div>
            `
      )
      .join('')}
          </div>
        </div>

        ${wide.length > 0
      ? `
          <div style="display: grid; grid-template-columns: ${wide.length > 1 ? '1fr 1fr' : '1fr'}; column-gap: 26px; margin-top: 4px;">
            ${wide
        .map(
          (s) => `
              <div style="margin-bottom: 10px;">
                <h3 style="margin: 0 0 4px; font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 650; color: #FFF7E0; background: linear-gradient(90deg, ${p.deep}, ${p.accent}); padding: 3px 10px; border-radius: 3px;">
                  ${escapeHtml(s.title)}
                </h3>
                <div style="border: 1px solid ${p.line}; padding: 6px 10px; background: #fff; font-size: 12px; line-height: 1.55;">
                  ${escapeHtml(s.text)}
                </div>
              </div>
            `
        )
        .join('')}
          </div>
        `
      : ''
    }
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 7. Blue Floral
function renderBlueFloral(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#FFFFFF',
    soft: tint(accent, 0.93),
    border: tint(accent, 0.78),
    ink: '#1e293b',
    deep: shade(accent, 0.4),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 28px 36px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('floral', p.accent, '#C5A059', 0.15)}
      <div style="border: 2px solid ${p.border}; border-radius: 16px; padding: 24px 32px; background: rgba(255,255,255,0.95); box-shadow: 0 4px 20px ${alpha(accent, 0.08)}; position: relative; z-index: 1;">
        <header style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid ${p.accent}; padding-bottom: 16px; margin-bottom: 22px;">
          <div>
            <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.08em; color: ${p.accent}; text-transform: uppercase;">परिचय पत्र / Marriage Biodata</div>
            <h1 style="margin: 4px 0 0; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: ${p.deep};">
              ${escapeHtml(model.name || 'Your Full Name')}
            </h1>
            ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #475569;">${escapeHtml(model.subtitle)}</p>` : ''}
          </div>
          <div>
            ${renderBlessingHeaderHtml(model, {
              color: p.deep,
              symbolColor: p.accent,
              borderColor: p.accent,
              symbolSize: 22,
              center: false,
              defaultBlessing: '॥ श्री गणेशाय नमः ॥',
              marginBottom: 0,
            })}
          </div>
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          ``,
          `color: #475569; font-weight: 600;`,
          `color: #1e293b;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          ``,
          `color: #475569; font-weight: 600;`,
          `color: #1e293b;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.accent}; border-bottom: none;`,
            110,
            '',
            `color: #475569;`,
            `color: #1e293b;`,
            `color: #1e293b;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '14px', `3px solid ${p.accent}`, '0 6px 18px rgba(30,58,138,0.18)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 8. Peach Floral
function renderPeachFloral(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#fffdfa',
    soft: tint(accent, 0.93),
    border: tint(accent, 0.78),
    ink: '#292524',
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 26px 34px 22px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('floral', p.accent, '#C5A059', 0.15)}
      <div style="border: 2px solid ${p.accent}; border-radius: 16px; padding: 24px 32px; background: rgba(255,253,250,0.95); box-shadow: 0 4px 20px rgba(234,88,12,0.05); position: relative; z-index: 1;">
        <header style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid ${p.border}; padding-bottom: 16px; margin-bottom: 22px;">
          <div>
            <div style="font-size: 13px; font-weight: 700; letter-spacing: 0.06em; color: ${p.accent}; text-transform: uppercase;">Marriage Biodata</div>
            <h1 style="margin: 4px 0 0; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: ${p.accent};">
              ${escapeHtml(model.name || 'Your Full Name')}
            </h1>
            ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #78716c;">${escapeHtml(model.subtitle)}</p>` : ''}
          </div>
          <div>
            ${renderBlessingHeaderHtml(model, {
              color: p.accent,
              symbolColor: p.accent,
              borderColor: p.accent,
              symbolSize: 22,
              center: false,
              defaultBlessing: '॥ श्री गणेशाय नमः ॥',
              marginBottom: 0,
            })}
          </div>
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #78716c; font-weight: 600;`,
          `color: #1c1917;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #78716c; font-weight: 600;`,
          `color: #1c1917;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.accent}; border-bottom: none;`,
            110,
            '',
            `color: #78716c;`,
            `color: #1c1917;`,
            `color: #1c1917;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '12px', `3px solid ${p.accent}`, '0 6px 18px rgba(234,88,12,0.16)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 9. Red Rose Classic
function renderRedRoseClassic(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    gold: accent,
    page: '#ffffff',
    soft: tint(accent, 0.94),
    border: tint(accent, 0.78),
    ink: '#1c1917',
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; position: relative; padding: 34px 42px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;">
      ${renderDecorativeBackgroundHtml('floral', p.accent, '#C5A059', 0.15)}
      <div style="position: absolute; top: 40px; bottom: 40px; left: 20px; width: 2px; background: ${p.gold}; pointer-events: none;"></div>
      <div style="position: absolute; top: 40px; bottom: 40px; right: 20px; width: 2px; background: ${p.gold}; pointer-events: none;"></div>

      <div>
        <header style="text-align: center; margin-bottom: 22px; border-bottom: 1px solid ${p.border}; padding-bottom: 16px;">
          ${renderBlessingHeaderHtml(model, {
            color: p.gold,
            symbolColor: p.gold,
            borderColor: p.gold,
            symbolSize: 24,
            center: true,
            marginBottom: 6,
          })}
          <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: ${p.accent};">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #57534e;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px dashed ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #57534e; font-weight: 600;`,
          `color: #0c0a09;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px dashed ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #57534e; font-weight: 600;`,
          `color: #0c0a09;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.accent}; border-bottom: none;`,
            110,
            '',
            `color: #57534e;`,
            `color: #0c0a09;`,
            `color: #0c0a09;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '12px', `3px solid ${p.accent}`, '0 6px 18px rgba(190,18,60,0.18)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 10. Islamic Emerald
function renderIslamicEmerald(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#0d3b3e',
    soft: '#134e4a',
    ink: '#ffffff',
    gold: accent,
    border: alpha(accent, 0.45),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  const isSelectedIslamic = model.godSymbol?.id?.startsWith('islamic');
  const islamicSymbol: GodSymbol = isSelectedIslamic
    ? model.godSymbol!
    : { id: 'islamic-bismillah', name: 'Bismillah', text: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ' };

  const islamicGlyph =
    islamicSymbol.id === 'islamic-crescent'
      ? '☪'
      : islamicSymbol.id === 'islamic-786'
      ? '۷۸۶'
      : islamicSymbol.id === 'islamic-allah'
      ? 'ﷻ'
      : '﷽';

  const islamicBlessing = isNonIslamicBlessing(model.blessing) ? null : model.blessing;

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 36px 42px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('islamic', p.accent, p.gold, 0.15)}
      <div>
        <header style="text-align: center; margin-bottom: 22px; border-bottom: 1.5px solid ${p.gold}; padding-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid ${p.gold}; background: ${p.soft}; color: ${p.gold}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
              ${islamicGlyph}
            </div>
            <div style="font-size: 24px; color: ${p.gold}; font-family: 'Scheherazade New', serif;">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <div style="width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid ${p.gold}; background: ${p.soft}; color: ${p.gold}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.25);">
              ${islamicGlyph}
            </div>
          </div>
          ${islamicBlessing ? `<div style="font-size: 13px; font-weight: 700; color: ${p.gold}; letter-spacing: 0.06em; margin-bottom: 6px;">${escapeHtml(islamicBlessing)}</div>` : ''}
          <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: ${p.gold};">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #cbd5e1;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.gold}; border-bottom: 2px solid ${p.gold}; padding-bottom: 4px;`,
          110,
          '',
          `color: #9ca3af; font-weight: 600;`,
          `color: #ffffff;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.gold}; border-bottom: 2px solid ${p.gold}; padding-bottom: 4px;`,
          110,
          '',
          `color: #9ca3af; font-weight: 600;`,
          `color: #ffffff;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.gold}; border-bottom: none;`,
            110,
            '',
            `color: #9ca3af;`,
            `color: #ffffff;`,
            `color: #ffffff;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '12px', `3px solid ${p.gold}`, '0 6px 18px rgba(0,0,0,0.3)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.gold)}
    </div>
  `;
}

// 11. Islamic Ivory
function renderIslamicIvory(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#fafaf9',
    soft: tint(accent, 0.94),
    ink: '#1c1917',
    border: tint(accent, 0.75),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  const isSelectedIslamic = model.godSymbol?.id?.startsWith('islamic');
  const islamicSymbol: GodSymbol = isSelectedIslamic
    ? model.godSymbol!
    : { id: 'islamic-bismillah', name: 'Bismillah', text: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ' };

  const islamicGlyph =
    islamicSymbol.id === 'islamic-crescent'
      ? '☪'
      : islamicSymbol.id === 'islamic-786'
      ? '۷۸۶'
      : islamicSymbol.id === 'islamic-allah'
      ? 'ﷻ'
      : '﷽';

  const islamicBlessing = isNonIslamicBlessing(model.blessing) ? null : model.blessing;

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 32px 42px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('islamic', p.accent, '#C5A059', 0.15)}
      <div>
        <header style="text-align: center; margin-bottom: 22px; border-bottom: 2px solid ${p.border}; padding-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 8px;">
            <div style="width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid ${p.accent}; background: ${p.soft}; color: ${p.accent}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              ${islamicGlyph}
            </div>
            <div style="font-size: 24px; color: ${p.accent}; font-family: 'Scheherazade New', serif;">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </div>
            <div style="width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid ${p.accent}; background: ${p.soft}; color: ${p.accent}; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              ${islamicGlyph}
            </div>
          </div>
          ${islamicBlessing ? `<div style="font-size: 13px; font-weight: 700; color: ${p.accent}; letter-spacing: 0.06em; margin-bottom: 6px;">${escapeHtml(islamicBlessing)}</div>` : ''}
          <h1 style="margin: 4px 0 0; font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; color: ${p.accent};">
            ${escapeHtml(model.name || 'Your Full Name')}
          </h1>
          ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #475569;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #475569; font-weight: 600;`,
          `color: #0f172a;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #475569; font-weight: 600;`,
          `color: #0f172a;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.accent}; border-bottom: none;`,
            110,
            '',
            `color: #475569;`,
            `color: #0f172a;`,
            `color: #0f172a;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '12px', `3px solid ${p.accent}`, '0 6px 18px rgba(4,120,87,0.18)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 12. Jain Classic
function renderJainClassic(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#f4fbf7',
    soft: tint(accent, 0.94),
    ink: '#1c1917',
    purple: accent,
    border: tint(accent, 0.75),
  };
  const hasPhoto = Boolean(model.photo);
  const columnSections = omit(model.sections, ['about', 'expectations']);
  const [left, right] = balanceColumns(columnSections, 2);
  const wide = pick(model.sections, ['about', 'expectations']);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 30px 40px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
      ${renderDecorativeBackgroundHtml('jain', p.accent, '#C5A059', 0.15)}
      <div>
        <header style="text-align: center; margin-bottom: 22px;">
          ${renderBlessingHeaderHtml(model, {
            color: p.accent,
            symbolColor: p.purple,
            borderColor: p.purple,
            symbolSize: 24,
            theme: 'jain',
            center: true,
            marginBottom: 6,
          })}
          <h1 style="margin: 4px 0 0; font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: ${p.accent};">
            Marriage Biodata
          </h1>
          <div style="width: 80px; height: 3px; background: ${p.accent}; margin: 8px auto 0; border-radius: 2px;"></div>
          ${model.name ? `<h2 style="margin: 10px 0 0; font-size: 20px; font-weight: 700; color: #1c1917;">${escapeHtml(model.name)}</h2>` : ''}
          ${model.subtitle ? `<p style="margin: 4px 0 0; font-size: 13px; color: #475569;">${escapeHtml(model.subtitle)}</p>` : ''}
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 140px' : '1fr'}; gap: 28px; align-items: start;">
          <div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
              <div>
                ${left
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2.5px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #475569; font-weight: 600;`,
          `color: #0f172a;`
        )
      )
      .join('')}
              </div>
              <div>
                ${right
      .map((s) =>
        renderSectionBlock(
          s,
          `font-size: 15px; font-weight: 700; color: ${p.accent}; border-bottom: 2.5px solid ${p.accent}; padding-bottom: 4px;`,
          110,
          '',
          `color: #475569; font-weight: 600;`,
          `color: #0f172a;`
        )
      )
      .join('')}
              </div>
            </div>

            ${wide.length > 0
      ? `
              <div style="margin-top: 8px;">
                ${wide
        .map(
          (s) => `
                  <div style="background: ${p.soft}; border-radius: 10px; padding: 12px 16px 4px; margin-bottom: 10px;">
                    ${renderSectionBlock(
            s,
            `font-size: 14.5px; font-weight: 700; color: ${p.accent}; border-bottom: none;`,
            110,
            '',
            `color: #475569;`,
            `color: #0f172a;`,
            `color: #0f172a;`
          )}
                  </div>
                `
        )
        .join('')}
              </div>
            `
      : ''
    }
          </div>

          ${hasPhoto
      ? `
            <div style="display: flex; justify-content: center;">
              ${renderPhotoHtml(model.photo, 130, 160, '12px', `3px solid ${p.accent}`, '0 6px 18px rgba(22,101,52,0.18)')}
            </div>
          `
      : ''
    }
        </div>
      </div>
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 13. Classic Ganesha
function renderClassicGanesha(model: BiodataModel, accent: string): string {
  const p = {
    accent,
    page: '#ffffff',
    soft: tint(accent, 0.94),
    ink: '#111827',
    inkMuted: '#374151',
    line: accent,
    lineSoft: tint(accent, 0.8),
    border: tint(accent, 0.75),
  };
  const hasPhoto = Boolean(model.photo);
  const personalSec = model.sections.find((s) => s.key === 'personal') || model.sections[0];
  const otherSections = model.sections.filter((s) => s !== personalSec);
  const [left, right] = balanceColumns(otherSections, 2);

  return `
    <div style="background: ${p.page}; color: ${p.ink}; min-height: 1123px; padding: 34px 44px 24px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between; border: 3px solid ${p.accent}; position: relative;">
      ${renderDecorativeBackgroundHtml('traditional', p.accent, '#C5A059', 0.14)}
      <div>
        <header style="text-align: center; margin-bottom: 18px; border-bottom: 2px solid ${p.lineSoft}; padding-bottom: 14px;">
          ${renderBlessingHeaderHtml(model, {
            color: p.accent,
            symbolColor: p.accent,
            borderColor: p.accent,
            symbolSize: 26,
            defaultBlessing: '॥ श्री गणेशाय नमः ॥',
            center: true,
            marginBottom: 4,
          })}
        </header>

        <div style="display: grid; grid-template-columns: ${hasPhoto ? '1fr 160px' : '1fr'}; gap: 24px; align-items: start; margin-bottom: 14px;">
          <div>
            ${personalSec ? renderSectionBlock(personalSec, `font-size: 14px; font-weight: 800; text-transform: uppercase; color: ${p.accent}; border-bottom: 1.5px solid ${p.lineSoft}; padding-bottom: 3px;`, 140, 'padding: 2.5px 0;', 'color: #1f2937; font-weight: 600;', `color: ${p.ink};`, `color: ${p.inkMuted};`) : ''}
          </div>
          ${hasPhoto ? `<div style="display: flex; justify-content: center;">${renderPhotoHtml(model.photo, 140, 180, '4px', `2px solid ${p.accent}`, '0 4px 14px rgba(0,0,0,0.12)')}</div>` : ''}
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 28px; align-items: start;">
          <div>
            ${left.map((s) => renderSectionBlock(s, `font-size: 14px; font-weight: 800; text-transform: uppercase; color: ${p.accent}; border-bottom: 1.5px solid ${p.lineSoft}; padding-bottom: 3px;`, 140, 'padding: 2.5px 0;', 'color: #1f2937; font-weight: 600;', `color: ${p.ink};`, `color: ${p.inkMuted};`)).join('')}
          </div>
          <div>
            ${right.map((s) => renderSectionBlock(s, `font-size: 14px; font-weight: 800; text-transform: uppercase; color: ${p.accent}; border-bottom: 1.5px solid ${p.lineSoft}; padding-bottom: 3px;`, 140, 'padding: 2.5px 0;', 'color: #1f2937; font-weight: 600;', `color: ${p.ink};`, `color: ${p.inkMuted};`)).join('')}
          </div>
        </div>
      </div>
      ${renderQuoteBannerHtml(model.quote, p.accent, p.lineSoft)}
      ${renderTrademarkHtml(p.accent)}
    </div>
  `;
}

// 14. Aurora Sage — Contemporary Elegance
function renderAuroraSage(model: BiodataModel, accent: string): string {
  const effectiveAccent = accent || '#3D5A4C';
  const GOLD = '#C8A97E';
  const p = {
    accent: effectiveAccent,
    accentDark: shade(effectiveAccent, 0.35),
    accentDeep: '#1C2B24',
    accentLight: tint(effectiveAccent, 0.88),
    accentSoft: alpha(effectiveAccent, 0.12),
    accentBadge: '#EFF4F1',
    gold: GOLD,
    goldDark: '#9C7A4A',
    goldSoft: alpha(GOLD, 0.3),
    page: '#F9F7F2',
    card: '#FFFFFF',
    cardBorder: '#E8E4DA',
    cardSoftBorder: '#EFECE4',
    ink: '#1C2B24',
    inkMuted: '#54665C',
    inkSubtle: '#8A9990',
    statBadgeBg: '#FAF5EE',
    statBadgeBorder: '#E8DBC9',
    trademark: '#7D9185',
  };

  const personalSec = model.sections.find((s) => s.key === 'personal');
  const astrologySec = model.sections.find((s) => s.key === 'astrology');
  const contactSec = model.sections.find((s) => s.key === 'contact');
  const educationSec = model.sections.find((s) => s.key === 'education');
  const professionSec = model.sections.find((s) => s.key === 'profession');
  const familySec = model.sections.find((s) => s.key === 'family');
  const lifestyleSec = model.sections.find((s) => s.key === 'lifestyle');
  const aboutSec = model.sections.find((s) => s.key === 'about');
  const expectationsSec = model.sections.find((s) => s.key === 'expectations');

  const heightVal =
    personalSec?.rows.find((r) => r.label.toLowerCase().includes('height'))?.value || "5' 10\"";
  const locVal =
    personalSec?.rows.find((r) => r.label.toLowerCase().includes('place'))?.value ||
    contactSec?.rows.find((r) => r.label.toLowerCase().includes('address') || r.label.toLowerCase().includes('city'))?.value ||
    'Bhopal, MP';
  const eduVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('highest') || r.label.toLowerCase().includes('degree'))?.value ||
    'B.Tech (CS)';
  const jobVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('occupation') || r.label.toLowerCase().includes('designation'))?.value ||
    'Software Engineer';

  const degreeVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('highest') || r.label.toLowerCase().includes('degree'))?.value ||
    'B.Tech in Computer Science';
  const collegeVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('college') || r.label.toLowerCase().includes('institution'))?.value ||
    'MANIT Bhopal';
  const gradYearVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('year'))?.value;

  const companyVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('company'))?.value || 'Tech Solutions';
  const incomeVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('income'))?.value || '₹ 12,00,000';
  const workLocVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('location') || r.label.toLowerCase().includes('city'))?.value ||
    locVal ||
    'Bhopal';

  // Rows preparation with safe fallbacks
  const personalRows = (personalSec?.rows && personalSec.rows.length > 0)
    ? personalSec.rows
    : [
        { label: 'Date of Birth', value: '15 March 1998' },
        { label: 'Age', value: '26 Years' },
        { label: 'Height', value: "5 ft 10 in (178 cm)" },
        { label: 'Blood Group', value: 'B+' },
        { label: 'Marital Status', value: 'Never Married' },
        { label: 'Complexion', value: 'Wheatish Fair' },
      ];

  const astrologyRows = (astrologySec?.rows || [
    { label: 'Religion', value: 'Hindu' },
    { label: 'Caste', value: 'Brahmin' },
    { label: 'Gotra', value: 'Bharadwaj' },
    { label: 'Rashi', value: 'Mithun' },
    { label: 'Nakshatra', value: 'Ardra' },
    { label: 'Manglik', value: 'No' },
  ]).filter((r) => r.value && r.value.trim().length > 0);

  const contactRows = (contactSec?.rows && contactSec.rows.length > 0)
    ? contactSec.rows
    : [
        { label: 'Phone', value: '+91 98765 43210' },
        { label: 'Email', value: 'aarav.sharma@example.com' },
        { label: 'Address', value: 'Bhopal, Madhya Pradesh' },
      ];

  const lifestyleRows = (lifestyleSec?.rows || [
    { label: 'Diet', value: 'Vegetarian' },
    { label: 'Languages', value: 'Hindi, English' },
    { label: 'Interests', value: 'Reading, Fitness, Travel' },
  ]).filter((r) => r.value && r.value.trim().length > 0);

  const familyRows = (familySec?.rows && familySec.rows.length > 0)
    ? familySec.rows
    : [
        { label: "Father's Name", value: 'Mr. Rajesh Sharma (Govt. Employee)' },
        { label: "Mother's Name", value: 'Mrs. Sunita Sharma (Homemaker)' },
        { label: 'Siblings', value: '1 Younger Brother (Student)' },
        { label: 'Family Type & Values', value: 'Joint Family • Close-knit Traditional Values' },
      ];

  const candidateName = model.name || 'Aarav Sharma';
  const subtitle = model.subtitle || 'SOFTWARE ENGINEER';
  const blessing = model.blessing || '॥ श्री गणेशाय नमः ॥';
  const quoteText =
    model.quote ||
    'Rooted in heritage, growing with modern aspirations, seeking a life partner to share a purposeful and joyful journey.';

  const aboutText =
    aboutSec?.text ||
    'I am a thoughtful, family-oriented professional with a modern outlook and deep cultural roots. I value mutual respect, continuous learning, and meaningful relationships. In my leisure time, I enjoy reading, exploring nature, and spending quality moments with loved ones.';

  const partnerText =
    expectationsSec?.text ||
    'Looking for an educated, warm, and understanding partner who values family harmony, personal aspirations, and mutual companionship built on trust and shared principles.';

  const renderSectionHeaderHtml = (title: string, svgPath: string) => `
    <div style="display: flex; align-items: center; gap: 7px; margin-bottom: 7px;">
      <div style="width: 20px; height: 20px; border-radius: 10px; background: ${p.accentSoft}; display: flex; align-items: center; justify-content: center; color: ${p.accent}; flex-shrink: 0;">
        ${svgPath}
      </div>
      <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${p.accent}; font-family: 'Plus Jakarta Sans', sans-serif;">
        ${escapeHtml(title)}
      </span>
      <div style="flex: 1; height: 1px; background: ${p.goldSoft};"></div>
    </div>
  `;

  const renderCardRows = (rows: { label: string; value: string }[]) =>
    rows
      .filter((r) => r.value && r.value.trim().length > 0)
      .map(
        (r) => `
        <div style="display: flex; align-items: flex-start; gap: 4px; padding: 2px 0; font-size: 9.8px; line-height: 1.35;">
          <span style="flex: 0 0 96px; color: ${p.inkMuted}; font-weight: 500; overflow-wrap: anywhere;">${escapeHtml(r.label)}</span>
          <span style="flex: 0 0 10px; text-align: center; font-weight: 600; color: #94A3B8; user-select: none;">:</span>
          <span style="flex: 1; color: ${p.ink}; font-weight: 600; text-align: left; overflow-wrap: anywhere;">${escapeHtml(r.value)}</span>
        </div>
      `
      )
      .join('');

  return `
    <div style="width: 794px; min-height: 1123px; background: ${p.page}; color: ${p.ink}; box-sizing: border-box; padding: 22px 48px 16px; position: relative; display: flex; flex-direction: column; justify-content: space-between; font-family: 'Plus Jakarta Sans', sans-serif;">
      ${renderDecorativeBackgroundHtml('floral', effectiveAccent, p.gold, 0.12, 0.4)}

      <!-- TOP HERO (CENTERED) -->
      <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 8px; z-index: 2; position: relative;">
        <!-- Blessing Pill (God Symbol - God Name - God Symbol) -->
        <div style="margin-bottom: 5px;">
          <div style="border-radius: 14px; border: 0.8px solid ${p.goldSoft}; background: ${p.accentBadge}; padding: 2px 8px; display: inline-flex; align-items: center; gap: 6px;">
            ${renderGodSymbolHtml(model.godSymbol || { id: 'ganesha', name: 'Ganesha' }, 18, p.accent, p.gold, p.page)}
            <span style="font-size: 9.5px; font-weight: 700; letter-spacing: 0.08em; color: ${p.accent};">${escapeHtml(blessing)}</span>
            ${renderGodSymbolHtml(model.godSymbol || { id: 'ganesha', name: 'Ganesha' }, 18, p.accent, p.gold, p.page)}
          </div>
        </div>

        <!-- Cameo Portrait Frame -->
        <div style="width: 132px; height: 170px; position: relative; margin-bottom: 6px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 126px; height: 164px; border-radius: 63px; border: 2px solid ${p.gold}; padding: 3px; box-sizing: border-box;">
            <div style="width: 100%; height: 100%; border-radius: 60px; border: 1px solid ${p.cardBorder}; overflow: hidden; background: #FAF5EE;">
              ${
                model.photo
                  ? `<img src="${model.photo}" alt="${escapeHtml(candidateName)}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />`
                  : `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: ${p.accentBadge}; color: ${p.accent};">
                      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                    </div>`
              }
            </div>
          </div>
          <div style="position: absolute; bottom: -2px; right: 4px; width: 22px; height: 22px; border-radius: 11px; background: ${p.page}; border: 1.2px solid ${p.gold}; display: flex; align-items: center; justify-content: center; color: ${p.accent};">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
          </div>
        </div>

        <!-- Candidate Regal Name -->
        <h1 style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-size: 29px; line-height: 1.15; font-weight: 700; color: ${p.accentDeep}; letter-spacing: -0.01em; text-align: center;">
          ${escapeHtml(candidateName)}
        </h1>

        <!-- Profession / Subtitle -->
        <div style="margin-top: 2px; margin-bottom: 6px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: ${p.goldDark}; text-align: center;">
          ${escapeHtml(subtitle)}
        </div>

        <!-- 4-Item Highlights Strip -->
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 4px; border-radius: 12px; border: 0.8px solid ${p.statBadgeBorder}; background: ${p.statBadgeBg}; padding: 3px 9px; font-size: 9.2px; font-weight: 600; color: ${p.ink};">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${p.goldDark}" stroke-width="2.2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${escapeHtml(locVal)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; border-radius: 12px; border: 0.8px solid ${p.statBadgeBorder}; background: ${p.statBadgeBg}; padding: 3px 9px; font-size: 9.2px; font-weight: 600; color: ${p.ink};">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${p.goldDark}" stroke-width="2.2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span>${escapeHtml(eduVal)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; border-radius: 12px; border: 0.8px solid ${p.statBadgeBorder}; background: ${p.statBadgeBg}; padding: 3px 9px; font-size: 9.2px; font-weight: 600; color: ${p.ink};">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${p.goldDark}" stroke-width="2.2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            <span>${escapeHtml(jobVal)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px; border-radius: 12px; border: 0.8px solid ${p.statBadgeBorder}; background: ${p.statBadgeBg}; padding: 3px 9px; font-size: 9.2px; font-weight: 600; color: ${p.ink};">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="${p.goldDark}" stroke-width="2.2"><path d="M2 12h20M7 12v4M12 12v6M17 12v4"/></svg>
            <span>${escapeHtml(heightVal)}</span>
          </div>
        </div>

        <!-- Centered Editorial Quote Box -->
        <div style="width: 100%; box-sizing: border-box; border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 5px 22px; position: relative; overflow: hidden; text-align: center;">
          <div style="position: absolute; top: -10px; left: 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; color: ${alpha(effectiveAccent, 0.16)}; line-height: 28px; pointer-events: none;">“</div>
          <p style="margin: 0; font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 9.8px; line-height: 1.4; color: ${p.inkMuted};">
            ${escapeHtml(quoteText)}
          </p>
          <div style="position: absolute; bottom: -16px; right: 8px; font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 700; color: ${alpha(effectiveAccent, 0.16)}; line-height: 28px; pointer-events: none;">”</div>
        </div>
      </div>

      <!-- 2-COLUMN BALANCED MODULAR GRID -->
      <div style="display: flex; justify-content: space-between; gap: 14px; flex: 1; z-index: 2; position: relative;">
        <!-- LEFT COLUMN -->
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;">
          <!-- 1. Personal Profile Card -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Personal Profile', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>')}
            <div style="display: flex; flex-direction: column;">
              ${renderCardRows(personalRows)}
            </div>
          </div>

          <!-- 2. Cultural & Astrology (Pill Grid) -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Cultural & Astrology', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>')}
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
              ${astrologyRows
                .map(
                  (r) => `
                  <div style="border-radius: 6px; border: 0.8px solid ${p.cardSoftBorder}; background: ${p.page}; padding: 3px 6px; display: flex; justify-content: space-between; align-items: center; font-size: 9px;">
                    <span style="color: ${p.inkSubtle}; font-weight: 500;">${escapeHtml(r.label)}</span>
                    <span style="color: ${p.ink}; font-weight: 700;">${escapeHtml(r.value)}</span>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>

          <!-- 3. Contact Details Card -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Contact Details', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>')}
            <div style="display: flex; flex-direction: column;">
              ${renderCardRows(contactRows)}
            </div>
          </div>

          <!-- 4. Lifestyle & Habits Card -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Lifestyle & Habits', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>')}
            <div style="display: flex; flex-wrap: wrap; gap: 4px;">
              ${lifestyleRows
                .map(
                  (t) => `
                  <div style="display: inline-flex; align-items: center; border-radius: 10px; border: 0.8px solid ${p.goldSoft}; background: ${p.accentBadge}; padding: 2px 7px; font-size: 8.8px;">
                    <span style="font-weight: 700; color: ${p.accent}; margin-right: 3px;">${escapeHtml(t.label)}:</span>
                    <span style="font-weight: 500; color: ${p.ink};">${escapeHtml(t.value)}</span>
                  </div>
                `
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px;">
          <!-- 1. About Me Narrative Card (Left Sage Accent) -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; border-left: 3.5px solid ${p.accent}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('About Me', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>')}
            <p style="margin: 0; font-size: 9.3px; line-height: 1.45; color: ${p.inkMuted};">
              ${escapeHtml(aboutText)}
            </p>
          </div>

          <!-- 2. Education & Career Timeline -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Education & Career', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>')}
            <div style="display: flex; flex-direction: column; gap: 6px; padding-left: 4px;">
              <!-- Education Milestone -->
              <div style="display: flex; align-items: flex-start;">
                <div style="width: 14px; display: flex; flex-direction: column; align-items: center; padding-top: 3px; flex-shrink: 0;">
                  <div style="width: 7px; height: 7px; border-radius: 3.5px; background: ${p.gold};"></div>
                  <div style="width: 1.2px; height: 24px; background: ${p.goldSoft}; margin-top: 2px;"></div>
                </div>
                <div style="flex: 1; padding-left: 6px;">
                  <div style="font-size: 9.8px; font-weight: 700; color: ${p.ink};">
                    ${escapeHtml(degreeVal)}
                  </div>
                  <div style="font-size: 9px; line-height: 1.35; color: ${p.inkMuted};">
                    ${escapeHtml(collegeVal)}${gradYearVal ? ` (${escapeHtml(gradYearVal)})` : ''}
                  </div>
                </div>
              </div>

              <!-- Career Milestone -->
              <div style="display: flex; align-items: flex-start;">
                <div style="width: 14px; display: flex; flex-direction: column; align-items: center; padding-top: 3px; flex-shrink: 0;">
                  <div style="width: 7px; height: 7px; border-radius: 3.5px; background: ${p.accent};"></div>
                </div>
                <div style="flex: 1; padding-left: 6px;">
                  <div style="font-size: 9.8px; font-weight: 700; color: ${p.ink};">
                    ${escapeHtml(jobVal)}${companyVal ? ` at ${escapeHtml(companyVal)}` : ''}
                  </div>
                  <div style="display: flex; align-items: center; gap: 4px; font-size: 8.8px; margin-top: 1px;">
                    <span style="color: ${p.goldDark}; font-weight: 600;">
                      Annual: ${escapeHtml(incomeVal)}
                    </span>
                    <span style="color: ${p.inkSubtle};">•</span>
                    <span style="color: ${p.inkSubtle};">
                      ${escapeHtml(workLocVal)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Family Background Card -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Family Background', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>')}
            <div style="display: flex; flex-direction: column;">
              ${renderCardRows(familyRows)}
            </div>
          </div>

          <!-- 4. Partner Preferences Card (Left Gold Accent) -->
          <div style="border-radius: 8px; border: 1px solid ${p.cardBorder}; border-left: 3.5px solid ${p.gold}; background: rgba(255, 255, 255, 0.92); padding: 7px 10px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
            ${renderSectionHeaderHtml('Partner Preferences', '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>')}
            <p style="margin: 0; font-size: 9.3px; line-height: 1.45; color: ${p.inkMuted};">
              ${escapeHtml(partnerText)}
            </p>
          </div>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="text-align: center; padding-top: 4px; z-index: 2; position: relative;">
        <div style="width: 60px; height: 1px; background: ${p.goldSoft}; margin: 0 auto 3px;"></div>
        <div style="font-size: 10.5px; font-weight: 600; letter-spacing: 0.08em; color: ${p.trademark}; opacity: 0.7;">
          zoomdigital™
        </div>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GENERATOR
// ─────────────────────────────────────────────────────────────────────────────

export function generateBiodataHtml(
  model: BiodataModel,
  template: TemplateDefinition,
  accentColor?: string
): string {
  const accent = accentColor || template.defaultSettings.accent || '#047857';

  let templateBodyHtml = '';
  switch (template.id) {
    case 'aurora-sage':
      templateBodyHtml = renderAuroraSage(model, accent);
      break;
    case 'emerald-classic':
      templateBodyHtml = renderEmeraldClassic(model, accent);
      break;
    case 'royal-heritage':
      templateBodyHtml = renderRoyalHeritage(model, accent);
      break;
    case 'minimal-ivory':
      templateBodyHtml = renderMinimalIvory(model, accent);
      break;
    case 'modern-indigo':
      templateBodyHtml = renderModernIndigo(model, accent);
      break;
    case 'elegant-rose':
      templateBodyHtml = renderElegantRose(model, accent);
      break;
    case 'traditional-gold':
      templateBodyHtml = renderTraditionalGold(model, accent);
      break;
    case 'blue-floral':
      templateBodyHtml = renderBlueFloral(model, accent);
      break;
    case 'peach-floral':
      templateBodyHtml = renderPeachFloral(model, accent);
      break;
    case 'red-rose-classic':
      templateBodyHtml = renderRedRoseClassic(model, accent);
      break;
    case 'islamic-emerald':
      templateBodyHtml = renderIslamicEmerald(model, accent);
      break;
    case 'islamic-ivory':
      templateBodyHtml = renderIslamicIvory(model, accent);
      break;
    case 'jain-classic':
      templateBodyHtml = renderJainClassic(model, accent);
      break;
    case 'classic-ganesha':
      templateBodyHtml = renderClassicGanesha(model, accent);
      break;
    default:
      templateBodyHtml = renderEmeraldClassic(model, accent);
      break;
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(model.name || 'Biodata')} - ${escapeHtml(template.name)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Scheherazade+New:wght@600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: 210mm 297mm;
      margin: 0;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: #FFFFFF;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1F2937;
      font-size: 13px;
      line-height: 1.45;
    }
    .a4-root {
      width: 794px;
      height: 1123px;
      max-height: 1123px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      margin: 0 auto;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    @media print {
      html, body {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 0;
        background: transparent;
      }
      .a4-root {
        width: 100%;
        height: 100%;
        max-height: 100%;
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  <div class="a4-root">
    ${templateBodyHtml}
  </div>
</body>
</html>`;
}
