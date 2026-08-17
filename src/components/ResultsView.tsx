import React, { useState, useEffect } from "react";
import { TestResult, QuestionSet } from "../types";
import { speakText } from "../utils/tts";
import { mergeAudioBlobs } from "../utils/audio";
import {
  generateQuestionsTextReport,
  triggerFileDownload,
  downloadQuestionsAndAudioPackage
} from "../utils/export";
import {
  Download,
  Volume2,
  CheckCircle2,
  FileText,
  RotateCcw,
  BookOpen,
  Sparkles,
  Globe,
  Layers,
  FolderDown
} from "lucide-react";

interface ResultsViewProps {
  testResult: TestResult;
  questionSet: QuestionSet;
  onRetake: () => void;
  onOpenAudioTool: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  testResult,
  questionSet,
  onRetake,
  onOpenAudioTool
}) => {
  const [mergedAudioUrl, setMergedAudioUrl] = useState<string | null>(
    testResult.combinedAudioUrl || null
  );

  const allQuestions = [
    ...questionSet.topics[0].questions,
    ...questionSet.topics[1].questions
  ];

  // Ensure combined audio blob is available for download
  useEffect(() => {
    if (!mergedAudioUrl && testResult.audioChunks && testResult.audioChunks.length > 0) {
      const generateMergedAudio = async () => {
        try {
          const blobs = testResult.audioChunks.map((c) => c.blob);
          const mergedBlob = await mergeAudioBlobs(blobs);
          const url = URL.createObjectURL(mergedBlob);
          setMergedAudioUrl(url);
        } catch (e) {
          console.warn("Audio merge error:", e);
        }
      };
      generateMergedAudio();
    }
  }, [testResult, mergedAudioUrl]);

  // Combined Download handler: Questions + Audio
  const handleDownloadQuestionsAndAudio = () => {
    downloadQuestionsAndAudioPackage(
      questionSet,
      testResult.userTranscripts,
      mergedAudioUrl
    );
  };

  // Download combined single audio file
  const downloadCombinedAudioOnly = () => {
    if (!mergedAudioUrl && testResult.combinedAudioBlob) {
      const url = URL.createObjectURL(testResult.combinedAudioBlob);
      triggerFileDownload(url, `${questionSet.title.replace(/[^a-zA-Z0-9]/g, "_")}_Combined_Answers.wav`);
    } else if (mergedAudioUrl) {
      triggerFileDownload(mergedAudioUrl, `${questionSet.title.replace(/[^a-zA-Z0-9]/g, "_")}_Combined_Answers.wav`);
    } else {
      alert("No audio recorded to download.");
    }
  };

  // Download Questions Text Report
  const downloadQuestionsTextOnly = () => {
    const reportText = generateQuestionsTextReport(
      questionSet,
      testResult.userTranscripts,
      "VSTEP Speaking Part 1 - Questions & Transcripts Report"
    );
    const textBlob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const sanitizedTitle = questionSet.title.replace(/[^a-zA-Z0-9]/g, "_");
    triggerFileDownload(textBlob, `${sanitizedTitle}_Questions_and_Transcripts.txt`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Result Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden text-slate-800">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {testResult.mode === "test" ? "Test Session Completed" : "Practice Session Completed"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">VSTEP Speaking Session Summary</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {questionSet.title} • Date: {testResult.recordedAt}
            </p>
          </div>

          {/* Action Download Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Primary Button: Download Both Questions & Audio */}
            <button
              onClick={handleDownloadQuestionsAndAudio}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-200 transition flex items-center gap-2"
              title="Download questions report (.txt) and audio (.wav) together"
            >
              <FolderDown className="w-4 h-4" />
              <span>Download Questions & Combined Audio (.txt + .wav)</span>
            </button>

            {/* Questions Only */}
            <button
              onClick={downloadQuestionsTextOnly}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-200 transition flex items-center gap-2"
              title="Download text file with questions and answers"
            >
              <FileText className="w-4 h-4" />
              <span>Questions (.txt)</span>
            </button>

            {/* Audio Only */}
            <button
              onClick={downloadCombinedAudioOnly}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2"
              title="Download combined audio recording (.wav)"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Audio (.wav)</span>
            </button>

            {/* Retake */}
            <button
              onClick={onRetake}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake</span>
            </button>
          </div>
        </div>

        {/* Combined Audio Player Bar */}
        {mergedAudioUrl && (
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Combined Answer Recording</p>
                <p className="text-[11px] text-slate-500">All 6 question responses merged into 1 continuous track</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <audio controls src={mergedAudioUrl} className="w-full sm:w-72 h-10 rounded-lg" />
              <button
                onClick={handleDownloadQuestionsAndAudio}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
              >
                <FolderDown className="w-3.5 h-3.5" />
                <span>Download Both</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Session Overview Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Questions Covered</span>
          <p className="text-2xl font-extrabold text-slate-800">6 Questions</p>
          <p className="text-xs text-slate-500">3 per topic across 2 topics</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Target Band Level</span>
          <p className="text-2xl font-extrabold text-blue-600">VSTEP B2 (6.0 - 8.0)</p>
          <p className="text-xs text-slate-500">Social Interaction Section</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Session Export</span>
          <p className="text-2xl font-extrabold text-emerald-600">Audio & Text Ready</p>
          <p className="text-xs text-slate-500">Download .wav + .txt report</p>
        </div>
      </div>

      {/* Question-by-Question Transcripts & Model Answers */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Question Transcripts & Model Answers
        </h3>

        {allQuestions.map((q, idx) => {
          const userTranscript = testResult.userTranscripts[q.id] || "No response recorded.";

          return (
            <div
              key={q.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-slate-800"
            >
              {/* Question Header */}
              <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                    Question {idx + 1} • {q.topicTitle}
                  </span>
                  <h4 className="text-base font-bold text-slate-800 mt-0.5 leading-snug break-words">{q.text}</h4>
                </div>
                <button
                  onClick={() => speakText(q.modelAnswer)}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 self-start sm:self-center"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Listen Model Answer</span>
                </button>
              </div>

              {/* User Transcript */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                  Your Response Transcript:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-mono italic">
                  "{userTranscript}"
                </p>
              </div>

              {/* Key B2 Vocabulary */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key B2 Vocabulary & Phrases
                </span>
                <div className="flex flex-wrap gap-2">
                  {q.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pronunciation & Intonation Guide */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Pronunciation & Intonation Guide
                </span>
                <p className="font-mono text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  Phonetic: {q.pronunciationGuide.english.phonetic}
                </p>
                <div className="space-y-1 text-slate-600 pt-1">
                  <p>• <strong>Intonation:</strong> {q.pronunciationGuide.english.intonation}</p>
                  <p>• <strong>Vietnamese guide:</strong> {q.pronunciationGuide.vietnamese.huongDanPhatAm}</p>
                </div>
              </div>

              {/* Dual Model Answers: Target Band B1 & Target Band B2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* B1 Model Answer */}
                <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider">
                        Target Band B1 Model Answer (4.0 - 5.5)
                      </span>
                      <button
                        onClick={() => speakText(q.modelAnswerB1 || q.modelAnswer)}
                        className="px-2.5 py-1 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 shadow-sm"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen B1</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed border-l-2 border-cyan-500 pl-2.5 py-0.5">
                      "{q.modelAnswerB1 || q.modelAnswer}"
                    </p>
                  </div>
                  {q.b1FocusNotes && (
                    <div className="text-[11px] text-cyan-900 bg-cyan-100/60 p-2 rounded-lg border border-cyan-200/60">
                      <strong>B1 Focus:</strong> {q.b1FocusNotes}
                    </div>
                  )}
                </div>

                {/* B2 Model Answer */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                        Target Band B2 Model Answer (6.0 - 8.0)
                      </span>
                      <button
                        onClick={() => speakText(q.modelAnswerB2 || q.modelAnswer)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 shadow-sm"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>Listen B2</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed border-l-2 border-emerald-500 pl-2.5 py-0.5">
                      "{q.modelAnswerB2 || q.modelAnswer}"
                    </p>
                  </div>
                  {q.b2FocusNotes && (
                    <div className="text-[11px] text-emerald-900 bg-emerald-100/60 p-2 rounded-lg border border-emerald-200/60">
                      <strong>B2 Focus:</strong> {q.b2FocusNotes}
                    </div>
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
