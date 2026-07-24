import sharp from "sharp";
import { readdirSync } from "node:fs";
import path from "node:path";

const pub = path.resolve("public");

const jobs = [
  ...readdirSync(path.join(pub, "products"))
    .filter((f) => f.endsWith(".svg"))
    .map((f) => ({
      src: path.join(pub, "products", f),
      out: path.join(pub, "products", f.replace(".svg", ".jpg")),
      width: 1200,
    })),
  { src: path.join(pub, "hero.svg"), out: path.join(pub, "hero.jpg"), width: 2000 },
];

for (const j of jobs) {
  await sharp(j.src, { density: 150 })
    .resize({ width: j.width })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(j.out);
  console.log("ok:", path.basename(j.out));
}
