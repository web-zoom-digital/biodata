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
import { ivoryPalette, ivorySection } from './styles';

export const MinimalIvory: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = ivoryPalette(settings.accent);
  const styles = ivorySection(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Intelligently balance sections across two columns to fit 100% on a single A4 page
  const { leftSections, rightSections } = balanceSections(model.sections);

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.sheet}>
        <DecorativeBackground theme="modern" accent={p.accent} gold="#A8A29E" opacity={0.14} />
        {/* ================= 1. EDITORIAL HEADER ================= */}
        <View style={localStyles.header}>
          {/* Header Left: Sacred Blessing, Candidate Name, Subtitle */}
          <View style={localStyles.headerInfo}>
            {/* Top Invocation Row (God Symbol - God Name - God Symbol) */}
            <TemplateBlessingRow
              model={model}
              color={p.accent}
              symbolSize={20}
              center={false}
              defaultBlessing="॥ श्री गणेशाय नमः ॥"
            />

            {/* Candidate Name in Elegant Serif Light Typography */}
            <Text style={localStyles.candidateName} numberOfLines={1}>
              {model.name || 'Your Full Name'}
            </Text>

            {/* Candidate Occupation Subtitle */}
            {model.subtitle ? (
              <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                {model.subtitle}
              </Text>
            ) : null}
          </View>

          {/* Header Right: Rectangular Photo Box */}
          {hasPhoto ? (
            <View style={localStyles.photoContainer}>
              <View style={localStyles.photoFrame}>
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
                    <View style={[localStyles.avatarEye, { left: 38 }]} />
                    <View style={[localStyles.avatarEye, { right: 38 }]} />
                    {/* Smile */}
                    <View style={localStyles.avatarSmile} />
                  </LinearGradient>
                )}
              </View>
            </View>
          ) : null}
        </View>

        {/* ================= 2. TWO-COLUMN DETAILS BODY ================= */}
        <View style={localStyles.contentBody}>
          <View style={localStyles.columnsRow}>
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

          {/* ================= 3. WATERMARK FOOTER ================= */}
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
    backgroundColor: '#FAF8F3',
    paddingHorizontal: 48,
    paddingTop: 30,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },

  // 1. Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#25221E',
    marginBottom: 12,
    gap: 20,
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'flex-end',
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  godSymbolWrap: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    padding: 1.5,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    color: '#8A8378',
    fontWeight: '500',
    marginBottom: 6,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontWeight: '300',
    fontSize: 34,
    lineHeight: 38,
    color: '#25221E',
    letterSpacing: -0.6,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    color: '#8A8378',
    marginTop: 6,
    fontWeight: '400',
  },

  // Right Photo Frame
  photoContainer: {
    paddingBottom: 2,
  },
  photoFrame: {
    width: 92,
    height: 114,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#E4DFD3',
    overflow: 'hidden',
    backgroundColor: '#F5F2EB',
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
    width: 86,
    height: 42,
    borderTopLeftRadius: 43,
    borderTopRightRadius: 43,
    backgroundColor: '#2C3E50',
  },
  avatarNeck: {
    position: 'absolute',
    bottom: 34,
    width: 18,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#C98F6B',
  },
  avatarHead: {
    position: 'absolute',
    top: 24,
    width: 38,
    height: 46,
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
    top: 42,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#3B2A22',
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

  // 2. Content Body
  contentBody: {
    flex: 1,
  },
  columnsRow: {
    flexDirection: 'row',
    columnGap: 36,
    alignItems: 'flex-start',
  },
  column: {
    flex: 1,
    minWidth: 0,
  },

  // 3. Watermark Footer
  footerWrap: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
