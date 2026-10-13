# CHECKLIST NHIỆM VỤ DỰ ÁN (TASK TRACKER)
## BÀI THUYẾT TRÌNH WEB SINGLE-PAGE: TUYỂN SINH VÀ ĐÀO TẠO CÔNG AN NHÂN DÂN VIỆT NAM

---

## 📌 TRẠNG THÁI TỔNG THỂ DỰ ÁN
* **Tổng số Slide:** 12 Slide (Đã hoàn thiện đầy đủ)
* **Tổng số Mini-Game:** 4 Mini-Game (Đã lập trình hoàn thiện)
* **Tỷ lệ hiển thị:** Chuẩn 16:9 Presentation (1920x1080 Responsive)
* **Kế hoạch kiến trúc:** [implementation_plan.md](file:///c:/Users/phamd/OneDrive/Documents/.gdqp%20v2/implementation_plan.md)

---

## GIAI ĐOẠN 1: THIẾT LẬP CẤU TRÚC & DỮ LIỆU CHUẨN
- [x] **Task 1.1:** Khởi tạo cấu trúc thư mục dự án (`src/styles`, `src/js`)
- [x] **Task 1.2:** Xây dựng `src/js/data.js` chứa toàn bộ dữ liệu 11 trường CAND, 4 tiêu chuẩn, 3 phương thức và dữ liệu 4 mini-game

## GIAI ĐOẠN 2: PHÁT TRIỂN ENGINE ĐIỀU HƯỚNG & ÂM THANH
- [x] **Task 2.1:** Viết `src/js/engine.js` (Slide state machine, điều khiển phím mũi tên/Space/F11, Touch swipe, Progress Bar)
- [x] **Task 2.2:** Xây dựng `SoundManager` bằng Web Audio API (hỗ trợ tạo âm thanh synth offline: ting, buzzer, stamp sound, fanfare, marching bgm)
- [x] **Task 2.3:** Hoàn thiện `src/styles/main.css` (Bảng màu CAND, hiệu ứng 3D Transform, Glassmorphism, Animation dập mộc)

## GIAI ĐOẠN 3: XÂY DỰNG GIAO DIỆN 12 SLIDE (index.html)
- [x] **Task 3.1:** Slide 1 - Mở màn khí thế & Hiệu triệu chiến sĩ (Animated star background, gold title, Audio Controller)
- [x] **Task 3.2:** Slide 2 - Khởi động: Mini-Game 1 "Giải mã phù hiệu" (3D card flip container cho 3 lực lượng)
- [x] **Task 3.3:** Slide 3 - Bức tranh toàn cảnh 11 trường CAND (Bento Grid 3 cột tương tác: Học viện, Đại học, Cao đẳng)
- [x] **Task 3.4:** Slide 4 - Chi tiết khối Học viện & Ngành mũi nhọn (Vertical Tab Navigation)
- [x] **Task 3.5:** Slide 5 - Đại học vùng miền (từ Đà Nẵng trở vào) & ĐH Phòng cháy chữa cháy toàn quốc (Bản đồ tương tác)
- [x] **Task 3.6:** Slide 6 - Củng cố giữa bài: Mini-Game 2 "Ghép trường trúng ngành" (Canvas/SVG Line Matching)
- [x] **Task 3.7:** Slide 7 - Tiêu chuẩn dự tuyển (4 thẻ 3D + Slider kiểm tra độ tuổi 22 vs 25)
- [x] **Task 3.8:** Slide 8 - Lộ trình sơ tuyển (Interactive Horizontal Stepper Timeline)
- [x] **Task 3.9:** Slide 9 - Ba phương thức xét tuyển đại học CAND (Matrix comparison table có highlight bài thi đánh giá BCA)
- [x] **Task 3.10:** Slide 10 - Tình huống thực tế: Mini-Game 3 "Phòng sơ tuyển ảo" (Bàn thẩm tra 3 hồ sơ giả định với 2 con dấu mộc)
- [x] **Task 3.11:** Slide 11 - Môi trường đào tạo & Chế độ đãi ngộ (Split layout 60/40, quyền lợi chiến sĩ)
- [x] **Task 3.12:** Slide 12 - Đấu trường tri thức: Mini-Game 4 "Grand Quiz" & Bế mạc (Timer đếm ngược 15s, xếp hạng & pháo hoa confetti)

## GIAI ĐOẠN 4: LẬP TRÌNH 4 MINI-GAME TƯƠNG TÁC (src/js/games.js)
- [x] **Task 4.1:** Lập trình Game 1 (Lật thẻ 3D, chọn trắc nghiệm, phản hồi âm thanh đúng/sai)
- [x] **Task 4.2:** Lập trình Game 2 (Vẽ đường nối động trên Canvas giữa 4 trường và 4 ngành nghề)
- [x] **Task 4.3:** Lập trình Game 3 (Hiệu ứng đóng mộc dập dấu mộc đỏ, hiển thị modal giải thích căn cứ quy chế)
- [x] **Task 4.4:** Lập trình Game 4 (Timer 15s/câu, tính điểm tốc độ, hệ thống danh hiệu và Canvas Confetti hiệu ứng)

## GIAI ĐOẠN 5: KIỂM THỬ TRÌNH DUYỆT & TỐI ƯU HÓA HOÀN THIỆN
- [x] **Task 5.1:** Đóng gói `app.bundle.js` loại bỏ hoàn toàn lỗi CORS khi mở bằng giao thức `file:///`
- [x] **Task 5.2:** Kiểm thử tự động trên Microsoft Edge Headless qua Chrome DevTools Protocol (`run_full_test.js`)
- [x] **Task 5.3:** Xác thực thành công 22/22 test cases ban đầu
- [x] **Task 5.4:** Đóng gói và viết hướng dẫn trình chiếu hoàn chỉnh trong `README.md`

## GIAI ĐOẠN 6: NÂNG CẤP MEDIA AI (HÌNH ẢNH 3D, VIDEO LOOPS, AUDIO PRO)
- [x] **Task 6.1:** Khởi tạo cấu trúc thư mục `assets/images`, `assets/videos`, `assets/audio`
- [x] **Task 6.2:** Tạo bộ tài nguyên hình ảnh vector chuẩn CAND 3D (phù hiệu 3 lực lượng, khuôn viên, an ninh mạng, PCCC, y tế, bàn làm việc, diễu binh)
- [x] **Task 6.3:** Tích hợp Audio Controller Pro đa kênh (Volume Slider, tự động chuyển track intro/ambient/tension/victory)
- [x] **Task 6.4:** Nhúng video loop background & poster fallback chống giật lag
- [x] **Task 6.5:** Mở rộng kiểm thử tự động toàn diện: Đạt 32/32 test cases PASSED (100%)

## GIAI ĐOẠN 7: KHUNG HÌNH ẢNH & VỊ TRÍ VIDEO ĐỒNG BỘ CHO MỌI SLIDE & TỪNG MỤC
- [x] **Task 7.1:** Thiết kế hệ thống CSS Media Slots (`.item-media-dual`, `.image-slot`, `.video-slot`, `.media-badge-tag`, `.video-play-overlay`)
- [x] **Task 7.2:** Tạo toàn bộ vector SVG bổ sung cho từng mục (`slide1_emblem`, `slide3_university`, `slide3_college`, `slide5_southern`, `slide6_puzzle`, `slide7_politics`, `slide7_study`, `slide7_age`, `slide9_thpt_exam`, `slide11_scholarship`, `slide11_rank`, `slide12_arena`)
- [x] **Task 7.3:** Tích hợp đồng bộ khung ảnh và vị trí video vào 100% slide (1-12) và từng mục con:
  - Slide 1: Khung ảnh Biểu trưng CAND 3D & Vị trí video diễu binh CAND
  - Slide 2: Mỗi phù hiệu trong Game 1 đều có khung ảnh 3D và khung video thao diễn
  - Slide 3: Cả 3 khối trường (Học viện, Đại học, Cao đẳng) đều có khung ảnh và vị trí video riêng biệt
  - Slide 4: Khung ảnh chuyên ngành & Vị trí video tác chiến mạng, chuyển đổi động theo từng học viện
  - Slide 5: Bản đồ địa bàn, ĐH Phía Nam và ĐH PCCC đều có khung ảnh và vị trí video riêng
  - Slide 6: Mini-game 2 có khung ảnh mô phỏng ghép nối và vị trí video thực hành nghề
  - Slide 7: Cả 4 trụ cột tiêu chuẩn dự tuyển đều có khung ảnh và vị trí video riêng
  - Slide 8: Cả 2 bước lộ trình dự tuyển đều có khung ảnh và vị trí video riêng
  - Slide 9: Cả 3 phương thức xét tuyển đều có khung ảnh và vị trí video riêng
  - Slide 10: Hồ sơ thí sinh có khung ảnh bàn tiếp dân và khung video camera tiếp dân
  - Slide 11: Khung visual kỷ luật thép và cả 3 thẻ quyền lợi đều có khung ảnh và vị trí video riêng
  - Slide 12: Đấu trường có khung ảnh bục vinh quang và vị trí video trailer thi đấu
- [x] **Task 7.4:** Nâng cấp bộ kiểm thử tự động CDP qua Edge Headless (`run_full_test.js`): **Đạt 44/44 test cases PASSED (100%)**

