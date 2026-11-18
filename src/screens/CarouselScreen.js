import React, { useRef } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import PixelCard from '../components/PixelCard';
import TamachimboCharacter from '../components/TamachimboCharacter';
import { COLORS } from '../theme';

const EXPRESSIONS = [
  { id: 'happy', name: 'FELIZ', expression: 'happy', description: 'Todo está saliendo de maravilla.' },
  { id: 'angry', name: 'ENOJADO', expression: 'angry', description: 'No le quites su snack favorito.' },
  { id: 'sad', name: 'TRISTE', expression: 'sad', description: 'Necesita un poco de cariño.' },
  { id: 'surprised', name: 'SORPRENDIDO', expression: 'surprised', description: '¡No se esperaba esa sorpresa!' },
  { id: 'sleepy', name: 'DORMIDO', expression: 'sleepy', description: 'Está soñando con arepitas.' },
  { id: 'dizzy', name: 'MAREADO', expression: 'dizzy', description: 'Alguien movió mucho la consola.' },
];

function ExpressionCard({ item, index, scrollX, itemSize }) {
  const animatedStyle = useAnimatedStyle(() => {
    const center = index * itemSize;
    const distance = (scrollX.value - center) / itemSize;
    const scale = interpolate(distance, [-1, 0, 1], [0.82, 1, 0.82], Extrapolation.CLAMP);
    const rotate = interpolate(distance, [-1, 0, 1], [-7, 0, 7], Extrapolation.CLAMP);
    const opacity = interpolate(distance, [-1.2, 0, 1.2], [0.55, 1, 0.55], Extrapolation.CLAMP);
    return { transform: [{ scale }, { rotate: `${rotate}deg` }], opacity };
  });

  return (
    <Animated.View style={[styles.cardWrap, { width: CARD_WIDTH }, animatedStyle]}>
      <PixelCard accent style={styles.expressionCard}>
        <Text style={styles.number}>EXPRESSION // 0{index + 1}</Text>
        <View style={styles.spriteArea}><TamachimboCharacter expression={item.expression} size={174} /></View>
        <Text style={styles.expressionName}>{item.name}</Text>
        <Text style={styles.expressionDescription}>{item.description}</Text>
      </PixelCard>
    </Animated.View>
  );
}

const CARD_WIDTH = 258;
const GAP = 16;
const ITEM_SIZE = CARD_WIDTH + GAP;

export default function CarouselScreen() {
  const scrollX = useSharedValue(0);
  const listRef = useRef(null);
  const { width } = useWindowDimensions();
  const sidePadding = Math.max(12, (width - CARD_WIDTH) / 2);
  const onScroll = useAnimatedScrollHandler({ onScroll: (event) => { scrollX.value = event.contentOffset.x; } });

  return (
    <ScreenContainer>
      <ScreenHeader title="EXPRESSION LAB" subtitle="EJERCICIO 05 // ANIMATED CAROUSEL" />
      <Text style={styles.description}>Desliza horizontalmente para explorar los distintos estados de Tamachimbo. La tarjeta del centro crece y rota suavemente.</Text>
      <View style={styles.carouselArea}>
        <Animated.FlatList
          ref={listRef}
          data={EXPRESSIONS}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          disableIntervalMomentum
          contentContainerStyle={{ paddingHorizontal: sidePadding, paddingVertical: 25 }}
          ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
          onScroll={onScroll}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => <ExpressionCard item={item} index={index} scrollX={scrollX} itemSize={ITEM_SIZE} />}
          getItemLayout={(_, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })}
        />
      </View>
      <Text style={styles.footer}>06 FORMAS DE SER. UN SOLO CHIMBO.</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  description: { color: COLORS.grayLight, fontSize: 12, lineHeight: 19 },
  carouselArea: { marginTop: 14, marginHorizontal: -18 },
  cardWrap: { minHeight: 385 },
  expressionCard: { height: 370, alignItems: 'center', padding: 14, borderColor: '#623034' },
  number: { color: COLORS.red, fontSize: 8, fontWeight: '900', letterSpacing: 1.5 },
  spriteArea: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  expressionName: { color: COLORS.white, fontSize: 14, fontWeight: '900', letterSpacing: 2, marginTop: 8 },
  expressionDescription: { color: COLORS.grayLight, fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 8, minHeight: 30 },
  footer: { textAlign: 'center', color: '#777777', fontSize: 9, letterSpacing: 1.5, fontWeight: '900', marginTop: 12 },
});
