import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { TemplateProps } from '@/types/template';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import { TemplateGodSymbol } from '../shared/TemplateGodSymbol';
import { TemplateBlessingRow } from '../shared/TemplateBlessingRow';
import { TemplateShell } from '../shared/TemplateShell';
import { TemplateTrademark } from '../shared/TemplateTrademark';
import { balanceSections } from '../shared/balanceSections';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { bluePalette } from './styles';

import { tint, shade } from '@/lib/color';

// Delicate watercolor corner floral flourish matching reference PDF
const BlueFloralCorner: React.FC<{
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  accent: string;
}> = ({ position, accent }) => {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('Left');

  const lightPetal = tint(accent, 0.65);
  const midPetal = tint(accent, 0.35);
  const deepPetal = accent;
  const dotColor = tint(accent, 0.45);
  const arcOuter = tint(accent, 0.65);
  const arcInner = tint(accent, 0.8);

  return (
    <View
      style={[
        localStyles.cornerContainer,
        isTop ? { top: -2 } : { bottom: -2 },
        isLeft ? { left: -2 } : { right: -2 },
        {
          transform: [
            { scaleX: isLeft ? 1 : -1 },
            { scaleY: isTop ? 1 : -1 },
          ],
        },
      ]}
      pointerEvents="none"
    >
      {/* Outer corner stems */}
      <View style={[localStyles.cornerArcOuter, { borderColor: arcOuter }]} />
      <View style={[localStyles.cornerArcInner, { borderColor: arcInner }]} />

      {/* Watercolor petals */}
      <View style={[localStyles.cornerPetal, { top: 6, left: 16, width: 22, height: 22, backgroundColor: lightPetal, opacity: 0.55 }]} />
      <View style={[localStyles.cornerPetal, { top: 16, left: 6, width: 22, height: 22, backgroundColor: lightPetal, opacity: 0.55 }]} />
      <View style={[localStyles.cornerPetal, { top: 12, left: 12, width: 16, height: 16, backgroundColor: midPetal, opacity: 0.7 }]} />
      <View style={[localStyles.cornerPetal, { top: 26, left: 26, width: 12, height: 12, backgroundColor: deepPetal, opacity: 0.8 }]} />

      {/* Beads & accent dots */}
      <View style={[localStyles.cornerDot, { top: 8, left: 44, backgroundColor: dotColor }]} />
      <View style={[localStyles.cornerDot, { top: 44, left: 8, backgroundColor: dotColor }]} />
      <View style={[localStyles.cornerDot, { top: 38, left: 38, backgroundColor: deepPetal }]} />
      <View style={[localStyles.cornerDot, { top: 54, left: 24, backgroundColor: lightPetal }]} />
      <View style={[localStyles.cornerDot, { top: 24, left: 54, backgroundColor: lightPetal }]} />
    </View>
  );
};

export const BlueFloral: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = bluePalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // 1-Page distribution matching reference:
  // Column 1 (Left): Personal Details, Family Details, Lifestyle & Interests, Additional Information
  // Wide Row below: About Me & Partner Expectations
  const wideSections = model.sections.filter(
    (s) =>
      (s.key === 'about' || s.key === 'expectations') &&
      ((s.text && s.text.trim().length > 0) || (s.rows && s.rows.length > 0))
  );

  const nonWideSections = model.sections.filter(
    (s) => s.key !== 'about' && s.key !== 'expectations'
  );

  // Intelligently balance sections across Column 1 and Column 2 to fit on 1 page
  const { leftSections: col1Sections, rightSections: col2Sections } = balanceSections(nonWideSections);

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.pageSheet}>
        {/* Subtle Decorative Background Artwork */}
        <DecorativeBackground theme="floral" opacity={0.15} />

        {/* Four Blue Floral Corner Flourishes */}
        <BlueFloralCorner position="topLeft" accent={p.accent} />
        <BlueFloralCorner position="topRight" accent={p.accent} />
        <BlueFloralCorner position="bottomLeft" accent={p.accent} />
        <BlueFloralCorner position="bottomRight" accent={p.accent} />

        {/* Top Header */}
        <View style={localStyles.header}>
          {/* Header Left Info */}
          <View style={localStyles.headerLeft}>
            {/* Multilingual / English Sub-tag */}
            <Text style={[localStyles.bioTag, { color: p.accent }]}>
              পরিচয় পত্র / MARRIAGE BIODATA
            </Text>

            {/* Candidate Full Name in Rich Royal Navy Serif */}
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

          {/* Header Right Blessing & God Symbol (God Symbol - God Name - God Symbol) */}
          <View style={localStyles.headerRight}>
            <TemplateBlessingRow
              model={model}
              color={p.deep}
              symbolColor={p.accent}
              borderColor={p.accent}
              symbolSize={22}
              center={false}
              defaultBlessing="॥ श्री गणेशाय नमः ॥"
            />
          </View>
        </View>

        {/* Thin Horizontal Blue Divider Line */}
        <View style={[localStyles.headerDivider, { borderBottomColor: p.line }]} />

        {/* 3-Column Body (Left Details, Center Details, Right Photo) */}
        <View style={localStyles.bodyGrid}>
          {/* Column 1 (Left): Personal, Family, Lifestyle, Additional */}
          <View style={localStyles.col1}>
            {col1Sections.map((sec) => {
              const validRows = sec.rows.filter(
                (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
              );
              if (validRows.length === 0) return null;

              return (
                <View key={sec.key} style={localStyles.sectionBlock}>
                  <Text style={[localStyles.col1TitleText, { color: p.accent }]}>
                    {sec.title}
                  </Text>
                  {validRows.map((r, idx) => (
                    <View key={`${r.label}-${idx}`} style={localStyles.rowWrap}>
                      <Text style={localStyles.rowLabel} numberOfLines={1}>
                        {r.label}
                      </Text>
                      <Text style={localStyles.rowColon}>:</Text>
                      <Text style={[localStyles.rowValue, { color: p.ink }]} numberOfLines={2}>
                        {r.value}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>

          {/* Column 2 (Center): Education, Profession, Astrology, Contact */}
          <View style={localStyles.col2}>
            {col2Sections.map((sec) => {
              const validRows = sec.rows.filter(
                (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
              );
              if (validRows.length === 0) return null;

              return (
                <View key={sec.key} style={localStyles.sectionBlock}>
                  <View style={[localStyles.underlinedTitleWrap, { borderBottomColor: p.line }]}>
                    <Text style={[localStyles.col2TitleText, { color: p.accent }]}>
                      {sec.title}
                    </Text>
                  </View>
                  {validRows.map((r, idx) => (
                    <View key={`${r.label}-${idx}`} style={localStyles.rowWrap}>
                      <Text style={localStyles.rowLabel} numberOfLines={1}>
                        {r.label}
                      </Text>
                      <Text style={localStyles.rowColon}>:</Text>
                      <Text style={[localStyles.rowValue, { color: p.ink }]} numberOfLines={2}>
                        {r.value}
                      </Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </View>

          {/* Column 3 (Right): Candidate Photo Frame */}
          <View style={localStyles.col3}>
            {hasPhoto ? (
              <View style={[localStyles.photoFrame, { borderColor: p.accent }]}>
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
                    {/* Torso & Teal Shirt */}
                    <View style={localStyles.avatarTorso} />
                    {/* Red Collar */}
                    <View style={localStyles.avatarInnerCollar} />
                    {/* Neck */}
                    <View style={localStyles.avatarNeck} />
                    {/* Head */}
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
            ) : null}
          </View>
        </View>

        {/* Wide Sections Row: About Me & Partner Expectations */}
        {wideSections.length > 0 ? (
          <View style={localStyles.wideRow}>
            {wideSections.map((sec) => (
              <View key={sec.key} style={[localStyles.wideCard, { backgroundColor: p.soft }]}>
                <Text style={[localStyles.wideCardTitle, { color: p.accent }]}>
                  {sec.title}
                </Text>
                <Text style={localStyles.wideCardText}>
                  {sec.text}
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {/* Trademark Centered */}
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
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },

  // 1. Floral Corner Ornaments
  cornerContainer: {
    position: 'absolute',
    width: 120,
    height: 120,
    pointerEvents: 'none',
    zIndex: 1,
  },
  cornerArcOuter: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: 76,
    height: 76,
    borderTopLeftRadius: 55,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderColor: '#93C5FD',
    opacity: 0.65,
  },
  cornerArcInner: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 50,
    height: 50,
    borderTopLeftRadius: 36,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#BFDBFE',
    opacity: 0.45,
  },
  cornerPetal: {
    position: 'absolute',
    borderRadius: 999,
  },
  cornerDot: {
    position: 'absolute',
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
    opacity: 0.8,
  },

  // 2. Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 2,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  bioTag: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    color: '#64748B',
  },
  headerRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 4,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    fontWeight: '600',
  },
  headerDivider: {
    borderBottomWidth: 1.5,
    marginTop: 8,
    marginBottom: 10,
  },

  // 3. Body 3-Column Grid
  bodyGrid: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'flex-start',
    flex: 1,
  },
  col1: {
    width: 280,
  },
  col2: {
    width: 280,
  },
  col3: {
    width: 124,
    alignItems: 'center',
  },

  // Section Blocks
  sectionBlock: {
    marginBottom: 8,
  },
  col1TitleText: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  underlinedTitleWrap: {
    borderBottomWidth: 1.5,
    paddingBottom: 2,
    marginBottom: 4,
  },
  col2TitleText: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: '700',
  },

  // Key-Value Rows
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  rowLabel: {
    width: 96,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#475569',
    fontWeight: '400',
  },
  rowColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
  },
  rowValue: {
    flex: 1,
    fontFamily: FONT_BODY,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 13.5,
  },

  // Candidate Photo Frame
  photoFrame: {
    width: 118,
    height: 142,
    borderRadius: 14,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#D9EFE6',
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
  avatarTorso: {
    position: 'absolute',
    bottom: 0,
    width: 90,
    height: 40,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    backgroundColor: '#2C5E63',
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 28,
    width: 18,
    height: 15,
    backgroundColor: '#BA4C48',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 36,
    width: 16,
    height: 18,
    backgroundColor: '#CA916D',
    borderRadius: 4,
  },
  avatarHead: {
    position: 'absolute',
    top: 26,
    width: 44,
    height: 52,
    borderRadius: 22,
    backgroundColor: '#CA916D',
  },
  avatarHair: {
    position: 'absolute',
    top: 22,
    width: 48,
    height: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#1F1A17',
  },
  glassesRow: {
    position: 'absolute',
    top: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 14,
    height: 11,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#1F1A17',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassesBridge: {
    width: 4,
    height: 1.5,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#1F1A17',
  },
  avatarSmile: {
    position: 'absolute',
    top: 58,
    width: 12,
    height: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#7A3F2B',
    borderRadius: 2,
  },

  // 4. Wide Cards Row (About Me & Partner Expectations)
  wideRow: {
    flexDirection: 'row',
    columnGap: 14,
    alignItems: 'stretch',
    marginTop: 6,
    marginBottom: 4,
  },
  wideCard: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  wideCardTitle: {
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    fontWeight: '700',
    marginBottom: 3,
  },
  wideCardText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    lineHeight: 14,
    color: '#334151',
  },
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
