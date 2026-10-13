/**
 * DATA REPOSITORY - CÔNG TÁC TUYỂN SINH VÀ ĐÀO TẠO TRONG CÁC TRƯỜNG CÔNG AN NHÂN DÂN
 * Dữ liệu chuẩn hóa dựa trên tài liệu Giáo dục Quốc phòng & An ninh và Quy chế tuyển sinh CAND
 */

// 1. DANH MỤC 11 NHÀ TRƯỜNG CÔNG AN NHÂN DÂN (3 CẤP BẬC)
export const CAND_SCHOOLS = {
  academies: [
    {
      id: "T01",
      name: "Học viện An ninh nhân dân",
      shortName: "HV ANND (T01)",
      location: "Hà Nội (Phía Bắc)",
      badge: "🛡️",
      scope: "Tuyển sinh từ Quảng Bình trở ra phía Bắc (riêng ngành An toàn thông tin tuyển toàn quốc)",
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
      badge: "⚖️",
      scope: "Tuyển sinh từ Quảng Bình trở ra phía Bắc",
      description: "Trung tâm đào tạo sĩ quan cảnh sát lớn nhất cả nước, chuyên trách giữ gìn trật tự an toàn xã hội.",
      majors: [
        { code: "7860101", name: "Nghiệp vụ cảnh sát", desc: "Trinh sát hình sự, điều tra tội phạm, quản lý hành chính về TTXH." },
        { code: "7860102", name: "Cảnh sát giao thông", desc: "Chuyên môn chỉ huy, điều hành giao thông và tuần tra kiểm soát." },
        { code: "7860103", name: "Kỹ thuật hình sự", desc: "Giám định dấu vết, hiện trường, pháp y kỹ thuật." }
      ]
    },
    {
      id: "T03",
      name: "Học viện Chính trị CAND",
      shortName: "HV Chính trị CAND (T03)",
      location: "Hà Nội",
      badge: "⭐",
      scope: "Tuyển sinh toàn quốc",
      description: "Trung tâm đào tạo lý luận chính trị, đường lối chính sách và công tác tư tưởng trong lực lượng CAND.",
      majors: [
        { code: "7310202", name: "Xây dựng Đảng và chính quyền Nhà nước", desc: "Đào tạo cán bộ tham mưu chính trị, công tác Đảng, công tác tư tưởng trong CAND." }
      ]
    },
    {
      id: "B06",
      name: "Học viện Quốc tế",
      shortName: "Học viện Quốc tế (B06)",
      location: "Hà Nội",
      badge: "🌐",
      scope: "Tuyển sinh toàn quốc",
      description: "Cơ sở đào tạo chuyên sâu về ngoại ngữ và hợp tác quốc tế trong lĩnh vực an ninh trật tự.",
      majors: [
        { code: "7220201", name: "Ngôn ngữ Anh", desc: "Phục vụ công tác an ninh đối ngoại và hợp tác quốc tế." },
        { code: "7220204", name: "Ngôn ngữ Trung Quốc", desc: "Đáp ứng nhiệm vụ an ninh biên giới và quan hệ song phương." }
      ]
    },
    {
      id: "T08",
      name: "Học viện Kỹ thuật và Công nghệ an ninh",
      shortName: "HV KT&CN An ninh (T08)",
      location: "Hà Nội",
      badge: "🔬",
      scope: "Tuyển sinh toàn quốc",
      description: "Đào tạo chuyên gia kỹ thuật nghiệp vụ, cơ yếu, viễn thông và y khoa phục vụ CAND.",
      majors: [
        { code: "7860104", name: "Kỹ thuật CAND & Trinh sát kỹ thuật", desc: "Trinh sát kỹ thuật nghiệp vụ, phương tiện tác chiến điện tử." },
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
      location: "TP. Hồ Chí Minh (Phía Nam)",
      badge: "🏛️",
      scope: "Tuyển sinh từ Quảng Trị (hoặc Đà Nẵng) trở vào phía Nam",
      description: "Cơ sở trọng điểm đào tạo cán bộ an ninh cho các tỉnh, thành phố phía Nam.",
      majors: [
        { code: "7860100", name: "Nghiệp vụ an ninh", desc: "Đào tạo trinh sát an ninh nội địa, an ninh kinh tế, an ninh đối ngoại phía Nam." }
      ]
    },
    {
      id: "T05",
      name: "Trường Đại học Cảnh sát nhân dân",
      shortName: "ĐH CSND (T05)",
      location: "TP. Hồ Chí Minh (Phía Nam)",
      badge: "🚓",
      scope: "Tuyển sinh từ Quảng Trị (hoặc Đà Nẵng) trở vào phía Nam",
      description: "Đào tạo sĩ quan cảnh sát chỉ huy, điều tra tội phạm cho địa bàn các tỉnh phía Nam.",
      majors: [
        { code: "7860101", name: "Nghiệp vụ cảnh sát", desc: "Trinh sát hình sự, cảnh sát kinh tế, cảnh sát điều tra tội phạm ma túy." }
      ]
    },
    {
      id: "T06",
      name: "Trường Đại học Phòng cháy chữa cháy",
      shortName: "ĐH PCCC (T06)",
      location: "Hà Nội & Cơ sở phía Nam",
      badge: "🚒",
      scope: "Tuyển sinh trên phạm vi TOÀN QUỐC (Cơ sở phía Bắc và Cơ sở phía Nam)",
      description: "Cơ sở duy nhất của Việt Nam đào tạo kỹ sư Phòng cháy, chữa cháy và Cứu nạn, cứu hộ.",
      majors: [
        { code: "7860113", name: "Phòng cháy chữa cháy & Cứu nạn cứu hộ", desc: "Chỉ huy chữa cháy, thẩm duyệt PCCC, kỹ thuật cứu hộ cứu nạn." }
      ]
    }
  ],
  colleges: [
    {
      id: "T07",
      name: "Trường Cao đẳng An ninh nhân dân I",
      shortName: "CĐ ANND I (T07)",
      location: "Hà Nội & Đồng Nai",
      badge: "🎖️",
      scope: "Tuyển sinh toàn quốc (theo chỉ tiêu phân bổ)",
      description: "Đào tạo cán bộ an ninh thực hành, nhân viên nghiệp vụ an ninh cơ sở."
    },
    {
      id: "T09",
      name: "Trường Cao đẳng Cảnh sát nhân dân I",
      shortName: "CĐ CSND I (T09)",
      location: "Hà Nội",
      badge: "👮",
      scope: "Tuyển sinh các tỉnh phía Bắc",
      description: "Đào tạo hạ sĩ quan, nhân viên nghiệp vụ cảnh sát thực hành khu vực phía Bắc."
    },
    {
      id: "T10",
      name: "Trường Cao đẳng Cảnh sát nhân dân II",
      shortName: "CĐ CSND II (T10)",
      location: "TP. Hồ Chí Minh",
      badge: "👮‍♂️",
      scope: "Tuyển sinh các tỉnh phía Nam",
      description: "Đào tạo hạ sĩ quan, nhân viên nghiệp vụ cảnh sát thực hành khu vực phía Nam."
    }
  ]
};

// 2. BỐN TRỤ CỘT TIÊU CHUẨN XÉT TUYỂN BẮT BUỘC
export const ADMISSION_STANDARDS = [
  {
    icon: "📜",
    title: "Chính Trị & Đạo Đức",
    highlight: "Tuyệt đối trung thành",
    details: "Bản thân và gia đình chấp hành tốt đường lối của Đảng, pháp luật của Nhà nước; có phẩm chất đạo đức tốt; đạt tiêu chuẩn chính trị theo quy định của Bộ Công an.",
    bulletPoints: [
      "Lý lịch gia đình 3 đời trong sạch, rõ ràng",
      "Bản thân không vi phạm pháp luật, hạnh kiểm Khá trở lên",
      "Đủ điều kiện kết nạp vào Đảng Cộng sản Việt Nam"
    ]
  },
  {
    icon: "🎓",
    title: "Trình Độ Văn Hóa",
    highlight: "Tốt nghiệp THPT",
    details: "Đã tốt nghiệp THPT hoặc tương đương; trong những năm học THPT đạt học lực từ Trung bình trở lên (từng năm đạt loại Khá đối với học sinh phổ thông theo quy định cụ thể từng năm).",
    bulletPoints: [
      "Tốt nghiệp THPT đúng quy chế Bộ GD&ĐT",
      "Điểm từng môn trong tổ hợp xét tuyển đạt chuẩn quy chế",
      "Chiến sĩ nghĩa vụ có chứng nhận hoàn thành THPT"
    ]
  },
  {
    icon: "🎂",
    title: "Độ Tuổi Dự Tuyển",
    highlight: "≤ 22 tuổi (≤ 25 tuổi DTTS)",
    details: "Quy định tính đến năm dự tuyển theo giấy khai sinh:",
    bulletPoints: [
      "Học sinh phổ thông & công dân thường trú: KHÔNG QUÁ 22 TUỔI",
      "Người dân tộc thiểu số: KHÔNG QUÁ 25 TUỔI",
      "Chiến sĩ nghĩa vụ CAND xuất ngũ: Không quá 30 tuổi"
    ]
  },
  {
    icon: "💪",
    title: "Tiêu Chuẩn Thể Lực",
    highlight: "Sức khỏe Loại 1 hoặc 2",
    details: "Đạt chuẩn khám tuyển của Bệnh viện / Bệnh xá Công an:",
    bulletPoints: [
      "Nam: Chiều cao từ 1m64 đến 1m95, cân nặng từ 50kg trở lên",
      "Nữ: Chiều cao từ 1m58 đến 1m80, cân nặng từ 45kg trở lên",
      "Thị lực: Không cận thị hoặc cận không quá 3 đi-ốp (có cam kết chữa mắt)",
      "Không mắc bệnh truyền nhiễm, không có hình xăm phản cảm"
    ]
  }
];

// 3. BA PHƯƠNG THỨC XÉT TUYỂN ĐẠI HỌC CHÍNH QUY
export const ADMISSION_METHODS = [
  {
    id: 1,
    name: "Phương Thức 1",
    title: "Tuyển Thẳng Theo Quy Chế",
    badge: "Ưu Tiên Đặc Biệt",
    desc: "Tuyển thẳng theo quy chế tuyển sinh hiện hành của Bộ Giáo dục & Đào tạo và quy định bổ sung của Bộ Công an.",
    target: "Thí sinh tham dự kỳ thi chọn đội tuyển quốc gia dự thi Olympic quốc tế, giải Nhất/Nhì/Ba học sinh giỏi Quốc gia các môn Toán, Lý, Hóa, Văn, Sử, Địa, Tin học, Tiếng Anh.",
    keyNote: "Miễn bài thi đánh giá của Bộ Công an"
  },
  {
    id: 2,
    name: "Phương Thức 2",
    title: "Chứng Chỉ Ngoại Ngữ + Bài Thi BCA",
    badge: "Kết Hợp Ngoại Ngữ",
    desc: "Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế với kết quả bài thi đánh giá của Bộ Công an.",
    target: "Thí sinh có chứng chỉ IELTS Academic từ 7.5 trở lên (hoặc TOEFL iBT từ 110, HSK cấp 5 trở lên...) kết hợp thi tuyển.",
    keyNote: "BẮT BUỘC THI BÀI THI ĐÁNH GIÁ CỦA BỘ CÔNG AN"
  },
  {
    id: 3,
    name: "Phương Thức 3",
    title: "Điểm Thi THPT + Bài Thi BCA",
    badge: "Phương Thức Đại Trà",
    desc: "Xét tuyển kết hợp kết quả thi tốt nghiệp THPT với kết quả bài thi đánh giá của Bộ Công an theo công thức tính điểm chuẩn hóa.",
    target: "Chiếm tỷ lệ chỉ tiêu lớn nhất (khoảng 70-80% chỉ tiêu) cho toàn bộ thí sinh đã qua vòng sơ tuyển tại địa phương.",
    keyNote: "BẮT BUỘC THI BÀI THI ĐÁNH GIÁ CỦA BỘ CÔNG AN (Tỷ trọng 60% tổng điểm)"
  }
];

// 4. DỮ LIỆU MINI-GAME 1: "GIẢI MÃ PHÙ HIỆU"
export const GAME1_DATA = [
  {
    id: "anninh",
    title: "Lực Lượng An Ninh Nhân Dân",
    symbol: "🛡️",
    badgeImg: "Huy hiệu Lá chắn An ninh & Ngôi sao vàng",
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
    symbol: "⚖️",
    badgeImg: "Huy hiệu Cành tùng & Cán cân Công lý",
    tagline: "Bảo đảm trật tự an toàn xã hội, đấu tranh phòng chống tội phạm",
    question: "Lực lượng nào trực tiếp đấu tranh phòng chống tội phạm hình sự, bảo đảm trật tự giao thông và trật tự công cộng hàng ngày?",
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
    symbol: "🚒",
    badgeImg: "Huy hiệu Ngọn lửa, Vòi phun & Phao cứu sinh",
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
];

// 5. DỮ LIỆU MINI-GAME 2: "GHÉP TRƯỜNG TRÚNG NGÀNH"
export const GAME2_DATA = {
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
};

// 6. DỮ LIỆU MINI-GAME 3: "PHÒNG SƠ TUYỂN ẢO" (3 HỒ SƠ THỰC TẾ)
export const GAME3_DATA = [
  {
    id: 1,
    candidateName: "Nguyễn Văn A",
    photo: "👨‍🎓",
    info: {
      dob: "2001 (23 tuổi)",
      ethnicity: "Dân tộc Kinh",
      education: "Tốt nghiệp THPT loại Giỏi (Điểm TB: 8.8)",
      health: "Sức khỏe Loại 1, Chiều cao 1m75, Nặng 68kg",
      politics: "Lý lịch trong sạch, Đã kết nạp Đoàn viên xuất sắc",
      methodApply: "Phương thức 3 (Đăng ký vào Học viện CSND)"
    },
    correctAction: "REJECT", // REJECT = TỪ CHỐI
    lawCitation: "Điều 15 Quy chế tuyển sinh CAND: Thí sinh phổ thông dân tộc Kinh không quá 22 tuổi tính đến năm dự tuyển.",
    verdictMessage: "KHÔNG ĐỦ ĐIỀU KIỆN (TỪ CHỐI HỒ SƠ)",
    explanation: "Thí sinh Nguyễn Văn A đã 23 tuổi. Theo quy chế hiện hành của Bộ Công an, học sinh phổ thông người dân tộc Kinh chỉ được tham gia xét tuyển khi KHÔNG QUÁ 22 TUỔI. Do đó cán bộ tuyển sinh phải từ chối tiếp nhận hồ sơ."
  },
  {
    id: 2,
    candidateName: "Lò Thị B",
    photo: "👩‍🎓",
    info: {
      dob: "2000 (24 tuổi)",
      ethnicity: "Dân tộc Thái (Thiểu số)",
      education: "Tốt nghiệp THPT loại Khá (Điểm TB: 7.6)",
      health: "Sức khỏe Loại 1, Chiều cao 1m62, Nặng 50kg",
      politics: "Bản thân và gia đình chấp hành tốt chính sách của Đảng",
      methodApply: "Phương thức 3 (Đăng ký vào Học viện ANND)"
    },
    correctAction: "APPROVE", // APPROVE = DUYỆT
    lawCitation: "Quy chế tuyển sinh CAND quy định: Người dân tộc thiểu số được đăng ký dự tuyển đến KHÔNG QUÁ 25 TUỔI.",
    verdictMessage: "ĐỦ ĐIỀU KIỆN (DUYỆT HỒ SƠ VÀO VÒNG TRONG)",
    explanation: "Chính xác! Thí sinh Lò Thị B là người dân tộc Thái (dân tộc thiểu số), 24 tuổi. Căn cứ quy chế của Bộ Công an, công dân người dân tộc thiểu số được nâng trần độ tuổi dự tuyển lên đến 25 tuổi, đáp ứng đầy đủ tiêu chuẩn!"
  },
  {
    id: 3,
    candidateName: "Trần C",
    photo: "🧑‍🎓",
    info: {
      dob: "2006 (18 tuổi)",
      ethnicity: "Dân tộc Kinh",
      education: "Tốt nghiệp THPT, có IELTS Academic 8.0",
      health: "Sức khỏe Loại 1, Chiều cao 1m78, Nặng 70kg",
      politics: "Đủ tiêu chuẩn chính trị",
      methodApply: "Đăng ký Phương thức 2 nhưng KHÔNG ĐĂNG KÝ thi Bài thi đánh giá của Bộ Công an"
    },
    correctAction: "REJECT", // REJECT = TỪ CHỐI
    lawCitation: "Phương thức 2 là 'Xét tuyển KẾT HỢP chứng chỉ ngoại ngữ quốc tế VỚI kết quả bài thi đánh giá của BCA'.",
    verdictMessage: "KHÔNG ĐỦ ĐIỀU KIỆN (TỪ CHỐI HỒ SƠ)",
    explanation: "Chính xác! Thí sinh Trần C dù đạt IELTS 8.0 rất cao, nhưng Phương thức 2 bắt buộc phải kết hợp cả chứng chỉ ngoại ngữ VỚI kết quả Bài thi đánh giá của Bộ Công an. Từ chối thi bài thi này đồng nghĩa với việc hồ sơ không hợp lệ."
  }
];

// 7. DỮ LIỆU MINI-GAME 4: "GRAND QUIZ ARENA" (5 CÂU HỎI NHANH 15 GIÂY)
export const GAME4_DATA = [
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
    explanation: "Theo quy chế của Bộ Công an, thí sinh dân tộc thiểu số được dự tuyển đến không quá 25 tuổi (thí sinh phổ thông dân tộc Kinh không quá 22 tuổi)."
  },
  {
    id: 3,
    question: "Học sinh THPT có nguyện vọng dự tuyển vào các trường CAND phải nộp hồ sơ đăng ký sơ tuyển ở đâu đầu tiên?",
    options: [
      "A. Trực tiếp tại cổng trường đại học CAND muốn thi",
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
    explanation: "Cả PT2 và PT3 đều bắt buộc thí sinh phải tham gia Bài thi đánh giá của Bộ Công an để lấy điểm tính vào điểm chuẩn."
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
    explanation: "100% học viên tốt nghiệp các trường CAND được phong cấp bậc hàm sĩ quan và được Bộ Công an phân công công tác theo đúng chuyên ngành đào tạo!"
  }
];
