import { A4_HEIGHT } from "@/templates/shared/constants";

/** Vertical margin (css px) added above/below content on multi-page exports. */
export const PAGE_MARGIN = 40;
/** Content up to this much taller than A4 is scaled to fit on one page instead of spilling a few pixels. */
const FIT_TOLERANCE = 36;

export interface PageSlice {
  start: number;
  end: number;
}

interface Block {
  top: number;
  bottom: number;
  kind: string;
}

function collectBlocks(root: HTMLElement): Block[] {
  const rootTop = root.getBoundingClientRect().top;
  const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-block]")).map((el) => {
    const r = el.getBoundingClientRect();
    return { top: r.top - rootTop, bottom: r.bottom - rootTop, kind: el.dataset.block ?? "" };
  });
  // Keep a section title together with the first block that follows it.
  for (let i = 0; i < blocks.length - 1; i++) {
    if (blocks[i].kind === "title") blocks[i].bottom = Math.max(blocks[i].bottom, blocks[i + 1].bottom);
  }
  return blocks;
}

/**
 * Decides where to cut a tall biodata into A4 pages without slicing through a row or paragraph.
 * Returns page slices in css pixels relative to the template root.
 */
export function computePageSlices(root: HTMLElement): { slices: PageSlice[]; fitScale: number } {
  const total = root.scrollHeight;
  if (total <= A4_HEIGHT + FIT_TOLERANCE) {
    return { slices: [{ start: 0, end: total }], fitScale: total > A4_HEIGHT ? A4_HEIGHT / total : 1 };
  }
  const blocks = collectBlocks(root);
  const slices: PageSlice[] = [];
  let start = 0;
  let guard = 0;
  while (start < total - 1 && guard++ < 40) {
    const usable = A4_HEIGHT - (slices.length === 0 ? PAGE_MARGIN : PAGE_MARGIN * 2);
    let end = start + usable;
    if (end >= total - 1) {
      slices.push({ start, end: total });
      break;
    }
    let moved = true;
    let iterations = 0;
    while (moved && iterations++ < 60) {
      moved = false;
      for (const b of blocks) {
        if (b.top < end && b.bottom > end && b.top > start + usable * 0.35) {
          end = b.top;
          moved = true;
        }
      }
    }
    slices.push({ start, end });
    start = end;
  }
  return { slices, fitScale: 1 };
}
