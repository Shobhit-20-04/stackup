import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/Shobhit/.gemini/antigravity/brain/4529d97a-b96f-4f4d-83e3-3ef8e2e442d7';
const EDGE_PATH = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const USER_DATA_DIR = path.join(process.cwd(), '.temp-edge-profile');

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (fs.existsSync(USER_DATA_DIR)) {
    try {
      fs.rmSync(USER_DATA_DIR, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }

  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    `--user-data-dir=${USER_DATA_DIR}`,
    '--window-size=1440,900',
    'about:blank',
  ]);

  await sleep(1500);

  try {
    const listRes = await fetch('http://127.0.0.1:9222/json/list');
    const tabs = await listRes.json();
    const wsUrl = tabs[0]?.webSocketDebuggerUrl;
    if (!wsUrl) throw new Error('No webSocketDebuggerUrl found');

    const ws = new WebSocket(wsUrl);

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data);
        pending.delete(data.id);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve) => {
        pending.set(msgId, resolve);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // 1. Capture Light Mode Homepage
    console.log('Navigating to homepage...');
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2000);

    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.setAttribute('data-theme', 'lavender');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('stackup-theme', 'lavender');
        window.dispatchEvent(new CustomEvent('stackup-theme-change', { detail: { isDark: false, themeId: 'lavender' } }));
      `,
    });
    await sleep(500);

    let snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'light_home.png'), Buffer.from(snap.result.data, 'base64'));
    console.log('Saved light_home.png');

    // 2. Set authenticated user in localStorage
    console.log('Navigating to DSA workspace for Two Sum...');
    await send('Page.navigate', { url: 'http://localhost:3000/dsa?problem=dsa-1' });
    await sleep(2000);

    // Set authenticated user and stay in light mode
    await send('Runtime.evaluate', {
      expression: `
        localStorage.setItem('sb-demo-user', JSON.stringify({ id: 'usr-coder-101', email: 'alex@stackup.xyz', full_name: 'Alex Coder' }));
        document.cookie = 'sb-demo-user=' + encodeURIComponent(JSON.stringify({ id: 'usr-coder-101', email: 'alex@stackup.xyz', full_name: 'Alex Coder' })) + '; path=/';
        document.documentElement.setAttribute('data-theme', 'lavender');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('stackup-theme', 'lavender');
        window.dispatchEvent(new CustomEvent('stackup-theme-change', { detail: { isDark: false, themeId: 'lavender' } }));
      `,
    });
    // Reload with authenticated session in light mode
    await send('Page.navigate', { url: 'http://localhost:3000/dsa?problem=dsa-1' });
    await sleep(3000);

    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'light_workspace.png'), Buffer.from(snap.result.data, 'base64'));
    console.log('Saved light_workspace.png');

    // 3. Switch to Dark Mode
    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.setAttribute('data-theme', 'cosmic');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('stackup-theme', 'cosmic');
        window.dispatchEvent(new CustomEvent('stackup-theme-change', { detail: { isDark: true, themeId: 'cosmic' } }));
      `,
    });
    await sleep(1000);

    snap = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(ARTIFACTS_DIR, 'dark_workspace.png'), Buffer.from(snap.result.data, 'base64'));
    console.log('Saved dark_workspace.png');

    ws.close();
    console.log('Done capturing screenshots!');
  } finally {
    edge.kill();
  }
}

main().catch(console.error);
