const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function createPlaceholder(width, height, frames, outputPath) {
  // Create a placeholder image with the specified dimensions
  const totalWidth = width * frames;
  await sharp({
    create: {
      width: totalWidth,
      height: height,
      channels: 4,
      background: { r: 255, g: 200, b: 200, alpha: 1 },
    },
  })
    .png()
    .toFile(outputPath);
}

async function main() {
  const assetsDir = path.join(__dirname, "..", "src", "assets", "cat");
  await ensureDir(assetsDir);

  // Create placeholder sprite sheets
  await createPlaceholder(138, 100, 2, path.join(assetsDir, "cat-running.png"));
  await createPlaceholder(97, 100, 2, path.join(assetsDir, "cat-scratch.png"));
  await createPlaceholder(
    150,
    100,
    2,
    path.join(assetsDir, "cat-sleeping.png")
  );
  await createPlaceholder(100, 100, 1, path.join(assetsDir, "cat-stop.png"));

  console.log("Placeholder sprites created successfully!");
}

main().catch(console.error);
