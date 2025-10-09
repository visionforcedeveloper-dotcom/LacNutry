import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import listRecipesProcedure from "./routes/recipes/list/route";
import recipeDetailProcedure from "./routes/recipes/detail/route";
import generateRecipeProcedure from "./routes/ai/generate-recipe/route";
import scanProductProcedure from "./routes/ai/scan-product/route";
import nutritionistChatProcedure from "./routes/ai/nutritionist/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  recipes: createTRPCRouter({
    list: listRecipesProcedure,
    detail: recipeDetailProcedure,
  }),
  ai: createTRPCRouter({
    generateRecipe: generateRecipeProcedure,
    scanProduct: scanProductProcedure,
    nutritionistChat: nutritionistChatProcedure,
  }),
});

export type AppRouter = typeof appRouter;
