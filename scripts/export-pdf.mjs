import { preview } from 'vite';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => fs.existsSync(p));

if (!CHROME) {
  throw new Error('Chrome or Edge executable not found.');
}

const OUT = path.resolve('public/downloads');
fs.mkdirSync(OUT, { recursive: true });
const PREVIEW_DIR = process.env.PREVIEW_DIR;

const docs = [
  ['company-profile', 'S08-Company-Profile'],
  ['orderbook', 'S08-Orderbook'],
];

const server = await preview({
  preview: { port: 4179, strictPort: true, host: '127.0.0.1' },
});
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox'],
});

try {
  for (const [route, name] of docs) {
    for (const lang of ['id', 'en']) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1240, height: 1754, deviceScaleFactor: 2 });
      await page.goto(`http://127.0.0.1:4179/#/print/${route}?lang=${lang}`, {
        waitUntil: 'networkidle0',
        timeout: 90000,
      });

      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((img) =>
            img.complete
              ? 0
              : new Promise((resolve) => {
                  img.onload = img.onerror = resolve;
                })
          )
        );
      });

      await page
        .waitForFunction(
          () =>
            [...document.querySelectorAll('[data-qr-ready],[data-ascii-ready]')].length >= 1 &&
            ![...document.querySelectorAll('[data-qr-pending],[data-ascii-pending]')].length,
          { timeout: 15000 }
        )
        .catch(() => {});

      await new Promise((r) => setTimeout(r, 800));

      const file = path.join(OUT, `${name}${lang === 'en' ? '-EN' : ''}.pdf`);
      await page.pdf({
        path: file,
        preferCSSPageSize: true,
        printBackground: true,
      });

      if (PREVIEW_DIR && lang === 'id') {
        fs.mkdirSync(PREVIEW_DIR, { recursive: true });
        await page.addStyleTag({ content: '.no-print { display: none !important; }' });
        const sheets = await page.$$('.print-sheet');
        for (let i = 0; i < sheets.length; i++) {
          await sheets[i].screenshot({
            path: path.join(PREVIEW_DIR, `${route}-${String(i + 1).padStart(2, '0')}.png`),
          });
        }
      }

      const bytes = fs.readFileSync(file, 'latin1');
      const pages = (bytes.match(/\/Type\s*\/Page[^s]/g) || []).length;
      const sizeMb = (fs.statSync(file).size / 1048576).toFixed(2);
      console.log(`${path.basename(file)}  pages=${pages}  size=${sizeMb}MB`);

      await page.close();
    }
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.httpServer.close(() => resolve()));
}
