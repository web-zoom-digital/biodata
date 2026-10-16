import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import Head from 'expo-router/head';
import { useLocalSearchParams } from 'expo-router';
import { getTemplateOrDefault, getTemplate } from '@/templates/registry';
import {
  INITIAL_EMPTY_FORM_DATA,
  SAMPLE_FORM_DATA,
  SAMPLE_FORM_DATA_GIRL,
  SAMPLE_PHOTO_BOY,
  SAMPLE_PHOTO_GIRL,
} from '@/data/sample-biodata';
import {
  resolveBiodata,
  DEFAULT_SECTION_VISIBILITY,
} from '@/types/biodata';
import type {
  FormDataModel,
  SectionVisibility,
  BiodataModel,
} from '@/types/biodata';
import type { TemplateDefinition } from '@/types/template';
import {
  loadStoredBiodata,
  loadStoredBiodataAsync,
  saveStoredBiodata,
  clearStoredBiodata,
  saveDownloadedBiodataAsync,
  loadSavedBiodataByIdAsync,
} from '@/lib/biodataStorage';
import { EditorHeader } from '@/components/editor/EditorHeader';
import { EditorTabs, EditorTabKey } from '@/components/editor/EditorTabs';
import { EditorForm } from '@/components/editor/EditorForm';
import { PreviewViewer } from '@/components/editor/PreviewViewer';
import { TemplateSelectorModal } from '@/components/editor/TemplateSelectorModal';
import { ColorThemeModal } from '@/components/editor/ColorThemeModal';
import { DownloadModal } from '@/components/editor/DownloadModal';
import { LoadingScreen } from '@/components/LoadingScreen';
import {
  exportToPdf,
  exportToPng,
  exportToJpeg,
  exportBiodataNative,
  getBiodataFilename,
  ExportFormat,
} from '@/lib/exportBiodata';

export default function CreateBiodataScreen() {
  const { template: templateQuery, tab: tabQuery, savedId } = useLocalSearchParams<{
    template?: string;
    tab?: string;
    savedId?: string;
  }>();
  const { width: windowWidth } = useWindowDimensions();
  const isDesktop = windowWidth >= 1024;

  // 1. Template Resolution:
  // Precedence: User override in session -> URL query param (e.g. /create?template=royal-heritage) -> stored template -> default
  const [overrideTemplateId, setOverrideTemplateId] = useState<string | null>(null);

  const activeTemplateId = useMemo(() => {
    if (overrideTemplateId && getTemplate(overrideTemplateId)) {
      return overrideTemplateId;
    }
    if (templateQuery && getTemplate(templateQuery)) {
      return templateQuery;
    }
    const stored = loadStoredBiodata();
    if (stored?.templateId && getTemplate(stored.templateId)) {
      return stored.templateId;
    }
    return getTemplateOrDefault(templateQuery).id;
  }, [overrideTemplateId, templateQuery]);

  const selectedTemplate: TemplateDefinition = useMemo(() => {
    return getTemplateOrDefault(activeTemplateId);
  }, [activeTemplateId]);

  // Accent color state
  const [accent, setAccent] = useState<string>(() => {
    const stored = loadStoredBiodata();
    if (templateQuery && stored?.templateId && stored.templateId !== templateQuery) {
      return getTemplateOrDefault(templateQuery).defaultSettings.accent;
    }
    return stored?.accent || selectedTemplate.defaultSettings.accent;
  });

  // 2. Biodata Form Data State:
  const [formData, setFormData] = useState<FormDataModel>(() => {
    const stored = loadStoredBiodata();
    if (stored?.data) {
      return stored.data;
    }
    // Default to rich sample data if nothing is saved
    const tmpl = getTemplateOrDefault(templateQuery);
    return tmpl.previewSample === 'girl' ? SAMPLE_FORM_DATA_GIRL : SAMPLE_FORM_DATA;
  });

  // 3. Section Visibility State:
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>(() => {
    const stored = loadStoredBiodata();
    return stored?.enabled || DEFAULT_SECTION_VISIBILITY;
  });

  // Asynchronously hydrate saved biodata on native devices or when opening an item from My Biodatas
  useEffect(() => {
    let isMounted = true;
    if (savedId) {
      loadSavedBiodataByIdAsync(savedId).then((item) => {
        if (isMounted && item) {
          setFormData(item.data);
          if (item.enabled) setSectionVisibility(item.enabled);
          if (item.accent) setAccent(item.accent);
          if (item.templateId) setOverrideTemplateId(item.templateId);
          saveStoredBiodata(item.data, item.enabled, item.templateId, item.accent);
        }
      });
      return () => {
        isMounted = false;
      };
    }

    loadStoredBiodataAsync().then((stored) => {
      if (isMounted && stored?.data) {
        setFormData(stored.data);
        if (stored.enabled) setSectionVisibility(stored.enabled);
        if (stored.accent && (!templateQuery || stored.templateId === templateQuery)) {
          setAccent(stored.accent);
        }
        if (stored.templateId && !templateQuery) {
          setOverrideTemplateId(stored.templateId);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [templateQuery, savedId]);

  // 4. Save Status State:
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('saved');
  const saveTimeoutRef = useRef<any>(null);

  // Debounced auto-save to LocalStorage
  const triggerAutoSave = (
    nextData: FormDataModel,
    nextVisibility: SectionVisibility,
    currentTmplId: string,
    currentAccent?: string
  ) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveStoredBiodata(nextData, nextVisibility, currentTmplId, currentAccent);
      setSaveStatus('saved');
    }, 500);
  };

  // Field updater
  const handleUpdateField = <K extends keyof FormDataModel>(
    section: K,
    value: FormDataModel[K]
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [section]: value };
      triggerAutoSave(next, sectionVisibility, activeTemplateId, accent);
      return next;
    });
  };

  // Section toggle updater
  const handleToggleSection = (
    sectionKey: keyof SectionVisibility,
    isEnabled: boolean
  ) => {
    setSectionVisibility((prev) => {
      const next = { ...prev, [sectionKey]: isEnabled };
      triggerAutoSave(formData, next, activeTemplateId, accent);
      return next;
    });
  };

  // Template switch handler (data preserved!)
  const handleSelectTemplate = (tmpl: TemplateDefinition) => {
    setOverrideTemplateId(tmpl.id);
    const newAccent = tmpl.defaultSettings.accent;
    setAccent(newAccent);
    triggerAutoSave(formData, sectionVisibility, tmpl.id, newAccent);
  };

  // Accent change handler
  const handleAccentChange = (newAccent: string) => {
    setAccent(newAccent);
    triggerAutoSave(formData, sectionVisibility, activeTemplateId, newAccent);
  };

  // Load sample biodata
  const handleLoadSample = () => {
    const sample = selectedTemplate.previewSample === 'girl'
      ? SAMPLE_FORM_DATA_GIRL
      : SAMPLE_FORM_DATA;
    setFormData(sample);
    setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
    triggerAutoSave(sample, DEFAULT_SECTION_VISIBILITY, activeTemplateId, accent);
  };

  // Clear draft
  const handleClearDraft = () => {
    const performClear = () => {
      clearStoredBiodata();
      setFormData(INITIAL_EMPTY_FORM_DATA);
      setSectionVisibility(DEFAULT_SECTION_VISIBILITY);
      setSaveStatus('saved');
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const confirmClear = window.confirm(
        'Clear all details? This will reset the biodata form on this device.'
      );
      if (confirmClear) performClear();
    } else {
      Alert.alert(
        'Clear Draft',
        'Clear all details? This will reset the biodata form on this device.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear', style: 'destructive', onPress: performClear },
        ]
      );
    }
  };

  // 5. Active Tab (Mobile):
  const [tabOverride, setTabOverride] = useState<EditorTabKey | null>(null);
  const activeTab: EditorTabKey = tabOverride ?? (tabQuery === 'preview' ? 'preview' : 'edit');

  // 6. Modals & Export State:
  const [templateModalVisible, setTemplateModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportingFormat, setExportingFormat] = useState<ExportFormat | null>(null);
  const exportContainerRef = useRef<any>(null);

  const isExportingRef = useRef(false);

  // 7. Live Resolved Biodata:
  const resolvedModel: BiodataModel = useMemo(() => {
    const m = resolveBiodata(formData, sectionVisibility);
    if (!m.photo && (m.name === 'Aarav Sharma' || m.name === 'Ananya Verma' || !m.name)) {
      m.photo = selectedTemplate.previewSample === 'girl' ? SAMPLE_PHOTO_GIRL : SAMPLE_PHOTO_BOY;
    }
    return m;
  }, [formData, sectionVisibility, selectedTemplate.previewSample]);

  // 8. Download / Export Handler:
  const handleDownload = async (format: 'PDF' | 'PNG' | 'JPEG' | 'PRINT') => {
    if (isExportingRef.current || isExporting) {
      console.log('[BioCraft] Export already running, ignoring duplicate tap.');
      return;
    }

    isExportingRef.current = true;
    setIsExporting(true);
    setExportingFormat(format);
    setDownloadModalVisible(false);

    const filename = getBiodataFilename(
      resolvedModel.name,
      selectedTemplate.name,
      format === 'PDF' || format === 'PRINT' ? 'pdf' : format === 'PNG' ? 'png' : 'jpg'
    );

    saveDownloadedBiodataAsync({
      name: resolvedModel.name || formData.personal?.fullName || 'Untitled Biodata',
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      accent,
      format,
      filename,
      data: formData,
      enabled: sectionVisibility,
    }).catch((saveErr) => {
      console.warn('[BioCraft] Auto-save to My Biodatas notice:', saveErr);
    });

    // Mobile Native (Android & iOS via Expo)
    if (Platform.OS !== 'web') {
      try {
        await exportBiodataNative(format, resolvedModel, selectedTemplate, accent, filename);
      } catch (err: any) {
        const errMsg = String(err?.message || err || '');
        const isUserDismissal =
          errMsg.toLowerCase().includes('rejected') ||
          errMsg.toLowerCase().includes('cancel') ||
          errMsg.toLowerCase().includes('dismiss') ||
          errMsg.toLowerCase().includes('another share request');

        if (!isUserDismissal) {
          console.error('[BioCraft Native Export Error]:', err);
          Alert.alert(
            'Export Notice',
            errMsg || 'Unable to generate biodata document. Please check device permissions.'
          );
        }
      } finally {
        isExportingRef.current = false;
        setIsExporting(false);
        setExportingFormat(null);
      }
      return;
    }

    // Web Platform
    if (format === 'PRINT') {
      if (typeof window !== 'undefined') {
        window.print();
      }
      isExportingRef.current = false;
      setIsExporting(false);
      setExportingFormat(null);
      setDownloadModalVisible(false);
      return;
    }

    try {
      setDownloadModalVisible(false);
      setIsExporting(true);
      setExportingFormat(format);

      const container = exportContainerRef.current as any;
      const targetElement =
        container?.querySelector?.('[style*="1123"]') ||
        container?.firstElementChild?.firstElementChild ||
        container?.firstElementChild ||
        container;

      if (!targetElement) {
        throw new Error('A4 export element not found');
      }

      if (format === 'PDF') {
        await exportToPdf(targetElement, filename);
      } else if (format === 'PNG') {
        await exportToPng(targetElement, filename);
      } else if (format === 'JPEG') {
        await exportToJpeg(targetElement, filename);
      }

      setDownloadModalVisible(false);
    } catch (err: any) {
      console.error('[BioCraft Export Error]:', err);
      Alert.alert(
        'Export Notice',
        err?.message || 'Unable to generate the biodata file directly. Switching to browser Print / Save as PDF.'
      );
      if (typeof window !== 'undefined') {
        window.print();
      }
    } finally {
      isExportingRef.current = false;
      setIsExporting(false);
      setExportingFormat(null);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.rootContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Head>
        <title>{`BioCraft — Customize ${selectedTemplate.name} Marriage Biodata`}</title>
        <meta
          name="description"
          content={`Create your clean, print-ready marriage biodata with the ${selectedTemplate.name} template. Live preview, zero signup, instant PDF/PNG download.`}
        />
      </Head>

      {/* 1. Header (Sticky) - Template & Download buttons placed on top as requested */}
      <EditorHeader
        saveStatus={saveStatus}
        onOpenTemplates={() => setTemplateModalVisible(true)}
        onOpenDownload={() => setDownloadModalVisible(true)}
        selectedTemplateName={selectedTemplate.name}
      />

      {/* 2. Main Content Layout */}
      {isDesktop ? (
        /* ================= DESKTOP TWO-PANEL LAYOUT ================= */
        <View style={styles.desktopLayout}>
          {/* Left Panel: Scrollable Form */}
          <ScrollView
            style={styles.desktopFormPanel}
            contentContainerStyle={styles.desktopFormScroll}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.desktopTopBanner}>
              <Text style={styles.desktopHeading}>
                Customize: {selectedTemplate.name}
              </Text>
              <Text style={styles.desktopSubheading}>
                All changes update the A4 document in real-time. Switching templates preserves your biodata.
              </Text>
            </View>

            <EditorForm
              data={formData}
              enabled={sectionVisibility}
              onUpdateField={handleUpdateField}
              onToggleSection={handleToggleSection}
              onLoadSample={handleLoadSample}
              onClearDraft={handleClearDraft}
            />
          </ScrollView>

          {/* Right Panel: Live A4 Preview & Controls */}
          <View style={styles.desktopPreviewPanel}>
            <PreviewViewer
              model={resolvedModel}
              template={selectedTemplate}
              accent={accent}
              onOpenDownload={() => setDownloadModalVisible(true)}
              onOpenColorPicker={() => setColorModalVisible(true)}
              onOpenTemplates={() => setTemplateModalVisible(true)}
            />
          </View>
        </View>
      ) : (
        /* ================= MOBILE-FIRST DEDICATED LAYOUT ================= */
        <View style={styles.mobileLayout}>
          {/* Tab Content (Form or Live A4 Preview) */}
          <View style={styles.mobileContentArea}>
            {activeTab === 'edit' ? (
              /* EDIT TAB: Scrollable Vertically Stacked Form Sections */
              <ScrollView
                style={styles.mobileFormScroll}
                contentContainerStyle={styles.mobileFormContent}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
              >
                <EditorForm
                  data={formData}
                  enabled={sectionVisibility}
                  onUpdateField={handleUpdateField}
                  onToggleSection={handleToggleSection}
                  onLoadSample={handleLoadSample}
                  onClearDraft={handleClearDraft}
                />
              </ScrollView>
            ) : (
              /* PREVIEW TAB: Scaled Centered A4 Biodata Preview */
              <View style={styles.mobilePreviewContainer}>
                <PreviewViewer
                  model={resolvedModel}
                  template={selectedTemplate}
                  accent={accent}
                  onOpenDownload={() => setDownloadModalVisible(true)}
                  onOpenColorPicker={() => setColorModalVisible(true)}
                  onOpenTemplates={() => setTemplateModalVisible(true)}
                />
              </View>
            )}
          </View>

          {/* Sticky Mobile Bottom Navigation: EDIT | PREVIEW (moved to bottom as requested) */}
          <EditorTabs
            activeTab={activeTab}
            onTabChange={(tab) => setTabOverride(tab)}
          />
        </View>
      )}

      {/* Template Selector Modal */}
      <TemplateSelectorModal
        visible={templateModalVisible}
        activeTemplateId={selectedTemplate.id}
        onSelectTemplate={handleSelectTemplate}
        onClose={() => setTemplateModalVisible(false)}
        selectedAccent={accent}
        onAccentChange={handleAccentChange}
        model={resolvedModel}
      />

      {/* Dedicated Color Theme Modal for Preview */}
      <ColorThemeModal
        visible={colorModalVisible}
        template={selectedTemplate}
        selectedAccent={accent}
        onAccentChange={handleAccentChange}
        onClose={() => setColorModalVisible(false)}
      />

      {/* Download Export Modal */}
      <DownloadModal
        visible={downloadModalVisible}
        candidateName={resolvedModel.name}
        onClose={() => setDownloadModalVisible(false)}
        onDownload={handleDownload}
        isExporting={isExporting}
        exportingFormat={exportingFormat}
      />

      {/* Full-screen BioCraft Loading Overlay during export generation */}
      {isExporting ? (
        <LoadingScreen
          overlay
          message={`Preparing your ${exportingFormat || 'Biodata'}...`}
          subMessage="Rendering vector 300-DPI A4 layout. Please wait a moment."
          timeoutSeconds={30}
          onTimeout={() => {
            setIsExporting(false);
            setExportingFormat(null);
          }}
          onCancel={() => {
            setIsExporting(false);
            setExportingFormat(null);
          }}
        />
      ) : null}

      {/* Dedicated Offscreen 1:1 Unscaled A4 Canvas for 300 DPI Export (Web Only) */}
      {Platform.OS === 'web' ? (
        <View
          ref={exportContainerRef}
          style={styles.offscreenExportCanvas}
          collapsable={false}
          pointerEvents="none"
        >
          <selectedTemplate.component
            model={resolvedModel}
            settings={{
              ...selectedTemplate.defaultSettings,
              accent,
              showPhotoPlaceholder: true,
            }}
            scale={1}
          />
        </View>
      ) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    overflow: 'hidden',
  },

  // Desktop side-by-side layout (>= 1024px)
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
  },
  desktopFormPanel: {
    flex: 1,
    maxWidth: 680,
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  desktopFormScroll: {
    paddingBottom: 40,
  },
  desktopTopBanner: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 8,
  },
  desktopHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
  },
  desktopSubheading: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },
  desktopPreviewPanel: {
    flex: 1.35,
    backgroundColor: '#E8EAEE',
  },

  // Mobile layout (< 1024px)
  mobileLayout: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  mobileContentArea: {
    flex: 1,
    overflow: 'hidden',
  },
  mobileFormScroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mobileFormContent: {
    paddingBottom: 30,
  },
  mobilePreviewContainer: {
    flex: 1,
    backgroundColor: '#E8EAEE',
  },

  // Dedicated offscreen container for high-res unscaled A4 capture
  offscreenExportCanvas: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    left: -9999,
    top: 0,
    width: 794,
    height: 1123,
    opacity: 1,
    zIndex: -999,
    pointerEvents: 'none',
  },
});
