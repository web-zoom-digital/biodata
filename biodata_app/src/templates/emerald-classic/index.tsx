import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TemplateProps } from '@/types/template';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import { TemplateGodSymbol } from '../shared/TemplateGodSymbol';
import { TemplateBlessingRow } from '../shared/TemplateBlessingRow';
import { TemplateSection } from '../shared/TemplateSection';
import { TemplateShell } from '../shared/TemplateShell';
import { TemplateTrademark } from '../shared/TemplateTrademark';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { balanceSections } from '../shared/balanceSections';
import { emeraldPalette, emeraldSection } from './styles';

export const EmeraldClassic: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = emeraldPalette(settings.accent);
  const styles = emeraldSection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Wide full-width bottom sections
  const wideSections = model.sections.filter((s) => s.key === 'about' || s.key === 'expectations');
  const nonWideSections = model.sections.filter((s) => s.key !== 'about' && s.key !== 'expectations');

  // Intelligently balance remaining sections across Left and Right columns
  const { leftSections, rightSections } = balanceSections(nonWideSections);

  const aboutSection = wideSections.find((s) => s.key === 'about');
  const expectationsSection = wideSections.find((s) => s.key === 'expectations');

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.sheet}>
        <DecorativeBackground theme="traditional" accent={p.accent} gold="#C5A059" opacity={0.16} />
        {/* ================= 1. EMERALD TOP BANNER ================= */}
        <LinearGradient
          colors={[p.dark, p.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={localStyles.headerBanner}
        >
          {/* Header Left Content */}
          <View style={[localStyles.headerInfo, hasPhoto && localStyles.headerInfoWithPhoto]}>
            {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color="#FFFFFF"
              symbolColor={p.accent}
              borderColor="#FFFFFF"
              backgroundColor="#FFFFFF"
              symbolSize={22}
              center={false}
            />

            {/* Sub-tag */}
            <Text style={localStyles.bioTag}>Marriage Biodata</Text>

            {/* Candidate Full Name */}
            <Text style={localStyles.candidateName} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>

            {/* Candidate Profession Subtitle */}
            {model.subtitle ? (
              <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

          {/* Header Right Photo Portrait */}
          {hasPhoto ? (
            <View style={localStyles.photoContainer}>
              <View style={[localStyles.photoFrame, { borderColor: '#FFFFFF' }]}>
                {model.photo ? (
                  <Image
                    source={{ uri: model.photo }}
                    style={localStyles.photoImage}
                    resizeMode="cover"
                  />
                ) : (
                  /* Candidate Illustrated Portrait matching the reference image */
                  <LinearGradient
                    colors={['#d9efe6', '#a7d4c2']}
                    style={localStyles.avatarCanvas}
                  >
                    {/* Shoulders & Dark Suit */}
                    <View style={localStyles.avatarShoulders} />
                    {/* Neck */}
                    <View style={localStyles.avatarNeck} />
                    {/* Face Head */}
                    <View style={localStyles.avatarHead} />
                    {/* Hair */}
                    <View style={localStyles.avatarHair} />
                    {/* Eyes */}
                    <View style={[localStyles.avatarEye, { left: 45 }]} />
                    <View style={[localStyles.avatarEye, { right: 45 }]} />
                    {/* Smile */}
                    <View style={localStyles.avatarSmile} />
                  </LinearGradient>
                )}
              </View>
            </View>
          ) : null}
        </LinearGradient>

        {/* ================= 2. TWO-COLUMN DETAILS BODY ================= */}
        <View style={localStyles.contentBody}>
          <View style={localStyles.columnsRow}>
            {/* Left Column: Personal, Family, Lifestyle, Custom */}
            <View style={localStyles.column}>
              {leftSections.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </View>

            {/* Right Column: Education, Professional, Astrology, Contact */}
            <View style={localStyles.column}>
              {rightSections.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </View>
          </View>

          {/* ================= 3. WIDE SECTIONS (ABOUT ME & EXPECTATIONS) ================= */}
          {aboutSection || expectationsSection ? (
            <View style={localStyles.wideRow}>
              {aboutSection ? (
                <View style={[localStyles.wideCard, { backgroundColor: p.soft }]}>
                  <Text style={[localStyles.wideCardTitle, { color: p.dark }]}>
                    {aboutSection.title}
                  </Text>
                  <Text style={localStyles.wideCardText}>
                    {aboutSection.text}
                  </Text>
                </View>
              ) : (
                <View style={localStyles.wideCardEmpty} />
              )}

              {expectationsSection ? (
                <View style={[localStyles.wideCard, { backgroundColor: p.soft }]}>
                  <Text style={[localStyles.wideCardTitle, { color: p.dark }]}>
                    {expectationsSection.title}
                  </Text>
                  <Text style={localStyles.wideCardText}>
                    {expectationsSection.text}
                  </Text>
                </View>
              ) : (
                <View style={localStyles.wideCardEmpty} />
              )}
            </View>
          ) : null}

          {/* ================= 4. WATERMARK FOOTER ================= */}
          <View style={localStyles.footerWrap}>
            <TemplateTrademark color={p.muted} />
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
    maxHeight: 1123,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    justifyContent: 'space-between',
  },

  // 1. Top Header Banner
  headerBanner: {
    paddingTop: 24,
    paddingBottom: 22,
    paddingHorizontal: 44,
    position: 'relative',
    minHeight: 144,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  headerInfoWithPhoto: {
    paddingRight: 36,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  godSymbolWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: 2,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  bioTag: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#A7F3D0',
    marginTop: 1,
    marginBottom: 2,
    letterSpacing: 0.3,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 40,
    letterSpacing: -0.4,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.92)',
    marginTop: 4,
    fontWeight: '400',
  },

  // Right Photo
  photoContainer: {
    position: 'absolute',
    right: 44,
    top: 14,
    zIndex: 5,
  },
  photoFrame: {
    width: 104,
    height: 130,
    borderRadius: 12,
    borderWidth: 3.5,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },

  // Candidate Illustrated Portrait
  avatarCanvas: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarShoulders: {
    position: 'absolute',
    bottom: 0,
    width: 110,
    height: 56,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    backgroundColor: '#2C3E50',
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 44,
    width: 24,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#C98F6B',
  },
  avatarHead: {
    position: 'absolute',
    top: 34,
    width: 50,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#C98F6B',
  },
  avatarHair: {
    position: 'absolute',
    top: 28,
    width: 54,
    height: 28,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    position: 'absolute',
    top: 56,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3B2A22',
  },
  avatarSmile: {
    position: 'absolute',
    top: 70,
    width: 16,
    height: 6,
    borderBottomWidth: 1.8,
    borderBottomColor: '#7A3F2B',
    borderRadius: 3,
  },

  // 2. Content Body
  contentBody: {
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 14,
    flex: 1,
  },
  columnsRow: {
    flexDirection: 'row',
    columnGap: 28,
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    minWidth: 0,
  },

  // 3. Wide Cards (About Me & Expectations)
  wideRow: {
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'flex-start',
    marginTop: 6,
  },
  wideCard: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wideCardEmpty: {
    flex: 1,
  },
  wideCardTitle: {
    fontFamily: FONT_DISPLAY,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 3,
  },
  wideCardText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    lineHeight: 14,
    color: '#1E293B',
  },

  // 4. Watermark Footer
  footerWrap: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
