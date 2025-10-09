import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { generateObject } from "@rork/toolkit-sdk";

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
    const result = await generateObject({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta imagem de produto alimentício e identifique:

1. Nome do produto
2. Se contém lactose ou derivados de leite
3. Nível de lactose (none/low/medium/high)
4. Liste TODOS os ingredientes que contêm lactose encontrados
5. Se é seguro para pessoas com intolerância à lactose
6. Sugestões de alternativas sem lactose
7. Avisos importantes (se houver)
8. Nível de confiança da análise (0-100%)

Ingredientes com lactose incluem: leite, lactose, soro de leite, whey, caseína, manteiga, queijo, iogurte, creme de leite, leite em pó, etc.

Seja preciso e detalhado na análise.`,
            },
            {
              type: "image",
              image: input.image,
            },
          ],
        },
      ],
      schema: scanResultSchema,
    });

    return result;
  });

export default scanProductProcedure;
