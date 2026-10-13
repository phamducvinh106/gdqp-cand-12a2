/**
 * ENGINE.JS - TRÌNH ĐIỀU KHIỂN BÀI THUYẾT TRÌNH VÀ HỆ THỐNG ÂM THANH
 * Hỗ trợ Web Audio API Synth, State Machine, Phím tắt, Touch Gestures, Fullscreen
 */

class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmOscillators = [];
    this.bgmInterval = null;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.audioCtx) {
      this.audioCtx = new AudioContextClass();
    }
  }

  resumeContext() {
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
    }
    return this.isMuted;
  }

  // Tạo âm thanh "Ting" khi trả lời đúng
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

      // Hợp âm thăng tiến vui tươi E5 -> B5
      osc1.frequency.setValueAtTime(659.25, now);
      osc1.frequency.exponentialRampToValueAtTime(987.77, now + 0.15);

      osc2.frequency.setValueAtTime(523.25, now);
      osc2.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
    } catch (e) {
      console.warn("Audio synth error:", e);
    }
  }

  // Tạo âm thanh "Buzzer" khi trả lời sai
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

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn("Audio synth error:", e);
    }
  }

  // Âm thanh lật thẻ 3D (swoosh nhanh)
  playCardFlip() {
    if (this.isMuted) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn(e);
    }
  }

  // Âm thanh đóng mộc dập dấu mộc đỏ (Thud đầm, dứt khoát)
  playStamp() {
    if (this.isMuted) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      // Âm trầm va đập
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn(e);
    }
  }

  // Âm thanh đồng hồ tích tắc
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

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Âm thanh chiến thắng Fanfare hùng tráng
  playFanfare() {
    if (this.isMuted) return;
    this.resumeContext();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.4);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.5);
      });
    } catch (e) {}
  }

  // BGM Diễu Binh Synth Loop (Marching Pride Theme)
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
    if (!this.audioCtx) return;

    this.stopBGM();
    this.bgmPlaying = true;

    // Chuỗi hợp âm hào hùng trang nghiêm
    const chords = [
      [261.63, 329.63, 392.00], // C
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [196.00, 246.94, 293.66]  // G
    ];
    let step = 0;

    const playChord = () => {
      if (!this.bgmPlaying || this.isMuted) return;
      const currentChord = chords[step % chords.length];
      const now = this.audioCtx.currentTime;

      currentChord.forEach(freq => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.06, now + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + 2.0);
      });

      step++;
    };

    playChord();
    this.bgmInterval = setInterval(playChord, 1800);
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

// ==========================================
// TRÌNH QUẢN LÝ SLIDE CHÍNH (PRESENTATION ENGINE)
// ==========================================
export class PresentationEngine {
  constructor() {
    this.currentSlide = 1;
    this.totalSlides = 12;
    this.sound = new SoundManager();
    this.isMenuOpen = false;

    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
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
    this.fullscreenBtn = document.getElementById('fullscreen-toggle-btn');
    this.menuBtn = document.getElementById('menu-toggle-btn');
    this.menuDrawer = document.getElementById('menu-drawer');
    this.menuOverlay = document.getElementById('menu-overlay');
    this.menuCloseBtn = document.getElementById('menu-close-btn');
    this.slideLinks = document.querySelectorAll('.slide-toc-item');
  }

  bindEvents() {
    // Phím điều hướng
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

    // Nút giao diện
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    if (this.audioBtn) this.audioBtn.addEventListener('click', () => this.toggleAudio());
    if (this.fullscreenBtn) this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    // Menu mục lục Drawer
    if (this.menuBtn) this.menuBtn.addEventListener('click', () => this.openMenu());
    if (this.menuCloseBtn) this.menuCloseBtn.addEventListener('click', () => this.closeMenu());
    if (this.menuOverlay) this.menuOverlay.addEventListener('click', () => this.closeMenu());

    if (this.slideLinks) {
      this.slideLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const targetSlide = parseInt(link.getAttribute('data-slide-index'), 10);
          if (targetSlide) {
            this.goToSlide(targetSlide);
            this.closeMenu();
          }
        });
      });
    }

    // Touch Swipe cho màn hình cảm ứng
    window.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });

    // Click bất kỳ để resume AudioContext lần đầu (tránh Autoplay Policy chặn)
    window.addEventListener('click', () => {
      this.sound.resumeContext();
    }, { once: true });
  }

  handleSwipe() {
    const threshold = 60; // Ngưỡng vuốt tối thiểu
    if (this.touchEndX < this.touchStartX - threshold) {
      this.nextSlide();
    } else if (this.touchEndX > this.touchStartX + threshold) {
      this.prevSlide();
    }
  }

  goToSlide(slideIndex) {
    if (slideIndex < 1 || slideIndex > this.totalSlides) return;
    this.currentSlide = slideIndex;

    // Cập nhật DOM các Slide
    this.slides.forEach(slide => {
      const idx = parseInt(slide.getAttribute('data-slide'), 10);
      if (idx === this.currentSlide) {
        slide.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        slide.classList.add('flex', 'opacity-100');
        // Kích hoạt animation nội dung
        const animElements = slide.querySelectorAll('.slide-animate');
        animElements.forEach(el => {
          el.classList.add('animate-fade-in-up');
        });
      } else {
        slide.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        slide.classList.remove('flex', 'opacity-100');
      }
    });

    // Cập nhật thanh tiến trình
    const progressPercent = ((this.currentSlide) / this.totalSlides) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progressPercent}%`;
    }

    // Cập nhật số trang
    if (this.slideNumberDisplay) {
      this.slideNumberDisplay.textContent = `${this.currentSlide.toString().padStart(2, '0')} / ${this.totalSlides.toString().padStart(2, '0')}`;
    }

    // Cập nhật trạng thái nút tiến/lùi
    if (this.prevBtn) {
      this.prevBtn.disabled = (this.currentSlide === 1);
      this.prevBtn.style.opacity = (this.currentSlide === 1) ? '0.3' : '1';
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = (this.currentSlide === this.totalSlides);
      this.nextBtn.style.opacity = (this.currentSlide === this.totalSlides) ? '0.3' : '1';
    }

    // Đánh dấu mục lục đang active
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

    // Kích hoạt Custom Event cho các Game lắng nghe
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

  updateSoundIcon(isPlaying) {
    if (!this.audioBtn) return;
    const waveIcon = this.audioBtn.querySelector('.audio-wave-icon');
    const textDesc = this.audioBtn.querySelector('.audio-text-desc');

    if (this.sound.bgmPlaying) {
      this.audioBtn.classList.add('text-yellow-400', 'border-yellow-400');
      if (waveIcon) waveIcon.classList.add('animate-pulse');
      if (textDesc) textDesc.textContent = "Nhạc: Bật";
    } else {
      this.audioBtn.classList.remove('text-yellow-400', 'border-yellow-400');
      if (waveIcon) waveIcon.classList.remove('animate-pulse');
      if (textDesc) textDesc.textContent = "Nhạc: Tắt";
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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
