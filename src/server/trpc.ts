import { auth } from "@clerk/nextjs";
import { TRPCError, initTRPC } from "@trpc/server";
import { ZodError } from "zod";
import superjson from "superjson";
const t = initTRPC.create({
  transformer: superjson,

  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const middleware = t.middleware;
export const router = t.router;
export const publicProcedure = t.procedure;

const isAuth = middleware(async (opts) => {
  const { userId } = auth();
  if (!userId)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You have to be sign in",
    });

  return opts.next({
    ctx: {
      userId,
    },
  });
});

export const privatePrcedure = publicProcedure.use(isAuth);
