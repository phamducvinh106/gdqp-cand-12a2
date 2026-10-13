/**
 * APP.BUNDLE.JS - TỔNG HỢP TOÀN BỘ LOGIC BÀI THUYẾT TRÌNH VÀ 4 MINI-GAME
 * HỖ TRỢ TOÀN DIỆN MEDIA AI (HÌNH ẢNH 3D, VIDEO LOOPS, AUDIO CONTROLLER PRO)
 * Cơ chế Smart Hybrid Fallback: Tự động chạy mượt mà trên cả file:/// và http://
 */

(function() {
  'use strict';

  // ========================================================
  // 1. DỮ LIỆU CHUẨN TUYỂN SINH CAND & 4 MINI-GAME
  // ========================================================
  const CAND_DATA = {
    schools: {
      academies: [
        {
          id: "T01",
          name: "Học viện An ninh nhân dân",
          shortName: "HV ANND (T01)",
          location: "Hà Nội (Phía Bắc)",
          badge: "assets/images/badge_security.svg",
          scope: "Tuyển sinh từ Quảng Bình trở ra phía Bắc (ngành An toàn thông tin tuyển toàn quốc)",
          description: "Cơ sở đào tạo trọng điểm về an ninh quốc gia, tình báo, điều tra an ninh và công nghệ cao.",
          majors: [
            { code: "7860100", name: "Nghiệp vụ an ninh", desc: "Đào tạo trinh sát an ninh, an ninh kinh tế, an ninh đối ngoại." },
            { code: "7480202", name: "An toàn thông tin", desc: "An ninh mạng và phòng chống tội phạm công nghệ cao." },
            { code: "7480201", name: "Công nghệ thông tin", desc: "Ứng dụng CNTT trong quản trị nghiệp vụ an ninh." }
          ]
        },
        {
          id: "T02",
          name: "Học viện Cảnh sát nhân dân",
          shortName: "HV CSND (T02)",
          location: "Hà Nội (Phía Bắc)",
          badge: "assets/images/badge_police.svg",
          scope: "Tuyển sinh từ Quảng Bình trở ra phía Bắc",
          description: "Trung tâm đào tạo sĩ quan cảnh sát lớn nhất cả nước, chuyên trách trật tự an toàn xã hội.",
          majors: [
            { code: "7860101", name: "Nghiệp vụ cảnh sát", desc: "Trinh sát hình sự, điều tra tội phạm, quản lý hành chính về TTXH." },
            { code: "7860102", name: "Cảnh sát giao thông", desc: "Chỉ huy, điều hành giao thông và tuần tra kiểm soát." },
            { code: "7860103", name: "Kỹ thuật hình sự", desc: "Giám định dấu vết, khám nghiệm hiện trường, pháp y kỹ thuật." }
          ]
        },
        {
          id: "T03",
          name: "Học viện Chính trị CAND",
          shortName: "HV Chính trị CAND (T03)",
          location: "Hà Nội",
          badge: "assets/images/badge_security.svg",
          scope: "Tuyển sinh toàn quốc",
          description: "Trung tâm đào tạo lý luận chính trị, công tác Đảng và công tác tư tưởng trong CAND.",
          majors: [
            { code: "7310202", name: "Xây dựng Đảng và chính quyền Nhà nước", desc: "Đào tạo cán bộ tham mưu chính trị, công tác Đảng, công tác tư tưởng trong CAND." }
          ]
        },
        {
          id: "B06",
          name: "Học viện Quốc tế",
          shortName: "Học viện Quốc tế (B06)",
          location: "Hà Nội",
          badge: "assets/images/badge_security.svg",
          scope: "Tuyển sinh toàn quốc",
          description: "Cơ sở đào tạo chuyên sâu về ngoại ngữ và hợp tác quốc tế trong lĩnh vực an ninh trật tự.",
          majors: [
            { code: "7220201", name: "Ngôn ngữ Anh", desc: "Phục vụ an ninh đối ngoại và hợp tác quốc tế." },
            { code: "7220204", name: "Ngôn ngữ Trung Quốc", desc: "Phục vụ an ninh biên giới và quan hệ đối ngoại." }
          ]
        },
        {
          id: "T08",
          name: "Học viện Kỹ thuật và Công nghệ an ninh",
          shortName: "HV KT&CN An ninh (T08)",
          location: "Hà Nội",
          badge: "assets/images/badge_security.svg",
          scope: "Tuyển sinh toàn quốc",
          description: "Đào tạo chuyên gia kỹ thuật nghiệp vụ, cơ yếu, viễn thông và y khoa phục vụ CAND.",
          majors: [
            { code: "7860104", name: "Kỹ thuật CAND & Trinh sát kỹ thuật", desc: "Trinh sát kỹ thuật nghiệp vụ, tác chiến điện tử." },
            { code: "7520207", name: "Kỹ thuật điện tử - viễn thông", desc: "Hệ thống thông tin liên lạc nghiệp vụ, cơ yếu an ninh." },
            { code: "7720101", name: "Y khoa CAND", desc: "Bác sĩ đa khoa phục vụ y tế trong lực lượng Công an nhân dân." }
          ]
        }
      ],
      universities: [
        {
          id: "T04",
          name: "Trường Đại học An ninh nhân dân",
          shortName: "ĐH ANND (T04)",
          location: "TP. Hồ Chí Minh",
          badge: "assets/images/badge_security.svg",
          scope: "Tuyển sinh từ Quảng Trị (hoặc Đà Nẵng) trở vào phía Nam",
          description: "Cơ sở trọng điểm đào tạo cán bộ an ninh cho các tỉnh, thành phố phía Nam."
        },
        {
          id: "T05",
          name: "Trường Đại học Cảnh sát nhân dân",
          shortName: "ĐH CSND (T05)",
          location: "TP. Hồ Chí Minh",
          badge: "assets/images/badge_police.svg",
          scope: "Tuyển sinh từ Quảng Trị (hoặc Đà Nẵng) trở vào phía Nam",
          description: "Đào tạo sĩ quan cảnh sát chỉ huy, điều tra tội phạm cho địa bàn các tỉnh phía Nam."
        },
        {
          id: "T06",
          name: "Trường Đại học Phòng cháy chữa cháy",
          shortName: "ĐH PCCC (T06)",
          location: "Hà Nội & Cơ sở phía Nam",
          badge: "assets/images/badge_fire.svg",
          scope: "Tuyển sinh trên phạm vi TOÀN QUỐC (Cơ sở phía Bắc và Cơ sở phía Nam)",
          description: "Cơ sở duy nhất đào tạo kỹ sư Phòng cháy, chữa cháy và Cứu nạn, cứu hộ trên toàn quốc."
        }
      ]
    },

    game1: [
      {
        id: "anninh",
        title: "Lực Lượng An Ninh Nhân Dân",
        image: "assets/images/badge_security.jpg",
        tagline: "Bảo vệ an ninh quốc gia, bảo vệ chế độ",
        question: "Lực lượng nào mang trọng trách phòng ngừa, phát hiện, ngăn chặn các âm mưu xâm phạm an ninh quốc gia, chống gián điệp, phản động?",
        options: [
          "A. Cảnh sát giao thông",
          "B. An ninh nhân dân",
          "C. Cảnh sát phòng cháy chữa cháy",
          "D. Cảnh sát cơ động"
        ],
        correctIndex: 1,
        explanation: "Chính xác! Lực lượng An ninh nhân dân là 'thanh bảo kiếm' bảo vệ Đảng, Nhà nước và an ninh Tổ quốc."
      },
      {
        id: "canhsat",
        title: "Lực Lượng Cảnh Sát Nhân Dân",
        image: "assets/images/badge_police.jpg",
        tagline: "Bảo đảm trật tự an toàn xã hội, đấu tranh phòng chống tội phạm",
        question: "Lực lượng nào trực tiếp đấu tranh phòng chống tội phạm hình sự, bảo đảm trật tự giao thông và an toàn trật tự công cộng hàng ngày?",
        options: [
          "A. Cảnh sát nhân dân",
          "B. Cơ yếu Chính phủ",
          "C. Kiểm ngư Việt Nam",
          "D. Dân quân tự vệ"
        ],
        correctIndex: 0,
        explanation: "Chính xác! Lực lượng Cảnh sát nhân dân giữ gìn trật tự an toàn xã hội, cuộc sống bình yên của nhân dân."
      },
      {
        id: "pccc",
        title: "Cảnh Sát PCCC & CNCH",
        image: "assets/images/badge_fire.jpg",
        tagline: "Cứu người như cứu hỏa - Vì bình yên cuộc sống",
        question: "Lực lượng nào có nhiệm vụ chữa cháy, cứu nạn cứu hộ trong các vụ hỏa hoạn, sập đổ công trình, thiên tai hiểm họa?",
        options: [
          "A. Cảnh sát kinh tế",
          "B. Cảnh sát quản lý hành chính",
          "C. Cảnh sát PCCC và Cứu nạn, cứu hộ",
          "D. Cảnh sát môi trường"
        ],
        correctIndex: 2,
        explanation: "Chính xác! Cảnh sát PCCC và Cứu nạn, cứu hộ sẵn sàng xông pha vào biển lửa và hiểm nguy cứu người."
      }
    ],

    game2: {
      schools: [
        { id: "s1", name: "Học viện Quốc tế (B06)", matchId: "m2" },
        { id: "s2", name: "Đại học Phòng cháy chữa cháy (T06)", matchId: "m1" },
        { id: "s3", name: "Học viện An ninh nhân dân (T01)", matchId: "m3" },
        { id: "s4", name: "HV Kỹ thuật & Công nghệ an ninh (T08)", matchId: "m4" }
      ],
      majors: [
        { id: "m1", name: "PCCC & Cứu nạn, cứu hộ", matchId: "s2" },
        { id: "m2", name: "Ngôn ngữ Anh & Ngôn ngữ Trung Quốc", matchId: "s1" },
        { id: "m3", name: "An ninh mạng & PCTP công nghệ cao", matchId: "s3" },
        { id: "m4", name: "Kỹ thuật điện tử viễn thông & Y khoa CAND", matchId: "s4" }
      ]
    },

    game3: [
      {
        id: 1,
        candidateName: "Nguyễn Văn A",
        photo: "👨‍🎓",
        info: {
          dob: "2001 (23 tuổi)",
          ethnicity: "Dân tộc Kinh",
          education: "Tốt nghiệp THPT Giỏi (8.8)",
          health: "Sức khỏe Loại 1, Chiều cao 1m75",
          politics: "Lý lịch rõ ràng, Đoàn viên xuất sắc",
          methodApply: "Phương thức 3 vào Học viện CSND"
        },
        correctAction: "REJECT",
        lawCitation: "Quy chế tuyển sinh CAND: Thí sinh phổ thông dân tộc Kinh không quá 22 tuổi tính đến năm dự tuyển.",
        explanation: "Thí sinh Nguyễn Văn A đã 23 tuổi. Căn cứ quy chế, thí sinh phổ thông người dân tộc Kinh chỉ được dự tuyển khi KHÔNG QUÁ 22 TUỔI. Do đó cán bộ tuyển sinh phải TỪ CHỐI tiếp nhận."
      },
      {
        id: 2,
        candidateName: "Lò Thị B",
        photo: "👩‍🎓",
        info: {
          dob: "2000 (24 tuổi)",
          ethnicity: "Dân tộc Thái (Thiểu số)",
          education: "Tốt nghiệp THPT Khá (7.6)",
          health: "Sức khỏe Loại 1, Chiều cao 1m62",
          politics: "Bản thân và gia đình chấp hành tốt",
          methodApply: "Phương thức 3 vào Học viện ANND"
        },
        correctAction: "APPROVE",
        lawCitation: "Quy chế tuyển sinh CAND: Người dân tộc thiểu số được đăng ký dự tuyển đến KHÔNG QUÁ 25 TUỔI.",
        explanation: "Chính xác! Thí sinh Lò Thị B là người dân tộc thiểu số, 24 tuổi. Căn cứ quy chế, thí sinh dân tộc thiểu số được nâng trần độ tuổi đến 25 tuổi, đáp ứng đầy đủ tiêu chuẩn!"
      },
      {
        id: 3,
        candidateName: "Trần C",
        photo: "🧑‍🎓",
        info: {
          dob: "2006 (18 tuổi)",
          ethnicity: "Dân tộc Kinh",
          education: "Tốt nghiệp THPT, IELTS Academic 8.0",
          health: "Sức khỏe Loại 1, Chiều cao 1m78",
          politics: "Đủ tiêu chuẩn chính trị",
          methodApply: "Đăng ký Phương thức 2 nhưng TỪ CHỐI thi Bài thi đánh giá của Bộ Công an"
        },
        correctAction: "REJECT",
        lawCitation: "Phương thức 2: Xét tuyển kết hợp chứng chỉ ngoại ngữ BẮT BUỘC VỚI kết quả Bài thi đánh giá của BCA.",
        explanation: "Chính xác! Phương thức 2 bắt buộc phải kết hợp cả chứng chỉ ngoại ngữ VỚI kết quả Bài thi đánh giá của Bộ Công an. Từ chối thi bài thi này thì hồ sơ không hợp lệ."
      }
    ],

    game4: [
      {
        id: 1,
        question: "Học viện nào trong hệ thống nhà trường CAND phụ trách đào tạo ngành An ninh mạng và Phòng chống tội phạm công nghệ cao?",
        options: [
          "A. Học viện Cảnh sát nhân dân (T02)",
          "B. Học viện An ninh nhân dân (T01)",
          "C. Đại học Phòng cháy chữa cháy (T06)",
          "D. Cao đẳng Cảnh sát nhân dân I (T09)"
        ],
        correctIndex: 1,
        explanation: "Học viện An ninh nhân dân (T01) là cái nôi đào tạo chuyên ngành An toàn thông tin, An ninh mạng và PCTP công nghệ cao."
      },
      {
        id: 2,
        question: "Độ tuổi tối đa để thí sinh là NGƯỜI DÂN TỘC THIỂU SỐ đăng ký tham gia tuyển sinh vào các trường CAND là bao nhiêu?",
        options: [
          "A. Không quá 22 tuổi",
          "B. Không quá 24 tuổi",
          "C. Không quá 25 tuổi",
          "D. Không quá 28 tuổi"
        ],
        correctIndex: 2,
        explanation: "Theo quy chế, thí sinh dân tộc thiểu số được dự tuyển đến không quá 25 tuổi (thí sinh dân tộc Kinh không quá 22 tuổi)."
      },
      {
        id: 3,
        question: "Học sinh THPT có nguyện vọng dự tuyển vào các trường CAND phải nộp hồ sơ đăng ký sơ tuyển ở đâu đầu tiên?",
        options: [
          "A. Trực tiếp tại cổng trường đại học CAND",
          "B. Tại Công an cấp xã/phường/thị trấn nơi đăng ký thường trú",
          "C. Tại Sở Giáo dục và Đào tạo tỉnh",
          "D. Tại Bệnh viện Công an tỉnh"
        ],
        correctIndex: 1,
        explanation: "Bước 1 bắt buộc: Thí sinh phải liên hệ Công an xã, phường nơi cư trú để làm thủ tục sơ tuyển, thẩm tra lý lịch và khám sức khỏe."
      },
      {
        id: 4,
        question: "Điều kiện BẮT BUỘC có mặt ở cả Phương thức xét tuyển 2 và Phương thức 3 vào đại học CAND chính quy là gì?",
        options: [
          "A. Thí sinh phải có chứng chỉ IELTS từ 7.5 trở lên",
          "B. Điểm thi tốt nghiệp THPT phải từ 28 điểm trở lên",
          "C. Phải có kết quả bài thi đánh giá của Bộ Công an",
          "D. Phải là Đảng viên Đảng Cộng sản Việt Nam"
        ],
        correctIndex: 2,
        explanation: "Cả PT2 và PT3 đều bắt buộc thí sinh phải tham gia Bài thi đánh giá của Bộ Công an để lấy điểm xét tuyển."
      },
      {
        id: 5,
        question: "Sau khi tốt nghiệp các học viện, trường đại học CAND, sinh viên có phải tự đi xin việc làm không?",
        options: [
          "A. Có, phải tự gửi hồ sơ thi tuyển công chức bên ngoài",
          "B. Không, 100% học viên được Bộ Công an điều động, phân công công tác",
          "C. Tự liên hệ các công ty bảo vệ tư nhân",
          "D. Chỉ những người tốt nghiệp loại Giỏi mới được phân công công tác"
        ],
        correctIndex: 1,
        explanation: "100% học viên tốt nghiệp các trường CAND được phong cấp bậc hàm sĩ quan và được Bộ Công an điều động phân công công tác theo đúng chuyên môn!"
      }
    ]
  };

  // ========================================================
  // 2. AUDIO CONTROLLER PRO (HYBRID MP3 & SYNTHESIZER PLAYLIST)
  // ========================================================
  class AudioControllerPro {
    constructor() {
      this.audioCtx = null;
      this.isMuted = false;
      this.bgmPlaying = false;
      this.bgmInterval = null;
      this.volume = 0.5; // Mặc định 50%
      this.currentTrack = 'intro'; // 'intro', 'ambient', 'tension', 'victory'
      this.audioElement = null; // Dùng nếu có file MP3 thật
    }

    initAudioContext() {
      if (!this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioCtx = new AudioCtx();
      }
    }

    resumeContext() {
      this.initAudioContext();
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    setVolume(vol) {
      this.volume = Math.max(0, Math.min(1, vol));
      if (this.audioElement) {
        this.audioElement.volume = this.volume;
      }
    }

    // SFX CHÂN THỰC
    playCorrect() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(659.25, now);
        osc1.frequency.exponentialRampToValueAtTime(987.77, now + 0.15);
        osc2.frequency.setValueAtTime(523.25, now);
        osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);

        gain.gain.setValueAtTime(0.3 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.45);
        osc2.stop(now + 0.45);
      } catch (e) {}
    }

    playWrong() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

        gain.gain.setValueAtTime(0.25 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.4);
      } catch (e) {}
    }

    playCardFlip() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

        gain.gain.setValueAtTime(0.2 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.15);
      } catch (e) {}
    }

    playStamp() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        // Âm trầm dập mộc gỗ
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

        gain.gain.setValueAtTime(0.6 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.35);
      } catch (e) {}
    }

    playTick() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.12 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      } catch (e) {}
    }

    playFanfare() {
      if (this.isMuted) return;
      this.resumeContext();
      if (!this.audioCtx) return;
      try {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        const now = this.audioCtx.currentTime;
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.25 * this.volume, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.45);
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.55);
        });
      } catch (e) {}
    }

    // CHUYỂN BÀI HÁT THEO NGỮ CẢNH (CONTEXTUAL PLAYLIST)
    setTrack(trackName) {
      if (this.currentTrack === trackName) return;
      this.currentTrack = trackName;
      if (this.bgmPlaying) {
        if (this.audioElement) {
          if (trackName === 'tension') {
            this.audioElement.playbackRate = 1.05;
          } else if (trackName === 'ambient') {
            this.audioElement.playbackRate = 0.95;
          } else {
            this.audioElement.playbackRate = 1.0;
          }
        }
      }
    }

    toggleBGM() {
      if (this.bgmPlaying) {
        this.stopBGM();
        return false;
      } else {
        this.startBGM();
        return true;
      }
    }

    startBGM() {
      if (this.isMuted) return;
      this.resumeContext();
      this.stopBGM();
      this.bgmPlaying = true;

      if (!this.audioElement) {
        this.audioElement = document.getElementById('bgm-audio');
      }

      if (this.audioElement) {
        this.audioElement.volume = this.volume;
        const playPromise = this.audioElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Trình duyệt chặn autoplay hoặc file cục bộ -> dùng synthesizer kèn đồng CAND
            this.playSynthesizedMarch();
          });
        }
      } else {
        this.playSynthesizedMarch();
      }
    }

    playSynthesizedMarch() {
      if (!this.audioCtx || this.isMuted) return;
      if (this.bgmInterval) clearInterval(this.bgmInterval);

      // GIAI ĐIỆU HÀNH KHÚC QUÂN NHẠC CAND (C MAJOR BRASS FANFARE)
      const marchMotifs = [
        { notes: [261.63, 329.63, 392.00], bass: 130.81 }, // C
        { notes: [329.63, 392.00, 523.25], bass: 196.00 }, // C/G
        { notes: [349.23, 440.00, 523.25], bass: 174.61 }, // F
        { notes: [392.00, 493.88, 587.33], bass: 196.00 }  // G
      ];

      let beat = 0;
      const stepInterval = 530; // ~114 BPM

      const playMarchBeat = () => {
        if (!this.bgmPlaying || this.isMuted) return;
        const now = this.audioCtx.currentTime;
        const m = marchMotifs[Math.floor(beat / 4) % marchMotifs.length];
        const beatInBar = beat % 4;

        // Trống cái (Kick Drum) nhịp 1 và 3
        if (beatInBar === 0 || beatInBar === 2) {
          const oscK = this.audioCtx.createOscillator();
          const gainK = this.audioCtx.createGain();
          oscK.frequency.setValueAtTime(100, now);
          oscK.frequency.exponentialRampToValueAtTime(45, now + 0.12);
          gainK.gain.setValueAtTime(0.35 * this.volume, now);
          gainK.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          oscK.connect(gainK);
          gainK.connect(this.audioCtx.destination);
          oscK.start(now);
          oscK.stop(now + 0.22);
        }

        // Trống con (Snare Cadence) nhịp 2 và 4
        if (beatInBar === 1 || beatInBar === 3) {
          const oscS = this.audioCtx.createOscillator();
          const gainS = this.audioCtx.createGain();
          oscS.type = 'triangle';
          oscS.frequency.setValueAtTime(180, now);
          gainS.gain.setValueAtTime(0.2 * this.volume, now);
          gainS.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          oscS.connect(gainS);
          gainS.connect(this.audioCtx.destination);
          oscS.start(now);
          oscS.stop(now + 0.14);
        }

        // Dàn Kèn Đồng (Brass Trumpet & Horns Chords)
        m.notes.forEach((freq) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          const filter = this.audioCtx.createBiquadFilter();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now);
          filter.frequency.exponentialRampToValueAtTime(600, now + 0.35);

          const vol = 0.04 * this.volume;
          gain.gain.setValueAtTime(vol, now);
          gain.gain.linearRampToValueAtTime(vol * 1.5, now + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now);
          osc.stop(now + 0.48);
        });

        // Âm Trầm Hành Tiến (Brass Tuba Bass)
        const oscB = this.audioCtx.createOscillator();
        const gainB = this.audioCtx.createGain();
        oscB.type = 'sawtooth';
        oscB.frequency.setValueAtTime(m.bass, now);
        const bVol = 0.05 * this.volume;
        gainB.gain.setValueAtTime(bVol, now);
        gainB.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        oscB.connect(gainB);
        gainB.connect(this.audioCtx.destination);
        oscB.start(now);
        oscB.stop(now + 0.38);

        beat++;
      };

      playMarchBeat();
      this.bgmInterval = setInterval(playMarchBeat, stepInterval);
    }

    stopBGM() {
      this.bgmPlaying = false;
      if (this.audioElement) {
        this.audioElement.pause();
      }
      if (this.bgmInterval) {
        clearInterval(this.bgmInterval);
        this.bgmInterval = null;
      }
    }
  }

  // ========================================================
  // 3. TRÌNH ĐIỀU HƯỚNG SLIDE (PRESENTATION ENGINE)
  // ========================================================
  class PresentationEngine {
    constructor(soundManager) {
      this.currentSlide = 1;
      this.totalSlides = 12;
      this.sound = soundManager;
      this.isMenuOpen = false;
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.cacheDOM();
      this.bindEvents();
      this.goToSlide(1);
      this.updateSoundIcon();
    }

    cacheDOM() {
      this.slides = document.querySelectorAll('.slide-container');
      this.progressBar = document.getElementById('presentation-progress');
      this.slideNumberDisplay = document.getElementById('slide-number-display');
      this.prevBtn = document.getElementById('prev-slide-btn');
      this.nextBtn = document.getElementById('next-slide-btn');
      this.audioBtn = document.getElementById('audio-toggle-btn');
      this.volumeSlider = document.getElementById('volume-slider');
      this.fullscreenBtn = document.getElementById('fullscreen-toggle-btn');
      this.menuBtn = document.getElementById('menu-toggle-btn');
      this.menuDrawer = document.getElementById('menu-drawer');
      this.menuOverlay = document.getElementById('menu-overlay');
      this.menuCloseBtn = document.getElementById('menu-close-btn');
      this.slideLinks = document.querySelectorAll('.slide-toc-item');
    }

    bindEvents() {
      window.addEventListener('keydown', (e) => {
        this.sound.resumeContext();
        switch (e.code) {
          case 'ArrowRight':
          case 'Space':
          case 'PageDown':
            e.preventDefault();
            this.nextSlide();
            break;
          case 'ArrowLeft':
          case 'PageUp':
            e.preventDefault();
            this.prevSlide();
            break;
          case 'Home':
            e.preventDefault();
            this.goToSlide(1);
            break;
          case 'End':
            e.preventDefault();
            this.goToSlide(this.totalSlides);
            break;
          case 'KeyF':
            e.preventDefault();
            this.toggleFullscreen();
            break;
          case 'KeyM':
            e.preventDefault();
            this.toggleAudio();
            break;
        }
      });

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
      if (this.audioBtn) this.audioBtn.addEventListener('click', () => this.toggleAudio());
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener('input', (e) => {
          const vol = parseFloat(e.target.value);
          this.sound.setVolume(vol);
        });
      }
      if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

      if (this.menuBtn) this.menuBtn.addEventListener('click', () => this.openMenu());
      if (this.menuCloseBtn) this.menuCloseBtn.addEventListener('click', () => this.closeMenu());
      if (this.menuOverlay) this.menuOverlay.addEventListener('click', () => this.closeMenu());

      if (this.slideLinks) {
        this.slideLinks.forEach(link => {
          link.addEventListener('click', () => {
            const targetSlide = parseInt(link.getAttribute('data-slide-index'), 10);
            if (targetSlide) {
              this.goToSlide(targetSlide);
              this.closeMenu();
            }
          });
        });
      }

      window.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      window.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        const threshold = 60;
        if (this.touchEndX < this.touchStartX - threshold) {
          this.nextSlide();
        } else if (this.touchEndX > this.touchStartX + threshold) {
          this.prevSlide();
        }
      }, { passive: true });

      window.addEventListener('click', () => {
        this.sound.resumeContext();
      }, { once: true });
    }

    goToSlide(slideIndex) {
      if (slideIndex < 1 || slideIndex > this.totalSlides) return;
      this.currentSlide = slideIndex;

      // CHUYỂN BÀI HÁT THEO NGỮ CẢNH SLIDE
      if (this.currentSlide === 1) {
        this.sound.setTrack('intro');
      } else if (this.currentSlide === 12) {
        this.sound.setTrack('tension');
      } else {
        this.sound.setTrack('ambient');
      }

      this.slides.forEach(slide => {
        const idx = parseInt(slide.getAttribute('data-slide'), 10);
        if (idx === this.currentSlide) {
          slide.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
          slide.classList.add('flex', 'opacity-100');
        } else {
          slide.classList.add('hidden', 'opacity-0', 'pointer-events-none');
          slide.classList.remove('flex', 'opacity-100');
        }
      });

      if (this.progressBar) {
        const progressPercent = ((this.currentSlide) / this.totalSlides) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
      }

      if (this.slideNumberDisplay) {
        this.slideNumberDisplay.textContent = `${this.currentSlide.toString().padStart(2, '0')} / ${this.totalSlides.toString().padStart(2, '0')}`;
      }

      if (this.prevBtn) {
        this.prevBtn.disabled = (this.currentSlide === 1);
        this.prevBtn.style.opacity = (this.currentSlide === 1) ? '0.3' : '1';
      }
      if (this.nextBtn) {
        this.nextBtn.disabled = (this.currentSlide === this.totalSlides);
        this.nextBtn.style.opacity = (this.currentSlide === this.totalSlides) ? '0.3' : '1';
      }

      if (this.slideLinks) {
        this.slideLinks.forEach(link => {
          const s = parseInt(link.getAttribute('data-slide-index'), 10);
          if (s === this.currentSlide) {
            link.classList.add('bg-red-700', 'text-yellow-300', 'font-bold');
          } else {
            link.classList.remove('bg-red-700', 'text-yellow-300', 'font-bold');
          }
        });
      }

      window.dispatchEvent(new CustomEvent('slideChanged', {
        detail: { slideIndex: this.currentSlide }
      }));
    }

    nextSlide() {
      if (this.currentSlide < this.totalSlides) {
        this.goToSlide(this.currentSlide + 1);
      }
    }

    prevSlide() {
      if (this.currentSlide > 1) {
        this.goToSlide(this.currentSlide - 1);
      }
    }

    toggleAudio() {
      const isPlaying = this.sound.toggleBGM();
      this.updateSoundIcon(isPlaying);
    }

    updateSoundIcon() {
      if (!this.audioBtn) return;
      const textDesc = this.audioBtn.querySelector('.audio-text-desc');
      if (this.sound.bgmPlaying) {
        this.audioBtn.classList.add('text-yellow-400', 'border-yellow-400');
        if (textDesc) textDesc.textContent = "Nhạc: Bật";
      } else {
        this.audioBtn.classList.remove('text-yellow-400', 'border-yellow-400');
        if (textDesc) textDesc.textContent = "Nhạc: Tắt";
      }
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    }

    openMenu() {
      if (!this.menuDrawer || !this.menuOverlay) return;
      this.menuDrawer.classList.remove('translate-x-full');
      this.menuOverlay.classList.remove('hidden');
      this.isMenuOpen = true;
    }

    closeMenu() {
      if (!this.menuDrawer || !this.menuOverlay) return;
      this.menuDrawer.classList.add('translate-x-full');
      this.menuOverlay.classList.add('hidden');
      this.isMenuOpen = false;
    }
  }

  // ========================================================
  // 4. GAME ENGINE (4 MINI-GAME TƯƠNG TÁC CÓ MEDIA 3D & CANVAS)
  // ========================================================
  class GameEngine {
    constructor(soundManager) {
      this.sound = soundManager;
      this.initGame1();
      this.initGame2();
      this.initGame3();
      this.initGame4();
    }

    // GAME 1: GIẢI MÃ PHÙ HIỆU VỚI ẢNH 3D NỔI KHỐI
    initGame1() {
      this.g1Container = document.getElementById('game1-cards-container');
      this.g1Modal = document.getElementById('game1-quiz-modal');
      this.g1QuestionText = document.getElementById('game1-question-text');
      this.g1OptionsContainer = document.getElementById('game1-options-container');
      this.g1Explanation = document.getElementById('game1-explanation');
      this.g1ScoreDisplay = document.getElementById('game1-score-display');
      this.g1RevealAllBtn = document.getElementById('game1-reveal-all-btn');
      this.g1CloseModalBtn = document.getElementById('game1-close-modal-btn');

      this.g1Score = 0;
      this.g1ActiveCardIndex = null;
      this.g1SolvedCards = new Set();

      if (!this.g1Container) return;
      this.renderGame1Cards();

      if (this.g1CloseModalBtn) {
        this.g1CloseModalBtn.addEventListener('click', () => {
          if (this.g1Modal) this.g1Modal.classList.add('hidden');
        });
      }

      if (this.g1RevealAllBtn) {
        this.g1RevealAllBtn.addEventListener('click', () => {
          const cards = document.querySelectorAll('.game1-flip-inner');
          cards.forEach(card => card.classList.add('card-is-flipped'));
          this.sound.playFanfare();
        });
      }
    }

    renderGame1Cards() {
      this.g1Container.innerHTML = '';
      CAND_DATA.game1.forEach((item, index) => {
        const cardEl = document.createElement('div');
        cardEl.className = 'perspective-1000 w-full h-full min-h-[500px] lg:min-h-[560px] cursor-pointer';
        cardEl.innerHTML = `
          <div class="game1-flip-inner transform-style-3d w-full h-full relative duration-500" data-index="${index}">
            <!-- MẶT TRƯỚC (BÍ ẨN) -->
            <div class="backface-hidden absolute inset-0 glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center border-2 border-yellow-500/40 hover:border-yellow-400 transition-all shadow-2xl bg-gradient-to-b from-slate-900 via-blue-950/60 to-slate-900">
              <div class="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-red-900/80 to-amber-900/80 border-4 border-yellow-400 flex flex-col items-center justify-center shadow-2xl my-auto animate-pulse">
                <span class="text-5xl md:text-6xl">⭐</span>
                <span class="text-[11px] font-black text-yellow-300 uppercase tracking-widest mt-1.5">CAND</span>
              </div>

              <div>
                <h4 class="text-lg md:text-xl font-black text-yellow-400 uppercase tracking-wider mb-1">Huy Hiệu Bí Ẩn #${index + 1}</h4>
                <p class="text-xs text-slate-200 leading-relaxed max-w-xs mx-auto">Click để lật mở danh tính & giải mã lực lượng nòng cốt</p>
              </div>

              <span class="mt-3 px-6 py-2.5 rounded-full bg-red-600/90 hover:bg-red-500 text-white text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg w-full">
                LẬT MỞ NGAY ➔
              </span>
            </div>

            <!-- MẶT SAU (KHUNG ẢNH PHÙ HIỆU 3D PHÓNG TO TOÀN DIỆN) -->
            <div class="backface-hidden rotate-y-180 absolute inset-0 glass-panel rounded-2xl p-5 flex flex-col items-center justify-between text-center border-2 border-yellow-400 shadow-2xl bg-gradient-to-b from-blue-950 via-slate-900 to-red-950">
              <div class="w-full">
                <h4 class="text-base md:text-lg font-black text-yellow-300 uppercase tracking-wide">${item.title}</h4>
                <p class="text-xs text-emerald-300 italic font-semibold truncate mt-0.5">"${item.tagline}"</p>
              </div>

              <!-- KHUNG ẢNH PHÙ HIỆU 3D PHÓNG TO TOÀN DIỆN -->
              <div class="media-slot image-slot w-full flex-1 my-3 flex items-center justify-center rounded-2xl bg-slate-950/80 border border-yellow-500/40 shadow-inner overflow-hidden relative min-h-[280px] lg:min-h-[320px]">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-contain p-3 filter drop-shadow-2xl hover:scale-105 transition-transform duration-300">
              </div>

              <button class="game1-quiz-trigger px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg w-full" data-index="${index}">
                Trả Lời Câu Hỏi (+100đ) ➔
              </button>
            </div>
          </div>
        `;

        cardEl.addEventListener('click', (e) => {
          const inner = cardEl.querySelector('.game1-flip-inner');
          if (!inner.classList.contains('card-is-flipped')) {
            inner.classList.add('card-is-flipped');
            this.sound.playCardFlip();
          }

          if (e.target.closest('.game1-quiz-trigger')) {
            e.stopPropagation();
            this.openGame1Modal(index);
          }
        });

        this.g1Container.appendChild(cardEl);
      });
    }

    openGame1Modal(index) {
      this.g1ActiveCardIndex = index;
      const data = CAND_DATA.game1[index];
      if (!this.g1Modal) return;

      this.g1QuestionText.textContent = data.question;
      this.g1Explanation.classList.add('hidden');
      this.g1OptionsContainer.innerHTML = '';

      data.options.forEach((opt, optIndex) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-3.5 rounded-xl border border-yellow-500/30 hover:border-yellow-400 bg-slate-800/80 hover:bg-slate-700 text-sm text-slate-100 transition-all font-medium flex items-center justify-between';
        btn.innerHTML = `<span>${opt}</span><span class="opt-status text-lg"></span>`;

        btn.addEventListener('click', () => {
          this.checkGame1Answer(optIndex, data.correctIndex, btn, data.explanation);
        });

        this.g1OptionsContainer.appendChild(btn);
      });

      this.g1Modal.classList.remove('hidden');
    }

    checkGame1Answer(selectedIndex, correctIndex, buttonEl, explanation) {
      const allButtons = this.g1OptionsContainer.querySelectorAll('button');
      allButtons.forEach(b => b.disabled = true);

      if (selectedIndex === correctIndex) {
        buttonEl.classList.remove('bg-slate-800/80', 'border-yellow-500/30');
        buttonEl.classList.add('bg-emerald-600/90', 'border-emerald-400', 'text-white');
        buttonEl.querySelector('.opt-status').textContent = '✅';
        this.sound.playCorrect();

        if (!this.g1SolvedCards.has(this.g1ActiveCardIndex)) {
          this.g1SolvedCards.add(this.g1ActiveCardIndex);
          this.g1Score += 100;
          if (this.g1ScoreDisplay) this.g1ScoreDisplay.textContent = this.g1Score;
        }
      } else {
        buttonEl.classList.remove('bg-slate-800/80', 'border-yellow-500/30');
        buttonEl.classList.add('bg-red-600/90', 'border-red-400', 'text-white');
        buttonEl.querySelector('.opt-status').textContent = '❌';
        allButtons[correctIndex].classList.add('bg-emerald-700/80', 'border-emerald-400');
        allButtons[correctIndex].querySelector('.opt-status').textContent = '✅';
        this.sound.playWrong();
      }

      if (this.g1Explanation) {
        this.g1Explanation.textContent = explanation;
        this.g1Explanation.classList.remove('hidden');
      }
    }

    // GAME 2
    initGame2() {
      this.g2Canvas = document.getElementById('game2-canvas');
      this.g2LeftCol = document.getElementById('game2-schools-col');
      this.g2RightCol = document.getElementById('game2-majors-col');
      this.g2ResetBtn = document.getElementById('game2-reset-btn');
      this.g2StatusMsg = document.getElementById('game2-status-msg');

      if (!this.g2Canvas || !this.g2LeftCol || !this.g2RightCol) return;

      this.g2Ctx = this.g2Canvas.getContext('2d');
      this.selectedLeft = null;
      this.selectedRight = null;
      this.matchedPairs = new Map();

      this.renderGame2Nodes();
      this.resizeGame2Canvas();

      window.addEventListener('resize', () => {
        this.resizeGame2Canvas();
        this.drawGame2Lines();
      });

      if (this.g2ResetBtn) {
        this.g2ResetBtn.addEventListener('click', () => this.resetGame2());
      }

      window.addEventListener('slideChanged', (e) => {
        if (e.detail.slideIndex === 6) {
          setTimeout(() => {
            this.resizeGame2Canvas();
            this.drawGame2Lines();
          }, 100);
        }
      });
    }

    resizeGame2Canvas() {
      if (!this.g2Canvas) return;
      const container = this.g2Canvas.parentElement;
      this.g2Canvas.width = container.clientWidth;
      this.g2Canvas.height = container.clientHeight;
    }

    renderGame2Nodes() {
      this.g2LeftCol.innerHTML = '';
      this.g2RightCol.innerHTML = '';

      CAND_DATA.game2.schools.forEach(school => {
        const el = document.createElement('div');
        el.className = 'connecting-node my-1.5 p-4 md:p-4.5 min-h-[64px] rounded-2xl border-2 border-slate-700 bg-slate-800/95 text-xs md:text-sm font-bold text-yellow-300 shadow-xl cursor-pointer flex items-center justify-between select-none hover:border-yellow-400 transition-all';
        el.setAttribute('data-id', school.id);
        el.setAttribute('data-target', school.matchId);
        el.innerHTML = `<span>${school.name}</span><span class="w-4 h-4 rounded-full bg-yellow-400 ml-3 shadow-md shrink-0"></span>`;
        el.addEventListener('click', () => this.handleNodeClick('left', el));
        this.g2LeftCol.appendChild(el);
      });

      const shuffledMajors = [...CAND_DATA.game2.majors].sort(() => Math.random() - 0.5);
      shuffledMajors.forEach(major => {
        const el = document.createElement('div');
        el.className = 'connecting-node my-1.5 p-4 md:p-4.5 min-h-[64px] rounded-2xl border-2 border-slate-700 bg-slate-800/95 text-xs md:text-sm font-semibold text-slate-100 shadow-xl cursor-pointer flex items-center justify-between select-none hover:border-blue-400 transition-all';
        el.setAttribute('data-id', major.id);
        el.setAttribute('data-target', major.matchId);
        el.innerHTML = `<span class="w-4 h-4 rounded-full bg-blue-400 mr-3 shadow-md shrink-0"></span><span>${major.name}</span>`;
        el.addEventListener('click', () => this.handleNodeClick('right', el));
        this.g2RightCol.appendChild(el);
      });
    }

    handleNodeClick(side, nodeEl) {
      if (nodeEl.classList.contains('node-matched')) return;

      if (side === 'left') {
        if (this.selectedLeft) this.selectedLeft.classList.remove('node-selected');
        this.selectedLeft = nodeEl;
        this.selectedLeft.classList.add('node-selected');
        this.sound.playCardFlip();
      } else {
        if (this.selectedRight) this.selectedRight.classList.remove('node-selected');
        this.selectedRight = nodeEl;
        this.selectedRight.classList.add('node-selected');
        this.sound.playCardFlip();
      }

      if (this.selectedLeft && this.selectedRight) {
        const leftId = this.selectedLeft.getAttribute('data-id');
        const rightId = this.selectedRight.getAttribute('data-id');
        const expectedRight = this.selectedLeft.getAttribute('data-target');

        if (rightId === expectedRight) {
          this.matchedPairs.set(leftId, rightId);
          this.selectedLeft.classList.remove('node-selected');
          this.selectedRight.classList.remove('node-selected');
          this.selectedLeft.classList.add('node-matched');
          this.selectedRight.classList.add('node-matched');

          this.sound.playCorrect();
          this.drawGame2Lines();

          if (this.matchedPairs.size === CAND_DATA.game2.schools.length) {
            if (this.g2StatusMsg) {
              this.g2StatusMsg.innerHTML = '🎉 XUẤT SẮC! BẠN ĐÃ GHÉP CHÍNH XÁC 100% CÁC TRƯỜNG VÀ NGÀNH!';
              this.g2StatusMsg.className = 'text-emerald-400 font-bold text-base animate-pulse';
            }
            this.sound.playFanfare();
          }
        } else {
          this.sound.playWrong();
          const wrongLeft = this.selectedLeft;
          const wrongRight = this.selectedRight;
          wrongLeft.classList.add('border-red-500');
          wrongRight.classList.add('border-red-500');

          setTimeout(() => {
            wrongLeft.classList.remove('node-selected', 'border-red-500');
            wrongRight.classList.remove('node-selected', 'border-red-500');
          }, 500);
        }

        this.selectedLeft = null;
        this.selectedRight = null;
      }
    }

    drawGame2Lines() {
      if (!this.g2Ctx || !this.g2Canvas) return;
      this.g2Ctx.clearRect(0, 0, this.g2Canvas.width, this.g2Canvas.height);
      const canvasRect = this.g2Canvas.getBoundingClientRect();

      this.matchedPairs.forEach((majorId, schoolId) => {
        const leftEl = this.g2LeftCol.querySelector(`[data-id="${schoolId}"]`);
        const rightEl = this.g2RightCol.querySelector(`[data-id="${majorId}"]`);

        if (leftEl && rightEl) {
          const leftRect = leftEl.getBoundingClientRect();
          const rightRect = rightEl.getBoundingClientRect();

          const startX = leftRect.right - canvasRect.left;
          const startY = leftRect.top + leftRect.height / 2 - canvasRect.top;
          const endX = rightRect.left - canvasRect.left;
          const endY = rightRect.top + rightRect.height / 2 - canvasRect.top;

          this.g2Ctx.beginPath();
          this.g2Ctx.moveTo(startX, startY);
          const cp1x = startX + (endX - startX) / 2;
          const cp1y = startY;
          const cp2x = startX + (endX - startX) / 2;
          const cp2y = endY;
          this.g2Ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
          this.g2Ctx.strokeStyle = '#2EC4B6';
          this.g2Ctx.lineWidth = 4;
          this.g2Ctx.stroke();
        }
      });
    }

    resetGame2() {
      this.matchedPairs.clear();
      this.selectedLeft = null;
      this.selectedRight = null;
      if (this.g2StatusMsg) {
        this.g2StatusMsg.textContent = 'Hãy click 1 trường bên trái rồi click ngành tương ứng bên phải';
        this.g2StatusMsg.className = 'text-slate-300 text-sm italic';
      }
      this.renderGame2Nodes();
      this.drawGame2Lines();
    }

    // GAME 3: PHÒNG SƠ TUYỂN ẢO
    initGame3() {
      this.g3CandidatePhoto = document.getElementById('game3-candidate-photo');
      this.g3CandidateName = document.getElementById('game3-candidate-name');
      this.g3Dob = document.getElementById('game3-candidate-dob');
      this.g3Ethnicity = document.getElementById('game3-candidate-ethnicity');
      this.g3Edu = document.getElementById('game3-candidate-edu');
      this.g3Health = document.getElementById('game3-candidate-health');
      this.g3Politics = document.getElementById('game3-candidate-politics');
      this.g3Method = document.getElementById('game3-candidate-method');
      this.g3StampContainer = document.getElementById('game3-stamp-container');
      this.g3VerdictModal = document.getElementById('game3-verdict-modal');
      this.g3VerdictTitle = document.getElementById('game3-verdict-title');
      this.g3VerdictLaw = document.getElementById('game3-verdict-law');
      this.g3VerdictDesc = document.getElementById('game3-verdict-desc');
      this.g3NextDocBtn = document.getElementById('game3-next-doc-btn');
      this.g3DocCounter = document.getElementById('game3-doc-counter');

      this.g3ApproveBtn = document.getElementById('game3-btn-approve');
      this.g3RejectBtn = document.getElementById('game3-btn-reject');

      this.g3Index = 0;
      if (!this.g3CandidateName) return;

      this.loadGame3Doc(0);

      if (this.g3ApproveBtn) {
        this.g3ApproveBtn.addEventListener('click', () => this.handleGame3Stamp('APPROVE'));
      }
      if (this.g3RejectBtn) {
        this.g3RejectBtn.addEventListener('click', () => this.handleGame3Stamp('REJECT'));
      }
      if (this.g3NextDocBtn) {
        this.g3NextDocBtn.addEventListener('click', () => {
          if (this.g3VerdictModal) this.g3VerdictModal.classList.add('hidden');
          this.g3Index = (this.g3Index + 1) % CAND_DATA.game3.length;
          this.loadGame3Doc(this.g3Index);
        });
      }
    }

    loadGame3Doc(idx) {
      const doc = CAND_DATA.game3[idx];
      if (!doc) return;

      if (this.g3DocCounter) this.g3DocCounter.textContent = `HỒ SƠ ${idx + 1} / ${CAND_DATA.game3.length}`;
      if (this.g3CandidatePhoto) this.g3CandidatePhoto.textContent = doc.photo;
      if (this.g3CandidateName) this.g3CandidateName.textContent = doc.candidateName;
      if (this.g3Dob) this.g3Dob.textContent = doc.info.dob;
      if (this.g3Ethnicity) this.g3Ethnicity.textContent = doc.info.ethnicity;
      if (this.g3Edu) this.g3Edu.textContent = doc.info.education;
      if (this.g3Health) this.g3Health.textContent = doc.info.health;
      if (this.g3Politics) this.g3Politics.textContent = doc.info.politics;
      if (this.g3Method) this.g3Method.textContent = doc.info.methodApply;

      if (this.g3StampContainer) this.g3StampContainer.innerHTML = '';
    }

    handleGame3Stamp(action) {
      const doc = CAND_DATA.game3[this.g3Index];
      if (!doc) return;

      this.sound.playStamp();

      if (this.g3StampContainer) {
        const isApproved = (action === 'APPROVE');
        this.g3StampContainer.innerHTML = `
          <div class="stamp-box ${isApproved ? 'stamp-approved' : ''} animate-stamp text-2xl">
            ${isApproved ? 'ĐÃ DUYỆT - ĐỦ ĐIỀU KIỆN' : 'TỪ CHỐI - KHÔNG ĐỦ TIÊU CHUẨN'}
          </div>
        `;
      }

      setTimeout(() => {
        const isCorrect = (action === doc.correctAction);
        if (isCorrect) {
          this.sound.playCorrect();
        } else {
          this.sound.playWrong();
        }

        if (this.g3VerdictTitle) {
          this.g3VerdictTitle.textContent = isCorrect ? '✅ QUYẾT ĐỊNH CHÍNH XÁC!' : '⚠️ QUYẾT ĐỊNH CHƯA ĐÚNG QUY CHẾ!';
          this.g3VerdictTitle.className = isCorrect ? 'text-2xl font-bold text-emerald-400' : 'text-2xl font-bold text-red-400';
        }
        if (this.g3VerdictLaw) this.g3VerdictLaw.textContent = doc.lawCitation;
        if (this.g3VerdictDesc) this.g3VerdictDesc.textContent = doc.explanation;

        if (this.g3VerdictModal) this.g3VerdictModal.classList.remove('hidden');
      }, 400);
    }

    // GAME 4: GRAND QUIZ ARENA
    initGame4() {
      this.g4QuestionNumber = document.getElementById('game4-question-number');
      this.g4TimerBar = document.getElementById('game4-timer-bar');
      this.g4TimerSeconds = document.getElementById('game4-timer-seconds');
      this.g4ScoreDisplay = document.getElementById('game4-score-display');
      this.g4QuestionText = document.getElementById('game4-question-text');
      this.g4OptionsContainer = document.getElementById('game4-options-container');
      this.g4ResultModal = document.getElementById('game4-result-modal');
      this.g4FinalScore = document.getElementById('game4-final-score');
      this.g4RankTitle = document.getElementById('game4-rank-title');
      this.g4RestartBtn = document.getElementById('game4-restart-btn');
      this.confettiCanvas = document.getElementById('confetti-canvas');

      this.g4Index = 0;
      this.g4Score = 0;
      this.g4TimeRemaining = 15;
      this.g4Timer = null;

      if (!this.g4QuestionText) return;

      // Khởi tạo giao diện câu hỏi ban đầu nhưng KHÔNG bật đồng hồ đếm ngược ngầm
      this.loadGame4Question(0, false);

      if (this.g4RestartBtn) {
        this.g4RestartBtn.addEventListener('click', () => {
          if (this.g4ResultModal) this.g4ResultModal.classList.add('hidden');
          this.g4Index = 0;
          this.g4Score = 0;
          if (this.g4ScoreDisplay) this.g4ScoreDisplay.textContent = '0';
          this.loadGame4Question(0, true);
        });
      }

      window.addEventListener('slideChanged', (e) => {
        if (e.detail.slideIndex === 12) {
          // Bắt đầu hoặc tiếp tục tính giờ khi vào Slide 12
          const q = CAND_DATA.game4[this.g4Index];
          if (q && !this.g4Timer && this.g4TimeRemaining > 0) {
            this.startQuestionTimer(q);
          }
        } else {
          // Khi rời khỏi Slide 12: DỪNG NGAY đồng hồ và âm thanh chạy ngầm
          if (this.g4Timer) {
            clearInterval(this.g4Timer);
            this.g4Timer = null;
          }
        }
      });
    }

    startQuestionTimer(q) {
      if (this.g4Timer) clearInterval(this.g4Timer);
      this.g4Timer = setInterval(() => {
        // Bảo vệ: Nếu người dùng không ở Slide 12 thì hủy ngay lập tức
        if (window.presentationEngine && window.presentationEngine.currentSlide !== 12) {
          clearInterval(this.g4Timer);
          this.g4Timer = null;
          return;
        }

        this.g4TimeRemaining--;
        this.updateGame4TimerUI();

        if (this.g4TimeRemaining <= 3 && this.g4TimeRemaining > 0) {
          this.sound.playTick();
        }

        if (this.g4TimeRemaining <= 0) {
          clearInterval(this.g4Timer);
          this.g4Timer = null;
          this.sound.playWrong();
          this.highlightGame4Timeout(q.correctIndex);
        }
      }, 1000);
    }

    loadGame4Question(idx, startTimer = true) {
      if (this.g4Timer) {
        clearInterval(this.g4Timer);
        this.g4Timer = null;
      }

      if (idx >= CAND_DATA.game4.length) {
        this.finishGame4();
        return;
      }

      this.g4Index = idx;
      const q = CAND_DATA.game4[idx];

      if (this.g4QuestionNumber) this.g4QuestionNumber.textContent = `CÂU HỎI ${idx + 1} / ${CAND_DATA.game4.length}`;
      if (this.g4QuestionText) this.g4QuestionText.textContent = q.question;

      this.g4TimeRemaining = 15;
      this.updateGame4TimerUI();

      if (this.g4OptionsContainer) {
        this.g4OptionsContainer.innerHTML = '';
        q.options.forEach((opt, optIndex) => {
          const btn = document.createElement('button');
          btn.className = 'w-full text-left p-4 rounded-xl border border-yellow-500/30 hover:border-yellow-400 bg-slate-800/90 hover:bg-slate-700 text-sm font-semibold text-slate-100 transition-all flex items-center justify-between shadow-md';
          btn.innerHTML = `<span>${opt}</span><span class="g4-status text-lg"></span>`;
          btn.addEventListener('click', () => this.handleGame4Answer(optIndex, q.correctIndex, btn));
          this.g4OptionsContainer.appendChild(btn);
        });
      }

      // Chỉ kích hoạt đồng hồ đếm ngược nếu người dùng đang ở trên Slide 12
      const isSlide12 = (window.presentationEngine && window.presentationEngine.currentSlide === 12);
      if (startTimer && isSlide12) {
        this.startQuestionTimer(q);
      }
    }

    updateGame4TimerUI() {
      if (this.g4TimerSeconds) this.g4TimerSeconds.textContent = `${this.g4TimeRemaining}s`;
      if (this.g4TimerBar) {
        const pct = (this.g4TimeRemaining / 15) * 100;
        this.g4TimerBar.style.width = `${pct}%`;
        if (this.g4TimeRemaining <= 4) {
          this.g4TimerBar.style.backgroundColor = '#E63946';
        } else {
          this.g4TimerBar.style.backgroundColor = '#2EC4B6';
        }
      }
    }

    handleGame4Answer(selectedIndex, correctIndex, buttonEl) {
      if (this.g4Timer) clearInterval(this.g4Timer);

      const allButtons = this.g4OptionsContainer.querySelectorAll('button');
      allButtons.forEach(b => b.disabled = true);

      if (selectedIndex === correctIndex) {
        buttonEl.classList.remove('bg-slate-800/90', 'border-yellow-500/30');
        buttonEl.classList.add('bg-emerald-600', 'border-emerald-400', 'text-white');
        buttonEl.querySelector('.g4-status').textContent = '✅';
        this.sound.playCorrect();

        const points = 1000 + (this.g4TimeRemaining * 60);
        this.g4Score += points;
        if (this.g4ScoreDisplay) this.g4ScoreDisplay.textContent = this.g4Score;
      } else {
        buttonEl.classList.remove('bg-slate-800/90', 'border-yellow-500/30');
        buttonEl.classList.add('bg-red-600', 'border-red-400', 'text-white');
        buttonEl.querySelector('.g4-status').textContent = '❌';

        allButtons[correctIndex].classList.add('bg-emerald-700', 'border-emerald-400');
        allButtons[correctIndex].querySelector('.g4-status').textContent = '✅';
        this.sound.playWrong();
      }

      setTimeout(() => {
        this.loadGame4Question(this.g4Index + 1);
      }, 1600);
    }

    highlightGame4Timeout(correctIndex) {
      const allButtons = this.g4OptionsContainer.querySelectorAll('button');
      allButtons.forEach(b => b.disabled = true);
      allButtons[correctIndex].classList.add('bg-emerald-700', 'border-emerald-400');
      allButtons[correctIndex].querySelector('.g4-status').textContent = '✅';

      setTimeout(() => {
        this.loadGame4Question(this.g4Index + 1);
      }, 1600);
    }

    finishGame4() {
      if (this.g4FinalScore) this.g4FinalScore.textContent = `${this.g4Score} ĐIỂM`;

      let rank = 'CHIẾN SĨ TRI THỨC';
      if (this.g4Score >= 6000) {
        rank = 'CHIẾN SĨ TRI THỨC XUẤT SẮC ⭐⭐⭐';
      } else if (this.g4Score >= 4000) {
        rank = 'CHIẾN SĨ TIÊN TIẾN ⭐⭐';
      }

      if (this.g4RankTitle) this.g4RankTitle.textContent = rank;
      if (this.g4ResultModal) this.g4ResultModal.classList.remove('hidden');

      this.sound.playFanfare();
      this.launchConfetti();
    }

    launchConfetti() {
      if (!this.confettiCanvas) return;
      const ctx = this.confettiCanvas.getContext('2d');
      this.confettiCanvas.width = this.confettiCanvas.parentElement.clientWidth;
      this.confettiCanvas.height = this.confettiCanvas.parentElement.clientHeight;

      const particles = [];
      const colors = ['#FFE259', '#D4AF37', '#E63946', '#2EC4B6', '#FFFFFF', '#FF6B6B'];

      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * this.confettiCanvas.width,
          y: Math.random() * -this.confettiCanvas.height,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          velX: (Math.random() - 0.5) * 4,
          velY: Math.random() * 4 + 2,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8
        });
      }

      let frame = 0;
      const animate = () => {
        if (frame > 200) {
          ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
          return;
        }
        ctx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        particles.forEach(p => {
          p.x += p.velX;
          p.y += p.velY;
          p.rot += p.rotSpeed;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        });

        frame++;
        requestAnimationFrame(animate);
      };

      animate();
    }
  }

  // ========================================================
  // 5. CÁC TƯƠNG TÁC PHỤ (SLIDE 4 TABS, SLIDE 7 SLIDER)
  // ========================================================
  function initSlide4Tabs(sound) {
    const tabBtns = document.querySelectorAll('.academy-tab-btn');
    const nameEl = document.getElementById('academy-detail-name');
    const locEl = document.getElementById('academy-detail-loc');
    const badgeEl = document.getElementById('academy-detail-badge');
    const descEl = document.getElementById('academy-detail-desc');
    const majorsListEl = document.getElementById('academy-majors-list');

    const imageEl = document.getElementById('academy-detail-image');
    const videoEl = document.getElementById('academy-detail-video');

    const academyMediaMap = {
      'T01': { img: 'assets/images/slide4_cyber.jpg', video: 'assets/videos/slide4_cyber.mp4' },
      'T02': { img: 'assets/images/slide4_csnd.jpg', video: 'assets/videos/slide4_police.mp4' },
      'T03': { img: 'assets/images/slide7_politics.jpg', video: 'assets/videos/slide4_politics.mp4' },
      'B06': { img: 'assets/images/slide9_ielts.jpg', video: 'assets/videos/slide4_intl.mp4' },
      'T08': { img: 'assets/images/slide4_cyber.jpg', video: 'assets/videos/slide4_tech.mp4' }
    };

    function renderAcademy(acad) {
      if (!acad) return;
      if (nameEl) nameEl.textContent = `${acad.name} (${acad.id})`;
      if (locEl) locEl.textContent = `Địa bàn: ${acad.scope}`;
      if (badgeEl) {
        badgeEl.innerHTML = `<img src="${acad.badge}" alt="${acad.name}" class="w-12 h-12 filter drop-shadow">`;
      }
      if (descEl) descEl.textContent = acad.description;

      const media = academyMediaMap[acad.id] || academyMediaMap['T01'];
      if (imageEl) {
        imageEl.src = media.img;
        imageEl.alt = acad.name;
      }
      if (videoEl) {
        videoEl.poster = media.img;
        const sourceEl = videoEl.querySelector('source');
        if (sourceEl) sourceEl.src = media.video;
        videoEl.load();
      }

      if (majorsListEl) {
        majorsListEl.innerHTML = '';
        acad.majors.forEach(m => {
          const item = document.createElement('div');
          item.className = 'p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start justify-between text-xs md:text-sm shadow-sm';
          item.innerHTML = `
            <div>
              <strong class="text-yellow-300 block text-xs md:text-sm font-bold">${m.name}</strong>
              <span class="text-slate-300 text-[11px] md:text-xs leading-tight">${m.desc}</span>
            </div>
            <span class="px-2.5 py-1 rounded bg-slate-700 text-slate-200 font-mono text-[10px] md:text-xs ml-3 whitespace-nowrap font-bold">${m.code}</span>
          `;
          majorsListEl.appendChild(item);
        });
      }
    }

    renderAcademy(CAND_DATA.schools.academies[0]);

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active', 'border-yellow-500', 'bg-red-950/80');
          b.classList.add('border-slate-700', 'bg-slate-900/80');
        });
        btn.classList.add('active', 'border-yellow-500', 'bg-red-950/80');
        btn.classList.remove('border-slate-700', 'bg-slate-900/80');

        const id = btn.getAttribute('data-id');
        const acad = CAND_DATA.schools.academies.find(a => a.id === id);
        renderAcademy(acad);
        if (sound) sound.playCardFlip();
      });
    });
  }

  function initSlide7AgeSlider() {
    const slider = document.getElementById('age-slider');
    const valDisplay = document.getElementById('age-slider-value');
    const ethSelect = document.getElementById('ethnicity-select');
    const tag = document.getElementById('age-verdict-tag');

    function updateVerdict() {
      if (!slider || !valDisplay || !tag || !ethSelect) return;
      const age = parseInt(slider.value, 10);
      valDisplay.textContent = `${age} Tuổi`;
      const isMinority = (ethSelect.value === 'minority');
      const maxAge = isMinority ? 25 : 22;

      if (age <= maxAge) {
        tag.className = 'px-4 py-2 rounded-lg bg-emerald-900/80 border border-emerald-400 text-emerald-300 text-xs font-bold whitespace-nowrap';
        tag.textContent = `ĐỦ TIÊU CHUẨN ĐỘ TUỔI (≤ ${maxAge})`;
      } else {
        tag.className = 'px-4 py-2 rounded-lg bg-red-900/80 border border-red-400 text-red-300 text-xs font-bold whitespace-nowrap animate-pulse';
        tag.textContent = `QUÁ TUỔI QUY ĐỊNH (Tối đa ${maxAge} tuổi)`;
      }
    }

    if (slider) slider.addEventListener('input', updateVerdict);
    if (ethSelect) ethSelect.addEventListener('change', updateVerdict);
    updateVerdict();
  }

  // ========================================================
  // 6. KHỞI CHẠY TỰ ĐỘNG
  // ========================================================
  function startApp() {
    const sound = new AudioControllerPro();
    const presentationEngine = new PresentationEngine(sound);
    const gameEngine = new GameEngine(sound);

    initSlide4Tabs(sound);
    initSlide7AgeSlider();

    window.soundManager = sound;
    window.presentationEngine = presentationEngine;
    window.gameEngine = gameEngine;
    window.CAND_DATA = CAND_DATA;

    console.log("✅ CAND Web Presentation với Media AI & Audio Pro đã sẵn sàng!");
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }

})();
