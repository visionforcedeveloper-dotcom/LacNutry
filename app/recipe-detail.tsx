import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Clock, Flame, Heart, Users, Leaf } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';
import { useRecipes } from '@/contexts/RecipeContext';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { toggleFavorite, isFavorite } = useRecipes();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  const { data: recipe, isLoading, error } = trpc.recipes.detail.useQuery(
    { id: id || '' },
    { 
      enabled: !!id,
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    }
  );

  console.log('Recipe Detail - ID:', id);
  console.log('Recipe Detail - ID Type:', typeof id);
  console.log('Recipe Detail - Loading:', isLoading);
  console.log('Recipe Detail - Error:', error);
  console.log('Recipe Detail - Recipe:', recipe ? recipe.title : 'NO RECIPE');
  console.log('Recipe Detail - Full Recipe Object:', JSON.stringify(recipe, null, 2));

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Carregando receita...</Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.errorText}>Receita não encontrada</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.image}
            resizeMode="cover"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color={Colors.surface} />
            </View>
          )}
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.overlayTitle}>{recipe.title}</Text>
            {recipe.tags && recipe.tags.length > 0 && (
              <View style={styles.overlayTagContainer}>
                <View style={styles.overlayTag}>
                  <Leaf size={14} color={Colors.surface} strokeWidth={2.5} />
                  <Text style={styles.overlayTagText}>{recipe.tags[0]}</Text>
                </View>
              </View>
            )}
          </View>
          <TouchableOpacity
            style={[styles.backIconButton, { top: insets.top + 10 }]}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color={Colors.surface} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, { top: insets.top + 10 }]}
            onPress={() => toggleFavorite(recipe.id)}
            activeOpacity={0.8}
          >
            <Heart
              size={26} 
              color={Colors.surface}
              strokeWidth={2.5}
              fill={isFavorite(recipe.id) ? Colors.surface : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Clock size={24} color={Colors.text.secondary} strokeWidth={2} />
              <Text style={styles.statValue}>{recipe.prepTime} min</Text>
              <Text style={styles.statLabel}>Tempo</Text>
            </View>
            <View style={styles.statCard}>
              <Flame size={24} color={Colors.text.secondary} strokeWidth={2} />
              <Text style={styles.statValue}>{recipe.nutritionInfo?.calories}</Text>
              <Text style={styles.statLabel}>Calorias</Text>
            </View>
            <View style={styles.statCard}>
              <Users size={24} color={Colors.text.secondary} strokeWidth={2} />
              <Text style={styles.statValue}>{recipe.servings}</Text>
              <Text style={styles.statLabel}>Porções</Text>
            </View>
            <View style={styles.statCard}>
              <Leaf size={24} color={Colors.text.secondary} strokeWidth={2} />
              <Text style={styles.statValue}>{recipe.difficulty}</Text>
              <Text style={styles.statLabel}>Nível</Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'ingredients' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('ingredients')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'ingredients' && styles.activeTabText,
                ]}
              >
                Ingredientes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'instructions' && styles.activeTab,
              ]}
              onPress={() => setActiveTab('instructions')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'instructions' && styles.activeTabText,
                ]}
              >
                Modo de Preparo
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'ingredients' ? (
            <View style={styles.section}>
              <View style={styles.ingredientsList}>
                {recipe.ingredients.map((ingredient, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.ingredientItem}
                    onPress={() => toggleIngredient(index)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        checkedIngredients.has(index) && styles.checkboxChecked,
                      ]}
                    >
                      {checkedIngredients.has(index) && (
                        <View style={styles.checkboxInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.ingredientText,
                        checkedIngredients.has(index) && styles.ingredientTextChecked,
                      ]}
                    >
                      {ingredient}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={styles.section}>
              <View style={styles.instructionsList}>
                {recipe.instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {recipe.nutritionInfo && (
            <View style={styles.nutritionSection}>
              <Text style={styles.nutritionTitle}>Informações Nutricionais</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionInfo.protein}g</Text>
                  <Text style={styles.nutritionLabel}>Proteína</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionInfo.carbs}g</Text>
                  <Text style={styles.nutritionLabel}>Carboidratos</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{recipe.nutritionInfo.fat}g</Text>
                  <Text style={styles.nutritionLabel}>Gordura</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>
                    {recipe.nutritionInfo.carbs > 0
                      ? Math.round((recipe.nutritionInfo.carbs * 0.1) * 10) / 10
                      : 0}g
                  </Text>
                  <Text style={styles.nutritionLabel}>Fibra</Text>
                </View>
              </View>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.text.secondary,
    fontWeight: '600' as const,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  imageContainer: {
    width: '100%',
    height: 380,
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.background,
  },
  imageGradient: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backIconButton: {
    position: 'absolute' as const,
    left: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  favoriteButton: {
    position: 'absolute' as const,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  headerOverlay: {
    position: 'absolute' as const,
    bottom: 24,
    left: 24,
    right: 24,
  },
  overlayTitle: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: Colors.surface,
    lineHeight: 40,
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  overlayTagContainer: {
    flexDirection: 'row' as const,
  },
  overlayTag: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
    backgroundColor: 'rgba(79,209,197,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  overlayTagText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.surface,
  },
  content: {
    paddingBottom: 40,
  },
  descriptionContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  description: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    gap: 8,
    backgroundColor: Colors.surface,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center' as const,
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.text.tertiary,
    fontWeight: '500' as const,
  },
  tabContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center' as const,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.surface,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  nutritionSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  nutritionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  nutritionItem: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center' as const,
  },
  nutritionValue: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: Colors.text.secondary,
    fontWeight: '500' as const,
  },
  ingredientsList: {
    gap: 10,
  },
  ingredientItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  checkboxChecked: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surface,
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  ingredientTextChecked: {
    color: Colors.text.tertiary,
    textDecorationLine: 'line-through' as const,
  },
  instructionsList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row' as const,
    gap: 12,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  instructionNumberText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
    fontWeight: '500' as const,
  },
});
