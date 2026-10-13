const http = require('http');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const edge = spawn(edgePath, ['--headless', '--remote-debugging-port=9225', '--disable-gpu', 'about:blank']);

setTimeout(() => {
  http.get('http://127.0.0.1:9225/json', (res) => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      const targets = JSON.parse(raw);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
      ws.onopen = () => {
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `JSON.stringify({
              mp4: MediaRecorder.isTypeSupported('video/mp4'),
              webm: MediaRecorder.isTypeSupported('video/webm')
            })`,
            returnByValue: true
          }
        }));
      };
      ws.onmessage = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === 1) {
          console.log('MediaRecorder support:', d.result?.result?.value);
          ws.close();
          edge.kill();
          process.exit(0);
        }
      };
    });
  });
}, 1500);
