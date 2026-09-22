import { siteConfig } from "@/config/site";
import { A4_WIDTH } from "@/templates/shared/constants";
import { ExportError, fileNameFor, renderToCanvas } from "./capture";
import { PAGE_MARGIN, computePageSlices } from "./paginate";

function parseRgb(value: string): [number, number, number] {
  const m = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!m) return [255, 255, 255];
  if (m[4] !== undefined && Number(m[4]) === 0) return [255, 255, 255];
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/**
 * A4 PDF. The biodata is rendered once at ~300 dpi and placed page by page.
 * Longer content is split between rows/paragraphs, never through them.
 */
export async function exportPdf(node: HTMLElement, personName?: string) {
  // Measure before rasterising: layout must match what gets drawn.
  const { slices, fitScale } = computePageSlices(node);
  const { canvas, ratio } = await renderToCanvas(node);
  const background = parseRgb(getComputedStyle(node).backgroundColor);

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const mmPerPx = pageW / A4_WIDTH;

  slices.forEach((slice, index) => {
    if (index > 0) pdf.addPage("a4", "portrait");
    pdf.setFillColor(...background);
    pdf.rect(0, 0, pageW, pageH, "F");

    const sy = Math.round(slice.start * ratio);
    const sh = Math.max(1, Math.min(canvas.height - sy, Math.round((slice.end - slice.start) * ratio)));
    const part = document.createElement("canvas");
    part.width = canvas.width;
    part.height = sh;
    const ctx = part.getContext("2d");
    if (!ctx) throw new ExportError("Canvas is not available in this browser.");
    ctx.fillStyle = `rgb(${background.join(",")})`;
    ctx.fillRect(0, 0, part.width, part.height);
    ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);

    const drawW = pageW * fitScale;
    const drawH = (slice.end - slice.start) * mmPerPx * fitScale;
    const x = (pageW - drawW) / 2;
    const y = index === 0 ? 0 : PAGE_MARGIN * mmPerPx;
    pdf.addImage(part.toDataURL("image/jpeg", 0.95), "JPEG", x, y, drawW, Math.min(drawH, pageH - y), undefined, "FAST");
  });

  pdf.setProperties({ title: `${personName || "Marriage"} biodata`, creator: siteConfig.name });
  pdf.save(fileNameFor(personName, "pdf"));
  return { pages: slices.length };
}
