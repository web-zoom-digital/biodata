import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type {
  FormDataModel,
  SectionVisibility,
  GodSymbol,
  CustomFieldItem,
} from '@/types/biodata';
import { ProfilePhotoSection } from './ProfilePhotoSection';
import { GodSymbolSection } from './GodSymbolSection';
import { PersonalDetailsSection } from './PersonalDetailsSection';
import { EducationSection } from './EducationSection';
import { ProfessionSection } from './ProfessionSection';
import { FamilyDetailsSection } from './FamilyDetailsSection';
import { ContactSection } from './ContactSection';
import { AstrologySection } from './AstrologySection';
import { LifestyleSection } from './LifestyleSection';
import { AboutMeSection } from './AboutMeSection';
import { PartnerExpectationsSection } from './PartnerExpectationsSection';
import { CustomFieldsSection } from './CustomFieldsSection';

interface EditorFormProps {
  data: FormDataModel;
  enabled: SectionVisibility;
  onUpdateField: <K extends keyof FormDataModel>(section: K, value: FormDataModel[K]) => void;
  onToggleSection: (sectionKey: keyof SectionVisibility, isEnabled: boolean) => void;
  onLoadSample: () => void;
  onClearDraft: () => void;
}

export const EditorForm: React.FC<EditorFormProps> = ({
  data,
  enabled,
  onUpdateField,
  onToggleSection,
  onLoadSample,
  onClearDraft,
}) => {
  return (
    <View style={styles.formContainer}>
      {/* Privacy and Sample Data Action Bar */}
      <View style={styles.privacyBanner}>
        <View style={styles.privacyBannerTop}>
          <Ionicons name="shield-checkmark" size={18} color="#047857" />
          <Text style={styles.privacyBannerText}>
            Privacy-first: Your biodata is stored locally on your device only.
          </Text>
        </View>

        <View style={styles.actionButtonsRow}>
          <Pressable
            onPress={onLoadSample}
            style={({ pressed }) => [styles.sampleBtn, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
            accessibilityLabel="Fill with sample biodata"
          >
            <Ionicons name="sparkles" size={14} color="#047857" />
            <Text style={styles.sampleBtnText}>Try with sample data</Text>
          </Pressable>

          <Pressable
            onPress={onClearDraft}
            style={({ pressed }) => [styles.clearBtn, pressed && { opacity: 0.8 }]}
            accessibilityRole="button"
            accessibilityLabel="Clear form draft"
          >
            <Ionicons name="trash-outline" size={14} color="#DC2626" />
            <Text style={styles.clearBtnText}>Clear data</Text>
          </Pressable>
        </View>
      </View>

      {/* 1. Profile Photo */}
      <ProfilePhotoSection
        photo={data.profile.photo}
        onPhotoChange={(newPhoto) =>
          onUpdateField('profile', { ...data.profile, photo: newPhoto })
        }
      />

      {/* 2. Sacred Symbol & Blessing */}
      <GodSymbolSection
        selectedSymbol={data.profile.godSymbol}
        blessing={data.profile.blessing}
        onSymbolChange={(sym: GodSymbol | undefined, newBlessing?: string) => {
          const blessingText =
            newBlessing !== undefined
              ? newBlessing
              : (sym ? (sym.text || '') : '');
          onUpdateField('profile', {
            ...data.profile,
            godSymbol: sym,
            blessing: blessingText,
          });
        }}
        onBlessingChange={(txt: string) =>
          onUpdateField('profile', { ...data.profile, blessing: txt })
        }
      />

      {/* 3. Personal Details */}
      <PersonalDetailsSection
        data={data.personal}
        isEnabled={enabled.personal}
        onToggleEnabled={(v) => onToggleSection('personal', v)}
        onChange={(field, val) =>
          onUpdateField('personal', { ...data.personal, [field]: val })
        }
      />

      {/* 4. Family Details */}
      <FamilyDetailsSection
        data={data.family}
        isEnabled={enabled.family}
        onToggleEnabled={(v) => onToggleSection('family', v)}
        onChange={(field, val) =>
          onUpdateField('family', { ...data.family, [field]: val })
        }
      />

      {/* 5. Education */}
      <EducationSection
        data={data.education}
        isEnabled={enabled.education}
        onToggleEnabled={(v) => onToggleSection('education', v)}
        onChange={(field, val) =>
          onUpdateField('education', { ...data.education, [field]: val })
        }
      />

      {/* 6. Professional Details */}
      <ProfessionSection
        data={data.profession}
        isEnabled={enabled.profession}
        onToggleEnabled={(v) => onToggleSection('profession', v)}
        onChange={(field, val) =>
          onUpdateField('profession', { ...data.profession, [field]: val })
        }
      />

      {/* 7. Religion & Astrology */}
      <AstrologySection
        data={data.astrology}
        isEnabled={enabled.astrology}
        onToggleEnabled={(v) => onToggleSection('astrology', v)}
        onChange={(field, val) =>
          onUpdateField('astrology', { ...data.astrology, [field]: val })
        }
      />

      {/* 8. Lifestyle & Interests */}
      <LifestyleSection
        data={data.lifestyle}
        isEnabled={enabled.lifestyle}
        onToggleEnabled={(v) => onToggleSection('lifestyle', v)}
        onChange={(field, val) =>
          onUpdateField('lifestyle', { ...data.lifestyle, [field]: val })
        }
      />

      {/* 9. Contact Details */}
      <ContactSection
        data={data.contact}
        isEnabled={enabled.contact}
        onToggleEnabled={(v) => onToggleSection('contact', v)}
        onChange={(field, val) =>
          onUpdateField('contact', { ...data.contact, [field]: val })
        }
      />

      {/* 10. About Me */}
      <AboutMeSection
        about={data.about}
        isEnabled={enabled.about}
        onToggleEnabled={(v) => onToggleSection('about', v)}
        onChange={(val) => onUpdateField('about', val)}
      />

      {/* 11. Partner Expectations */}
      <PartnerExpectationsSection
        expectations={data.partnerExpectations}
        isEnabled={enabled.expectations}
        onToggleEnabled={(v) => onToggleSection('expectations', v)}
        onChange={(val) => onUpdateField('partnerExpectations', val)}
      />

      {/* 12. Additional Information / Custom Fields */}
      <CustomFieldsSection
        customFields={data.customFields}
        isEnabled={enabled.custom}
        onToggleEnabled={(v) => onToggleSection('custom', v)}
        onChange={(fields: CustomFieldItem[]) =>
          onUpdateField('customFields', fields)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
  },
  privacyBanner: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
  },
  privacyBannerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  privacyBannerText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#166534',
    flex: 1,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sampleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#86EFAC',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    minHeight: 36,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  sampleBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#047857',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECDD3',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    minHeight: 36,
    ...Platform.select({
      web: { cursor: 'pointer' },
    }),
  },
  clearBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#DC2626',
  },
});
