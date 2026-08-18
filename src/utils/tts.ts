/**
 * Comprehensive Text-to-Speech Utility with Multi-Accent & Multi-Gender Voice Presets
 */
import { TTSPresetId, TTSVoiceProfile } from "../types";

export const TTS_VOICE_PROFILES: TTSVoiceProfile[] = [
  {
    id: "en-GB-female",
    label: "British Female (UK RP)",
    flag: "🇬🇧",
    region: "United Kingdom",
    gender: "Female",
    description: "Clear, standard Received Pronunciation British female voice (Exam benchmark).",
    preferredKeywords: [
      "google uk english female",
      "hazel",
      "sonia",
      "serena",
      "victoria",
      "libby",
      "fiona",
      "uk english female",
      "british female"
    ],
    langMatch: "en-gb",
    defaultPitch: 1.02
  },
  {
    id: "en-GB-male",
    label: "British Male (UK Oxford)",
    flag: "🇬🇧",
    region: "United Kingdom",
    gender: "Male",
    description: "Deep, formal British male voice with standard English intonation.",
    preferredKeywords: [
      "google uk english male",
      "george",
      "oliver",
      "daniel",
      "ryan",
      "uk english male",
      "british male"
    ],
    langMatch: "en-gb",
    defaultPitch: 0.92
  },
  {
    id: "en-US-female",
    label: "American Female (US Standard)",
    flag: "🇺🇸",
    region: "United States",
    gender: "Female",
    description: "Natural, contemporary General American female accent.",
    preferredKeywords: [
      "google us english",
      "samantha",
      "victoria",
      "zira",
      "jenny",
      "aria",
      "us english female",
      "american female"
    ],
    langMatch: "en-us",
    defaultPitch: 1.0
  },
  {
    id: "en-US-male",
    label: "American Male (US Standard)",
    flag: "🇺🇸",
    region: "United States",
    gender: "Male",
    description: "Crisp, conversational American male voice.",
    preferredKeywords: [
      "alex",
      "david",
      "guy",
      "mark",
      "google us english male",
      "us english male",
      "american male"
    ],
    langMatch: "en-us",
    defaultPitch: 0.92
  },
  {
    id: "en-AU-female",
    label: "Australian Female (AU)",
    flag: "🇦🇺",
    region: "Australia",
    gender: "Female",
    description: "Friendly Australian female intonation and clear vowel shaping.",
    preferredKeywords: [
      "karen",
      "catherine",
      "natasha",
      "google australian english female",
      "australian female"
    ],
    langMatch: "en-au",
    defaultPitch: 1.02
  },
  {
    id: "en-AU-male",
    label: "Australian Male (AU)",
    flag: "🇦🇺",
    region: "Australia",
    gender: "Male",
    description: "Resonant Australian male voice with natural cadence.",
    preferredKeywords: [
      "russell",
      "lee",
      "google australian english male",
      "australian male"
    ],
    langMatch: "en-au",
    defaultPitch: 0.92
  },
  {
    id: "en-IE",
    label: "Irish English (IE)",
    flag: "🇮🇪",
    region: "Ireland",
    gender: "Female",
    description: "Distinctive Irish lilt with rhythmic cadence.",
    preferredKeywords: [
      "moira",
      "orla",
      "emily",
      "irish",
      "en-ie"
    ],
    langMatch: "en-ie",
    defaultPitch: 1.0
  },
  {
    id: "en-SCOTTISH",
    label: "Scottish English (Scotland)",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    region: "Scotland",
    gender: "Female",
    description: "Traditional Scottish accent with rolled 'r' and melodic flow.",
    preferredKeywords: [
      "fiona",
      "scottish",
      "en-scotland"
    ],
    langMatch: "en-gb",
    defaultPitch: 0.98
  }
];

let selectedPresetId: TTSPresetId = "en-GB-female";
let selectedVoice: SpeechSynthesisVoice | null = null;
let customVoiceURI: string | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentSpeechRate: number = 0.95;
let currentSpeechPitch: number = 1.0;

// Load persisted settings from localStorage if available
if (typeof window !== "undefined") {
  try {
    const savedRate = localStorage.getItem("vstep_tts_rate");
    if (savedRate) {
      const parsed = parseFloat(savedRate);
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 2.0) {
        currentSpeechRate = parsed;
      }
    }

    const savedPitch = localStorage.getItem("vstep_tts_pitch");
    if (savedPitch) {
      const parsed = parseFloat(savedPitch);
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 1.5) {
        currentSpeechPitch = parsed;
      }
    }

    const savedPreset = localStorage.getItem("vstep_tts_preset");
    if (savedPreset && (TTS_VOICE_PROFILES.some((p) => p.id === savedPreset) || savedPreset === "custom")) {
      selectedPresetId = savedPreset as TTSPresetId;
    }

    const savedVoiceURI = localStorage.getItem("vstep_tts_custom_uri");
    if (savedVoiceURI) {
      customVoiceURI = savedVoiceURI;
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

export function getSpeechPitch(): number {
  return currentSpeechPitch;
}

export function setSpeechPitch(pitch: number) {
  currentSpeechPitch = pitch;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("vstep_tts_pitch", pitch.toString());
    } catch {
      // Ignore
    }
  }
}

export function getCurrentPresetId(): TTSPresetId {
  return selectedPresetId;
}

export function getCurrentProfile(): TTSVoiceProfile {
  const found = TTS_VOICE_PROFILES.find((p) => p.id === selectedPresetId);
  return (
    found ||
    TTS_VOICE_PROFILES[0]
  );
}

/**
 * Finds the best matching native browser voice for a given profile
 */
function findVoiceForProfile(profile: TTSVoiceProfile, allVoices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!allVoices || allVoices.length === 0) return null;

  const targetLang = profile.langMatch.toLowerCase();

  // 1. Try to match preferred keywords within the specific language
  for (const kw of profile.preferredKeywords) {
    const matched = allVoices.find(
      (v) =>
        (v.lang.toLowerCase() === targetLang || v.lang.toLowerCase().startsWith(targetLang.replace("-", "_"))) &&
        v.name.toLowerCase().includes(kw)
    );
    if (matched) return matched;
  }

  // 2. Try to match preferred keywords in ANY English voice
  for (const kw of profile.preferredKeywords) {
    const matched = allVoices.find(
      (v) => v.lang.toLowerCase().startsWith("en") && v.name.toLowerCase().includes(kw)
    );
    if (matched) return matched;
  }

  // 3. Match by gender keyword in language if requested
  if (profile.gender === "Female") {
    const femaleVoice = allVoices.find(
      (v) =>
        (v.lang.toLowerCase() === targetLang || v.lang.toLowerCase().startsWith(targetLang.slice(0, 2))) &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("woman") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("hazel") ||
          v.name.toLowerCase().includes("victoria"))
    );
    if (femaleVoice) return femaleVoice;
  } else if (profile.gender === "Male") {
    const maleVoice = allVoices.find(
      (v) =>
        (v.lang.toLowerCase() === targetLang || v.lang.toLowerCase().startsWith(targetLang.slice(0, 2))) &&
        (v.name.toLowerCase().includes("male") ||
          v.name.toLowerCase().includes("man") ||
          v.name.toLowerCase().includes("george") ||
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("alex") ||
          v.name.toLowerCase().includes("daniel"))
    );
    if (maleVoice) return maleVoice;
  }

  // 4. Exact language match
  const exactLang = allVoices.find(
    (v) => v.lang.toLowerCase() === targetLang || v.lang.toLowerCase().startsWith(targetLang.replace("-", "_"))
  );
  if (exactLang) return exactLang;

  // 5. Any English voice
  const anyEnglish = allVoices.find((v) => v.lang.toLowerCase().startsWith("en"));
  return anyEnglish || allVoices[0] || null;
}

export function initializeTTSVoices(onVoicesLoaded?: (voices: SpeechSynthesisVoice[]) => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return;

    // If custom voice URI is stored
    if (customVoiceURI) {
      const customMatch = voices.find((v) => v.voiceURI === customVoiceURI || v.name === customVoiceURI);
      if (customMatch) {
        selectedVoice = customMatch;
        selectedPresetId = "custom";
      }
    }

    if (!selectedVoice || selectedPresetId !== "custom") {
      const profile = getCurrentProfile();
      selectedVoice = findVoiceForProfile(profile, voices);
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

export function setVoicePreset(presetId: TTSPresetId, customPitch?: number) {
  selectedPresetId = presetId;
  customVoiceURI = null;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("vstep_tts_preset", presetId);
      localStorage.removeItem("vstep_tts_custom_uri");
    } catch {
      // Ignore
    }
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const voices = window.speechSynthesis.getVoices();
    const profile = TTS_VOICE_PROFILES.find((p) => p.id === presetId);
    if (profile) {
      selectedVoice = findVoiceForProfile(profile, voices);
      if (customPitch !== undefined) {
        setSpeechPitch(customPitch);
      } else {
        setSpeechPitch(profile.defaultPitch);
      }
    }
  }
}

export function setCustomTTSVoice(voice: SpeechSynthesisVoice) {
  selectedVoice = voice;
  selectedPresetId = "custom";
  customVoiceURI = voice.voiceURI || voice.name;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("vstep_tts_preset", "custom");
      localStorage.setItem("vstep_tts_custom_uri", customVoiceURI);
    } catch {
      // Ignore
    }
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
    voice?: SpeechSynthesisVoice | null;
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

  const activeVoice = options?.voice ?? getSelectedTTSVoice();
  if (activeVoice) {
    utterance.voice = activeVoice;
    utterance.lang = activeVoice.lang || "en-GB";
  } else {
    utterance.lang = "en-GB";
  }

  utterance.rate = options?.rate ?? currentSpeechRate;
  utterance.pitch = options?.pitch ?? currentSpeechPitch;

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

/**
 * Plays a short preview phrase with the current or specified voice setup
 */
export function previewVoiceSample(
  presetId?: TTSPresetId,
  customVoice?: SpeechSynthesisVoice,
  customRate?: number,
  customPitch?: number
) {
  const samplePhrase = "Hello! This is a VSTEP speaking test model answer spoken in this voice.";
  let voiceToUse: SpeechSynthesisVoice | null = customVoice || null;
  let pitchToUse: number = customPitch ?? currentSpeechPitch;
  let rateToUse: number = customRate ?? currentSpeechRate;

  if (presetId && presetId !== "custom" && !customVoice) {
    const profile = TTS_VOICE_PROFILES.find((p) => p.id === presetId);
    if (profile && typeof window !== "undefined" && "speechSynthesis" in window) {
      const all = window.speechSynthesis.getVoices();
      voiceToUse = findVoiceForProfile(profile, all);
      pitchToUse = customPitch ?? profile.defaultPitch;
    }
  }

  speakText(samplePhrase, {
    voice: voiceToUse,
    pitch: pitchToUse,
    rate: rateToUse
  });
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
