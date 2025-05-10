export interface RecordingState {
  isRecording: boolean;
  isPaused: boolean;
  isProcessing: boolean;
  error: string | null;
}

export interface TranscriptData {
  text: string;
  isLoading: boolean;
  error: string | null;
}

export interface SummaryData {
  text: string;
  isLoading: boolean;
  error: string | null;
}

export interface AudioData {
  blob: Blob | null;
  url: string | null;
}