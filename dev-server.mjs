import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { createServer } from "node:http";

const args = process.argv.slice(2);
const portFlag = args.findIndex((arg) => arg === "--port");
const port = Number(portFlag >= 0 ? args[portFlag + 1] : process.env.PORT) || 8080;
const root = join(process.cwd(), "public");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

createServer((req, res) => {
  const url = new URL(req.url || "/", "http://localhost");
  const cleanPath = normalize(decodeURIComponent(url.pathname)).replace(/^([/\\.])+/, "");
  const relativePath = !cleanPath || cleanPath === "." ? "index.html" : cleanPath;
  if (relativePath.includes("..")) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  const filePath = join(root, relativePath);
  const finalPath = existsSync(filePath) ? filePath : join(root, "index.html");
  res.writeHead(200, { "content-type": types[extname(finalPath)] || "application/octet-stream" });
  createReadStream(finalPath).pipe(res);
}).listen(port, () => {
  console.log(`Static site running at http://localhost:${port}`);
});