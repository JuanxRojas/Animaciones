import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function PixelCard({ children, style, accent = false }) {
  return (
    <View style={[styles.card, accent && styles.accent, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 13,
    padding: 15,
  },
  accent: { borderColor: COLORS.red, borderWidth: 1.5 },
});
