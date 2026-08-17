/**
 * Audio Recording, Speech Recognition, and Audio Merging Utilities
 */

// Helper to convert AudioBuffer to WAV Blob
export function bufferToWavBlob(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  let result: Float32Array;
  if (numChannels === 2) {
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);
    result = new Float32Array(left.length + right.length);
    for (let i = 0; i < left.length; i++) {
      result[i * 2] = left[i];
      result[i * 2 + 1] = right[i];
    }
  } else {
    result = buffer.getChannelData(0);
  }

  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const dataByteLength = result.length * bytesPerSample;
  const headerByteLength = 44;
  const wavBuffer = new ArrayBuffer(headerByteLength + dataByteLength);
  const view = new DataView(wavBuffer);

  /* RIFF identifier */
  writeString(view, 0, "RIFF");
  /* RIFF chunk length */
  view.setUint32(4, 36 + dataByteLength, true);
  /* RIFF type */
  writeString(view, 8, "WAVE");
  /* format chunk identifier */
  writeString(view, 12, "fmt ");
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * blockAlign, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, blockAlign, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, "data");
  /* data chunk length */
  view.setUint32(40, dataByteLength, true);

  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < result.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, result[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Blob([wavBuffer], { type: "audio/wav" });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Merges multiple Audio Blobs into ONE single WAV Audio Blob with silence separators.
 */
export async function mergeAudioBlobs(audioBlobs: Blob[], silenceGapSeconds = 0.8): Promise<Blob> {
  if (!audioBlobs || audioBlobs.length === 0) {
    throw new Error("No audio recording blobs provided to merge.");
  }

  if (audioBlobs.length === 1) {
    return audioBlobs[0];
  }

  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  const ctx = new AudioCtx();

  // Decode all audio blobs into AudioBuffers
  const audioBuffers: AudioBuffer[] = [];
  for (const blob of audioBlobs) {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const decoded = await ctx.decodeAudioData(arrayBuffer);
      audioBuffers.push(decoded);
    } catch (err) {
      console.warn("Failed to decode audio blob chunk, skipping:", err);
    }
  }

  if (audioBuffers.length === 0) {
    throw new Error("Failed to decode any audio data.");
  }

  const sampleRate = audioBuffers[0].sampleRate;
  const numberOfChannels = 1; // Normalize to mono for clear voice speech
  const gapSamples = Math.floor(sampleRate * silenceGapSeconds);

  let totalLength = 0;
  audioBuffers.forEach((buf, idx) => {
    totalLength += buf.length;
    if (idx < audioBuffers.length - 1) {
      totalLength += gapSamples;
    }
  });

  const mergedBuffer = ctx.createBuffer(numberOfChannels, totalLength, sampleRate);
  const channelData = mergedBuffer.getChannelData(0);

  let currentOffset = 0;
  audioBuffers.forEach((buf, idx) => {
    // Copy channel 0 data
    const inputChannel = buf.getChannelData(0);
    channelData.set(inputChannel, currentOffset);
    currentOffset += buf.length;

    // Add silence gap
    if (idx < audioBuffers.length - 1) {
      currentOffset += gapSamples;
    }
  });

  ctx.close();

  return bufferToWavBlob(mergedBuffer);
}

/**
 * Real-time Speech Recognition Wrapper
 */
export class SpeechToTextEngine {
  private recognition: any = null;
  private isListening = false;
  private finalTranscript = "";

  constructor(
    onTranscriptUpdate?: (transcript: string, isFinal: boolean) => void,
    onError?: (err: any) => void
  ) {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = "en-US";

      this.recognition.onresult = (event: any) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript + " ";
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const fullText = (this.finalTranscript + interimTranscript).trim();
        if (onTranscriptUpdate) {
          onTranscriptUpdate(fullText, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (onError) onError(event.error);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch (e) {
            // Already started or stopped
          }
        }
      };
    }
  }

  public start() {
    this.finalTranscript = "";
    this.isListening = true;
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Recognition start issue:", e);
      }
    }
  }

  public stop(): string {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignored
      }
    }
    return this.finalTranscript.trim();
  }

  public reset() {
    this.finalTranscript = "";
  }
}
