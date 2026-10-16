import type { ResolvedSection } from '@/types/biodata';

/**
 * Intelligently balances sections across Left and Right columns
 * so that both columns have equal vertical height and all form information
 * fits completely on ONE single A4 page without overflowing or clipping.
 */
export function balanceSections(sections: ResolvedSection[]): {
  leftSections: ResolvedSection[];
  rightSections: ResolvedSection[];
} {
  // Only include sections that contain actual valid rows or text
  const activeSections = sections.filter((s) => {
    const hasRows =
      Array.isArray(s.rows) &&
      s.rows.some((r) => r && typeof r.value === 'string' && r.value.trim().length > 0);
    const hasText = Boolean(s.text && typeof s.text === 'string' && s.text.trim().length > 0);
    return hasRows || hasText;
  });

  // Preferred natural reading order for matrimony biodatas:
  // Personal -> Family -> Education -> Profession -> Astrology -> Lifestyle -> Contact -> About -> Expectations -> Custom
  const preferredOrder = [
    'personal',
    'family',
    'education',
    'profession',
    'astrology',
    'lifestyle',
    'contact',
    'about',
    'expectations',
    'custom',
  ];

  const sorted = [...activeSections].sort((a, b) => {
    const idxA = preferredOrder.indexOf(a.key);
    const idxB = preferredOrder.indexOf(b.key);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const left: ResolvedSection[] = [];
  const right: ResolvedSection[] = [];
  let leftWeight = 0;
  let rightWeight = 0;

  sorted.forEach((sec) => {
    const validRowsCount = Array.isArray(sec.rows)
      ? sec.rows.filter((r) => r && typeof r.value === 'string' && r.value.trim().length > 0).length
      : 0;
    const textWeight = sec.text && sec.text.trim().length > 0 ? 3 : 0;
    // Base weight = rows + text lines + section title & margin overhead
    const weight = validRowsCount + textWeight + 2;

    // Distribute to whichever column has less cumulative content
    if (leftWeight <= rightWeight) {
      left.push(sec);
      leftWeight += weight;
    } else {
      right.push(sec);
      rightWeight += weight;
    }
  });

  return { leftSections: left, rightSections: right };
}
