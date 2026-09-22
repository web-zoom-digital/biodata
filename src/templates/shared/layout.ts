import type { ResolvedSection } from "@/types/biodata";

/** Rough visual height of a section, used only to balance columns. */
export function sectionWeight(s: ResolvedSection) {
  const textLines = s.text ? Math.ceil(s.text.length / 58) : 0;
  const rowLines = s.rows.reduce((sum, r) => sum + Math.max(1, Math.ceil((r.label.length + r.value.length) / 62)), 0);
  return 2.4 + rowLines + textLines;
}

/** Greedy split into `count` columns of similar height, keeping each section intact. */
export function balanceColumns(sections: ResolvedSection[], count = 2): ResolvedSection[][] {
  const cols: ResolvedSection[][] = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0) as number[];
  for (const s of sections) {
    let target = 0;
    for (let i = 1; i < count; i++) if (heights[i] < heights[target]) target = i;
    cols[target].push(s);
    heights[target] += sectionWeight(s);
  }
  return cols;
}

export function pick(sections: ResolvedSection[], keys: string[]) {
  return sections.filter((s) => keys.includes(s.key));
}

export function omit(sections: ResolvedSection[], keys: string[]) {
  return sections.filter((s) => !keys.includes(s.key));
}
