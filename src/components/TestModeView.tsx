import React, { useState, useEffect, useRef } from "react";
import { QuestionSet, TestResult, RecordingChunk, AppTheme } from "../types";
import { speakText, stopSpeaking } from "../utils/tts";
import { SpeechToTextEngine } from "../utils/audio";
import { THEMES } from "../utils/theme";
import {
  Clock,
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Play,
  Square,
  Sparkles,
  ChevronRight,
  RotateCcw
} from "lucide-react";

interface TestModeViewProps {
  questionSet: QuestionSet;
  onFinishTest: (result: TestResult) => void;
  currentTheme?: AppTheme;
}

export const TestModeView: React.FC<TestModeViewProps> = ({ questionSet, onFinishTest, currentTheme = "light" }) => {
  const theme = THEMES[currentTheme] || THEMES.light;
  const isLight = theme.category === "light";
  const [testState, setTestState] = useState<"idle" | "testing" | "paused" | "finished">("idle");
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(180); // 3 minutes = 180s
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [liveTranscript, setLiveTranscript] = useState<string>("");
  const [userTranscripts, setUserTranscripts] = useState<Record<string, string>>({});
  const [micActive, setMicActive] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio Recording Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const speechEngineRef = useRef<SpeechToTextEngine | null>(null);
  const timerIntervalRef = useRef<any>(null);

  const allQuestions = [
    ...questionSet.topics[0].questions,
    ...questionSet.topics[1].questions
  ];

  // Initialize Speech Recognition Engine
  useEffect(() => {
    speechEngineRef.current = new SpeechToTextEngine((transcript) => {
      setLiveTranscript(transcript);
    });

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      stopRecordingMedia();
      stopSpeaking();
    };
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (testState === "testing") {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeftSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            completeTestSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [testState]);

  // Start Test Handler
  const startTestSession = async () => {
    setErrorMessage(null);
    setLiveTranscript("");
    setUserTranscripts({});
    setActiveQuestionIndex(0);
    setTimeLeftSeconds(180);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup Web Audio Analyser for VU Meter
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start VU meter animation loop
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, { mimeType: getSupportedMimeType() });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(500); // chunk every 500ms
      setMicActive(true);

      // Start Speech Recognition
      if (speechEngineRef.current) {
        speechEngineRef.current.start();
      }

      setTestState("testing");

      // Speak first question in British female voice automatically to guide candidate
      speakText(`Topic 1: ${questionSet.topics[0].title}. ${allQuestions[0].text}`);
    } catch (err: any) {
      console.error("Microphone access failed:", err);
      setErrorMessage("Microphone access is required to record your speaking test. Please allow microphone permissions in your browser.");
    }
  };

  const getSupportedMimeType = () => {
    if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) return "audio/webm;codecs=opus";
    if (MediaRecorder.isTypeSupported("audio/webm")) return "audio/webm";
    if (MediaRecorder.isTypeSupported("audio/mp4")) return "audio/mp4";
    if (MediaRecorder.isTypeSupported("audio/ogg")) return "audio/ogg";
    return "";
  };

  const stopRecordingMedia = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close();
    }
    if (speechEngineRef.current) {
      speechEngineRef.current.stop();
    }
    setMicActive(false);
  };

  // Complete Test
  const completeTestSession = () => {
    setTestState("finished");
    stopSpeaking();
    stopRecordingMedia();

    const capturedTranscript = speechEngineRef.current ? speechEngineRef.current.stop() : liveTranscript;

    // Combine audio chunks into one Blob
    const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
    const combinedBlob = new Blob(audioChunksRef.current, { type: mimeType });
    const combinedUrl = URL.createObjectURL(combinedBlob);

    const recordingChunk: RecordingChunk = {
      blob: combinedBlob,
      url: combinedUrl,
      durationMs: (180 - timeLeftSeconds) * 1000,
      timestamp: Date.now(),
      transcript: capturedTranscript || liveTranscript
    };

    // Save final transcripts per question
    const mapTranscripts: Record<string, string> = { ...userTranscripts };
    // If empty, fill with captured transcript or default note
    allQuestions.forEach((q, idx) => {
      if (!mapTranscripts[q.id]) {
        mapTranscripts[q.id] = capturedTranscript || liveTranscript || "Candidate spoke response during test mode.";
      }
    });

    const result: TestResult = {
      setId: questionSet.id,
      setTitle: questionSet.title,
      mode: "test",
      totalDurationSeconds: 180 - timeLeftSeconds,
      recordedAt: new Date().toLocaleString("vi-VN"),
      combinedAudioBlob: combinedBlob,
      combinedAudioUrl: combinedUrl,
      userTranscripts: mapTranscripts,
      audioChunks: [recordingChunk]
    };

    onFinishTest(result);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Calculate timer color based on remaining time
  const getTimerColorClass = () => {
    if (timeLeftSeconds <= 30) return "text-rose-500 bg-rose-500/10 border-rose-500/30 animate-pulse";
    if (timeLeftSeconds <= 60) return "text-amber-500 bg-amber-500/10 border-amber-500/30";
    return isLight ? "text-blue-700 bg-blue-50 border-blue-200" : "text-indigo-300 bg-indigo-500/10 border-indigo-500/30";
  };

  const currentQuestion = allQuestions[activeQuestionIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Start Banner / Status Card */}
      {testState === "idle" && (
        <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 sm:p-10 text-center shadow-md relative overflow-hidden`}>
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-blue-500 to-indigo-500" />

          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <Mic className="w-8 h-8" />
          </div>

          <h2 className={`text-2xl sm:text-3xl font-bold ${theme.textPrimary} mb-2`}>VSTEP Speaking Part 1 Simulator</h2>
          <p className={`text-sm ${theme.textMuted} max-w-xl mx-auto mb-6`}>
            You will be asked 6 questions across 2 topics (<strong>{questionSet.topics[0].title}</strong> & <strong>{questionSet.topics[1].title}</strong>).
            You have 3 minutes to answer all questions.
          </p>

          {errorMessage && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-600 text-xs sm:text-sm flex items-center gap-2 max-w-lg mx-auto">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className={`${theme.subCardBg} border ${theme.subCardBorder} rounded-xl p-5 max-w-lg mx-auto mb-8 text-left space-y-3`}>
            <div className="flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Test Mode Checklist
            </div>
            <div className={`text-xs sm:text-sm ${theme.textSecondary} space-y-2`}>
              <p>• <strong>Timer:</strong> Exactly 3:00 countdown timer starts on click.</p>
              <p>• <strong>Audio:</strong> All your answers will be recorded into ONE combined audio file.</p>
              <p>• <strong>Voice:</strong> Female British voice reads questions automatically.</p>
            </div>
          </div>

          <button
            onClick={startTestSession}
            className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-3 mx-auto"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Start Test Now</span>
          </button>
        </div>
      )}

      {/* Active Test Screen */}
      {testState === "testing" && (
        <div className="space-y-6">
          {/* Top Status Bar: Timer & Mic Meter */}
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4`}>
            {/* Timer Display */}
            <div className="flex items-center space-x-3">
              <div className={`px-4 py-2 rounded-xl border font-mono text-2xl font-bold flex items-center gap-2.5 ${getTimerColorClass()}`}>
                <Clock className="w-6 h-6" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
              <div className={`text-xs ${theme.textMuted}`}>
                <p className={`font-semibold ${theme.textPrimary}`}>Time Remaining</p>
                <p>Total time: 3:00</p>
              </div>
            </div>

            {/* Mic Meter & Active Audio Bar */}
            <div className={`flex items-center space-x-4 px-4 py-2.5 rounded-xl w-full sm:w-auto border ${isLight ? "bg-slate-50 border-slate-200" : "bg-slate-800/80 border-slate-700"}`}>
              <div className="flex items-center space-x-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <span className="text-xs font-semibold text-rose-500">Recording Live</span>
              </div>

              {/* Dynamic Visual Audio Levels */}
              <div className="flex items-end gap-1 h-5 w-24">
                {[...Array(8)].map((_, i) => {
                  const barHeight = Math.min(100, Math.max(15, (audioLevel * (i + 1)) / 4));
                  return (
                    <div
                      key={i}
                      className="w-2 rounded-t bg-blue-600 transition-all duration-75"
                      style={{ height: `${barHeight}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Finish Early Button */}
            <button
              onClick={completeTestSession}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish & View Summary</span>
            </button>
          </div>

          {/* Time Progress Bar */}
          <div className={`w-full rounded-full h-2 overflow-hidden border ${isLight ? "bg-slate-200 border-slate-300" : "bg-slate-800 border-slate-700"}`}>
            <div
              className="bg-gradient-to-r from-blue-500 via-rose-500 to-amber-500 h-2 transition-all duration-1000"
              style={{ width: `${(timeLeftSeconds / 180) * 100}%` }}
            />
          </div>

          {/* All 6 Questions Grid with Active Focus */}
          <div className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-6 shadow-sm`}>
            <div className={`flex items-center justify-between pb-4 border-b ${theme.cardBorder} mb-6`}>
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                  {questionSet.title}
                </span>
                <h3 className={`text-lg font-bold ${theme.textPrimary}`}>Questions on Screen (Part 1)</h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full border ${isLight ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-slate-800 border-slate-700 text-slate-300"}`}>
                Question {activeQuestionIndex + 1} of 6
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {allQuestions.map((q, idx) => {
                const isCurrent = idx === activeQuestionIndex;
                const isTopicHeader = idx === 0 || idx === 3;
                const topicObj = idx < 3 ? questionSet.topics[0] : questionSet.topics[1];

                return (
                  <React.Fragment key={q.id}>
                    {/* Topic Header Divider */}
                    {isTopicHeader && (
                      <div className="pt-2 pb-1 flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600">
                          Topic {idx === 0 ? "1" : "2"}: {topicObj.title}
                        </h4>
                        <div className={`flex-1 border-t ${theme.cardBorder}`} />
                      </div>
                    )}

                    {/* Question Card */}
                    <div
                      onClick={() => {
                        setActiveQuestionIndex(idx);
                        speakText(q.text);
                      }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        isCurrent
                          ? isLight
                            ? "bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/30 shadow-sm"
                            : "bg-slate-800/90 border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-lg"
                          : isLight
                            ? "bg-slate-50/50 border-slate-200 hover:bg-slate-100/70"
                            : "bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              isCurrent
                                ? "bg-blue-600 text-white"
                                : isLight ? "bg-slate-200 text-slate-700" : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            Q{idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm sm:text-base font-semibold leading-snug break-words ${isCurrent ? theme.textPrimary : theme.textSecondary}`}>
                              {q.text}
                            </p>
                            {isCurrent && (
                              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                                <Mic className="w-3 h-3 animate-pulse text-rose-500" />
                                Speak your response clearly now...
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakText(q.text);
                          }}
                          className={`p-2 rounded-lg transition flex-shrink-0 ${
                            isLight
                              ? "text-slate-500 hover:text-blue-600 hover:bg-slate-200"
                              : "text-slate-400 hover:text-indigo-400 hover:bg-slate-700/50"
                          }`}
                          title="Listen with British Female Voice"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Active Speech Transcript Box */}
            <div className={`mt-6 pt-5 border-t ${theme.cardBorder}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 ${theme.textMuted}`}>
                  <Mic className="w-3.5 h-3.5 text-blue-600" />
                  Live Speech Transcript Preview
                </span>
                <span className={`text-[10px] ${theme.textMuted}`}>Auto-captured via Microphone</span>
              </div>
              <div className={`border rounded-xl p-4 min-h-[70px] text-xs sm:text-sm font-mono leading-relaxed ${
                isLight
                  ? "bg-white border-slate-200 text-slate-800"
                  : "bg-slate-950/80 border-slate-800 text-slate-300"
              }`}>
                {liveTranscript ? (
                  <span>{liveTranscript}</span>
                ) : (
                  <span className={`${theme.textMuted} italic`}>
                    Listening for your voice... Speak into your microphone now to answer the questions.
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeQuestionIndex === 0}
                  className={`px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-semibold transition border ${
                    isLight
                      ? "bg-white hover:bg-slate-100 text-slate-700 border-slate-300"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700"
                  }`}
                >
                  Previous Question
                </button>
                <button
                  onClick={() => {
                    if (activeQuestionIndex < 5) {
                      const nextIdx = activeQuestionIndex + 1;
                      setActiveQuestionIndex(nextIdx);
                      speakText(allQuestions[nextIdx].text);
                    }
                  }}
                  disabled={activeQuestionIndex === 5}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold transition flex items-center gap-1"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={completeTestSession}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & View Session Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
