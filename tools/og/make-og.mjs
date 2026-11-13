// Paylaşım görsellerini üretir: public/og-en.png, public/og-tr.png (1200×630).
// Kullanım: node tools/og/make-og.mjs  (Chrome yüklü olmalı; fontlar Google Fonts'tan yüklenir)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const page = pathToFileURL(resolve('tools/og/og.html')).href;

for (const lang of ['en', 'tr']) {
  const profile = mkdtempSync(join(tmpdir(), 'og-'));
  execFileSync(chrome, [
    '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--user-data-dir=${profile}`, '--window-size=1200,630', '--virtual-time-budget=6000',
    `--screenshot=${resolve(`public/og-${lang}.png`)}`, `${page}?lang=${lang}`,
  ], { stdio: 'ignore' });
  rmSync(profile, { recursive: true, force: true });
  console.log(`public/og-${lang}.png`);
}
