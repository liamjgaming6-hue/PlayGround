/* Generated voice + belly audio. No audio files: everything is synthesized
   with Web Speech and the Web Audio API, tuned per egirl. */

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.muted = false;
    this.voices = [];
    this.voiceRefreshTimer = null;
    this.voiceReady = false;
    this.currentUtterance = null;
    this._loadVoices = this._loadVoices.bind(this);
    this._initVoiceList();
  }

  _initVoiceList() {
    if (!('speechSynthesis' in window)) return;
    this._loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', this._loadVoices);
    this.voiceRefreshTimer = window.setInterval(() => {
      this._loadVoices();
      if (this.voices.length) window.clearInterval(this.voiceRefreshTimer);
    }, 900);
  }

  _loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length) {
      this.voices = voices;
      this.voiceReady = true;
    }
  }

  unlock() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0.72;
        this.master.connect(this.ctx.destination);
      }
    }
    if (this.ctx?.state === 'suspended') this.ctx.resume().catch(() => {});
    this._loadVoices();
  }

  setMuted(next) {
    this.muted = Boolean(next);
    if (this.muted) {
      this.stopSpeaking();
      if (this.master) this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.03);
    } else if (this.master) {
      this.unlock();
      this.master.gain.setTargetAtTime(0.72, this.ctx.currentTime, 0.03);
    }
  }

  getVoicesFor(character) {
    const hints = (character.voice.hints || []).map((hint) => hint.toLowerCase());
    const english = this.voices.filter((voice) => /^en[-_]/i.test(voice.lang || ''));
    const pool = english.length ? english : this.voices;
    const scored = pool.map((voice) => {
      const name = voice.name.toLowerCase();
      let score = 0;
      hints.forEach((hint, index) => {
        if (name.includes(hint)) score += 100 - index * 10;
      });
      if (/female|samantha|victoria|karen|moira|tessa|zira|hazel|susan|serena|allison|ava|jenny|aria|sonia|libby|emma|google uk english female/i.test(name)) score += 18;
      if (voice.localService) score += 1;
      return { voice, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 4).map((item) => item.voice);
  }

  pickVoice(character) {
    if (!this.voices.length) return null;
    const pool = this.getVoicesFor(character);
    if (!pool.length) return null;
    // The same character always gets the same available voice.
    let hash = 0;
    for (const char of character.id) hash = (hash * 31 + char.charCodeAt(0)) % 997;
    return pool[hash % pool.length];
  }

  _speech(text, character, options = {}) {
    if (this.muted || !('speechSynthesis' in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.pickVoice(character);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'en-US';
      utterance.pitch = Math.min(2, Math.max(0.1, (character.voice.pitch || 1.2) + (options.pitch || 0)));
      utterance.rate = Math.min(2, Math.max(0.3, (character.voice.rate || 1) + (options.rate || 0)));
      utterance.volume = options.volume ?? 0.92;
      this.currentUtterance = utterance;
      utterance.onend = () => { this.currentUtterance = null; };
      window.speechSynthesis.speak(utterance);
    } catch {
      // Voice is a bonus; the game remains fully playable without it.
    }
  }

  speak(text, character, options = {}) {
    this._speech(text, character, options);
  }

  giggle(character, text = 'Hehe.') {
    if (this.muted) return;
    this._speech(text, character, { pitch: 0.18, rate: 0.09, volume: 0.82 });
    this.chirp(character, 2);
  }

  stopSpeaking() {
    if (!('speechSynthesis' in window)) return;
    try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
    this.currentUtterance = null;
  }

  ensureContext() {
    this.unlock();
    return this.ctx;
  }

  _tone(freq, duration, options = {}) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = (options.when ?? ctx.currentTime) + 0.01;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = options.type || 'sine';
    osc.frequency.setValueAtTime(Math.max(20, freq), now);
    if (options.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(20, options.slideTo), now + duration);
    if (options.detune) osc.detune.value = options.detune;
    const peak = options.gain ?? 0.12;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(peak, now + Math.min(0.04, duration * 0.2));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    let node = osc;
    if (options.lowpass) {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = options.lowpass;
      node.connect(filter);
      node = filter;
    }
    node.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.04);
  }

  click() {
    this._tone(620, 0.06, { type: 'triangle', gain: 0.035, slideTo: 760 });
  }

  hover() {
    this._tone(880, 0.035, { type: 'sine', gain: 0.018 });
  }

  heartUp(character) {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const root = 430 + (character.belly.base % 90);
    [0, 4, 7, 12, 16].forEach((semi, index) => {
      const freq = root * Math.pow(2, semi / 12);
      this._tone(freq, 0.2, {
        type: 'triangle', gain: 0.055, when: now + index * 0.055, lowpass: 2400
      });
    });
    this._tone(root / 2, 0.34, { type: 'sine', gain: 0.05, when: now + 0.05, lowpass: 500 });
  }

  heartDown() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [0, -3, -7].forEach((semi, index) => {
      this._tone(330 * Math.pow(2, semi / 12), 0.28, {
        type: 'sawtooth', gain: 0.045, when: now + index * 0.09, lowpass: 800
      });
    });
    this._tone(120, 0.34, { type: 'sine', gain: 0.08, slideTo: 72, when: now });
  }

  neutral() {
    this._tone(300, 0.12, { type: 'triangle', gain: 0.035, slideTo: 285 });
    this._tone(300, 0.12, { type: 'triangle', gain: 0.025, when: this.ctx?.currentTime + 0.15, slideTo: 290 });
  }

  chirp(character, count = 2) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const base = 720 + (character.belly.base * 2.7);
    for (let i = 0; i < count; i += 1) {
      this._tone(base * (1 + i * 0.08), 0.08, {
        type: 'sine', gain: 0.045, when: ctx.currentTime + 0.2 + i * 0.11,
        slideTo: base * 1.3, lowpass: 2800
      });
    }
  }

  belly(character, intensity = 1, variant = null) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime + 0.02;
    const profile = character.belly;
    const base = profile.base;
    const amount = Math.max(0.2, Math.min(2, intensity));
    const timbre = profile.timbre;

    // Low body of the gurgle.
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = timbre === 'digital' ? 'square' : 'sine';
    osc.frequency.setValueAtTime(base * (1.4 + Math.random() * 0.2), now);
    osc.frequency.exponentialRampToValueAtTime(base * (0.58 + Math.random() * 0.18), now + 0.66);
    osc.frequency.exponentialRampToValueAtTime(base * (0.9 + Math.random() * 0.2), now + 1.2);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(profile.cutoff, now);
    filter.frequency.exponentialRampToValueAtTime(profile.cutoff * 0.45, now + 1.2);
    filter.Q.value = timbre === 'digital' ? 7 : 3;
    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.13 * amount, now + 0.12);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.25);
    osc.connect(filter);
    filter.connect(oscGain);
    oscGain.connect(this.master);
    osc.start(now);
    osc.stop(now + 1.3);

    // Rumbling noise, like a contented stomach.
    const length = Math.floor(ctx.sampleRate * 1.45);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.94 + white * 0.06;
      data[i] = last;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(profile.cutoff * 0.5, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(profile.cutoff * 1.2, now + 0.9);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.035 * amount, now + 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.master);
    noise.start(now);

    // Bubbles.
    const bubbles = variant === 'struggle' ? 5 : 3;
    for (let i = 0; i < bubbles; i += 1) {
      const when = now + 0.15 + Math.random() * 0.95;
      this._tone(base * (1.7 + Math.random() * 1.6), 0.1 + Math.random() * 0.1, {
        type: 'sine',
        gain: 0.035 * amount,
        when,
        slideTo: base * (2.2 + Math.random() * 1.8),
        lowpass: profile.cutoff * 1.4
      });
    }

    if (timbre === 'digital') {
      for (let i = 0; i < 3; i += 1) {
        this._tone(base * (3 + i), 0.035, {
          type: 'square', gain: 0.014, when: now + 0.1 + i * 0.12, lowpass: 2800
        });
      }
    }
  }

  swallow(character, mode = 'good') {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    if (mode === 'good') {
      [0, 3, 7, 12].forEach((semi, i) => {
        this._tone(220 * Math.pow(2, semi / 12), 0.42, {
          type: 'sine', gain: 0.055, when: now + i * 0.09, slideTo: 280 * Math.pow(2, semi / 12), lowpass: 1100
        });
      });
      this._tone(98, 1.1, { type: 'sine', gain: 0.12, when: now + 0.1, slideTo: 48, lowpass: 320 });
    } else {
      this._tone(80, 1.4, { type: 'sawtooth', gain: 0.09, when: now, slideTo: 36, lowpass: 220 });
      this._tone(160, 0.6, { type: 'triangle', gain: 0.05, when: now + 0.18, slideTo: 70, lowpass: 500 });
    }
    this.belly(character, 1.4, mode === 'good' ? 'soft' : 'struggle');
  }

  acidRise(duration = 4.2) {
    const ctx = this.ensureContext();
    if (!ctx || this.muted) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(54, now);
    osc.frequency.exponentialRampToValueAtTime(174, now + duration);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + duration);
    filter.Q.value = 8;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.7);
    gain.gain.exponentialRampToValueAtTime(0.075, now + duration * 0.72);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.master);
    osc.start(now);
    osc.stop(now + duration + 0.05);

    // Acid fizz.
    for (let i = 0; i < 14; i += 1) {
      this._tone(230 + Math.random() * 420, 0.06 + Math.random() * 0.08, {
        type: 'sine', gain: 0.012, when: now + Math.random() * duration, lowpass: 2600
      });
    }
  }

  death() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [55, 52, 48].forEach((freq, index) => {
      this._tone(freq, 1.6, { type: 'sine', gain: 0.11, when: now + index * 0.17, slideTo: freq * 0.8, lowpass: 240 });
    });
    this._tone(440, 0.18, { type: 'square', gain: 0.02, when: now + 0.1, slideTo: 220, lowpass: 900 });
  }

  success() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
      this._tone(freq, 0.4, { type: 'triangle', gain: 0.05, when: now + index * 0.11, lowpass: 2600 });
    });
  }
}
