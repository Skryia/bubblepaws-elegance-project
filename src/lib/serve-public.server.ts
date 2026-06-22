import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";

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
  txt: "text/plain; charset=utf-8",
};

export async function servePublic(relPath: string): Promise<Response> {
  // strip leading slashes, prevent traversal
  const clean = normalize(relPath).replace(/^([./\\])+/, "");
  if (clean.includes("..")) return new Response("Forbidden", { status: 403 });
  try {
    const full = join(process.cwd(), "public", clean);
    const buf = await readFile(full);
    const ext = clean.split(".").pop()?.toLowerCase() ?? "";
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
