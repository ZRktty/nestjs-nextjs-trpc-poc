import { httpBatchLink } from "@trpc/client";
import { createTRPCClient } from "@trpc/client";
import type { AppRouter } from "../../../backend/src/@generated/server";

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4000/trpc",
    }),
  ],
});
