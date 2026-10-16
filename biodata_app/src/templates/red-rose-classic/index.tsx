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
import { redRosePalette } from './styles';

export const RedRoseClassic: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = redRosePalette(settings.accent);
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

        {/* Top Rose Bar */}
        <View style={[localStyles.topBar, { backgroundColor: p.accent }]} />

        {/* Header */}
        <View style={localStyles.header}>
          <View style={localStyles.headerLeft}>
            {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color={p.gold}
              symbolColor={p.gold}
              borderColor={p.gold}
              symbolSize={22}
              center={false}
            />

            <Text style={[localStyles.candidateName, { color: p.accent }]} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>

            {model.subtitle ? (
              <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

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

        <View style={[localStyles.headerDivider, { borderBottomColor: p.line }]}>
          <View style={[localStyles.dividerDiamond, { backgroundColor: p.accent }]} />
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

        {/* Bottom Rose Bar */}
        <View style={[localStyles.bottomBar, { backgroundColor: p.accent }]} />

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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },
  topBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  bottomBar: {
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    fontWeight: '700',
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 3,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    color: '#57534E',
  },
  headerDivider: {
    borderBottomWidth: 1.5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
  },
  dividerDiamond: {
    width: 6,
    height: 6,
    transform: [{ rotate: '45deg' }],
  },

  // Photo
  photoFrame: {
    width: 96,
    height: 118,
    borderRadius: 8,
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

  // Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
