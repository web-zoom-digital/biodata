import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DownloadModalProps {
  visible: boolean;
  onClose: () => void;
  onDownload: (format: 'PDF' | 'PNG' | 'JPEG' | 'PRINT') => void;
  candidateName?: string;
  isExporting?: boolean;
  exportingFormat?: 'PDF' | 'PNG' | 'JPEG' | 'PRINT' | null;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  visible,
  onClose,
  onDownload,
  candidateName = 'Candidate',
  isExporting = false,
  exportingFormat = null,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={isExporting ? () => {} : onClose}
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={isExporting ? undefined : onClose}
        />

        <View style={styles.sheetContainer}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <View>
              <Text style={styles.sheetTitle}>Download Biodata</Text>
              <Text style={styles.sheetSubtitle}>
                {isExporting
                  ? `Generating ${exportingFormat}... please wait a moment.`
                  : `Created locally on your device for "${candidateName}"`}
              </Text>
            </View>
            <Pressable
              onPress={isExporting ? undefined : onClose}
              disabled={isExporting}
              style={({ pressed }) => [
                styles.closeBtn,
                (pressed || isExporting) && { opacity: 0.5 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Close download options"
            >
              <Ionicons name="close" size={22} color="#0F172A" />
            </Pressable>
          </View>

          {/* Options */}
          <View style={styles.optionsList}>
            {/* 1. PDF */}
            <Pressable
              onPress={() => onDownload('PDF')}
              disabled={isExporting}
              style={({ pressed }) => [
                styles.optionItem,
                styles.optionItemPdf,
                (pressed || isExporting) && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Download A4 PDF"
            >
              <View style={[styles.iconBox, { backgroundColor: '#047857' }]}>
                {isExporting && exportingFormat === 'PDF' ? (
                  <Ionicons name="sync" size={22} color="#FFFFFF" />
                ) : (
                  <Ionicons name="document-text" size={22} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.optionContent}>
                <View style={styles.badgeRow}>
                  <Text style={styles.optionTitle}>
                    {isExporting && exportingFormat === 'PDF'
                      ? 'Generating A4 PDF...'
                      : 'Download PDF'}
                  </Text>
                  <View style={styles.recBadge}>
                    <Text style={styles.recBadgeText}>Recommended</Text>
                  </View>
                </View>
                <Text style={styles.optionDesc}>
                  Print-ready vector A4 format (300 DPI). Best for printing and sharing.
                </Text>
              </View>
            </Pressable>

            {/* 2. PNG */}
            <Pressable
              onPress={() => onDownload('PNG')}
              disabled={isExporting}
              style={({ pressed }) => [
                styles.optionItem,
                (pressed || isExporting) && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Download High-Resolution PNG"
            >
              <View style={[styles.iconBox, { backgroundColor: '#2563EB' }]}>
                {isExporting && exportingFormat === 'PNG' ? (
                  <Ionicons name="sync" size={22} color="#FFFFFF" />
                ) : (
                  <Ionicons name="image" size={22} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  {isExporting && exportingFormat === 'PNG'
                    ? 'Generating High-Res PNG...'
                    : 'Download PNG'}
                </Text>
                <Text style={styles.optionDesc}>
                  Crisp high-definition image for WhatsApp and emails.
                </Text>
              </View>
            </Pressable>

            {/* 3. JPEG */}
            <Pressable
              onPress={() => onDownload('JPEG')}
              disabled={isExporting}
              style={({ pressed }) => [
                styles.optionItem,
                (pressed || isExporting) && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Download JPEG"
            >
              <View style={[styles.iconBox, { backgroundColor: '#7C3AED' }]}>
                {isExporting && exportingFormat === 'JPEG' ? (
                  <Ionicons name="sync" size={22} color="#FFFFFF" />
                ) : (
                  <Ionicons name="image-outline" size={22} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  {isExporting && exportingFormat === 'JPEG'
                    ? 'Generating JPEG...'
                    : 'Download JPEG'}
                </Text>
                <Text style={styles.optionDesc}>
                  Compact file size, easy to attach and send quickly.
                </Text>
              </View>
            </Pressable>

            {/* 4. Print / Save as PDF */}
            <Pressable
              onPress={() => onDownload('PRINT')}
              disabled={isExporting}
              style={({ pressed }) => [
                styles.optionItem,
                styles.optionItemPrint,
                (pressed || isExporting) && { opacity: 0.85 },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Print or Save as PDF"
            >
              <View style={[styles.iconBox, { backgroundColor: '#0F172A' }]}>
                {isExporting && exportingFormat === 'PRINT' ? (
                  <Ionicons name="sync" size={22} color="#FFFFFF" />
                ) : (
                  <Ionicons name="print-outline" size={22} color="#FFFFFF" />
                )}
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>
                  {isExporting && exportingFormat === 'PRINT'
                    ? 'Opening Print / PDF...'
                    : 'Print / Save as PDF'}
                </Text>
                <Text style={styles.optionDesc}>
                  Opens system print dialog to select physical printer or direct Save as PDF.
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
    maxWidth: 580,
    alignSelf: 'center',
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  sheetSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  optionsList: {
    padding: 16,
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    minHeight: 64,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  optionItemPdf: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  optionItemPrint: {
    backgroundColor: '#F8FAFC',
    borderColor: '#CBD5E1',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  optionContent: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  recBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  recBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#047857',
  },
  optionDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
});
