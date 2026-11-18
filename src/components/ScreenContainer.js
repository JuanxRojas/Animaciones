import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function ScreenContainer({ children, scroll = true, contentStyle }) {
  if (!scroll) {
    return <View style={[styles.fixed, contentStyle]}>{children}</View>;
  }
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, contentStyle]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.black },
  content: { paddingHorizontal: 18, paddingTop: 14, paddingBottom: 34, flexGrow: 1 },
  fixed: { flex: 1, backgroundColor: COLORS.black, paddingHorizontal: 18, paddingTop: 14, paddingBottom: 24 },
});
