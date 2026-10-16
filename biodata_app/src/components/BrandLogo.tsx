import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

const LOGO_SOURCE = require('../../assets/expo.icon/BioCraft_logo.jpg.jpeg');

interface BrandLogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  imageOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 38,
  showText = true,
  textColor = '#0F172A',
  imageOnly = false,
}) => {
  const borderRadius = Math.round(size * 0.24);

  if (imageOnly) {
    return (
      <Image
        source={LOGO_SOURCE}
        style={{
          width: size,
          height: size,
          borderRadius,
        }}
        resizeMode="contain"
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* BioCraft Brand Logo Image */}
      <View
        style={[
          styles.imageWrapper,
          {
            width: size,
            height: size,
            borderRadius,
          },
        ]}
      >
        <Image
          source={LOGO_SOURCE}
          style={[
            styles.logoImage,
            {
              width: size,
              height: size,
              borderRadius,
            },
          ]}
          resizeMode="cover"
        />
      </View>

      {/* Brand Text */}
      {showText ? (
        <Text style={[styles.brandText, { color: textColor }]}>
          Bio<Text style={styles.brandAccent}>Craft</Text>
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  brandText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginLeft: 10,
    letterSpacing: -0.5,
  },
  brandAccent: {
    color: '#16A34A',
  },
});
