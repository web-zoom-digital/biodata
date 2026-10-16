
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert, Platform } from 'react-native';
import { generateBiodataHtml } from '@/lib/generateBiodataHtml';
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

export function triggerBrowserDownload(_dataUrlOrBlob: any, _filename: string): void {
  // no-op on native
}


export async function exportToPdf(_element: any, filename: string): Promise<void> {
  Alert.alert(
    'Use Share as PDF',
    'Tap the share button on your biodata to export as PDF on this device.'
  );
}

export async function exportToPng(_element: any, _filename: string): Promise<void> {
  Alert.alert(
    'PDF Export Available',
    'On this device, biodata exports as PDF via the native share sheet.'
  );
}

export async function exportToJpeg(_element: any, _filename: string): Promise<void> {
  Alert.alert(
    'PDF Export Available',
    'On this device, biodata exports as PDF via the native share sheet.'
  );
}

// Module-level guard to prevent concurrent share calls from colliding
let isNativeExportInProgress = false;

/**
 * Native-first export: generates PDF HTML, renders via expo-print,
 * then opens the native share sheet.
 *
 * Called from create.tsx when Platform.OS !== 'web'.
 */
export async function exportBiodataNative(
  format: ExportFormat,
  model: BiodataModel,
  template: TemplateDefinition,
  accent: string,
  filename: string
): Promise<void> {
  if (isNativeExportInProgress) {
    console.warn('[BioCraft Native Export]: Export already in progress, debouncing duplicate call.');
    return;
  }

  isNativeExportInProgress = true;
  const html = generateBiodataHtml(model, template, accent);

  try {
    if (format === 'PRINT') {
      await Print.printAsync({ html });
      return;
    }

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
        'PDF Saved',
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
        console.log('[BioCraft Native Export]: Share dialog dismissed or closed by user.');
        return;
      }

      console.warn('[BioCraft Native Export]: ShareAsync error, trying print fallback:', shareErr);
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
    console.error('[BioCraft Native Export]:', err);
    throw err;
  } finally {
    isNativeExportInProgress = false;
  }
}
