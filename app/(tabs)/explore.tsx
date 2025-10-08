import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Coffee, Utensils, Moon, Cake, Sandwich, GlassWater } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { categories } from '@/mocks/recipes';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const iconMap: Record<string, any> = {
  coffee: Coffee,
  utensils: Utensils,
  moon: Moon,
  cake: Cake,
  sandwich: Sandwich,
  'glass-water': GlassWater,
};

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Explorar Receitas</Text>
          <Text style={styles.subtitle}>
            Descubra receitas deliciosas sem lactose
          </Text>
        </View>

        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <TouchableOpacity
                key={category.id}
                style={[styles.categoryCard, { backgroundColor: category.color + '15' }]}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: category.color + '25' },
                  ]}
                >
                  <IconComponent size={28} color={category.color} strokeWidth={2} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.recipeCount}>
                  {category.recipeCount} receitas
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filtros Rápidos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {['Rápido', 'Fácil', 'Vegano', 'Sem Glúten', 'Proteico', 'Low Carb'].map(
              (filter) => (
                <TouchableOpacity key={filter} style={styles.filterChip}>
                  <Text style={styles.filterText}>{filter}</Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
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
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  categoriesGrid: {
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    paddingHorizontal: 16,
    gap: 16,
  },
  categoryCard: {
    width: CARD_WIDTH,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: 'center' as const,
  },
  recipeCount: {
    fontSize: 13,
    color: Colors.text.tertiary,
  },
  section: {
    marginTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  filtersContainer: {
    gap: 12,
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
});
