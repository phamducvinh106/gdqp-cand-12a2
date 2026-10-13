# KẾ HOẠCH NÂNG CẤP MEDIA AI CHO BÀI THUYẾT TRÌNH WEB SINGLE-PAGE
## TÍCH HỢP HỆ THỐNG HÌNH ẢNH, VIDEO LOOP VÀ ÂM NHẠC TẠO SINH BỞI AI

---

## 1. TỔNG QUAN & NGUYÊN TẮC THIẾT KẾ KIẾN TRÚC

### 1.1. Hiện trạng & Mục tiêu nâng cấp
* **Hiện trạng:** Bản phát hành hiện tại đã vận hành trơn tru về mặt cấu trúc (12 slide, 4 mini-game, điều hướng, sound synth), nhưng giao diện chủ yếu dùng CSS gradient, bảng màu phẳng và emoji icon, chưa tận dụng hình ảnh, video loop và âm nhạc chân thực do AI tạo sinh.
* **Mục tiêu nâng cấp:**
  1. Nâng cấp toàn diện trải nghiệm thị giác và thính giác bằng media AI (Midjourney, Runway Gen-3, Kling AI, Suno/Udio).
  2. Áp dụng phong cách thị giác điện ảnh (Cinematic Photorealism), màu sắc trang nghiêm, chuẩn điều lệnh Công an Nhân dân Việt Nam.
  3. **Nguyên tắc "Smart Hybrid Fallback" (Cực kỳ quan trọng):** Đảm bảo website luôn hoạt động mượt mà 100% trong cả 2 trường hợp:
     * Khi có đầy đủ file MP4/JPG/MP3 trong thư mục `assets/` -> Nạp trực tiếp media AI chất lượng cao.
     * Khi chạy offline hoặc chưa kịp tải file -> Tự động chuyển đổi mượt mà sang High-Fidelity SVG Vector và Web Audio API Synth, **tuyệt đối không bị lỗi icon ảnh vỡ (broken image) hay dừng phát nhạc.**

---

## 2. KIẾN TRÚC TỔ CHỨC TÀI NGUYÊN MEDIA (DIRECTORY PIPELINE)

```text
c:\Users\phamd\OneDrive\Documents\.gdqp v2/
├── assets/
│   ├── images/                       # Hình ảnh AI (Midjourney / Kling)
│   │   ├── slide1_hero_cadets.jpg    # Hàng ngũ học viên duyệt binh trang nghiêm
│   │   ├── slide2_badge_security.png # Phù hiệu 3D An ninh nhân dân
│   │   ├── slide2_badge_police.png   # Phù hiệu 3D Cảnh sát nhân dân
│   │   ├── slide2_badge_fire.png     # Phù hiệu 3D Cảnh sát PCCC & CNCH
│   │   ├── slide3_academy_campus.jpg # Khuôn viên hiện đại Học viện CAND
│   │   ├── slide4_cyber_police.jpg   # Cảnh sát an ninh mạng công nghệ cao
│   │   ├── slide5_fire_action.jpg    # Lực lượng PCCC tác chiến dập lửa
│   │   ├── slide7_medical_check.jpg  # Khám thể lực, thị lực và chiều cao
│   │   ├── slide9_diploma_exam.jpg   # Bằng tốt nghiệp & Bài thi đánh giá BCA
│   │   ├── slide10_desk_officer.jpg  # Bàn làm việc cán bộ sơ tuyển công an xã
│   │   └── slide11_tactics_drill.jpg # Võ thuật tác chiến & bắn súng CAND
│   ├── videos/                       # Video AI Loops (Runway Gen-3 / Kling)
│   │   ├── slide1_parade_loop.mp4    # Video nền diễu binh buổi sáng 1080p
│   │   ├── slide5_rescue_loop.mp4    # Video diễn tập cứu hỏa khẩn cấp
│   │   └── slide11_marching_loop.mp4 # Video diễu binh khối học viên CAND
│   └── audio/                        # Nhạc nền & Hiệu ứng SFX (Suno / Udio)
│       ├── bgm_marching_heroic.mp3   # Nhạc diễu binh khí thế mở màn (Track 1)
│       ├── bgm_ambient_cadet.mp3     # Nhạc nền thuyết trình trầm lắng (Track 2)
│       ├── bgm_quiz_tension.mp3      # Nhạc đếm ngược hồi hộp 15s (Track 3)
│       ├── bgm_victory_fanfare.mp3   # Nhạc khúc khải hoàn vinh danh (Track 4)
│       ├── sfx_card_flip.wav         # Tiếng lật thẻ bài swoosh
│       ├── sfx_stamp_heavy.wav       # Tiếng dập dấu mộc đỏ bàn làm việc
│       ├── sfx_correct_ting.wav      # Chuông reo chính xác
│       └── sfx_wrong_buzzer.wav      # Còi báo sai
```

---

## 3. BẢNG ĐẶC TẢ MEDIA AI CHI TIẾT THEO TỪNG SLIDE (12 SLIDES)

| Slide | Nội dung chính | Loại Media AI | Hệ thống Prompt Tạo Sinh Chi Tiết (Suno / Midjourney / Runway) | Cơ chế hiển thị & Fallback |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Mở Màn Khí Thế | • **Video nền:** `slide1_parade_loop.mp4`<br>• **Audio:** `bgm_marching_heroic.mp3` | **Runway Gen-3 Prompt:**<br>`Cinematic slow tracking shot of Vietnamese police cadet academy parade ground, crisp green uniforms, golden morning sunlight, disciplined march, national pride, 4k 60fps cinematic lighting`<br>**Suno Prompt:**<br>`Epic Vietnamese heroic military march, brass fanfare, disciplined snare drums, ceremonial police academy pride, 105 BPM, studio master` | Video background `autoplay loop muted playsinline` với lớp phủ gradient làm mờ 60%. Nếu video lỗi -> Fallback sang Canvas Animated Particles vàng kim. |
| **2** | Mini-Game 1: Giải Mã Phù Hiệu | • **3 Ảnh 3D:**<br>`badge_security.png`<br>`badge_police.png`<br>`badge_fire.png` | **Midjourney Prompt:**<br>`3D photorealistic render of Vietnamese Security police emblem, golden star on red shield, laurel wreath, polished gold and enamel, dark studio cinematic rim lighting, 8k octane render --v 6.0` | 3 Thẻ bài 3D Flip Card hiển thị ảnh huy hiệu nổi khối 3D độ phân giải cao thay cho emoji icon. |
| **3** | Bức Tranh 11 Trường CAND | • **Ảnh minh họa:** `slide3_academy_campus.jpg` | **Midjourney Prompt:**<br>`Wide cinematic shot of the grand modern gate and campus of Vietnam People's Police Academy, wide asphalt avenue with trimmed trees, national flag waving, bright afternoon daylight, photorealistic architecture` | Làm ảnh nền mờ (Backdrop Blur) cho Bento Grid 3 cột, tạo chiều sâu thị giác. |
| **4** | Chi Tiết Khối Học Viện | • **Ảnh nghiệp vụ:** `slide4_cyber_police.jpg` | **Midjourney Prompt:**<br>`Vietnamese cyber crime police specialist sitting in modern command operations center, multiple high-tech blue neon cyber interface screens, disciplined uniform, sharp focused gaze, photorealistic details --ar 16:9` | Hiển thị trong khung chi tiết bên phải của Vertical Tab khi xem Học viện An ninh và HV Kỹ thuật. |
| **5** | ĐH Miền Nam & PCCC Toàn Quốc | • **Video loop:** `slide5_rescue_loop.mp4` | **Kling AI Prompt:**<br>`Urgent firefighting tactical drill by Vietnamese firefighter police squad, red firetruck, high-pressure water hose jet spraying, emergency smoke, dramatic rescue heroism, cinematic 4k` | Tích hợp trong thẻ Đại học PCCC; hover vào thẻ sẽ phát video loop thao trường cứu hỏa. |
| **6** | Mini-Game 2: Nối Trường - Ngành | • **SFX:** `sfx_card_flip.wav`<br>• `sfx_correct_ting.wav` | **Audio Prompt:**<br>`Clean wooden card click swoosh, satisfying crystal chime bell 880Hz, soft warning buzz` | Âm thanh SFX chân thực tương tác trực tiếp với HTML5 Canvas Line. |
| **7** | 4 Trụ Cột Tiêu Chuẩn & Tuổi | • **Ảnh minh họa:** `slide7_medical_check.jpg` | **Midjourney Prompt:**<br>`Clean minimalist medical and fitness assessment iconography for police entrance exam: heart pulse monitor, eye chart test, height scale, golden badge accents, modern glassmorphism UI --ar 16:9` | Infographic nền nổi khối cho 4 thẻ tiêu chuẩn thể lực và tuổi. |
| **8** | Lộ Trình 2 Bước Sơ Tuyển | • **Minh họa quy trình:** Icons bộ hồ sơ CAND | **Midjourney Prompt:**<br>`Leather police dossier file folder on wooden desk, official stamp document, police cadet cap beside, warm desk lamp lighting, cinematic still life` | Gắn vào các bước Stepper của Công an xã/phường. |
| **9** | 3 Phương Thức Tuyển Sinh | • **Ảnh minh họa:** `slide9_diploma_exam.jpg` | **Midjourney Prompt:**<br>`Official university entrance examination paper with golden seal of Ministry of Public Security Vietnam, IELTS certificate beside, fountain pen, prestige and excellence, photorealistic macro shot` | Tích hợp vào cột Phương thức 2 và Phương thức 3 làm nổi bật Bài thi đánh giá BCA. |
| **10** | Mini-Game 3: Phòng Sơ Tuyển Ảo | • **Ảnh nền bàn:** `slide10_desk_officer.jpg`<br>• **SFX:** `sfx_stamp_heavy.wav` | **Midjourney Prompt:**<br>`Overhead view of Vietnamese police officer wooden work desk, leather file folder, red ink stamp pad, brass seal, official application documents, ambient daylight`<br>**SFX Prompt:**<br>`Heavy wooden rubber stamp pressing firmly onto paper desk, sharp punch thud sound effect` | Nền bàn làm việc thực tế cho trò chơi duyệt hồ sơ, dập mộc đỏ in dấu kèm âm thanh dập mộc cơ học chân thực. |
| **11** | Môi Trường Rèn Luyện & Quyền Lợi | • **Video loop:** `slide11_marching_loop.mp4` | **Runway Gen-3 Prompt:**<br>`Disciplined Vietnamese police academy cadets practicing martial arts and synchronized formation marching on parade ground, determined expressions, heroic national pride, 4k 60fps slow motion` | Chạy nền liên tục bên khung 60% của Split Layout, truyền cảm hứng mạnh mẽ về đời sống học viên. |
| **12** | Đấu Trường Grand Quiz & Bế Mạc | • **Audio:** `bgm_quiz_tension.mp3`<br>• `bgm_victory_fanfare.mp3` | **Suno Prompt:**<br>`Track 3: Ticking clock suspenseful quiz game theme, 120 BPM, deep rhythmic bass plucks, rising anticipation`<br>`Track 4: Triumphant Vietnamese police brass fanfare, victory celebration, joyful fireworks symphony, heroic orchestral crescendo` | Tự động chuyển nhạc nền sang nhịp điệu hồi hộp khi vào Quiz; phát Fanfare hòa tấu khi đạt danh hiệu Chiến Sĩ Tri Thức. |

---

## 4. GIẢI PHÁP KỸ THUẬT ĐỂ TÍCH HỢP MEDIA MƯỢT MÀ

### 4.1. Bộ Điều Khiển Âm Nhạc Đa Kênh Thông Minh (Audio Controller Pro)
Nâng cấp `SoundManager` hiện tại thành hệ thống âm thanh 2 tầng:
1. **Tầng 1 (HTML5 Audio Pool):** Nạp và phát các file âm thanh chất lượng cao MP3/WAV khi file tồn tại.
2. **Tầng 2 (Web Audio API Synthesizer Fallback):** Nếu file âm thanh ngoại vi bị thiếu hoặc lỗi mạng, hệ thống **tự động fallback ngay lập tức sang bộ dao động tần số Synth** đã lập trình sẵn. Do đó, bài thuyết trình không bao giờ bị im lặng!
3. **Chuyển nhạc theo ngữ cảnh (Contextual Audio Switching):**
   * Slide 1: Bật `bgm_marching_heroic.mp3`.
   * Slide 2 đến 11: Chuyển sang `bgm_ambient_cadet.mp3` (âm lượng nhỏ 25% để người thuyết trình dễ nói).
   * Slide 12: Đổi sang `bgm_quiz_tension.mp3` hồi hộp; kết thúc kích hoạt `bgm_victory_fanfare.mp3`.

### 4.2. Video Loop Component Chống Giật Lag (Video Background Engine)
* Đặt thuộc tính chuẩn cho thẻ video: `<video autoplay loop muted playsinline preload="auto" poster="fallback_poster.jpg">`.
* Bắt sự kiện `onerror`: Nếu video không nạp được, tự động thay thế bằng hình ảnh nền CSS Gradient chuyển động nhẹ nhàng (Ken Burns effect).
* Lớp phủ làm mờ tối màu (`bg-slate-950/75 backdrop-blur-[2px]`) đặt đè lên video để đảm bảo chữ thuyết trình luôn tương phản sắc nét, không bị lóa mắt.

### 4.3. Trình Quản Lý Nạp Trước Media (Asset Preloader & Caching)
* Khi khởi động ứng dụng, nạp trước (preload) các ảnh của Slide 2, Slide 6, Slide 10 vào bộ nhớ RAM của trình duyệt thông qua JavaScript `new Image()`.
* Tránh hiện tượng nhấp nháy hoặc màn hình đen khi người thuyết trình bấm phím chuyển slide.

---

## 5. LỘ TRÌNH TRIỂN KHAI NÂNG CẤP (PHASE-BY-PHASE IMPLEMENTATION ROADMAP)

```text
GIAI ĐOẠN A: CHUẨN BỊ KHO MEDIA AI & MÔ PHỎNG NGUỒN TÀI NGUYÊN
├── Bước A.1: Khởi tạo cấu trúc thư mục assets/images, assets/videos, assets/audio
├── Bước A.2: Tạo các hình ảnh minh họa chất lượng cao / Vector Art chuẩn CAND
└── Bước A.3: Chuẩn bị các file âm thanh chuẩn (MP3/WAV) và các bản nhạc nền

GIAI ĐOẠN B: NÂNG CẤP ĐỘNG CƠ ÂM THANH TRONG src/js/engine.js & app.bundle.js
├── Bước B.1: Viết module AudioControllerPro hỗ trợ nạp song song MP3 và Synth fallback
├── Bước B.2: Tích hợp logic tự động chuyển đổi Track theo ngữ cảnh từng slide (Slide 1, 6, 10, 12)
└── Bước B.3: Thêm nút điều chỉnh âm lượng (Volume Slider) trên Header

GIAI ĐOẠN C: CẬP NHẬT CẤU TRÚC GIAO DIỆN SLIDE (HTML & CSS)
├── Bước C.1: Slide 1 - Nhúng Video Loop nền & Lớp lọc ánh sáng vàng kim
├── Bước C.2: Slide 2 - Gắn 3 ảnh phù hiệu 3D nổi khối vào thẻ Flip Card
├── Bước C.3: Slide 4 & 5 - Nhúng ảnh an ninh mạng và Video thao trường PCCC
├── Bước C.4: Slide 10 - Gắn ảnh nền bàn làm việc thực tế cho Game 3
└── Bước C.5: Slide 11 - Gắn Video thao diễn võ thuật CAND vào Split Layout

GIAI ĐOẠN D: KIỂM THỬ TỰ ĐỘNG BẰNG TEST SCRIPT HEADLESS
├── Bước D.1: Đo thời gian nạp trang và mức tiêu thụ tài nguyên (RAM, CPU, FPS)
├── Bước D.2: Kiểm tra khả năng tự phục hồi (Fallback Test) khi cố tình xóa file media
└── Bước D.3: Xác nhận toàn bộ 4 mini-game vẫn vận hành mượt mà với media mới
```

---

## 6. TIÊU CHÍ NGHIỆM THU CHO BẢN NÂNG CẤP MEDIA AI

1. **Thị giác (Visual Quality):** Tất cả các slide đều có hình ảnh hoặc video nền mang phong cách điện ảnh trang nghiêm của lực lượng CAND, không còn cảm giác đơn điệu hay dùng emoji thô sơ.
2. **Âm thanh (Audio Experience):** Có nhạc nền diễu binh, nhạc nền thuyết trình và hiệu ứng SFX dập mộc/chuông reo chân thực; tự động chuyển track thông minh.
3. **Độ ổn định (Resilience & Fallback):** Khi mở bài thuyết trình ở bất kỳ đâu (kể cả khi mất mạng hay thiếu file media), website vẫn chạy 100% không báo lỗi màn hình trắng hay vỡ bố cục.
4. **Hiệu năng (Performance):** Tốc độ chuyển slide dưới 0.2s, khung hình ổn định 60 FPS trên màn hình máy chiếu và máy tính thông thường.
