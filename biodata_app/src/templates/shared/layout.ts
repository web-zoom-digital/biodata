import type { ResolvedSection } from '@/types/biodata';

export function sectionWeight(s: ResolvedSection): number {
  if (!s) return 0;
  const text = s.text ? String(s.text) : '';
  const textLines = text ? Math.ceil(text.length / 58) : 0;
  const rowLines = (s.rows || []).reduce(
    (sum, r) =>
      sum +
      Math.max(
        1,
        Math.ceil(
          ((r?.label ? String(r.label).length : 0) +
            (r?.value ? String(r.value).length : 0)) /
            62
        )
      ),
    0
  );
  return 2.4 + rowLines + textLines;
}

export function balanceColumns(sections: ResolvedSection[] = [], count = 2): ResolvedSection[][] {
  const safeSections = Array.isArray(sections) ? sections : [];
  const cols: ResolvedSection[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0) as number[];
  for (const s of safeSections) {
    if (!s) continue;
    let target = 0;
    for (let i = 1; i < count; i++) {
      if (heights[i] < heights[target]) target = i;
    }
    cols[target].push(s);
    heights[target] += sectionWeight(s);
  }
  return cols;
}

export function pick(sections: ResolvedSection[] = [], keys: string[] = []): ResolvedSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.filter((s) => s && keys.includes(s.key));
}

export function omit(sections: ResolvedSection[] = [], keys: string[] = []): ResolvedSection[] {
  if (!Array.isArray(sections)) return [];
  return sections.filter((s) => s && !keys.includes(s.key));
}
