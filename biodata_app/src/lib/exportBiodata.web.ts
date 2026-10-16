export type ExportFormat = 'PDF' | 'PNG' | 'JPEG' | 'PRINT';

export function getBiodataFilename(
  candidateName: string | undefined,
  templateName: string | undefined,
  extension: string
): string {
  const sanitize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const namePart = candidateName ? sanitize(candidateName) : 'candidate';
  const tmplPart = templateName ? sanitize(templateName) : 'template';

  return `biocraft-marriage-biodata-${namePart}-${tmplPart}.${extension}`;
}

/**
 * Converts a base64 Data URL to a native Blob for reliable mobile & desktop downloads.
 */
function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
  const binary = atob(parts[1]);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return new Blob([array], { type: mime });
}

/**
 * Triggers a native browser file download using a generated Blob or DataURL.
 */
export function triggerBrowserDownload(dataUrlOrBlob: string | Blob, filename: string): void {
  if (typeof document === 'undefined') return;

  const blob = typeof dataUrlOrBlob === 'string' ? dataUrlToBlob(dataUrlOrBlob) : dataUrlOrBlob;
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 4000);
}

/**
 * Prepares the DOM node for capture: waits for document fonts and all nested images.
 */
async function prepareNodeForCapture(element: HTMLElement): Promise<void> {
  // 1. Wait for document fonts if supported
  if (typeof document !== 'undefined' && 'fonts' in document && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Font loading failure should not prevent export
    }
  }

  // 2. Wait for all <img> tags to complete loading
  const images = Array.from(element.querySelectorAll('img'));
  if (images.length > 0) {
    await Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
            } else {
              img.addEventListener('load', () => resolve(), { once: true });
              img.addEventListener('error', () => resolve(), { once: true });
            }
          })
      )
    );
  }

  // 3. Small delay to ensure layout settling and repaint
  await new Promise((resolve) => setTimeout(resolve, 150));
}

const CAPTURE_OPTIONS = {
  pixelRatio: 2.2, // High resolution for clear text and printing
  width: 794,
  height: 1123,
  cacheBust: true,
  backgroundColor: '#FFFFFF',
  skipFonts: true, // Prevents CORS font fetch errors in mobile browsers
  fontEmbedCSS: '',
  style: {
    left: '0px',
    top: '0px',
    position: 'static',
    transform: 'none',
    margin: '0px',
  },
};

/**
 * Captures an HTML element as an image data URL, with automatic html2canvas fallback.
 */
async function captureElement(element: HTMLElement, format: 'png' | 'jpeg'): Promise<string> {
  try {
    const { toPng, toJpeg } = await import('html-to-image');
    if (format === 'png') {
      return await toPng(element, CAPTURE_OPTIONS);
    } else {
      return await toJpeg(element, { ...CAPTURE_OPTIONS, quality: 0.95 });
    }
  } catch (err) {
    console.warn('[html-to-image fallback to html2canvas]:', err);
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
    });
    return canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', 0.95);
  }
}

export async function exportToPdf(element: HTMLElement, filename: string): Promise<void> {
  await prepareNodeForCapture(element);
  const imgDataUrl = await captureElement(element, 'jpeg');
  const { jsPDF } = await import('jspdf/dist/jspdf.es.min.js');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  pdf.addImage(imgDataUrl, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  pdf.save(filename);
}

export async function exportToPng(element: HTMLElement, filename: string): Promise<void> {
  await prepareNodeForCapture(element);
  const dataUrl = await captureElement(element, 'png');
  triggerBrowserDownload(dataUrl, filename);
}

export async function exportToJpeg(element: HTMLElement, filename: string): Promise<void> {
  await prepareNodeForCapture(element);
  const dataUrl = await captureElement(element, 'jpeg');
  triggerBrowserDownload(dataUrl, filename);
}
