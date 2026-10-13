const fs = require('fs');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const videosDir = path.join(__dirname, 'assets', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Danh sách các video cần tạo từ ảnh AI
const videoConfigs = [
  {
    name: 'slide1_parade_loop.mp4',
    imageFile: 'assets/images/slide1_parade.jpg',
    type: 'parade',
    title: 'DIỄU BINH CÔNG AN NHÂN DÂN VIỆT NAM'
  },
  {
    name: 'slide4_cyber.mp4',
    imageFile: 'assets/images/slide4_cyber.jpg',
    type: 'cyber',
    title: 'TRUNG TÂM TÁC CHIẾN AN NINH MẠNG 4.0'
  },
  {
    name: 'slide5_fire.mp4',
    imageFile: 'assets/images/slide5_fire.jpg',
    type: 'fire',
    title: 'CẢNH SÁT PCCC & CỨU NẠN CỨU HỘ'
  },
  {
    name: 'slide11_marching_loop.mp4',
    imageFile: 'assets/images/slide11_parade.jpg',
    type: 'parade',
    title: 'RÈN LUYỆN KỶ LUẬT THÉP & ĐIỀU LỆNH'
  },
  {
    name: 'slide12_arena.mp4',
    imageFile: 'assets/images/slide12_arena.jpg',
    type: 'arena',
    title: 'ĐẤU TRƯỜNG TRI THỨC CAND GRAND QUIZ'
  }
];

async function generateAllVideos() {
  console.log('🎬 [BẮT ĐẦU] Khởi động Edge Headless để tạo các video MP4 thực tế từ ảnh AI...');

  const edge = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9226',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1280,720',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9226/json', (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', async () => {
      const targets = JSON.parse(raw);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);

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
        if (res?.exceptionDetails) {
          console.error('Eval error:', res.exceptionDetails);
        }
        return res?.result?.value;
      };

      ws.onopen = async () => {
        await sendCommand('Runtime.enable');

        for (const config of videoConfigs) {
          console.log(`\n🎥 Đang render video: ${config.name}...`);
          const fullImgPath = path.join(__dirname, config.imageFile);
          if (!fs.existsSync(fullImgPath)) {
            console.error(`❌ Không tìm thấy ảnh nguồn: ${fullImgPath}`);
            continue;
          }

          const imgBase64 = fs.readFileSync(fullImgPath).toString('base64');
          const dataUrl = `data:image/jpeg;base64,${imgBase64}`;

          const renderScript = `
            new Promise((resolve, reject) => {
              const canvas = document.createElement('canvas');
              canvas.width = 960;
              canvas.height = 540;
              const ctx = canvas.getContext('2d');

              const img = new Image();
              img.onload = () => {
                const stream = canvas.captureStream(30);
                const recorder = new MediaRecorder(stream, {
                  mimeType: 'video/mp4',
                  videoBitsPerSecond: 2500000
                });

                const chunks = [];
                recorder.ondataavailable = e => chunks.push(e.data);
                recorder.onstop = async () => {
                  const blob = new Blob(chunks, { type: 'video/mp4' });
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1];
                    resolve(base64data);
                  };
                  reader.readAsDataURL(blob);
                };

                recorder.start();

                let frame = 0;
                const totalFrames = 90; // 3 giây ở 30fps

                function drawFrame() {
                  const progress = frame / totalFrames;
                  // Ken Burns effect: slow cinematic zoom & gentle pan
                  const zoom = 1.0 + (progress * 0.08);
                  const panX = Math.sin(progress * Math.PI) * 15;
                  const panY = progress * 10;

                  ctx.save();
                  ctx.fillStyle = '#000';
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  const drawW = canvas.width * zoom;
                  const drawH = canvas.height * zoom;
                  const drawX = (canvas.width - drawW) / 2 + panX;
                  const drawY = (canvas.height - drawH) / 2 + panY;

                  ctx.drawImage(img, drawX, drawY, drawW, drawH);

                  // Hiệu ứng ánh sáng điện ảnh (Cinematic light sweep)
                  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
                  gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
                  gradient.addColorStop(progress, 'rgba(255,226,89,0.12)');
                  gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
                  ctx.fillStyle = gradient;
                  ctx.fillRect(0, 0, canvas.width, canvas.height);

                  // Watermark badge nhỏ góc dưới
                  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
                  ctx.fillRect(15, canvas.height - 35, 340, 24);
                  ctx.fillStyle = '#fde047';
                  ctx.font = 'bold 11px sans-serif';
                  ctx.fillText('🔴 BỘ CÔNG AN • ${config.title}', 22, canvas.height - 19);

                  ctx.restore();

                  frame++;
                  if (frame < totalFrames) {
                    requestAnimationFrame(drawFrame);
                  } else {
                    recorder.stop();
                  }
                }

                drawFrame();
              };
              img.src = '${dataUrl}';
            })
          `;

          const videoBase64 = await evalScript(renderScript);
          if (videoBase64) {
            const outPath = path.join(videosDir, config.name);
            fs.writeFileSync(outPath, Buffer.from(videoBase64, 'base64'));
            const sizeKb = Math.round(fs.statSync(outPath).size / 1024);
            console.log(`  ✅ Đã tạo thành công: ${config.name} (${sizeKb} KB)`);
          } else {
            console.error(`  ❌ Lỗi khi render: ${config.name}`);
          }
        }

        console.log('\n🎉 [HOÀN TẤT] Toàn bộ video MP4 đã được sinh ra và đưa vào dự án!');
        ws.close();
        edge.kill();
        process.exit(0);
      };
    });
  });
}

generateAllVideos();
