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
import { royalPalette, royalSection } from './styles';

// Ornamental corner flourish component for the 4 corners
const RoyalCorner: React.FC<{
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  color: string;
}> = ({ position, color }) => {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('Left');

  return (
    <View
      style={[
        localStyles.cornerContainer,
        isTop ? { top: 14 } : { bottom: 14 },
        isLeft ? { left: 14 } : { right: 14 },
        {
          transform: [
            { scaleX: isLeft ? 1 : -1 },
            { scaleY: isTop ? 1 : -1 },
          ],
        },
      ]}
    >
      {/* Outer flourish arc */}
      <View style={[localStyles.cornerOuterArc, { borderColor: color }]} />
      {/* Inner flourish arc */}
      <View style={[localStyles.cornerInnerArc, { borderColor: color }]} />
      {/* Diagonal accent line */}
      <View style={[localStyles.cornerDiagLine, { backgroundColor: color }]} />
      {/* Accent corner dot */}
      <View style={[localStyles.cornerDot, { backgroundColor: color }]} />
    </View>
  );
};

export const RoyalHeritage: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = royalPalette(settings.accent);
  const styles = royalSection(settings.accent);
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
        <DecorativeBackground theme="traditional" accent={p.accent} gold={p.gold} opacity={0.15} />
        {/* Outer Gold Border (inset 18px) */}
        <View style={[localStyles.outerBorder, { borderColor: p.gold }]} />

        {/* Inner Gold Border (inset 24px) */}
        <View style={[localStyles.innerBorder, { borderColor: p.goldSoft }]} />

        {/* 4 Corner Ornamental Flourishes */}
        <RoyalCorner position="topLeft" color={p.gold} />
        <RoyalCorner position="topRight" color={p.gold} />
        <RoyalCorner position="bottomLeft" color={p.gold} />
        <RoyalCorner position="bottomRight" color={p.gold} />

        {/* Document Content Canvas */}
        <View style={localStyles.contentCanvas}>
          {/* ================= 1. HEADER ================= */}
          <View style={localStyles.header}>
            {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color={p.gold}
              symbolSize={24}
              center={true}
            />

            {/* Sub-tag */}
            <Text style={[localStyles.bioTag, { color: p.muted }]}>MARRIAGE BIO-DATA</Text>

            {/* Arch Photo Frame (Shown when photo or placeholder enabled) */}
            {hasPhoto ? (
              <View style={localStyles.photoCenterWrap}>
                <View style={[localStyles.photoOuterRing, { borderColor: p.goldSoft }]}>
                  <View style={localStyles.photoInnerRing}>
                    <View style={[localStyles.photoArch, { borderColor: p.gold }]}>
                      {model.photo ? (
                        <Image
                          source={{ uri: model.photo }}
                          style={localStyles.photoImage}
                          resizeMode="cover"
                        />
                      ) : (
                        /* Candidate Illustrated Portrait matching the reference PDF */
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
                          <View style={[localStyles.avatarEye, { left: 40 }]} />
                          <View style={[localStyles.avatarEye, { right: 40 }]} />
                          {/* Smile */}
                          <View style={localStyles.avatarSmile} />
                        </LinearGradient>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            ) : null}

            {/* Candidate Name in Rich Royal Burgundy */}
            <Text style={[localStyles.candidateName, { color: p.deep }]} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>

            {/* Candidate Subtitle / Occupation */}
            {model.subtitle ? (
              <Text style={[localStyles.candidateSubtitle, { color: p.muted }]} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

          {/* ================= 2. TWO-COLUMN DETAILS BODY ================= */}
          <View style={localStyles.columnsBody}>
            {/* Left Column */}
            <View style={localStyles.column}>
              {leftSections.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </View>

            {/* Right Column */}
            <View style={localStyles.column}>
              {rightSections.map((s) => (
                <TemplateSection key={s.key} section={s} styles={styles} />
              ))}
            </View>
          </View>

          {/* ================= 3. WIDE SECTIONS (ABOUT ME & EXPECTATIONS) ================= */}
          {(aboutSection || expectationsSection) ? (
            <View style={localStyles.wideRow}>
              {aboutSection ? (
                <View style={localStyles.wideColumn}>
                  <TemplateSection section={aboutSection} styles={styles} />
                </View>
              ) : (
                <View style={localStyles.wideColumn} />
              )}

              {expectationsSection ? (
                <View style={localStyles.wideColumn}>
                  <TemplateSection section={expectationsSection} styles={styles} />
                </View>
              ) : (
                <View style={localStyles.wideColumn} />
              )}
            </View>
          ) : null}

          {/* ================= 4. WATERMARK FOOTER ================= */}
          <View style={localStyles.watermarkWrap}>
            <TemplateTrademark color={p.gold} />
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
    position: 'relative',
    backgroundColor: '#FBF6EA',
    justifyContent: 'space-between',
  },
  outerBorder: {
    position: 'absolute',
    top: 18,
    left: 18,
    right: 18,
    bottom: 18,
    borderWidth: 1.5,
    pointerEvents: 'none',
  },
  innerBorder: {
    position: 'absolute',
    top: 24,
    left: 24,
    right: 24,
    bottom: 24,
    borderWidth: 0.75,
    pointerEvents: 'none',
  },

  // Corner ornaments
  cornerContainer: {
    position: 'absolute',
    width: 54,
    height: 54,
    pointerEvents: 'none',
  },
  cornerOuterArc: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 44,
    height: 44,
    borderTopLeftRadius: 18,
    borderTopWidth: 1.4,
    borderLeftWidth: 1.4,
  },
  cornerInnerArc: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 32,
    height: 32,
    borderTopLeftRadius: 12,
    borderTopWidth: 0.8,
    borderLeftWidth: 0.8,
    opacity: 0.55,
  },
  cornerDiagLine: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 14,
    height: 1.2,
    transform: [{ rotate: '45deg' }, { translateX: 5 }],
  },
  cornerDot: {
    position: 'absolute',
    top: 13,
    left: 13,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },

  // Content Canvas inside the borders
  contentCanvas: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 48,
    position: 'relative',
    flex: 1,
    justifyContent: 'space-between',
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 6,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 3,
  },
  symbolBadge: {
    borderRadius: 999,
  },
  blessingText: {
    fontFamily: FONT_DISPLAY,
    fontStyle: 'italic',
    fontSize: 13,
    fontWeight: '600',
  },
  bioTag: {
    fontFamily: FONT_DISPLAY,
    fontSize: 11.5,
    letterSpacing: 2.4,
    marginVertical: 2,
  },

  // Photo
  photoCenterWrap: {
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoOuterRing: {
    borderWidth: 1.5,
    borderRadius: 50,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 2.5,
    backgroundColor: '#FBF6EA',
  },
  photoInnerRing: {
    borderRadius: 46,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FBF6EA',
  },
  photoArch: {
    width: 84,
    height: 106,
    borderRadius: 42,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 2.5,
    overflow: 'hidden',
    backgroundColor: '#F8F4F4',
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },

  // Candidate Illustrated Avatar
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
    width: 86,
    height: 42,
    borderTopLeftRadius: 43,
    borderTopRightRadius: 43,
    backgroundColor: '#2C3E50',
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 32,
    width: 18,
    height: 24,
    borderRadius: 5,
    backgroundColor: '#C98F6B',
  },
  avatarHead: {
    position: 'absolute',
    top: 24,
    width: 38,
    height: 44,
    borderRadius: 19,
    backgroundColor: '#C98F6B',
  },
  avatarHair: {
    position: 'absolute',
    top: 20,
    width: 42,
    height: 20,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    position: 'absolute',
    top: 40,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#3B2A22',
  },
  avatarSmile: {
    position: 'absolute',
    top: 50,
    width: 12,
    height: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#7A3F2B',
    borderRadius: 2,
  },

  // Candidate Name & Subtitle
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 26,
    fontWeight: '600',
    lineHeight: 30,
    textAlign: 'center',
    marginTop: 2,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 2,
  },

  // Two Column Layout
  columnsBody: {
    flexDirection: 'row',
    columnGap: 28,
    alignItems: 'flex-start',
    marginTop: 6,
  },
  column: {
    flex: 1,
    minWidth: 0,
  },

  // Wide Sections (About Me & Expectations)
  wideRow: {
    flexDirection: 'row',
    columnGap: 28,
    alignItems: 'flex-start',
    marginTop: 4,
  },
  wideColumn: {
    flex: 1,
    minWidth: 0,
  },

  // Watermark
  watermarkWrap: {
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
