import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { featuredRecipes } from "@/mocks/recipes";

export const recipeDetailProcedure = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    const recipe = featuredRecipes.find((r) => r.id === input.id);
    
    if (!recipe) {
      throw new Error("Recipe not found");
    }

    return recipe;
  });

export default recipeDetailProcedure;
