import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Platform,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/AuthContext';
import { templates } from '@/templates/registry';
import { calculateCardPreviewDimensions } from '@/templates/shared/constants';
import type { TemplateDefinition } from '@/types/template';
import { SAMPLE_BIODATA, SAMPLE_BIODATA_GIRL } from '@/data/sample-biodata';

const LOGO_SOURCE = require('../../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

// ─── 3 Biodata Maker Hero Images & Slides ────────────────────────────────────
const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: require('../../../assets/images/hero/hero_biodata_1.jpg'),
    badge: '✨ TRADITIONAL & FLORAL',
    title: 'Craft Your Perfect Biodata',
    subtitle: '12+ handcrafted marriage templates with photo & family details',
    ctaText: 'Create Biodata',
    ctaRoute: '/create',
    ctaIcon: 'pencil',
  },
  {
    id: 'slide-2',
    image: require('../../../assets/images/hero/hero_biodata_2.jpg'),
    badge: '👑 ROYAL & LUXURY FORMATS',
    title: 'Make a Lasting Impression',
    subtitle: 'Golden accents, ornate borders & elegant marriage layout',
    ctaText: 'Explore Templates',
    ctaRoute: '/(tabs)/templates',
    ctaIcon: 'grid-outline',
  },
  {
    id: 'slide-3',
    image: require('../../../assets/images/hero/hero_biodata_3.jpg'),
    badge: '📱 INSTANT PDF & SHARE',
    title: 'Ready in 5 Minutes',
    subtitle: 'Download print-ready A4 PDF & share directly on WhatsApp',
    ctaText: 'Start Now',
    ctaRoute: '/create',
    ctaIcon: 'flash',
  },
];

// ─── Template Mini Card ───────────────────────────────────────────────────────

const TemplateCard = React.memo(function TemplateCard({
  template,
  onPress,
}: {
  template: TemplateDefinition;
  onPress: (t: TemplateDefinition) => void;
}) {
  const { width } = useWindowDimensions();
  const rawWidth = Math.floor((width - 48 - 12) / 2);
  const { cardWidth, cardHeight, scale } = calculateCardPreviewDimensions(rawWidth);
  const sampleModel = template.previewSample === 'girl' ? SAMPLE_BIODATA_GIRL : SAMPLE_BIODATA;

  return (
    <Pressable
      id={`home-template-${template.id}`}
      style={({ pressed }) => [
        styles.templateCard,
        { width: cardWidth },
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(template)}
      accessibilityRole="button"
      accessibilityLabel={`Use ${template.name} template`}
    >
      <View style={[styles.templatePreview, { height: cardHeight }]}>
        <template.component
          model={sampleModel}
          settings={{
            ...template.defaultSettings,
            showPhotoPlaceholder: template.defaultSettings.showPhotoPlaceholder ?? true,
          }}
          scale={scale}
        />
      </View>
      <View style={styles.templateCardFooter}>
        <Text style={styles.templateCardName} numberOfLines={1}>
          {template.name}
        </Text>
        <View style={styles.useBtn}>
          <Text style={styles.useBtnText}>Use</Text>
        </View>
      </View>
    </Pressable>
  );
});

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user, profile } = useAuth();
  const [fadeAnim] = useState(() => new Animated.Value(0));

  // ─── 3-Second Hero Carousel Animation ─────────────────────────────────────
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideOpacities] = useState(() =>
    HERO_SLIDES.map((_, i) => new Animated.Value(i === 0 ? 1 : 0))
  );
  const [slideScales] = useState(() =>
    HERO_SLIDES.map((_, i) => new Animated.Value(i === 0 ? 1 : 1.05))
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const transitionToSlide = useCallback(
    (fromIdx: number, toIdx: number) => {
      slideScales[toIdx].setValue(1.05);

      Animated.parallel([
        Animated.timing(slideOpacities[fromIdx], {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(slideOpacities[toIdx], {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(slideScales[toIdx], {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]).start();
      setActiveSlide(toIdx);
    },
    [slideOpacities, slideScales]
  );

  const goToSlide = useCallback(
    (nextIdx: number) => {
      if (nextIdx === activeSlide) return;
      transitionToSlide(activeSlide, nextIdx);
    },
    [activeSlide, transitionToSlide]
  );

  // 3-second auto-play loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveSlide((curr) => {
        const next = (curr + 1) % HERO_SLIDES.length;
        transitionToSlide(curr, next);
        return next;
      });
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [transitionToSlide]);

  const firstName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || 'there')
    .split(' ')[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleUseTemplate = useCallback((template: TemplateDefinition) => {
    router.push(`/create?template=${template.id}` as any);
  }, []);

  // Show only first 6 templates on home
  const featuredTemplates = templates.slice(0, 6);
  const currentSlide = HERO_SLIDES[activeSlide];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={LOGO_SOURCE} style={styles.headerLogo} resizeMode="cover" />
          <View>
            <Text style={styles.headerGreeting}>Good day, {firstName} 👋</Text>
            <Text style={styles.headerSub}>Create your marriage biodata</Text>
          </View>
        </View>
        <Pressable
          id="home-profile-btn"
          style={({ pressed }) => [styles.avatarBtn, pressed && { opacity: 0.7 }]}
          onPress={() => router.push('/(tabs)/profile' as any)}
          accessibilityRole="button"
          accessibilityLabel="Go to profile"
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {firstName.charAt(0).toUpperCase()}
            </Text>
          </View>
        </Pressable>
      </View>

      <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroBanner}>
            {HERO_SLIDES.map((slide, idx) => (
              <Animated.View
                key={slide.id}
                style={[
                  StyleSheet.absoluteFill,
                  {
                    opacity: slideOpacities[idx],
                    transform: [{ scale: slideScales[idx] }],
                  },
                ]}
                pointerEvents="none"
              >
                <Image
                  source={slide.image}
                  style={styles.heroBackgroundImage}
                  resizeMode="cover"
                />
              </Animated.View>
            ))}

            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0, 0, 0, 0.35)' }]}
              pointerEvents="none"
            />

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{currentSlide.title}</Text>
              <Text style={styles.heroSubtitle}>{currentSlide.subtitle}</Text>

              <Pressable
                id={`home-hero-cta-${currentSlide.id}`}
                style={({ pressed }) => [styles.heroBtn, pressed && styles.heroBtnPressed]}
                onPress={() => router.push(currentSlide.ctaRoute as any)}
                accessibilityRole="button"
                accessibilityLabel={currentSlide.ctaText}
              >
                <Ionicons name={currentSlide.ctaIcon as any} size={15} color="#047857" />
                <Text style={styles.heroBtnText}>{currentSlide.ctaText}</Text>
                <Ionicons name="arrow-forward" size={14} color="#047857" />
              </Pressable>

              <View style={styles.heroPagination}>
                {HERO_SLIDES.map((s, i) => (
                  <Pressable
                    key={s.id}
                    id={`home-hero-dot-${i}`}
                    onPress={() => goToSlide(i)}
                    style={({ pressed }) => [
                      styles.heroDot,
                      i === activeSlide && styles.heroDotActive,
                      pressed && { opacity: 0.7 },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`Slide ${i + 1}`}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Featured Templates */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Templates</Text>
            <Pressable
              id="home-view-all-templates-btn"
              onPress={() => router.push('/(tabs)/templates' as any)}
              accessibilityRole="button"
              accessibilityLabel="View all templates"
            >
              <Text style={styles.sectionViewAll}>View all →</Text>
            </Pressable>
          </View>

          <View style={styles.templateGrid}>
            {featuredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPress={handleUseTemplate}
              />
            ))}
          </View>

          {/* Info card */}
          <View style={styles.infoCard}>
            <Ionicons name="shield-checkmark" size={20} color="#047857" />
            <View style={styles.infoCardText}>
              <Text style={styles.infoCardTitle}>Your data stays private</Text>
              <Text style={styles.infoCardBody}>
                Biodata drafts are saved on your device. Sign in to sync across devices in future updates.
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8FAFC' },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    ...Platform.select({ android: { elevation: 2 } }),
  },
  headerGreeting: { fontSize: 15, fontWeight: '700', color: '#111827' },
  headerSub: { fontSize: 12, color: '#9CA3AF', marginTop: 1 },
  avatarBtn: { padding: 2 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#047857',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, gap: 16 },
  // Hero
  heroBanner: {
    borderRadius: 22,
    height: 220,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 14,
      },
    }),
  },
  heroBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  heroContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1.5 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    maxWidth: '92%',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  heroBtnText: { fontSize: 13.5, fontWeight: '700', color: '#047857' },
  heroBtnPressed: { opacity: 0.88, transform: [{ scale: 0.98 }] },
  heroPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 14,
  },
  heroDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  heroDotActive: {
    width: 20,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  cardPressed: { opacity: 0.82, transform: [{ scale: 0.97 }] },
  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
  sectionViewAll: { fontSize: 13.5, color: '#047857', fontWeight: '600' },
  // Template grid
  templateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  templateCard: {
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
      },
    }),
  },
  templatePreview: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
  },
  templateCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  templateCardName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
    marginRight: 8,
  },
  useBtn: {
    backgroundColor: '#047857',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  useBtnText: { fontSize: 11.5, fontWeight: '700', color: '#FFFFFF' },
  // Info card
  infoCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    padding: 14,
    alignItems: 'flex-start',
  },
  infoCardText: { flex: 1 },
  infoCardTitle: { fontSize: 13.5, fontWeight: '700', color: '#065F46', marginBottom: 3 },
  infoCardBody: { fontSize: 12.5, color: '#047857', lineHeight: 18 },
});
