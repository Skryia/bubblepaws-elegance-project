import { createFileRoute } from "@tanstack/react-router";
import { servePublic } from "@/lib/serve-public.server";

export const Route = createFileRoute("/data/$")({
  server: {
    handlers: {
      GET: async ({ params }) => servePublic("data/" + (params as { _splat: string })._splat),
    },
  },
});
