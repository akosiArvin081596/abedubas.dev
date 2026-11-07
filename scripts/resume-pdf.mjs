#!/usr/bin/env node
// Prints resume.html with headless Chrome to the PDF the hero and footer link
// to (RESUME_URL in src/data/contact.ts). Run it after any change to the
// resume, check the result is still two pages, and commit the PDF.
//
// Usage: npm run resume:pdf
// Set CHROME_PATH if Chrome isn't in the usual macOS place.

import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const CHROME =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUTPUT = resolve("public/Arvin_Baghari_Edubas_Resume.pdf");

const profile = mkdtempSync(join(tmpdir(), "resume-pdf-"));
try {
  execFileSync(
    CHROME,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-pdf-header-footer",
      `--user-data-dir=${profile}`,
      // Gives the web fonts time to load before it prints.
      "--virtual-time-budget=6000",
      `--print-to-pdf=${OUTPUT}`,
      pathToFileURL(resolve("resume.html")).href,
    ],
    { stdio: "ignore" },
  );
} finally {
  rmSync(profile, { recursive: true, force: true });
}
console.log(`Wrote ${OUTPUT}`);
