import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const scanResultSchema = z.object({
  productName: z.string(),
  hasLactose: z.boolean(),
  lactoseLevel: z.enum(["none", "low", "medium", "high"]),
  lactoseIngredients: z.array(z.string()),
  safeForConsumption: z.boolean(),
  alternatives: z.array(z.string()),
  warning: z.string().optional(),
  confidence: z.number().min(0).max(100),
});

export const scanProductProcedure = publicProcedure
  .input(
    z.object({
      image: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageData = input.image.replace(/^data:image\/\w+;base64,/, "");

    const prompt = `Analise esta imagem de produto alimentício e retorne um JSON com as seguintes informações:

1. productName: Nome do produto
2. hasLactose: Se contém lactose (true/false)
3. lactoseLevel: Nível de lactose ("none", "low", "medium", "high")
4. lactoseIngredients: Array com TODOS os ingredientes que contêm lactose
5. safeForConsumption: Se é seguro para intolerantes à lactose (true/false)
6. alternatives: Array com sugestões de alternativas sem lactose
7. warning: Avisos importantes (opcional)
8. confidence: Nível de confiança da análise (0-100)

Ingredientes com lactose incluem: leite, lactose, soro de leite, whey, caseína, manteiga, queijo, iogurte, creme de leite, leite em pó, etc.

Retorne APENAS o JSON, sem texto adicional.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData,
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Não foi possível extrair JSON da resposta");
    }

    const parsedResult = JSON.parse(jsonMatch[0]);
    return scanResultSchema.parse(parsedResult);
  });

export default scanProductProcedure;
