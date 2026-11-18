import { StyleSheet, Text, View } from 'react-native';
import PixelCard from '../components/PixelCard';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

const FEATURES = [
  'Mascota virtual con necesidades que cambian con el tiempo.',
  'Drag & Drop con rotación direccional.',
  'Spinner y barra de progreso animados.',
  'Gestos simultáneos: pan, pinch y rotation.',
  'Bounce con física de resorte.',
  'Carrusel animado de seis expresiones.',
  'Detección de sacudidas con el acelerómetro.',
];

export default function AboutScreen() {
  return (
    <ScreenContainer>
      <ScreenHeader title="ACERCA DE" subtitle="TAMACHIMBO // RETRO PET PROJECT" />
      <PixelCard accent style={styles.hero}>
        <TamachimboCharacter expression="happy" size={160} showCaption />
        <Text style={styles.name}>TAMACHIMBO</Text>
        <Text style={styles.tagline}>UNA MASCOTA. SIETE EXPERIMENTOS. CERO ABURRIMIENTO.</Text>
      </PixelCard>
      <Text style={styles.heading}>¿QUÉ ES ESTO?</Text>
      <Text style={styles.paragraph}>Una pequeña mascota virtual inspirada en los juguetes digitales de los años 90. Cuídala papi, juega con ella y explora las interacciones construidas con React Native Reanimated y Gesture Handler.</Text>
      <Text style={styles.heading}>FUNCIONALIDADES</Text>
      <PixelCard style={styles.features}>
        {FEATURES.map((feature, index) => (
          <View key={feature} style={styles.featureRow}>
            <Text style={styles.featureNumber}>0{index + 1}</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </PixelCard>
      <Text style={styles.version}>AJA PAPI JUEGUE</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingVertical: 22 },
  name: { color: COLORS.white, fontSize: 19, fontWeight: '900', letterSpacing: 3, marginTop: 8 },
  tagline: { color: COLORS.red, fontSize: 8, fontWeight: '900', letterSpacing: 1, textAlign: 'center', marginTop: 8, lineHeight: 13 },
  heading: { color: COLORS.white, fontSize: 11, letterSpacing: 1.5, fontWeight: '900', marginTop: 22, marginBottom: 9 },
  paragraph: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19 },
  features: { paddingVertical: 6 },
  featureRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2B2B2B' },
  featureNumber: { color: COLORS.red, fontSize: 9, fontWeight: '900', marginRight: 12, marginTop: 2 },
  featureText: { color: COLORS.grayLight, fontSize: 11, lineHeight: 16, flex: 1 },
  version: { textAlign: 'center', color: '#555555', fontSize: 8, letterSpacing: 1.2, marginTop: 24, fontWeight: '800' },
});
