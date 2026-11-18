import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, interpolate } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import PixelCard from '../components/PixelCard';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

export default function DragRotationScreen() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = Math.max(-145, Math.min(145, startX.value + event.translationX));
      y.value = Math.max(-150, Math.min(150, startY.value + event.translationY));
      rotation.value = interpolate(event.translationX, [-140, 0, 140], [-0.32, 0, 0.32]);
    })
    .onEnd(() => {
      rotation.value = withSpring(0, { damping: 10, stiffness: 150 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { rotate: `${rotation.value}rad` }],
  }));

  return (
    <ScreenContainer>
      <ScreenHeader title="DRAG & DROP" subtitle="EJERCICIO 01 // ROTATION" />
      <Text style={styles.description}>¡Arrastra a Tamachimbo! Muévelo por el espacio y observa cómo se inclina según la dirección.</Text>
      <PixelCard accent style={styles.stage}>
        <View style={styles.crosshair}><View style={styles.horizontal} /><View style={styles.vertical} /></View>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.character, animatedStyle]}>
            <TamachimboCharacter expression="happy" size={176} />
          </Animated.View>
        </GestureDetector>
        <Text style={styles.hint}>MANTÉN PRESIONADO + ARRASTRA</Text>
      </PixelCard>
      <Text style={styles.note}>Al soltarlo, la rotación vuelve suavemente a cero. La posición que elegiste se conserva.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19, marginBottom: 16 },
  stage: { height: 470, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 },
  character: { zIndex: 2, alignItems: 'center', justifyContent: 'center' },
  crosshair: { position: 'absolute', width: '100%', height: '100%', opacity: 0.25, alignItems: 'center', justifyContent: 'center' },
  horizontal: { position: 'absolute', height: 1, width: '100%', backgroundColor: COLORS.red },
  vertical: { position: 'absolute', width: 1, height: '100%', backgroundColor: COLORS.red },
  hint: { position: 'absolute', bottom: 16, color: COLORS.red, fontSize: 9, letterSpacing: 1.2, fontWeight: '900' },
  note: { marginTop: 13, color: '#747474', fontSize: 10, lineHeight: 16, textAlign: 'center' },
});
