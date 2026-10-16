import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { tint, alpha } from '@/lib/color';

export type DecorativeTheme = 'traditional' | 'floral' | 'islamic' | 'jain' | 'modern' | 'royal';

interface DecorativeBackgroundProps {
  theme?: DecorativeTheme;
  accent?: string;
  gold?: string;
  opacity?: number;
  imageOpacity?: number;
}

const BACKGROUND_IMAGES: Record<DecorativeTheme, ImageSourcePropType> = {
  traditional: require('../../../assets/images/backgrounds/bg_traditional_hindu.jpg'),
  floral: require('../../../assets/images/backgrounds/bg_floral_botanical.jpg'),
  royal: require('../../../assets/images/backgrounds/bg_royal_indian.jpg'),
  islamic: require('../../../assets/images/backgrounds/bg_islamic_arabesque.jpg'),
  modern: require('../../../assets/images/backgrounds/bg_modern_minimal.jpg'),
  jain: require('../../../assets/images/backgrounds/bg_royal_indian.jpg'),
};

/**
 * Premium decorative background artwork for A4 marriage biodata templates.
 * Provides custom authentic background art and subtle botanical, floral,
 * mandala, and ornamental motifs positioned at page corners, borders, and margins.
 */
export const DecorativeBackground: React.FC<DecorativeBackgroundProps> = ({
  theme = 'traditional',
  accent = '#1B4332',
  gold = '#C5A059',
  opacity = 0.22,
  imageOpacity = 0.32,
}) => {
  const primaryTint = tint(accent, 0.7);
  const softGold = alpha(gold, opacity * 1.5);
  const softAccent = alpha(accent, opacity);
  const lineGold = alpha(gold, opacity * 1.8);

  const bgImageSource = BACKGROUND_IMAGES[theme] || BACKGROUND_IMAGES.traditional;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Base Layer: High-Resolution Decorative Background Image */}
      <Image
        source={bgImageSource}
        style={[styles.bgImage, { opacity: imageOpacity }]}
        resizeMode="cover"
      />

      {/* Decorative Vector Overlays tailored to theme */}
      {theme === 'traditional' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Subtle Background Mandala Watermark */}
          <View style={[styles.mandalaWatermark, { borderColor: softGold, opacity: opacity * 0.7 }]}>
            <View style={[styles.mandalaInner, { borderColor: softGold }]} />
            <View style={[styles.mandalaCore, { borderColor: softGold }]} />
            <View style={[styles.mandalaPetal, styles.petal0, { borderColor: softGold }]} />
            <View style={[styles.mandalaPetal, styles.petal45, { borderColor: softGold }]} />
            <View style={[styles.mandalaPetal, styles.petal90, { borderColor: softGold }]} />
            <View style={[styles.mandalaPetal, styles.petal135, { borderColor: softGold }]} />
          </View>

          {/* Top-Right Floral & Botanical Branch */}
          <View style={[styles.cornerBranch, styles.topRight]}>
            <View style={[styles.vineStem, { borderColor: lineGold }]} />
            <View style={[styles.leafPetal, { top: 8, right: 38, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 22, right: 24, backgroundColor: softGold }]} />
            <View style={[styles.leafPetal, { top: 40, right: 46, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 62, right: 18, backgroundColor: softGold }]} />
            <View style={[styles.leafPetal, { top: 86, right: 34, backgroundColor: softAccent }]} />
            <View style={[styles.leafDot, { top: 32, right: 54, backgroundColor: lineGold }]} />
            <View style={[styles.leafDot, { top: 74, right: 28, backgroundColor: lineGold }]} />
          </View>

          {/* Bottom-Right Botanical Leaf Spray */}
          <View style={[styles.cornerBranch, styles.bottomRight]}>
            <View style={[styles.vineStemRev, { borderColor: lineGold }]} />
            <View style={[styles.leafPetal, { bottom: 12, right: 36, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { bottom: 28, right: 20, backgroundColor: softGold }]} />
            <View style={[styles.leafPetal, { bottom: 50, right: 42, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { bottom: 74, right: 16, backgroundColor: softGold }]} />
            <View style={[styles.leafDot, { bottom: 42, right: 50, backgroundColor: lineGold }]} />
          </View>

          {/* Auspicious Corner L-Filigrees */}
          <View style={[styles.filigreeCorner, styles.filigreeTL, { borderColor: lineGold }]} />
          <View style={[styles.filigreeCorner, styles.filigreeTR, { borderColor: lineGold }]} />
          <View style={[styles.filigreeCorner, styles.filigreeBL, { borderColor: lineGold }]} />
          <View style={[styles.filigreeCorner, styles.filigreeBR, { borderColor: lineGold }]} />
        </View>
      )}

      {theme === 'floral' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Top-Right Soft Blossom Cluster */}
          <View style={[styles.cornerBranch, styles.topRight]}>
            <View style={[styles.vineStem, { borderColor: alpha(accent, 0.28) }]} />
            <View style={[styles.flowerBlossom, { top: 14, right: 28, backgroundColor: alpha(accent, 0.15) }]} />
            <View style={[styles.flowerBlossom, { top: 24, right: 36, backgroundColor: alpha(primaryTint, 0.22) }]} />
            <View style={[styles.flowerCore, { top: 19, right: 32, backgroundColor: alpha(accent, 0.35) }]} />
            <View style={[styles.leafPetal, { top: 8, right: 52, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 38, right: 14, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 58, right: 38, backgroundColor: softAccent }]} />
          </View>

          {/* Top-Left Delicate Leaf Garland */}
          <View style={[styles.cornerBranch, styles.topLeft]}>
            <View style={[styles.vineStemRev, { borderColor: alpha(accent, 0.22) }]} />
            <View style={[styles.leafPetal, { top: 14, left: 32, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 36, left: 16, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { top: 64, left: 34, backgroundColor: softAccent }]} />
          </View>

          {/* Bottom-Right Soft Blossom Spray */}
          <View style={[styles.cornerBranch, styles.bottomRight]}>
            <View style={[styles.vineStem, { borderColor: alpha(accent, 0.25) }]} />
            <View style={[styles.flowerBlossom, { bottom: 18, right: 24, backgroundColor: alpha(accent, 0.16) }]} />
            <View style={[styles.flowerCore, { bottom: 23, right: 29, backgroundColor: alpha(accent, 0.35) }]} />
            <View style={[styles.leafPetal, { bottom: 36, right: 44, backgroundColor: softAccent }]} />
            <View style={[styles.leafPetal, { bottom: 58, right: 18, backgroundColor: softAccent }]} />
          </View>
        </View>
      )}

      {(theme === 'royal' || theme === 'jain') && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Sacred Stepped Filigree Corners */}
          <View style={[styles.filigreeCorner, styles.filigreeTL, { borderColor: lineGold, width: 32, height: 32 }]} />
          <View style={[styles.filigreeCorner, styles.filigreeTR, { borderColor: lineGold, width: 32, height: 32 }]} />
          <View style={[styles.filigreeCorner, styles.filigreeBL, { borderColor: lineGold, width: 32, height: 32 }]} />
          <View style={[styles.filigreeCorner, styles.filigreeBR, { borderColor: lineGold, width: 32, height: 32 }]} />

          {/* Soft Golden Side Flourish */}
          <View style={[styles.sideFlourish, styles.leftSide]}>
            <View style={[styles.sideStem, { borderColor: softGold }]} />
            <View style={[styles.sideLeaf, { top: 12, left: 6, backgroundColor: softAccent }]} />
            <View style={[styles.sideLeaf, { top: 38, left: 4, backgroundColor: softGold }]} />
          </View>
        </View>
      )}

      {theme === 'islamic' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Top Arch Contour */}
          <View style={[styles.islamicArchSilhouette, { borderColor: softGold, opacity: opacity * 0.9 }]}>
            <View style={[styles.innerArchShape, { borderColor: softGold }]} />
          </View>

          {/* Arabesque Corners */}
          <View style={[styles.cornerBranch, styles.topRight]}>
            <View style={[styles.arabesqueCornerOuter, { borderColor: lineGold }]} />
            <View style={[styles.starDiamond, { top: 22, right: 22, borderColor: lineGold }]} />
          </View>
          <View style={[styles.cornerBranch, styles.topLeft]}>
            <View style={[styles.arabesqueCornerOuter, { borderColor: lineGold }]} />
            <View style={[styles.starDiamond, { top: 22, left: 22, borderColor: lineGold }]} />
          </View>
          <View style={[styles.cornerBranch, styles.bottomRight]}>
            <View style={[styles.arabesqueCornerOuter, { borderColor: lineGold }]} />
            <View style={[styles.starDiamond, { bottom: 22, right: 22, borderColor: lineGold }]} />
          </View>
          <View style={[styles.cornerBranch, styles.bottomLeft]}>
            <View style={[styles.arabesqueCornerOuter, { borderColor: lineGold }]} />
            <View style={[styles.starDiamond, { bottom: 22, left: 22, borderColor: lineGold }]} />
          </View>
        </View>
      )}

      {theme === 'modern' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {/* Delicate Crosshairs */}
          <View style={[styles.crosshairCorner, styles.crossTL]}>
            <View style={[styles.crossArmH, { backgroundColor: lineGold }]} />
            <View style={[styles.crossArmV, { backgroundColor: lineGold }]} />
          </View>
          <View style={[styles.crosshairCorner, styles.crossTR]}>
            <View style={[styles.crossArmH, { backgroundColor: lineGold }]} />
            <View style={[styles.crossArmV, { backgroundColor: lineGold }]} />
          </View>
          <View style={[styles.crosshairCorner, styles.crossBL]}>
            <View style={[styles.crossArmH, { backgroundColor: lineGold }]} />
            <View style={[styles.crossArmV, { backgroundColor: lineGold }]} />
          </View>
          <View style={[styles.crosshairCorner, styles.crossBR]}>
            <View style={[styles.crossArmH, { backgroundColor: lineGold }]} />
            <View style={[styles.crossArmV, { backgroundColor: lineGold }]} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 794,
    height: 1123,
    overflow: 'hidden',
    zIndex: 0,
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 794,
    height: 1123,
  },

  // Mandala Watermark
  mandalaWatermark: {
    position: 'absolute',
    top: 40,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mandalaInner: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mandalaCore: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
  },
  mandalaPetal: {
    position: 'absolute',
    width: 210,
    height: 54,
    borderRadius: 27,
    borderWidth: 0.8,
  },
  petal0: { transform: [{ rotate: '0deg' }] },
  petal45: { transform: [{ rotate: '45deg' }] },
  petal90: { transform: [{ rotate: '90deg' }] },
  petal135: { transform: [{ rotate: '135deg' }] },

  // Corner Branches
  cornerBranch: {
    position: 'absolute',
    width: 110,
    height: 130,
  },
  topRight: { top: 6, right: 6 },
  topLeft: { top: 6, left: 6 },
  bottomRight: { bottom: 6, right: 6 },
  bottomLeft: { bottom: 6, left: 6 },

  // Vine Stems
  vineStem: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 74,
    height: 110,
    borderTopRightRadius: 60,
    borderRightWidth: 1.2,
    borderTopWidth: 1.2,
  },
  vineStemRev: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 74,
    height: 110,
    borderBottomRightRadius: 60,
    borderRightWidth: 1.2,
    borderBottomWidth: 1.2,
  },

  // Leaf Petals & Dots
  leafPetal: {
    position: 'absolute',
    width: 18,
    height: 10,
    borderRadius: 9,
    transform: [{ rotate: '-35deg' }],
  },
  leafDot: {
    position: 'absolute',
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
  },

  // Flower Blossoms
  flowerBlossom: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  flowerCore: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  // Side Flourishes
  sideFlourish: {
    position: 'absolute',
    top: '45%',
    width: 24,
    height: 90,
  },
  leftSide: { left: 8 },
  sideStem: {
    width: 14,
    height: 80,
    borderLeftWidth: 1.2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  sideLeaf: {
    position: 'absolute',
    width: 11,
    height: 7,
    borderRadius: 5,
  },

  // Filigree Corners
  filigreeCorner: {
    position: 'absolute',
    width: 24,
    height: 24,
  },
  filigreeTL: { top: 12, left: 12, borderTopWidth: 1.8, borderLeftWidth: 1.8 },
  filigreeTR: { top: 12, right: 12, borderTopWidth: 1.8, borderRightWidth: 1.8 },
  filigreeBL: { bottom: 12, left: 12, borderBottomWidth: 1.8, borderLeftWidth: 1.8 },
  filigreeBR: { bottom: 12, right: 12, borderBottomWidth: 1.8, borderRightWidth: 1.8 },

  // Islamic Elements
  islamicArchSilhouette: {
    position: 'absolute',
    top: 8,
    left: '28%',
    right: '28%',
    height: 120,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    borderWidth: 1,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 8,
  },
  innerArchShape: {
    width: '85%',
    height: 95,
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
    borderWidth: 0.8,
    borderBottomWidth: 0,
  },
  arabesqueCornerOuter: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 44,
    height: 44,
    borderTopRightRadius: 24,
    borderWidth: 1.2,
  },
  starDiamond: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },

  // Modern Crosshairs
  crosshairCorner: {
    position: 'absolute',
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossTL: { top: 14, left: 14 },
  crossTR: { top: 14, right: 14 },
  crossBL: { bottom: 14, left: 14 },
  crossBR: { bottom: 14, right: 14 },
  crossArmH: { position: 'absolute', width: 14, height: 1.2 },
  crossArmV: { position: 'absolute', width: 1.2, height: 14 },
});
