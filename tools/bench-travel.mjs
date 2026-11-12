// Gerçek Chrome penceresinde bölüm yolculuğu testi (gerçek tekerlek olayı, uzun bölüm, menü linki, fps). Kullanım: dev/preview 4321 açıkken node tools/bench-travel.mjs <geçici-klasör>
// Gerçek pencerede: bölüm yolculuğu (gerçek tekerlek olayı), uzun bölümde doğal kaydırma, fps, ekran görüntüleri
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const S = process.argv[2]; const port = 9613;
const watchdog = setTimeout(() => { console.log('WATCHDOG: timed out'); try { chrome.kill(); } catch {} process.exit(2); }, 120000);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [`--remote-debugging-port=${port}`, `--user-data-dir=${S}/pheaded13`, '--no-first-run', '--no-default-browser-check', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--window-size=1440,900', '--window-position=40,40', 'about:blank'], { stdio: 'ignore' });
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
const measure = async (label) => {
  const runs = [];
  for (let i = 0; i < 2; i++) {
    await ev(`scrollTo(0,0)`); await sleep(300);
    runs.push(await ev(`new Promise(res=>{let last=performance.now(),n=0,y=0;const t0=last,ft=[];function f(now){ft.push(now-last);last=now;n++;scrollTo(0,y+=8);if(now-t0<3000)requestAnimationFrame(f);else{ft.sort((a,b)=>a-b);res({fps:Math.round(n/3),p95:Math.round(ft[Math.floor(ft.length*.95)]),max:Math.round(ft[ft.length-1])})}}requestAnimationFrame(f)})`));
  }
  console.log(label.padEnd(10), 'scroll', JSON.stringify(runs));
};
try {
  await send('Runtime.enable');
  await send('Page.bringToFront');
  await send('Page.navigate', { url: 'http://localhost:4321/' });
  await sleep(1500);
  console.log('title:', await ev(`document.title.slice(0,30)`), 'visibility:', await ev(`document.visibilityState`));
  await sleep(4000);
  const tops = await ev(`JSON.stringify([...document.querySelectorAll('main > section')].map(s=>({id:s.id, top:Math.max(0,s.offsetTop-40), h:s.offsetHeight})))`);
  console.log('sections:', tops);
  // 1) Hero'da bir tekerlek → About'a yolculuk + patlama
  await wheel(120); await sleep(350);
  const midBurst = await ev(`!!document.querySelector('.hyperspace') + ' y=' + Math.round(scrollY)`);
  await shot('t_travel');
  await sleep(1400);
  console.log('after wheel at hero → burst mid-travel:', midBurst, '| landed y=', await ev(`Math.round(scrollY)`), 'about top=', await ev(`Math.max(0,document.getElementById('about').offsetTop-40)`));
  await shot('t_about');
  // 2) Uzun bölümde (projects) doğal kaydırma korunmalı
  await ev(`scrollTo(0, Math.max(0,document.getElementById('projects').offsetTop-40))`); await sleep(600);
  const y0 = await ev(`Math.round(scrollY)`);
  await wheel(120); await sleep(1600);
  const y1 = await ev(`Math.round(scrollY)`);
  console.log('wheel inside tall section: y', y0, '→', y1, '(doğal kaydırma: küçük artış bekleniyor, yolculuk değil)');
  // 3) Menü linki → yolculuk
  await ev(`document.querySelector('[data-nav="contact"]').click()`); await sleep(1800);
  console.log('nav click → y=', await ev(`Math.round(scrollY)`), 'contact top=', await ev(`Math.max(0,document.getElementById('contact').offsetTop-40)`), 'burst gone:', await ev(`!document.querySelector('.hyperspace')`));
  await measure('native');
  console.log('logs:', JSON.stringify(logs));
} catch (e) { console.log('ABORTED:', e.message); }
clearTimeout(watchdog); ws.close(); chrome.kill();
