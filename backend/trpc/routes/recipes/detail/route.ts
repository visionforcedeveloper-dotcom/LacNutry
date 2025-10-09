import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { featuredRecipes } from "@/mocks/recipes";

export const recipeDetailProcedure = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    console.log('Backend - recipeDetailProcedure called with ID:', input.id);
    console.log('Backend - Available recipe IDs:', featuredRecipes.map(r => r.id));
    
    const recipe = featuredRecipes.find((r) => r.id === input.id);
    
    console.log('Backend - Found recipe:', recipe ? recipe.title : 'NOT FOUND');
    
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  });

export default recipeDetailProcedure;
