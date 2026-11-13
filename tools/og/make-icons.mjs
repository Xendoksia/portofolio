// Uygulama simgelerini üretir: public/apple-touch-icon.png (180), public/icon-192.png, public/icon-512.png.
// Kullanım: node tools/og/make-icons.mjs  (Chrome yüklü olmalı)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const page = pathToFileURL(resolve('tools/og/icon.html')).href;

for (const [name, size] of [['apple-touch-icon', 180], ['icon-192', 192], ['icon-512', 512]]) {
  const profile = mkdtempSync(join(tmpdir(), 'icon-'));
  execFileSync(chrome, [
    '--headless=new', '--hide-scrollbars', '--force-device-scale-factor=1',
    `--user-data-dir=${profile}`, `--window-size=${size},${size}`,
    `--screenshot=${resolve(`public/${name}.png`)}`, `${page}?${size}`,
  ], { stdio: 'ignore' });
  rmSync(profile, { recursive: true, force: true });
  console.log(`public/${name}.png`);
}
