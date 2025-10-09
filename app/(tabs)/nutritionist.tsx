import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Brain, Sparkles, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Stack, useRouter } from 'expo-router';

export default function NutritionistScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Inteligência Artificial</Text>
          <Text style={styles.subtitle}>
            Ferramentas de IA para sua jornada nutricional sem lactose
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🤖 Assistentes de IA</Text>
          
          <TouchableOpacity style={styles.aiCard} activeOpacity={0.9} onPress={() => router.push('/nutritionist-chat' as any)}>
            <View style={styles.aiIconContainer}>
              <View style={[styles.aiIcon, { backgroundColor: '#FFE5E5' }]}>
                <Brain size={28} color='#FF6B6B' strokeWidth={2} />
              </View>
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>Nutricionista IA</Text>
              <Text style={styles.aiDescription}>
                Converse com nossa IA especializada em nutrição sem lactose
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aiCard} activeOpacity={0.9} onPress={() => router.push('/recipe-generator' as any)}>
            <View style={styles.aiIconContainer}>
              <View style={[styles.aiIcon, { backgroundColor: '#E0F2FE' }]}>
                <BookOpen size={28} color='#0EA5E9' strokeWidth={2} />
              </View>
            </View>
            <View style={styles.aiContent}>
              <Text style={styles.aiTitle}>Gerador de Receitas</Text>
              <Text style={styles.aiDescription}>
                IA cria receitas personalizadas baseadas em seus ingredientes
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.versionCard}>
          <Text style={styles.versionTitle}>LacNutry v1.0</Text>
          <Text style={styles.versionDescription}>
            Sua jornada nutricional sem lactose começa aqui
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
    paddingBottom: 120,
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 24,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  aiCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  aiIconContainer: {
    marginBottom: 16,
  },
  aiIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  aiContent: {
    gap: 8,
  },
  aiTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  aiDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  versionCard: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  versionTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.primary,
    marginBottom: 8,
  },
  versionDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
  },
});
