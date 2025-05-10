import { useState, useRef, useCallback } from 'react';
import { AudioData, RecordingState } from '../types';

const useAudioRecorder = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    isProcessing: false,
    error: null,
  });
  const [audioData, setAudioData] = useState<AudioData>({
    blob: null,
    url: null,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Create new media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Add data handler
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Add stop handler
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        setAudioData({
          blob: audioBlob,
          url: audioUrl,
        });
        
        setRecordingState(prev => ({
          ...prev,
          isRecording: false,
          isProcessing: true,
        }));
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      // Start recording
      mediaRecorder.start();
      
      setRecordingState({
        isRecording: true,
        isPaused: false,
        isProcessing: false,
        error: null,
      });
    } catch (error) {
      setRecordingState({
        isRecording: false,
        isPaused: false,
        isProcessing: false,
        error: 'Failed to access microphone. Please check permissions.',
      });
      console.error('Error accessing media devices:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [recordingState.isRecording]);

  const resetRecording = useCallback(() => {
    if (audioData.url) {
      URL.revokeObjectURL(audioData.url);
    }
    
    setAudioData({
      blob: null,
      url: null,
    });
    
    setRecordingState({
      isRecording: false,
      isPaused: false,
      isProcessing: false,
      error: null,
    });
  }, [audioData.url]);

  const setProcessingComplete = useCallback(() => {
    setRecordingState(prev => ({
      ...prev,
      isProcessing: false,
    }));
  }, []);

  return {
    recordingState,
    audioData,
    startRecording,
    stopRecording,
    resetRecording,
    setProcessingComplete,
  };
};

export default useAudioRecorder;