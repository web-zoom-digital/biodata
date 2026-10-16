import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  src?: string;
  width: number;
  height: number;
  radius?: number | string;
  border?: string;
  boxShadow?: string;
  placeholderBg?: string;
  placeholderFg?: string;
  showPlaceholder: boolean;
  style?: ViewStyle;
}

export const TemplatePhoto: React.FC<Props> = ({
  src,
  width,
  height,
  radius = 6,
  border,
  placeholderBg = '#E5E7EB',
  placeholderFg = '#9CA3AF',
  showPlaceholder,
  style,
}) => {
  if (!src && !showPlaceholder) return null;

  const parsedRadius =
    typeof radius === 'number'
      ? radius
      : radius === '50%'
      ? width / 2
      : typeof radius === 'string' && radius.includes('px')
      ? parseInt(radius, 10) || 8
      : 8;

  const borderColor = border ? border.split(' ')[2] || border.split(' ')[0] || placeholderFg : undefined;

  const boxStyle: ViewStyle = {
    width,
    height,
    borderRadius: parsedRadius,
    backgroundColor: placeholderBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: border ? 1.5 : 0,
    borderColor,
    ...style,
  };

  if (src) {
    return (
      <View style={boxStyle}>
        <Image source={{ uri: src }} style={styles.image} resizeMode="cover" />
      </View>
    );
  }

  // Graceful illustrated candidate avatar
  return (
    <View style={boxStyle}>
      <View style={styles.avatarWrap}>
        <View style={styles.avatarHair} />
        <View style={styles.avatarFace} />
        <View style={styles.avatarNeck} />
        <View style={styles.avatarShirt} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  avatarWrap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarHair: {
    width: 18,
    height: 8,
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: 'absolute',
    top: '22%',
  },
  avatarFace: {
    width: 14,
    height: 14,
    backgroundColor: '#D49A76',
    borderRadius: 7,
    position: 'absolute',
    top: '28%',
  },
  avatarNeck: {
    width: 5,
    height: 5,
    backgroundColor: '#C68A64',
    position: 'absolute',
    top: '46%',
  },
  avatarShirt: {
    width: 26,
    height: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    position: 'absolute',
    bottom: '12%',
  },
});
