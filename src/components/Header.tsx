import React from "react";
import { AppMode, QuestionSet, AppTheme } from "../types";
import { QUESTION_SETS } from "../data/questionSets";
import { downloadFullQuestionBank } from "../utils/export";
import { THEMES } from "../utils/theme";
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
  Gauge
} from "lucide-react";

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  selectedSet: QuestionSet;
  onSelectSet: (set: QuestionSet) => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  ttsVoiceName?: string;
  speechRate: number;
  onSelectSpeechRate: (rate: number) => void;
  onOpenAudioTool: () => void;
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
  speechRate,
  onSelectSpeechRate,
  onOpenAudioTool,
  onShowInstructions
}) => {
  const theme = THEMES[currentTheme] || THEMES.midnight;

  return (
    <header className={`${theme.headerBg} text-white border-b ${theme.headerBorder} sticky top-0 z-40 shadow-md transition-colors duration-200`}>
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
                  <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-white leading-tight">
                    VSTEP Speaking Part 1
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] sm:text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 rounded-full flex items-center gap-1 flex-shrink-0">
                    <Award className="w-3 h-3 text-indigo-400" /> B2 Target
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-400 truncate max-w-[220px] sm:max-w-none">
                  Social Interaction Simulator • British Female Voice
                </p>
              </div>
            </div>

            {/* Quick Instructions info on mobile */}
            <button
              onClick={onShowInstructions}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition md:hidden"
              title="View Test Instructions"
            >
              <Info className="w-5 h-5" />
            </button>
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
              className="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold cursor-pointer max-w-[140px] sm:max-w-none truncate"
            >
              {QUESTION_SETS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-slate-800/90 p-0.5 sm:p-1 rounded-lg border border-slate-700/80">
              <button
                onClick={() => onSelectMode("test")}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                  currentMode === "test"
                    ? "bg-rose-600 text-white shadow-xs"
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
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Practice</span>
              </button>
            </div>

            {/* Theme Selector Button & Dropdown */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs rounded-lg px-2 py-1 space-x-1">
              <Palette className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <select
                value={currentTheme}
                onChange={(e) => onSelectTheme(e.target.value as AppTheme)}
                className="bg-transparent border-none text-slate-200 text-xs focus:outline-none font-semibold cursor-pointer pr-1"
                title="Select Visual Theme"
              >
                <option value="midnight" className="bg-slate-900 text-slate-100">Midnight</option>
                <option value="light" className="bg-slate-900 text-slate-100">Academy Light</option>
                <option value="emerald" className="bg-slate-900 text-slate-100">Emerald Zen</option>
                <option value="sunset" className="bg-slate-900 text-slate-100">Sunset</option>
              </select>
            </div>

            {/* TTS Voice Speed Selector */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs rounded-lg px-2 py-1 space-x-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <select
                value={speechRate}
                onChange={(e) => onSelectSpeechRate(parseFloat(e.target.value))}
                className="bg-transparent border-none text-slate-200 text-xs focus:outline-none font-semibold cursor-pointer pr-1"
                title="Adjust TTS Speech Speed"
              >
                <option value="0.75" className="bg-slate-900 text-slate-100">0.75x (Slow)</option>
                <option value="0.85" className="bg-slate-900 text-slate-100">0.85x (Relaxed)</option>
                <option value="0.95" className="bg-slate-900 text-slate-100">0.95x (Exam Normal)</option>
                <option value="1.0" className="bg-slate-900 text-slate-100">1.0x (Standard)</option>
                <option value="1.15" className="bg-slate-900 text-slate-100">1.15x (Brisk)</option>
                <option value="1.25" className="bg-slate-900 text-slate-100">1.25x (Fast)</option>
              </select>
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => downloadFullQuestionBank(QUESTION_SETS)}
                className="px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700/80 rounded-lg text-xs font-medium transition flex items-center gap-1"
                title="Download full question bank (.txt)"
              >
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Questions</span>
              </button>

              <button
                onClick={onOpenAudioTool}
                className="px-2.5 py-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-slate-700/80 rounded-lg text-xs font-medium transition flex items-center gap-1"
                title="Audio Downloader Tool"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Audio Tool</span>
              </button>

              <button
                onClick={onShowInstructions}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-lg transition hidden md:block"
                title="View Test Instructions"
              >
                <Info className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sub-bar showing TTS Voice & Speed & Theme status */}
        <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-1.5">
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                Voice: <strong className="text-indigo-300">{ttsVoiceName || "Female British (en-GB)"}</strong>
              </span>
            </div>

            <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/60">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>Speed:</span>
              <div className="flex items-center space-x-1">
                {[0.75, 0.95, 1.0, 1.15].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => onSelectSpeechRate(rate)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition ${
                      Math.abs(speechRate - rate) < 0.01
                        ? "bg-cyan-600 text-white shadow-xs"
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
            <span className="hidden sm:flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Theme: <strong className="text-amber-300 capitalize">{theme.name}</strong>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>1-Click Export (.txt + .wav)</span>
          </div>
        </div>
      </div>
    </header>
  );
};
