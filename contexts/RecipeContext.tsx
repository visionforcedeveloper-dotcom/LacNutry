import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useMemo, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { trpc } from '@/lib/trpc';

const FAVORITES_KEY = '@lactofree_favorites';

export const [RecipeProvider, useRecipes] = createContextHook(() => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const recipesQuery = trpc.recipes.list.useQuery({
    search: searchQuery,
    category: selectedCategory,
  });

  useEffect(() => {
    AsyncStorage.getItem(FAVORITES_KEY).then((stored) => {
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    });
  }, []);

  const saveFavorites = async (newFavorites: string[]) => {
    setFavorites(newFavorites);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = useCallback((recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter((id) => id !== recipeId)
      : [...favorites, recipeId];
    saveFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((recipeId: string) => favorites.includes(recipeId), [favorites]);

  return useMemo(() => ({
    recipes: recipesQuery.data?.recipes || [],
    categories: recipesQuery.data?.categories || [],
    isLoading: recipesQuery.isLoading,
    error: recipesQuery.error,
    refetch: recipesQuery.refetch,
    favorites,
    toggleFavorite,
    isFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  }), [
    recipesQuery.data?.recipes,
    recipesQuery.data?.categories,
    recipesQuery.isLoading,
    recipesQuery.error,
    recipesQuery.refetch,
    favorites,
    toggleFavorite,
    isFavorite,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  ]);
});

export const useFavoriteRecipes = () => {
  const { recipes, favorites } = useRecipes();
  return useMemo(
    () => recipes.filter((recipe) => favorites.includes(recipe.id)),
    [recipes, favorites]
  );
};

export const useFilteredRecipes = () => {
  const { recipes, searchQuery, selectedCategory } = useRecipes();
  return useMemo(() => {
    let filtered = [...recipes];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
    }

    return filtered;
  }, [recipes, searchQuery, selectedCategory]);
};
