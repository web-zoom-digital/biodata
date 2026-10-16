import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { TemplateProps } from '@/types/template';
import { FONT_DISPLAY, FONT_BODY } from '../shared/constants';
import { TemplateGodSymbol } from '../shared/TemplateGodSymbol';
import { TemplateShell } from '../shared/TemplateShell';
import { TemplateTrademark } from '../shared/TemplateTrademark';
import { DecorativeBackground } from '../shared/DecorativeBackground';
import { auroraSagePalette } from './styles';

export const AuroraSage: React.FC<TemplateProps> = ({ model, settings, scale }) => {
  const p = auroraSagePalette(settings.accent);

  // Section finders
  const personalSec = model.sections.find((s) => s.key === 'personal');
  const astrologySec = model.sections.find((s) => s.key === 'astrology');
  const contactSec = model.sections.find((s) => s.key === 'contact');
  const educationSec = model.sections.find((s) => s.key === 'education');
  const professionSec = model.sections.find((s) => s.key === 'profession');
  const familySec = model.sections.find((s) => s.key === 'family');
  const lifestyleSec = model.sections.find((s) => s.key === 'lifestyle');
  const aboutSec = model.sections.find((s) => s.key === 'about');
  const expectationsSec = model.sections.find((s) => s.key === 'expectations');

  // Extract key highlights for the top 4-item pill bar
  const heightVal =
    personalSec?.rows.find((r) => r.label.toLowerCase().includes('height'))?.value || "5' 10\"";
  const locVal =
    personalSec?.rows.find((r) => r.label.toLowerCase().includes('place'))?.value ||
    contactSec?.rows.find((r) => r.label.toLowerCase().includes('address') || r.label.toLowerCase().includes('city'))?.value ||
    'Bhopal, MP';
  const eduVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('highest') || r.label.toLowerCase().includes('degree'))?.value ||
    'B.Tech (CS)';
  const jobVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('occupation') || r.label.toLowerCase().includes('designation'))?.value ||
    'Software Engineer';

  const degreeVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('highest') || r.label.toLowerCase().includes('degree'))?.value ||
    'B.Tech in Computer Science';
  const collegeVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('college') || r.label.toLowerCase().includes('institution'))?.value ||
    'MANIT Bhopal';
  const gradYearVal =
    educationSec?.rows.find((r) => r.label.toLowerCase().includes('year'))?.value;

  const companyVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('company'))?.value || 'Tech Solutions';
  const incomeVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('income'))?.value || '₹ 12,00,000';
  const workLocVal =
    professionSec?.rows.find((r) => r.label.toLowerCase().includes('location') || r.label.toLowerCase().includes('city'))?.value ||
    locVal ||
    'Bhopal';

  // Rows preparation with safe fallbacks
  const personalRows = (personalSec?.rows && personalSec.rows.length > 0)
    ? personalSec.rows
    : [
        { label: 'Date of Birth', value: '15 March 1998' },
        { label: 'Age', value: '26 Years' },
        { label: 'Height', value: "5 ft 10 in (178 cm)" },
        { label: 'Blood Group', value: 'B+' },
        { label: 'Marital Status', value: 'Never Married' },
        { label: 'Complexion', value: 'Wheatish Fair' },
      ];

  const astrologyRows = (astrologySec?.rows || [
    { label: 'Religion', value: 'Hindu' },
    { label: 'Caste', value: 'Brahmin' },
    { label: 'Gotra', value: 'Bharadwaj' },
    { label: 'Rashi', value: 'Mithun' },
    { label: 'Nakshatra', value: 'Ardra' },
    { label: 'Manglik', value: 'No' },
  ]).filter((r) => r.value && r.value.trim().length > 0);

  const contactRows = (contactSec?.rows && contactSec.rows.length > 0)
    ? contactSec.rows
    : [
        { label: 'Phone', value: '+91 98765 43210' },
        { label: 'Email', value: 'aarav.sharma@example.com' },
        { label: 'Address', value: 'Bhopal, Madhya Pradesh' },
      ];

  const lifestyleRows = (lifestyleSec?.rows || [
    { label: 'Diet', value: 'Vegetarian' },
    { label: 'Languages', value: 'Hindi, English' },
    { label: 'Interests', value: 'Reading, Fitness, Travel' },
  ]).filter((r) => r.value && r.value.trim().length > 0);

  const familyRows = (familySec?.rows && familySec.rows.length > 0)
    ? familySec.rows
    : [
        { label: "Father's Name", value: 'Mr. Rajesh Sharma (Govt. Employee)' },
        { label: "Mother's Name", value: 'Mrs. Sunita Sharma (Homemaker)' },
        { label: 'Siblings', value: '1 Younger Brother (Student)' },
        { label: 'Family Type & Values', value: 'Joint Family • Close-knit Traditional Values' },
      ];

  const photoSource = model.photo ? { uri: model.photo } : null;

  // Icon mapping helper
  const getRowIcon = (label: string): keyof typeof MaterialCommunityIcons.glyphMap => {
    const l = label.toLowerCase();
    if (l.includes('birth') && !l.includes('place')) return 'calendar-blank-outline';
    if (l.includes('age')) return 'account-outline';
    if (l.includes('height')) return 'human-male-height';
    if (l.includes('weight')) return 'scale-bathroom';
    if (l.includes('blood')) return 'water-outline';
    if (l.includes('marital')) return 'ring';
    if (l.includes('complexion')) return 'face-man-shimmer-outline';
    if (l.includes('religion')) return 'om';
    if (l.includes('caste')) return 'account-group-outline';
    if (l.includes('gotra')) return 'source-branch';
    if (l.includes('rashi')) return 'compass-outline';
    if (l.includes('nakshatra') || l.includes('star')) return 'star-four-points-outline';
    if (l.includes('manglik')) return 'shield-check-outline';
    if (l.includes('phone')) return 'phone-outline';
    if (l.includes('email')) return 'email-outline';
    if (l.includes('location') || l.includes('place') || l.includes('address') || l.includes('city')) return 'map-marker-outline';
    if (l.includes('father')) return 'account-tie-outline';
    if (l.includes('mother') && !l.includes('tongue')) return 'account-outline';
    if (l.includes('tongue')) return 'translate';
    if (l.includes('nationality')) return 'flag-outline';
    if (l.includes('brother') || l.includes('sister') || l.includes('sibling')) return 'account-multiple-outline';
    if (l.includes('family type') || l.includes('heritage')) return 'home-outline';
    if (l.includes('values')) return 'heart-outline';
    if (l.includes('occupation') || l.includes('designation')) return 'briefcase-outline';
    if (l.includes('company')) return 'domain';
    if (l.includes('income')) return 'currency-inr';
    return 'circle-small';
  };

  const renderSectionHeader = (title: string, icon: keyof typeof MaterialCommunityIcons.glyphMap) => (
    <View style={styles.sectionHeaderRow}>
      <View style={[styles.sectionHeaderIconWrap, { backgroundColor: p.accentSoft }]}>
        <MaterialCommunityIcons name={icon} size={12} color={p.accent} />
      </View>
      <Text style={[styles.sectionHeaderText, { color: p.accent }]}>{title.toUpperCase()}</Text>
      <View style={[styles.sectionHeaderLine, { backgroundColor: p.goldSoft }]} />
    </View>
  );

  const candidateName = model.name || 'Aarav Sharma';
  const subtitle = model.subtitle || 'SOFTWARE ENGINEER';
  const blessing = model.blessing || '॥ श्री गणेशाय नमः ॥';
  const aboutText =
    aboutSec?.text ||
    'I am a thoughtful, family-oriented professional with a modern outlook and deep cultural roots. I value mutual respect, continuous learning, and meaningful relationships. In my leisure time, I enjoy reading, exploring nature, and spending quality moments with loved ones.';

  const partnerText =
    expectationsSec?.text ||
    'Looking for an educated, warm, and understanding partner who values family harmony, personal aspirations, and mutual companionship built on trust and shared principles.';

  return (
    <TemplateShell background={p.page} color={p.ink} scale={scale}>
      <View style={styles.pageSheet}>
        {/* Subtle Decorative Background Artwork */}
        <DecorativeBackground theme="floral" opacity={0.12} imageOpacity={0.4} />

        {/* =========================================================================
            TOP HERO: Centered Blessing, Cameo Portrait, Candidate Name & Highlights
            ========================================================================= */}
        <View style={styles.heroSection}>
          {/* Micro Blessing Pill (God Symbol - God Name - God Symbol) */}
          <View style={styles.blessingRow}>
            <View style={[styles.blessingPill, { backgroundColor: p.accentBadge, borderColor: p.goldSoft }]}>
              <TemplateGodSymbol
                symbol={model.godSymbol || { id: 'ganesha', name: 'Ganesha' }}
                size={18}
                color={p.accent}
                borderColor={p.gold}
                backgroundColor={p.page}
              />
              <Text style={[styles.blessingText, { color: p.accent }]}>{blessing}</Text>
              <TemplateGodSymbol
                symbol={model.godSymbol || { id: 'ganesha', name: 'Ganesha' }}
                size={18}
                color={p.accent}
                borderColor={p.gold}
                backgroundColor={p.page}
              />
            </View>
          </View>

          {/* Centered Capsule Cameo Portrait Frame */}
          <View style={styles.portraitWrap}>
            <View style={[styles.capsuleOuterRing, { borderColor: p.gold }]}>
              <View style={[styles.capsuleFrame, { borderColor: p.cardBorder }]}>
                {photoSource ? (
                  <Image source={photoSource} style={styles.portraitImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.emptyAvatar, { backgroundColor: p.accentBadge }]}>
                    <MaterialCommunityIcons name="account" size={54} color={p.accent} />
                  </View>
                )}
              </View>
            </View>
            {/* Subtle Botanical Leaf Accent Badge */}
            <View style={[styles.portraitLeafBadge, { backgroundColor: p.page, borderColor: p.gold }]}>
              <MaterialCommunityIcons name="leaf" size={12} color={p.accent} />
            </View>
          </View>

          {/* Candidate Regal Name */}
          <Text style={[styles.candidateName, { color: p.accentDeep }]}>{candidateName}</Text>

          {/* Profession / Subtitle */}
          <View style={styles.subtitleRow}>
            <Text style={[styles.subtitleText, { color: p.goldDark }]}>
              {subtitle.toUpperCase()}
            </Text>
          </View>

          {/* 4-Item Quick Highlights Badge Strip */}
          <View style={styles.highlightsStrip}>
            <View style={[styles.highlightPill, { backgroundColor: p.statBadgeBg, borderColor: p.statBadgeBorder }]}>
              <MaterialCommunityIcons name="map-marker-outline" size={11} color={p.goldDark} />
              <Text style={[styles.highlightPillText, { color: p.ink }]} numberOfLines={1}>{locVal}</Text>
            </View>
            <View style={[styles.highlightPill, { backgroundColor: p.statBadgeBg, borderColor: p.statBadgeBorder }]}>
              <MaterialCommunityIcons name="school-outline" size={11} color={p.goldDark} />
              <Text style={[styles.highlightPillText, { color: p.ink }]} numberOfLines={1}>{eduVal}</Text>
            </View>
            <View style={[styles.highlightPill, { backgroundColor: p.statBadgeBg, borderColor: p.statBadgeBorder }]}>
              <MaterialCommunityIcons name="briefcase-outline" size={11} color={p.goldDark} />
              <Text style={[styles.highlightPillText, { color: p.ink }]} numberOfLines={1}>{jobVal}</Text>
            </View>
            <View style={[styles.highlightPill, { backgroundColor: p.statBadgeBg, borderColor: p.statBadgeBorder }]}>
              <MaterialCommunityIcons name="human-male-height" size={11} color={p.goldDark} />
              <Text style={[styles.highlightPillText, { color: p.ink }]} numberOfLines={1}>{heightVal}</Text>
            </View>
          </View>

          {/* Centered Values / Quote Box */}
          <View style={[styles.quoteCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
            <Text style={[styles.quoteMarkLeft, { color: p.quoteMark }]}>“</Text>
            <Text style={[styles.quoteText, { color: p.inkMuted }]}>
              {model.quote || 'Rooted in heritage, growing with modern aspirations, seeking a life partner to share a purposeful and joyful journey.'}
            </Text>
            <Text style={[styles.quoteMarkRight, { color: p.quoteMark }]}>”</Text>
          </View>
        </View>

        {/* =========================================================================
            BODY CONTENT: 2-Column Balanced Modular Grid (Equal Symmetrical Columns)
            ========================================================================= */}
        <View style={styles.bodyGrid}>
          {/* ================= LEFT COLUMN ================= */}
          <View style={styles.columnCol}>
            {/* 1. PERSONAL DETAILS CARD */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Personal Profile', 'account-outline')}
              <View style={styles.rowsContainer}>
                {personalRows.map((r, i) => (
                  <View key={`pers-${i}`} style={styles.dataRow}>
                    <View style={styles.rowLabelGroup}>
                      <MaterialCommunityIcons name={getRowIcon(r.label)} size={11} color={p.inkSubtle} />
                      <Text style={[styles.rowLabel, { color: p.inkMuted }]} numberOfLines={1}>{r.label}</Text>
                    </View>
                    <Text style={styles.rowColon}>:</Text>
                    <Text style={[styles.rowValue, { color: p.ink }]} numberOfLines={1}>{r.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 2. ASTROLOGY & CULTURAL IDENTITY (Pill Grid) */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Cultural & Astrology', 'compass-outline')}
              <View style={styles.astroGrid}>
                {astrologyRows.map((r, i) => (
                  <View key={`astro-${i}`} style={[styles.astroPill, { backgroundColor: p.page, borderColor: p.cardSoftBorder }]}>
                    <Text style={[styles.astroLabel, { color: p.inkSubtle }]}>{r.label}</Text>
                    <Text style={[styles.astroValue, { color: p.ink }]}>{r.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 3. CONTACT INFORMATION CARD */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Contact Details', 'phone-outline')}
              <View style={styles.rowsContainer}>
                {contactRows.map((r, i) => (
                  <View key={`cont-${i}`} style={styles.dataRow}>
                    <View style={styles.rowLabelGroup}>
                      <MaterialCommunityIcons name={getRowIcon(r.label)} size={11} color={p.inkSubtle} />
                      <Text style={[styles.rowLabel, { color: p.inkMuted }]} numberOfLines={1}>{r.label}</Text>
                    </View>
                    <Text style={styles.rowColon}>:</Text>
                    <Text style={[styles.rowValue, { color: p.ink }]} numberOfLines={2}>{r.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 4. LIFESTYLE & HABITS CARD */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Lifestyle & Habits', 'leaf')}
              <View style={styles.tagsContainer}>
                {lifestyleRows.map((t, idx) => (
                  <View key={`tag-${idx}`} style={[styles.lifestyleTag, { backgroundColor: p.accentBadge, borderColor: p.goldSoft }]}>
                    <Text style={[styles.tagLabel, { color: p.accent }]}>{t.label}: </Text>
                    <Text style={[styles.tagValue, { color: p.ink }]}>{t.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* ================= RIGHT COLUMN ================= */}
          <View style={styles.columnCol}>
            {/* 1. ABOUT ME NARRATIVE */}
            <View style={[styles.modularCard, styles.aboutCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder, borderLeftColor: p.accent }]}>
              {renderSectionHeader('About Me', 'text-box-outline')}
              <Text style={[styles.narrativeText, { color: p.inkMuted }]}>{aboutText}</Text>
            </View>

            {/* 2. EDUCATION & CAREER TIMELINE */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Education & Career', 'school-outline')}
              <View style={styles.timelineList}>
                {/* Education Milestone */}
                <View style={styles.timelineItem}>
                  <View style={styles.timelineLeftTrack}>
                    <View style={[styles.timelineNode, { backgroundColor: p.gold }]} />
                    <View style={[styles.timelineLine, { backgroundColor: p.goldSoft }]} />
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineTitle, { color: p.ink }]}>
                      {degreeVal}
                    </Text>
                    <Text style={[styles.timelineSubtitle, { color: p.inkMuted }]}>
                      {collegeVal}{gradYearVal ? ` (${gradYearVal})` : ''}
                    </Text>
                  </View>
                </View>

                {/* Career Milestone */}
                <View style={[styles.timelineItem, { marginBottom: 0 }]}>
                  <View style={styles.timelineLeftTrack}>
                    <View style={[styles.timelineNode, { backgroundColor: p.accent }]} />
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={[styles.timelineTitle, { color: p.ink }]}>
                      {jobVal}{companyVal ? ` at ${companyVal}` : ''}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={[styles.timelineMeta, { color: p.goldDark }]}>
                        Annual: {incomeVal}
                      </Text>
                      <Text style={[styles.timelineMetaBullet, { color: p.inkSubtle }]}>•</Text>
                      <Text style={[styles.timelineMeta, { color: p.inkSubtle }]}>
                        {workLocVal}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* 3. FAMILY BACKGROUND */}
            <View style={[styles.modularCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder }]}>
              {renderSectionHeader('Family Background', 'home-outline')}
              <View style={styles.rowsContainer}>
                {familyRows.map((r, i) => (
                  <View key={`fam-${i}`} style={styles.dataRow}>
                    <View style={styles.rowLabelGroup}>
                      <MaterialCommunityIcons name={getRowIcon(r.label)} size={11} color={p.inkSubtle} />
                      <Text style={[styles.rowLabel, { color: p.inkMuted }]} numberOfLines={1}>{r.label}</Text>
                    </View>
                    <Text style={styles.rowColon}>:</Text>
                    <Text style={[styles.rowValue, { color: p.ink }]} numberOfLines={2}>{r.value}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 4. PARTNER EXPECTATIONS */}
            <View style={[styles.modularCard, styles.expectCard, { backgroundColor: 'rgba(255, 255, 255, 0.92)', borderColor: p.cardBorder, borderLeftColor: p.gold }]}>
              {renderSectionHeader('Partner Preferences', 'heart-outline')}
              <Text style={[styles.narrativeText, { color: p.inkMuted }]}>
                {partnerText}
              </Text>
            </View>
          </View>
        </View>

        {/* =========================================================================
            BOTTOM FOOTER & TRADEMARK
            ========================================================================= */}
        <View style={styles.footerWrap}>
          <View style={[styles.footerDivider, { backgroundColor: p.goldSoft }]} />
          <TemplateTrademark color={p.trademark} />
        </View>
      </View>
    </TemplateShell>
  );
};

const styles = StyleSheet.create({
  pageSheet: {
    width: 794,
    height: 1123,
    paddingHorizontal: 48,
    paddingTop: 22,
    paddingBottom: 16,
    position: 'relative',
    justifyContent: 'space-between',
  },

  // Centered Hero Section
  heroSection: {
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 2,
  },
  blessingRow: {
    marginBottom: 5,
    alignItems: 'center',
  },
  blessingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 14,
    borderWidth: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  blessingText: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  portraitWrap: {
    width: 132,
    height: 170,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  capsuleOuterRing: {
    width: 126,
    height: 164,
    borderRadius: 63,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  capsuleFrame: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: '#FAF5EE',
  },
  portraitImage: {
    width: '100%',
    height: '100%',
  },
  emptyAvatar: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portraitLeafBadge: {
    position: 'absolute',
    bottom: -2,
    right: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  candidateName: {
    fontFamily: FONT_DISPLAY,
    fontSize: 29,
    fontWeight: '700',
    lineHeight: 33,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  subtitleRow: {
    marginTop: 2,
    marginBottom: 6,
  },
  subtitleText: {
    fontFamily: FONT_BODY,
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 2,
    textAlign: 'center',
  },
  highlightsStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 8,
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    borderWidth: 0.8,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  highlightPillText: {
    fontFamily: FONT_BODY,
    fontSize: 9.2,
    fontWeight: '600',
    maxWidth: 120,
  },
  quoteCard: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 5,
    position: 'relative',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteMarkLeft: {
    position: 'absolute',
    top: -8,
    left: 6,
    fontFamily: FONT_DISPLAY,
    fontSize: 26,
    lineHeight: 26,
    fontWeight: '700',
  },
  quoteMarkRight: {
    position: 'absolute',
    bottom: -14,
    right: 6,
    fontFamily: FONT_DISPLAY,
    fontSize: 26,
    lineHeight: 26,
    fontWeight: '700',
  },
  quoteText: {
    fontFamily: FONT_DISPLAY,
    fontStyle: 'italic',
    fontSize: 9.8,
    lineHeight: 14,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  // 2-Column Balanced Modular Grid
  bodyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    zIndex: 2,
    gap: 14,
  },
  columnCol: {
    flex: 1,
    minWidth: 0,
  },

  // Modular Cards
  modularCard: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  aboutCard: {
    borderLeftWidth: 3.5,
  },
  expectCard: {
    borderLeftWidth: 3.5,
  },

  // Section Headers
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
  },
  sectionHeaderIconWrap: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    fontFamily: FONT_BODY,
    fontSize: 9.8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 0.8,
  },

  // Data Rows
  rowsContainer: {
    gap: 2,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1.5,
  },
  rowLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 105,
  },
  rowLabel: {
    fontFamily: FONT_BODY,
    fontSize: 9.3,
    fontWeight: '500',
  },
  rowColon: {
    width: 10,
    fontFamily: FONT_BODY,
    fontSize: 9.3,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '500',
  },
  rowValue: {
    fontFamily: FONT_BODY,
    fontSize: 9.5,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    paddingLeft: 3,
  },

  // Astrology 2-Col Pill Grid
  astroGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  astroPill: {
    width: '48.5%',
    borderRadius: 6,
    borderWidth: 0.8,
    paddingVertical: 3,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  astroLabel: {
    fontFamily: FONT_BODY,
    fontSize: 8.8,
    fontWeight: '500',
  },
  astroValue: {
    fontFamily: FONT_BODY,
    fontSize: 9.2,
    fontWeight: '700',
  },

  // Narrative Text
  narrativeText: {
    fontFamily: FONT_BODY,
    fontSize: 9.3,
    lineHeight: 14,
  },

  // Timeline
  timelineList: {
    paddingLeft: 4,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  timelineLeftTrack: {
    width: 16,
    alignItems: 'center',
    paddingTop: 3,
  },
  timelineNode: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  timelineLine: {
    width: 1.2,
    height: 24,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 4,
  },
  timelineTitle: {
    fontFamily: FONT_BODY,
    fontSize: 9.8,
    fontWeight: '700',
  },
  timelineSubtitle: {
    fontFamily: FONT_BODY,
    fontSize: 9,
    lineHeight: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  timelineMeta: {
    fontFamily: FONT_BODY,
    fontSize: 8.8,
    fontWeight: '600',
  },
  timelineMetaBullet: {
    fontSize: 8,
  },

  // Lifestyle Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  lifestyleTag: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.8,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
  },
  tagLabel: {
    fontFamily: FONT_BODY,
    fontSize: 8.8,
    fontWeight: '700',
  },
  tagValue: {
    fontFamily: FONT_BODY,
    fontSize: 8.8,
    fontWeight: '500',
  },

  // Footer
  footerWrap: {
    alignItems: 'center',
    zIndex: 2,
    paddingTop: 2,
  },
  footerDivider: {
    width: 60,
    height: 1,
    marginBottom: 4,
  },
});
