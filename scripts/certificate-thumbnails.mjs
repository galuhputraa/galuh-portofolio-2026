/**
 * Renders page 1 of every certificate PDF to a WebP thumbnail.
 *
 * Run after adding or replacing a PDF in public/certificates:
 *   node scripts/certificate-thumbnails.mjs
 *
 * Output lands in public/certificates/thumbs/<same-basename>.webp. The PDFs
 * stay as the click target — these are only the previews on the cards, so
 * nobody downloads a 360KB PDF just to see what a certificate looks like.
 *
 * Rendering goes through MuPDF (WASM), not pdf.js. pdf.js silently dropped the
 * entire body text of the Coursera certificates — recipient name, course title,
 * the lot — leaving a thumbnail that was just the sidebar on a blank page. The
 * text was present and black in the content stream; it simply never got
 * painted. MuPDF renders those pages correctly and needs no native canvas.
 */
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as mupdf from "mupdf";
import sharp from "sharp";

const CERT_DIR = path.join(process.cwd(), "public", "certificates");
const OUT_DIR = path.join(CERT_DIR, "thumbs");
const TARGET_WIDTH = 720;

async function renderFirstPage(pdfPath) {
  const doc = mupdf.Document.openDocument(
    await readFile(pdfPath),
    "application/pdf",
  );
  try {
    const page = doc.loadPage(0);
    const [x0, y0, x1] = page.getBounds();
    const scale = TARGET_WIDTH / (x1 - x0);

    // Certificates are printed artwork — rendering without an alpha channel
    // gives them the white paper background they're designed against.
    const pixmap = page.toPixmap(
      mupdf.Matrix.scale(scale, scale),
      mupdf.ColorSpace.DeviceRGB,
      false,
    );
    return pixmap.asPNG();
  } finally {
    doc.destroy?.();
  }
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
