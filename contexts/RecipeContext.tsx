import { useState, useEffect, useMemo, useCallback } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import { trpc } from '@/lib/trpc';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const [RecipeProvider, useRecipes] = createContextHook(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [favorites, setFavorites] = useState<string[]>([]);

  const recipesQuery = trpc.recipes.list.useQuery({
    search: searchQuery,
    category: selectedCategory,
  });

  useEffect(() => {
    AsyncStorage.getItem('favorites').then((stored) => {
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    });
  }, []);

  const toggleFavorite = useCallback(async (recipeId: string) => {
    const newFavorites = favorites.includes(recipeId)
      ? favorites.filter((id) => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  }, [favorites]);

  const isFavorite = useCallback((recipeId: string) => favorites.includes(recipeId), [favorites]);

  return useMemo(() => {
    const recipes = recipesQuery.data?.recipes || [];
    const categories = recipesQuery.data?.categories || [];

    return {
      recipes,
      categories,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      favorites,
      toggleFavorite,
      isFavorite,
      isLoading: recipesQuery.isLoading,
      error: recipesQuery.error,
    };
  }, [recipesQuery.data, searchQuery, selectedCategory, favorites, toggleFavorite, isFavorite, recipesQuery.isLoading, recipesQuery.error]);
});
