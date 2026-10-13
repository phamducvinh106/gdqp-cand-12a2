/**
 * GAMES.JS - ĐỘNG CƠ XỬ LÝ 4 MINI-GAME TƯƠNG TÁC
 * 1. Giải Mã Phù Hiệu (3D Card Flip & Quiz)
 * 2. Ghép Trường Trúng Ngành (Canvas Line Matching)
 * 3. Phòng Sơ Tuyển Ảo (Desk Stamp Approval & Law Analysis)
 * 4. Grand Quiz Arena (15s Countdown, Live Scoring, Confetti Fireworks)
 */

import { GAME1_DATA, GAME2_DATA, GAME3_DATA, GAME4_DATA } from './data.js';

export class GameEngine {
  constructor(soundManager) {
    this.sound = soundManager;
    this.initGame1();
    this.initGame2();
    this.initGame3();
    this.initGame4();
  }

  // ========================================================
  // MINI-GAME 1: GIẢI MÃ PHÙ HIỆU (3D FLIP CARD & IDENTIFIER)
  // ========================================================
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

    // Render 3 thẻ phù hiệu
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
    GAME1_DATA.forEach((item, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'perspective-1000 w-full h-80 cursor-pointer';
      cardEl.innerHTML = `
        <div class="game1-flip-inner transform-style-3d w-full h-full relative duration-500" data-index="${index}">
          <!-- MẶT TRƯỚC (BÍ ẨN) -->
          <div class="backface-hidden absolute inset-0 glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 border-yellow-500/30 hover:border-yellow-400 transition-all shadow-xl bg-gradient-to-b from-slate-900 to-blue-950">
            <div class="w-20 h-20 rounded-full bg-red-900/60 border-2 border-yellow-400 flex items-center justify-center text-4xl mb-4 shadow-lg animate-pulse">
              ⭐
            </div>
            <h4 class="text-xl font-bold text-yellow-400 uppercase tracking-wider mb-2">Huy Hiệu Bí Ẩn #${index + 1}</h4>
            <p class="text-xs text-slate-300">Click để lật mở danh tính & giải mã lực lượng nòng cốt</p>
            <span class="mt-4 px-4 py-1.5 rounded-full bg-red-600/80 text-white text-xs font-semibold uppercase tracking-wider">
              LẬT MỞ NGAY
            </span>
          </div>

          <!-- MẶT SAU (LẬT MỞ HUY HIỆU) -->
          <div class="backface-hidden rotate-y-180 absolute inset-0 glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center border-2 border-yellow-400 shadow-2xl bg-gradient-to-b from-blue-950 via-slate-900 to-red-950">
            <div class="text-5xl mt-2 filter drop-shadow-md">${item.symbol}</div>
            <div>
              <h4 class="text-lg font-black text-yellow-300 uppercase tracking-wide">${item.title}</h4>
              <p class="text-xs text-emerald-400 italic mt-1 font-medium">"${item.tagline}"</p>
            </div>
            <button class="game1-quiz-trigger px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md w-full" data-index="${index}">
              Trả Lời Câu Hỏi (+100đ)
            </button>
          </div>
        </div>
      `;

      // Event click lật thẻ
      cardEl.addEventListener('click', (e) => {
        const inner = cardEl.querySelector('.game1-flip-inner');
        if (!inner.classList.contains('card-is-flipped')) {
          inner.classList.add('card-is-flipped');
          this.sound.playCardFlip();
        }

        // Nếu click vào nút trả lời
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
    const data = GAME1_DATA[index];
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
      // Hiện đáp án đúng
      allButtons[correctIndex].classList.add('bg-emerald-700/80', 'border-emerald-400');
      allButtons[correctIndex].querySelector('.opt-status').textContent = '✅';
      this.sound.playWrong();
    }

    if (this.g1Explanation) {
      this.g1Explanation.textContent = explanation;
      this.g1Explanation.classList.remove('hidden');
    }
  }

  // ========================================================
  // MINI-GAME 2: GHÉP TRƯỜNG TRÚNG NGÀNH (CANVAS LINE MATCHING)
  // ========================================================
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
    this.matchedPairs = new Map(); // schoolId -> majorId

    this.renderGame2Nodes();
    this.resizeGame2Canvas();

    window.addEventListener('resize', () => {
      this.resizeGame2Canvas();
      this.drawGame2Lines();
    });

    if (this.g2ResetBtn) {
      this.g2ResetBtn.addEventListener('click', () => this.resetGame2());
    }

    // Lắng nghe khi chuyển đến Slide 6 để auto resize
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

    // Cột trường (Trái)
    GAME2_DATA.schools.forEach(school => {
      const el = document.createElement('div');
      el.className = 'connecting-node p-4 rounded-xl border-2 border-slate-700 bg-slate-800/90 text-sm font-bold text-yellow-300 shadow-lg cursor-pointer flex items-center justify-between select-none';
      el.setAttribute('data-id', school.id);
      el.setAttribute('data-target', school.matchId);
      el.innerHTML = `<span>${school.name}</span><span class="w-3.5 h-3.5 rounded-full bg-yellow-400 ml-2 shadow"></span>`;

      el.addEventListener('click', () => this.handleNodeClick('left', el));
      this.g2LeftCol.appendChild(el);
    });

    // Cột ngành (Phải - xáo trộn ngẫu nhiên)
    const shuffledMajors = [...GAME2_DATA.majors].sort(() => Math.random() - 0.5);
    shuffledMajors.forEach(major => {
      const el = document.createElement('div');
      el.className = 'connecting-node p-4 rounded-xl border-2 border-slate-700 bg-slate-800/90 text-sm font-semibold text-slate-100 shadow-lg cursor-pointer flex items-center justify-between select-none';
      el.setAttribute('data-id', major.id);
      el.setAttribute('data-target', major.matchId);
      el.innerHTML = `<span class="w-3.5 h-3.5 rounded-full bg-blue-400 mr-2 shadow"></span><span>${major.name}</span>`;

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

    // Nếu cả 2 bên đều đã được chọn -> Kiểm tra ghép cặp
    if (this.selectedLeft && this.selectedRight) {
      const leftId = this.selectedLeft.getAttribute('data-id');
      const rightId = this.selectedRight.getAttribute('data-id');
      const expectedRight = this.selectedLeft.getAttribute('data-target');

      if (rightId === expectedRight) {
        // NỐI ĐÚNG!
        this.matchedPairs.set(leftId, rightId);
        this.selectedLeft.classList.remove('node-selected');
        this.selectedRight.classList.remove('node-selected');
        this.selectedLeft.classList.add('node-matched');
        this.selectedRight.classList.add('node-matched');

        this.sound.playCorrect();
        this.drawGame2Lines();

        if (this.matchedPairs.size === GAME2_DATA.schools.length) {
          if (this.g2StatusMsg) {
            this.g2StatusMsg.innerHTML = '🎉 XUẤT SẮC! BẠN ĐÃ GHÉP CHÍNH XÁC 100% CÁC TRƯỜNG VÀ NGÀNH!';
            this.g2StatusMsg.className = 'text-emerald-400 font-bold text-base animate-pulse';
          }
          this.sound.playFanfare();
        }
      } else {
        // NỐI SAI!
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

        // Vẽ đường cong Bezier
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

  // ========================================================
  // MINI-GAME 3: PHÒNG SƠ TUYỂN ẢO (STAMP DESK & LAW CITATION)
  // ========================================================
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
        this.g3Index = (this.g3Index + 1) % GAME3_DATA.length;
        this.loadGame3Doc(this.g3Index);
      });
    }
  }

  loadGame3Doc(idx) {
    const doc = GAME3_DATA[idx];
    if (!doc) return;

    if (this.g3DocCounter) this.g3DocCounter.textContent = `HỒ SƠ ${idx + 1} / ${GAME3_DATA.length}`;
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
    const doc = GAME3_DATA[this.g3Index];
    if (!doc) return;

    this.sound.playStamp();

    // In dấu mộc lên giấy
    if (this.g3StampContainer) {
      const isApproved = (action === 'APPROVE');
      this.g3StampContainer.innerHTML = `
        <div class="stamp-box ${isApproved ? 'stamp-approved' : ''} animate-stamp text-2xl">
          ${isApproved ? 'ĐÃ DUYỆT - ĐỦ ĐIỀU KIỆN' : 'TỪ CHỐI - KHÔNG ĐỦ TIÊU CHUẨN'}
        </div>
      `;
    }

    // Hiển thị modal phân tích pháp lý sau 300ms
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

  // ========================================================
  // MINI-GAME 4: GRAND QUIZ ARENA (15S COUNTDOWN & CONFETTI)
  // ========================================================
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

    this.loadGame4Question(0);

    if (this.g4RestartBtn) {
      this.g4RestartBtn.addEventListener('click', () => {
        if (this.g4ResultModal) this.g4ResultModal.classList.add('hidden');
        this.g4Index = 0;
        this.g4Score = 0;
        if (this.g4ScoreDisplay) this.g4ScoreDisplay.textContent = '0';
        this.loadGame4Question(0);
      });
    }

    // Tự khởi động lại khi vào Slide 12
    window.addEventListener('slideChanged', (e) => {
      if (e.detail.slideIndex === 12 && this.g4Index === 0) {
        this.loadGame4Question(0);
      }
    });
  }

  loadGame4Question(idx) {
    if (this.g4Timer) clearInterval(this.g4Timer);

    if (idx >= GAME4_DATA.length) {
      this.finishGame4();
      return;
    }

    this.g4Index = idx;
    const q = GAME4_DATA[idx];

    if (this.g4QuestionNumber) this.g4QuestionNumber.textContent = `CÂU HỎI ${idx + 1} / ${GAME4_DATA.length}`;
    if (this.g4QuestionText) this.g4QuestionText.textContent = q.question;

    this.g4TimeRemaining = 15;
    this.updateGame4TimerUI();

    // Render 4 đáp án
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

    // Đếm ngược 15s
    this.g4Timer = setInterval(() => {
      this.g4TimeRemaining--;
      this.updateGame4TimerUI();

      if (this.g4TimeRemaining <= 3 && this.g4TimeRemaining > 0) {
        this.sound.playTick();
      }

      if (this.g4TimeRemaining <= 0) {
        clearInterval(this.g4Timer);
        this.sound.playWrong();
        this.highlightGame4Timeout(q.correctIndex);
      }
    }, 1000);
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

      // Cộng điểm dựa trên thời gian
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
