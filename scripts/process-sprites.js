const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
}

async function processSprite(
  inputFile,
  outputDir,
  frameWidth,
  frameHeight,
  numFrames
) {
  await ensureDir(outputDir);

  for (let i = 0; i < numFrames; i++) {
    await sharp(inputFile)
      .extract({
        left: i * frameWidth,
        top: 0,
        width: frameWidth,
        height: frameHeight,
      })
      .toFile(path.join(outputDir, `frame${i + 1}.png`));
  }
}

async function main() {
  const assetsDir = path.join(__dirname, "..", "src", "assets", "cat");

  // Ensure directories exist
  await Promise.all([
    ensureDir(path.join(assetsDir, "running")),
    ensureDir(path.join(assetsDir, "scratching")),
    ensureDir(path.join(assetsDir, "sleeping")),
  ]);

  // Process running animation (138x100, 2 frames)
  await processSprite(
    path.join(assetsDir, "cat-running.png"),
    path.join(assetsDir, "running"),
    138,
    100,
    2
  );

  // Process scratching animation (97x100, 2 frames)
  await processSprite(
    path.join(assetsDir, "cat-scratch.png"),
    path.join(assetsDir, "scratching"),
    97,
    100,
    2
  );

  // Process sleeping animation (150x100, 2 frames)
  await processSprite(
    path.join(assetsDir, "cat-sleeping.png"),
    path.join(assetsDir, "sleeping"),
    150,
    100,
    2
  );

  // Copy stop frame
  await fs.copyFile(
    path.join(assetsDir, "cat-stop.png"),
    path.join(assetsDir, "stop.png")
  );

  console.log("Sprite processing completed successfully!");
}

main().catch(console.error);
