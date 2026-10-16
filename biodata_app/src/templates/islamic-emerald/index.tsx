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
import { islamicEmeraldPalette } from './styles';

export const IslamicEmerald: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = islamicEmeraldPalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Single Page Balanced Distribution dynamically calculated based on row counts & text weights
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
          <Text style={[localStyles.titleText, { color: p.gold }]}>
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

  // Ensure symbol in Islamic template is ALWAYS authentic Islamic
  const isSelectedIslamic = model.godSymbol?.id?.startsWith('islamic');
  const islamicSymbol = isSelectedIslamic
    ? model.godSymbol!
    : { id: 'islamic-bismillah', name: 'Bismillah', text: 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ' };

  const islamicGlyph =
    islamicSymbol.id === 'islamic-crescent'
      ? '☪'
      : islamicSymbol.id === 'islamic-786'
      ? '۷۸۶'
      : islamicSymbol.id === 'islamic-allah'
      ? 'ﷻ'
      : '﷽';

  // Filter out non-Islamic / Hindu blessings so they never appear on Islamic templates
  const isNonIslamicBlessing = (b?: string) => {
    if (!b) return true;
    const lower = b.toLowerCase();
    return (
      b.includes('गणेश') ||
      b.includes('शिवाय') ||
      b.includes('कृष्ण') ||
      b.includes('समर्थ') ||
      b.includes('ॐ') ||
      b.includes('नमः') ||
      lower.includes('ganesh') ||
      lower.includes('shree') ||
      lower.includes('namah') ||
      lower.includes('om')
    );
  };
  const islamicBlessing = isNonIslamicBlessing(model.blessing) ? null : model.blessing;

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={localStyles.pageSheet}>
        {/* Subtle Decorative Background Artwork */}
        <DecorativeBackground theme="islamic" opacity={0.16} />

        {/* Header Center */}
        <View style={localStyles.header}>
          {/* Islamic Sacred Header (God Symbol - God Name - God Symbol) */}
          <View style={localStyles.blessingRow}>
            <View style={[localStyles.islamicSymbolMedallion, { borderColor: p.gold, backgroundColor: p.soft }]}>
              <Text style={[localStyles.islamicGlyphText, { color: p.gold }]}>
                {islamicGlyph}
              </Text>
            </View>

            <Text style={[localStyles.bismillah, { color: p.gold }]}>
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </Text>

            <View style={[localStyles.islamicSymbolMedallion, { borderColor: p.gold, backgroundColor: p.soft }]}>
              <Text style={[localStyles.islamicGlyphText, { color: p.gold }]}>
                {islamicGlyph}
              </Text>
            </View>
          </View>

          {islamicBlessing ? (
            <Text style={[localStyles.blessingText, { color: p.gold }]}>
              {islamicBlessing}
            </Text>
          ) : null}

          <Text style={[localStyles.candidateName, { color: p.gold }]} numberOfLines={1}>
            {model.name || 'Your Full Name'}
          </Text>
          {model.subtitle ? (
            <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
              {model.subtitle}
            </Text>
          ) : null}

          {hasPhoto ? (
            <View style={[localStyles.photoFrame, { borderColor: p.gold }]}>
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
    backgroundColor: '#0D3B3E',
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  bismillah: {
    fontSize: 18,
    fontFamily: 'serif',
    marginBottom: 2,
    textAlign: 'center',
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    fontWeight: '700',
    marginBottom: 2,
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
    marginBottom: 4,
  },
  symbolWrap: {
    marginBottom: 4,
  },
  islamicSymbolMedallion: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  islamicGlyphText: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 2,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 11.5,
    color: '#D1D5DB',
    marginBottom: 4,
  },

  // Photo
  photoFrame: {
    width: 88,
    height: 104,
    borderRadius: 8,
    borderWidth: 2,
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

  headerDivider: {
    borderBottomWidth: 1.5,
    marginBottom: 6,
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
    marginBottom: 5,
  },
  titleWrap: {
    borderBottomWidth: 1.5,
    paddingBottom: 2,
    marginBottom: 3,
  },
  titleText: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontWeight: '700',
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 1.8,
  },
  rowLabel: {
    width: 106,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#A7F3D0',
    fontWeight: '400',
  },
  rowColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    color: '#6EE7B7',
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 2,
  },
  paragraphText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    lineHeight: 13.5,
    fontWeight: '400',
  },

  // Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
  },
});
