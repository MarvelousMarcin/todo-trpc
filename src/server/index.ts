import { auth } from "@clerk/nextjs";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { Priority } from "@prisma/client";
import prisma from "../../prisma/client";

export const appRouter = router({
  addTodo: publicProcedure
    .input(
      z.object({
        isDone: z.boolean(),
        title: z.string().min(1, "To short title").max(20, "Too long title"),
        deadline: z.coerce.date().optional(),
        priority: z.nativeEnum(Priority),
      })
    )
    .mutation(async ({ input }) => {
      const { userId } = auth();

      if (!userId)
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have to be sign in",
        });

      const todoItem = await prisma.toDo.create({
        data: {
          userId,
          title: input.title,
          isDone: input.isDone,
          priority: input.priority,
          deadline: input.deadline,
        },
      });

      return todoItem;
    }),
});

export type AppRouter = typeof appRouter;
