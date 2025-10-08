export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  category: string;
  tags: string[];
  lactoseFree: boolean;
  ingredients: string[];
  instructions: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  recipeCount: number;
};
