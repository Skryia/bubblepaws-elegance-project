import { createFileRoute } from "@tanstack/react-router";
import { servePublic } from "@/lib/serve-public.server";

export const Route = createFileRoute("/css/$")({
  server: {
    handlers: {
      GET: async ({ params }) => servePublic("css/" + (params as { _splat: string })._splat),
    },
  },
});
