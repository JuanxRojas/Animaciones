import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import PixelCard from '../components/PixelCard';
import TamachimboCharacter from '../components/TamachimboCharacter';
import StatusBar from '../components/StatusBar';
import ActionButton from '../components/ActionButton';
import PixelIcon from '../components/PixelIcon';
import { usePet } from '../context/PetContext';
import { COLORS } from '../theme';

export default function HomeScreen() {
  const { pet, feedback, expression, performAction } = usePet();
  const headerRight = (
    <View style={styles.headerRight}>
      <View style={styles.coinPill}><PixelIcon name="coin" size={14} color="#F2C14E" /><Text style={styles.coinText}>{pet.coins}</Text></View>
      <Text style={styles.levelText}>LVL {pet.level}</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <ScreenHeader title="TAMACHIMBO" subtitle="MASCOTA DIGITAL // 199X" right={headerRight} />

      <PixelCard accent style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.liveTag}><View style={styles.liveDot} /><Text style={styles.liveText}>VIVO</Text></View>
          <Text style={styles.heroId}>NO. 001 / BOGOTÁ</Text>
        </View>
        <View style={styles.characterArea}>
          <View style={styles.glow} />
          <TamachimboCharacter expression={expression} size={218} showCaption />
        </View>
        <View style={styles.speechBubble}><Text style={styles.feedback}>{feedback}</Text></View>
      </PixelCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ESTADO DEL CHIMBO</Text>
        <Text style={styles.sectionMeta}>AUTO UPDATE</Text>
      </View>
      <PixelCard style={styles.statsCard}>
        <StatusBar label="HAMBRE" value={pet.hunger} color={pet.hunger > 70 ? COLORS.red : '#E89B43'} />
        <StatusBar label="FELICIDAD" value={pet.happiness} color="#E8C54B" />
        <StatusBar label="ENERGÍA" value={pet.energy} color="#71C9E7" />
        <View style={styles.hygieneLine}><Text style={styles.hygieneLabel}>HIGIENE</Text><Text style={styles.hygieneValue}>{Math.round(pet.hygiene)}%</Text></View>
      </PixelCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>¿QUÉ HACEMOS?</Text>
        <Text style={styles.sectionMeta}>4 ACCIONES</Text>
      </View>
      <View style={styles.actionsGrid}>
        <ActionButton label="COMER" icon="food" onPress={() => performAction('eat')} />
        <ActionButton label="JUGAR" icon="play" onPress={() => performAction('play')} />
        <ActionButton label="BAÑAR" icon="bath" onPress={() => performAction('bath')} />
        <ActionButton label="DORMIR" icon="sleep" onPress={() => performAction('sleep')} />
      </View>
      <Text style={styles.footer}>CUIDA A TU TAMACHIMBO. NO LO DEJES EN MODO TRISTE.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  headerRight: { alignItems: 'flex-end', gap: 5 },
  coinPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: COLORS.surface, borderColor: '#4C3D20', borderWidth: 1, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5 },
  coinText: { color: '#F2C14E', fontWeight: '900', fontSize: 11 },
  levelText: { color: COLORS.grayLight, fontWeight: '900', fontSize: 8, letterSpacing: 1 },
  hero: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  liveTag: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#1A2B20', borderRadius: 4, paddingHorizontal: 7, paddingVertical: 4 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#73D69A' },
  liveText: { color: '#73D69A', fontWeight: '900', fontSize: 8, letterSpacing: 1 },
  heroId: { color: '#686868', fontWeight: '800', fontSize: 8, letterSpacing: 1 },
  characterArea: { minHeight: 260, alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', width: 190, height: 190, borderRadius: 100, backgroundColor: '#28090B', opacity: 0.65 },
  speechBubble: { alignSelf: 'center', backgroundColor: '#242424', borderRadius: 8, borderWidth: 1, borderColor: '#393939', paddingHorizontal: 14, paddingVertical: 8, minWidth: 175, alignItems: 'center' },
  feedback: { color: COLORS.white, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  sectionHeader: { marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: COLORS.white, fontSize: 11, letterSpacing: 1.5, fontWeight: '900' },
  sectionMeta: { color: COLORS.red, fontSize: 8, letterSpacing: 1, fontWeight: '900' },
  statsCard: { paddingVertical: 14 },
  hygieneLine: { borderTopWidth: 1, borderTopColor: '#303030', paddingTop: 9, marginTop: 1, flexDirection: 'row', justifyContent: 'space-between' },
  hygieneLabel: { color: COLORS.grayLight, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  hygieneValue: { color: COLORS.grayLight, fontSize: 9, fontWeight: '800' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  footer: { color: '#5C5C5C', fontSize: 8, textAlign: 'center', letterSpacing: 1.3, fontWeight: '800', marginTop: 22 },
});
