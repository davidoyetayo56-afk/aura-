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

// Restore the original full-page reference at its native 900 × 720 resolution.
// The homepage renders this image at no more than its source width, so it is never enlarged.
const referenceDir = join("src", "reference-image");
const referenceParts = [];
for (let index = 1; index <= 5; index += 1) {
  referenceParts.push((await readFile(join(referenceDir, `part-${index}.txt`), "utf8")).trim());
}
const referenceEncoded = referenceParts.join("");
if (!/^[A-Za-z0-9+/]+={0,2}$/.test(referenceEncoded)) {
  throw new Error("AURAÈ reference image data contains invalid Base64 characters.");
}
const referenceImage = Buffer.from(referenceEncoded, "base64");
const fourCC = (offset) => referenceImage.toString("ascii", offset, offset + 4);
const signatureOffset = referenceImage.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 12);
const width = signatureOffset >= 0 ? referenceImage.readUInt16LE(signatureOffset + 3) & 0x3fff : 0;
const height = signatureOffset >= 0 ? referenceImage.readUInt16LE(signatureOffset + 5) & 0x3fff : 0;
if (
  referenceImage.length !== 33378 ||
  fourCC(0) !== "RIFF" ||
  fourCC(8) !== "WEBP" ||
  fourCC(12) !== "VP8 " ||
  width !== 900 ||
  height !== 720
) {
  throw new Error(`AURAÈ reference image validation failed (received ${referenceImage.length} bytes, ${width} × ${height}).`);
}
const referenceOutput = join("public", "images", "aurae-home-reference.webp");
await writeFile(referenceOutput, referenceImage);
console.log(`Validated native-size AURAÈ homepage reference: ${width} × ${height} -> ${referenceOutput}`);
