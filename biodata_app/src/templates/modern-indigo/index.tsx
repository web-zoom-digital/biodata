import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TemplateProps } from '@/types/template';
import type { ResolvedSection } from '@/types/biodata';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import { TemplateGodSymbol } from '../shared/TemplateGodSymbol';
import { TemplateBlessingRow } from '../shared/TemplateBlessingRow';
import { TemplateShell } from '../shared/TemplateShell';
import { TemplateTrademark } from '../shared/TemplateTrademark';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { indigoPalette } from './styles';

const MAIN_ORDER = ['education', 'profession', 'family', 'lifestyle', 'about', 'expectations', 'custom'];

export const ModernIndigo: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = indigoPalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Balance sections dynamically between Left Sidebar and Right Main Column
  const countRows = (sec?: ResolvedSection) => {
    if (!sec) return 0;
    const vRows = sec.rows.filter(
      (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
    ).length;
    return vRows + (sec.text && sec.text.trim().length > 0 ? 3 : 0);
  };

  const sideSections: ResolvedSection[] = [];
  const mainSections: ResolvedSection[] = [];

  const personalSec = model.sections.find((s) => s.key === 'personal');
  const contactSec = model.sections.find((s) => s.key === 'contact');
  const astroSec = model.sections.find((s) => s.key === 'astrology');
  const lifestyleSec = model.sections.find((s) => s.key === 'lifestyle');

  if (personalSec) sideSections.push(personalSec);
  if (contactSec) sideSections.push(contactSec);

  // If astrology is present, put in sidebar; otherwise if lifestyle is present, put in sidebar
  if (astroSec && countRows(astroSec) > 0) {
    sideSections.push(astroSec);
  } else if (lifestyleSec && countRows(lifestyleSec) > 0) {
    sideSections.push(lifestyleSec);
  }

  const addedToSide = new Set(sideSections.map((s) => s.key));
  MAIN_ORDER.forEach((key) => {
    if (!addedToSide.has(key)) {
      const found = model.sections.find((s) => s.key === key);
      if (found) mainSections.push(found);
    }
  });

  model.sections.forEach((s) => {
    if (!addedToSide.has(s.key) && !mainSections.some((m) => m.key === s.key)) {
      mainSections.push(s);
    }
  });

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.sheet}>
        {/* ================= LEFT INDIGO SIDEBAR ================= */}
        <View style={[localStyles.sidebar, { backgroundColor: p.accent }]}>
          {/* Top Photo Frame / Illustrated Avatar */}
          {hasPhoto ? (
            <View style={localStyles.photoBox}>
              <View style={localStyles.photoFrame}>
                {model.photo ? (
                  <Image
                    source={{ uri: model.photo }}
                    style={localStyles.photoImage}
                    resizeMode="cover"
                  />
                ) : (
                  /* Candidate Illustrated Portrait with glasses matching the reference PDF */
                  <LinearGradient
                    colors={['#E5F5EF', '#CEE9DF']}
                    style={localStyles.avatarCanvas}
                  >
                    {/* Torso & Teal Shirt/Coat */}
                    <View style={localStyles.avatarTorso} />
                    {/* Red inner collar */}
                    <View style={localStyles.avatarInnerCollar} />
                    {/* Neck */}
                    <View style={localStyles.avatarNeck} />
                    {/* Face Head */}
                    <View style={localStyles.avatarHead} />
                    {/* Hair */}
                    <View style={localStyles.avatarHair} />
                    {/* Spectacles / Eyeglasses */}
                    <View style={localStyles.glassesRow}>
                      <View style={localStyles.glassLens}>
                        <View style={localStyles.avatarEye} />
                      </View>
                      <View style={localStyles.glassesBridge} />
                      <View style={localStyles.glassLens}>
                        <View style={localStyles.avatarEye} />
                      </View>
                    </View>
                    {/* Smile */}
                    <View style={localStyles.avatarSmile} />
                  </LinearGradient>
                )}
              </View>
            </View>
          ) : null}

          {/* Sidebar Sections */}
          {sideSections.map((section) => {
            const validRows = section.rows.filter(
              (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
            );
            if (validRows.length === 0 && !section.text) return null;

            return (
              <View key={section.key} style={localStyles.sidebarSection}>
                <Text style={localStyles.sidebarSectionTitle}>{section.title}</Text>
                {validRows.map((r, idx) => (
                  <View key={`${r.label}-${idx}`} style={localStyles.sidebarRow}>
                    <Text style={localStyles.sidebarLabel} numberOfLines={1}>
                      {r.label}
                    </Text>
                    <Text style={localStyles.sidebarValue} numberOfLines={2}>
                      {r.value}
                    </Text>
                  </View>
                ))}
                {section.text ? (
                  <Text style={localStyles.sidebarText} numberOfLines={4}>
                    {section.text}
                  </Text>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* ================= RIGHT MAIN CONTENT ================= */}
        <View style={localStyles.mainContent}>
          <DecorativeBackground theme="modern" accent={p.accent} gold="#A0AEC0" opacity={0.14} />
          {/* Header Area */}
          <View style={localStyles.header}>
            {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color={p.deep}
              symbolColor={p.accent}
              borderColor={p.accent}
              symbolSize={22}
              center={false}
            />

            {/* Sub-tag */}
            <Text style={[localStyles.bioTag, { color: p.accent }]}>Marriage Biodata</Text>

            {/* Candidate Name in Bold Serif Display */}
            <Text style={[localStyles.candidateName, { color: p.deep }]} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>

            {/* Candidate Subtitle / Role */}
            {model.subtitle ? (
              <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

          {/* Main Sections */}
          <View style={localStyles.sectionsWrap}>
            {mainSections.map((section) => {
              const validRows = section.rows.filter(
                (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
              );
              const hasText = Boolean(section.text && section.text.trim().length > 0);
              if (validRows.length === 0 && !hasText) return null;

              return (
                <View key={section.key} style={localStyles.mainSection}>
                  {/* Section Title with Indigo Indicator Bar */}
                  <View style={localStyles.sectionHeaderRow}>
                    <View style={[localStyles.sectionIndicatorBar, { backgroundColor: p.accent }]} />
                    <Text style={[localStyles.sectionTitleText, { color: p.deep }]}>
                      {section.title}
                    </Text>
                  </View>

                  {/* Two-column Key-Value Rows */}
                  {validRows.map((r, idx) => (
                    <View key={`${r.label}-${idx}`} style={localStyles.mainRow}>
                      <Text style={localStyles.mainRowLabel} numberOfLines={1}>
                        {r.label}
                      </Text>
                      <Text style={localStyles.fieldColon}>:</Text>
                      <Text style={[localStyles.mainRowValue, { color: p.ink }]} numberOfLines={2}>
                        {r.value}
                      </Text>
                    </View>
                  ))}

                  {/* Paragraph Text (About Me, Partner Expectations) */}
                  {hasText ? (
                    <Text style={[localStyles.mainSectionText, { color: p.bodyText }]} numberOfLines={4}>
                      {section.text}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>

          {/* Footer Trademark Watermark */}
          <View style={localStyles.trademarkWrap}>
            <TemplateTrademark color={p.trademark} />
          </View>
        </View>
      </View>
    </TemplateShell>
  );
};

const localStyles = StyleSheet.create({
  sheet: {
    width: 794,
    height: 1123,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },

  // 1. Sidebar Layout
  sidebar: {
    width: 254,
    paddingTop: 22,
    paddingBottom: 18,
    paddingHorizontal: 20,
  },
  photoBox: {
    alignItems: 'center',
    marginBottom: 10,
  },
  photoFrame: {
    width: 154,
    height: 165,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#D9EFE6',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.45)',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },

  // Illustrated Avatar
  avatarCanvas: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTorso: {
    position: 'absolute',
    bottom: 0,
    width: 136,
    height: 56,
    borderTopLeftRadius: 68,
    borderTopRightRadius: 68,
    backgroundColor: '#2C5E63',
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 42,
    width: 26,
    height: 22,
    backgroundColor: '#BA4C48',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 52,
    width: 22,
    height: 26,
    backgroundColor: '#CA916D',
    borderRadius: 5,
  },
  avatarHead: {
    position: 'absolute',
    top: 40,
    width: 62,
    height: 72,
    borderRadius: 31,
    backgroundColor: '#CA916D',
  },
  avatarHair: {
    position: 'absolute',
    top: 34,
    width: 66,
    height: 28,
    borderTopLeftRadius: 33,
    borderTopRightRadius: 33,
    backgroundColor: '#1F1A17',
  },
  glassesRow: {
    position: 'absolute',
    top: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 20,
    height: 16,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#1F1A17',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassesBridge: {
    width: 6,
    height: 2,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1F1A17',
  },
  avatarSmile: {
    position: 'absolute',
    top: 88,
    width: 16,
    height: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#7A3F2B',
    borderRadius: 3,
  },

  // Sidebar Section Items
  sidebarSection: {
    marginBottom: 8,
  },
  sidebarSectionTitle: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  sidebarRow: {
    marginBottom: 2.5,
  },
  sidebarLabel: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.72)',
    marginBottom: 1,
  },
  sidebarValue: {
    fontFamily: FONT_BODY,
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 14,
  },
  sidebarText: {
    fontFamily: FONT_BODY,
    fontSize: 10,
    color: '#FFFFFF',
    lineHeight: 14,
  },

  // 2. Right Main Content
  mainContent: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 14,
    paddingLeft: 28,
    paddingRight: 32,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 8,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    fontWeight: '500',
    color: '#4B5563',
  },
  bioTag: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    color: '#4B5563',
    fontWeight: '400',
  },

  // Sections
  sectionsWrap: {
    flex: 1,
  },
  mainSection: {
    marginBottom: 7,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionIndicatorBar: {
    width: 3.5,
    height: 15,
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitleText: {
    fontFamily: FONT_BODY,
    fontSize: 14,
    fontWeight: '700',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  mainRowLabel: {
    width: 140,
    fontFamily: FONT_BODY,
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '400',
  },
  fieldColon: {
    width: 12,
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    textAlign: 'center',
  },
  mainRowValue: {
    flex: 1,
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    fontWeight: '600',
    lineHeight: 14,
  },
  mainSectionText: {
    fontFamily: FONT_BODY,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400',
  },

  // Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 2,
  },
});
