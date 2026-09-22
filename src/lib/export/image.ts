import { canvasToBlob, fileNameFor, renderToCanvas, saveBlob } from "./capture";

/** PNG / JPEG export. Long biodata is exported as one tall image; use PDF for separate A4 pages. */
export async function exportImage(node: HTMLElement, format: "png" | "jpeg", personName?: string) {
  const { canvas } = await renderToCanvas(node);
  let source = canvas;
  if (format === "jpeg") {
    // JPEG has no transparency, so flatten onto white first.
    const flat = document.createElement("canvas");
    flat.width = canvas.width;
    flat.height = canvas.height;
    const ctx = flat.getContext("2d");
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, flat.width, flat.height);
    ctx.drawImage(canvas, 0, 0);
    source = flat;
  }
  const blob = await canvasToBlob(source, format === "png" ? "image/png" : "image/jpeg", 0.95);
  saveBlob(blob, fileNameFor(personName, format));
}

