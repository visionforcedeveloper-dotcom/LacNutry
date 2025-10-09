import { publicProcedure } from "../../../create-context";
import { z } from "zod";

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
    return {
      messages: input.messages,
    };
  });

export default nutritionistChatProcedure;
