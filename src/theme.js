export const COLORS = {
  black: '#080808',
  surface: '#151515',
  surfaceAlt: '#1D1D1D',
  red: '#E50914',
  redDark: '#8B0000',
  gray: '#242424',
  grayLight: '#BDBDBD',
  white: '#FFFFFF',
  muted: '#777777',
  green: '#73D69A',
  yellow: '#F2C14E',
  skin: '#F3B58F',
};

export const SPACING = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
};

export const clamp = (value, min = 0, max = 100) =>
  Math.min(max, Math.max(min, value));
