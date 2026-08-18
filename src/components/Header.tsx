import React from "react";
import { AppMode, QuestionSet, AppTheme, TTSPresetId } from "../types";
import { QUESTION_SETS } from "../data/questionSets";
import { downloadFullQuestionBank } from "../utils/export";
import { THEMES } from "../utils/theme";
import { TTS_VOICE_PROFILES } from "../utils/tts";
import {
  Mic,
  BookOpen,
  Volume2,
  Download,
  Info,
  Award,
  Sparkles,
  FileText,
  Palette,
  Gauge,
  Sun,
  Moon,
  Sliders
} from "lucide-react";

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  selectedSet: QuestionSet;
  onSelectSet: (set: QuestionSet) => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  ttsVoiceName?: string;
  currentPresetId?: TTSPresetId;
  onSelectVoicePreset?: (presetId: TTSPresetId) => void;
  speechRate: number;
  onSelectSpeechRate: (rate: number) => void;
  onOpenAudioTool: () => void;
  onOpenVoiceSettings: () => void;
  onShowInstructions: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  selectedSet,
  onSelectSet,
  currentTheme,
  onSelectTheme,
  ttsVoiceName,
  currentPresetId = "en-GB-female",
  onSelectVoicePreset,
  speechRate,
  onSelectSpeechRate,
  onOpenAudioTool,
  onOpenVoiceSettings,
  onShowInstructions
}) => {
  const theme = THEMES[currentTheme] || THEMES.light;
  const isLight = theme.category === "light";

  // Toggle between default light and dark
  const handleToggleLightDark = () => {
    if (isLight) {
      onSelectTheme("midnight");
    } else {
      onSelectTheme("light");
    }
  };

  return (
    <header className={`${theme.headerBg} ${theme.textPrimary} border-b ${theme.headerBorder} sticky top-0 z-40 shadow-sm transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          
          {/* Top Row on Mobile: Logo & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-indigo-500/20 flex-shrink-0">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <h1 className={`text-base sm:text-xl font-extrabold tracking-tight ${theme.textPrimary} leading-tight`}>
                    VSTEP Speaking Part 1
                  </h1>
                  <span className={`px-2 py-0.5 text-[10px] sm:text-xs font-semibold ${isLight ? "bg-blue-100 text-blue-800 border border-blue-200" : "bg-indigo-500/20 border border-indigo-400/30 text-indigo-300"} rounded-full flex items-center gap-1 flex-shrink-0`}>
                    <Award className="w-3 h-3 text-indigo-500" /> B2 Target
                  </span>
                </div>
                <p className={`text-[11px] sm:text-xs ${theme.textMuted} truncate max-w-[220px] sm:max-w-none`}>
                  VSTEP [viː step] • Social Interaction Simulator • Multi-Accent Voices
                </p>
              </div>
            </div>

            {/* Quick Actions on mobile: Theme Toggle + Voice + Instructions */}
            <div className="flex items-center space-x-1 md:hidden">
              <button
                onClick={onOpenVoiceSettings}
                className={`p-1.5 rounded-lg transition ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-slate-800"}`}
                title="Open Voice Settings"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={handleToggleLightDark}
                className={`p-1.5 rounded-lg transition ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-slate-800"}`}
                title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
              >
                {isLight ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
              </button>
              <button
                onClick={onShowInstructions}
                className={`p-1.5 rounded-lg transition ${isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-slate-800"}`}
                title="View Test Instructions"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Question Set Selector */}
            <select
              value={selectedSet.id}
              onChange={(e) => {
                const setObj = QUESTION_SETS.find((s) => s.id === e.target.value);
                if (setObj) onSelectSet(setObj);
              }}
              className={`${isLight ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200/70" : "bg-slate-800/90 border-slate-700/80 text-slate-200"} border text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold cursor-pointer max-w-[140px] sm:max-w-none truncate transition`}
            >
              {QUESTION_SETS.map((s) => (
                <option key={s.id} value={s.id} className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  {s.title}
                </option>
              ))}
            </select>

            {/* Mode Switcher Tabs */}
            <div className={`flex items-center p-0.5 sm:p-1 rounded-lg border ${isLight ? "bg-slate-100 border-slate-300" : "bg-slate-800/90 border-slate-700/80"}`}>
              <button
                onClick={() => onSelectMode("test")}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  currentMode === "test"
                    ? "bg-rose-600 text-white shadow-xs"
                    : isLight
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Test Mode</span>
              </button>

              <button
                onClick={() => onSelectMode("practice")}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  currentMode === "practice"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : isLight
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-200"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practice</span>
              </button>
            </div>

            {/* TTS Voice Accent Selector */}
            <div className={`flex items-center border text-xs rounded-lg px-2 py-1 space-x-1 ${isLight ? "bg-slate-100 border-slate-300 text-slate-800" : "bg-slate-800/90 border-slate-700/80 text-slate-200"}`}>
              <Volume2 className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? "text-indigo-600" : "text-indigo-400"}`} />
              <select
                value={currentPresetId}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "modal") {
                    onOpenVoiceSettings();
                  } else if (onSelectVoicePreset) {
                    onSelectVoicePreset(val as TTSPresetId);
                  }
                }}
                className={`bg-transparent border-none text-xs focus:outline-none font-semibold cursor-pointer pr-1 max-w-[130px] sm:max-w-[150px] truncate ${isLight ? "text-slate-800" : "text-slate-200"}`}
                title="Select TTS Voice Accent & Gender"
              >
                <optgroup label="British Accents (UK)" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  <option value="en-GB-female">🇬🇧 British Female (RP)</option>
                  <option value="en-GB-male">🇬🇧 British Male (Oxford)</option>
                </optgroup>
                <optgroup label="American Accents (US)" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  <option value="en-US-female">🇺🇸 American Female</option>
                  <option value="en-US-male">🇺🇸 American Male</option>
                </optgroup>
                <optgroup label="Global English Accents" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  <option value="en-AU-female">🇦🇺 Australian Female</option>
                  <option value="en-AU-male">🇦🇺 Australian Male</option>
                  <option value="en-IE">🇮🇪 Irish English</option>
                  <option value="en-SCOTTISH">🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scottish English</option>
                </optgroup>
                <option value="modal" className={isLight ? "bg-white text-blue-700 font-bold" : "bg-slate-900 text-blue-300 font-bold"}>
                  ⚙️ Voice Studio & All Voices...
                </option>
              </select>
              <button
                onClick={onOpenVoiceSettings}
                className={`p-1 rounded hover:bg-slate-200/60 transition ${isLight ? "text-slate-600" : "text-slate-300"}`}
                title="Configure voice pitch, custom voice, and test preview"
              >
                <Sliders className="w-3 h-3" />
              </button>
            </div>

            {/* TTS Voice Speed Selector */}
            <div className={`flex items-center border text-xs rounded-lg px-2 py-1 space-x-1 ${isLight ? "bg-slate-100 border-slate-300 text-slate-800" : "bg-slate-800/90 border-slate-700/80 text-slate-200"}`}>
              <Gauge className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? "text-cyan-600" : "text-cyan-400"}`} />
              <select
                value={speechRate}
                onChange={(e) => onSelectSpeechRate(parseFloat(e.target.value))}
                className={`bg-transparent border-none text-xs focus:outline-none font-semibold cursor-pointer pr-1 ${isLight ? "text-slate-800" : "text-slate-200"}`}
                title="Adjust TTS Speech Speed"
              >
                <option value="0.75" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>0.75x (Slow)</option>
                <option value="0.85" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>0.85x (Relaxed)</option>
                <option value="0.95" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>0.95x (Exam Normal)</option>
                <option value="1.0" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>1.0x (Standard)</option>
                <option value="1.15" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>1.15x (Brisk)</option>
                <option value="1.25" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>1.25x (Fast)</option>
              </select>
            </div>

            {/* Quick Light/Dark Toggle Button */}
            <button
              onClick={handleToggleLightDark}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-xs font-semibold transition flex items-center gap-1.5 ${
                isLight
                  ? "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200"
                  : "bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-700"
              }`}
              title={isLight ? "Switch to Dark Mode (Midnight)" : "Switch to Light Mode (Academy Light)"}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden lg:inline">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden lg:inline">Light</span>
                </>
              )}
            </button>

            {/* Theme Selector Dropdown */}
            <div className={`flex items-center border text-xs rounded-lg px-2 py-1 space-x-1 ${isLight ? "bg-slate-100 border-slate-300 text-slate-800" : "bg-slate-800/90 border-slate-700/80 text-slate-200"}`}>
              <Palette className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? "text-blue-600" : "text-amber-400"}`} />
              <select
                value={currentTheme}
                onChange={(e) => onSelectTheme(e.target.value as AppTheme)}
                className={`bg-transparent border-none text-xs focus:outline-none font-semibold cursor-pointer pr-1 ${isLight ? "text-slate-800" : "text-slate-200"}`}
                title="Select Visual Theme"
              >
                <optgroup label="Light Themes (Nền Sáng)" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  <option value="light">☀️ Academy Light (Classic)</option>
                  <option value="ivory">📜 Warm Ivory (Parchment)</option>
                  <option value="nordic">❄️ Nordic Frost (Clean Ice)</option>
                </optgroup>
                <optgroup label="Dark Themes (Nền Tối)" className={isLight ? "bg-white text-slate-900" : "bg-slate-900 text-slate-100"}>
                  <option value="midnight">🌙 Midnight Dark (Indigo)</option>
                  <option value="emerald">🌲 Emerald Zen (Forest)</option>
                  <option value="sunset">🌅 Sunset Twilight (Amber)</option>
                </optgroup>
              </select>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => downloadFullQuestionBank(QUESTION_SETS)}
                className={`px-2.5 py-1.5 border rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                  isLight
                    ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900"
                    : "bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border-slate-700/80"
                }`}
                title="Download full question bank (.txt)"
              >
                <FileText className={`w-3.5 h-3.5 ${isLight ? "text-blue-600" : "text-blue-400"}`} />
                <span className="hidden sm:inline">Questions</span>
              </button>

              <button
                onClick={onOpenAudioTool}
                className={`px-2.5 py-1.5 border rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                  isLight
                    ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700 hover:text-slate-900"
                    : "bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border-slate-700/80"
                }`}
                title="Audio Downloader Tool"
              >
                <Download className={`w-3.5 h-3.5 ${isLight ? "text-emerald-600" : "text-emerald-400"}`} />
                <span className="hidden sm:inline">Audio Tool</span>
              </button>

              <button
                onClick={onShowInstructions}
                className={`p-1.5 rounded-lg transition hidden md:block ${
                  isLight
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
                title="View Test Instructions"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar showing TTS Voice & Speed & Theme status */}
        <div className={`mt-2 pt-2 border-t ${theme.headerBorder} flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs ${theme.textMuted}`}>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={onOpenVoiceSettings}
              className={`flex items-center space-x-1.5 hover:underline cursor-pointer group`}
              title="Click to open TTS Voice Studio"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isLight ? "text-indigo-600" : "text-indigo-400"}`} />
              <span>
                Active Voice: <strong className={isLight ? "text-indigo-700 font-bold group-hover:text-indigo-900" : "text-indigo-300 font-bold group-hover:text-indigo-100"}>
                  {ttsVoiceName || "British Female (UK RP)"}
                </strong>
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold border ${isLight ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-indigo-950/40 border-indigo-700/40 text-indigo-300"}`}>
                Change ▾
              </span>
            </button>

            <div className={`flex items-center space-x-1.5 px-2 py-0.5 rounded-md border ${isLight ? "bg-slate-100 border-slate-300" : "bg-slate-800/80 border-slate-700/60"}`}>
              <Gauge className={`w-3 h-3 ${isLight ? "text-cyan-700" : "text-cyan-400"}`} />
              <span>Speed:</span>
              <div className="flex items-center space-x-1">
                {[0.75, 0.95, 1.0, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onSelectSpeechRate(rate)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                      Math.abs(speechRate - rate) < 0.01
                        ? "bg-cyan-600 text-white shadow-xs"
                        : isLight
                        ? "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`hidden sm:flex items-center gap-1 ${theme.textMuted}`}>
              <Sparkles className="w-3 h-3 text-amber-500" />
              Theme: <strong className={`${isLight ? "text-amber-700" : "text-amber-300"} capitalize`}>{theme.name}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>1-Click Export (.txt + .wav)</span>
          </div>
        </div>
      </div>
    </header>
  );
};

