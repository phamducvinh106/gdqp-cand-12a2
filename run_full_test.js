const http = require('http');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const targetUrl = 'file:///C:/Users/phamd/OneDrive/Documents/.gdqp%20v2/index.html';

async function fullTest() {
  console.log('🏁 [BẮT ĐẦU] Khởi động Edge Headless để kiểm thử tự động toàn diện...');
  const edge = spawn(edgePath, [
    '--headless',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    '--window-size=1920,1080',
    targetUrl
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9223/json', (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', async () => {
      const targets = JSON.parse(raw);
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
        if (res?.exceptionDetails) {
          console.error('Eval error in script:', expression, res.exceptionDetails);
        }
        return res?.result?.value;
      };

      ws.onopen = async () => {
        console.log('🔌 WebSocket DevTools đã kết nối thành công!');
        await sendCommand('Runtime.enable');
        await sendCommand('DOM.enable');

        // Đợi app.bundle.js khởi tạo xong window.presentationEngine
        for (let i = 0; i < 20; i++) {
          const ready = await evalScript('!!window.presentationEngine');
          if (ready) break;
          await new Promise(r => setTimeout(r, 200));
        }

        let passed = 0;
        let failed = 0;

        const assert = (condition, testName) => {
          if (condition) {
            console.log(`  ✅ [PASS] ${testName}`);
            passed++;
          } else {
            console.error(`  ❌ [FAIL] ${testName}`);
            failed++;
          }
        };

        try {
          // TEST 1: Khởi tạo Engine & Bắt đầu tại Slide 1
          console.log('\n--- TEST 1: Khởi tạo Presentation Engine & Xác thực đơn vị TỔ 2 - 12A2 ---');
          const slide1Info = await evalScript(`({
            curr: window.presentationEngine.currentSlide,
            total: window.presentationEngine.totalSlides,
            isSlide1Visible: !document.querySelector('.slide-container[data-slide="1"]').classList.contains('hidden'),
            headerUnit: document.querySelector('header h1') ? document.querySelector('header h1').textContent.trim() : '',
            slide1Unit: document.querySelector('article[data-slide="1"]') ? document.querySelector('article[data-slide="1"]').textContent.includes('TỔ 2 - 12A2') : false,
            footerUnit: document.querySelector('#menu-drawer') ? document.querySelector('#menu-drawer').textContent.includes('TỔ 2 - 12A2') : false
          })`);
          assert(slide1Info.curr === 1, 'Current slide ban đầu là 1');
          assert(slide1Info.total === 12, 'Tổng số slide là 12');
          assert(slide1Info.isSlide1Visible, 'Slide 1 đang hiển thị');
          assert(slide1Info.headerUnit === 'TỔ 2 - 12A2', 'Header hiển thị đúng đơn vị: TỔ 2 - 12A2');
          assert(slide1Info.slide1Unit, 'Slide 1 hiển thị rõ ràng đơn vị thực hiện: TỔ 2 - 12A2');
          assert(slide1Info.footerUnit, 'Menu drawer hiển thị bản quyền: TỔ 2 - 12A2');

          // TEST 2: Điều hướng Slide (Next & Prev)
          console.log('\n--- TEST 2: Điều hướng chuyển slide ---');
          await evalScript('window.presentationEngine.nextSlide()');
          let slide2Info = await evalScript(`({
            curr: window.presentationEngine.currentSlide,
            isSlide2Visible: !document.querySelector('.slide-container[data-slide="2"]').classList.contains('hidden'),
            isSlide1Hidden: document.querySelector('.slide-container[data-slide="1"]').classList.contains('hidden')
          })`);
          assert(slide2Info.curr === 2, 'Next slide chuyển sang Slide 2');
          assert(slide2Info.isSlide2Visible, 'Slide 2 đang hiển thị');
          assert(slide2Info.isSlide1Hidden, 'Slide 1 đã ẩn');

          // TEST 3: Mini-Game 1: Giải Mã Phù Hiệu
          console.log('\n--- TEST 3: Mini-Game 1: Lật thẻ & Trắc nghiệm nhận diện ---');
          const g1CardsCount = await evalScript('document.querySelectorAll(".game1-flip-inner").length');
          assert(g1CardsCount === 3, 'Game 1 render đủ 3 thẻ phù hiệu');

          // Mô phỏng lật thẻ 1 và mở modal câu hỏi
          await evalScript(`
            const card0 = document.querySelectorAll(".game1-flip-inner")[0];
            card0.classList.add("card-is-flipped");
            window.gameEngine.openGame1Modal(0);
          `);
          const modal1Visible = await evalScript('!document.getElementById("game1-quiz-modal").classList.contains("hidden")');
          assert(modal1Visible, 'Modal câu hỏi Game 1 mở thành công');

          // Chọn đáp án đúng cho thẻ 1 (index 1: An ninh nhân dân)
          await evalScript(`
            const buttons = document.querySelectorAll("#game1-options-container button");
            buttons[1].click();
          `);
          const g1Score = await evalScript('window.gameEngine.g1Score');
          assert(g1Score === 100, 'Game 1 trả lời đúng được cộng 100 điểm');
          await evalScript('document.getElementById("game1-close-modal-btn").click()');

          // TEST 4: Slide 4: Khối Học Viện & Tabs tương tác
          console.log('\n--- TEST 4: Slide 4 Vertical Tabs ---');
          await evalScript('window.presentationEngine.goToSlide(4)');
          const initialAcadName = await evalScript('document.getElementById("academy-detail-name").textContent');
          assert(initialAcadName.includes('Học viện An ninh'), 'Tab mặc định là Học viện An ninh nhân dân');

          // Click tab T02 (Học viện Cảnh sát nhân dân)
          await evalScript('document.querySelector(".academy-tab-btn[data-id=\\"T02\\"]").click()');
          const updatedAcadName = await evalScript('document.getElementById("academy-detail-name").textContent');
          assert(updatedAcadName.includes('Học viện Cảnh sát'), 'Chuyển tab thành công sang Học viện Cảnh sát');

          // TEST 5: Mini-Game 2 (Slide 6): Ghép Trường Trúng Ngành
          console.log('\n--- TEST 5: Mini-Game 2 Ghép trường trúng ngành ---');
          await evalScript('window.presentationEngine.goToSlide(6)');
          const g2Schools = await evalScript('document.querySelectorAll("#game2-schools-col .connecting-node").length');
          const g2Majors = await evalScript('document.querySelectorAll("#game2-majors-col .connecting-node").length');
          assert(g2Schools === 4 && g2Majors === 4, 'Game 2 hiển thị đủ 4 trường và 4 chuyên ngành');

          // Thử ghép cặp: click s1 (Học viện Quốc tế) rồi click m2 (Ngôn ngữ Anh & Trung)
          await evalScript(`
            const leftNode = document.querySelector('#game2-schools-col [data-id="s1"]');
            const rightNode = document.querySelector('#game2-majors-col [data-id="m2"]');
            leftNode.click();
            rightNode.click();
          `);
          const matchedSize = await evalScript('window.gameEngine.matchedPairs.size');
          assert(matchedSize >= 1, 'Ghép đúng cặp s1 - m2 được ghi nhận vào matchedPairs');

          // TEST 6: Slide 7: Slider Độ Tuổi
          console.log('\n--- TEST 6: Slide 7 Simulator Độ Tuổi ---');
          await evalScript('window.presentationEngine.goToSlide(7)');
          await evalScript(`
            const slider = document.getElementById('age-slider');
            slider.value = 23;
            slider.dispatchEvent(new Event('input'));
          `);
          let verdictText = await evalScript('document.getElementById("age-verdict-tag").textContent');
          assert(verdictText.includes('QUÁ TUỔI'), '23 tuổi người Kinh báo Quá tuổi quy định');

          // Đổi sang DTTS
          await evalScript(`
            const eth = document.getElementById('ethnicity-select');
            eth.value = 'minority';
            eth.dispatchEvent(new Event('change'));
          `);
          verdictText = await evalScript('document.getElementById("age-verdict-tag").textContent');
          assert(verdictText.includes('ĐỦ TIÊU CHUẨN'), '23 tuổi người DTTS báo Đủ tiêu chuẩn (≤ 25)');

          // TEST 7: Mini-Game 3 (Slide 10): Phòng Sơ Tuyển Ảo
          console.log('\n--- TEST 7: Mini-Game 3 Thẩm tra hồ sơ & Dập mộc ---');
          await evalScript('window.presentationEngine.goToSlide(10)');
          const doc1Name = await evalScript('document.getElementById("game3-candidate-name").textContent');
          assert(doc1Name === 'Nguyễn Văn A', 'Hồ sơ 1 là Nguyễn Văn A (23 tuổi)');

          // Đóng dấu TỪ CHỐI
          await evalScript('document.getElementById("game3-btn-reject").click()');
          await new Promise(r => setTimeout(r, 600));
          const g3Title = await evalScript('document.getElementById("game3-verdict-title").textContent');
          assert(g3Title.includes('CHÍNH XÁC'), 'Quyết định từ chối hồ sơ quá tuổi được đánh giá CHÍNH XÁC');
          await evalScript('document.getElementById("game3-next-doc-btn").click()');

          // Hồ sơ 2 là Lò Thị B
          const doc2Name = await evalScript('document.getElementById("game3-candidate-name").textContent');
          assert(doc2Name === 'Lò Thị B', 'Chuyển sang hồ sơ 2: Lò Thị B');

          // TEST 8: Mini-Game 4 (Slide 12): Grand Quiz
          console.log('\n--- TEST 8: Mini-Game 4 Grand Quiz ---');
          await evalScript('window.presentationEngine.goToSlide(12)');
          const g4Question = await evalScript('document.getElementById("game4-question-text").textContent');
          assert(g4Question.length > 10, 'Câu hỏi 1 của Grand Quiz đã nạp thành công');

          // Chọn đáp án đúng cho câu 1 (index 1: HV ANND)
          await evalScript(`
            const g4Buttons = document.querySelectorAll("#game4-options-container button");
            g4Buttons[1].click();
          `);
          const g4Score = await evalScript('window.gameEngine.g4Score');
          assert(g4Score > 1000, `Trả lời đúng Grand Quiz nhận điểm tốc độ: ${g4Score}`);

          // TEST 9: Điều Khiển Header & Menu Drawer
          console.log('\n--- TEST 9: Audio Toggle & Menu Drawer ---');
          const initialAudioState = await evalScript('window.presentationEngine.sound.bgmPlaying');
          await evalScript('document.getElementById("audio-toggle-btn").click()');
          const toggledAudioState = await evalScript('window.presentationEngine.sound.bgmPlaying');
          assert(toggledAudioState !== initialAudioState, 'Nút bật/tắt nhạc BGM chuyển đổi trạng thái thành công');

          await evalScript('document.getElementById("menu-toggle-btn").click()');
          const isDrawerOpen = await evalScript('!document.getElementById("menu-drawer").classList.contains("translate-x-full")');
          assert(isDrawerOpen, 'Menu drawer mở ra khi click nút menu');
          await evalScript('document.getElementById("menu-toggle-btn").click()');

          // TEST 10: Loại Bỏ 100% Video & Kiểm Tra Media Assets AI & Nhạc Nền CAND March
          console.log('\n--- TEST 10: Loại Bỏ Video, Media Assets AI & Nhạc Nền CAND ---');
          const mediaCheck = await evalScript(`({
            videoTagCount: document.querySelectorAll('video').length,
            videoSlotCount: document.querySelectorAll('.video-slot').length,
            mediaBadgeCount: document.querySelectorAll('.media-badge-tag').length,
            bgmAudioExists: !!document.getElementById('bgm-audio'),
            bgmAudioSrc: document.getElementById('bgm-audio') ? document.getElementById('bgm-audio').src : '',
            slide1HasParade: !!document.querySelector('article[data-slide="1"] img[src*="slide1_parade"]'),
            game1BadgesCount: document.querySelectorAll('#game1-cards-container img[src*="badge_"]').length,
            slide3HasCampus: !!document.querySelector('article[data-slide="3"] img[src*="slide3_campus"]') || !!document.querySelector('article[data-slide="3"] img[src*="slide3_university"]'),
            slide4HasCyber: !!document.querySelector('article[data-slide="4"] img[src*="slide4_cyber"]'),
            slide5HasFire: !!document.querySelector('article[data-slide="5"] img[src*="slide5_fire"]'),
            slide8HasExamHall: !!document.querySelector('article[data-slide="8"] img[src*="slide8_exam_hall"]'),
            slide9HasExam: !!document.querySelector('article[data-slide="9"] img[src*="slide9_thpt_exam"]'),
            slide11HasParade: !!document.querySelector('article[data-slide="11"] img[src*="slide11_parade"]'),
            slide12HasArena: !!document.querySelector('article[data-slide="12"] img[src*="slide12_arena"]')
          })`);
          assert(mediaCheck.videoTagCount === 0, 'Đã loại bỏ 100% thẻ <video> khỏi toàn bộ bài thuyết trình');
          assert(mediaCheck.videoSlotCount === 0, 'Đã loại bỏ 100% khung .video-slot khỏi toàn bộ bài thuyết trình');
          assert(mediaCheck.mediaBadgeCount === 0, 'Đã loại bỏ 100% các mẩu chú thích nhỏ (.media-badge-tag) khỏi toàn bộ khung ảnh trên mọi slide');
          assert(mediaCheck.bgmAudioExists, 'Thẻ audio BGM CAND #bgm-audio hiện diện trong DOM');
          assert(mediaCheck.bgmAudioSrc.includes('cand_heroic_march.wav'), 'File âm thanh chuẩn Hành khúc CAND cand_heroic_march.wav được nạp');
          assert(mediaCheck.slide1HasParade, 'Slide 1 nạp tác phẩm AI diễu binh Quảng trường Ba Đình');
          assert(mediaCheck.game1BadgesCount === 3, 'Game 1 nạp đủ 3 phù hiệu An ninh, Cảnh sát, PCCC 3D mạ vàng');
          assert(mediaCheck.slide3HasCampus, 'Slide 3 nạp tác phẩm AI khuôn viên học viện & đại học CAND');
          assert(mediaCheck.slide4HasCyber, 'Slide 4 nạp tác phẩm AI chuyên ngành An ninh mạng');
          assert(mediaCheck.slide5HasFire, 'Slide 5 nạp tác phẩm AI tác chiến chữa cháy & cứu nạn cứu hộ');
          assert(mediaCheck.slide8HasExamHall, 'Slide 8 nạp tác phẩm AI phòng thi đánh giá Bộ Công An');
          assert(mediaCheck.slide9HasExam, 'Slide 9 nạp tác phẩm AI đề thi & kỳ thi đánh giá BCA');
          assert(mediaCheck.slide11HasParade, 'Slide 11 nạp tác phẩm AI đội hình diễu binh quân sự hóa');
          assert(mediaCheck.slide12HasArena, 'Slide 12 nạp tác phẩm AI đấu trường tri thức CAND vinh quang');

          // Kiểm tra Volume Slider & Contextual Track
          await evalScript(`
            const volSlider = document.getElementById('volume-slider');
            volSlider.value = 0.8;
            volSlider.dispatchEvent(new Event('input'));
          `);
          const currentVol = await evalScript('window.soundManager.volume');
          assert(currentVol === 0.8, 'Volume slider cập nhật âm lượng thành công lên 80%');

          // Kiểm tra tự động chuyển track khi sang Slide 1
          await evalScript('window.presentationEngine.goToSlide(1)');
          const trackSlide1 = await evalScript('window.soundManager.currentTrack');
          assert(trackSlide1 === 'intro', 'Slide 1 tự động chọn track intro');

          // Kiểm tra tự động chuyển track khi sang Slide 12
          await evalScript('window.presentationEngine.goToSlide(12)');
          const trackSlide12 = await evalScript('window.soundManager.currentTrack');
          assert(trackSlide12 === 'tension', 'Slide 12 tự động chọn track tension');

          // TEST 11: Kiểm tra Khung Hình Ảnh Phóng To trên 100% Slide và Từng Mục Con
          console.log('\n--- TEST 11: Khung Ảnh Phóng To trên 100% Slide & Từng Mục Con ---');
          const imageSlotsCheck = await evalScript(`({
            slide1: !!document.querySelector('article[data-slide="1"] .image-slot'),
            slide2Count: document.querySelectorAll('article[data-slide="2"] .image-slot').length,
            slide3Count: document.querySelectorAll('article[data-slide="3"] .image-slot').length,
            slide4: !!document.querySelector('article[data-slide="4"] .image-slot'),
            slide5Count: document.querySelectorAll('article[data-slide="5"] .image-slot').length,
            slide6: !!document.querySelector('article[data-slide="6"] .image-slot'),
            slide7Count: document.querySelectorAll('article[data-slide="7"] .image-slot').length,
            slide8Count: document.querySelectorAll('article[data-slide="8"] .image-slot').length,
            slide9Count: document.querySelectorAll('article[data-slide="9"] .image-slot').length,
            slide10: !!document.querySelector('article[data-slide="10"] .image-slot'),
            slide11Count: document.querySelectorAll('article[data-slide="11"] .image-slot').length,
            slide12: !!document.querySelector('article[data-slide="12"] .image-slot'),
            totalImageSlots: document.querySelectorAll('.image-slot').length
          })`);

          assert(imageSlotsCheck.slide1, 'Slide 1 có khung ảnh phóng to diễu binh Quảng trường Ba Đình');
          assert(imageSlotsCheck.slide2Count === 3, 'Slide 2: Cả 3 thẻ phù hiệu đều có khung ảnh 3D phóng to');
          assert(imageSlotsCheck.slide3Count === 3, 'Slide 3: Cả 3 khối trường (HV, ĐH, CĐ) đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide4, 'Slide 4 có khung ảnh chuyên ngành an ninh mạng/CSND phóng to');
          assert(imageSlotsCheck.slide5Count >= 3, 'Slide 5: Bản đồ, ĐH Phía Nam và ĐH PCCC đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide6, 'Slide 6 (Game 2) có khung ảnh mô phỏng trường ngành phóng to');
          assert(imageSlotsCheck.slide7Count === 4, 'Slide 7: Cả 4 trụ cột tiêu chuẩn đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide8Count === 2, 'Slide 8: Cả 2 bước lộ trình đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide9Count === 3, 'Slide 9: Cả 3 phương thức tuyển sinh đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide10, 'Slide 10 (Game 3) có khung ảnh bàn tiếp dân sơ tuyển CAND phóng to');
          assert(imageSlotsCheck.slide11Count >= 4, 'Slide 11: Thao diễn và cả 3 thẻ quyền lợi đều có khung ảnh phóng to');
          assert(imageSlotsCheck.slide12, 'Slide 12 (Game 4) có khung ảnh bục vinh quang đấu trường tri thức phóng to');
          assert(imageSlotsCheck.totalImageSlots >= 24, `Tổng cộng có ${imageSlotsCheck.totalImageSlots} khung ảnh phóng to phân bổ khắp 12 slide (≥ 24)`);

          // TEST 12: Kiểm Tra & Khắc Phục Triệt Để Tiếng Trò Chơi Phát Ngầm
          console.log('\n--- TEST 12: Kiểm Tra Triệt Tiêu Lỗi Âm Thanh / Timer Chạy Ngầm ---');
          // Khi chuyển sang Slide 1, timer Game 4 không được phép chạy
          await evalScript('window.presentationEngine.goToSlide(1)');
          const timerOnSlide1 = await evalScript('window.gameEngine.g4Timer');
          assert(timerOnSlide1 === null, 'Timer Game 4 không chạy khi ở Slide 1 (tránh tiếng tick/bíp phát ngầm)');

          // Chuyển sang Slide 5, timer Game 4 vẫn phải là null
          await evalScript('window.presentationEngine.goToSlide(5)');
          const timerOnSlide5 = await evalScript('window.gameEngine.g4Timer');
          assert(timerOnSlide5 === null, 'Timer Game 4 không chạy khi ở Slide 5');

          // Chuyển sang Slide 11, timer Game 4 vẫn là null
          await evalScript('window.presentationEngine.goToSlide(11)');
          const timerOnSlide11 = await evalScript('window.gameEngine.g4Timer');
          assert(timerOnSlide11 === null, 'Timer Game 4 không chạy khi ở Slide 11');

          // Chuyển sang Slide 12: Timer chỉ được kích hoạt tại đây
          await evalScript('window.presentationEngine.goToSlide(12)');
          await new Promise(r => setTimeout(r, 200));
          const timerOnSlide12 = await evalScript('window.gameEngine.g4Timer');
          assert(timerOnSlide12 !== null, 'Timer Game 4 kích hoạt đếm ngược chính xác khi vào Slide 12');

          // Rời khỏi Slide 12 sang Slide 2: Timer phải bị huỷ ngay lập tức
          await evalScript('window.presentationEngine.goToSlide(2)');
          const timerAfterLeavingSlide12 = await evalScript('window.gameEngine.g4Timer');
          assert(timerAfterLeavingSlide12 === null, 'Timer Game 4 bị hủy ngay lập tức khi rời khỏi Slide 12 (không bao giờ tick ngầm)');

          console.log(`\n========================================`);
          console.log(`🎯 KẾT QUẢ KIỂM THỬ: ${passed} PASSED / ${failed} FAILED`);
          console.log(`========================================\n`);

          ws.close();
          edge.kill();
          process.exit(failed === 0 ? 0 : 1);

        } catch (err) {
          console.error('Lỗi trong quá trình test:', err);
          ws.close();
          edge.kill();
          process.exit(1);
        }
      };
    });
  }).on('error', (err) => {
    console.error('HTTP connect error:', err);
    edge.kill();
    process.exit(1);
  });
}

fullTest();
