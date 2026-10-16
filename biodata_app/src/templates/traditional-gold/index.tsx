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
import { goldPalette } from './styles';

// Ornamental gold garland composed of repeating connected gold diamonds matching reference PDF
const GoldGarland: React.FC<{ color: string }> = ({ color }) => {
  return (
    <View style={localStyles.garlandRow} pointerEvents="none">
      {Array.from({ length: 22 }).map((_, i) => (
        <View key={i} style={localStyles.garlandItem}>
          <View style={[localStyles.garlandLine, { backgroundColor: color }]} />
          <View style={[localStyles.garlandDiamond, { borderColor: color }]}>
            <View style={[localStyles.garlandDot, { backgroundColor: color }]} />
          </View>
          {i === 21 && <View style={[localStyles.garlandLine, { backgroundColor: color }]} />}
        </View>
      ))}
    </View>
  );
};

export const TraditionalGold: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = goldPalette(settings.accent);
  const hasPhoto = Boolean(model.photo) || settings.showPhotoPlaceholder;

  // Intelligently balance sections across both columns so all form data fits on one page
  const { leftSections, rightSections } = balanceSections(model.sections);

  const renderSectionBox = (section: ResolvedSection) => {
    const validRows = section.rows.filter(
      (r) => r && typeof r.value === 'string' && r.value.trim().length > 0
    );
    const hasText = Boolean(section.text && section.text.trim().length > 0);
    if (validRows.length === 0 && !hasText) return null;

    return (
      <View key={section.key} style={localStyles.sectionContainer}>
        {/* Gold Ribbon Banner Header */}
        <View style={[localStyles.ribbonBanner, { backgroundColor: p.accent }]}>
          <Text style={localStyles.ribbonText}>{section.title}</Text>
        </View>

        {/* Table Rows Box */}
        {validRows.length > 0 ? (
          <View style={[localStyles.tableBox, { borderColor: p.line }]}>
            {validRows.map((r, idx) => (
              <View
                key={`${r.label}-${idx}`}
                style={[
                  localStyles.tableRow,
                  idx < validRows.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: p.lineSoft,
                  },
                ]}
              >
                <View
                  style={[
                    localStyles.cellLabel,
                    { backgroundColor: p.labelBg, borderRightColor: p.lineSoft },
                  ]}
                >
                  <Text style={[localStyles.cellLabelText, { color: p.deep }]} numberOfLines={2}>
                    {r.label}
                  </Text>
                </View>
                <View style={localStyles.cellValue}>
                  <Text style={localStyles.cellValueText} numberOfLines={2}>
                    {r.value}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}

        {/* Paragraph Text Box (About Me / Partner Expectations) */}
        {hasText ? (
          <View style={[localStyles.textBox, { borderColor: p.line }]}>
            <Text style={localStyles.paragraphText} numberOfLines={5}>
              {section.text}
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

        {/* Outer Inset Gold Border Line */}
        <View style={[localStyles.borderFrame, { borderColor: p.line }]}>
          {/* Top Ornamental Gold Garland */}
          <GoldGarland color={p.accent} />

          {/* Header Area */}
          <View style={localStyles.header}>
            {/* Left Photo Frame / Illustrated Avatar */}
            {hasPhoto ? (
              <View style={[localStyles.photoFrame, { borderColor: p.line }]}>
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
                    {/* Face Head */}
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

            {/* Right Header Details */}
            <View style={localStyles.headerDetails}>
              {/* Sacred Invocation / Blessing (God Symbol - God Name - God Symbol) */}
              <TemplateBlessingRow
                model={model}
                color={p.accent}
                symbolSize={22}
                center={false}
              />

              {/* Sub-tag */}
              <Text style={[localStyles.bioTag, { color: p.accent }]}>Marriage Bio-Data</Text>

              {/* Candidate Name in Rich Bold Serif */}
              <Text style={[localStyles.candidateName, { color: p.deep }]} numberOfLines={1}>
                {model.name || 'Your Full Name'}
              </Text>

              {/* Subtitle / Role */}
              {model.subtitle ? (
                <Text style={localStyles.candidateSubtitle} numberOfLines={1}>
                  {model.subtitle}
                </Text>
              ) : null}
            </View>
          </View>

          {/* Two-Column Tables Grid */}
          <View style={localStyles.columnsRow}>
            {/* Left Column: Personal, Family, Lifestyle, Additional, About Me */}
            <View style={localStyles.column}>
              {leftSections.map(renderSectionBox)}
            </View>

            {/* Right Column: Education, Profession, Astrology, Contact, Partner Expectations */}
            <View style={localStyles.column}>
              {rightSections.map(renderSectionBox)}
            </View>
          </View>

          {/* Bottom Ornamental Gold Garland */}
          <GoldGarland color={p.accent} />

          {/* Footer Trademark */}
          <View style={localStyles.trademarkWrap}>
            <TemplateTrademark color={p.trademark} />
          </View>
        </View>
      </View>
    </TemplateShell>
  );
};

const localStyles = StyleSheet.create({
  pageSheet: {
    width: 794,
    height: 1123,
    maxHeight: 1123,
    backgroundColor: '#FFFDF7',
    padding: 14,
    overflow: 'hidden',
  },
  borderFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 4,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },

  // 1. Ornamental Garland
  garlandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    marginVertical: 2,
  },
  garlandItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  garlandLine: {
    width: 14,
    height: 1,
    opacity: 0.8,
  },
  garlandDiamond: {
    width: 8.5,
    height: 8.5,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
  },
  garlandDot: {
    width: 2.2,
    height: 2.2,
    borderRadius: 1.1,
  },

  // 2. Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  photoFrame: {
    width: 96,
    height: 120,
    borderWidth: 2,
    borderRadius: 4,
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

  headerDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  blessingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  bioTag: {
    fontFamily: FONT_BODY,
    fontSize: 12,
    color: '#7A6652',
    marginVertical: 2,
    letterSpacing: 0.4,
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  candidateSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    color: '#6B7280',
    marginTop: 3,
  },

  // 3. Two-Column Tables Grid
  columnsRow: {
    flexDirection: 'row',
    columnGap: 16,
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  column: {
    flex: 1,
    minWidth: 0,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  ribbonBanner: {
    paddingVertical: 4.5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  ribbonText: {
    fontFamily: FONT_BODY,
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  tableBox: {
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 22,
  },
  cellLabel: {
    width: 114,
    borderRightWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    justifyContent: 'center',
  },
  cellLabelText: {
    fontFamily: FONT_BODY,
    fontSize: 10,
    fontWeight: '600',
    color: '#4A351D',
  },
  cellValue: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 3.5,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cellValueText: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    fontWeight: '500',
    color: '#1F1A14',
  },
  textBox: {
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  paragraphText: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    lineHeight: 16,
    color: '#372E26',
  },

  // 4. Trademark
  trademarkWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 2,
  },
});
