"use client";

let audioCtx: AudioContext | null = null;
let isAudioEnabled = false;
const listeners = new Set<(enabled: boolean) => void>();

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function getAudioState(): boolean {
  return isAudioEnabled;
}

export function toggleAudio(forcedState?: boolean): boolean {
  isAudioEnabled = typeof forcedState === "boolean" ? forcedState : !isAudioEnabled;
  if (isAudioEnabled) {
    getContext();
    playSwitchSound();
  }
  listeners.forEach((fn) => fn(isAudioEnabled));
  return isAudioEnabled;
}

export function subscribeAudioState(callback: (enabled: boolean) => void): () => void {
  listeners.add(callback);
  callback(isAudioEnabled);
  return () => {
    listeners.delete(callback);
  };
}

export function playClickSound() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(850, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.035);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.035);
  } catch {
    // Ignore audio errors
  }
}

export function playSwitchSound() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Ignore audio errors
  }
}

export function playSuccessSound() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.04, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
    });
  } catch {
    // Ignore audio errors
  }
}

export function playSlideSound(normalized = 0.5) {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const freq = 280 + Math.min(1, Math.max(0, normalized)) * 520;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.025);
  } catch {
    // Ignore audio errors
  }
}

export function playRelaySnapSound() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    // Heavy solenoid transient
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.04);

    // Sharp mechanical latch click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(1200, ctx.currentTime);
    clickOsc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.02);

    clickGain.gain.setValueAtTime(0.08, ctx.currentTime);
    clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(ctx.currentTime);
    clickOsc.stop(ctx.currentTime + 0.02);
  } catch {
    // Ignore audio errors
  }
}

export function playRatchetTick() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const randomFreq = 1800 + Math.random() * 600;
    osc.type = "triangle";
    osc.frequency.setValueAtTime(randomFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.012);

    gain.gain.setValueAtTime(0.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.012);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.012);
  } catch {
    // Ignore audio errors
  }
}

export function playPrismChime() {
  if (!isAudioEnabled) return;
  const ctx = getContext();
  if (!ctx) return;

  try {
    const freqs = [1046.5, 1318.5, 1567.98]; // C6, E6, G6
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.04);

      gain.gain.setValueAtTime(0.03, ctx.currentTime + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + i * 0.04 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.04);
      osc.stop(ctx.currentTime + i * 0.04 + 0.45);
    });
  } catch {
    // Ignore audio errors
  }
}
