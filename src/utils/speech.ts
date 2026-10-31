/**
 * Audio Narration Engine for Heritec Heritage Sites
 * Supports high-fidelity authentic voice narration for Indian languages (Hindi, Telugu, Tamil, etc.)
 * using a dual engine: Native Online Audio Stream (Google TTS) + Web Speech Synthesis fallback.
 */

export interface SpeechState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string | null;
  currentLanguage: string;
  rate: number;
  engine: 'online' | 'browser' | 'none';
}

type SpeechListener = (state: SpeechState) => void;

// Language code to Google TTS language mapping
const TTS_LANG_MAP: Record<string, string> = {
  'hi-IN': 'hi',
  'hi': 'hi',
  'te-IN': 'te',
  'te': 'te',
  'ta-IN': 'ta',
  'ta': 'ta',
  'kn-IN': 'kn',
  'kn': 'kn',
  'ml-IN': 'ml',
  'ml': 'ml',
  'bn-IN': 'bn',
  'bn': 'bn',
  'mr-IN': 'mr',
  'mr': 'mr',
  'gu-IN': 'gu',
  'gu': 'gu',
  'pa-IN': 'pa',
  'pa': 'pa',
  'en-IN': 'en-IN',
  'en': 'en',
};

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private audioChunks: string[] = [];
  private currentChunkIndex: number = 0;
  private listeners: Set<SpeechListener> = new Set();
  private state: SpeechState = {
    isPlaying: false,
    isPaused: false,
    currentText: null,
    currentLanguage: 'en-IN',
    rate: 1.0,
    engine: 'online',
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          this.notify();
        };
      }
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener({ ...this.state }));
  }

  public subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener({ ...this.state });
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): SpeechState {
    return { ...this.state };
  }

  public setLanguage(lang: string) {
    this.state.currentLanguage = lang;
    this.notify();
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    if (this.currentAudio && this.state.isPlaying) {
      this.currentAudio.playbackRate = rate;
    }
    if (this.state.isPlaying) {
      const text = this.state.currentText;
      const lang = this.state.currentLanguage;
      if (text) {
        this.speak(text, lang, true);
      }
    } else {
      this.notify();
    }
  }

  /**
   * Splits text into smaller natural sentence chunks (<= 150 chars) for smooth streaming
   */
  private splitIntoChunks(text: string, maxLen = 140): string[] {
    // Clean text
    const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
    if (!cleanText) return [];

    // Split on sentence terminators: ।, ., ?, !, or semicolons
    const sentences = cleanText.split(/([।\.\?!;]+)/);
    const chunks: string[] = [];
    let currentChunk = '';

    for (let i = 0; i < sentences.length; i++) {
      const part = sentences[i];
      if (!part.trim()) continue;

      if ((currentChunk + part).length <= maxLen) {
        currentChunk += part;
      } else {
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }
        // If a single sentence exceeds maxLen, split on commas or spaces
        if (part.length > maxLen) {
          const subWords = part.split(' ');
          let subChunk = '';
          for (const word of subWords) {
            if ((subChunk + ' ' + word).length <= maxLen) {
              subChunk += (subChunk ? ' ' : '') + word;
            } else {
              if (subChunk.trim()) chunks.push(subChunk.trim());
              subChunk = word;
            }
          }
          if (subChunk.trim()) currentChunk = subChunk;
          else currentChunk = '';
        } else {
          currentChunk = part;
        }
      }
    }

    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }

    return chunks.length > 0 ? chunks : [cleanText.slice(0, maxLen)];
  }

  /**
   * Main Speak Method
   */
  public speak(text: string, lang = 'en-IN', forceRestart = false) {
    // If same audio is playing in same language, ignore unless force restart
    if (this.state.currentText === text && this.state.currentLanguage === lang && this.state.isPlaying && !forceRestart) {
      return;
    }

    this.stop();

    // Check if we should use the Online Audio Streamer (provides authentic native Hindi/Indian voices)
    const ttsLang = TTS_LANG_MAP[lang] || lang.split('-')[0] || 'hi';

    // Try online audio streaming first for maximum vocal authenticity
    this.speakViaOnlineAudio(text, lang, ttsLang);
  }

  /**
   * Online Natural Audio Streamer (Plays authentic Hindi / regional audio)
   */
  private speakViaOnlineAudio(text: string, lang: string, ttsLang: string) {
    this.audioChunks = this.splitIntoChunks(text, 150);
    this.currentChunkIndex = 0;

    if (this.audioChunks.length === 0) return;

    this.state.isPlaying = true;
    this.state.isPaused = false;
    this.state.currentText = text;
    this.state.currentLanguage = lang;
    this.state.engine = 'online';
    this.notify();

    this.playChunk(this.currentChunkIndex, ttsLang, text, lang);
  }

  private playChunk(index: number, ttsLang: string, fullText: string, lang: string) {
    if (index >= this.audioChunks.length || !this.state.isPlaying) {
      // Completed all chunks
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = null;
      this.currentAudio = null;
      this.notify();
      return;
    }

    const chunk = this.audioChunks[index];
    const encoded = encodeURIComponent(chunk);
    const proxyUrl = `/api/tts?tl=${encodeURIComponent(ttsLang)}&q=${encoded}`;
    const directUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(ttsLang)}&q=${encoded}`;

    let isFallbackStarted = false;
    const startFallback = (reason: string, err?: any) => {
      if (isFallbackStarted) return;
      isFallbackStarted = true;
      console.warn(`Online audio stream error (${reason}), activating speech synthesis:`, err);
      this.speakViaBrowserSynth(fullText, lang);
    };

    const tryAudio = (url: string, isRetry = false) => {
      try {
        const audio = new Audio(url);
        this.currentAudio = audio;
        audio.playbackRate = this.state.rate;

        audio.onended = () => {
          if (this.state.isPlaying && !this.state.isPaused) {
            this.currentChunkIndex++;
            this.playChunk(this.currentChunkIndex, ttsLang, fullText, lang);
          }
        };

        audio.onerror = (e) => {
          if (!isRetry) {
            tryAudio(directUrl, true);
          } else {
            startFallback("audio.onerror", e);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            if (!isRetry) {
              tryAudio(directUrl, true);
            } else {
              startFallback("playPromise.catch", err);
            }
          });
        }
      } catch (err) {
        if (!isRetry) {
          tryAudio(directUrl, true);
        } else {
          startFallback("catch", err);
        }
      }
    };

    tryAudio(proxyUrl);
  }

  /**
   * Browser Web Speech Synthesis Fallback
   */
  private speakViaBrowserSynth(text: string, lang: string) {
    if (!this.synth) {
      console.warn("Speech synthesis not supported in this environment.");
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = null;
      this.notify();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;
    utterance.rate = this.state.rate;
    utterance.pitch = 1.0;
    utterance.lang = lang;

    const voices = this.synth.getVoices();
    const primaryLang = lang.split('-')[0].toLowerCase();

    // Look for matching voice
    let matchedVoice = voices.find(
      (v) => v.lang.toLowerCase() === lang.toLowerCase() || v.lang.replace('_', '-').toLowerCase() === lang.toLowerCase()
    );

    if (!matchedVoice) {
      matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(primaryLang));
    }

    // Check voice name for language match (e.g., "Hindi", "हिन्दी")
    if (!matchedVoice && (primaryLang === 'hi' || lang.includes('hi'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('hindi') || 
        v.name.includes('हिन्दी') ||
        v.name.toLowerCase().includes('kalpana') ||
        v.name.toLowerCase().includes('hemant')
      );
    }

    // Check voice name for Marathi (e.g., "Marathi", "मराठी", "Aarohi", "Manohar")
    if (!matchedVoice && (primaryLang === 'mr' || lang.includes('mr'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('marathi') || 
        v.name.includes('मराठी') ||
        v.name.toLowerCase().includes('aarohi') ||
        v.name.toLowerCase().includes('manohar') ||
        v.lang.toLowerCase().includes('mr')
      );
    }

    // Check voice name for Malayalam (e.g., "Malayalam", "മലയാളം", "Sobhana", "Midhun")
    if (!matchedVoice && (primaryLang === 'ml' || lang.includes('ml'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('malayalam') || 
        v.name.includes('മലയാളം') ||
        v.name.toLowerCase().includes('sobhana') ||
        v.name.toLowerCase().includes('midhun') ||
        v.lang.toLowerCase().includes('ml')
      );
    }

    // Check voice name for Tamil (e.g., "Tamil", "தமிழ்", "Valluvar", "Kani")
    if (!matchedVoice && (primaryLang === 'ta' || lang.includes('ta'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('tamil') || 
        v.name.includes('தமிழ்') ||
        v.name.toLowerCase().includes('valluvar') ||
        v.name.toLowerCase().includes('kani') ||
        v.lang.toLowerCase().includes('ta')
      );
    }

    // Check voice name for Telugu (e.g., "Telugu", "తెలుగు", "Mohan", "Shruti", "Chitra")
    if (!matchedVoice && (primaryLang === 'te' || lang.includes('te'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('telugu') || 
        v.name.includes('తెలుగు') ||
        v.name.toLowerCase().includes('mohan') ||
        v.name.toLowerCase().includes('shruti') ||
        v.name.toLowerCase().includes('chitra') ||
        v.lang.toLowerCase().includes('te')
      );
    }

    // Check voice name for Kannada (e.g., "Kannada", "ಕನ್ನಡ", "Gagan", "Sapna", "kn-IN")
    if (!matchedVoice && (primaryLang === 'kn' || lang.includes('kn'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('kannada') || 
        v.name.includes('ಕನ್ನಡ') ||
        v.name.toLowerCase().includes('gagan') ||
        v.name.toLowerCase().includes('sapna') ||
        v.lang.toLowerCase().includes('kn')
      );
    }

    // Check voice name for Bengali (e.g., "Bengali", "Bangla", "বাংলা", "Bashkar", "Tanishaa", "bn-IN", "bn-BD")
    if (!matchedVoice && (primaryLang === 'bn' || lang.includes('bn'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('bengali') || 
        v.name.toLowerCase().includes('bangla') ||
        v.name.includes('বাংলা') ||
        v.name.toLowerCase().includes('bashkar') ||
        v.name.toLowerCase().includes('tanishaa') ||
        v.lang.toLowerCase().includes('bn')
      );
    }

    // Check voice name for Gujarati (e.g., "Gujarati", "ગુજરાતી", "Niranjan", "Dhwani", "gu-IN", "gu")
    if (!matchedVoice && (primaryLang === 'gu' || lang.includes('gu'))) {
      matchedVoice = voices.find((v) => 
        v.name.toLowerCase().includes('gujarati') || 
        v.name.includes('ગુજરાતી') ||
        v.name.toLowerCase().includes('niranjan') ||
        v.name.toLowerCase().includes('dhwani') ||
        v.lang.toLowerCase().includes('gu')
      );
    }

    // CRITICAL: If no dedicated Marathi voice is installed on user's system,
    // fallback to a Hindi/Indic Devanagari voice. Marathi is written in Devanagari,
    // so Hindi voices pronounce Marathi text clearly. We MUST adjust utterance.lang
    // so the browser does not reject it with "language-unavailable".
    if (!matchedVoice && (primaryLang === 'mr' || lang.includes('mr'))) {
      matchedVoice = voices.find((v) => 
        v.lang.toLowerCase().startsWith('hi') || 
        v.name.toLowerCase().includes('hindi') || 
        v.name.includes('हिन्दी') ||
        v.name.toLowerCase().includes('kalpana') ||
        v.name.toLowerCase().includes('hemant')
      );
      if (matchedVoice) {
        utterance.lang = matchedVoice.lang || 'hi-IN';
      }
    }

    // If still no voice, fallback to system default voice and match its language tag
    if (!matchedVoice) {
      matchedVoice = voices.find((v) => v.default) || voices[0];
      if (matchedVoice) {
        utterance.lang = matchedVoice.lang;
      }
    }

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.isPaused = false;
      this.state.currentText = text;
      this.state.currentLanguage = lang;
      this.state.engine = 'browser';
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      console.warn("SpeechSynthesis utterance error:", e);
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = null;
      this.notify();
    };

    utterance.onpause = () => {
      this.state.isPaused = true;
      this.notify();
    };

    utterance.onresume = () => {
      this.state.isPaused = false;
      this.notify();
    };

    if (this.synth.paused) {
      this.synth.resume();
    }
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.currentAudio && this.state.isPlaying && !this.state.isPaused) {
      this.currentAudio.pause();
      this.state.isPaused = true;
      this.notify();
      return;
    }
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.currentAudio && this.state.isPaused) {
      this.currentAudio.play().catch(() => {});
      this.state.isPaused = false;
      this.notify();
      return;
    }
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.synth) {
      this.synth.cancel();
    }
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.currentText = null;
    this.audioChunks = [];
    this.currentChunkIndex = 0;
    this.notify();
  }

  public togglePlay(text: string, lang = 'en-IN') {
    if (this.state.currentText === text && this.state.currentLanguage === lang) {
      if (this.state.isPlaying && !this.state.isPaused) {
        this.pause();
      } else if (this.state.isPaused) {
        this.resume();
      } else {
        this.speak(text, lang);
      }
    } else {
      this.speak(text, lang);
    }
  }
}

export const speechManager = new SpeechManager();
