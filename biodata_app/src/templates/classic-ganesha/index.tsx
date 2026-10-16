import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TemplateProps } from '@/types/template';
import type { ResolvedSection } from '@/types/biodata';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import { TemplateGodSymbol } from '../shared/TemplateGodSymbol';
import { TemplateShell } from '../shared/TemplateShell';
import { TemplateTrademark } from '../shared/TemplateTrademark';
import { balanceSections } from '../shared/balanceSections';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { ClassicGaneshaBorders } from './CornerOrnament';
import { classicGaneshaPalette } from './styles';

export const ClassicGanesha: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = classicGaneshaPalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Separate personal details (rendered in top area beside the photo)
  const personalSec =
    model.sections.find((s) => s.key === 'personal') || model.sections[0];

  // Remaining sections placed below the top photo row
  const otherSections = model.sections.filter((s) => s !== personalSec);

  // If there are many sections (>= 4), balance them into 2 columns so they comfortably fit on 1 page
  const useTwoColumns = otherSections.length >= 4;
  const { leftSections, rightSections } = balanceSections(otherSections);

  const renderSection = (sec: ResolvedSection, isTopRow = false) => {
    const validRows = sec.rows.filter(
      (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
    );
    const hasText = Boolean(sec.text && sec.text.trim().length > 0);
    if (validRows.length === 0 && !hasText) return null;

    return (
      <View
        key={sec.key}
        style={[localStyles.sectionBlock, isTopRow && localStyles.topSectionBlock]}
      >
        <Text style={[localStyles.sectionTitle, { color: p.accent }]}>
          {sec.title}
        </Text>

        {validRows.map((r, idx) => (
          <View key={`${r.label}-${idx}`} style={localStyles.fieldRow}>
            <Text style={localStyles.fieldLabel} numberOfLines={1}>
              {r.label}
            </Text>
            <Text style={localStyles.fieldColon}>:</Text>
            <Text style={[localStyles.fieldValue, { color: p.ink }]} numberOfLines={2}>
              {r.value}
            </Text>
          </View>
        ))}

        {hasText ? (
          <View style={[localStyles.textBox, { borderColor: p.lineSoft }]}>
            <Text style={[localStyles.paragraphText, { color: p.inkMuted }]} numberOfLines={4}>
              {sec.text}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.pageSheet}>
        {/* Subtle Decorative Background Artwork */}
        <DecorativeBackground theme="traditional" opacity={0.14} />

        {/* Geometric Stepped Border Frame matching reference image */}
        <ClassicGaneshaBorders color={p.accent} />

        {/* ================= TOP SACRED HEADER ================= */}
        <View style={localStyles.headerContainer}>
          <View style={localStyles.blessingRow}>
            {model.godSymbol && model.godSymbol.id !== 'ganesha' ? (
              <TemplateGodSymbol symbol={model.godSymbol} size={30} color={p.accent} borderColor={p.accent} />
            ) : (
              <Image
                source={require('./assets/ganesha.jpg')}
                style={[localStyles.ganeshaThumb, { borderColor: p.accent }]}
                resizeMode="cover"
              />
            )}

            {/* Invocation Mantra / God Name */}
            <Text style={[localStyles.blessingText, { color: p.accent }]}>
              {model.blessing || '॥ श्री गणेशाय नमः ॥'}
            </Text>

            {model.godSymbol && model.godSymbol.id !== 'ganesha' ? (
              <TemplateGodSymbol symbol={model.godSymbol} size={30} color={p.accent} borderColor={p.accent} />
            ) : (
              <Image
                source={require('./assets/ganesha.jpg')}
                style={[localStyles.ganeshaThumb, { borderColor: p.accent }]}
                resizeMode="cover"
              />
            )}
          </View>
        </View>

        {/* ================= BODY CONTENT ================= */}
        <View style={localStyles.bodyContent}>
          {/* Top Row: Personal Details (Left) + Candidate Photo Frame (Right) */}
          <View style={localStyles.topRowContainer}>
            {/* Left: Personal Details */}
            <View style={localStyles.personalDetailsCol}>
              {personalSec ? renderSection(personalSec, true) : null}
            </View>

            {/* Right: Candidate Photo */}
            {hasPhoto ? (
              <View style={localStyles.photoCol}>
                <View style={[localStyles.photoFrame, { borderColor: p.accent }]}>
                  {model.photo ? (
                    <Image
                      source={{ uri: model.photo }}
                      style={localStyles.photoImage}
                      resizeMode="cover"
                    />
                  ) : (
                    /* Default Illustrated Avatar */
                    <LinearGradient
                      colors={['#E5F5EF', '#CEE9DF']}
                      style={localStyles.avatarCanvas}
                    >
                      <View style={localStyles.avatarTorso} />
                      <View style={localStyles.avatarInnerCollar} />
                      <View style={localStyles.avatarNeck} />
                      <View style={localStyles.avatarHead} />
                      <View style={localStyles.avatarHair} />
                      <View style={localStyles.glassesRow}>
                        <View style={localStyles.glassLens}>
                          <View style={localStyles.avatarEye} />
                        </View>
                        <View style={localStyles.glassesBridge} />
                        <View style={localStyles.glassLens}>
                          <View style={localStyles.avatarEye} />
                        </View>
                      </View>
                      <View style={localStyles.avatarSmile} />
                    </LinearGradient>
                  )}
                </View>
              </View>
            ) : null}
          </View>

          {/* Lower Row: Remaining Sections */}
          {useTwoColumns ? (
            <View style={localStyles.twoColumnsRow}>
              <View style={localStyles.column}>
                {leftSections.map((sec) => renderSection(sec))}
              </View>
              <View style={localStyles.column}>
                {rightSections.map((sec) => renderSection(sec))}
              </View>
            </View>
          ) : (
            <View style={localStyles.singleColumnContainer}>
              {otherSections.map((sec) => renderSection(sec))}
            </View>
          )}
        </View>

        {/* Auspicious Relationship / Values Quote Banner */}
        <View style={localStyles.quoteRow}>
          <View style={[localStyles.quoteLine, { backgroundColor: p.lineSoft }]} />
          <Text style={[localStyles.quoteText, { color: p.accent }]}>
            {model.quote || '“Rooted in culture, growing with values, seeking a life partner for a meaningful journey.”'}
          </Text>
          <View style={[localStyles.quoteLine, { backgroundColor: p.lineSoft }]} />
        </View>

        {/* Trademark Watermark */}
        <View style={localStyles.trademarkWrap}>
          <TemplateTrademark color={p.trademark} />
        </View>
      </View>
    </TemplateShell>
  );
};

const localStyles = StyleSheet.create({
  pageSheet: {
    width: 794,
    height: 1123,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 48,
    paddingTop: 32,
    paddingBottom: 22,
    position: 'relative',
    justifyContent: 'space-between',
  },

  // 1. Top Sacred Header
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    zIndex: 2,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  ganeshaThumb: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
  },
  ganeshaImage: {
    width: 68,
    height: 68,
    marginBottom: 4,
  },
  symbolWrap: {
    marginBottom: 4,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 14.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    textAlign: 'center',
  },

  // 2. Body Content
  bodyContent: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 4,
  },

  // Top Row (Personal Details + Photo Frame)
  topRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  personalDetailsCol: {
    flex: 1,
    paddingRight: 16,
  },
  photoCol: {
    width: 174,
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  photoFrame: {
    width: 168,
    height: 220,
    borderRadius: 4,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },

  // Sections & Rows
  sectionBlock: {
    marginBottom: 10,
  },
  topSectionBlock: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: FONT_BODY,
    fontSize: 13.5,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2.5,
  },
  fieldLabel: {
    width: 160,
    fontFamily: FONT_BODY,
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
  },
  fieldColon: {
    width: 16,
    fontFamily: FONT_BODY,
    fontSize: 11,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  fieldValue: {
    flex: 1,
    fontFamily: FONT_BODY,
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 15,
  },
  textBox: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 3,
    backgroundColor: '#FAFAF9',
  },
  paragraphText: {
    fontFamily: FONT_BODY,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '400',
  },

  // Lower Multi-section Layout
  singleColumnContainer: {
    width: '100%',
  },
  twoColumnsRow: {
    flexDirection: 'row',
    columnGap: 24,
    alignItems: 'flex-start',
    width: '100%',
  },
  column: {
    flex: 1,
    minWidth: 0,
  },

  // Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },

  // Illustrated Avatar Fallback
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
    width: 120,
    height: 70,
    backgroundColor: '#1E3A8A',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 46,
    width: 32,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 60,
    width: 22,
    height: 18,
    backgroundColor: '#F3C5A8',
    borderRadius: 4,
  },
  avatarHead: {
    position: 'absolute',
    top: 42,
    width: 58,
    height: 68,
    borderRadius: 29,
    backgroundColor: '#F7D6BF',
  },
  avatarHair: {
    position: 'absolute',
    top: 36,
    width: 62,
    height: 28,
    backgroundColor: '#1F1A17',
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  glassesRow: {
    position: 'absolute',
    top: 66,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 14,
    height: 11,
    borderRadius: 3.5,
    borderWidth: 1.5,
    borderColor: '#1F1A17',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  glassesBridge: {
    width: 4,
    height: 1.5,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    width: 2.5,
    height: 2.5,
    borderRadius: 1.25,
    backgroundColor: '#1F1A17',
  },
  avatarSmile: {
    position: 'absolute',
    top: 92,
    width: 12,
    height: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#7A3F2B',
    borderRadius: 2,
  },
  quoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 4,
    gap: 12,
  },
  quoteLine: {
    flex: 1,
    height: 1,
  },
  quoteText: {
    fontFamily: FONT_DISPLAY,
    fontSize: 10.5,
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
