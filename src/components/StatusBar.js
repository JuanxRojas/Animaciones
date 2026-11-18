import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, clamp } from '../theme';

export default function StatusBar({ label, value, color = COLORS.red, hint }) {
  const safeValue = clamp(value);
  return (
    <View style={styles.wrapper}>
      <View style={styles.topLine}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{Math.round(safeValue)}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${safeValue}%`, backgroundColor: color }]} />
      </View>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  topLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { color: COLORS.grayLight, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  value: { color: COLORS.white, fontSize: 10, fontWeight: '800', fontVariant: ['tabular-nums'] },
  track: { height: 8, backgroundColor: '#303030', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  hint: { color: COLORS.muted, fontSize: 9, marginTop: 3 },
});
