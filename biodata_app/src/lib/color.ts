// Color manipulation utilities for template palettes

function hexToRgb(hex: string): [number, number, number] {
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((c) => c + c).join('');
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

export function alpha(color: string, opacity: number): string {
  if (color.startsWith('#')) {
    const [r, g, b] = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`);
  }
  return color;
}

export function shade(color: string, percent: number): string {
  if (!color.startsWith('#')) return color;
  const [r, g, b] = hexToRgb(color);
  const factor = Math.max(0, 1 - percent);
  const newR = Math.round(r * factor);
  const newG = Math.round(g * factor);
  const newB = Math.round(b * factor);
  return `rgb(${newR}, ${newG}, ${newB})`;
}

export function tint(color: string, percent: number): string {
  if (!color.startsWith('#')) return color;
  const [r, g, b] = hexToRgb(color);
  const newR = Math.min(255, Math.round(r + (255 - r) * percent));
  const newG = Math.min(255, Math.round(g + (255 - g) * percent));
  const newB = Math.min(255, Math.round(b + (255 - b) * percent));
  return `rgb(${newR}, ${newG}, ${newB})`;
}
