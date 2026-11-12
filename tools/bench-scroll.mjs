// Görünür Chrome penceresinde scroll fps ölçümü (CDP). Kullanım: npm run build && npx astro preview --port 4321 & node tools/bench-scroll.mjs <geçici-klasör>
// Katmanları sırayla gizleyip (3→0) maliyeti ayrıştırır; pencere örtülüyse rAF donar, script bunu kontrol eder.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
const S = process.argv[2]; const port = 9604;
const watchdog = setTimeout(() => { console.log('WATCHDOG: timed out'); try { chrome.kill(); } catch {} process.exit(2); }, 90000);
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [`--remote-debugging-port=${port}`, `--user-data-dir=${S}/pheaded4`, '--no-first-run', '--no-default-browser-check', '--window-size=1440,900', '--window-position=40,40', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let targets = null;
for (let i = 0; i < 30 && !targets; i++) { await sleep(500); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch {} }
if (!targets) { console.log('chrome did not start'); process.exit(1); }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let closed = false; ws.onclose = () => { closed = true; };
let id = 0; const P = new Map(); const logs = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.method === 'Runtime.exceptionThrown') logs.push('EXC ' + d.params.exceptionDetails.exception?.description); if (d.method === 'Runtime.consoleAPICalled' && d.params.type !== 'log') logs.push(d.params.type + ': ' + d.params.args.map(a => a.value).join(' ')); P.get(d.id)?.(d.result); };
const send = (method, params = {}) => new Promise((r, j) => { if (closed) return j(new Error('window closed')); const i = ++id; P.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result.value;
const shot = async (n) => writeFileSync(`${S}/${n}.png`, Buffer.from((await send('Page.captureScreenshot')).data, 'base64'));
const measure = async (label) => {
  const info = await ev(`devicePixelRatio + 'x ' + innerWidth + 'x' + innerHeight + ' hidden=' + document.hidden`);
  const runs = [];
  for (let i = 0; i < 3; i++) {
    await ev(`scrollTo(0,0)`); await sleep(300);
    runs.push(await ev(`new Promise(res=>{let last=performance.now(),n=0,y=0;const t0=last,ft=[];function f(now){ft.push(now-last);last=now;n++;scrollTo(0,y+=8);if(now-t0<3000)requestAnimationFrame(f);else{ft.sort((a,b)=>a-b);res({fps:Math.round(n/3),p95:Math.round(ft[Math.floor(ft.length*.95)]),max:Math.round(ft[ft.length-1])})}}requestAnimationFrame(f)})`));
  }
  const wheel = await ev(`new Promise(res=>{let last=performance.now(),ft=[],i=0;function f(now){ft.push(now-last);last=now;if(i<60){scrollBy(0,120);i++;requestAnimationFrame(f)}else{ft.sort((a,b)=>a-b);res({avg:Math.round(ft.reduce((a,b)=>a+b)/ft.length),p95:Math.round(ft[Math.floor(ft.length*.95)])})}}requestAnimationFrame(f)})`);
  console.log(label.padEnd(10), info.padEnd(30), 'scroll', JSON.stringify(runs), 'wheel', JSON.stringify(wheel));
};
try {
  await send('Runtime.enable');
  await send('Page.bringToFront');
  await send('Page.navigate', { url: 'http://localhost:4321/' });
  await sleep(300);
  // rAF gerçekten tıklıyor mu? (pencere örtülüyse Chrome rAF'ı dondurur ve ölçüm anlamsız olur)
  const alive = await ev(`Promise.race([new Promise(r=>{let n=0;(function f(){if(++n>=5)r(true);else requestAnimationFrame(f)})()}), new Promise(r=>setTimeout(()=>r(false),2500))])`);
  console.log('visibility:', await ev(`document.visibilityState`), 'rAF alive:', alive);
  if (!alive) throw new Error('window not visible — rAF frozen');
  await sleep(4200);
  console.log('canvas removed:', await ev(`!document.getElementById('hyperspace')`));
  await measure('3 layers');
  await ev(`document.querySelectorAll('.stars__layer')[1].style.display='none'`); await sleep(400);
  await measure('2 layers');
  await ev(`document.querySelectorAll('.stars__layer')[0].style.display='none'`); await sleep(400);
  await measure('1 layer');
  await ev(`document.querySelectorAll('.stars__layer')[2].style.display='none'`); await sleep(400);
  await measure('0 layers');
  await ev(`document.getElementById('stars').style.display='none'`); await sleep(400);
  await measure('no container');
  console.log('logs:', JSON.stringify(logs));
} catch (e) { console.log('ABORTED:', e.message); }
clearTimeout(watchdog); ws.close(); chrome.kill();
