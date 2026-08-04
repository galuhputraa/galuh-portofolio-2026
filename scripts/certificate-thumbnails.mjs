/**
 * Renders page 1 of every certificate PDF to a WebP thumbnail.
 *
 * Run after adding or replacing a PDF in public/certificates:
 *   node scripts/certificate-thumbnails.mjs
 *
 * Output lands in public/certificates/thumbs/<same-basename>.webp. The PDFs
 * stay as the click target — these are only the previews on the cards, so
 * nobody downloads a 360KB PDF just to see what a certificate looks like.
 */
import { createCanvas } from "@napi-rs/canvas";
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";

const CERT_DIR = path.join(process.cwd(), "public", "certificates");
const OUT_DIR = path.join(CERT_DIR, "thumbs");
const TARGET_WIDTH = 720;

// pdfjs ships as an ES module that expects a DOM; the legacy build is the one
// that runs under plain Node.
const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");

// pdfjs needs the packaged Type1/CFF metrics on disk to draw the standard PDF
// fonts; without it text on some certificates renders blank. It insists on a
// URL with a trailing slash, so a Windows path.join() won't do.
const standardFontDataUrl = `${pathToFileURL(
  path.join(process.cwd(), "node_modules", "pdfjs-dist", "standard_fonts"),
).href}/`;

async function renderFirstPage(pdfPath) {
  const data = new Uint8Array(await readFile(pdfPath));
  const task = pdfjs.getDocument({
    data,
    disableFontFace: true,
    standardFontDataUrl,
  });
  const doc = await task.promise;
  const page = await doc.getPage(1);

  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: TARGET_WIDTH / base.width });

  const canvas = createCanvas(
    Math.ceil(viewport.width),
    Math.ceil(viewport.height),
  );
  const context = canvas.getContext("2d");

  // Certificates are printed artwork — without this the transparent PDF
  // background renders black.
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas }).promise;
  const png = canvas.toBuffer("image/png");
  await task.destroy();

  return png;
}

const files = (await readdir(CERT_DIR)).filter((f) => f.endsWith(".pdf"));
await mkdir(OUT_DIR, { recursive: true });

let ok = 0;
for (const file of files) {
  const out = path.join(OUT_DIR, file.replace(/\.pdf$/, ".webp"));
  try {
    const png = await renderFirstPage(path.join(CERT_DIR, file));
    // Several certificates are landscape artwork on a portrait page — trim the
    // uniform margin so the card crop lands on the certificate, not on paper.
    const webp = await sharp(png)
      .trim({ threshold: 12 })
      .webp({ quality: 82 })
      .toBuffer();
    await writeFile(out, webp);
    console.log(
      `${file} -> ${path.basename(out)} (${Math.round(webp.length / 1024)} KB)`,
    );
    ok += 1;
  } catch (error) {
    console.error(`FAILED ${file}: ${error.message}`);
  }
}

console.log(`\n${ok}/${files.length} thumbnails written to ${OUT_DIR}`);
if (ok !== files.length) process.exitCode = 1;
