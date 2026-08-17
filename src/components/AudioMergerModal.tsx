import React, { useState, useEffect } from "react";
import { RecordingChunk, QuestionSet } from "../types";
import { mergeAudioBlobs } from "../utils/audio";
import {
  generateQuestionsTextReport,
  triggerFileDownload,
  downloadQuestionsAndAudioPackage
} from "../utils/export";
import {
  Download,
  Volume2,
  X,
  Play,
  Layers,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  FileText,
  FolderDown
} from "lucide-react";

interface AudioMergerModalProps {
  isOpen: boolean;
  onClose: () => void;
  audioChunks: RecordingChunk[];
  questionSet?: QuestionSet;
  userTranscripts?: Record<string, string>;
}

export const AudioMergerModal: React.FC<AudioMergerModalProps> = ({
  isOpen,
  onClose,
  audioChunks,
  questionSet,
  userTranscripts = {}
}) => {
  const [combining, setCombining] = useState<boolean>(false);
  const [combinedAudioUrl, setCombinedAudioUrl] = useState<string | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && audioChunks.length > 0) {
      handleCombineAudio();
    }
  }, [isOpen, audioChunks]);

  const handleCombineAudio = async () => {
    if (!audioChunks || audioChunks.length === 0) return;

    setCombining(true);
    setErrorMsg(null);

    try {
      const blobs = audioChunks.map((c) => c.blob);
      const mergedBlob = await mergeAudioBlobs(blobs);
      const url = URL.createObjectURL(mergedBlob);
      setCombinedAudioUrl(url);
    } catch (err: any) {
      console.error("Failed to merge audio files:", err);
      setErrorMsg("Failed to merge audio clips into one file: " + err.message);
    } finally {
      setCombining(false);
    }
  };

  const playSingleChunk = (idx: number) => {
    const chunk = audioChunks[idx];
    if (!chunk) return;

    setPlayingIndex(idx);
    const audio = new Audio(chunk.url);
    audio.play();
    audio.onended = () => setPlayingIndex(null);
  };

  const downloadSingleCombinedFile = () => {
    if (!combinedAudioUrl) return;
    triggerFileDownload(combinedAudioUrl, `VSTEP_Speaking_Part1_Combined_Answers.wav`);
  };

  const handleDownloadQuestionsAndAudio = () => {
    if (questionSet) {
      downloadQuestionsAndAudioPackage(
        questionSet,
        userTranscripts,
        combinedAudioUrl
      );
    } else {
      downloadSingleCombinedFile();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-800 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Questions & Audio Downloader</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Download your recorded speaking answers as a single audio file alongside the complete questions & transcripts document.
            </p>
          </div>
        </div>

        {/* Status Box */}
        {audioChunks.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center space-y-3">
            <Volume2 className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No Audio Recorded Yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start a session in Test Mode or Practice Mode to record your answers. All recordings will appear here for 1-click download.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Audio Clips List */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <span>Recorded Question Clips ({audioChunks.length})</span>
                <span>Click to Preview</span>
              </div>

              {audioChunks.map((chunk, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 p-3 rounded-xl flex items-center justify-between hover:border-slate-300 transition shadow-2xs"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center border border-blue-100">
                      #{idx + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {chunk.questionId ? `Answer for ${chunk.questionId}` : `Audio Track ${idx + 1}`}
                      </p>
                      <p className="text-[10px] text-slate-400">Recorded chunk • Voice answer</p>
                    </div>
                  </div>

                  <button
                    onClick={() => playSingleChunk(idx)}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-blue-600 border border-slate-200 rounded-lg transition"
                    title="Play Clip"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                </div>
              ))}
            </div>

            {/* Merge Status & Combined Player */}
            {combining ? (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
                <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                <p className="text-xs font-semibold text-slate-700">Merging Audio Tracks into One Master File...</p>
              </div>
            ) : combinedAudioUrl ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Merged Audio Ready (.wav)
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                    1 Combined Track
                  </span>
                </div>

                <audio controls src={combinedAudioUrl} className="w-full h-10 rounded-lg" />

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleDownloadQuestionsAndAudio}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition shadow-md shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <FolderDown className="w-4 h-4" />
                    <span>Download Questions & Audio (.txt + .wav)</span>
                  </button>

                  <button
                    onClick={downloadSingleCombinedFile}
                    className="py-3 px-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Audio Only (.wav)</span>
                  </button>
                </div>
              </div>
            ) : null}

            {errorMsg && (
              <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
