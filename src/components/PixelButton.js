import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme';

export default function PixelButton({ title, icon, onPress, variant = 'primary', style, disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' ? styles.secondary : null,
        variant === 'ghost' ? styles.ghost : null,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <Text style={[styles.title, variant === 'secondary' && styles.secondaryTitle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: COLORS.red,
    borderWidth: 1,
    borderColor: '#FF4148',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  secondary: { backgroundColor: COLORS.surfaceAlt, borderColor: '#4A4A4A' },
  ghost: { backgroundColor: 'transparent', borderColor: '#383838' },
  pressed: { opacity: 0.76, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
  icon: { alignItems: 'center', justifyContent: 'center' },
  title: { color: COLORS.white, fontWeight: '900', fontSize: 11, letterSpacing: 1 },
  secondaryTitle: { color: COLORS.grayLight },
});
