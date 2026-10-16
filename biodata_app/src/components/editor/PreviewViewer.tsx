import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { A4_WIDTH, A4_HEIGHT, calculateFitScale } from '@/templates/shared/constants';
import type { BiodataModel } from '@/types/biodata';
import type { TemplateDefinition } from '@/types/template';

interface PreviewViewerProps {
  model: BiodataModel;
  template: TemplateDefinition;
  accent?: string;
  onOpenDownload?: () => void;
  onOpenTemplates?: () => void;
  onOpenColorPicker?: () => void;
}

export const PreviewViewer: React.FC<PreviewViewerProps> = ({
  model,
  template,
  accent,
  onOpenDownload,
  onOpenTemplates,
  onOpenColorPicker,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [zoomMode, setZoomMode] = useState<'fit' | number>('fit');

  // Calculate fit scale considering BOTH viewport width and height
  const isDesktop = windowWidth >= 1024;
  const availableWidth = isDesktop
    ? Math.min(windowWidth * 0.55, 840) - 24
    : windowWidth - 16;

  // Vertical space reserved for toolbar (48), quick actions (64), header/tabs (70)
  const verticalOverhead = isDesktop ? 150 : 200;
  const availableHeight = Math.max(windowHeight - verticalOverhead, 320);

  const fitScale = calculateFitScale(availableWidth, availableHeight, 4, 1.05, 0.28);

  // Active scale
  const scale = zoomMode === 'fit' ? fitScale : zoomMode;
  const renderedWidth = Math.round(A4_WIDTH * scale);
  const renderedHeight = Math.round(A4_HEIGHT * scale);

  const Component = template.component;
  const effectiveAccent = accent || template.defaultSettings.accent;
  const settings = {
    ...template.defaultSettings,
    accent: effectiveAccent,
    showPhotoPlaceholder: true,
  };

  const frameRef = React.useRef<any>(null);

  // Automated overflow check in development (Requirement 25)
  React.useEffect(() => {
    if (typeof __DEV__ !== 'undefined' && __DEV__ && Platform.OS === 'web') {
      const timer = setTimeout(() => {
        if (frameRef.current) {
          const el = frameRef.current as any;
          const sheet =
            el.querySelector?.('[style*="1123"]') ||
            el.querySelector?.('[style*="height"]') ||
            el.firstElementChild?.firstElementChild ||
            el;
          if (sheet) {
            const scrollH = sheet.scrollHeight || el.scrollHeight;
            const scrollW = sheet.scrollWidth || el.scrollWidth;
            const isPass = scrollH <= A4_HEIGHT + 2 && scrollW <= A4_WIDTH + 2;
            if (isPass) {
              console.log(
                `%c[BioCraft Check] ${template.name} — PASS (H: ${scrollH}/${A4_HEIGHT}px, W: ${scrollW}/${A4_WIDTH}px)`,
                'color: #059669; font-weight: bold;'
              );
            } else {
              console.warn(
                `[BioCraft Check] ${template.name} — FAIL (H: ${scrollH}/${A4_HEIGHT}px, W: ${scrollW}/${A4_WIDTH}px)`
              );
            }
          }
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [template.id, template.name, model]);

  const handleZoomIn = () => {
    const cur = zoomMode === 'fit' ? fitScale : zoomMode;
    setZoomMode(Math.min(Number((cur + 0.12).toFixed(2)), 1.35));
  };

  const handleZoomOut = () => {
    const cur = zoomMode === 'fit' ? fitScale : zoomMode;
    setZoomMode(Math.max(Number((cur - 0.12).toFixed(2)), 0.36));
  };

  const handleSetPreset = (preset: 'fit' | 0.75 | 1.0) => {
    setZoomMode(preset);
  };

  return (
    <View style={styles.container}>
      {/* Zoom and Preview Toolbar */}
      <View style={styles.toolbar}>
        <View style={styles.zoomControlGroup}>
          <Pressable
            onPress={handleZoomOut}
            style={({ pressed }) => [styles.toolBtn, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
            accessibilityLabel="Zoom out preview"
          >
            <Ionicons name="remove" size={17} color="#475569" />
          </Pressable>

          <Text style={styles.zoomLabel}>{Math.round(scale * 100)}%</Text>

          <Pressable
            onPress={handleZoomIn}
            style={({ pressed }) => [styles.toolBtn, pressed && { opacity: 0.7 }]}
            accessibilityRole="button"
            accessibilityLabel="Zoom in preview"
          >
            <Ionicons name="add" size={17} color="#475569" />
          </Pressable>

          <Pressable
            onPress={() => handleSetPreset('fit')}
            style={[
              styles.fitBtn,
              zoomMode === 'fit' && styles.fitBtnActive,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Fit preview to screen"
          >
            <Ionicons
              name="scan-outline"
              size={13}
              color={zoomMode === 'fit' ? '#047857' : '#64748B'}
            />
            <Text
              style={[
                styles.fitBtnText,
                zoomMode === 'fit' && styles.fitBtnTextActive,
              ]}
            >
              Fit
            </Text>
          </Pressable>

    
          <Pressable
            onPress={() => handleSetPreset(1.0)}
            style={[
              styles.fitBtn,
              zoomMode === 1.0 && styles.fitBtnActive,
            ]}
            accessibilityRole="button"
            accessibilityLabel="100% full A4 size"
          >
            <Text
              style={[
                styles.fitBtnText,
                zoomMode === 1.0 && styles.fitBtnTextActive,
              ]}
            >
              100%
            </Text>
          </Pressable>
        </View>

        <View style={styles.pageInfoGroup}>
          <Text style={styles.pageInfoText}>A4 · 1 Page</Text>
        </View>
      </View>

      {/* Scrollable Preview Canvas with optional horizontal scrolling when zoomed */}
      <ScrollView
        horizontal={renderedWidth > windowWidth - 10}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ minWidth: '100%', alignItems: 'center' }}
      >
        <ScrollView
          contentContainerStyle={styles.canvasContent}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
        >
          <View
            ref={frameRef}
            style={[
              styles.a4Frame,
              {
                width: renderedWidth,
                height: renderedHeight,
              },
            ]}
          >
            <Component model={model} settings={settings} scale={scale} />
          </View>

          {/* Quick actions row underneath preview */}
          <View style={styles.previewActionsRow}>
            {onOpenColorPicker || onOpenTemplates ? (
              <Pressable
                onPress={onOpenColorPicker || onOpenTemplates}
                style={({ pressed }) => [
                  styles.subActionBtn,
                  { borderColor: effectiveAccent },
                  pressed && { opacity: 0.8 },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Change Color"
              >
                <Ionicons name="color-palette-outline" size={16} color={effectiveAccent} />
                <Text style={[styles.subActionText, { color: effectiveAccent }]}>Change Color</Text>
              </Pressable>
            ) : null}

            {onOpenDownload ? (
              <Pressable
                onPress={onOpenDownload}
                style={({ pressed }) => [styles.mainDownloadBtn, pressed && { opacity: 0.88 }]}
                accessibilityRole="button"
                accessibilityLabel="Download Biodata"
              >
                <Ionicons name="download-outline" size={16} color="#FFFFFF" />
                <Text style={styles.mainDownloadBtnText}>Download PDF / Image</Text>
              </Pressable>
            ) : null}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAEE',
    width: '100%',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    zIndex: 10,
  },
  zoomControlGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  zoomLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    minWidth: 40,
    textAlign: 'center',
  },
  fitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  fitBtnActive: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  fitBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  fitBtnTextActive: {
    color: '#047857',
    fontWeight: '700',
  },
  pageInfoGroup: {
    paddingHorizontal: 8,
  },
  pageInfoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  canvasContent: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  a4Frame: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 18,
      },
      android: {
        elevation: 8,
      },
      web: {
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.18)',
      } as any,
    }),
  },
  previewActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    paddingBottom: 24,
  },
  subActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    minHeight: 42,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  subActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#047857',
  },
  mainDownloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#047857',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    minHeight: 42,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  mainDownloadBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
