import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import PixelCard from '../components/PixelCard';
import TamachimboCharacter from '../components/TamachimboCharacter';
import PixelButton from '../components/PixelButton';
import PixelIcon from '../components/PixelIcon';
import useShakeDetector from '../hooks/useShakeDetector';
import { usePet } from '../context/PetContext';
import { COLORS } from '../theme';

export default function AccelerometerScreen() {
  const [shakeCount, setShakeCount] = useState(0);
  const [detected, setDetected] = useState(false);
  const detectedTimeout = useRef(null);
  const shakeX = useSharedValue(0);
  const { reactTemporarily } = usePet();

  const onShake = useCallback(() => {
    setShakeCount((count) => count + 1);
    setDetected(true);
    reactTemporarily('dizzy', '¡Uy, parce! ¡Qué movimiento!', 1900);
    shakeX.value = withSequence(
      withTiming(-12, { duration: 45 }),
      withTiming(12, { duration: 45 }),
      withTiming(-9, { duration: 45 }),
      withTiming(9, { duration: 45 }),
      withSpring(0, { damping: 5, stiffness: 180 })
    );
    if (detectedTimeout.current) clearTimeout(detectedTimeout.current);
    detectedTimeout.current = setTimeout(() => setDetected(false), 1100);
  }, [reactTemporarily, shakeX]);

  const { available, error } = useShakeDetector(onShake, { threshold: 0.9, cooldownMs: 1300, intervalMs: 100 });

  useEffect(() => () => {
    if (detectedTimeout.current) clearTimeout(detectedTimeout.current);
    cancelAnimation(shakeX);
  }, [shakeX]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shakeX.value }, { rotate: `${shakeX.value / 100}rad` }] }));

  return (
    <ScreenContainer>
      <ScreenHeader title="SHAKE IT!" subtitle="EJERCICIO 06 // ACCELEROMETER" />
      <Text style={styles.description}>¡Sacúdeme y mira qué pasa! El acelerómetro del dispositivo detecta movimientos bruscos y activa una reacción.</Text>
      <PixelCard accent style={styles.stage}>
        <View style={[styles.sensorBadge, detected && styles.sensorBadgeActive]}>
          <View style={[styles.sensorDot, detected && styles.sensorDotActive]} />
          <Text style={[styles.sensorText, detected && styles.sensorTextActive]}>{detected ? 'MOVIMIENTO DETECTADO' : 'SENSOR EN ESCUCHA'}</Text>
        </View>
        <Animated.View style={[styles.character, animatedStyle]}>
          <TamachimboCharacter expression={detected ? 'dizzy' : 'surprised'} size={196} />
        </Animated.View>
        <Text style={styles.count}>SACUDIDAS: {shakeCount}</Text>
      </PixelCard>
      <View style={styles.sensorInfo}>
        <Text style={styles.infoLabel}>ESTADO DEL ACELERÓMETRO</Text>
        <Text style={styles.infoValue}>{available === null ? 'COMPROBANDO...' : available ? 'DISPONIBLE' : 'NO DISPONIBLE'}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {available === false ? <Text style={styles.note}>Parece que este dispositivo o entorno no ofrece el sensor. Usa el botón para probar la animación.</Text> : <Text style={styles.note}>Prueba en un dispositivo físico. Sensibilidad: 0.9 / cooldown: 1.3 s.</Text>}
      </View>
      <PixelButton title="PROBAR ANIMACIÓN" variant="secondary" icon={<PixelIcon name="sensor" color={COLORS.white} size={18} />} onPress={onShake} style={styles.demoButton} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19, marginBottom: 15 },
  stage: { height: 390, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  sensorBadge: { position: 'absolute', top: 14, flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: '#222222', borderRadius: 15, paddingHorizontal: 11, paddingVertical: 7, borderWidth: 1, borderColor: '#454545' },
  sensorBadgeActive: { backgroundColor: '#2A0D0F', borderColor: COLORS.red },
  sensorDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: '#73D69A' },
  sensorDotActive: { backgroundColor: COLORS.red },
  sensorText: { fontSize: 8, fontWeight: '900', color: COLORS.grayLight, letterSpacing: 1 },
  sensorTextActive: { color: '#FF777C' },
  character: { marginTop: 15 },
  count: { position: 'absolute', bottom: 17, color: COLORS.red, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  sensorInfo: { marginTop: 16, backgroundColor: COLORS.surface, borderRadius: 9, padding: 13, borderWidth: 1, borderColor: '#333333' },
  infoLabel: { color: '#777777', fontSize: 8, fontWeight: '900', letterSpacing: 1.3 },
  infoValue: { color: COLORS.white, fontSize: 12, fontWeight: '900', marginTop: 5 },
  note: { color: COLORS.grayLight, fontSize: 10, lineHeight: 15, marginTop: 7 },
  error: { color: '#FF777C', fontSize: 10, marginTop: 6 },
  demoButton: { marginTop: 13 },
});
