import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Search, Clock, Users, TrendingUp, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { featuredRecipes } from '@/mocks/recipes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function HomeScreen() {
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());

  const toggleLike = (recipeId: string) => {
    setLikedRecipes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.title}>O que vamos cozinhar hoje?</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Search size={20} color={Colors.text.tertiary} strokeWidth={2} />
          <Text style={styles.searchPlaceholder}>
            Buscar receitas sem lactose...
          </Text>
        </TouchableOpacity>

        <View style={styles.quickStats}>
          <LinearGradient
            colors={Colors.gradient.secondary}
            style={styles.statCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <TrendingUp size={24} color={Colors.surface} strokeWidth={2} />
            <Text style={styles.statValue}>100%</Text>
            <Text style={styles.statLabel}>Sem Lactose</Text>
          </LinearGradient>

          <View style={[styles.statCard, styles.statCardWhite]}>
            <View style={styles.statIcon}>
              <Clock size={24} color={Colors.primary} strokeWidth={2} />
            </View>
            <Text style={styles.statValueDark}>150+</Text>
            <Text style={styles.statLabelDark}>Receitas</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Receitas em Destaque</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recipesContainer}>
            {featuredRecipes.map((recipe) => (
              <View key={recipe.id} style={styles.recipeCard}>
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.recipeGradient}
                >
                  <View style={styles.recipeContent}>
                    <View style={styles.recipeTags}>
                      <View style={styles.tag}>
                        <Text style={styles.tagText}>{recipe.difficulty}</Text>
                      </View>
                      <View style={styles.tag}>
                        <Clock size={12} color={Colors.surface} strokeWidth={2} />
                        <Text style={styles.tagText}>{recipe.prepTime} min</Text>
                      </View>
                    </View>

                    <Text style={styles.recipeTitle} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    <Text style={styles.recipeDescription} numberOfLines={2}>
                      {recipe.description}
                    </Text>

                    <View style={styles.recipeFooter}>
                      <View style={styles.recipeInfo}>
                        <Users size={16} color={Colors.surface} strokeWidth={2} />
                        <Text style={styles.recipeInfoText}>
                          {recipe.servings} porções
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.likeButton}
                        onPress={() => toggleLike(recipe.id)}
                        activeOpacity={0.7}
                      >
                        <Heart
                          size={20}
                          color={Colors.surface}
                          strokeWidth={2}
                          fill={likedRecipes.has(recipe.id) ? Colors.surface : 'transparent'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.ctaCard}>
          <LinearGradient
            colors={Colors.gradient.purple}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaTitle}>Precisa de ajuda?</Text>
            <Text style={styles.ctaDescription}>
              Converse com nossa nutricionista IA para dicas personalizadas
            </Text>
            <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
              <Text style={styles.ctaButtonText}>Falar com Nutricionista</Text>
            </TouchableOpacity>
          </LinearGradient>
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
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    lineHeight: 36,
  },
  searchBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.tertiary,
  },
  quickStats: {
    flexDirection: 'row' as const,
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statCardWhite: {
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow.color,
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
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.surface,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.surface,
    opacity: 0.9,
  },
  statValueDark: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  statLabelDark: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  section: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  seeAll: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  recipesContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  recipeCard: {
    width: CARD_WIDTH,
    height: 320,
    borderRadius: 24,
    overflow: 'hidden' as const,
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
  },
  recipeGradient: {
    flex: 1,
    justifyContent: 'flex-end' as const,
  },
  recipeContent: {
    padding: 20,
  },
  recipeTags: {
    flexDirection: 'row' as const,
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.surface,
    marginBottom: 6,
    lineHeight: 28,
  },
  recipeDescription: {
    fontSize: 14,
    color: Colors.surface,
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 12,
  },
  recipeFooter: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  recipeInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  recipeInfoText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: Colors.surface,
  },
  likeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  ctaCard: {
    marginHorizontal: 20,
    marginTop: 32,
    borderRadius: 24,
    overflow: 'hidden' as const,
    shadowColor: '#9F7AEA',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaGradient: {
    padding: 24,
    alignItems: 'center' as const,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.surface,
    marginBottom: 8,
  },
  ctaDescription: {
    fontSize: 15,
    color: Colors.surface,
    textAlign: 'center' as const,
    opacity: 0.9,
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 20,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#9F7AEA',
  },
});
