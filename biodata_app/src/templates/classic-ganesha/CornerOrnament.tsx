import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CornerProps {
  color: string;
  style?: StyleProp<ViewStyle>;
}

export const GeometricCorner: React.FC<CornerProps> = ({ color, style }) => {
  return (
    <View style={[styles.cornerContainer, style]} pointerEvents="none">
      {/* Outer 90-degree corner */}
      <View
        style={[
          styles.outerL,
          {
            borderColor: color,
          },
        ]}
      />

      {/* Secondary parallel corner line */}
      <View
        style={[
          styles.innerL,
          {
            borderColor: color,
          },
        ]}
      />

      {/* Stepped Greek-Key geometric square */}
      <View
        style={[
          styles.steppedBox,
          {
            borderColor: color,
          },
        ]}
      />

      {/* Central concentric square */}
      <View
        style={[
          styles.centerBox,
          {
            borderColor: color,
          },
        ]}
      />

      {/* Vertical stepped notch */}
      <View
        style={[
          styles.vNotch,
          {
            backgroundColor: color,
          },
        ]}
      />

      {/* Horizontal stepped notch */}
      <View
        style={[
          styles.hNotch,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

export const ClassicGaneshaBorders: React.FC<{ color: string }> = ({ color }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* 4 Geometric Stepped Corners */}
      <GeometricCorner color={color} style={styles.posTopLeft} />
      <GeometricCorner
        color={color}
        style={[styles.posTopRight, { transform: [{ scaleX: -1 }] }]}
      />
      <GeometricCorner
        color={color}
        style={[styles.posBottomLeft, { transform: [{ scaleY: -1 }] }]}
      />
      <GeometricCorner
        color={color}
        style={[
          styles.posBottomRight,
          { transform: [{ scaleX: -1 }, { scaleY: -1 }] },
        ]}
      />

      {/* Top Left Double Line */}
      <View style={styles.topLineLeft}>
        <View style={[styles.linePrimaryH, { backgroundColor: color }]} />
        <View style={[styles.lineSecondaryH, { backgroundColor: color }]} />
      </View>

      {/* Top Right Double Line */}
      <View style={styles.topLineRight}>
        <View style={[styles.linePrimaryH, { backgroundColor: color }]} />
        <View style={[styles.lineSecondaryH, { backgroundColor: color }]} />
      </View>

      {/* Bottom Horizontal Double Line (Full Span) */}
      <View style={styles.bottomLineFull}>
        <View style={[styles.linePrimaryH, { backgroundColor: color }]} />
        <View style={[styles.lineSecondaryH, { backgroundColor: color }]} />
      </View>

      {/* Left Vertical Double Line */}
      <View style={styles.leftLineFull}>
        <View style={[styles.linePrimaryV, { backgroundColor: color }]} />
        <View style={[styles.lineSecondaryV, { backgroundColor: color }]} />
      </View>

      {/* Right Vertical Double Line */}
      <View style={styles.rightLineFull}>
        <View style={[styles.linePrimaryV, { backgroundColor: color }]} />
        <View style={[styles.lineSecondaryV, { backgroundColor: color }]} />
      </View>
    </View>
  );
};

const INSET = 22;
const CORNER_SIZE = 52;

const styles = StyleSheet.create({
  cornerContainer: {
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    position: 'absolute',
  },
  outerL: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  innerL: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: CORNER_SIZE - 4,
    height: CORNER_SIZE - 4,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
  },
  steppedBox: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 28,
    height: 28,
    borderWidth: 1.5,
  },
  centerBox: {
    position: 'absolute',
    top: 17,
    left: 17,
    width: 14,
    height: 14,
    borderWidth: 1.5,
  },
  vNotch: {
    position: 'absolute',
    top: 0,
    left: 24,
    width: 1.5,
    height: 10,
  },
  hNotch: {
    position: 'absolute',
    top: 24,
    left: 0,
    width: 10,
    height: 1.5,
  },

  // Positions for 4 corners
  posTopLeft: {
    top: INSET,
    left: INSET,
  },
  posTopRight: {
    top: INSET,
    right: INSET,
  },
  posBottomLeft: {
    bottom: INSET,
    left: INSET,
  },
  posBottomRight: {
    bottom: INSET,
    right: INSET,
  },

  // Connecting double lines
  topLineLeft: {
    position: 'absolute',
    top: INSET,
    left: INSET + CORNER_SIZE - 2,
    width: 215,
    height: 6,
    justifyContent: 'space-between',
  },
  topLineRight: {
    position: 'absolute',
    top: INSET,
    right: INSET + CORNER_SIZE - 2,
    width: 215,
    height: 6,
    justifyContent: 'space-between',
  },
  bottomLineFull: {
    position: 'absolute',
    bottom: INSET,
    left: INSET + CORNER_SIZE - 2,
    right: INSET + CORNER_SIZE - 2,
    height: 6,
    justifyContent: 'space-between',
  },
  leftLineFull: {
    position: 'absolute',
    left: INSET,
    top: INSET + CORNER_SIZE - 2,
    bottom: INSET + CORNER_SIZE - 2,
    width: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightLineFull: {
    position: 'absolute',
    right: INSET,
    top: INSET + CORNER_SIZE - 2,
    bottom: INSET + CORNER_SIZE - 2,
    width: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // 1.5px to 2px line primitives
  linePrimaryH: {
    height: 2,
    width: '100%',
  },
  lineSecondaryH: {
    height: 1.5,
    width: '100%',
  },
  linePrimaryV: {
    width: 2,
    height: '100%',
  },
  lineSecondaryV: {
    width: 1.5,
    height: '100%',
  },
});
