import { QuestionSet } from "../types";

/**
 * Exports a text document containing all questions, keywords, tips, phonetics, model answers,
 * and user transcripts for a given QuestionSet session.
 */
export function generateQuestionsTextReport(
  questionSet: QuestionSet,
  userTranscripts: Record<string, string> = {},
  sessionTitle: string = "VSTEP SPEAKING PART 1 SESSION REPORT"
): string {
  let report = `=========================================================================\n`;
  report += `                  ${sessionTitle.toUpperCase()}\n`;
  report += `=========================================================================\n`;
  report += `Set Title: ${questionSet.title}\n`;
  report += `Target Band: ${questionSet.level}\n`;
  report += `Generated Date: ${new Date().toLocaleString()}\n`;
  report += `=========================================================================\n\n`;

  questionSet.topics.forEach((topic, tIdx) => {
    report += `\n=========================================================================\n`;
    report += `TOPIC ${tIdx + 1}: ${topic.title.toUpperCase()}\n`;
    report += `Description: ${topic.description}\n`;
    report += `=========================================================================\n\n`;

    topic.questions.forEach((q, qIdx) => {
      const userAns = userTranscripts[q.id] || "No recording transcript recorded.";
      report += `-------------------------------------------------------------------------\n`;
      report += `QUESTION ${qIdx + 1}: ${q.text}\n`;
      report += `-------------------------------------------------------------------------\n`;
      report += `[Your Recorded Response Transcript]:\n"${userAns}"\n\n`;

      report += `[Key B1 Core Vocabulary]:\n`;
      (q.keywordsB1 || []).forEach((kw) => {
        report += `  • ${kw}\n`;
      });
      report += `\n`;

      report += `[Key B2 Advanced Vocabulary & Collocations]:\n`;
      q.keywords.forEach((kw) => {
        report += `  • ${kw}\n`;
      });
      report += `\n`;

      report += `[Answering Strategy & Tips]:\n`;
      q.tips.forEach((tip) => {
        report += `  • ${tip}\n`;
      });
      report += `\n`;

      report += `[Pronunciation & Intonation Guide]:\n`;
      report += `  • Phonetic: ${q.pronunciationGuide.english.phonetic}\n`;
      report += `  • Intonation: ${q.pronunciationGuide.english.intonation}\n`;
      report += `  • Stress & Linking: ${q.pronunciationGuide.english.stressAndLinking}\n`;
      report += `  • Vietnamese Guide: ${q.pronunciationGuide.vietnamese.huongDanPhatAm}\n\n`;

      report += `[Target Band B1 Model Answer (4.0 - 5.5)]:\n`;
      report += `"${q.modelAnswerB1 || q.modelAnswer}"\n`;
      if (q.b1FocusNotes) {
        report += `(B1 Language Focus: ${q.b1FocusNotes})\n`;
      }
      report += `\n`;

      report += `[Target Band B2 Model Answer (6.0 - 8.0)]:\n`;
      report += `"${q.modelAnswerB2 || q.modelAnswer}"\n`;
      if (q.b2FocusNotes) {
        report += `(B2 Language Focus: ${q.b2FocusNotes})\n`;
      }
      report += `\n`;
    });
  });

  return report;
}

/**
 * Triggers a file download in the browser.
 */
export function triggerFileDownload(contentUrlOrBlob: string | Blob, filename: string) {
  const a = document.createElement("a");
  if (typeof contentUrlOrBlob === "string") {
    a.href = contentUrlOrBlob;
  } else {
    a.href = URL.createObjectURL(contentUrlOrBlob);
  }
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Downloads both the questions text file and the combined audio file.
 */
export function downloadQuestionsAndAudioPackage(
  questionSet: QuestionSet,
  userTranscripts: Record<string, string> = {},
  combinedAudioUrl?: string | null
) {
  // 1. Download Questions & Transcripts Text Document
  const reportText = generateQuestionsTextReport(
    questionSet,
    userTranscripts,
    "VSTEP Speaking Part 1 - Questions & Transcripts Report"
  );
  const textBlob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const sanitizedTitle = questionSet.title.replace(/[^a-zA-Z0-9]/g, "_");
  triggerFileDownload(textBlob, `${sanitizedTitle}_Questions_and_Transcripts.txt`);

  // 2. Download Combined Audio File if available
  if (combinedAudioUrl) {
    setTimeout(() => {
      triggerFileDownload(combinedAudioUrl, `${sanitizedTitle}_Combined_Audio.wav`);
    }, 500);
  }
}

/**
 * Downloads the full Question Bank for all sets.
 */
export function downloadFullQuestionBank(questionSets: QuestionSet[]) {
  let report = `=========================================================================\n`;
  report += `             VSTEP SPEAKING PART 1 - COMPLETE QUESTION BANK\n`;
  report += `=========================================================================\n\n`;

  questionSets.forEach((set) => {
    report += generateQuestionsTextReport(set, {}, `QUESTION SET: ${set.title}`);
    report += `\n\n`;
  });

  const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
  triggerFileDownload(blob, `VSTEP_Speaking_Part1_Complete_Question_Bank.txt`);
}
