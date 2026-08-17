import React from "react";
import { Clock, MessageSquare, Volume2, ShieldCheck, Play, Sparkles, X } from "lucide-react";

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTest: () => void;
  onStartPractice: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
  onStartTest,
  onStartPractice
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-slate-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">VSTEP Speaking Part 1 Instructions</h2>
            <p className="text-xs sm:text-sm text-slate-400">Social Interaction Section • Target Band B2 (6.0 - 8.0)</p>
          </div>
        </div>

        {/* Official Test Instructions Box */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-5 mb-6 space-y-4">
          <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Official Test Instructions
          </h3>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span>
                You will be asked questions about <strong>two different topics</strong> (3 questions per topic, 6 questions in total).
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-bold text-xs">
                2
              </span>
              <span>
                You will have <strong>3 minutes</strong> to answer all the questions displayed on the screen. The countdown begins as soon as you click <strong>Start Test</strong>.
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <span>
                Try to <strong>speak naturally</strong> and <strong>expand your answers slightly</strong> (give reasons or examples for each question).
              </span>
            </li>
          </ul>
        </div>

        {/* Mode Feature Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Test Mode Card */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 hover:border-rose-500/50 transition">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-rose-400 flex items-center gap-1.5 text-sm">
                <Clock className="w-4 h-4" />
                Test Mode
              </h4>
              <span className="text-[10px] uppercase tracking-wider bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-semibold border border-rose-500/30">
                Timed
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Starts 3-minute timer immediately. Records your entire response session into a combined audio file.
            </p>
            <button
              onClick={() => {
                onClose();
                onStartTest();
              }}
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-rose-600/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Start Test Mode Now
            </button>
          </div>

          {/* Practice Mode Card */}
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4 hover:border-indigo-500/50 transition">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-indigo-400 flex items-center gap-1.5 text-sm">
                <Sparkles className="w-4 h-4" />
                Practice Mode
              </h4>
              <span className="text-[10px] uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-semibold border border-indigo-500/30">
                Guided
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Shows key vocabulary, tips, <strong>bilingual English & Vietnamese pronunciation & intonation guides</strong>, and British female TTS model answers.
            </p>
            <button
              onClick={() => {
                onClose();
                onStartPractice();
              }}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20"
            >
              <Volume2 className="w-3.5 h-3.5" />
              Enter Practice Mode
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="text-center text-xs text-slate-500">
          * Your recorded audio answers will be combined into a single file for easy download upon completion.
        </p>
      </div>
    </div>
  );
};
