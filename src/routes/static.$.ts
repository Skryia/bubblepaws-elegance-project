import { createFileRoute } from "@tanstack/react-router";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "application/javascript; charset=utf-8",
  json: "application/json; charset=utf-8",
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  ico: "image/x-icon",
};

async function serve(path: string) {
  try {
    const full = join(process.cwd(), "public", path);
    const buf = await readFile(full);
    const ext = path.split(".").pop()?.toLowerCase() ?? "";
    return new Response(buf, {
      headers: {
        "content-type": TYPES[ext] ?? "application/octet-stream",
        "cache-control": "public, max-age=300",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export const Route = createFileRoute("/static/$")({
  server: {
    handlers: {
      GET: async ({ params }) => serve((params as { _splat: string })._splat),
    },
  },
});
