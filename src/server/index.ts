import { privatePrcedure, publicProcedure, router } from "./trpc";
import superjson from "superjson";
import { z } from "zod";
import { Priority } from "@prisma/client";
import prisma from "../../prisma/client";

export const appRouter = router({
  addTodo: privatePrcedure
    .input(
      z.object({
        isDone: z.boolean(),
        title: z.string().min(1, "To short title").max(20, "Too long title"),
        deadline: z.coerce.date().optional(),
        priority: z.nativeEnum(Priority),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

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
  getTodos: privatePrcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const items = await prisma.toDo.findMany({
      where: {
        userId,
      },
    });

    return items;
  }),
});

export type AppRouter = typeof appRouter;
