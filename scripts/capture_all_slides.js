const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'file:///C:/Users/phamd/OneDrive/Documents/.gdqp%20v2/index.html';
const outputDir = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function captureSlides() {
  console.log('📸 [CHỤP MÀN HÌNH] Khởi động Edge Headless...');
  const edge = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080',
    targetUrl
  ]);

  await new Promise(r => setTimeout(r, 2500));

  http.get('http://127.0.0.1:9225/json', (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', async () => {
      let targets;
      try {
        targets = JSON.parse(raw);
      } catch (e) {
        console.error('Failed to parse json targets:', raw);
        edge.kill();
        process.exit(1);
      }
      const pageTarget = targets.find(t => t.type === 'page' && t.url.includes('index.html'));
      if (!pageTarget) {
        console.error('❌ Không tìm thấy trang index.html');
        edge.kill();
        process.exit(1);
      }

      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

      let msgId = 1;
      const sendCommand = (method, params = {}) => {
        return new Promise((resolve) => {
          const id = msgId++;
          const handler = (event) => {
            const data = JSON.parse(event.data);
            if (data.id === id) {
              ws.removeEventListener('message', handler);
              resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id, method, params }));
        });
      };

      const evalScript = async (expression) => {
        const res = await sendCommand('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        return res?.result?.value;
      };

      ws.onopen = async () => {
        console.log('🔌 WebSocket DevTools đã kết nối thành công!');
        await sendCommand('Runtime.enable');
        await sendCommand('Page.enable');

        // Đảm bảo trang đã nạp xong
        await new Promise(r => setTimeout(r, 1000));

        for (let i = 1; i <= 12; i++) {
          console.log(`📸 Đang chụp Slide ${i}/12...`);
          await evalScript(`window.presentationEngine.goToSlide(${i});`);
          await new Promise(r => setTimeout(r, 800));

          const screenshotRes = await sendCommand('Page.captureScreenshot', { format: 'png' });
          if (screenshotRes && screenshotRes.data) {
            const buffer = Buffer.from(screenshotRes.data, 'base64');
            const fileName = `slide_${String(i).padStart(2, '0')}.png`;
            const filePath = path.join(outputDir, fileName);
            fs.writeFileSync(filePath, buffer);
            console.log(`  ✅ Đã lưu: ${fileName} (${(buffer.length / 1024).toFixed(1)} KB)`);
          } else {
            console.error(`  ❌ Không chụp được Slide ${i}`);
          }
        }

        console.log('🎉 Hoàn tất chụp 12 slide!');
        ws.close();
        edge.kill();
        process.exit(0);
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        edge.kill();
        process.exit(1);
      };
    });
  }).on('error', (e) => {
    console.error('HTTP get error:', e);
    edge.kill();
    process.exit(1);
  });
}

captureSlides();
