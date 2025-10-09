import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { featuredRecipes, categories } from "@/mocks/recipes";

export const listRecipesProcedure = publicProcedure
  .input(
    z.object({
      search: z.string().optional(),
      category: z.string().optional(),
      limit: z.number().optional(),
    })
  )
  .query(({ input }) => {
    let filtered = [...featuredRecipes];

    if (input.search) {
      const searchLower = input.search.toLowerCase();
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchLower) ||
          recipe.description.toLowerCase().includes(searchLower) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    if (input.category) {
      filtered = filtered.filter(
        (recipe) => recipe.category === input.category
      );
    }

    if (input.limit) {
      filtered = filtered.slice(0, input.limit);
    }

    const categoriesWithCount = categories.map((category) => ({
      ...category,
      recipeCount: featuredRecipes.filter(
        (recipe) => recipe.category === category.name
      ).length,
    }));

    return {
      recipes: filtered,
      categories: categoriesWithCount,
    };
  });

export default listRecipesProcedure;
