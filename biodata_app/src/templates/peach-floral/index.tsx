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
import { peachPalette } from './styles';

import { tint, shade } from '@/lib/color';

// Ornamental floral corner motif
const PeachCorner: React.FC<{
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  accent: string;
}> = ({ position, accent }) => {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('Left');

  const arcColor = tint(accent, 0.7);
  const petalLight = tint(accent, 0.7);
  const petalMid = tint(accent, 0.35);
  const petalDeep = accent;
  const dotColor = tint(accent, 0.5);

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
      <View style={[localStyles.cornerArcOuter, { borderColor: arcColor }]} />
      <View style={[localStyles.cornerArcInner, { borderColor: arcColor }]} />
      <View style={[localStyles.cornerPetal, { top: 6, left: 16, width: 22, height: 22, backgroundColor: petalLight, opacity: 0.6 }]} />
      <View style={[localStyles.cornerPetal, { top: 16, left: 6, width: 22, height: 22, backgroundColor: petalLight, opacity: 0.6 }]} />
      <View style={[localStyles.cornerPetal, { top: 12, left: 12, width: 16, height: 16, backgroundColor: petalMid, opacity: 0.7 }]} />
      <View style={[localStyles.cornerPetal, { top: 26, left: 26, width: 12, height: 12, backgroundColor: petalDeep, opacity: 0.8 }]} />
      <View style={[localStyles.cornerDot, { top: 8, left: 44, backgroundColor: dotColor }]} />
      <View style={[localStyles.cornerDot, { top: 44, left: 8, backgroundColor: dotColor }]} />
      <View style={[localStyles.cornerDot, { top: 38, left: 38, backgroundColor: petalDeep }]} />
    </View>
  );
};

export const PeachFloral: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = peachPalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Intelligently balance sections across both columns to fit 100% on a single A4 page
  const { leftSections, rightSections } = balanceSections(model.sections);

  const renderSection = (sec: ResolvedSection) => {
    const validRows = sec.rows.filter(
      (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
    );
    const hasText = Boolean(sec.text && sec.text.trim().length > 0);
    if (validRows.length === 0 && !hasText) return null;

    return (
      <View key={sec.key} style={localStyles.sectionBlock}>
        <View style={[localStyles.titleWrap, { borderBottomColor: p.line }]}>
          <Text style={[localStyles.titleText, { color: p.accent }]}>
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

        {hasText ? (
          <View style={[localStyles.textBox, { backgroundColor: p.soft, borderColor: p.border }]}>
            <Text style={[localStyles.paragraphText, { color: p.ink }]} numberOfLines={5}>
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
        <DecorativeBackground theme="floral" opacity={0.16} />

        {/* 4 Corner Peach Floral Flourishes */}
        <PeachCorner position="topLeft" accent={p.accent} />
        <PeachCorner position="topRight" accent={p.accent} />
        <PeachCorner position="bottomLeft" accent={p.accent} />
        <PeachCorner position="bottomRight" accent={p.accent} />

        {/* Header */}
        <View style={localStyles.header}>
          <View style={localStyles.headerLeft}>
            <Text style={[localStyles.bioTag, { color: p.accent }]}>MARRIAGE BIODATA</Text>
            <Text style={[localStyles.candidateName, { color: p.deep }]} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>
            {model.subtitle ? (
              <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

          <View style={localStyles.headerRight}>
            {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color={p.accent}
              symbolColor={p.accent}
              borderColor={p.accent}
              symbolSize={22}
              center={false}
            />

            {hasPhoto ? (
              <View style={[localStyles.photoFrame, { borderColor: p.accent }]}>
                {model.photo ? (
                  <Image source={{ uri: model.photo }} style={localStyles.photoImage} resizeMode="cover" />
                ) : (
                  <LinearGradient colors={['#E5F5EF', '#CEE9DF']} style={localStyles.avatarCanvas}>
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
            ) : null}
          </View>
        </View>

        <View style={[localStyles.headerDivider, { borderBottomColor: p.line }]} />

        {/* Two-Column Grid Body */}
        <View style={localStyles.columnsRow}>
          <View style={localStyles.column}>
            {leftSections.map(renderSection)}
          </View>
          <View style={localStyles.column}>
            {rightSections.map(renderSection)}
          </View>
        </View>

        {/* Trademark */}
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
    backgroundColor: '#FFFDF7',
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
    borderColor: '#FED7AA',
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
    borderColor: '#FED7AA',
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
    alignItems: 'center',
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
    letterSpacing: 0.6,
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
    color: '#78716C',
  },
  headerRight: {
    alignItems: 'center',
    gap: 6,
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

  // Photo
  photoFrame: {
    width: 96,
    height: 118,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: '#D9EFE6',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
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
    width: 80,
    height: 36,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#2C5E63',
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 24,
    width: 16,
    height: 14,
    backgroundColor: '#BA4C48',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 32,
    width: 16,
    height: 18,
    backgroundColor: '#CA916D',
    borderRadius: 4,
  },
  avatarHead: {
    position: 'absolute',
    top: 22,
    width: 40,
    height: 48,
    borderRadius: 20,
    backgroundColor: '#CA916D',
  },
  avatarHair: {
    position: 'absolute',
    top: 18,
    width: 44,
    height: 18,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    backgroundColor: '#1F1A17',
  },
  glassesRow: {
    position: 'absolute',
    top: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 13,
    height: 10,
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
    width: 2.8,
    height: 2.8,
    borderRadius: 1.4,
    backgroundColor: '#1F1A17',
  },
  avatarSmile: {
    position: 'absolute',
    top: 52,
    width: 12,
    height: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: '#7A3F2B',
    borderRadius: 2,
  },

  // 3. Columns Body
  columnsRow: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'flex-start',
    flex: 1,
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
  sectionBlock: {
    marginBottom: 7,
  },
  titleWrap: {
    borderBottomWidth: 1.5,
    paddingBottom: 2,
    marginBottom: 4,
  },
  titleText: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: '700',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 2.5,
  },
  rowLabel: {
    width: 106,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#78716C',
    fontWeight: '400',
  },
  rowColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#A8A29E',
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
  textBox: {
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginTop: 2,
  },
  paragraphText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    lineHeight: 14,
    fontWeight: '400',
  },

  // 4. Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
