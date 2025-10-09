import { publicProcedure } from "../../../create-context";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const nutritionistChatProcedure = publicProcedure
  .input(
    z.object({
      messages: z.array(messageSchema),
    })
  )
  .mutation(async ({ input }) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `Você é um nutricionista especializado em intolerância à lactose. Seu papel é:

1. Fornecer orientações nutricionais personalizadas
2. Sugerir alternativas sem lactose
3. Explicar sobre nutrição e saúde digestiva
4. Ajudar a interpretar rótulos de produtos
5. Criar planos alimentares sem lactose
6. Responder dúvidas sobre intolerância à lactose

Seja sempre profissional, empático e baseado em evidências científicas.
Responda de forma clara e objetiva em português do Brasil.`;

    const chatHistory = input.messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido! Estou pronto para ajudar com orientações sobre intolerância à lactose e nutrição. Como posso ajudá-lo hoje?" }],
        },
        ...chatHistory.slice(0, -1),
      ],
    });

    const lastMessage = input.messages[input.messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const assistantMessage = response.text();

    return {
      messages: [
        ...input.messages,
        {
          role: "assistant" as const,
          content: assistantMessage,
        },
      ],
    };
  });

export default nutritionistChatProcedure;
