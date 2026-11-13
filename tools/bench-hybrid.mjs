// Karma bölüm geçişi testi (gerçek Chrome, gerçek tekerlek olayı): fare çentiği, touchpad ataleti, yön değiştirme, sürekli fare, uzun bölümde içerik atlanmaması. Kullanım: preview 4321 açıkken node tools/bench-hybrid.mjs <geçici-klasör>
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const S = process.argv[2]; const port = 9613;
const watchdog = setTimeout(() => { console.log('WATCHDOG: timed out'); try { chrome.kill(); } catch {} process.exit(2); }, 120000);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [`--remote-debugging-port=${port}`, `--user-data-dir=${S}/phybrid`, '--no-first-run', '--no-default-browser-check', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--window-size=1440,900', '--window-position=40,40', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let targets = null;
for (let i = 0; i < 30 && !targets; i++) { await sleep(500); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
if (!targets) { console.log('chrome did not start'); process.exit(1); }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let closed = false; ws.onclose = () => { closed = true; };
let id = 0; const P = new Map(); const logs = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.method === 'Runtime.exceptionThrown') logs.push('EXC ' + d.params.exceptionDetails.exception?.description); if (d.method === 'Runtime.consoleAPICalled' && d.params.type !== 'log') logs.push(d.params.type + ': ' + d.params.args.map(a => a.value).join(' ')); P.get(d.id)?.(d.result); };
const send = (method, params = {}) => new Promise((r, j) => { if (closed) return j(new Error('window closed')); const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => { for (let i = 0; i < 10; i++) { const r = await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true }); if (r && r.result) return r.result.value; await sleep(300); } throw new Error('evaluate failed: ' + e.slice(0, 60)); };
const shot = async (n) => writeFileSync(`${S}/${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
const wheel = (deltaY) => send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 450, deltaX: 0, deltaY });
const Y = () => ev(`Math.round(scrollY)`);
const top = (id) => ev(`Math.max(0,document.getElementById('${id}').offsetTop-40)`);
// scroll izini kaydet: kare başına en büyük sıçrama
const track = () => ev(`(window.__tr=[],(function f(){__tr.push(scrollY);if(__tr.length<2000)requestAnimationFrame(f)})(),1)`);
const trackStop = () => ev(`(()=>{const t=__tr;__tr.length=99999;return {min:Math.round(Math.min(...t)),max:Math.round(Math.max(...t))}})()`);
const swipe = async (dir) => { // touchpad: yükselen deltalar + 1.5 sn sönen atalet, ~16ms aralık (await yok: CDP onayı ~200ms sürüyor, beklenirse her olay ayrı hareket sayılır)
  for (const d of [3,8,20,45,70,80]) { wheel(dir*d); await sleep(16); }
  let d = 80; while (d > 1) { d *= 0.95; wheel(dir*Math.max(1,Math.round(d))); await sleep(16); }
};
try {
  await send('Runtime.enable'); await send('Page.bringToFront');
  await send('Page.navigate', { url: 'http://localhost:4321/' }); await sleep(5500);
  const vh = await ev('innerHeight');
  console.log('vh', vh, 'sections:', await ev(`JSON.stringify([...document.querySelectorAll('main > section')].map(s=>s.id+':'+Math.max(0,s.offsetTop-40)+'+'+s.offsetHeight))`));
  // 1) fare: tek çentik
  await wheel(100); await sleep(1500);
  console.log('1 tek çentik hero→about:', await Y(), 'about=', await top('about'));
  // 2) touchpad fiskesi + uzun atalet → tek geçiş
  await ev(`scrollTo(0,0)`); await sleep(500);
  await swipe(1); await sleep(1200);
  console.log('2 touchpad fiske+atalet:', await Y(), '(about=', await top('about'), ', tek geçiş beklenir)');
  // 2b) takılan sayfa: atalet sırasında üç kez ~250ms takılma → yine tek geçiş
  await ev(`scrollTo(0,0)`); await sleep(500);
  for (const d of [3,8,20,45,70,80]) { wheel(d); await sleep(16); }
  { let d = 80, n = 0; while (d > 1) { d *= 0.95; n++; wheel(Math.max(1,Math.round(d))); await sleep(n % 25 === 0 ? 250 : 16); } }
  await sleep(1200);
  console.log('2b takılmalı atalet:', await Y(), '(about=', await top('about'), ', tek geçiş beklenir)');
  // 3) geri dönme: aşağı çentik, 200ms sonra yukarı
  await ev(`scrollTo(0,0)`); await sleep(500);
  await wheel(100); await sleep(250); const mid = await Y(); await wheel(-100); await sleep(1500);
  console.log('3 yön değiştir: ortada', mid, '→', await Y(), '(0 beklenir)');
  // 4) fare sürekli dönüyor (50ms aralık, 2.5 sn) → birden fazla bölüm
  await ev(`scrollTo(0,0)`); await sleep(500);
  for (let i = 0; i < 50; i++) { await wheel(100); await sleep(50); }
  await sleep(1500); console.log('4 sürekli fare 2.5sn:', await Y());
  // 5) projects başından ayrı ayrı çentikler (sayfalı bölüm: altı + sonraki bölüm), içerik atlanıyor mu?
  const pTop = await top('projects'); const pEnd = await ev(`(p=>p.offsetTop+p.offsetHeight)(document.getElementById('projects'))`);
  await ev(`scrollTo(0,${pTop})`); await sleep(600);
  const ys = [];
  for (let i = 0; i < 40; i++) { await wheel(100); await sleep(1400); const y = await Y(); ys.push(y); if (y >= (await top('skills'))) break; }
  const steps = ys.map((y,i)=>y-(i?ys[i-1]:pTop));
  console.log('5 projects', pTop, '→', pEnd, 'adımlar:', steps.join(','), '| son y', ys.at(-1), 'skills=', await top('skills'));
  console.log('   en büyük adım', Math.max(...steps), '(> vh ise içerik atlandı)');
  // 6) yukarı: skills'ten bir çentik → projects altı hizalı, sonra doğal
  await wheel(-100); await sleep(1500); const up1 = await Y();
  await wheel(-100); await sleep(400);
  console.log('6 skills→yukarı:', up1, '(projects altı=', pEnd - vh, ') sonraki çentik', await Y());
  console.log('logs:', JSON.stringify(logs));
} catch (e) { console.log('ABORTED:', e.message); }
clearTimeout(watchdog); ws.close(); chrome.kill();
