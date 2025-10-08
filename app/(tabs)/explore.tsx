import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Heart } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Stack } from 'expo-router';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Favoritos</Text>
        </View>

        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Heart size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
          </View>
          <Text style={styles.emptyTitle}>Carregando favoritos...</Text>
          <Text style={styles.emptyDescription}>
            Suas receitas favoritas aparecerão aqui
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.text.primary,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center' as const,
  },
  emptyDescription: {
    fontSize: 15,
    color: Colors.text.tertiary,
    textAlign: 'center' as const,
    lineHeight: 22,
  },
});
