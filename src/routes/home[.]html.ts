import { createFileRoute } from "@tanstack/react-router";
import { servePublic } from "@/lib/serve-public.server";

export const Route = createFileRoute("/home.html")({
  server: { handlers: { GET: async () => servePublic("home.html") } },
});
