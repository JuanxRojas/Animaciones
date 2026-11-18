import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import PixelCard from '../components/PixelCard';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

export default function LoadingScreen() {
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1100 }), -1, false);
    progress.value = withRepeat(
      withSequence(withTiming(100, { duration: 3200 }), withTiming(0, { duration: 250 })),
      -1,
      false
    );
    return () => {
      cancelAnimation(rotation);
      cancelAnimation(progress);
    };
  }, [progress, rotation]);

  const spinnerStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));
  const progressStyle = useAnimatedStyle(() => ({ width: `${progress.value}%` }));

  return (
    <ScreenContainer>
      <ScreenHeader title="LOADING" subtitle="EJERCICIO 02 // INFINITE LOOP" />
      <View style={styles.center}>
        <PixelCard accent style={styles.card}>
          <TamachimboCharacter expression="normal" size={164} />
          <View style={styles.spinnerArea}>
            <Animated.View style={[styles.spinner, spinnerStyle]}>
              <View style={styles.spinnerCore} />
            </Animated.View>
          </View>
          <Text style={styles.loadingTitle}>TAMACHIMBO ESTÁ PENSANDO...</Text>
          <Text style={styles.loadingSubtitle}>CARGANDO DIVERSIÓN / SIGA ESPERANDO EL AMOR DE ELLA</Text>
          <View style={styles.progressHeader}><Text style={styles.progressLabel}>PROGRESO</Text><Text style={styles.progressLabel}>AUTO LOOP</Text></View>
          <View style={styles.track}><Animated.View style={[styles.fill, progressStyle]} /></View>
          <Text style={styles.footer}>NO APAGUES LA CONSOLA</Text>
        </PixelCard>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center' },
  card: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 18 },
  spinnerArea: { marginTop: 20, marginBottom: 18, width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  spinner: { width: 34, height: 34, borderRadius: 18, borderWidth: 4, borderColor: '#363636', borderTopColor: COLORS.red, borderRightColor: COLORS.red },
  spinnerCore: { position: 'absolute', width: 5, height: 5, borderRadius: 3, backgroundColor: COLORS.white, top: 10, left: 10 },
  loadingTitle: { color: COLORS.white, fontSize: 12, fontWeight: '900', letterSpacing: 1.2, textAlign: 'center' },
  loadingSubtitle: { color: COLORS.grayLight, fontSize: 8, letterSpacing: 1, textAlign: 'center', marginTop: 8, lineHeight: 15 },
  progressHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 8 },
  progressLabel: { color: '#8D8D8D', fontSize: 8, letterSpacing: 1, fontWeight: '900' },
  track: { height: 10, width: '100%', backgroundColor: '#303030', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: COLORS.red, borderRadius: 3 },
  footer: { color: '#555555', fontSize: 8, letterSpacing: 1.5, marginTop: 22, fontWeight: '900' },
});
