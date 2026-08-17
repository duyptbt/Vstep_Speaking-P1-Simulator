/**
 * Text-to-Speech Utility with Female British Voice as Primary Selection
 */

let selectedVoice: SpeechSynthesisVoice | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentSpeechRate: number = 0.95;

// Load persisted speech rate from localStorage if available
if (typeof window !== "undefined") {
  try {
    const savedRate = localStorage.getItem("vstep_tts_rate");
    if (savedRate) {
      const parsed = parseFloat(savedRate);
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 2.0) {
        currentSpeechRate = parsed;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
}

export function getSpeechRate(): number {
  return currentSpeechRate;
}

export function setSpeechRate(rate: number) {
  currentSpeechRate = rate;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("vstep_tts_rate", rate.toString());
    } catch {
      // Ignore
    }
  }
}

export function initializeTTSVoices(onVoicesLoaded?: (voices: SpeechSynthesisVoice[]) => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // Search for Female British Voice (en-GB)
    // Common British Female voices: Google UK English Female, Microsoft Hazel, Sonia, Serena, Fiona
    const britishFemale = voices.find(
      (v) =>
        (v.lang.toLowerCase() === "en-gb" || v.lang.toLowerCase().startsWith("en_gb")) &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("google uk english female") ||
          v.name.toLowerCase().includes("hazel") ||
          v.name.toLowerCase().includes("sonia") ||
          v.name.toLowerCase().includes("serena") ||
          v.name.toLowerCase().includes("fiona") ||
          v.name.toLowerCase().includes("victoria"))
    );

    if (britishFemale) {
      selectedVoice = britishFemale;
    } else {
      // Fallback 1: Any British voice (en-GB)
      const anyBritish = voices.find((v) => v.lang.toLowerCase().includes("en-gb") || v.lang.toLowerCase().includes("en_gb"));
      if (anyBritish) {
        selectedVoice = anyBritish;
      } else {
        // Fallback 2: Any English Female voice
        const anyEnglishFemale = voices.find(
          (v) =>
            v.lang.toLowerCase().startsWith("en") &&
            (v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("samantha") || v.name.toLowerCase().includes("zira"))
        );
        selectedVoice = anyEnglishFemale || voices.find((v) => v.lang.toLowerCase().startsWith("en")) || voices[0];
      }
    }

    if (onVoicesLoaded) {
      onVoicesLoaded(voices);
    }
  };

  loadVoices();

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export function getSelectedTTSVoice(): SpeechSynthesisVoice | null {
  if (!selectedVoice && typeof window !== "undefined" && "speechSynthesis" in window) {
    initializeTTSVoices();
  }
  return selectedVoice;
}

export function getAllTTSVoices(): SpeechSynthesisVoice[] {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
}

export function setCustomTTSVoice(voice: SpeechSynthesisVoice) {
  selectedVoice = voice;
}

/**
 * Preprocesses text before sending to SpeechSynthesis
 * Replaces acronyms like "VSTEP" with phonetic spelling "Vee-step" [vi: step]
 */
export function preprocessTextForTTS(text: string): string {
  if (!text) return "";
  return text
    // Ensure VSTEP is pronounced phonetically as [vi: step] ("Vee-step")
    .replace(/\bVSTEP\b/gi, "Vee-step")
    // Clean up excessive punctuation or markdown tags if any
    .replace(/\*+/g, "")
    .trim();
}

export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis API is not supported in this environment.");
    if (options?.onError) options.onError("SpeechSynthesis not supported.");
    return;
  }

  // Cancel any ongoing speech
  stopSpeaking();

  const formattedText = preprocessTextForTTS(text);
  const utterance = new SpeechSynthesisUtterance(formattedText);
  currentUtterance = utterance;

  const voice = getSelectedTTSVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || "en-GB";
  } else {
    utterance.lang = "en-GB";
  }

  utterance.rate = options?.rate ?? currentSpeechRate; // Configurable speech rate
  utterance.pitch = options?.pitch ?? 1.0;

  utterance.onstart = () => {
    if (options?.onStart) options.onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (options?.onEnd) options.onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (options?.onError) options.onError(e);
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function isSpeaking(): boolean {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
}
