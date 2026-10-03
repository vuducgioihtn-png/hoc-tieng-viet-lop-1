/**
 * Sound effects and Speech Synthesis for Vietnamese Grade 1 Learning
 * 100% Standard Vietnamese Female Teacher Voice (Giọng Nữ chuẩn Tiếng Việt)
 */

// Web Audio API Context singleton
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSoundEffect = {
  // Pop sound for popping balloons
  pop: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // AudioContext error handling
    }
  },

  // Star collection sound
  star: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.2, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.22);
      });
    } catch {
      // AudioContext error handling
    }
  },

  // Success cheering chime
  success: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 440, t: 0 },
        { f: 554.37, t: 0.08 },
        { f: 659.25, t: 0.16 },
        { f: 880, t: 0.24 },
      ];
      notes.forEach(({ f, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + t);
        gain.gain.setValueAtTime(0.25, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + 0.36);
      });
    } catch {
      // AudioContext error handling
    }
  },

  // Wrong answer soft boing
  wrong: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // AudioContext error handling
    }
  },

  // Click button click
  click: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext error handling
    }
  },

  // Writing pen stroke
  pencil: () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // AudioContext error handling
    }
  }
};

/**
 * Natural Vietnamese phonetic sound representation for isolated letters (Grade 1 standard)
 * In primary phonics, consonants are pronounced directly by their sound (cờ, bờ, dờ...)
 */
const LETTER_PHONETIC_MAP: Record<string, string> = {
  'a': 'a',
  'ă': 'á',
  'â': 'ớ',
  'b': 'bờ',
  'c': 'cờ',
  'd': 'dờ',
  'đ': 'đờ',
  'e': 'e',
  'ê': 'ê',
  'g': 'gờ',
  'h': 'hờ',
  'i': 'i',
  'k': 'cờ',
  'l': 'lờ',
  'm': 'mờ',
  'n': 'nờ',
  'o': 'o',
  'ô': 'ô',
  'ơ': 'ơ',
  'p': 'pờ',
  'q': 'quờ',
  'r': 'rờ',
  's': 'sờ',
  't': 'tờ',
  'u': 'u',
  'ư': 'ư',
  'v': 'vờ',
  'x': 'xờ',
  'y': 'i',
  'ch': 'chờ',
  'kh': 'khờ',
  'nh': 'nhờ',
  'ng': 'ngờ',
  'ngh': 'ngờ',
  'gh': 'gờ',
  'th': 'thờ',
  'tr': 'trờ',
  'ph': 'phờ',
  'qu': 'quờ',
  'gi': 'giờ',
  '/': 'sắc',
  '´': 'sắc',
  '\\': 'huyền',
  '`': 'huyền',
  '?': 'hỏi',
  '~': 'ngã',
  '.': 'nặng',
};

// Currently playing HTML5 Audio element
let currentPlayingAudio: HTMLAudioElement | null = null;

// Voice state for visual feedback toast
let isSpeakingCallback: ((isSpeaking: boolean, text: string) => void) | null = null;

export function registerSpeakingListener(callback: (isSpeaking: boolean, text: string) => void) {
  isSpeakingCallback = callback;
}

/**
 * Checks if browser has an authentic Vietnamese voice installed
 */
function getInstalledVietnameseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  const femaleKeywords = ['hoaimy', 'mai', 'linh', 'lan', 'huong', 'nga', 'thao', 'google', 'female', 'nữ', 'nu'];
  const viVoices = voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    const name = v.name.toLowerCase();
    return lang.startsWith('vi') || name.includes('vietnam') || name.includes('tiếng việt');
  });

  if (viVoices.length === 0) return null;

  // Prioritize female Vietnamese voice
  const femaleVoice = viVoices.find(v => {
    const name = v.name.toLowerCase();
    return femaleKeywords.some(kw => name.includes(kw));
  });

  return femaleVoice || viVoices[0];
}

/**
 * Standard Vietnamese Female Voice Player
 * ALWAYS plays 100% authentic Vietnamese speech (never English!)
 */
export async function speakVietnamese(
  text: string, 
  options?: { 
    rate?: number; 
    pitch?: number; 
    onEnd?: () => void 
  }
) {
  if (typeof window === 'undefined') return;

  const trimmedText = text.trim();
  if (!trimmedText) return;

  // Map isolated single letter to proper Vietnamese teacher phonetics (e.g. 'b' -> 'chữ bờ')
  const lowerTrimmed = trimmedText.toLowerCase();
  const spokenText = LETTER_PHONETIC_MAP[lowerTrimmed] || trimmedText;

  // 1. Stop any currently playing audio or speech
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.currentTime = 0;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  // Trigger UI toast indicator
  if (isSpeakingCallback) {
    isSpeakingCallback(true, trimmedText);
  }

  // 2. PRIMARY: Stream 100% native Vietnamese Female Audio from Server endpoint
  // This uses Google Vietnamese TTS which guarantees perfect standard Hanoi female voice
  try {
    const audioUrl = `/api/tts?text=${encodeURIComponent(spokenText)}`;
    const audio = new Audio(audioUrl);
    currentPlayingAudio = audio;

    audio.onended = () => {
      if (isSpeakingCallback) isSpeakingCallback(false, '');
      if (options?.onEnd) options.onEnd();
    };

    audio.onerror = () => {
      // If network fails, try client-side fallback ONLY IF a Vietnamese voice exists
      playFallbackIfVietnameseVoiceAvailable(spokenText, options);
    };

    await audio.play();
    return;
  } catch {
    // If audio element autoplay was restricted or blocked, try browser speech synthesis with strict Vietnamese check
    playFallbackIfVietnameseVoiceAvailable(spokenText, options);
  }
}

/**
 * Play speech synthesis ONLY if a real Vietnamese voice is installed.
 * If NO Vietnamese voice is installed, NEVER play an English voice!
 */
function playFallbackIfVietnameseVoiceAvailable(
  spokenText: string,
  options?: { onEnd?: () => void }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (isSpeakingCallback) isSpeakingCallback(false, '');
    return;
  }

  const viVoice = getInstalledVietnameseVoice();
  // CRITICAL: Only speak if voice is ACTUALLY Vietnamese!
  // Never let an English voice attempt to read Vietnamese!
  if (!viVoice) {
    if (isSpeakingCallback) isSpeakingCallback(false, '');
    return;
  }

  try {
    window.speechSynthesis.cancel();
    window.speechSynthesis.resume();

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.voice = viVoice;
    utterance.lang = viVoice.lang || 'vi-VN';
    utterance.rate = 0.85;
    utterance.pitch = 1.25;

    utterance.onend = () => {
      if (isSpeakingCallback) isSpeakingCallback(false, '');
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = () => {
      if (isSpeakingCallback) isSpeakingCallback(false, '');
    };

    window.speechSynthesis.speak(utterance);
  } catch {
    if (isSpeakingCallback) isSpeakingCallback(false, '');
  }
}

/**
 * Phonics spelling pronunciation with Female Teacher rhythm
 * E.g., "bờ - a - ba", "cờ - a - ca - sắc - cá"
 */
export function speakPhonics(initial: string, rhyme: string, tone?: string, result?: string) {
  const initialSound = LETTER_PHONETIC_MAP[initial.toLowerCase()] || initial;
  const rhymeSound = LETTER_PHONETIC_MAP[rhyme.toLowerCase()] || rhyme;
  let phrase = `${initialSound}... ${rhymeSound}... ${result || initial + rhyme}.`;
  if (tone && tone !== 'không dấu') {
    phrase = `${initialSound}... ${rhymeSound}... ${initial}${rhyme}... ${tone}... ${result}. ${result}.`;
  }
  speakVietnamese(phrase, { rate: 0.80, pitch: 1.15 });
}
