import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Sparkles, ChefHat, Clock, Users } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { Stack } from 'expo-router';
import { trpc } from '@/lib/trpc';
import type { Recipe } from '@/constants/types';

export default function RecipeGeneratorScreen() {
  const [prompt, setPrompt] = useState('');
  const [difficulty, setDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil' | undefined>();
  const [prepTime, setPrepTime] = useState('');
  const [servings, setServings] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  const generateMutation = trpc.ai.generateRecipe.useMutation({
    onSuccess: (data) => {
      setGeneratedRecipe(data as Recipe);
    },
    onError: (error) => {
      Alert.alert('Erro', 'Não foi possível gerar a receita. Tente novamente.');
      console.error('Generate error:', error);
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      Alert.alert('Atenção', 'Por favor, descreva o que você gostaria de cozinhar.');
      return;
    }

    generateMutation.mutate({
      prompt: prompt.trim(),
      preferences: {
        difficulty,
        prepTime: prepTime ? parseInt(prepTime) : undefined,
        servings: servings ? parseInt(servings) : undefined,
      },
    });
  };

  const difficulties: Array<'Fácil' | 'Médio' | 'Difícil'> = ['Fácil', 'Médio', 'Difícil'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Stack.Screen
        options={{
          title: 'Gerador de Receitas',
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.primary,
        }}
      />

      {!generatedRecipe ? (
        <View style={styles.formContainer}>
          <View style={styles.iconWrapper}>
            <LinearGradient
              colors={['#0EA5E9', '#06B6D4']}
              style={styles.iconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <ChefHat size={48} color={Colors.surface} strokeWidth={2} />
            </LinearGradient>
          </View>

          <Text style={styles.title}>Crie Receitas Personalizadas</Text>
          <Text style={styles.description}>
            Descreva o que você quer cozinhar e nossa IA criará uma receita sem lactose para você
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>O que você quer cozinhar?</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Ex: Um bolo de chocolate fofinho para o café da manhã..."
                placeholderTextColor={Colors.text.tertiary}
                value={prompt}
                onChangeText={setPrompt}
                multiline
                numberOfLines={4}
                maxLength={500}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Dificuldade (opcional)</Text>
              <View style={styles.chipContainer}>
                {difficulties.map((diff) => (
                  <TouchableOpacity
                    key={diff}
                    style={[styles.chip, difficulty === diff && styles.chipActive]}
                    onPress={() => setDifficulty(difficulty === diff ? undefined : diff)}
                  >
                    <Text style={[styles.chipText, difficulty === diff && styles.chipTextActive]}>
                      {diff}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Tempo (min)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="30"
                  placeholderTextColor={Colors.text.tertiary}
                  value={prepTime}
                  onChangeText={setPrepTime}
                  keyboardType="number-pad"
                  maxLength={3}
                />
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Porções</Text>
                <TextInput
                  style={styles.input}
                  placeholder="4"
                  placeholderTextColor={Colors.text.tertiary}
                  value={servings}
                  onChangeText={setServings}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.generateButton}
              onPress={handleGenerate}
              disabled={generateMutation.isPending}
            >
              <LinearGradient
                colors={['#0EA5E9', '#06B6D4']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {generateMutation.isPending ? (
                  <ActivityIndicator color={Colors.surface} />
                ) : (
                  <>
                    <Sparkles size={24} color={Colors.surface} strokeWidth={2.5} />
                    <Text style={styles.buttonText}>Gerar Receita</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.recipeContainer}>
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeTitle}>{generatedRecipe.title}</Text>
            <Text style={styles.recipeDescription}>{generatedRecipe.description}</Text>

            <View style={styles.recipeMetaContainer}>
              <View style={styles.recipeMeta}>
                <Clock size={20} color={Colors.primary} strokeWidth={2} />
                <Text style={styles.recipeMetaText}>{generatedRecipe.prepTime} min</Text>
              </View>
              <View style={styles.recipeMeta}>
                <Users size={20} color={Colors.primary} strokeWidth={2} />
                <Text style={styles.recipeMetaText}>{generatedRecipe.servings} porções</Text>
              </View>
              <View style={styles.difficultyBadge}>
                <Text style={styles.difficultyText}>{generatedRecipe.difficulty}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredientes</Text>
            {generatedRecipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modo de Preparo</Text>
            {generatedRecipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

          {generatedRecipe.nutritionInfo && (
            <View style={styles.nutritionCard}>
              <Text style={styles.nutritionTitle}>Informações Nutricionais</Text>
              <View style={styles.nutritionGrid}>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{generatedRecipe.nutritionInfo.calories}</Text>
                  <Text style={styles.nutritionLabel}>Calorias</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{generatedRecipe.nutritionInfo.protein}g</Text>
                  <Text style={styles.nutritionLabel}>Proteína</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{generatedRecipe.nutritionInfo.carbs}g</Text>
                  <Text style={styles.nutritionLabel}>Carboidratos</Text>
                </View>
                <View style={styles.nutritionItem}>
                  <Text style={styles.nutritionValue}>{generatedRecipe.nutritionInfo.fat}g</Text>
                  <Text style={styles.nutritionLabel}>Gorduras</Text>
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.newRecipeButton}
            onPress={() => {
              setGeneratedRecipe(null);
              setPrompt('');
              setDifficulty(undefined);
              setPrepTime('');
              setServings('');
            }}
          >
            <Text style={styles.newRecipeText}>Gerar Nova Receita</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  formContainer: {
    alignItems: 'center' as const,
  },
  iconWrapper: {
    marginBottom: 24,
  },
  iconGradient: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center' as const,
  },
  description: {
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center' as const,
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    fontSize: 15,
    color: Colors.text.primary,
    minHeight: 120,
    textAlignVertical: 'top' as const,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipContainer: {
    flexDirection: 'row' as const,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text.secondary,
  },
  chipTextActive: {
    color: Colors.surface,
  },
  row: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: Colors.text.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  generateButton: {
    borderRadius: 16,
    overflow: 'hidden' as const,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 18,
    gap: 12,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  recipeContainer: {
    width: '100%',
  },
  recipeHeader: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  recipeMetaContainer: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 12,
  },
  recipeMeta: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  },
  recipeMetaText: {
    fontSize: 14,
    color: Colors.text.secondary,
    fontWeight: '500' as const,
  },
  difficultyBadge: {
    backgroundColor: Colors.primaryLight + '30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 12,
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
  },
  ingredientText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  instructionItem: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 16,
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  nutritionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: Colors.shadow.color,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Colors.shadow.opacity,
    shadowRadius: 8,
    elevation: 3,
  },
  nutritionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  nutritionGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    gap: 16,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '40%',
    alignItems: 'center' as const,
    padding: 12,
    backgroundColor: Colors.primaryLight + '20',
    borderRadius: 12,
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  newRecipeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center' as const,
  },
  newRecipeText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: Colors.surface,
  },
});
