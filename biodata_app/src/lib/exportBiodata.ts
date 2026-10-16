import { Platform, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { generateBiodataHtml } from './generateBiodataHtml';
import type { BiodataModel } from '@/types/biodata';
import type { TemplateDefinition } from '@/types/template';

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

let isNativeExportInProgress = false;

export async function exportBiodataNative(
  format: ExportFormat,
  model: BiodataModel,
  template: TemplateDefinition,
  accent: string,
  filename: string
): Promise<void> {
  if (isNativeExportInProgress) {
    console.warn('[BioCraft Export]: Export already in progress, debouncing duplicate call.');
    return;
  }

  isNativeExportInProgress = true;
  const html = generateBiodataHtml(model, template, accent);

  try {
    if (format === 'PRINT') {
      await Print.printAsync({ html });
      return;
    }

    // Generate vector print-ready A4 PDF file
    const { uri } = await Print.printToFileAsync({
      html,
      width: 595,
      height: 842,
      base64: false,
    });
    const cleanUri = uri.startsWith('file://') ? uri : `file://${uri}`;

    const pdfFilename = filename.toLowerCase().endsWith('.pdf')
      ? filename
      : `${filename.replace(/\.[a-z0-9]+$/i, '')}.pdf`;

    const canShare = await Sharing.isAvailableAsync();
    if (!canShare) {
      Alert.alert(
        'Biodata PDF Saved',
        `Your biodata PDF has been created successfully at:\n${cleanUri}\n(Sharing is not supported on this device/emulator)`
      );
      return;
    }

    try {
      const shareOptions: Sharing.SharingOptions = {
        mimeType: 'application/pdf',
        dialogTitle: `Share ${pdfFilename}`,
      };
      if (Platform.OS === 'ios') {
        shareOptions.UTI = 'com.adobe.pdf';
      }

      await Sharing.shareAsync(cleanUri, shareOptions);
    } catch (shareErr: any) {
      const errMsg = String(shareErr?.message || shareErr || '');
      const isDismissalOrCancellation =
        errMsg.toLowerCase().includes('rejected') ||
        errMsg.toLowerCase().includes('cancel') ||
        errMsg.toLowerCase().includes('dismiss') ||
        errMsg.toLowerCase().includes('another share request');

      if (isDismissalOrCancellation) {
        console.log('[BioCraft Export]: Share dialog dismissed or closed by user.');
        return;
      }

      console.warn('[BioCraft Export]: ShareAsync error, trying print fallback:', shareErr);
      try {
        await Print.printAsync({ html });
      } catch {
        Alert.alert(
          'Biodata PDF Created',
          `Your biodata PDF has been saved on this device at:\n${cleanUri}`
        );
      }
    }
  } catch (err: any) {
    console.error('[BioCraft Export]:', err);
    throw err;
  } finally {
    isNativeExportInProgress = false;
  }
}

export function triggerBrowserDownload(dataUrlOrBlob: any, filename: string): void {
  if (Platform.OS === 'web') {
    import('./exportBiodata.web').then((webExport) => {
      webExport.triggerBrowserDownload(dataUrlOrBlob, filename);
    });
  }
}

export async function exportToPdf(element: any, filename: string): Promise<void> {
  if (Platform.OS === 'web') {
    const webExport = await import('./exportBiodata.web');
    return webExport.exportToPdf(element, filename);
  }
}

export async function exportToPng(element: any, filename: string): Promise<void> {
  if (Platform.OS === 'web') {
    const webExport = await import('./exportBiodata.web');
    return webExport.exportToPng(element, filename);
  }
}

export async function exportToJpeg(element: any, filename: string): Promise<void> {
  if (Platform.OS === 'web') {
    const webExport = await import('./exportBiodata.web');
    return webExport.exportToJpeg(element, filename);
  }
}
