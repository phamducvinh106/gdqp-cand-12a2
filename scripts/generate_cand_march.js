/**
 * GENERATE_CAND_MARCH.JS
 * Soạn và tổng hợp bản nhạc không lời chủ đề Công an nhân dân Việt Nam
 * Giai điệu hào hùng, nhịp điệu hành khúc điều lệnh diễu binh 116 BPM
 * Phối khí: Kèn Trumpet, French Horn, Trombone, Tuba, Trống cái Timpani, Snare Cadence & Crash Cymbals
 */

const fs = require('fs');
const path = require('path');

const sampleRate = 44100;
const bpm = 116;
const beatDuration = 60 / bpm; // ~0.5172s per beat (quarter note)
const numBars = 16;            // 16 ô nhịp 4/4 = 64 phách
const totalBeats = numBars * 4;
const totalDuration = totalBeats * beatDuration; // ~33.1s
const totalSamples = Math.floor(sampleRate * totalDuration);

console.log(`Đang tổng hợp Bản nhạc Hành khúc CAND: ${totalDuration.toFixed(2)}s (${totalSamples} samples, Stereo 44.1kHz)...`);

const left = new Float32Array(totalSamples);
const right = new Float32Array(totalSamples);

// Bảng tần số nốt nhạc chuẩn (A4 = 440Hz)
const NOTES = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
  'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98
};

// Hàm tạo kèn đồng Trumpet/Horn (Sawtooth + Rich Harmonics + Envelope)
function renderBrassNote(noteName, startBeat, durBeats, vol = 0.25, pan = 0.0, instrument = 'trumpet') {
  const freq = NOTES[noteName];
  if (!freq) return;

  const startSample = Math.floor(startBeat * beatDuration * sampleRate);
  const durSec = durBeats * beatDuration;
  const numSamples = Math.floor(durSec * sampleRate);

  for (let i = 0; i < numSamples && (startSample + i) < totalSamples; i++) {
    const t = i / sampleRate;
    const progress = t / durSec;

    // ADSR Envelope
    let env = 0;
    if (t < 0.04) {
      env = t / 0.04; // Attack nhanh, dõng dạc
    } else if (progress < 0.8) {
      env = 1.0 - (progress * 0.15); // Sustain ổn định
    } else {
      env = 0.85 * (1.0 - (progress - 0.8) / 0.2); // Release mượt mà
    }

    // Vibrato nhẹ ở đuôi nốt
    const vib = t > 0.15 ? Math.sin(2 * Math.PI * 5.5 * (t - 0.15)) * 0.008 : 0;
    const curFreq = freq * (1 + vib);

    // Kèn đồng tổng hợp đa họa âm (Sawtooth + Sine + Triangle)
    let sample = 0;
    if (instrument === 'trumpet') {
      // Âm thanh kèn Trumpet: sáng, vang, anh dũng
      sample = 0.40 * Math.sin(2 * Math.PI * curFreq * t) +
               0.30 * Math.sin(2 * Math.PI * curFreq * 2 * t) +
               0.18 * Math.sin(2 * Math.PI * curFreq * 3 * t) +
               0.12 * Math.sin(2 * Math.PI * curFreq * 4 * t);
    } else if (instrument === 'horn') {
      // Âm French Horn: trầm ấm, dày dặn
      sample = 0.55 * Math.sin(2 * Math.PI * curFreq * t) +
               0.30 * Math.sin(2 * Math.PI * curFreq * 2 * t) +
               0.15 * Math.sin(2 * Math.PI * curFreq * 3 * t);
    } else if (instrument === 'tuba') {
      // Âm kèn Tuba / Bass: dứt khoát, chắc nịch
      sample = 0.60 * Math.sin(2 * Math.PI * curFreq * t) +
               0.25 * Math.sin(2 * Math.PI * curFreq * 2 * t) +
               0.15 * Math.sin(2 * Math.PI * curFreq * 3 * t);
      env = Math.exp(-t * 3.5); // Bass nẩy staccato
    }

    const val = sample * env * vol;
    // Stereo panning (-1: Trái, 0: Giữa, +1: Phải)
    const leftGain = Math.cos((pan + 1) * Math.PI / 4);
    const rightGain = Math.sin((pan + 1) * Math.PI / 4);

    left[startSample + i] += val * leftGain;
    right[startSample + i] += val * rightGain;
  }
}

// 1. DÀN BASS TUBA & CELLO ĐIỀU LỆNH (NHỊP BƯỚC HÀNH QUÂN RẦM RẬP)
// Hợp âm theo 16 ô nhịp:
// [0-3]: C - C - G - C  (Khởi động diễu binh)
// [4-7]: C - F - G - C  (Hiệu triệu khí thế)
// [8-11]: F - C - G - Am (Cao trào ý chí)
// [12-15]: F - G - G7 - C (Khúc khải hoàn vinh quang)
const barChords = [
  'C', 'C', 'G', 'C',
  'C', 'F', 'G', 'C',
  'F', 'C', 'G', 'Am',
  'F', 'C', 'G', 'C'
];

const chordBassNotes = {
  'C': ['C2', 'G2', 'C3', 'G2'],
  'F': ['F2', 'C3', 'F2', 'C3'],
  'G': ['G2', 'D3', 'G2', 'D3'],
  'Am': ['A2', 'E3', 'A2', 'E3']
};

for (let bar = 0; bar < numBars; bar++) {
  const chord = barChords[bar];
  const bassNotes = chordBassNotes[chord] || ['C2', 'G2', 'C3', 'G2'];
  for (let beatInBar = 0; beatInBar < 4; beatInBar++) {
    const beat = bar * 4 + beatInBar;
    const note = bassNotes[beatInBar];
    renderBrassNote(note, beat, 0.9, 0.28, -0.2, 'tuba');
  }
}

// 2. DÀN FRENCH HORNS (HÒA ÂM NỀN OAI NGHIÊM)
const chordHornPads = {
  'C': ['E3', 'G3'],
  'F': ['F3', 'A3'],
  'G': ['D3', 'G3'],
  'Am': ['E3', 'A3']
};

for (let bar = 0; bar < numBars; bar++) {
  const chord = barChords[bar];
  const pads = chordHornPads[chord] || ['E3', 'G3'];
  const startBeat = bar * 4;
  pads.forEach((padNote, pIdx) => {
    // Kèn Horn giữ hòa âm bè 2 và bè 3
    renderBrassNote(padNote, startBeat, 3.8, 0.16, pIdx === 0 ? -0.4 : 0.4, 'horn');
  });
}

// 3. GIAI ĐIỆU CHÍNH HÀO HÙNG - TRUMPET LĨNH XƯỚNG (HEROIC POLICE MARCH MELODY)
// Giai điệu mang âm hưởng hào sảng, phấn chấn:
// "Vì nước quên thân, vì dân phục vụ - Tiến bước dưới cờ Đảng quang vinh"
const leadMelody = [
  // --- ĐOẠN 1: MỞ MÀN HIỆU TRIỆU (Bars 0 - 3) ---
  { note: 'G4', beat: 0.0, dur: 0.75 },
  { note: 'G4', beat: 0.75, dur: 0.25 },
  { note: 'C5', beat: 1.0, dur: 1.5 },
  { note: 'E5', beat: 2.5, dur: 0.5 },
  { note: 'G5', beat: 3.0, dur: 1.0 },

  { note: 'E5', beat: 4.0, dur: 1.5 },
  { note: 'D5', beat: 5.5, dur: 0.5 },
  { note: 'C5', beat: 6.0, dur: 1.0 },
  { note: 'E5', beat: 7.0, dur: 1.0 },

  { note: 'D5', beat: 8.0, dur: 1.5 },
  { note: 'E5', beat: 9.5, dur: 0.5 },
  { note: 'F5', beat: 10.0, dur: 1.0 },
  { note: 'D5', beat: 11.0, dur: 1.0 },

  { note: 'G5', beat: 12.0, dur: 2.0 },
  { note: 'C5', beat: 14.0, dur: 1.0 },
  { note: 'E5', beat: 15.0, dur: 1.0 },

  // --- ĐOẠN 2: BƯỚC ĐIỀU LỆNH RỘN RÃ (Bars 4 - 7) ---
  { note: 'G5', beat: 16.0, dur: 1.25 },
  { note: 'G5', beat: 17.25, dur: 0.75 },
  { note: 'A5', beat: 18.0, dur: 1.0 },
  { note: 'F5', beat: 19.0, dur: 1.0 },

  { note: 'E5', beat: 20.0, dur: 1.5 },
  { note: 'D5', beat: 21.5, dur: 0.5 },
  { note: 'C5', beat: 22.0, dur: 2.0 },

  { note: 'D5', beat: 24.0, dur: 0.75 },
  { note: 'E5', beat: 24.75, dur: 0.25 },
  { note: 'F5', beat: 25.0, dur: 1.0 },
  { note: 'G5', beat: 26.0, dur: 1.0 },
  { note: 'B4', beat: 27.0, dur: 1.0 },

  { note: 'C5', beat: 28.0, dur: 3.0 },

  // --- ĐOẠN 3: CAO TRÀO BẢN LĨNH CHIẾN SĨ CAND (Bars 8 - 11) ---
  { note: 'A5', beat: 32.0, dur: 1.5 },
  { note: 'A5', beat: 33.5, dur: 0.5 },
  { note: 'F5', beat: 34.0, dur: 1.0 },
  { note: 'A5', beat: 35.0, dur: 1.0 },

  { note: 'G5', beat: 36.0, dur: 1.5 },
  { note: 'E5', beat: 37.5, dur: 0.5 },
  { note: 'C5', beat: 38.0, dur: 1.5 },
  { note: 'E5', beat: 39.5, dur: 0.5 },

  { note: 'D5', beat: 40.0, dur: 1.0 },
  { note: 'F5', beat: 41.0, dur: 1.0 },
  { note: 'E5', beat: 42.0, dur: 1.0 },
  { note: 'D5', beat: 43.0, dur: 1.0 },

  { note: 'E5', beat: 44.0, dur: 2.0 },
  { note: 'G5', beat: 46.0, dur: 2.0 },

  // --- ĐOẠN 4: KHÚC KHẢI HOÀN TOÀN THẮNG & VINH QUANG (Bars 12 - 15) ---
  { note: 'A5', beat: 48.0, dur: 1.0 },
  { note: 'B5', beat: 49.0, dur: 1.0 },
  { note: 'C6', beat: 50.0, dur: 1.5 },
  { note: 'G5', beat: 51.5, dur: 0.5 },

  { note: 'E5', beat: 52.0, dur: 1.0 },
  { note: 'F5', beat: 53.0, dur: 1.0 },
  { note: 'G5', beat: 54.0, dur: 2.0 },

  { note: 'D5', beat: 56.0, dur: 1.0 },
  { note: 'E5', beat: 57.0, dur: 1.0 },
  { note: 'F5', beat: 58.0, dur: 1.0 },
  { note: 'B4', beat: 59.0, dur: 1.0 },

  // Nốt kết hào hùng rực rỡ (C Major Tutti)
  { note: 'C5', beat: 60.0, dur: 3.8 }
];

// Render Lead Trumpet + Bè đôi hòa âm Trumpet 2 (Quãng 3)
leadMelody.forEach(item => {
  renderBrassNote(item.note, item.beat, item.dur, 0.32, 0.15, 'trumpet');
  // Bè phụ hòa âm quãng 3 trầm hơn
  const semitonesDown = item.note.startsWith('C') ? 'G4' :
                        item.note.startsWith('E') ? 'C5' :
                        item.note.startsWith('G') ? 'E5' :
                        item.note.startsWith('A') ? 'F5' : 'D5';
  renderBrassNote(semitonesDown, item.beat, item.dur, 0.18, -0.25, 'trumpet');
});

// 4. BỘ GÕ QUÂN NHẠC DIỄU BINH (DRUM & CYMBALS SECTION)
for (let beat = 0; beat < totalBeats; beat++) {
  const bar = Math.floor(beat / 4);
  const beatInBar = beat % 4;
  const startSample = Math.floor(beat * beatDuration * sampleRate);

  // A. TRỐNG CÁI (BASS DRUM / TIMPANI) - Nhịp 1 & 3 mạnh mẽ
  if (beatInBar === 0 || beatInBar === 2) {
    const isHeavyDownbeat = (beatInBar === 0);
    const kickDur = isHeavyDownbeat ? 0.35 : 0.25;
    const kickSamples = Math.floor(sampleRate * kickDur);
    const startFreq = isHeavyDownbeat ? 140 : 120;
    const endFreq = 48;

    for (let i = 0; i < kickSamples && (startSample + i) < totalSamples; i++) {
      const t = i / sampleRate;
      const freq = (startFreq - endFreq) * Math.exp(-t * 24) + endFreq;
      const env = Math.exp(-t * (isHeavyDownbeat ? 10 : 14));
      const val = Math.sin(2 * Math.PI * freq * t) * env * (isHeavyDownbeat ? 0.45 : 0.35);
      left[startSample + i] += val;
      right[startSample + i] += val;
    }
  }

  // B. TRỐNG CON (SNARE CADENCE DIỄU BINH)
  // Nhịp 2 & 4 nện dứt khoát, kèm nhịp lướt 1/16 (Marching Roll)
  const snareHits = [];
  if (beatInBar === 1 || beatInBar === 3) {
    snareHits.push({ offsetSec: 0, power: 0.38 }); // Đánh chính
  }
  // Nhịp đệm quân hành (grace notes / rolls)
  if (beatInBar === 0 || beatInBar === 2) {
    snareHits.push({ offsetSec: beatDuration * 0.5, power: 0.18 });
    snareHits.push({ offsetSec: beatDuration * 0.75, power: 0.22 });
  }

  snareHits.forEach(hit => {
    const hitStart = startSample + Math.floor(hit.offsetSec * sampleRate);
    const snareLen = Math.floor(sampleRate * 0.18);
    for (let i = 0; i < snareLen && (hitStart + i) < totalSamples; i++) {
      const t = i / sampleRate;
      // Tiếng rè kim loại dây tem (white noise) + Tiếng vỏ trống (body tone 190Hz)
      const noise = (Math.random() * 2 - 1) * Math.exp(-t * 28);
      const tone = Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t * 22);
      const val = (noise * 0.7 + tone * 0.3) * hit.power;
      left[hitStart + i] += val * 0.9;
      right[hitStart + i] += val * 1.1; // Hơi lệch stereo cho rộng
    }
  });

  // C. CHŨM CHỌE ĐỒNG (CRASH CYMBAL) - Đầu các ô nhịp 0, 4, 8, 12, 14, 15
  if (beatInBar === 0 && (bar === 0 || bar === 4 || bar === 8 || bar === 12 || bar === 15)) {
    const cymbalLen = Math.floor(sampleRate * 1.8);
    for (let i = 0; i < cymbalLen && (startSample + i) < totalSamples; i++) {
      const t = i / sampleRate;
      // Metallic shimmer noise + High metallic ring
      const noise = (Math.random() * 2 - 1) * Math.exp(-t * 4.0);
      const ring = (Math.sin(2 * Math.PI * 3400 * t) + Math.sin(2 * Math.PI * 4800 * t)) * 0.25 * Math.exp(-t * 5.0);
      const val = (noise * 0.8 + ring * 0.2) * 0.26;
      left[startSample + i] += val * 1.1;
      right[startSample + i] += val * 0.9;
    }
  }
}

// 5. MASTERING: NORMALIZE & SOFT LIMITER ĐẢM BẢO ÂM THANH DÀY DẶN, KHÔNG CLIP
console.log('Đang cân bằng âm lượng (Mastering & Soft Limiting)...');
let peak = 0;
for (let i = 0; i < totalSamples; i++) {
  if (Math.abs(left[i]) > peak) peak = Math.abs(left[i]);
  if (Math.abs(right[i]) > peak) peak = Math.abs(right[i]);
}

const targetPeak = 0.92;
const gainFactor = peak > 0 ? targetPeak / peak : 1.0;

// Tạo Buffer WAV chuẩn (16-bit PCM Stereo)
const dataSize = totalSamples * 2 * 2; // 2 channels * 2 bytes/sample
const headerSize = 44;
const wavBuffer = Buffer.alloc(headerSize + dataSize);

// Header WAV
wavBuffer.write('RIFF', 0);
wavBuffer.writeUInt32LE(36 + dataSize, 4);
wavBuffer.write('WAVE', 8);
wavBuffer.write('fmt ', 12);
wavBuffer.writeUInt32LE(16, 16);          // Subchunk1Size (16 for PCM)
wavBuffer.writeUInt16LE(1, 20);           // AudioFormat (1 = PCM)
wavBuffer.writeUInt16LE(2, 22);           // NumChannels (2 = Stereo)
wavBuffer.writeUInt32LE(sampleRate, 24);  // SampleRate
wavBuffer.writeUInt32LE(sampleRate * 4, 28); // ByteRate (SampleRate * NumChannels * BitsPerSample/8)
wavBuffer.writeUInt16LE(4, 32);           // BlockAlign (NumChannels * BitsPerSample/8)
wavBuffer.writeUInt16LE(16, 34);          // BitsPerSample (16 bits)
wavBuffer.write('data', 36);
wavBuffer.writeUInt32LE(dataSize, 40);

let offset = 44;
for (let i = 0; i < totalSamples; i++) {
  // Soft tanh limiter
  let sampleL = Math.tanh(left[i] * gainFactor);
  let sampleR = Math.tanh(right[i] * gainFactor);

  const intL = Math.max(-32768, Math.min(32767, Math.floor(sampleL * 32767)));
  const intR = Math.max(-32768, Math.min(32767, Math.floor(sampleR * 32767)));

  wavBuffer.writeInt16LE(intL, offset);
  offset += 2;
  wavBuffer.writeInt16LE(intR, offset);
  offset += 2;
}

const outPath = path.join(__dirname, '..', 'assets', 'audio', 'cand_heroic_march.wav');
fs.writeFileSync(outPath, wavBuffer);
console.log(`✅ Đã xuất thành công bản nhạc hào hùng: ${outPath} (${(wavBuffer.length / (1024 * 1024)).toFixed(2)} MB)`);
