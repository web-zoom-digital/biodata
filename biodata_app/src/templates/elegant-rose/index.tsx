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
import { balanceSections } from '../shared/balanceSections';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { rosePalette } from './styles';

import { tint, shade } from '@/lib/color';

// Delicate watercolor floral corner flourish component matching the reference PDF
const RoseVine: React.FC<{ position: 'topLeft' | 'bottomRight'; accent: string }> = ({
  position,
  accent,
}) => {
  const isTopLeft = position === 'topLeft';

  const blossomLight = tint(accent, 0.65);
  const blossomMid = tint(accent, 0.35);
  const blossomDeep = accent;
  const budColor = shade(accent, 0.15);
  const stemBorder = tint(accent, 0.45);

  return (
    <View
      style={[
        localStyles.vineContainer,
        isTopLeft ? { top: -4, left: -4 } : { bottom: -4, right: -4 },
        {
          transform: [
            { scaleX: isTopLeft ? 1 : -1 },
            { scaleY: isTopLeft ? 1 : -1 },
          ],
        },
      ]}
      pointerEvents="none"
    >
      {/* Primary curved stems */}
      <View style={[localStyles.stemCurve1, { borderColor: stemBorder }]} />
      <View style={[localStyles.stemCurve2, { borderColor: stemBorder }]} />
      <View style={[localStyles.stemCurve3, { borderColor: stemBorder }]} />

      {/* Blossom petals & watercolor clusters */}
      <View style={[localStyles.blossom, { top: 8, left: 44, width: 22, height: 22, backgroundColor: blossomLight, opacity: 0.5 }]} />
      <View style={[localStyles.blossom, { top: 18, left: 56, width: 17, height: 17, backgroundColor: blossomMid, opacity: 0.7 }]} />
      <View style={[localStyles.blossom, { top: 40, left: 98, width: 24, height: 24, backgroundColor: blossomLight, opacity: 0.55 }]} />
      <View style={[localStyles.blossom, { top: 52, left: 112, width: 16, height: 16, backgroundColor: blossomDeep, opacity: 0.65 }]} />
      <View style={[localStyles.blossom, { top: 82, left: 142, width: 26, height: 26, backgroundColor: blossomLight, opacity: 0.5 }]} />
      <View style={[localStyles.blossom, { top: 96, left: 156, width: 18, height: 18, backgroundColor: blossomMid, opacity: 0.75 }]} />
      <View style={[localStyles.blossom, { top: 136, left: 176, width: 20, height: 20, backgroundColor: blossomLight, opacity: 0.6 }]} />
      <View style={[localStyles.blossom, { top: 168, left: 196, width: 14, height: 14, backgroundColor: blossomDeep, opacity: 0.7 }]} />

      {/* Rose buds & nodes along stem */}
      <View style={[localStyles.budDot, { top: 28, left: 82, backgroundColor: budColor }]} />
      <View style={[localStyles.budDot, { top: 70, left: 132, backgroundColor: blossomMid }]} />
      <View style={[localStyles.budDot, { top: 122, left: 168, backgroundColor: budColor }]} />
      <View style={[localStyles.budDot, { top: 154, left: 188, backgroundColor: blossomLight }]} />

      {/* Sage/rose leaf accents */}
      <View style={[localStyles.leafAccent, { top: 16, left: 68 }]} />
      <View style={[localStyles.leafAccent, { top: 58, left: 126 }]} />
      <View style={[localStyles.leafAccent, { top: 108, left: 168 }]} />
    </View>
  );
};

export const ElegantRose: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = rosePalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Intelligently balance sections across both columns to fit 100% on a single A4 page
  const { leftSections, rightSections } = balanceSections(model.sections);

  // Render individual card helper
  const renderCard = (section: ResolvedSection) => {
    const validRows = section.rows.filter(
      (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
    );
    const hasText = Boolean(section.text && section.text.trim().length > 0);
    if (validRows.length === 0 && !hasText) return null;

    return (
      <View key={section.key} style={[localStyles.card, { borderColor: p.border }]}>
        {/* Card Header with Rose Petal Icon */}
        <View style={localStyles.cardHeaderRow}>
          <View style={[localStyles.cardPetalIcon, { backgroundColor: p.accent }]} />
          <Text style={[localStyles.cardTitleText, { color: p.deep }]}>
            {section.title}
          </Text>
        </View>

        {/* Rows */}
        {validRows.map((r, idx) => (
          <View key={`${r.label}-${idx}`} style={localStyles.cardRow}>
            <Text style={localStyles.cardLabel} numberOfLines={1}>
              {r.label}
            </Text>
            <Text style={localStyles.cardColon}>:</Text>
            <Text style={[localStyles.cardValue, { color: p.ink }]} numberOfLines={2}>
              {r.value}
            </Text>
          </View>
        ))}

        {/* Paragraph Text */}
        {hasText ? (
          <Text style={[localStyles.cardText, { color: p.bodyText }]} numberOfLines={5}>
            {section.text}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.pageSheet}>
        {/* Subtle Decorative Background Artwork */}
        <DecorativeBackground theme="floral" opacity={0.16} />

        {/* Top-Left Rose Vine Flourish */}
        <RoseVine position="topLeft" accent={p.accent} />

        {/* Center Header */}
        <View style={localStyles.header}>
          {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
          <TemplateBlessingRow
            model={model}
            color={p.deep}
            symbolColor={p.accent}
            borderColor={p.accent}
            symbolSize={22}
            center={true}
          />

          {/* Circular Photo Frame / Illustrated Avatar */}
          {hasPhoto ? (
            <View style={localStyles.photoCenterWrap}>
              <View style={[localStyles.photoCircle, { borderColor: p.tealRing }]}>
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
                    {/* Red collar */}
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
            </View>
          ) : null}

          {/* Candidate Name in Rich Rose Serif Italic */}
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

        {/* 2-Column Cards Body (5 sections Left, 5 sections Right) */}
        <View style={localStyles.columnsRow}>
          {/* Left Column: Personal, Family, Lifestyle, Additional, About Me */}
          <View style={localStyles.column}>
            {leftSections.map(renderCard)}
          </View>

          {/* Right Column: Education, Profession, Astrology, Contact, Partner Expectations */}
          <View style={localStyles.column}>
            {rightSections.map(renderCard)}
          </View>
        </View>

        {/* Watermark Centered */}
        <View style={localStyles.watermarkWrap}>
          <TemplateTrademark color={p.trademark} />
        </View>

        {/* Bottom-Right Rose Vine Flourish */}
        <RoseVine position="bottomRight" accent={p.accent} />
      </View>
    </TemplateShell>
  );
};

const localStyles = StyleSheet.create({
  pageSheet: {
    width: 794,
    height: 1123,
    backgroundColor: '#FAF7F5',
    paddingHorizontal: 38,
    paddingTop: 28,
    paddingBottom: 14,
    position: 'relative',
    justifyContent: 'space-between',
  },

  // 1. Rose Vine Flourish Elements
  vineContainer: {
    position: 'absolute',
    width: 200,
    height: 200,
    pointerEvents: 'none',
    zIndex: 1,
  },
  stemCurve1: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 140,
    height: 140,
    borderTopLeftRadius: 110,
    borderTopWidth: 1.8,
    borderLeftWidth: 1.8,
    borderColor: '#9E7B84',
    opacity: 0.55,
  },
  stemCurve2: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 115,
    height: 115,
    borderTopLeftRadius: 85,
    borderTopWidth: 1.2,
    borderLeftWidth: 1.2,
    borderColor: '#B89CA3',
    opacity: 0.45,
  },
  stemCurve3: {
    position: 'absolute',
    top: 44,
    left: 44,
    width: 80,
    height: 80,
    borderTopLeftRadius: 55,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#C4A8AF',
    opacity: 0.35,
  },
  blossom: {
    position: 'absolute',
    borderRadius: 999,
  },
  budDot: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.8,
  },
  leafAccent: {
    position: 'absolute',
    width: 9,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#9E8890',
    opacity: 0.45,
    transform: [{ rotate: '35deg' }],
  },

  // 2. Header
  header: {
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#7A626A',
  },
  photoCenterWrap: {
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
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
    width: 78,
    height: 34,
    borderTopLeftRadius: 39,
    borderTopRightRadius: 39,
    backgroundColor: '#2C5E63',
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 24,
    width: 14,
    height: 12,
    backgroundColor: '#BA4C48',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 30,
    width: 14,
    height: 16,
    backgroundColor: '#CA916D',
    borderRadius: 3.5,
  },
  avatarHead: {
    position: 'absolute',
    top: 20,
    width: 38,
    height: 44,
    borderRadius: 19,
    backgroundColor: '#CA916D',
  },
  avatarHair: {
    position: 'absolute',
    top: 16,
    width: 42,
    height: 16,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: '#1F1A17',
  },
  glassesRow: {
    position: 'absolute',
    top: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 12,
    height: 9,
    borderRadius: 3.5,
    borderWidth: 1.4,
    borderColor: '#1F1A17',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassesBridge: {
    width: 3.5,
    height: 1.4,
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
    top: 48,
    width: 10,
    height: 3.5,
    borderBottomWidth: 1.4,
    borderBottomColor: '#7A3F2B',
    borderRadius: 2,
  },

  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    lineHeight: 36,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 2,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    color: '#6B7280',
    textAlign: 'center',
  },

  // 3. Two-Column Cards Grid
  columnsRow: {
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'flex-start',
    flex: 1,
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginBottom: 7,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  cardPetalIcon: {
    width: 7,
    height: 10,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  cardTitleText: {
    fontFamily: FONT_DISPLAY,
    fontStyle: 'italic',
    fontSize: 13,
    fontWeight: '700',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2.5,
  },
  cardLabel: {
    width: 106,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#6B7280',
    fontWeight: '400',
  },
  cardColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  },
  cardValue: {
    flex: 1,
    fontFamily: FONT_BODY,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 13.5,
  },
  cardText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    lineHeight: 14,
    fontWeight: '400',
  },

  // 4. Watermark / Trademark
  watermarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
