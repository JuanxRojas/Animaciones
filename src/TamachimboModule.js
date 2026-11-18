import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamachimboNavigator } from './navigation/TamachimboNavigator';
import { COLORS } from './theme';

/**
 * Componente raíz listo para renderizar cuando TAMACHIMBO será el módulo principal.
 * Si la app ya tiene NavigationContainer o GestureHandlerRootView, utiliza
 * TamachimboNavigator directamente y evita anidar esos providers.
 */
export default function TamachimboModule({ initialRouteName = 'Inicio' }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.black} />
      <NavigationContainer>
        <TamachimboNavigator initialRouteName={initialRouteName} />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, backgroundColor: COLORS.black } });
