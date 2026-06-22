import { createFileRoute } from "@tanstack/react-router";
import { servePublic } from "@/lib/serve-public.server";

export const Route = createFileRoute("/js/$")({
  server: {
    handlers: {
      GET: async ({ params }) => servePublic("js/" + (params as { _splat: string })._splat),
    },
  },
});
