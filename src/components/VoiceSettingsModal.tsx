import React, { useState, useEffect } from "react";
import { AppTheme, TTSPresetId } from "../types";
import { THEMES } from "../utils/theme";
import {
  TTS_VOICE_PROFILES,
  getCurrentPresetId,
  setVoicePreset,
  getAllTTSVoices,
  setCustomTTSVoice,
  getSelectedTTSVoice,
  getSpeechRate,
  setSpeechRate,
  getSpeechPitch,
  setSpeechPitch,
  previewVoiceSample,
  stopSpeaking,
  isSpeaking
} from "../utils/tts";
import {
  Volume2,
  Play,
  Square,
  Check,
  Globe,
  Sliders,
  Sparkles,
  X,
  Search,
  RotateCcw
} from "lucide-react";

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppTheme;
  onVoiceChanged?: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onVoiceChanged
}) => {
  const theme = THEMES[currentTheme] || THEMES.light;
  const isLight = theme.category === "light";

  const [activeTab, setActiveTab] = useState<"curated" | "all">("curated");
  const [selectedPreset, setSelectedPreset] = useState<TTSPresetId>(getCurrentPresetId());
  const [allVoices, setAllVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [activeVoiceURI, setActiveVoiceURI] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [speed, setSpeed] = useState<number>(getSpeechRate());
  const [pitch, setPitch] = useState<number>(getSpeechPitch());
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [previewingId, setPreviewingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const voices = getAllTTSVoices();
      setAllVoices(voices);
      const current = getSelectedTTSVoice();
      if (current) {
        setActiveVoiceURI(current.voiceURI || current.name);
      }
      setSelectedPreset(getCurrentPresetId());
      setSpeed(getSpeechRate());
      setPitch(getSpeechPitch());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPreset = (presetId: TTSPresetId) => {
    setSelectedPreset(presetId);
    setVoicePreset(presetId);
    const profile = TTS_VOICE_PROFILES.find((p) => p.id === presetId);
    if (profile) {
      setPitch(profile.defaultPitch);
    }
    const current = getSelectedTTSVoice();
    if (current) {
      setActiveVoiceURI(current.voiceURI || current.name);
    }
    if (onVoiceChanged) onVoiceChanged();
  };

  const handleSelectCustomVoice = (voice: SpeechSynthesisVoice) => {
    setCustomTTSVoice(voice);
    setSelectedPreset("custom");
    setActiveVoiceURI(voice.voiceURI || voice.name);
    if (onVoiceChanged) onVoiceChanged();
  };

  const handlePlayPreview = (presetId?: TTSPresetId, voice?: SpeechSynthesisVoice) => {
    if (isPlayingPreview) {
      stopSpeaking();
      setIsPlayingPreview(false);
      setPreviewingId(null);
      return;
    }

    const idKey = presetId || voice?.voiceURI || voice?.name || "current";
    setPreviewingId(idKey);
    setIsPlayingPreview(true);

    previewVoiceSample(presetId, voice, speed, pitch);

    // Watch for speaking state finish
    const checkInterval = setInterval(() => {
      if (!isSpeaking()) {
        setIsPlayingPreview(false);
        setPreviewingId(null);
        clearInterval(checkInterval);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(checkInterval);
      setIsPlayingPreview(false);
      setPreviewingId(null);
    }, 6000);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    setSpeechRate(newSpeed);
    if (onVoiceChanged) onVoiceChanged();
  };

  const handlePitchChange = (newPitch: number) => {
    setPitch(newPitch);
    setSpeechPitch(newPitch);
    if (onVoiceChanged) onVoiceChanged();
  };

  const handleResetDefaults = () => {
    handleSelectPreset("en-GB-female");
    handleSpeedChange(0.95);
    handlePitchChange(1.02);
  };

  const filteredCustomVoices = allVoices.filter((v) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.lang.toLowerCase().includes(q);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative ${theme.textPrimary} max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 shrink-0" style={{ borderColor: isLight ? "#e2e8f0" : "#334155" }}>
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${isLight ? "bg-indigo-50 text-indigo-600 border border-indigo-200" : "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400"}`}>
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className={`text-lg sm:text-xl font-bold ${theme.textPrimary}`}>TTS Voice & Accent Studio</h2>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  British / American / Global
                </span>
              </div>
              <p className={`text-xs ${theme.textMuted}`}>
                Choose from authentic English accents, test voices instantly, and fine-tune playback speed and pitch.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition ${isLight ? "text-slate-500 hover:text-slate-900 hover:bg-slate-100" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Speed & Pitch Control Bar */}
        <div className={`my-4 p-3.5 rounded-xl border ${theme.subCardBg} ${theme.subCardBorder} shrink-0`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Speed Control */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${theme.textSecondary}`}>
                  <Sliders className="w-3.5 h-3.5 text-blue-500" />
                  Speech Speed: <strong className={isLight ? "text-blue-700" : "text-blue-300"}>{speed.toFixed(2)}x</strong>
                </span>
                <span className={`text-[11px] ${theme.textMuted}`}>
                  {speed < 0.85 ? "Slow Practice" : speed <= 1.0 ? "Exam Standard" : "Brisk"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.70"
                  max="1.30"
                  step="0.05"
                  value={speed}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Pitch Control */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={`flex items-center gap-1.5 ${theme.textSecondary}`}>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  Voice Pitch: <strong className={isLight ? "text-indigo-700" : "text-indigo-300"}>{pitch.toFixed(2)}x</strong>
                </span>
                <span className={`text-[11px] ${theme.textMuted}`}>
                  {pitch < 0.95 ? "Deep Tone" : pitch > 1.05 ? "High Clarity" : "Natural"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0.75"
                  max="1.25"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Reset Defaults */}
            <button
              onClick={handleResetDefaults}
              className={`p-2 rounded-lg border text-xs font-medium transition flex items-center gap-1 self-end sm:self-center shrink-0 ${
                isLight
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300"
              }`}
              title="Reset to British Female (0.95x speed, 1.02 pitch)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Default</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center space-x-2 border-b pb-2 shrink-0" style={{ borderColor: isLight ? "#e2e8f0" : "#334155" }}>
          <button
            onClick={() => setActiveTab("curated")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "curated"
                ? "bg-blue-600 text-white shadow-xs"
                : isLight
                ? "text-slate-600 hover:bg-slate-100"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Accent Presets ({TTS_VOICE_PROFILES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === "all"
                ? "bg-blue-600 text-white shadow-xs"
                : isLight
                ? "text-slate-600 hover:bg-slate-100"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>All System Voices ({allVoices.length})</span>
          </button>
        </div>

        {/* Main Voice List Content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
          {activeTab === "curated" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TTS_VOICE_PROFILES.map((profile) => {
                const isSelected = selectedPreset === profile.id;
                const isThisPlaying = isPlayingPreview && previewingId === profile.id;

                return (
                  <div
                    key={profile.id}
                    onClick={() => handleSelectPreset(profile.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between gap-2.5 relative ${
                      isSelected
                        ? isLight
                          ? "bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                          : "bg-blue-950/40 border-blue-400 ring-2 ring-blue-500/30 shadow-xs"
                        : isLight
                        ? "bg-white hover:bg-slate-50 border-slate-200"
                        : "bg-slate-800/60 hover:bg-slate-800 border-slate-700/80"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2.5">
                        <span className="text-2xl select-none" role="img" aria-label={profile.region}>
                          {profile.flag}
                        </span>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <h4 className={`text-xs sm:text-sm font-bold ${theme.textPrimary}`}>{profile.label}</h4>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                              profile.gender === "Female"
                                ? isLight ? "bg-pink-50 text-pink-700 border-pink-200" : "bg-pink-950/40 text-pink-300 border-pink-700/40"
                                : isLight ? "bg-sky-50 text-sky-700 border-sky-200" : "bg-sky-950/40 text-sky-300 border-sky-700/40"
                            }`}>
                              {profile.gender}
                            </span>
                          </div>
                          <p className={`text-[11px] ${theme.textMuted} mt-0.5 line-clamp-2`}>
                            {profile.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Preview Button */}
                    <div className="flex items-center justify-between pt-1 border-t border-dashed" style={{ borderColor: isLight ? "#e2e8f0" : "#334155" }}>
                      <span className={`text-[10px] font-medium ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                        Region: {profile.region}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPreview(profile.id);
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1 ${
                          isThisPlaying
                            ? "bg-rose-600 text-white shadow-xs"
                            : isLight
                            ? "bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200"
                            : "bg-slate-700 hover:bg-blue-600 hover:text-white text-slate-200"
                        }`}
                        title="Listen to sample audio"
                      >
                        {isThisPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                        <span>{isThisPlaying ? "Stop" : "Test Voice"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${isLight ? "text-slate-400" : "text-slate-500"}`} />
                <input
                  type="text"
                  placeholder="Search voices by name or language code (e.g. British, Samantha, en-GB)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isLight ? "bg-white border-slate-300 text-slate-900" : "bg-slate-800 border-slate-700 text-slate-100"
                  }`}
                />
              </div>

              {/* Voice Items */}
              <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
                {filteredCustomVoices.length === 0 ? (
                  <p className={`text-center py-6 text-xs ${theme.textMuted}`}>No matching voices found.</p>
                ) : (
                  filteredCustomVoices.map((voice) => {
                    const isSelected = activeVoiceURI === (voice.voiceURI || voice.name);
                    const isThisPlaying = isPlayingPreview && previewingId === (voice.voiceURI || voice.name);

                    return (
                      <div
                        key={voice.voiceURI || voice.name}
                        onClick={() => handleSelectCustomVoice(voice)}
                        className={`p-2.5 rounded-lg border cursor-pointer transition flex items-center justify-between gap-2 ${
                          isSelected
                            ? isLight
                              ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-900"
                              : "bg-blue-950/50 border-blue-400 ring-1 ring-blue-400 text-blue-200"
                            : isLight
                            ? "bg-white hover:bg-slate-50 border-slate-200 text-slate-800"
                            : "bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            isSelected ? "bg-blue-600 text-white" : isLight ? "bg-slate-100 text-slate-600" : "bg-slate-700 text-slate-300"
                          }`}>
                            {voice.lang.slice(0, 2).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold truncate">{voice.name}</p>
                            <p className={`text-[10px] ${theme.textMuted}`}>{voice.lang} • {voice.localService ? "Local Native" : "Online Natural"}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {isSelected && <Check className="w-4 h-4 text-blue-600 stroke-[3]" />}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayPreview(undefined, voice);
                            }}
                            className={`p-1.5 rounded-md text-xs font-medium transition ${
                              isThisPlaying
                                ? "bg-rose-600 text-white"
                                : isLight
                                ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                                : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                            }`}
                            title="Test voice audio"
                          >
                            {isThisPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t flex items-center justify-between shrink-0" style={{ borderColor: isLight ? "#e2e8f0" : "#334155" }}>
          <div className="flex items-center space-x-1.5 text-[11px]">
            <span className={theme.textMuted}>Active Voice:</span>
            <strong className={isLight ? "text-blue-700 font-bold" : "text-blue-300 font-bold"}>
              {allVoices.find((v) => (v.voiceURI || v.name) === activeVoiceURI)?.name || "British Female (en-GB)"}
            </strong>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
