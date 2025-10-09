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
import { Search, Clock, Flame, Heart, Leaf, Wheat } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Stack } from 'expo-router';
import { useRecipes } from '@/contexts/RecipeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function HomeScreen() {
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
            <Text style={styles.greeting}>Olá! 👋</Text>
            <Text style={styles.title}>LacNutry</Text>
            <Text style={styles.subtitle}>Receitas deliciosas sem lactose</Text>
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
          <Text style={styles.sectionTitle}>Categorias</Text>
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
              <Text style={styles.sectionTitle}>Em Destaque</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.featuredScroll}
              >
                {recipes.slice(0, 3).map((recipe) => (
              <TouchableOpacity key={recipe.id} style={styles.featuredCard} activeOpacity={0.9}>
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.featuredImage}
                  resizeMode="cover"
                />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.featuredGradient}
                >
                  <TouchableOpacity
                    style={styles.heartButton}
                    onPress={() => toggleFavorite(recipe.id)}
                    activeOpacity={0.7}
                  >
                    <Heart
                      size={20}
                      color={Colors.surface}
                      strokeWidth={2.5}
                      fill={isFavorite(recipe.id) ? Colors.surface : 'transparent'}
                    />
                  </TouchableOpacity>
                  <View style={styles.featuredContent}>
                    <Text style={styles.featuredTitle} numberOfLines={2}>
                      {recipe.title}
                    </Text>
                    <Text style={styles.featuredDescription} numberOfLines={1}>
                      {recipe.description}
                    </Text>
                    <View style={styles.featuredFooter}>
                      <View style={styles.featuredBadge}>
                        <Clock size={14} color={Colors.surface} strokeWidth={2} />
                        <Text style={styles.featuredBadgeText}>{recipe.prepTime} min</Text>
                      </View>
                      <View style={styles.featuredBadge}>
                        <Flame size={14} color={Colors.surface} strokeWidth={2} />
                        <Text style={styles.featuredBadgeText}>{recipe.nutritionInfo?.calories} cal</Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Todas as Receitas</Text>
              <View style={styles.recipesGrid}>
                {recipes.map((recipe) => (
              <TouchableOpacity key={recipe.id} style={styles.recipeCard} activeOpacity={0.9}>
                <Image
                  source={{ uri: recipe.image }}
                  style={styles.recipeImage}
                  resizeMode="cover"
                />
                <View style={styles.difficultyBadge}>
                  <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                </View>
                <TouchableOpacity
                  style={styles.recipeLikeButton}
                  onPress={() => toggleFavorite(recipe.id)}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={18}
                    color={isFavorite(recipe.id) ? '#FF6B6B' : Colors.text.tertiary}
                    strokeWidth={2.5}
                    fill={isFavorite(recipe.id) ? '#FF6B6B' : 'transparent'}
                  />
                </TouchableOpacity>
                <View style={styles.recipeContent}>
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  <View style={styles.recipeFooter}>
                    <View style={styles.recipeInfo}>
                      <Clock size={14} color={Colors.text.tertiary} strokeWidth={2} />
                      <Text style={styles.recipeInfoText}>{recipe.prepTime} min</Text>
                    </View>
                    <View style={styles.recipeInfo}>
                      <Flame size={14} color={Colors.text.tertiary} strokeWidth={2} />
                      <Text style={styles.recipeInfoText}>{recipe.nutritionInfo?.calories}</Text>
                    </View>
                  </View>
                  <View style={styles.recipeTags}>
                    {recipe.tags.includes('Vegano') && (
                      <View style={styles.recipeTag}>
                        <Leaf size={12} color={Colors.success} strokeWidth={2} />
                        <Text style={styles.recipeTagText}>Vegano</Text>
                      </View>
                    )}
                    {recipe.tags.some(tag => tag.includes('Glúten')) && (
                      <View style={styles.recipeTag}>
                        <Wheat size={12} color={Colors.warning} strokeWidth={2} />
                        <Text style={styles.recipeTagText}>S/ Glúten</Text>
                      </View>
                    )}
                  </View>
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  searchBar: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#F0F4F8',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  searchBarFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingVertical: 60,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryPillText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  categoryPillTextActive: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  section: {
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800' as const,
    color: Colors.text.primary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  featuredScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  featuredCard: {
    width: width - 80,
    height: 280,
    borderRadius: 20,
    overflow: 'hidden' as const,
    backgroundColor: Colors.surface,
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
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  featuredContent: {
    padding: 20,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.surface,
    marginBottom: 4,
    lineHeight: 26,
  },
  featuredDescription: {
    fontSize: 14,
    color: Colors.surface,
    opacity: 0.9,
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  featuredBadge: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  recipesGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    paddingHorizontal: 20,
    gap: 16,
  },
  recipeCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeImage: {
    width: '100%',
    height: 140,
  },
  difficultyBadge: {
    position: 'absolute' as const,
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  recipeLikeButton: {
    position: 'absolute' as const,
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeContent: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
    lineHeight: 20,
  },
  recipeFooter: {
    flexDirection: 'row' as const,
    gap: 12,
    marginBottom: 8,
  },
  recipeInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  recipeInfoText: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontWeight: '500' as const,
  },
  recipeTags: {
    flexDirection: 'row' as const,
    gap: 6,
  },
  recipeTag: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 4,
  },
  recipeTagText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.text.tertiary,
  },

});
