import React, { useState, useEffect } from "react";
import { AppMode, QuestionSet, TestResult, AppTheme } from "./types";
import { QUESTION_SETS } from "./data/questionSets";
import { initializeTTSVoices, getSelectedTTSVoice, getSpeechRate, setSpeechRate } from "./utils/tts";
import { THEMES } from "./utils/theme";
import { Header } from "./components/Header";
import { InstructionsModal } from "./components/InstructionsModal";
import { TestModeView } from "./components/TestModeView";
import { PracticeModeView } from "./components/PracticeModeView";
import { ResultsView } from "./components/ResultsView";
import { AudioMergerModal } from "./components/AudioMergerModal";

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>("instructions");
  const [selectedSet, setSelectedSet] = useState<QuestionSet>(QUESTION_SETS[0]);
  const [currentTheme, setCurrentTheme] = useState<AppTheme>("midnight");
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(true);
  const [isAudioToolOpen, setIsAudioToolOpen] = useState<boolean>(false);
  const [voiceName, setVoiceName] = useState<string>("Female British (en-GB)");
  const [speechRate, setSpeechRateState] = useState<number>(getSpeechRate());

  const theme = THEMES[currentTheme] || THEMES.midnight;

  const handleSelectSpeechRate = (rate: number) => {
    setSpeechRate(rate);
    setSpeechRateState(rate);
  };

  // Initialize Speech Synthesis Voices
  useEffect(() => {
    initializeTTSVoices((voices) => {
      const selected = getSelectedTTSVoice();
      if (selected) {
        setVoiceName(selected.name);
      }
    });
  }, []);

  // Handle Mode Switch
  const handleSelectMode = (mode: AppMode) => {
    if (mode === "instructions") {
      setIsInstructionsOpen(true);
    } else {
      setIsInstructionsOpen(false);
      setCurrentMode(mode);
    }
  };

  // When Test finishes
  const handleFinishTest = (result: TestResult) => {
    setTestResult(result);
    setCurrentMode("results");
  };

  // When Practice finishes
  const handleFinishPractice = (result: TestResult) => {
    setTestResult(result);
    setCurrentMode("results");
  };

  return (
    <div className={`min-h-screen ${theme.canvasBg} flex flex-col font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white`}>
      {/* Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        selectedSet={selectedSet}
        onSelectSet={(set) => {
          setSelectedSet(set);
          setTestResult(null);
        }}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        ttsVoiceName={voiceName}
        speechRate={speechRate}
        onSelectSpeechRate={handleSelectSpeechRate}
        onOpenAudioTool={() => setIsAudioToolOpen(true)}
        onShowInstructions={() => setIsInstructionsOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {currentMode === "test" && (
          <TestModeView
            questionSet={selectedSet}
            onFinishTest={handleFinishTest}
            currentTheme={currentTheme}
          />
        )}

        {currentMode === "practice" && (
          <PracticeModeView
            questionSet={selectedSet}
            onFinishPractice={handleFinishPractice}
            currentTheme={currentTheme}
          />
        )}

        {currentMode === "results" && testResult && (
          <ResultsView
            testResult={testResult}
            questionSet={selectedSet}
            onRetake={() => setCurrentMode("test")}
            onOpenAudioTool={() => setIsAudioToolOpen(true)}
          />
        )}

        {/* Fallback Home Banner when in instructions mode */}
        {currentMode === "instructions" && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              VSTEP Speaking Part 1 Simulator
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Master VSTEP Speaking Social Interaction
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Target B2 Band (6.0 - 8.0) with real-time 3-minute timed tests, bilingual English & Vietnamese guides, female British TTS voice model answers, and combined single-file audio export.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setIsInstructionsOpen(false);
                  setCurrentMode("test");
                }}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-rose-600/30 transition hover:scale-[1.02]"
              >
                Start Test Mode (3-Min Timed)
              </button>
              <button
                onClick={() => {
                  setIsInstructionsOpen(false);
                  setCurrentMode("practice");
                }}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30 transition hover:scale-[1.02]"
              >
                Enter Practice Mode (Bilingual EN/VI)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Instructions Modal */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        onStartTest={() => {
          setIsInstructionsOpen(false);
          setCurrentMode("test");
        }}
        onStartPractice={() => {
          setIsInstructionsOpen(false);
          setCurrentMode("practice");
        }}
      />

      {/* Audio Downloader Tool Modal */}
      <AudioMergerModal
        isOpen={isAudioToolOpen}
        onClose={() => setIsAudioToolOpen(false)}
        audioChunks={testResult?.audioChunks || []}
        questionSet={selectedSet}
        userTranscripts={testResult?.userTranscripts}
      />
    </div>
  );
}
