import React, { useState, useRef } from "react";
import { QuestionSet, Question, RecordingChunk, TestResult, AppTheme } from "../types";
import { speakText, stopSpeaking } from "../utils/tts";
import { SpeechToTextEngine } from "../utils/audio";
import { THEMES } from "../utils/theme";
import {
  Volume2,
  Mic,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  BookOpen,
  Lightbulb,
  Globe,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  Target
} from "lucide-react";

interface PracticeModeViewProps {
  questionSet: QuestionSet;
  onFinishPractice: (result: TestResult) => void;
  currentTheme?: AppTheme;
}

export const PracticeModeView: React.FC<PracticeModeViewProps> = ({
  questionSet,
  onFinishPractice,
  currentTheme = "midnight"
}) => {
  const theme = THEMES[currentTheme] || THEMES.midnight;
  const [activeTopicIndex, setActiveTopicIndex] = useState<number>(0);
  const [recordingState, setRecordingState] = useState<Record<string, "idle" | "recording" | "recorded">>({});
  const [practiceTranscripts, setPracticeTranscripts] = useState<Record<string, string>>({});
  const [recordedChunks, setRecordedChunks] = useState<Record<string, RecordingChunk>>({});
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [expandedPronunciation, setExpandedPronunciation] = useState<Record<string, boolean>>({});
  const [modelAnswerTab, setModelAnswerTab] = useState<Record<string, "both" | "b1" | "b2">>({});
  const [vocabTab, setVocabTab] = useState<Record<string, "all" | "b1" | "b2">>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const currentChunksRef = useRef<Blob[]>([]);
  const speechEngineRef = useRef<SpeechToTextEngine | null>(null);
  const activeQuestionIdRef = useRef<string | null>(null);

  const currentTopic = questionSet.topics[activeTopicIndex];

  // Start recording answer for a specific question
  const startPracticeRecording = async (questionId: string) => {
    stopSpeaking();
    activeQuestionIdRef.current = questionId;
    currentChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          currentChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start(200);

      // Start speech to text
      const engine = new SpeechToTextEngine((transcript) => {
        setPracticeTranscripts((prev) => ({
          ...prev,
          [questionId]: transcript
        }));
      });
      speechEngineRef.current = engine;
      engine.start();

      setRecordingState((prev) => ({ ...prev, [questionId]: "recording" }));
    } catch (err) {
      console.error("Mic access error in practice:", err);
      alert("Microphone permission required to practice recording.");
    }
  };

  // Stop recording answer for a question
  const stopPracticeRecording = (questionId: string) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }

    let finalTranscript = "";
    if (speechEngineRef.current) {
      finalTranscript = speechEngineRef.current.stop();
    }

    const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
    const blob = new Blob(currentChunksRef.current, { type: mimeType });
    const url = URL.createObjectURL(blob);

    const chunk: RecordingChunk = {
      questionId,
      blob,
      url,
      durationMs: 30000,
      timestamp: Date.now(),
      transcript: finalTranscript || practiceTranscripts[questionId] || "Practice answer recorded."
    };

    setRecordedChunks((prev) => ({ ...prev, [questionId]: chunk }));
    setRecordingState((prev) => ({ ...prev, [questionId]: "recorded" }));
  };

  // Play candidate's recorded audio
  const playRecordedAudio = (questionId: string) => {
    const chunk = recordedChunks[questionId];
    if (!chunk) return;

    setPlayingAudioId(questionId);
    const audio = new Audio(chunk.url);
    audio.play();
    audio.onended = () => setPlayingAudioId(null);
  };

  // Finish practice session
  const submitPracticeSession = () => {
    const audioChunkList: RecordingChunk[] = Object.values(recordedChunks);
    const combinedBlobs = audioChunkList.map((c) => c.blob);
    const combinedBlob = combinedBlobs.length > 0 ? new Blob(combinedBlobs, { type: "audio/webm" }) : undefined;
    const combinedUrl = combinedBlob ? URL.createObjectURL(combinedBlob) : undefined;

    const result: TestResult = {
      setId: questionSet.id,
      setTitle: questionSet.title,
      mode: "practice",
      totalDurationSeconds: 120,
      recordedAt: new Date().toLocaleString("vi-VN"),
      combinedAudioBlob: combinedBlob,
      combinedAudioUrl: combinedUrl,
      userTranscripts: practiceTranscripts,
      audioChunks: audioChunkList
    };

    onFinishPractice(result);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Practice & Guided Study Mode</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{questionSet.title}</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Study both <strong>Target Band B1 (4.0 - 5.5)</strong> & <strong>Target Band B2 (6.0 - 8.0)</strong> Model Answers, vocabulary comparisons, and bilingual pronunciation guides.
          </p>
        </div>

        <button
          onClick={submitPracticeSession}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition flex items-center gap-2 flex-shrink-0"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>Finish Practice Session</span>
        </button>
      </div>

      {/* Topic Switcher Tabs */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-3 overflow-x-auto">
        {questionSet.topics.map((topic, idx) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopicIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 flex-shrink-0 ${
              activeTopicIndex === idx
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Topic {idx + 1}: {topic.title}</span>
          </button>
        ))}
      </div>

      {/* Question Practice Cards */}
      <div className="space-y-8">
        {currentTopic.questions.map((q, qIdx) => {
          const recState = recordingState[q.id] || "idle";
          const chunk = recordedChunks[q.id];
          const isPronunciationOpen = expandedPronunciation[q.id] ?? true;
          const activeAnsTab = modelAnswerTab[q.id] || "both";
          const activeVocabTab = vocabTab[q.id] || "all";

          return (
            <div
              key={q.id}
              className={`${theme.cardBg} border ${theme.cardBorder} rounded-2xl p-4 sm:p-6 shadow-xl transition space-y-6`}
            >
              {/* Question Header - Responsive for mobile phone view */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold flex items-center justify-center text-sm flex-shrink-0">
                    Q{qIdx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold ${theme.textPrimary} leading-snug break-words`}>
                      {q.text}
                    </h3>
                    <p className={`text-xs ${theme.textMuted} mt-0.5`}>Topic: {q.topicTitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => speakText(q.text)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5 self-start sm:self-auto w-full sm:w-auto flex-shrink-0"
                >
                  <Volume2 className="w-4 h-4 text-indigo-400" />
                  <span>Listen Question (British Voice)</span>
                </button>
              </div>

              {/* Key Vocabulary & Phrases with B1 vs B2 Filter */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Vocabulary & Collocations Upgrade (Từ Vựng B1 vs B2)</span>
                  </div>

                  {/* Filter chips */}
                  <div className="flex items-center space-x-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-700/60 self-start sm:self-auto">
                    <button
                      onClick={() => setVocabTab((prev) => ({ ...prev, [q.id]: "all" }))}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                        activeVocabTab === "all"
                          ? "bg-slate-700 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      All Levels
                    </button>
                    <button
                      onClick={() => setVocabTab((prev) => ({ ...prev, [q.id]: "b1" }))}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                        activeVocabTab === "b1"
                          ? "bg-cyan-900/60 text-cyan-300 border border-cyan-700/50"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      B1 Core
                    </button>
                    <button
                      onClick={() => setVocabTab((prev) => ({ ...prev, [q.id]: "b2" }))}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition ${
                        activeVocabTab === "b2"
                          ? "bg-emerald-900/60 text-emerald-300 border border-emerald-700/50"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      B2 Advanced
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {/* B1 Vocabulary List */}
                  {(activeVocabTab === "all" || activeVocabTab === "b1") && (
                    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                        <Target className="w-3.5 h-3.5" />
                        <span>B1 Core Vocabulary (Từ vựng cơ bản B1):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(q.keywordsB1 || []).map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-cyan-950/40 border border-cyan-500/30 rounded text-xs text-cyan-200 font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* B2 Vocabulary List */}
                  {(activeVocabTab === "all" || activeVocabTab === "b2") && (
                    <div className="bg-slate-900/60 border border-emerald-500/20 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>B2 Advanced Collocations (Cụm từ nâng cao B2):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {q.keywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30 rounded text-xs text-emerald-200 font-medium"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips & Formula Box */}
              <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Useful Tips & Response Strategy (Mẹo & Chiến Thuật Trả Lời)</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  {q.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              {/* Bilingual Pronunciation & Intonation Guide (English + Vietnamese) */}
              <div className="bg-slate-950/90 border border-indigo-500/20 rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedPronunciation((prev) => ({
                      ...prev,
                      [q.id]: !isPronunciationOpen
                    }))
                  }
                  className="w-full px-4 py-3 bg-indigo-950/30 hover:bg-indigo-950/50 text-indigo-300 font-bold text-xs sm:text-sm flex items-center justify-between border-b border-indigo-500/20 transition"
                >
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>Pronunciation & Intonation Guide (Hướng Dẫn Phát Âm & Ngữ Điệu EN-VI)</span>
                  </div>
                  {isPronunciationOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isPronunciationOpen && (
                  <div className="p-4 space-y-4 text-xs sm:text-sm">
                    {/* English Phonetics & Pitch */}
                    <div className="space-y-2 border-b border-slate-800 pb-3">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        English Phonetics & Pitch Contour:
                      </p>
                      <p className="font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                        {q.pronunciationGuide.english.phonetic}
                      </p>
                      <p className="text-slate-300 text-xs">
                        <strong>Intonation:</strong> {q.pronunciationGuide.english.intonation}
                      </p>
                      <p className="text-slate-300 text-xs">
                        <strong>Stress & Linking:</strong> {q.pronunciationGuide.english.stressAndLinking}
                      </p>
                    </div>

                    {/* Vietnamese Pronunciation Guide */}
                    <div className="space-y-2 text-slate-300">
                      <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        Hướng Dẫn Bằng Tiếng Việt (Vietnamese Explanation):
                      </p>
                      <p>• <strong>Phát âm:</strong> {q.pronunciationGuide.vietnamese.huongDanPhatAm}</p>
                      <p>• <strong>Ngữ điệu & Nhấn giọng:</strong> {q.pronunciationGuide.vietnamese.nguDieuVaNhanGiong}</p>
                      <p>• <strong>Mẹo mở rộng:</strong> {q.pronunciationGuide.vietnamese.meoTraLoi}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* DUAL MODEL ANSWERS SECTION (TARGET BAND B1 & TARGET BAND B2) */}
              <div className="space-y-3">
                {/* Header & Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                      Model Answers: Target Band B1 & Target Band B2
                    </span>
                  </div>

                  {/* Level Switcher */}
                  <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                    <button
                      onClick={() => setModelAnswerTab((prev) => ({ ...prev, [q.id]: "both" }))}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        activeAnsTab === "both"
                          ? "bg-indigo-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Compare Both (B1 & B2)
                    </button>
                    <button
                      onClick={() => setModelAnswerTab((prev) => ({ ...prev, [q.id]: "b1" }))}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        activeAnsTab === "b1"
                          ? "bg-cyan-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Target Band B1
                    </button>
                    <button
                      onClick={() => setModelAnswerTab((prev) => ({ ...prev, [q.id]: "b2" }))}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                        activeAnsTab === "b2"
                          ? "bg-emerald-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Target Band B2
                    </button>
                  </div>
                </div>

                {/* Model Answers Cards Grid */}
                <div className={`grid gap-4 ${activeAnsTab === "both" ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                  {/* TARGET BAND B1 MODEL ANSWER CARD */}
                  {(activeAnsTab === "both" || activeAnsTab === "b1") && (
                    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 space-y-3 shadow-md flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2 border-b border-cyan-500/20 pb-2">
                          <div>
                            <span className="px-2.5 py-0.5 bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              Target Band B1 (4.0 - 5.5)
                            </span>
                            <p className="text-[11px] text-cyan-300/80 mt-1">
                              Straightforward grammar, everyday vocabulary & direct ideas.
                            </p>
                          </div>

                          <button
                            onClick={() => speakText(q.modelAnswerB1 || q.modelAnswer)}
                            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen B1</span>
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-100 leading-relaxed italic border-l-2 border-cyan-400 pl-3 py-1 bg-cyan-950/20 rounded-r-lg">
                          "{q.modelAnswerB1 || q.modelAnswer}"
                        </p>
                      </div>

                      {q.b1FocusNotes && (
                        <div className="text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                          <strong className="text-cyan-400">B1 Language Focus:</strong>
                          <p className="text-slate-400">{q.b1FocusNotes}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TARGET BAND B2 MODEL ANSWER CARD */}
                  {(activeAnsTab === "both" || activeAnsTab === "b2") && (
                    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 space-y-3 shadow-md flex flex-col justify-between">
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2 border-b border-emerald-500/20 pb-2">
                          <div>
                            <span className="px-2.5 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-md text-[11px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Target Band B2 (6.0 - 8.0)
                            </span>
                            <p className="text-[11px] text-emerald-300/80 mt-1">
                              Rich collocations, complex sentence structures & fluent discourse.
                            </p>
                          </div>

                          <button
                            onClick={() => speakText(q.modelAnswerB2 || q.modelAnswer)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 shadow-sm"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen B2</span>
                          </button>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-100 leading-relaxed italic border-l-2 border-emerald-400 pl-3 py-1 bg-emerald-950/20 rounded-r-lg">
                          "{q.modelAnswerB2 || q.modelAnswer}"
                        </p>
                      </div>

                      {q.b2FocusNotes && (
                        <div className="text-[11px] text-slate-300 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800 space-y-0.5">
                          <strong className="text-emerald-400">B2 Language Focus:</strong>
                          <p className="text-slate-400">{q.b2FocusNotes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Candidate Practice Recorder Section */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <Mic className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Your Practice Recording</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {recState === "idle" && (
                      <button
                        onClick={() => startPracticeRecording(q.id)}
                        className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5 shadow-md"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span>Record My Answer</span>
                      </button>
                    )}

                    {recState === "recording" && (
                      <button
                        onClick={() => stopPracticeRecording(q.id)}
                        className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 text-rose-400 text-xs font-bold rounded-lg transition flex items-center gap-1.5 border border-rose-500/40 animate-pulse"
                      >
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Recording</span>
                      </button>
                    )}

                    {recState === "recorded" && (
                      <>
                        <button
                          onClick={() => playRecordedAudio(q.id)}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition flex items-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play Recording</span>
                        </button>
                        <button
                          onClick={() => startPracticeRecording(q.id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Re-record</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Real-time transcript display */}
                <div className="text-xs text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
                  {practiceTranscripts[q.id] ? (
                    <span>{practiceTranscripts[q.id]}</span>
                  ) : (
                    <span className="text-slate-500 italic">No practice audio recorded yet for this question.</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

