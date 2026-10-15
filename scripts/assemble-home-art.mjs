import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const sourceDir = join("assets", "aurae-home-art");
const parts = [];
for (let index = 1; index <= 6; index += 1) {
  const part = String(index).padStart(2, "0");
  parts.push((await readFile(join(sourceDir, `part-${part}.txt`), "utf8")).trim());
}
const encoded = parts.join("");
if (!/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
  throw new Error("AURAÈ hero artwork data contains invalid Base64 characters.");
}
const image = Buffer.from(encoded, "base64");
if (image.length !== 44194 || image.toString("ascii", 0, 4) !== "RIFF" || image.toString("ascii", 8, 12) !== "WEBP") {
  throw new Error(`AURAÈ hero image validation failed (received ${image.length} bytes).`);
}
const output = join("public", "images", "aurae-approved-hero.webp");
await writeFile(output, image);
console.log(`Validated original campaign artwork: ${image.length.toLocaleString()} bytes -> ${output}`);
