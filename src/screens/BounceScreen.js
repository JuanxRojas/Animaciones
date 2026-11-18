import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import PixelCard from '../components/PixelCard';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

export default function BounceScreen() {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const pressIn = () => { scale.value = withTiming(0.78, { duration: 120 }); };
  const pressOut = () => { scale.value = withSpring(1, { damping: 5, stiffness: 180, mass: 0.6 }); };

  return (
    <ScreenContainer>
      <ScreenHeader title="BOUNCE MODE" subtitle="EJERCICIO 04 // SPRING" />
      <Text style={styles.description}>Mantén presionado a Tamachimbo para aplastarlo. Al soltar, rebotará con una animación elástica.</Text>
      <PixelCard accent style={styles.stage}>
        <Pressable onPressIn={pressIn} onPressOut={pressOut} accessibilityRole="button" accessibilityLabel="Mantener presionado a Tamachimbo">
          <Animated.View style={[styles.character, animatedStyle]}>
            <TamachimboCharacter expression="angry" size={202} />
          </Animated.View>
        </Pressable>
        <Text style={styles.hint}>TOCA Y MANTÉN PRESIONADO</Text>
      </PixelCard>
      <View style={styles.message}><Text style={styles.messageText}>“¡NO ME APLASTES, PARCE!”</Text></View>
      <Text style={styles.note}>Interacción repetible con withSpring: damping 5 / stiffness 180.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19, marginBottom: 16 },
  stage: { height: 420, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  character: { padding: 10 },
  hint: { position: 'absolute', bottom: 18, color: COLORS.red, fontSize: 9, letterSpacing: 1.3, fontWeight: '900' },
  message: { marginTop: 20, backgroundColor: '#25090B', borderColor: COLORS.redDark, borderWidth: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
  messageText: { color: COLORS.white, fontWeight: '900', letterSpacing: 1.2, fontSize: 12 },
  note: { marginTop: 12, textAlign: 'center', color: '#777777', fontSize: 10 },
});
