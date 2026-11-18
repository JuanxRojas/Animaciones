import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

// Sprite original dibujado con una cuadrícula de píxeles: no requiere imágenes externas.
const BASE = [
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '...HHHHHHHHHH...',
  '..HHHHHHHHHHHH..',
  '..HSSSSSSSSSSSH.',
  '.HSSSSSSSSSSSSSH',
  '.HSSSSSSSSSSSSSH',
  '.HSSSSSSSSSSSSSH',
  '.HSSSSSSSSSSSSSH',
  '..HSSSSSSSSSSSH.',
  '...HHHHHHHHHH...',
  '.....SSSSS......',
  '.....SSSSS......',
  '....RRRRRRR.....',
  '...RRRRRRRRR....',
  '...RRR...RRR....',
  '..RRRR....RRRR..',
];

const PALETTE = {
  H: '#242027',
  S: '#F3B58F',
  R: '#E50914',
};

const FACE = {
  normal: {
    pixels: { '6,7': '#171313', '10,7': '#171313', '6,6': '#FFFFFF', '10,6': '#FFFFFF', '8,9': '#8B3E39', '9,9': '#8B3E39' },
  },
  happy: {
    pixels: { '5,7': '#171313', '6,7': '#171313', '10,7': '#171313', '11,7': '#171313', '7,9': '#8B3E39', '8,10': '#8B3E39', '9,10': '#8B3E39', '10,9': '#8B3E39' },
  },
  hungry: {
    pixels: { '6,7': '#171313', '10,7': '#171313', '6,6': '#FFFFFF', '10,6': '#FFFFFF', '8,9': '#6D2020', '9,9': '#6D2020', '8,10': '#E85D75', '9,10': '#E85D75' },
  },
  sad: {
    pixels: { '6,7': '#171313', '10,7': '#171313', '6,6': '#FFFFFF', '10,6': '#FFFFFF', '7,10': '#8B3E39', '8,9': '#8B3E39', '9,9': '#8B3E39', '10,10': '#8B3E39', '5,9': '#70C8F0', '11,9': '#70C8F0' },
  },
  angry: {
    pixels: { '5,6': '#171313', '6,7': '#171313', '10,7': '#171313', '11,6': '#171313', '6,6': '#8B3E39', '10,6': '#8B3E39', '7,10': '#8B3E39', '8,10': '#8B3E39', '9,10': '#8B3E39' },
  },
  dizzy: {
    pixels: { '5,6': '#FFFFFF', '6,6': '#171313', '7,6': '#FFFFFF', '9,6': '#FFFFFF', '10,6': '#171313', '11,6': '#FFFFFF', '5,7': '#171313', '6,8': '#FFFFFF', '7,7': '#171313', '9,7': '#171313', '10,8': '#FFFFFF', '11,7': '#171313', '8,10': '#8B3E39', '9,10': '#8B3E39' },
  },
  sleepy: {
    pixels: { '5,7': '#171313', '6,7': '#171313', '10,7': '#171313', '11,7': '#171313', '8,10': '#8B3E39', '9,10': '#8B3E39' },
  },
  surprised: {
    pixels: { '5,6': '#FFFFFF', '6,6': '#171313', '7,6': '#FFFFFF', '9,6': '#FFFFFF', '10,6': '#171313', '11,6': '#FFFFFF', '7,9': '#6D2020', '8,9': '#6D2020', '9,9': '#6D2020', '8,10': '#6D2020' },
  },
};

const SPEECH = {
  normal: '', happy: '', hungry: '', sad: '', angry: '', dizzy: '', sleepy: 'Z z', surprised: '!',
};

export default function TamachimboCharacter({ expression = 'normal', size = 230, showCaption = false }) {
  const sprite = useMemo(() => {
    const face = FACE[expression] || FACE.normal;
    return BASE.map((line, row) => line.split('').map((token, col) => {
      const override = face.pixels[`${col},${row}`];
      if (override) return override;
      return PALETTE[token] || 'transparent';
    }));
  }, [expression]);

  const cell = size / 16;
  const speech = SPEECH[expression] || '';

  return (
    <View style={styles.wrapper}>
      <View style={{ width: size, height: size * (17 / 16), alignItems: 'center', justifyContent: 'center' }}>
        {speech ? <Text style={[styles.speech, { top: 2, right: 4, fontSize: size * 0.11 }]}>{speech}</Text> : null}
        <View style={{ width: size, height: size * (17 / 16), flexDirection: 'column' }}>
          {sprite.map((row, rowIndex) => (
            <View key={`sprite-row-${rowIndex}`} style={{ height: cell, flexDirection: 'row' }}>
              {row.map((pixel, colIndex) => (
                <View
                  key={`sprite-${rowIndex}-${colIndex}`}
                  style={{ width: cell, height: cell, backgroundColor: pixel }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
      {showCaption ? <Text style={styles.caption}>TAMACHIMBO.EXE</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', justifyContent: 'center' },
  speech: { position: 'absolute', zIndex: 2, color: COLORS.red, fontWeight: '900' },
  caption: { marginTop: 8, color: COLORS.grayLight, fontSize: 9, letterSpacing: 3, fontWeight: '900' },
});
