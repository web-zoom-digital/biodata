import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { A4_WIDTH, A4_HEIGHT } from './constants';

interface Props {
  children: React.ReactNode;
  background: string;
  color?: string;
  style?: ViewStyle;
  scale?: number;
}

export const TemplateShell: React.FC<Props> = ({
  children,
  background,
  style,
  scale = 1,
}) => {
  const effectiveScale = typeof scale === 'number' && scale > 0 ? scale : 1;

  if (effectiveScale !== 1) {
    const scaledWidth = Math.round(A4_WIDTH * effectiveScale);
    const scaledHeight = Math.round(A4_HEIGHT * effectiveScale);

    return (
      <View
        style={[
          styles.scaledOuter,
          { width: scaledWidth, height: scaledHeight },
        ]}
      >
        <View
          style={[
            styles.a4Page,
            {
              backgroundColor: background,
              transformOrigin: 'top left',
              transform: [{ scale: effectiveScale }],
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.a4Container, { backgroundColor: background }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  scaledOuter: {
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  a4Page: {
    width: A4_WIDTH,
    height: A4_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  a4Container: {
    width: A4_WIDTH,
    height: A4_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
});
