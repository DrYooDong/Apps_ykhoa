/**
 * Auscultation Trainer Engine — CliniPortal
 * Web Audio API Acoustic Sound Generator & Hotspot Handler
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let currentSound = 's1s2_normal';
  let activeOscillators = [];

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
  }

  function stopAllSounds() {
    activeOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    activeOscillators = [];
    isPlaying = false;
    const btn = document.getElementById('btn-play-sound');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  function playSound(type) {
    initAudioContext();
    stopAllSounds();

    isPlaying = true;
    currentSound = type;
    const btn = document.getElementById('btn-play-sound');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-square"></i>';

    const now = audioCtx.currentTime;

    if (type === 's1s2_normal') {
      // Loop S1 (lub) and S2 (dub)
      const playHeartBeat = (time) => {
        if (!isPlaying) return;
        // S1
        const osc1 = audioCtx.createOscillator();
        const gain1 = audioCtx.createGain();
        osc1.frequency.setValueAtTime(70, time);
        gain1.gain.setValueAtTime(0.5, time);
        gain1.gain.exponentialRampToValueAtTime(0.01, time + 0.12);
        osc1.connect(gain1);
        gain1.connect(audioCtx.destination);
        osc1.start(time);
        osc1.stop(time + 0.12);
        activeOscillators.push(osc1);

        // S2
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.frequency.setValueAtTime(110, time + 0.3);
        gain2.gain.setValueAtTime(0.4, time + 0.3);
        gain2.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start(time + 0.3);
        osc2.stop(time + 0.4);
        activeOscillators.push(osc2);
      };

      for (let i = 0; i < 10; i++) {
        playHeartBeat(now + i * 0.85);
      }
    } else if (type === 'wheeze') {
      // Continuous musical tone 400Hz
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 3);
      activeOscillators.push(osc);
    }
  }

  function togglePlay() {
    if (isPlaying) {
      stopAllSounds();
    } else {
      playSound(currentSound);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn-play-sound')?.addEventListener('click', togglePlay);

    document.querySelectorAll('.hotspot').forEach(spot => {
      spot.addEventListener('click', function () {
        const soundType = this.getAttribute('data-sound');
        const title = this.getAttribute('data-title');
        document.getElementById('current-sound-title').textContent = title;
        playSound(soundType);
      });
    });
  });

  window.AuscultationTrainer = {
    playSound,
    stopAllSounds
  };
})();
