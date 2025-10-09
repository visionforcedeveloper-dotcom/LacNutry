import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Search, Clock, Flame, Heart, ChefHat, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Stack, useRouter } from 'expo-router';
import { useRecipes } from '@/contexts/RecipeContext';
import { useOnboarding } from '@/contexts/OnboardingContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function HomeScreen() {
  const router = useRouter();
  const { getUserName } = useOnboarding();
  const {
    recipes,
    categories,
    isLoading,
    toggleFavorite,
    isFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  } = useRecipes();
  const [searchFocused, setSearchFocused] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {getUserName()}! 👋</Text>
            <Text style={styles.title}>LacNutry</Text>
            <Text style={styles.subtitle}>Receitas deliciosas sem lactose</Text>
          </View>
        </View>

        <View style={styles.aiToolsSection}>
          <Text style={styles.aiToolsTitle}>Ferramentas IA</Text>
          <View style={styles.aiToolsGrid}>
            <TouchableOpacity 
              style={styles.aiToolCard}
              onPress={() => router.push('/recipe-generator')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667EEA', '#764BA2']}
                style={styles.aiToolGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ChefHat size={28} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.aiToolText}>Gerador de{"\n"}Receitas</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.aiToolCard}
              onPress={() => router.push('/nutritionist-chat')}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#F093FB', '#F5576C']}
                style={styles.aiToolGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Sparkles size={28} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.aiToolText}>Nutricionista{"\n"}IA</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.searchBar, searchFocused && styles.searchBarFocused]}>
          <Search size={20} color={Colors.text.tertiary} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar receitas..."
            placeholderTextColor={Colors.text.tertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorias</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScroll}
          >
            <TouchableOpacity
              style={[styles.categoryPill, !selectedCategory && styles.categoryPillActive]}
              onPress={() => setSelectedCategory(undefined)}
            >
              <Text style={[styles.categoryPillText, !selectedCategory && styles.categoryPillTextActive]}>
                Todas
              </Text>
            </TouchableOpacity>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryPill, selectedCategory === category.name && styles.categoryPillActive]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    selectedCategory === category.name && styles.categoryPillTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Em Destaque</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredScroll}
              >
                {recipes.slice(0, 3).map((recipe) => (
              <TouchableOpacity 
                key={recipe.id} 
                style={styles.featuredCard} 
                activeOpacity={0.9}
                onPress={() => setShowDetails(!showDetails)}
              >
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.featuredGradient}
                >
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={18}
                      color={Colors.surface}
                      strokeWidth={2.5}
                      fill={isFavorite(recipe.id) ? Colors.surface : 'transparent'}
                    />
                  </TouchableOpacity>
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    {showDetails && (
                      <>
                        <Text style={styles.featuredDescription} numberOfLines={2}>
                          {recipe.description}
                        </Text>
                        <View style={styles.featuredFooter}>
                          <View style={styles.featuredBadge}>
                            <Clock size={12} color={Colors.surface} strokeWidth={2} />
                            <Text style={styles.featuredBadgeText}>{recipe.prepTime}min</Text>
                          </View>
                          <View style={styles.featuredBadge}>
                            <Flame size={12} color={Colors.surface} strokeWidth={2} />
                            <Text style={styles.featuredBadgeText}>{recipe.nutritionInfo?.calories}cal</Text>
                          </View>
                        </View>
                      </>
                    )}
                  </View>
                </LinearGradient>
              </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Receitas</Text>
                <Text style={styles.sectionCount}>{recipes.length}</Text>
              </View>
              <View style={styles.recipesGrid}>
                {recipes.map((recipe) => (
              <TouchableOpacity 
                key={recipe.id} 
                style={styles.recipeCard} 
                activeOpacity={0.9}
                onPress={() => setShowDetails(!showDetails)}
              >
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={styles.recipeLikeButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={16}
                    color={isFavorite(recipe.id) ? '#FF6B6B' : Colors.text.tertiary}
                    strokeWidth={2.5}
                    fill={isFavorite(recipe.id) ? '#FF6B6B' : 'transparent'}
                  />
                </TouchableOpacity>
                <View style={styles.recipeContent}>
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  {showDetails && (
                    <View style={styles.recipeFooter}>
                      <View style={styles.recipeInfo}>
                        <Clock size={12} color={Colors.text.tertiary} strokeWidth={2} />
                        <Text style={styles.recipeInfoText}>{recipe.prepTime}min</Text>
                      </View>
                      <View style={styles.recipeInfo}>
                        <Flame size={12} color={Colors.text.tertiary} strokeWidth={2} />
                        <Text style={styles.recipeInfoText}>{recipe.nutritionInfo?.calories}</Text>
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 15,
    color: Colors.text.secondary,
    marginBottom: 2,
    fontWeight: '500' as const,
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.primary,
    letterSpacing: -0.5,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text.tertiary,
  },
  aiToolsSection: {
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 8,
  },
  aiToolsTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
  },
  aiToolsGrid: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  aiToolCard: {
    flex: 1,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  aiToolGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between' as const,
  },
  aiToolText: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  searchBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#F0F4F8',
    marginHorizontal: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  searchBarFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingVertical: 60,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryPillText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  categoryPillTextActive: {
    fontSize: 13,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  sectionCount: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.tertiary,
    backgroundColor: Colors.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredScroll: {
    paddingHorizontal: 24,
    gap: 12,
  },
  featuredCard: {
    width: width - 100,
    height: 240,
    borderRadius: 18,
    overflow: 'hidden' as const,
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute' as const,
  },
  featuredGradient: {
    flex: 1,
    justifyContent: 'flex-end' as const,
  },
  heartButton: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.surface,
    lineHeight: 24,
  },
  featuredDescription: {
    fontSize: 13,
    color: Colors.surface,
    opacity: 0.85,
    marginTop: 6,
    marginBottom: 10,
    lineHeight: 18,
  },
  featuredFooter: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  featuredBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  featuredBadgeText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  recipesGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    paddingHorizontal: 24,
    gap: 12,
  },
  recipeCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    overflow: 'hidden' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  recipeImage: {
    width: '100%',
    height: 130,
  },

  recipeLikeButton: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeContent: {
    padding: 10,
  },
  recipeTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    lineHeight: 19,
    minHeight: 38,
  },
  recipeFooter: {
    flexDirection: 'row' as const,
    gap: 10,
    marginTop: 8,
  },
  recipeInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 3,
  },
  recipeInfoText: {
    fontSize: 11,
    color: Colors.text.tertiary,
    fontWeight: '500' as const,
  },

});
