import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const recipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.number(),
  servings: z.number(),
  difficulty: z.enum(["Fácil", "Médio", "Difícil"]),
  category: z.string(),
  tags: z.array(z.string()),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  nutritionInfo: z.object({
    calories: z.number(),
    protein: z.number(),
    carbs: z.number(),
    fat: z.number(),
  }),
});

export const generateRecipeProcedure = publicProcedure
  .input(
    z.object({
      prompt: z.string(),
      preferences: z
        .object({
          difficulty: z.enum(["Fácil", "Médio", "Difícil"]).optional(),
          prepTime: z.number().optional(),
          servings: z.number().optional(),
          category: z.string().optional(),
        })
        .optional(),
    })
  )
  .mutation(async ({ input }) => {
    const preferencesText = input.preferences
      ? `
Preferências:
- Dificuldade: ${input.preferences.difficulty || "qualquer"}
- Tempo de preparo: ${input.preferences.prepTime ? `até ${input.preferences.prepTime} minutos` : "qualquer"}
- Porções: ${input.preferences.servings || "qualquer quantidade"}
- Categoria: ${input.preferences.category || "qualquer"}
`
      : "";

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Você é um chef especializado em receitas sem lactose. Crie uma receita deliciosa e 100% sem lactose baseada nesta solicitação:

${input.prompt}

${preferencesText}

IMPORTANTE:
- A receita DEVE ser completamente sem lactose
- Use alternativas vegetais (leite de amêndoas, coco, aveia, etc.)
- Seja criativo e detalhado
- Inclua informações nutricionais aproximadas
- As instruções devem ser claras e fáceis de seguir
- Adicione a tag "Sem Lactose" nas tags

Retorne um JSON com esta estrutura:
{
  "title": "Nome da receita",
  "description": "Descrição",
  "prepTime": número em minutos,
  "servings": número de porções,
  "difficulty": "Fácil" | "Médio" | "Difícil",
  "category": "categoria",
  "tags": ["array", "de", "tags"],
  "ingredients": ["array", "de", "ingredientes"],
  "instructions": ["array", "de", "passos"],
  "nutritionInfo": {
    "calories": número,
    "protein": número em gramas,
    "carbs": número em gramas,
    "fat": número em gramas
  }
}

Retorne APENAS o JSON, sem texto adicional.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Não foi possível extrair JSON da resposta");
    }

    const recipe = recipeSchema.parse(JSON.parse(jsonMatch[0]));

    return {
      ...recipe,
      id: `generated-${Date.now()}`,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
      lactoseFree: true,
      tags: [...recipe.tags, "Sem Lactose"],
    };
  });

export default generateRecipeProcedure;
