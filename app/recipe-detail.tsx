import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Clock, Flame, Heart, Users, ChefHat } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { trpc } from '@/lib/trpc';
import { useRecipes } from '@/contexts/RecipeContext';

const { width } = Dimensions.get('window');

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { toggleFavorite, isFavorite } = useRecipes();
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  const { data: recipe, isLoading, error } = trpc.recipes.detail.useQuery(
    { id: id || '' },
    { 
      enabled: !!id,
      retry: 1,
    }
  );

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
        <View style={styles.loadingContent}>
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
          <Text style={styles.loadingText}>Carregando receita...</Text>
        </View>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <ChefHat size={64} color={Colors.text.tertiary} strokeWidth={1.5} />
        <Text style={styles.errorTitle}>Receita não encontrada</Text>
        <Text style={styles.errorSubtext}>A receita que você procura não existe ou foi removida</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <ArrowLeft size={24} color={Colors.text.primary} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => toggleFavorite(recipe.id)}
            activeOpacity={0.7}
          >
            <Heart
              size={24}
              color={isFavorite(recipe.id) ? '#FF6B6B' : Colors.text.primary}
              strokeWidth={2.5}
              fill={isFavorite(recipe.id) ? '#FF6B6B' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Clock size={20} color={Colors.primary} strokeWidth={2.5} />
              </View>
              <Text style={styles.statValue}>{recipe.prepTime}</Text>
              <Text style={styles.statLabel}>minutos</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Flame size={20} color={Colors.primary} strokeWidth={2.5} />
              </View>
              <Text style={styles.statValue}>{recipe.nutritionInfo?.calories}</Text>
              <Text style={styles.statLabel}>calorias</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIconContainer}>
                <Users size={20} color={Colors.primary} strokeWidth={2.5} />
              </View>
              <Text style={styles.statValue}>{recipe.servings}</Text>
              <Text style={styles.statLabel}>porções</Text>
            </View>
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
          ) : (
            <View style={styles.section}>
              {recipe.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <View style={styles.instructionNumber}>
                    <Text style={styles.instructionNumberText}>{index + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
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
  header: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 24,
  },
  spinnerContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 24,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.text.primary,
    fontWeight: '600' as const,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: Colors.background,
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginTop: 24,
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  errorSubtext: {
    fontSize: 15,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 22,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: Colors.surface,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    paddingBottom: 40,
  },
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text.primary,
    lineHeight: 36,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center' as const,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text.tertiary,
    fontWeight: '500' as const,
  },
  tabContainer: {
    flexDirection: 'row' as const,
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    alignItems: 'center' as const,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  activeTab: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  activeTabText: {
    color: Colors.surface,
    fontWeight: '700' as const,
  },
  section: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
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
  nutritionSection: {
    paddingHorizontal: 24,
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
});
