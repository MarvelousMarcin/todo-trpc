import { privatePrcedure, router } from "./trpc";
import { z } from "zod";
import { Priority } from "@prisma/client";
import prisma from "../../prisma/client";
import { TRPCError } from "@trpc/server";

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
      orderBy: {
        createdAt: "desc",
      },
    });

    return items;
  }),
  setTodoDone: privatePrcedure
    .input(z.object({ todoId: z.string(), isDone: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { isDone, todoId } = input;

      const findTodo = await prisma.toDo.findUnique({
        where: { id: todoId },
      });

      if (findTodo?.userId !== userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You have not permission to touch this todo",
        });
      }
      const updateTodo = await prisma.toDo.update({
        where: { id: todoId },
        data: {
          isDone,
        },
      });
      return updateTodo;
    }),
});

export type AppRouter = typeof appRouter;
