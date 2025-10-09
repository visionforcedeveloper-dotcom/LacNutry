import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Heart, Clock, Flame } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Stack, useRouter } from 'expo-router';
import { useRecipes } from '@/contexts/RecipeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function FavoritesScreen() {
  const router = useRouter();
  const { recipes, toggleFavorite, isFavorite } = useRecipes();
  const favoriteRecipes = recipes.filter(recipe => isFavorite(recipe.id));

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
          {favoriteRecipes.length > 0 && (
            <Text style={styles.count}>{favoriteRecipes.length}</Text>
          )}
        </View>

        {favoriteRecipes.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Heart size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
            <Text style={styles.emptyDescription}>
              Toque no coração nas receitas para salvá-las aqui
            </Text>
          </View>
        ) : (
          <View style={styles.recipesGrid}>
            {favoriteRecipes.map((recipe) => (
              <TouchableOpacity 
                key={recipe.id} 
                style={styles.recipeCard} 
                activeOpacity={0.9}
                onPress={() => router.push(`/recipe-detail?id=${recipe.id}`)}
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
                    color="#FF6B6B"
                    strokeWidth={2.5}
                    fill="#FF6B6B"
                  />
                </TouchableOpacity>
                <View style={styles.recipeContent}>
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {recipe.title}
                  </Text>
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
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingBottom: 24,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text.primary,
  },
  count: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.tertiary,
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
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
