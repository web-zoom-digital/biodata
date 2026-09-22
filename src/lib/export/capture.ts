import { getFontEmbedCSS, toCanvas } from "html-to-image";

/** 300 dpi expressed against the 96 dpi CSS pixel grid. */
const TARGET_RATIO = 300 / 96;
/** Keep canvases under ~16M pixels so iOS Safari and low-memory phones don't fail silently. */
const MAX_PIXELS = 16_000_000;
const MAX_SIDE = 16_000;

export class ExportError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ExportError";
  }
}

function isSafari() {
  const ua = navigator.userAgent;
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(ua);
}

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));
  await Promise.all(
    images.map(async (img) => {
      if (!img.complete) {
        await new Promise<void>((resolve, reject) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => reject(new ExportError("The profile photo could not be loaded. Try uploading it again.")), { once: true });
        });
      }
      if (img.naturalWidth === 0) throw new ExportError("The profile photo could not be loaded. Try uploading it again.");
      try {
        await img.decode();
      } catch {
        /* decode() can reject for SVG data URLs; the image itself is fine */
      }
    }),
  );
}

export function exportRatio(width: number, height: number) {
  const byArea = Math.sqrt(MAX_PIXELS / (width * height));
  const bySide = MAX_SIDE / Math.max(width, height);
  return Math.max(1, Math.min(TARGET_RATIO, byArea, bySide));
}

/** Rasterises a template root into a canvas at roughly 300 dpi. */
export async function renderToCanvas(node: HTMLElement): Promise<{ canvas: HTMLCanvasElement; ratio: number }> {
  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await waitForImages(node);
    const width = node.offsetWidth;
    const height = node.scrollHeight;
    const ratio = exportRatio(width, height);
    const fontEmbedCSS = await getFontEmbedCSS(node);
    const options = { pixelRatio: ratio, fontEmbedCSS, width, height, cacheBust: false, style: { margin: "0", transform: "none" } };
    // Safari often paints images/fonts on the second pass only, so warm it up with a tiny render first.
    if (isSafari()) await toCanvas(node, { ...options, pixelRatio: 0.2 });
    const canvas = await toCanvas(node, options);
    if (!canvas.width || !canvas.height) throw new ExportError("The browser produced an empty image.");
    return { canvas, ratio };
  } catch (err) {
    if (err instanceof ExportError) throw err;
    throw new ExportError("Your browser could not render the biodata. Close other tabs and try again, or use Print / Save as PDF.", { cause: err });
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: "image/png" | "image/jpeg", quality = 0.95): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new ExportError("The image could not be created. Try again."))),
      type,
      quality,
    );
  });
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export function fileNameFor(name: string | undefined, ext: string) {
  const slug = (name ?? "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${slug || "my"}-biodata.${ext}`;
}
