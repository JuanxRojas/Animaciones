import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import PixelButton from '../components/PixelButton';
import PixelCard from '../components/PixelCard';
import PixelIcon from '../components/PixelIcon';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

export default function MultitouchScreen() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const startScale = useSharedValue(1);
  const startRotation = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => { startX.value = translateX.value; startY.value = translateY.value; })
    .onUpdate((event) => {
      translateX.value = Math.max(-125, Math.min(125, startX.value + event.translationX));
      translateY.value = Math.max(-145, Math.min(145, startY.value + event.translationY));
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => { startScale.value = scale.value; })
    .onUpdate((event) => { scale.value = Math.max(0.65, Math.min(2.3, startScale.value * event.scale)); });

  const rotate = Gesture.Rotation()
    .onBegin(() => { startRotation.value = rotation.value; })
    .onUpdate((event) => { rotation.value = startRotation.value + event.rotation; });

  const combined = Gesture.Simultaneous(pan, pinch, rotate);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotation.value}rad` },
    ],
  }));

  const reset = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotation.value = withTiming(0, { duration: 220 });
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="MULTITOUCH" subtitle="EJERCICIO 03 // PINCH + PAN + ROTATION" />
      <Text style={styles.description}>Usa dos dedos para hacer zoom y rotar. También puedes desplazar a Tamachimbo por el área.</Text>
      <PixelCard accent style={styles.stage}>
        <View style={styles.cornerTL} /><View style={styles.cornerBR} />
        <GestureDetector gesture={combined}>
          <Animated.View style={[styles.character, animatedStyle]}>
            <TamachimboCharacter expression="surprised" size={188} />
          </Animated.View>
        </GestureDetector>
        <Text style={styles.hint}>AGRANDE PERO CON CUIDADO</Text>
      </PixelCard>
      <PixelButton title="RESTABLECER POSICIÓN" variant="secondary" icon={<PixelIcon name="reset" color={COLORS.white} size={18} />} onPress={reset} style={styles.reset} />
      <Text style={styles.note}>Zoom limitado entre 65% y 230% para mantener el personaje visible.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19, marginBottom: 15 },
  stage: { height: 455, padding: 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  character: { alignItems: 'center', justifyContent: 'center' },
  hint: { position: 'absolute', bottom: 15, color: COLORS.red, fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  cornerTL: { position: 'absolute', left: 12, top: 12, width: 18, height: 18, borderLeftWidth: 2, borderTopWidth: 2, borderColor: COLORS.red },
  cornerBR: { position: 'absolute', right: 12, bottom: 12, width: 18, height: 18, borderRightWidth: 2, borderBottomWidth: 2, borderColor: COLORS.red },
  reset: { marginTop: 14 },
  note: { marginTop: 10, color: '#777777', fontSize: 10, textAlign: 'center' },
});
