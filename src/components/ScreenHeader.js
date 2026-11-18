import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PixelIcon from './PixelIcon';
import { COLORS } from '../theme';

export default function ScreenHeader({ title = 'TAMACHIMBO', subtitle, right }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.openDrawer?.()} style={styles.menu} accessibilityRole="button" accessibilityLabel="Abrir menú">
        <PixelIcon name="menu" size={21} color={COLORS.white} />
      </Pressable>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right || <View style={styles.status}><View style={styles.dot} /><Text style={styles.online}>ONLINE</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', minHeight: 54, marginBottom: 15 },
  menu: { width: 42, height: 42, borderRadius: 10, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: '#343434', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  textGroup: { flex: 1 },
  title: { color: COLORS.white, fontSize: 16, fontWeight: '900', letterSpacing: 1.6 },
  subtitle: { color: COLORS.grayLight, fontSize: 9, letterSpacing: 1.3, marginTop: 3 },
  status: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#72D69A' },
  online: { color: '#72D69A', fontSize: 8, fontWeight: '900', letterSpacing: 1 },
});
