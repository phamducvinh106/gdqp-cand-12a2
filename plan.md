# KẾ HOẠCH PHÁT TRIỂN WEB-BASED BÀI THUYẾT TRÌNH TƯƠNG TÁC BẰNG NỀN TẢNG GOOGLE ANTIGRAVITY

## CHỦ ĐỀ: CÔNG TÁC TUYỂN SINH VÀ ĐÀO TẠO TRONG CÁC TRƯỜNG CÔNG AN NHÂN DÂN VIỆT NAM

---

## I. TỔNG QUAN KIẾN TRÚC PHÁT TRIỂN TRÊN NỀN TẢNG ANTIGRAVITY

### 1. Giới thiệu nền tảng Google Antigravity trong dự án
**Google Antigravity** là nền tảng phát triển dựa trên tác tử thông minh (Agentic Development Platform / Antigravity IDE), cho phép điều phối các subagent AI chuyên trách để tự động lập trình, điều khiển trình duyệt chạy thử nghiệm (Headless Chrome via Browser Tool), sửa lỗi trực tiếp qua diffs và triển khai mã nguồn web hoàn chỉnh.

Thay vì viết code thủ công, dự án này sử dụng Antigravity làm "Tổng chỉ huy kỹ thuật":
* **Điều phối đa tác tử (Agent Orchestration):** Phân chia tác vụ cho các subagent chuyên trách (Nghiên cứu nội dung, Thiết kế giao diện Tailwind/Canvas, Xây dựng logic Minigame, Kiểm thử UI tự động).
* **Quản trị bằng Artifacts:** Theo dõi tiến độ qua `implementation_plan.md` và `task.md` trực tiếp trong Agent Manager.
* **Tự động kiểm thử giao diện bằng `/browser`:** Subagent mở trình duyệt Chrome ảo để click chuyển slide, test âm thanh, kiểm tra logic tính điểm minigame và ghi hình video bằng chứng (Browser recordings).

---

### 2. Thiết lập Cấu trúc Thư mục Dự án trong Antigravity Workspace

```text
cand-presentation-antigravity/
├── .agent/
│   ├── skills/
│   │   ├── felo-slides/              # Kỹ năng định hình layout slide & xuất bản
│   │   └── media-generator/          # Script kết nối sinh ảnh, âm thanh AI
│   └── mcp_config.json               # Cấu hình MCP kết nối công cụ mở rộng
├── implementation_plan.md            # Kế hoạch kiến trúc do Antigravity khởi tạo
├── task.md                           # Checklist trạng thái các bước thực thi
├── src/
│   ├── index.html                    # Single-page presentation core
│   ├── styles/
│   │   └── main.css                  # Custom animations & theme CAND
│   ├── js/
│   │   ├── engine.js                 # Điều khiển slide & audio state machine
│   │   ├── games.js                  # Engine xử lý 4 mini-game tương tác
│   │   └── data.js                   # Dữ liệu ngân hàng câu hỏi, trường CAND
│   └── assets/
│       ├── audio/                    # Nhạc nền, SFX do AI khởi tạo
│       └── images/                   # Hình ảnh, video loop do AI sinh ra
└── README.md                         # Hướng dẫn chạy & trình chiếu
```

---

### 3. Phân Công Subagents Chuyên Trách Trong Antigravity

| Subagent | Chế độ chạy (Mode) | Vai trò & Nhiệm vụ chính |
| :--- | :--- | :--- |
| **`parent_agent`** | Main Session | Quản lý vòng đời dự án, lập file `implementation_plan.md`, duyệt merge diffs code. |
| **`research_subagent`** | `inherit` | Trích xuất chuẩn xác dữ liệu tuyển sinh từ tài liệu SGK (độ tuổi, tiêu chuẩn, danh mục 11 trường CAND, 3 phương thức). |
| **`ui_designer_subagent`** | `branch` | Xây dựng giao diện Web chuẩn tỷ lệ 16:9 (1920x1080), áp dụng tone màu chuẩn CAND (Đỏ cờ, Vàng kim, Xanh thẫm). |
| **`gamedev_subagent`** | `branch` | Lập trình logic JS cho 4 mini-game: lật thẻ, nối dây Drag-Drop, mô phỏng duyệt hồ sơ, trắc nghiệm đếm ngược. |
| **`browser_tester`** | `/browser` tool | Khởi chạy trình duyệt headless, click kiểm tra từng slide, bắt lỗi console, đo FPS và quay video nghiệm thu. |

---

## II. HỆ THỐNG PROMPT TẠO MEDIA AI ĐƯỢC QUẢN TRỊ BỞI ANTIGRAVITY

Antigravity quản lý việc phân loại và gọi các công cụ AI bên ngoài để chuẩn bị media trước khi gắn vào mã nguồn web:

### 1. Hệ thống Âm thanh & Âm nhạc (Music & SFX Prompts - Suno/Udio)
* **Track 1 - Khí thế Mở màn (Intro Theme):**
  * *Prompt:* `Epic Vietnamese heroic march, brass fanfare, disciplined snare drums, ceremonial police academy pride, 105 BPM, instrumental, studio master`.
* **Track 2 - Thuyết trình Tĩnh tâm (Presentation Ambient):**
  * *Prompt:* `Inspiring ambient cinematic background music, soft piano, muted synth pads, low rhythm, confident and professional mood, looping audio`.
* **Track 3 - Hồi hộp Đếm ngược (Quiz Game Tension):**
  * *Prompt:* `Suspenseful game show question theme, ticking clock percussion, dynamic rhythmic bass plucks, increasing tension, 120 BPM`.
* **Bộ hiệu ứng SFX:** Tiếng lật thẻ (`card_flip.wav`), tiếng đóng dấu duyệt (`stamp_approved.wav`), tiếng còi ưu tiên cảnh sát (`siren_soft.mp3`), pháo hoa chiến thắng (`victory_cheer.mp3`).

### 2. Hệ thống Hình ảnh & Video AI (Midjourney / Kling / Runway)
* **Phong cách thống nhất (Visual Guideline):** Chân thực (photorealistic), trang nghiêm, đúng điều lệnh, màu sắc đầm ấm, độ tương phản cao, góc máy điện ảnh.

---

## III. KẾ HOẠCH CHI TIẾT TỪNG SLIDE TRÊN ANTIGRAVITY

---

### SLIDE 1: MỞ MÀN KHÍ THẾ - HIỆU TRIỆU CHIẾN SĨ
* **Nội dung:** Giới thiệu chuyên đề "Công tác Tuyển sinh & Đào tạo trong các trường Công an Nhân dân Việt Nam". Slogan: *"Vì nước quên thân, vì dân phục vụ - Khát vọng màu áo xanh cảnh phục"*.
* **Bố cục Web:** Fullscreen Video background 1080p, hiệu ứng chữ mạ vàng nổi bật với CSS backdrop-filter làm mờ, nút tròn kích hoạt âm thanh góc trên.
* **Media AI:**
  * *Video AI (Runway Gen-3):* `Cinematic slow tracking shot of Vietnamese police cadet academy parade ground, green uniforms, golden morning sunlight, proud expressions, 4k 60fps`.
  * *Nhạc:* `Track 1 - Intro Theme` (âm lượng fade-in từ 0 đến 70%).
* **Lệnh cho Antigravity (Prompt):**
  > *"Antigravity, tạo khung container Slide 1 với video loop nền tự căn chỉnh tỷ lệ 16:9, thêm nút Audio Controller với hiệu ứng chuyển động sóng âm Web Audio API khi bật."*
* **Kịch bản kiểm thử `/browser`:** Agent mở trang chủ, click nút Play Audio, kiểm tra sự kiện `audio.play()` thành công và không bị trình duyệt chặn autoplay.

---

### SLIDE 2: KHỞI ĐỘNG - MINI-GAME 1: "GIẢI MÃ PHÙ HIỆU"
* **Nội dung:** Khởi động hứng khởi, yêu cầu học sinh nhận diện 3 lực lượng cốt lõi: An ninh nhân dân, Cảnh sát nhân dân, Cảnh sát PCCC & CNCH qua hình ảnh phù hiệu/công việc.
* **Cơ chế Game (JavaScript):**
  * Hiển thị 3 ô huy hiệu bí ẩn bị che phủ.
  * Người chơi click lật mở (CSS 3D Card Flip).
  * 4 lựa chọn trắc nghiệm nhanh hiển thị bên dưới. Bấm đúng cộng điểm thưởng và mở ảnh gốc kèm âm thanh chúc mừng.
* **Media AI:**
  * *Ảnh AI (Midjourney):* `3D render of Vietnamese police badges, sharp gold star, laurel branches, polished emblem on red shield, clean studio lighting`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Tạo component MiniGame1 bằng CSS 3D transform (`rotateY(180deg)`). Xây dựng hàm kiểm tra logic lựa chọn đáp án trong `games.js` và cập nhật điểm số vào thanh Header."*
* **Kịch bản kiểm thử `/browser`:** Agent tự động click vào card 1, chọn đáp án đúng, kiểm tra xem class `.flipped` đã được thêm vào DOM hay chưa.

---

### SLIDE 3: BỨC TRANH TOÀN CẢNH - HỆ THỐNG 11 NHÀ TRƯỜNG CÔNG AN
* **Nội dung:** Cấu trúc 3 cấp bậc nhà trường theo quy định Bộ Công an:
  * **Khối Học viện (5 cơ sở):** HV An ninh nhân dân, HV Cảnh sát nhân dân, HV Chính trị CAND, HV Quốc tế, HV Kỹ thuật và Công nghệ an ninh.
  * **Khối Trường Đại học (3 cơ sở):** ĐH An ninh nhân dân, ĐH Cảnh sát nhân dân, ĐH Phòng cháy chữa cháy.
  * **Khối Trường Cao đẳng (3 cơ sở):** CĐ An ninh nhân dân I, CĐ Cảnh sát nhân dân I, CĐ Cảnh sát nhân dân II.
* **Bố cục Web:** Bento Grid 3 cột tương tác (Interactive Bento Box). Khi rê chuột (hover) vào từng cột, cột đó bung rộng (Flex-grow transition) hiển thị danh sách các trường và huy hiệu.
* **Media AI:**
  * *Ảnh AI:* `Modern campus facade of Vietnamese Police Academy, majestic entrance gate, wide avenue with green trees, bright daylight`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Dựng cấu trúc Bento Grid với flexbox responsive, áp dụng transition mượt 0.4s khi hover qua 3 khối trường học viện, đại học, cao đẳng."*
* **Kịch bản kiểm thử `/browser`:** Agent hover lần lượt qua 3 khối, chụp ảnh màn hình lưu vào artifact viewer để xác minh hiệu ứng mở rộng không bị giật lag.

---

### SLIDE 4: CHI TIẾT CÁC HỌC VIỆN CÔNG AN VÀ NGÀNH MŨI NHỌN
* **Nội dung:** Làm rõ các nhóm ngành đào tạo đặc trưng của từng Học viện:
  * *HV An ninh nhân dân:* Nghiệp vụ An ninh, Công nghệ thông tin, An ninh mạng và phòng chống tội phạm công nghệ cao.
  * *HV Cảnh sát nhân dân:* Trinh sát cảnh sát, Quản lý hành chính trật tự xã hội, Cảnh sát giao thông.
  * *HV Chính trị CAND:* Xây dựng Đảng và chính quyền Nhà nước.
  * *HV Quốc tế:* Ngôn ngữ Anh, Ngôn ngữ Trung Quốc.
  * *HV Kỹ thuật & Công nghệ an ninh:* Kỹ thuật CAND, Trinh sát kỹ thuật, Hậu cần CAND, Kỹ thuật điện tử - viễn thông, Y khoa.
* **Bố cục Web:** Vertical Tab Navigation bên trái; khu vực hiển thị chi tiết bên phải gồm badge ngành học và ảnh minh họa nghiệp vụ sinh động.
* **Media AI:**
  * *Ảnh AI:* `Vietnamese cyber crime police officers sitting in front of high-tech command center monitors, neon cybersecurity interfaces, sharp photorealistic details`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Viết logic Tab Switch bằng Vanilla JS trong `engine.js` để render động dữ liệu các ngành tương ứng từ file `data.js` khi click vào từng học viện."*

---

### SLIDE 5: ĐẠI HỌC VÙNG MIỀN & TRƯỜNG ĐẶC THÙ (PCCC)
* **Nội dung:**
  * Phân vùng địa bàn tuyển sinh: ĐH An ninh nhân dân và ĐH Cảnh sát nhân dân đào tạo tương tự 2 Học viện phía Bắc, nhưng tuyển sinh cho thí sinh **từ Đà Nẵng trở vào phía Nam**.
  * Trường đặc thù toàn quốc: Đại học Phòng cháy chữa cháy đào tạo kỹ sư PCCC và Cứu nạn, cứu hộ cho học viên toàn quốc.
* **Bố cục Web:** Bản đồ phân vùng Việt Nam dạng SVG tương tác. Hover vào khu vực miền Nam sẽ làm nổi bật 2 trường ĐH ANND & ĐH CSND; hover vào khối PCCC sẽ kích hoạt video thao trường cứu hỏa.
* **Media AI:**
  * *Video AI Loop (Kling AI):* `Vietnamese firefighter police team executing urgent emergency drill, red fire engine, hose spraying pressurized water, dramatic cinematic lighting`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Nhúng bản đồ SVG Việt Nam có chia ranh giới địa bàn Đà Nẵng, viết sự kiện mouseenter kích hoạt highlight khu vực và popup thông tin trường."*

---

### SLIDE 6: CỦNG CỐ KIẾN THỨC - MINI-GAME 2: "GHÉP TRƯỜNG TRÚNG NGÀNH"
* **Nội dung:** Kiểm tra khả năng ghi nhớ hệ thống trường và các chuyên ngành vừa tìm hiểu.
* **Cơ chế Game (JavaScript Canvas / SVG Line Connecting):**
  * Cột trái: 4 Hộp tên trường (HV Quốc tế, ĐH PCCC, HV ANND, HV Kỹ thuật & CN An ninh).
  * Cột phải: 4 Ngành nghề ngẫu nhiên (An ninh mạng & PCTP công nghệ cao, Ngôn ngữ Trung Quốc, PCCC & Cứu hộ, Kỹ thuật điện tử - viễn thông & Y khoa).
  * Thao tác: Kéo thả (Drag & Drop) hoặc Click chọn 2 đầu để vẽ đường nối.
  * Xử lý: Nối đúng đường vẽ chuyển sang màu xanh lá (`#2ec4b6`) kèm SFX "Ting"; nối sai đường chuyển sang màu đỏ rồi tự biến mất.
* **Lệnh cho Antigravity (Prompt):**
  > *"Viết module Canvas vẽ đường nối động giữa hai node HTML. Bắt sự kiện chạm và thả chuột, kiểm tra cặp id tương ứng từ file cấu hình `data.js`."*
* **Kịch bản kiểm thử `/browser`:** Agent mô phỏng sự kiện drag từ nút "ĐH PCCC" sang nút "PCCC & Cứu hộ", kiểm tra đường nối được vẽ thành công trên canvas.

---

### SLIDE 7: TIÊU CHUẨN XÉT TUYỂN - "BẠN CÓ ĐỦ ĐIỀU KIỆN?"
* **Nội dung:** Bốn trụ cột tiêu chuẩn bắt buộc khi đăng ký vào các trường CAND:
  1. **Chính trị & Đạo đức:** Đủ tiêu chuẩn về chính trị, phẩm chất đạo đức theo quy định hiện hành của Bộ Công an.
  2. **Trình độ văn hóa:** Tốt nghiệp THPT; học sinh thường trú, học sinh T11, công dân hoàn thành nghĩa vụ CAND đạt chuẩn học lực theo quy định.
  3. **Độ tuổi:**
     * Thí sinh phổ thông & thường trú: **Không quá 22 tuổi**.
     * Người dân tộc thiểu số: **Không quá 25 tuổi**.
  4. **Sức khỏe:** Đạt tiêu chuẩn thể lực, thị lực, chiều cao, cân nặng theo thang đo của Bộ Công an.
* **Bố cục Web:** 4 Khối Flip-Card 3D tương tác. Mỗi khối có icon infographic phát sáng kèm thanh trượt mô phỏng kiểm tra chiều cao/thị lực.
* **Media AI:**
  * *Ảnh AI:* `Clean graphic iconography for police health examination: eye test chart, height ruler, medical heartbeat pulse, sleek golden-blue badge motif`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Tạo 4 thẻ tiêu chuẩn dạng Grid với CSS Glassmorphism, thêm thanh trượt tương tác hiển thị trực quan mốc tuổi 22 (Kinh) và 25 (Dân tộc thiểu số)."*

---

### SLIDE 8: LỘ TRÌNH DỰ TUYỂN (INTERACTIVE TIMELINE)
* **Nội dung:** Hướng dẫn 2 giai đoạn bắt buộc thí sinh phải trải qua:
  * **Bước 1: Sơ tuyển tại địa phương:** Mua hồ sơ và đăng ký sơ tuyển tại Công an cấp xã/phường nơi đăng ký thường trú; tuân thủ lịch khám sức khỏe và thẩm tra lý lịch.
  * **Bước 2: Đăng ký xét tuyển:** Thực hiện tương tự đăng ký xét tuyển vào các trường Quân đội; chọn tổ hợp môn xét tuyển theo quy định hàng năm của Bộ Công an.
* **Bố cục Web:** Thanh tiến trình nằm ngang (Interactive Stepper). Khi bấm vào từng bước, màn hình trượt mượt mà (smooth scrolling) mở bung checklist giấy tờ và lưu ý thời gian cụ thể.
* **Lệnh cho Antigravity (Prompt):**
  > *"Xây dựng Stepper Timeline bằng CSS Flexbox và JS. Mỗi bước khi active sẽ đổi màu từ xám sang đỏ son và mở accordion nội dung chi tiết phía dưới."*

---

### SLIDE 9: BA PHƯƠNG THỨC XÉT TUYỂN ĐẠI HỌC CHÍNH QUY
* **Nội dung:**
  * **Phương thức 1:** Tuyển thẳng theo quy chế tuyển sinh hiện hành của Bộ GD&ĐT và quy định của Bộ Công an (giải quốc gia, quốc tế).
  * **Phương thức 2:** Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế (IELTS/TOEFL/HSK...) với kết quả bài thi đánh giá của Bộ Công an.
  * **Phương thức 3:** Xét tuyển kết hợp kết quả thi tốt nghiệp THPT với kết quả bài thi đánh giá của Bộ Công an.
  * *Lưu ý về Trung cấp CAND:* Căn cứ tình hình thực tiễn, Bộ Công an xét tuyển hệ trung cấp từ nguồn chiến sĩ nghĩa vụ hoặc thí sinh dự tuyển đại học chưa trúng tuyển.
* **Bố cục Web:** Bảng so sánh 3 cột (Comparison Matrix) trực quan với hiệu ứng ribbon đánh dấu điều kiện then chốt ("Bài thi đánh giá của Bộ Công an" là bắt buộc cho PT2 & PT3).
* **Media AI:**
  * *Minh họa AI:* `Conceptual illustration of graduation diploma, international language certificate with golden seal, and official police academy emblem`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Code bảng so sánh 3 phương thức xét tuyển có highlight đặc biệt cho cụm từ 'Bài thi đánh giá của Bộ Công an' ở cả 2 phương thức 2 và 3."*

---

### SLIDE 10: TÌNH HUỐNG THỰC TẾ - MINI-GAME 3: "PHÒNG SƠ TUYỂN ẢO"
* **Nội dung:** Học sinh đóng vai Cán bộ tuyển sinh tại Công an xã/huyện để thẩm tra 3 hồ sơ giả định:
  * *Hồ sơ 1:* Thí sinh Nguyễn Văn A, 23 tuổi, dân tộc Kinh, tốt nghiệp THPT loại Giỏi. `-> Kết quả: KHÔNG ĐẠT (Quá tuổi quy định 22)`.
  * *Hồ sơ 2:* Thí sinh Lò Thị B, 24 tuổi, dân tộc Thái, sức khỏe loại 1, hạnh kiểm Tốt. `-> Kết quả: ĐẠT (Người dân tộc thiểu số được đến 25 tuổi)`.
  * *Hồ sơ 3:* Thí sinh Trần C, 18 tuổi, đạt IELTS 7.5 nhưng từ chối thi bài thi đánh giá của Bộ Công an. `-> Kết quả: KHÔNG ĐẠT (Phương thức 2 bắt buộc phải có điểm bài thi đánh giá của Bộ Công an)`.
* **Cơ chế Game (JavaScript):**
  * Giao diện bàn làm việc của Cán bộ tuyển sinh với tập hồ sơ mở sẵn.
  * Người chơi chọn 1 trong 2 con dấu mộc đỏ: **"DUYỆT - ĐỦ ĐIỀU KIỆN"** hoặc **"TỪ CHỐI - KHÔNG ĐỦ TIÊU CHUẨN"**.
  * Đóng dấu kèm hiệu ứng âm thanh dập mộc `stamp_sound.mp3`. Hiển thị bảng phân tích lý do dựa trên quy chế SGK.
* **Lệnh cho Antigravity (Prompt):**
  > *"Xây dựng component MiniGame3 mô phỏng bàn làm việc, xử lý sự kiện click con dấu tạo hiệu ứng rung stamp, so khớp đáp án và pop-up giải thích điều luật."*
* **Kịch bản kiểm thử `/browser`:** Agent click dấu "TỪ CHỐI" trên Hồ sơ 1, kiểm tra modal giải thích "Quá 22 tuổi" xuất hiện chính xác.

---

### SLIDE 11: MÔI TRƯỜNG ĐÀO TẠO & QUYỀN LỢI CHIẾN SĨ
* **Nội dung:**
  * **Trang bị toàn diện:** Học viên được đào tạo lý luận chính trị, điều lệnh, bắn súng, võ thuật CAND, thể lực và chuyên môn nghiệp vụ chuyên sâu.
  * **Chế độ đãi ngộ 100%:** Bao cấp học phí, trang cấp quân tư trang, nơi ăn ở và phụ cấp hàng tháng.
  * **Đảm bảo công tác:** Học viên sau khi tốt nghiệp được Bộ Công an điều động, phân công công tác tại các cơ quan, đơn vị nghiệp vụ phù hợp với chuyên ngành đào tạo.
* **Bố cục Web:** Giao diện Split-Screen 60/40: Bên trái là video loop AI học viên duyệt đội ngũ và tập luyện võ thuật; bên phải là 3 thẻ quyền lợi mạ vàng chuyển động so-le.
* **Media AI:**
  * *Video AI (Runway Gen-3):* `Disciplined Vietnamese police academy students marching in perfect synchronization across grand campus square, blue sky, cinematic telephoto lens, photorealistic`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Xây dựng Split Layout với thẻ bên phải xuất hiện so-le bằng hiệu ứng CSS fade-in-up khi cuộn đến slide."*

---

### SLIDE 12: ĐẤU TRƯỜNG TRI THỨC (MINI-GAME 4: GRAND QUIZ) & BẾ MẠC
* **Nội dung:** Tổng kết buổi thuyết trình bằng Đấu trường trắc nghiệm 5 câu hỏi nhanh:
  1. *Học viện nào đào tạo chuyên ngành An ninh mạng và PCTP công nghệ cao?* (Đáp án: HV An ninh nhân dân)
  2. *Thí sinh người dân tộc thiểu số được đăng ký dự tuyển đến bao nhiêu tuổi?* (Đáp án: Không quá 25 tuổi)
  3. *Học sinh phổ thông nộp hồ sơ đăng ký sơ tuyển ở đâu?* (Đáp án: Công an cấp xã/phường/thị trấn nơi đăng ký thường trú)
  4. *Phương thức xét tuyển 2 kết hợp chứng chỉ ngoại ngữ với điều kiện gì?* (Đáp án: Kết quả bài thi đánh giá của Bộ Công an)
  5. *Sinh viên sau khi tốt nghiệp các trường CAND có phải tự xin việc không?* (Đáp án: Không, 100% được Bộ Công an phân công công tác)
* **Cơ chế Game (JavaScript):**
  * Đồng hồ đếm ngược 15 giây/câu.
  * Bảng tổng kết vinh danh (Scoreboard & Rank Title: *"Chiến Sĩ Xuất Sắc"*, *"Chiến Sĩ Tri Thức"*).
  * Hiệu ứng pháo hoa canvas nổ tung khi kết thúc + Phát `Track 4 - Victory SFX`.
* **Lệnh cho Antigravity (Prompt):**
  > *"Lập trình module GrandQuiz hoàn chỉnh trong `games.js`: timer đếm ngược, tính điểm theo tốc độ trả lời, render bảng xếp hạng và hiệu ứng Canvas Confetti chúc mừng."*
* **Kịch bản kiểm thử `/browser`:** Agent hoàn thành trả lời 5 câu hỏi trắc nghiệm, kiểm tra màn hình bảng điểm và canvas hiệu ứng pháo hoa hiển thị không lỗi.

---

## IV. BẢNG TỔNG HỢP VỊ TRÍ MEDIA AI VÀ MINI-GAME

| Slide | Tên slide | Loại Media AI | Tên Mini-game & Tương tác |
| :---: | :--- | :--- | :--- |
| **1** | Mở màn hiệu triệu | Video loop thao diễn + Nhạc hùng tráng | Audio Controller tương tác |
| **2** | Khởi động nhận diện | Ảnh 3D phù hiệu các lực lượng CAND | **Mini-game 1: Giải mã phù hiệu (3D Flip Card)** |
| **3** | Bức tranh 11 trường | Ảnh khuôn viên hiện đại trường CAND | Bento Grid mở rộng khi hover |
| **4** | Khối Học viện & Ngành | Ảnh chiến sĩ an ninh mạng công nghệ cao | Tab Navigation chọn chuyên ngành |
| **5** | ĐH Miền Nam & PCCC | Video thao trường chữa cháy & cứu hộ | Bản đồ phân vùng SVG tương tác |
| **6** | Củng cố giữa bài | SFX kết nối chính xác / cảnh báo | **Mini-game 2: Ghép trường trúng ngành (Drag & Connect)** |
| **7** | Tiêu chuẩn dự tuyển | Infographic tiêu chuẩn sức khỏe, tuổi | Thẻ thông số 3D & Slider so sánh tuổi |
| **8** | Lộ trình sơ tuyển | Icon bộ thủ tục hồ sơ công an xã | Timeline Stepper tương tác 3 bước |
| **9** | 3 Phương thức xét tuyển | Minh họa chứng chỉ & kỳ thi đánh giá | Bảng so sánh Matrix có highlight |
| **10** | Tình huống thực tế | SFX tiếng đóng dấu mộc đỏ | **Mini-game 3: Phòng sơ tuyển ảo (Mô phỏng duyệt hồ sơ)** |
| **11** | Môi trường & Quyền lợi | Video võ thuật & duyệt đội ngũ | Split-screen video loop & thẻ quyền lợi |
| **12** | Tổng kết bế mạc | Nhạc chiến thắng Fanfare + SFX pháo hoa | **Mini-game 4: Đấu trường tri thức (Grand Quiz + Confetti)** |

---

## V. QUY TRÌNH THỰC THI DỰ ÁN TRÊN ANTIGRAVITY IDE (STEP-BY-STEP WORKFLOW)

```text
+-----------------------------------------------------------------------------------+
| 1. KHỞI TẠO DỰ ÁN TRONG ANTIGRAVITY                                              |
|    - Tạo thư mục workspace                                                        |
|    - Antigravity sinh file implementation_plan.md & task.md                       |
+-----------------------------------------------------------------------------------+
                                        |
                                        v
+-----------------------------------------------------------------------------------+
| 2. ĐIỀU PHỐI SUBAGENTS VIẾT MÃ NGUỒN                                              |
|    - ui_designer_subagent: Cấu trúc HTML5/Tailwind cho 12 slide                   |
|    - gamedev_subagent: Viết logic 4 Mini-game (games.js)                         |
|    - Audio/Media Agent: Tổ chức đường dẫn media AI đúng cấu trúc                  |
+-----------------------------------------------------------------------------------+
                                        |
                                        v
+-----------------------------------------------------------------------------------+
| 3. TỰ ĐỘNG KIỂM THỬ BẰNG /browser SUBAGENT                                       |
|    - Antigravity mở Chrome headless test chuyển trang                             |
|    - Tự động click test Mini-game 1, 2, 3, 4                                      |
|    - Bắt lỗi console JS & tự sửa mã nguồn qua inline diffs                        |
+-----------------------------------------------------------------------------------+
                                        |
                                        v
+-----------------------------------------------------------------------------------+
| 4. XUẤT BẢN VÀ TRÌNH CHIẾU                                                        |
|    - Chạy thử nghiệm với Antigravity Local Preview (`npm start` / Static Serve)   |
|    - Đóng gói sản phẩm trình chiếu mượt mà trên máy chiếu / màn hình lớn          |
+-----------------------------------------------------------------------------------+
```

### Các bước thực hiện cụ thể trong Antigravity IDE:

1. **Khởi tạo kế hoạch thực thi (Implementation Plan):**
   * Mở Antigravity IDE, chọn thư mục dự án và gửi prompt khởi tạo:
     > *"Dựa trên file `ke_hoach_thuyet_trinh_cand.md`, hãy lập `implementation_plan.md` chi tiết để xây dựng bài thuyết trình Web Single-Page với đầy đủ 12 slide và 4 mini-game."*
   * Antigravity sẽ tự động tạo danh sách công việc trong `task.md`.

2. **Duyệt và áp dụng mã nguồn (Inline Diffs Review):**
   * Antigravity sinh mã nguồn cho các file `index.html`, `main.css`, `engine.js`, `games.js`.
   * Sử dụng phím tắt `Alt + Enter` để chấp nhận từng đoạn mã hoặc chọn *Accept All* trong bảng Agent Manager.

3. **Chạy kiểm thử giao diện tự động (Interactive Browser Testing):**
   * Ra lệnh cho Antigravity:
     > *"Hãy dùng `/browser` subagent mở localhost, kiểm tra chức năng lật thẻ ở Slide 2 và chức năng kéo nối ở Slide 6 xem có phản hồi đúng không."*
   * Subagent sẽ điều khiển Chrome, chụp ảnh kết quả và sửa ngay lỗi JavaScript nếu có.

4. **Trình chiếu chính thức:**
   * Mở sản phẩm ở chế độ Toàn màn hình (F11), sử dụng các phím mũi tên `←` / `→` hoặc phím `Space` để điều khiển bài thuyết trình.