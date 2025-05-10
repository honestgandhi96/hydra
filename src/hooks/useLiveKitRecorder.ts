import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioData, RecordingState } from '../types';
import livekitService from '../services/livekitService';

const useLiveKitRecorder = () => {
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
  const streamRef = useRef<MediaStream | null>(null);
  
  // Setup LiveKit on component mount
  useEffect(() => {
    const setupLiveKit = async () => {
      try {
        // In a real app, we would connect to LiveKit here
        // For demo, we'll just initialize
        console.log('LiveKit service initialized');
      } catch (error) {
        console.error('Failed to initialize LiveKit', error);
        setRecordingState(prev => ({
          ...prev, 
          error: 'Failed to initialize voice service.'
        }));
      }
    };
    
    setupLiveKit();
    
    // Cleanup on unmount
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      livekitService.disconnect();
    };
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Use browser's MediaRecorder as backup, but with LiveKit processing
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 48000,
        } 
      });
      
      streamRef.current = stream;
      
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Create new media recorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      
      // Add data handler
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Add stop handler
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
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
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
        
        // Also stop LiveKit audio capture
        livekitService.stopAudioCapture();
      };
      
      // Start recording with MediaRecorder
      mediaRecorder.start();
      
      // Start LiveKit audio processing in parallel
      await livekitService.startAudioCapture();
      
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

export default useLiveKitRecorder;