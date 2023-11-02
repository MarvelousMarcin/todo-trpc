import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server";

const getBaseUrl = () => {
  if (typeof window !== "undefined")
    // browser should use relative path
    return "";
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const serverClient = appRouter.createCaller({
  links: [httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })],
});
