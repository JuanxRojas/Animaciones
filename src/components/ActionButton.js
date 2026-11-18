import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import PixelIcon from './PixelIcon';
import { COLORS } from '../theme';

export default function ActionButton({ label, icon, onPress }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <View style={styles.iconBox}><PixelIcon name={icon} size={25} color={COLORS.white} /></View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: '48%', minHeight: 78, backgroundColor: COLORS.surface, borderColor: '#393939', borderWidth: 1, borderRadius: 11, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBox: { width: 42, height: 42, backgroundColor: '#2B1012', borderRadius: 8, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.redDark },
  label: { color: COLORS.white, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  pressed: { borderColor: COLORS.red, transform: [{ scale: 0.98 }] },
});
