export type AppMode = "instructions" | "test" | "practice" | "results";
export type AppTheme = "light" | "ivory" | "nordic" | "midnight" | "emerald" | "sunset";

export interface Question {
  id: string;
  topicId: string;
  topicTitle: string;
  text: string;
  keywords: string[];
  keywordsB1?: string[];
  tips: string[];
  pronunciationGuide: {
    english: {
      phonetic: string;
      intonation: string;
      stressAndLinking: string;
    };
    vietnamese: {
      huongDanPhatAm: string;
      nguDieuVaNhanGiong: string;
      meoTraLoi: string;
    };
  };
  modelAnswer: string;
  modelAnswerB1: string;
  modelAnswerB2: string;
  modelAnswerPhonetics?: string;
  b1FocusNotes?: string;
  b2FocusNotes?: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  questions: Question[];
}

export interface QuestionSet {
  id: string;
  title: string;
  level: string;
  topics: [Topic, Topic]; // Exactly 2 topics per set for VSTEP Part 1
}

export interface RecordingChunk {
  questionId?: string;
  blob: Blob;
  url: string;
  durationMs: number;
  timestamp: number;
  transcript?: string;
}

export interface TestResult {
  setId: string;
  setTitle: string;
  mode: "test" | "practice";
  totalDurationSeconds: number;
  recordedAt: string;
  combinedAudioBlob?: Blob;
  combinedAudioUrl?: string;
  userTranscripts: Record<string, string>; // questionId -> transcript
  audioChunks: RecordingChunk[];
}
