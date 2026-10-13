# KẾ HOẠCH TRIỂN KHAI CHI TIẾT (IMPLEMENTATION PLAN)
## BÀI THUYẾT TRÌNH WEB SINGLE-PAGE TƯƠNG TÁC: CÔNG TÁC TUYỂN SINH VÀ ĐÀO TẠO TRONG CÁC TRƯỜNG CÔNG AN NHÂN DÂN VIỆT NAM

---

## 1. TỔNG QUAN DỰ ÁN & MỤC TIÊU KỸ THUẬT

### 1.1. Mục tiêu sản phẩm
Xây dựng một ứng dụng trình chiếu Web Single-Page tương tác hiện đại, chuẩn tỷ lệ 16:9 (1920x1080), thay thế hoàn toàn PowerPoint truyền thống. Ứng dụng đáp ứng:
* **Tính trang nghiêm & bản sắc:** Tông màu chủ đạo Đỏ cờ (`#B71C1C`), Vàng kim (`#D4AF37`), Xanh thẫm Cảnh phục (`#0D1B2A`, `#1B263B`).
* **Tính chính xác về dữ liệu giáo dục quốc phòng:** Trích xuất và bám sát quy chế tuyển sinh CAND (11 cơ sở đào tạo, 4 tiêu chuẩn, 2 giai đoạn lộ trình, 3 phương thức tuyển sinh).
* **Tính tương tác cao (Gamification):** Tích hợp 4 mini-game tương tác đan xen tự nhiên giữa các phần thuyết trình.
* **Tính độc lập & tối ưu:** Chạy trơn tru trên trình duyệt web hiện đại mà không phụ thuộc vào hệ thống backend phức tạp; hỗ trợ Web Audio API tạo âm thanh tổng hợp (synthetic audio) không lo lỗi thiếu file âm thanh ngoại vi.

### 1.2. Tech Stack & Nguyên tắc kiến trúc
* **Giao diện & Trực quan (Presentation Layer):**
  * HTML5 Semantic + Tailwind CSS (qua CDN) + Custom CSS (`main.css`) cho các hiệu ứng 3D Transform, Glassmorphism, Animation, CSS Variables.
  * Tỷ lệ khung hình cố định 16:9 với cơ chế tự động co giãn (`letterbox/pillarbox responsive scale`) tối ưu cho máy chiếu hội trường, màn hình TV lớn và laptop.
* **Logic điều khiển trình diễn (Engine Layer):**
  * Vanilla ES6+ JavaScript (`engine.js`): Quản lý State Machine điều hướng slide, phím tắt (`ArrowLeft`, `ArrowRight`, `Space`, `F11`), thanh tiến trình, Drawer Menu mục lục, chế độ trình diễn tự động.
* **Động cơ trò chơi tương tác (Game Engine Layer):**
  * `games.js`: Độc lập xử lý 4 mini-game:
    * *Game 1:* 3D Card Flip & Badge Identifier.
    * *Game 2:* Canvas / SVG Interactive Line Matcher (Ghép trường - Ngành).
    * *Game 3:* Virtual Desk Document Examiner (Đóng dấu Duyệt/Từ chối hồ sơ).
    * *Game 4:* Grand Quiz Arena (Timer 15s đếm ngược, tính điểm tốc độ, Canvas Confetti pháo hoa).
* **Quản trị dữ liệu (Data Layer):**
  * `data.js`: Ngân hàng dữ liệu tập trung gồm: Danh mục 11 trường CAND, chi tiết ngành học, 4 tiêu chuẩn dự tuyển, 3 hồ sơ sơ tuyển thực tế, 5 câu hỏi Grand Quiz, bảng điểm & vinh danh.
* **Hệ thống Âm thanh (Audio System):**
  * `soundManager`: Tích hợp song song file MP3 và bộ tạo âm thanh giả lập bằng **Web Audio API** (Oscillator Synthesizer cho âm ting đúng, còi cảnh báo, tiếng gõ mộc stamp, fanfare chiến thắng) đảm bảo có âm thanh 100% trong mọi điều kiện offline.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
c:\Users\phamd\OneDrive\Documents\.gdqp v2/
├── implementation_plan.md            # Kế hoạch chi tiết kiến trúc & triển khai (File này)
├── task.md                           # Danh sách nhiệm vụ kiểm tra trạng thái
├── plan.md                           # Bản đặc tả thiết kế & nội dung gốc
├── index.html                        # Khung chứa toàn bộ 12 slide và modal mini-game
├── src/
│   ├── styles/
│   │   └── main.css                  # Custom animations, 3D flip, stamp, CAND theme
│   ├── js/
│   │   ├── engine.js                 # State machine điều khiển slide, audio, controls
│   │   ├── games.js                  # Engine xử lý 4 mini-game tương tác
│   │   └── data.js                   # Dữ liệu nội dung, câu hỏi, hồ sơ, trường CAND
│   └── assets/
│       ├── images/                   # Hình ảnh minh họa, huy hiệu, icons vector SVG
│       └── audio/                    # File âm thanh SFX & nhạc nền (kèm synth fallback)
```

---

## 3. THIẾT KẾ CHI TIẾT 12 SLIDE BÀI THUYẾT TRÌNH

### Slide 1: Mở Màn Khí Thế - Hiệu Triệu Chiến Sĩ
* **Mục tiêu:** Tạo ấn tượng trang trọng, hào hùng ngay từ giây đầu tiên.
* **Nội dung:**
  * Tiêu đề: *BÀI BÁO CÁO CHUYÊN ĐỀ GIÁO DỤC QUỐC PHÒNG & AN NINH*
  * Chủ đề: *CÔNG TÁC TUYỂN SINH VÀ ĐÀO TẠO TRONG CÁC TRƯỜNG CÔNG AN NHÂN DÂN VIỆT NAM*
  * Khẩu hiệu: *"Vì nước quên thân, vì dân phục vụ - Khát vọng màu áo xanh cảnh phục"*
  * Thông tin báo cáo: Nhóm tác giả / Giáo viên hướng dẫn / Thời gian.
* **Thiết kế & Tương tác:**
  * Nền: Hiệu ứng Animated Gradient + Canvas Particle lấp lánh ngôi sao vàng.
  * Typography: Chữ mạ vàng kim (`linear-gradient(135deg, #FFE259 0%, #FFA751 100%)`) kết hợp hiệu ứng đổ bóng mờ trang trọng.
  * Thanh Audio Controller: Góc trên cùng bên phải, hiển thị icon sóng âm động; click để bật/tắt nhạc nền diễu binh hùng tráng.
  * Nút "BẮT ĐẦU KHÁM PHÁ" với hiệu ứng ripple glow dẫn sang Slide 2.

### Slide 2: Khởi Động - Mini-game 1: "Giải Mã Phù Hiệu"
* **Mục tiêu:** Thu hút sự chú ý của người nghe qua tương tác nhận diện 3 lực lượng nòng cốt.
* **Nội dung:**
  * Giới thiệu 3 lực lượng: *An ninh nhân dân*, *Cảnh sát nhân dân*, *Cảnh sát Phòng cháy, chữa cháy và Cứu nạn, cứu hộ*.
* **Cơ chế Mini-game 1:**
  * 3 thẻ phù hiệu bí ẩn dạng 3D (`perspective: 1000px`). Mặt trước in ngôi sao và logo bảo mật mờ; mặt sau in huy hiệu rực rỡ và tên lực lượng.
  * Khi click lật thẻ, hiển thị câu hỏi trắc nghiệm tương ứng bên dưới (ví dụ: *"Lực lượng nào giữ trọng trách bảo vệ an ninh quốc gia, phòng chống gián điệp và phản động?"*).
  * Chọn đúng: Thẻ phát sáng xanh lục, cộng +100 điểm, phát SFX chúc mừng.
  * Chọn sai: Thẻ rung cảnh báo, phát âm trầm báo lỗi.
  * Có nút "Mở toàn bộ đáp án" cho người thuyết trình chủ động.

### Slide 3: Bức Tranh Toàn Cảnh - Hệ Thống 11 Nhà Trường CAND
* **Nội dung chuẩn quy chế:**
  * Cấu trúc 3 cấp bậc nhà trường theo quy định Bộ Công an:
    1. **Khối Học viện (5 trường):** Học viện An ninh nhân dân (T01), Học viện Cảnh sát nhân dân (T02), Học viện Chính trị CAND (T03), Học viện Quốc tế (B06), Học viện Kỹ thuật và Công nghệ an ninh (T08).
    2. **Khối Trường Đại học (3 trường):** Đại học An ninh nhân dân (T04), Đại học Cảnh sát nhân dân (T05), Đại học Phòng cháy chữa cháy (T06).
    3. **Khối Trường Cao đẳng (3 trường):** Cao đẳng An ninh nhân dân I (T07), Cao đẳng Cảnh sát nhân dân I (T09), Cao đẳng Cảnh sát nhân dân II (T10).
* **Thiết kế & Tương tác:**
  * **Interactive Bento Grid 3 cột:** Cột 1 (Học viện - 5 trường), Cột 2 (Đại học - 3 trường), Cột 3 (Cao đẳng - 3 trường).
  * Hiệu ứng: Khi hover/click vào từng cột, cột đó bung rộng (`flex-grow: 2.5`), hiển thị mã trường, địa bàn đào tạo và huy hiệu đại diện; các cột còn lại thu nhỏ trang nhã.

### Slide 4: Chi Tiết Các Học Viện CAND & Ngành Mũi Nhọn
* **Nội dung đào tạo trọng điểm:**
  * *Học viện ANND:* Nghiệp vụ An ninh, An toàn thông tin / An ninh mạng và PCTP công nghệ cao.
  * *Học viện CSND:* Trinh sát cảnh sát, Điều tra tội phạm, Cảnh sát giao thông, Quản lý trật tự xã hội.
  * *Học viện Chính trị CAND:* Xây dựng Đảng và chính quyền Nhà nước, Tham mưu chỉ huy.
  * *Học viện Quốc tế:* Ngôn ngữ Anh, Ngôn ngữ Trung Quốc phục vụ công tác đối ngoại & an ninh đối ngoại.
  * *Học viện Kỹ thuật & CN An ninh:* Kỹ thuật CAND, Trinh sát kỹ thuật, Hậu cần CAND, Điện tử viễn thông, Y khoa CAND.
* **Thiết kế & Tương tác:**
  * **Vertical Tab Navigation:** Cột bên trái gồm danh sách 5 Học viện; khu vực hiển thị chính bên phải cập nhật mượt mà (smooth fade) badge ngành mũi nhọn, mô tả nhiệm vụ và icon nghiệp vụ đặc trưng.

### Slide 5: Đại Học Vùng Miền & Trường Đặc Thù (PCCC)
* **Nội dung phân vùng địa bàn:**
  * *Phân vùng địa bàn tuyển sinh:* Đại học An ninh nhân dân (T04) và Đại học Cảnh sát nhân dân (T05) tuyển sinh cho thí sinh **từ Đà Nẵng trở vào các tỉnh phía Nam** (tương ứng với HV ANND & HV CSND tuyển phía Bắc).
  * *Trường đặc thù toàn quốc:* Trường Đại học Phòng cháy chữa cháy (T06) đào tạo chuyên ngành Phòng cháy chữa cháy và Cứu nạn, cứu hộ trên **phạm vi toàn quốc**.
* **Thiết kế & Tương tác:**
  * Bản đồ SVG tương tác thể hiện sự phân định lãnh thổ (Phía Bắc & Phía Nam từ mốc Đà Nẵng).
  * Nút chuyển chế độ: *"Xem phân vùng Nam - Bắc"* / *"Xem Đại học PCCC toàn quốc"*.
  * Popup thông tin nổi bật với hiệu ứng kính mờ (Glassmorphism).

### Slide 6: Củng Cố Kiến Thức - Mini-game 2: "Ghép Trường Trúng Ngành"
* **Mục tiêu:** Khắc sâu kiến thức về sự tương ứng giữa trường và chuyên ngành đào tạo.
* **Cơ chế Mini-game 2:**
  * Cột A (4 Trường):
    1. Học viện Quốc tế
    2. Đại học Phòng cháy chữa cháy
    3. Học viện An ninh nhân dân
    4. Học viện Kỹ thuật & Công nghệ an ninh
  * Cột B (4 Ngành nghề được xáo trộn ngẫu nhiên):
    * [A] PCCC & Cứu nạn, cứu hộ
    * [B] Ngôn ngữ Trung Quốc / Đối ngoại
    * [C] An ninh mạng & PCTP công nghệ cao
    * [D] Kỹ thuật điện tử viễn thông & Y khoa CAND
  * **Tương tác linh hoạt:** Hỗ trợ cả 2 hình thức: Click chọn điểm nối 2 cột HOẶC Kéo thả chuột.
  * Đường nối được vẽ bằng **HTML5 Canvas / SVG Line động**:
    * Khi nối đúng: Đường chuyển màu xanh lục ngọc (`#2EC4B6`), phát SFX "Ting", cố định kết nối và khóa cặp thẻ.
    * Khi nối sai: Đường chuyển màu đỏ son (`#E63946`), rung thẻ rồi biến mất.
  * Nút "Làm lại" và "Kiểm tra tất cả".

### Slide 7: Tiêu Chuẩn Xét Tuyển - "Bạn Có Đủ Điều Kiện?"
* **Nội dung 4 tiêu chuẩn bắt buộc:**
  1. **Chính trị & Đạo đức:** Bản thân và gia đình chấp hành tốt chủ trương chính sách; đủ tiêu chuẩn chính trị theo quy định của Bộ Công an.
  2. **Trình độ văn hóa:** Đã tốt nghiệp THPT; điểm học lực từng năm THPT đạt yêu cầu theo quy chế từng năm.
  3. **Độ tuổi:**
     * Thí sinh phổ thông & quân nhân xuất ngũ: **Không quá 22 tuổi**.
     * Người dân tộc thiểu số: **Không quá 25 tuổi**.
  4. **Tiêu chuẩn sức khỏe:** Chiều cao, thị lực (không cận thị nặng hoặc có cam kết chữa mắt), thể lực đạt chuẩn Bệnh viện Bộ Công an quy định.
* **Thiết kế & Tương tác:**
  * 4 thẻ tiêu chuẩn dạng Flip Card 3D.
  * **Interactive Age-Check Simulator (Thanh trượt tuổi tương tác):** Người dùng kéo thanh trượt từ 17 đến 30 tuổi và chọn nhóm dân tộc -> Hệ thống lập tức hiển thị nhãn: *HỢP LỆ* (xanh lá) hoặc *QUÁ TUỔI QUY ĐỊNH* (đỏ).

### Slide 8: Lộ Trình Dự Tuyển (Interactive Timeline)
* **Nội dung 2 giai đoạn cốt lõi:**
  * **Giai đoạn 1: Sơ tuyển tại địa phương:**
    * Mua hồ sơ tại Công an xã/phường/thị trấn nơi đăng ký thường trú.
    * Kiểm tra học lực, thẩm tra lý lịch chính trị 3 đời.
    * Khám sức khỏe tập trung tại Bệnh xá Công an tỉnh/thành phố.
  * **Giai đoạn 2: Đăng ký xét tuyển vào trường CAND:**
    * Đăng ký nguyện vọng 1 trên cổng thông tin Bộ GD&ĐT.
    * Đăng ký dự thi Bài thi đánh giá của Bộ Công an (CA1, CA2).
    * Nhận kết quả và làm thủ tục nhập ngũ/nhập học.
* **Thiết kế & Tương tác:**
  * **Horizontal Stepper Component:** Thanh tiến trình tương tác nằm ngang với các mốc số 1, 2, 3, 4. Bấm vào từng mốc để mở bung nội dung chi tiết với hiệu ứng Accordion mượt mà, kèm checklist hồ sơ cần chuẩn bị.

### Slide 9: Ba Phương Thức Xét Tuyển Đại Học Chính Quy
* **Nội dung chi tiết 3 phương thức:**
  * **Phương thức 1:** Tuyển thẳng theo quy chế tuyển sinh của Bộ GD&ĐT và quy định của Bộ Công an (học sinh đạt giải Olympic quốc tế, giải Nhất/Nhì/Ba HSG Quốc gia).
  * **Phương thức 2:** Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS từ 7.5, TOEFL, HSK...) với kết quả bài thi đánh giá của Bộ Công an.
  * **Phương thức 3:** Xét tuyển kết hợp kết quả thi tốt nghiệp THPT với kết quả bài thi đánh giá của Bộ Công an.
  * *Điểm then chốt cần khắc sâu:* Cả Phương thức 2 và Phương thức 3 đều **BẮT BUỘC** phải tham gia **Bài thi đánh giá của Bộ Công an**.
* **Thiết kế & Tương tác:**
  * **Bảng ma trận 3 cột (Comparison Matrix):** Thiết kế dạng thẻ so sánh trực quan. Cột Phương thức 2 và Phương thức 3 có thẻ nổi bật (Golden Badge) nhấn mạnh cụm từ *"BÀI THI ĐÁNH GIÁ CỦA BỘ CÔNG AN"*.
  * Mục lưu ý mở rộng về điều kiện chuyển tiếp xét hệ Trung cấp CAND.

### Slide 10: Tình Huống Thực Tế - Mini-game 3: "Phòng Sơ Tuyển Ảo"
* **Mục tiêu:** Vận dụng lý thuyết vào đóng vai Cán bộ Công an thụ lý hồ sơ tuyển sinh.
* **Cơ chế Mini-game 3:**
  * Giao diện mô phỏng Bàn làm việc của Cán bộ tuyển sinh: tập kẹp hồ sơ bằng bìa da, thông tin cá nhân và học bạ của thí sinh.
  * 2 con dấu mộc đỏ kích thước lớn:
    * Dấu 1: **"DUYỆT - ĐỦ TIÊU CHUẨN"**
    * Dấu 2: **"TỪ CHỐI - KHÔNG ĐỦ TIÊU CHUẨN"**
  * **3 Hồ sơ thẩm tra tuần tự:**
    * *Hồ sơ 1:* Nguyễn Văn A (23 tuổi, dân tộc Kinh, tốt nghiệp loại Giỏi, sức khỏe loại 1) -> **Đáp án: TỪ CHỐI** (Lý do: Đã 23 tuổi, quá quy định 22 tuổi đối với thí sinh phổ thông dân tộc Kinh).
    * *Hồ sơ 2:* Lò Thị B (24 tuổi, dân tộc Thái, sức khỏe Tốt, hạnh kiểm Tốt) -> **Đáp án: DUYỆT** (Lý do: Người dân tộc thiểu số được dự tuyển đến 25 tuổi).
    * *Hồ sơ 3:* Trần C (18 tuổi, IELTS 8.0, từ chối thi Bài thi đánh giá của Bộ Công an) -> **Đáp án: TỪ CHỐI** (Lý do: Phương thức 2 bắt buộc phải thi bài thi đánh giá của BCA).
  * **Hiệu ứng đặc sắc:**
    * Click con dấu tạo chuyển động dập mộc xuống tập hồ sơ (`transform: scale(1.2) -> scale(1)`), in hình mộc đỏ kèm tiếng dập mộc chân thực (`stamp_approved.wav`).
    * Hộp phân tích pháp lý & căn cứ quy chế xuất hiện giải thích chi tiết vì sao đúng/sai.

### Slide 11: Môi Trường Đào Tạo & Quyền Lợi Chiến Sĩ
* **Nội dung truyền cảm hứng:**
  1. **Môi trường rèn luyện toàn diện:** Khép kín, kỷ luật thép, đào tạo võ thuật CAND, bắn súng, chiến thuật truy bắt tội phạm, lý luận chính trị và kỹ thuật nghiệp vụ.
  2. **Chế độ đãi ngộ 100%:** Được bao cấp toàn bộ học phí, quân trang cảnh phục, nơi ăn ở, chăm sóc y tế và hưởng phụ cấp sinh hoạt hàng tháng.
  3. **Đầu ra đảm bảo 100%:** Sau khi tốt nghiệp, 100% học viên được Bộ Công an điều động, phân công công tác theo đúng chuyên ngành đào tạo, không lo thất nghiệp.
* **Thiết kế & Tương tác:**
  * **Split-screen Layout (60/40):**
    * Bên trái: Khung hiển thị mô phỏng thao diễn, diễu binh và tập luyện võ thuật với visual hiện đại.
    * Bên phải: 3 thẻ quyền lợi mạ vàng mờ với hiệu ứng trượt vào (`fade-in-up stagger`) kèm chỉ số ấn tượng (*0đ học phí - 100% việc làm - Quân hàm sĩ quan*).

### Slide 12: Đấu Trường Tri Thức - Mini-game 4: "Grand Quiz" & Bế Mạc
* **Mục tiêu:** Tổng kết toàn bộ bài học qua một đấu trường kịch tính và trao danh hiệu danh dự.
* **Cơ chế Mini-game 4:**
  * **Đồng hồ đếm ngược:** 15 giây cho mỗi câu hỏi, thanh tiến trình màu đỏ co lại theo thời gian thực; khi còn 5 giây đổi sang màu đỏ nhấp nháy.
  * **Ngân hàng 5 câu hỏi then chốt:**
    1. *Học viện nào phụ trách đào tạo ngành An ninh mạng & PCTP công nghệ cao?* (A. HV Cảnh sát nhân dân | **B. HV An ninh nhân dân** | C. ĐH PCCC | D. CĐ CSND I)
    2. *Độ tuổi tối đa để thí sinh người dân tộc thiểu số đăng ký dự tuyển là bao nhiêu?* (A. 22 tuổi | B. 24 tuổi | **C. 25 tuổi** | D. 27 tuổi)
    3. *Học sinh phổ thông nộp hồ sơ đăng ký sơ tuyển CAND ở cơ quan nào?* (A. Công an tỉnh | **B. Công an cấp xã/phường nơi thường trú** | C. Trực tiếp tại trường đại học | D. Sở GD&ĐT)
    4. *Điều kiện bắt buộc trong cả Phương thức 2 và Phương thức 3 xét tuyển đại học CAND là gì?* (A. IELTS 8.0 | B. Điểm thi THPT trên 27 | **C. Có kết quả bài thi đánh giá của Bộ Công an** | D. Chiều cao trên 1m80)
    5. *Sinh viên sau khi tốt nghiệp các trường CAND có phải tự nộp đơn xin việc làm không?* (A. Có, tự thi tuyển công chức | **B. Không, 100% được Bộ Công an phân công công tác** | C. Tự liên hệ doanh nghiệp | D. Tùy theo xếp loại học lực)
  * **Hệ thống tính điểm:** Điểm = 1000 + (Thời gian còn lại × 50). Trả lời sai: 0 điểm.
  * **Màn hình Vinh Danh Tổng Kết:**
    * Đạt 4000 - 6000 điểm: Phong tặng danh hiệu cao quý **"CHIẾN SĨ TRI THỨC XUẤT SẮC"** + Ngôi sao vàng quân hiệu.
    * Đạt 2500 - 3999 điểm: Phong tặng **"CHIẾN SĨ TIÊN TIẾN"**.
    * Dưới 2500 điểm: Nhắc nhở rèn luyện thêm nội quy quy chế.
    * Kích hoạt hiệu ứng **Canvas Confetti pháo hoa rực rỡ** và phát nhạc chiến thắng Fanfare hùng tráng.
  * **Lời kết bế mạc:** Lời cảm ơn thầy cô và các bạn học sinh; nút "Trình chiếu lại từ đầu".

---

## 4. THIẾT KẾ KIẾN TRÚC MÃ NGUỒN (SOURCE CODE ARCHITECTURE)

### 4.1. File `src/js/data.js`
Chứa các đối tượng dữ liệu chuẩn hóa:
* `ACADEMIES_DATA`: Mảng 5 học viện và thông tin ngành đào tạo chi tiết.
* `UNIVERSITIES_DATA`: Mảng 3 trường đại học và phạm vi tuyển sinh địa bàn.
* `COLLEGES_DATA`: Mảng 3 trường cao đẳng CAND.
* `STANDARDS_DATA`: Dữ liệu 4 trụ cột tiêu chuẩn dự tuyển.
* `GAME1_DATA`: Dữ liệu 3 phù hiệu (An ninh, Cảnh sát, PCCC) kèm câu hỏi nhận diện.
* `GAME2_DATA`: Cặp dữ liệu 4 trường và 4 chuyên ngành cho trò chơi nối dây.
* `GAME3_DATA`: Dữ liệu 3 hồ sơ ứng viên (Nguyễn Văn A, Lò Thị B, Trần C) kèm căn cứ pháp lý.
* `GAME4_DATA`: 5 câu hỏi trắc nghiệm đếm ngược, đáp án đúng và giải thích.

### 4.2. File `src/js/engine.js`
* Quản lý trạng thái bài trình chiếu:
  * `currentSlide`: Index slide hiện tại (1 đến 12).
  * `totalSlides`: 12.
  * `goToSlide(index)`: Hàm chuyển slide an toàn, cập nhật DOM, kích hoạt animation và cập nhật thanh tiến trình.
  * `nextSlide()`, `prevSlide()`: Điều hướng tiến lùi.
* Lắng nghe sự kiện bàn phím:
  * `ArrowRight`, `PageDown`, `Space`: Chuyển slide kế tiếp.
  * `ArrowLeft`, `PageUp`: Quay lại slide trước.
  * `F11` / `KeyF`: Bật/Tắt chế độ Toàn màn hình (Fullscreen API).
  * `Home` / `End`: Về slide đầu / slide cuối.
* Lắng nghe sự kiện Touch Swipe trên thiết bị màn hình cảm ứng.
* `SoundManager`:
  * Sử dụng `AudioContext` của Web Audio API để phát âm thanh tổng hợp tự động khi không có file audio cục bộ (beep, chime, thud, fanfares).
  * Điều khiển nhạc nền (BGM) với nút Mute/Unmute góc màn hình.

### 4.3. File `src/js/games.js`
* **Game 1 Controller (`initBadgeGame`):**
  * Xử lý lật thẻ 3D qua class `.is-flipped`.
  * So sánh đáp án người dùng chọn, cập nhật điểm, phát SFX.
* **Game 2 Controller (`initMatchingGame`):**
  * Khởi tạo HTML5 Canvas kích thước tương ứng giữa 2 cột.
  * Lưu trạng thái cặp nút đang chọn (`selectedLeftNode`, `selectedRightNode`).
  * Vẽ đường cong Bezier hoặc đường thẳng kết nối mượt mà giữa các nút.
  * Kiểm tra đúng cặp -> Khóa đường vẽ màu xanh (`#2EC4B6`); sai -> Rung đỏ và hủy đường sau 500ms.
* **Game 3 Controller (`initRecruitmentDeskGame`):**
  * Quản lý tiến trình 3 hồ sơ (`currentDocIndex`).
  * Bắt sự kiện click con dấu "Duyệt" / "Từ chối".
  * Tạo hoạt ảnh đóng mộc chìm vào trang giấy và hiển thị hộp thoại phân tích lý do đạt / không đạt.
* **Game 4 Controller (`initGrandQuizGame`):**
  * Bộ đếm thời gian `setInterval` 15 giây/câu hỏi.
  * Tính điểm kết hợp hệ số thời gian.
  * Quản lý chuyển câu hỏi tự động.
  * Render bảng vinh danh và gọi hàm `launchConfetti()` tạo pháo hoa rực rỡ trên Canvas.

### 4.4. File `src/styles/main.css`
* Cấu hình CSS Custom Properties cho nhận diện thương hiệu CAND:
  * `--cand-red`: `#B71C1C` (Đỏ cờ)
  * `--cand-gold`: `#D4AF37` (Vàng kim quân hiệu)
  * `--cand-blue`: `#0D1B2A` (Xanh đen trang nghiêm)
  * `--cand-navy`: `#1B263B` (Xanh cảnh phục)
  * `--cand-green`: `#2EC4B6` (Xanh lá thành công)
* Các keyframes animation đặc thù:
  * `@keyframes stamp-press`: Hiệu ứng dập con dấu mộc đỏ.
  * `@keyframes card-flip`: Chuyển động lật 3D 180 độ.
  * `@keyframes ripple-gold`: Vòng hào quang vàng kim tỏa sáng.
  * `@keyframes float-slow`: Chuyển động lơ lửng nhẹ nhàng của các huy hiệu.

---

## 5. KẾ HOẠCH TRIỂN KHAI THEO TỪNG BƯỚC (STEP-BY-STEP IMPLEMENTATION ROADMAP)

```text
GIAI ĐOẠN 1: KHỞI TẠO CẤU TRÚC VÀ TÀI NGUYÊN NỀN TẢNG
├── Bước 1: Khởi tạo thư mục và các tệp tin mã nguồn (styles, js, assets)
└── Bước 2: Hoàn thiện dữ liệu tuyển sinh CAND chuẩn hóa trong src/js/data.js

GIAI ĐOẠN 2: XÂY DỰNG ENGINE TRÌNH DIỄN & HỆ THỐNG ÂM THANH
├── Bước 3: Phát triển engine.js (State machine, Keyboard navigation, Fullscreen, Web Audio API Synth)
└── Bước 4: Hoàn thiện CSS tùy chỉnh (CAND Palette, 3D flip, Stamp animation, Bento grid, Glassmorphism)

GIAI ĐOẠN 3: XÂY DỰNG 12 SLIDE BẰNG HTML5 VÀ TAILWIND CSS
├── Bước 5: Slide 1 - 3 (Mở màn, Game 1 Giải mã phù hiệu, Bento Grid 11 trường)
├── Bước 6: Slide 4 - 6 (Chi tiết Học viện, Đại học Nam/PCCC, Game 2 Nối trường - ngành)
├── Bước 7: Slide 7 - 9 (Tiêu chuẩn tuổi/sức khỏe, Lộ trình sơ tuyển, 3 Phương thức xét tuyển)
└── Bước 8: Slide 10 - 12 (Game 3 Thẩm tra hồ sơ, Môi trường rèn luyện, Game 4 Grand Quiz & Bế mạc)

GIAI ĐOẠN 4: HOÀN THIỆN ĐỘNG CƠ 4 MINI-GAME TRONG src/js/games.js
├── Bước 9: Code Mini-Game 1 (3D Flip & Badge Identifier)
├── Bước 10: Code Mini-Game 2 (Canvas Interactive Line Matching)
├── Bước 11: Code Mini-Game 3 (Virtual Desk Document Stamp Approval & Modal Analysis)
└── Bước 12: Code Mini-Game 4 (15s Countdown Quiz Arena, Live Scoring, Confetti Canvas)

GIAI ĐOẠN 5: TÍCH HỢP, KIỂM THỬ GIAO DIỆN & TỐI ƯU HÓA
├── Bước 13: Kiểm tra tính liên kết toàn bộ 12 slide và chuyển cảnh
├── Bước 14: Kiểm thử sự kiện tương tác phím, click, kéo nối trên trình duyệt
└── Bước 15: Hoàn thiện hướng dẫn sử dụng và tài liệu nghiệm thu
```

---

## 6. TIÊU CHÍ NGHIỆM THU (ACCEPTANCE CRITERIA)

| Thành phần | Tiêu chí đánh giá cụ thể | Kết quả mong đợi |
| :--- | :--- | :--- |
| **Khung hình & Trình diễn** | Khung hiển thị cố định tỷ lệ 16:9, tự căn giữa màn hình với nền đen sang trọng | Không vỡ layout ở mọi độ phân giải (1080p, 2K, 4K, Laptop) |
| **Điều khiển bàn phím** | Phím `←` / `→` / `Space` chuyển slide mượt; `F11` toàn màn hình | Điều khiển chính xác, không trượt slide |
| **Nội dung 12 slide** | Đầy đủ dữ liệu chuẩn xác về 11 trường CAND, tiêu chuẩn tuổi, lộ trình, 3 phương thức | Đúng 100% quy chế tuyển sinh CAND hiện hành |
| **Mini-Game 1** | Lật mở 3 thẻ 3D mượt mà, trả lời trắc nghiệm nhận diện 3 lực lượng | Lật 180 độ chân thực, phản hồi âm thanh đúng/sai |
| **Mini-Game 2** | Click hoặc kéo nối 4 cặp trường - ngành bằng đường vẽ Canvas/SVG | Nối đúng hiện màu xanh lá kèm chuông ting, nối sai báo đỏ |
| **Mini-Game 3** | Đóng dấu Duyệt/Từ chối cho 3 hồ sơ thực tế; giải thích rõ căn cứ quy định | Hoạt ảnh dập mộc rung chân thực, modal giải thích chi tiết |
| **Mini-Game 4** | Đồng hồ đếm ngược 15s/câu, ghi nhận điểm số, trao danh hiệu và bắn pháo hoa | Chạy đúng 5 câu hỏi, hiển thị bảng vinh danh và hiệu ứng Confetti |
| **Hệ thống âm thanh** | Web Audio API tự tổng hợp âm thanh không cần phụ thuộc mạng Internet | Âm thanh phản hồi tức thì cho mọi tương tác |

---

## 7. BẢNG PHÍM TẮT ĐIỀU KHIỂN DÀNH CHO NGƯỜI THUYẾT TRÌNH

* **`Phím mũi tên phải (→)` / `Phím Space` / `Page Down`:** Chuyển sang slide tiếp theo.
* **`Phím mũi tên trái (←)` / `Page Up`:** Quay lại slide trước đó.
* **`Phím F11` hoặc phím `F`:** Bật / Tắt chế độ thuyết trình Toàn màn hình (Fullscreen).
* **`Phím Home`:** Quay về Slide 1 mở đầu.
* **`Phím End`:** Chuyển ngay đến Slide 12 tổng kết bế mạc.
* **`Phím M`:** Bật / Tắt nhanh âm thanh (Mute/Unmute BGM & SFX).
* **`Click chuột / Chạm cảm ứng`:** Hỗ trợ đầy đủ trên màn hình cảm ứng hoặc chuột máy chiếu không dây.
