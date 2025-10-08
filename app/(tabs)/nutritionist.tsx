import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MessageCircle, Sparkles, Clock, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

export default function NutritionistScreen() {
  const suggestions = [
    'Como substituir leite em receitas?',
    'Quais alimentos são ricos em cálcio?',
    'Receita de bolo sem lactose',
    'Alternativas ao queijo',
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            <LinearGradient
              colors={Colors.gradient.secondary}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Sparkles size={48} color={Colors.surface} strokeWidth={2} />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Nutricionista IA</Text>
          <Text style={styles.subtitle}>
            Tire suas dúvidas sobre alimentação sem lactose com nossa IA
            especializada
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <MessageCircle size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>24/7</Text>
            <Text style={styles.statLabel}>Disponível</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Clock size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>Instant</Text>
            <Text style={styles.statLabel}>Respostas</Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <TrendingUp size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Sem Lactose</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas Sugeridas</Text>
          <View style={styles.suggestionsContainer}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionCard}
                activeOpacity={0.7}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
                <MessageCircle
                  size={20}
                  color={Colors.primary}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>O que posso fazer por você</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Sparkles size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Orientação Nutricional</Text>
              <Text style={styles.featureDescription}>
                Receba dicas personalizadas sobre alimentação sem lactose
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <MessageCircle size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Substituições Inteligentes</Text>
              <Text style={styles.featureDescription}>
                Aprenda a substituir ingredientes com lactose em suas receitas
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <TrendingUp size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Planos Alimentares</Text>
              <Text style={styles.featureDescription}>
                Crie planos de refeições balanceados e sem lactose
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} activeOpacity={0.8}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.startButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MessageCircle size={24} color={Colors.surface} strokeWidth={2.5} />
            <Text style={styles.startButtonText}>Iniciar Conversa</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Sparkles size={20} color={Colors.primary} strokeWidth={2} />
          <Text style={styles.infoText}>
            Integração com IA Gemini será adicionada em breve
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
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 24,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.tertiary,
    textAlign: 'center' as const,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  suggestionsContainer: {
    gap: 12,
  },
  suggestionCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    fontWeight: '500' as const,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  featureCard: {
    flexDirection: 'row' as const,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '30',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.text.tertiary,
    lineHeight: 20,
  },
  startButton: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  startButtonGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 18,
    gap: 12,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  infoBox: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.primaryLight + '20',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 20,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
});
