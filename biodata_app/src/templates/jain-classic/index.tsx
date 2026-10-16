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
import { jainPalette } from './styles';

export const JainClassic: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = jainPalette(settings.accent);
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
        <DecorativeBackground theme="jain" opacity={0.16} />

        {/* Purple Floral Corner Flourishes */}
        <View style={[localStyles.cornerFlourish, { top: 6, left: 6, borderTopColor: p.purple, borderLeftColor: p.purple }]} />
        <View style={[localStyles.cornerFlourish, { top: 6, right: 6, borderTopColor: p.purple, borderRightColor: p.purple }]} />
        <View style={[localStyles.cornerFlourish, { bottom: 6, left: 6, borderBottomColor: p.purple, borderLeftColor: p.purple }]} />
        <View style={[localStyles.cornerFlourish, { bottom: 6, right: 6, borderBottomColor: p.purple, borderRightColor: p.purple }]} />

        {/* Center Header */}
        <View style={localStyles.header}>
          {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
          <TemplateBlessingRow
            model={model}
            color={p.accent}
            symbolColor={p.purple}
            borderColor={p.purple}
            symbolSize={24}
            theme="jain"
            center={true}
          />

          <Text style={[localStyles.bioTag, { color: p.accent }]}>Marriage Biodata</Text>
          <View style={[localStyles.accentBar, { backgroundColor: p.accent }]} />

          <Text style={localStyles.candidateName} numberOfLines={1}>
            {model.name || 'Your Full Name'}
          </Text>
          {model.subtitle ? (
            <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
              {model.subtitle}
            </Text>
          ) : null}

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
    backgroundColor: '#F4FBF7',
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },
  cornerFlourish: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.65,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  symbolWrap: {
    marginBottom: 2,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 2,
  },
  bioTag: {
    fontFamily: FONT_BODY,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  accentBar: {
    width: 32,
    height: 2,
    borderRadius: 1,
    marginVertical: 3,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    color: '#1C1917',
    marginBottom: 2,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    color: '#475569',
    marginBottom: 4,
  },

  // Photo
  photoFrame: {
    width: 88,
    height: 104,
    borderRadius: 8,
    borderWidth: 1.8,
    overflow: 'hidden',
    backgroundColor: '#D9EFE6',
    marginTop: 2,
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
    width: 72,
    height: 32,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: '#2C5E63',
  },
  avatarInnerCollar: {
    position: 'absolute',
    bottom: 20,
    width: 14,
    height: 12,
    backgroundColor: '#BA4C48',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 28,
    width: 14,
    height: 16,
    backgroundColor: '#CA916D',
    borderRadius: 3.5,
  },
  avatarHead: {
    position: 'absolute',
    top: 16,
    width: 36,
    height: 42,
    borderRadius: 18,
    backgroundColor: '#CA916D',
  },
  avatarHair: {
    position: 'absolute',
    top: 12,
    width: 40,
    height: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#1F1A17',
  },
  glassesRow: {
    position: 'absolute',
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassLens: {
    width: 11,
    height: 8.5,
    borderRadius: 3,
    borderWidth: 1.2,
    borderColor: '#1F1A17',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassesBridge: {
    width: 3,
    height: 1.2,
    backgroundColor: '#1F1A17',
  },
  avatarEye: {
    width: 2.2,
    height: 2.2,
    borderRadius: 1.1,
    backgroundColor: '#1F1A17',
  },
  avatarSmile: {
    position: 'absolute',
    top: 44,
    width: 10,
    height: 3,
    borderBottomWidth: 1.2,
    borderBottomColor: '#7A3F2B',
    borderRadius: 1.5,
  },

  // Columns Body
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
    color: '#475569',
    fontWeight: '400',
  },
  rowColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#94A3B8',
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

  // Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
