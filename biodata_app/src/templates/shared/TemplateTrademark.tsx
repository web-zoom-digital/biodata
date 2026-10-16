import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  color?: string;
  style?: ViewStyle;
}

export const TemplateTrademark: React.FC<Props> = ({
  color = '#94A3B8',
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, { color }]}>zoomdigital™</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 7.5,
    fontWeight: '600',
    letterSpacing: 0.6,
    opacity: 0.6,
  },
});
