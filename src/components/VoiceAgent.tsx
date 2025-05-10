import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Volume2, XCircle } from 'lucide-react';
import useLiveKitRecorder from '../hooks/useLiveKitRecorder';
import { transcribeAudio, evaluateAnswer, calculateOverallScore } from '../services/openai';
import { speakText, cancelSpeech, isSpeaking } from '../services/speechService';
import { useInterviewStore } from '../store/interviewStore';
import { interviewQuestions } from '../data/interviewQuestions';
import { supabase } from '../services/supabase';
import RecordButton from './RecordButton';
import InterviewQuestion from './InterviewQuestion';
import InterviewFeedback from './InterviewFeedback';
import InterviewSummary from './InterviewSummary';
import InterviewTranscript from './InterviewTranscript';
import VoiceSettings from './VoiceSettings';
import Timer from './Timer';

interface VoiceAgentProps {
  interviewId: string;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ interviewId }) => {
  const {
    recordingState,
    audioData,
    startRecording,
    stopRecording,
    resetRecording,
    setProcessingComplete
  } = useLiveKitRecorder();

  const [speaking, setSpeaking] = useState<boolean>(false);
  const [currentTranscript, setCurrentTranscript] = useState<string>('');
  const [transcriptTimestamp, setTranscriptTimestamp] = useState<string>('');
  const [showVoiceSettings, setShowVoiceSettings] = useState<boolean>(false);
  const [interviewDetails, setInterviewDetails] = useState<{ company: string; title: string; duration_minutes: number } | null>(null);
  const [isProcessingAnswer, setIsProcessingAnswer] = useState<boolean>(false);
  const [sessionEnded, setSessionEnded] = useState<boolean>(false);
  const [hasSpokenQuestion, setHasSpokenQuestion] = useState<boolean>(false);
  const interviewStore = useInterviewStore();
  const currentQuestion = interviewQuestions[interviewStore.currentQuestionIndex];

  useEffect(() => {
    const fetchInterviewDetails = async () => {
      const { data, error } = await supabase
        .from('interviews')
        .select('company, title, duration_minutes')
        .eq('id', interviewId)
        .single();

      if (data && !error) {
        setInterviewDetails(data);
        if (!hasSpokenQuestion) {
          speakText(currentQuestion.question);
          setHasSpokenQuestion(true);
        }
      }
    };

    fetchInterviewDetails();
  }, [interviewId]);

  const handleSessionEnd = () => {
    if (!sessionEnded) {
      setSessionEnded(true);
      cancelSpeech(); // Cancel any ongoing speech
      speakText("Let's wrap up and review your performance.");
      interviewStore.completeInterview();
    }
  };

  const handleEndInterview = async () => {
    // Cancel any ongoing speech immediately
    cancelSpeech();
    
    if (recordingState.isRecording) {
      stopRecording();
    }
    
    if (!sessionEnded) {
      const finalScore = await calculateOverallScore(
        interviewStore.answers,
        interviewStore.scores
      );
      interviewStore.setOverallScore(finalScore);
      handleSessionEnd();
    }
  };

  useEffect(() => {
    const processAudio = async () => {
      if (audioData.blob && recordingState.isProcessing && !isProcessingAnswer) {
        setIsProcessingAnswer(true);
        try {
          const transcribedText = await transcribeAudio(audioData.blob);
          const timestamp = new Date().toLocaleTimeString();
          
          setCurrentTranscript(transcribedText);
          setTranscriptTimestamp(timestamp);
          interviewStore.setAnswer(currentQuestion.id, transcribedText);

          const evaluation = await evaluateAnswer(currentQuestion, transcribedText);
          
          interviewStore.setScore(currentQuestion.id, evaluation.score);
          interviewStore.setFeedback(currentQuestion.id, evaluation.feedback);
          interviewStore.setCorrection(currentQuestion.id, evaluation.correction);

          if (!sessionEnded) {
            await speakText(evaluation.feedback);

            if (interviewStore.currentQuestionIndex === interviewQuestions.length - 1) {
              const finalScore = await calculateOverallScore(
                interviewStore.answers,
                interviewStore.scores
              );
              interviewStore.setOverallScore(finalScore);
              interviewStore.completeInterview();
            } else {
              interviewStore.nextQuestion();
              const nextQuestion = interviewQuestions[interviewStore.currentQuestionIndex + 1];
              if (nextQuestion) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await speakText(nextQuestion.question);
              }
              setCurrentTranscript('');
              setTranscriptTimestamp('');
            }
          }
        } catch (error) {
          console.error('Error processing interview:', error);
        } finally {
          setProcessingComplete();
          setIsProcessingAnswer(false);
        }
      }
    };
    
    processAudio();
  }, [audioData.blob, recordingState.isProcessing, isProcessingAnswer]);

  useEffect(() => {
    const checkSpeakingStatus = () => {
      setSpeaking(isSpeaking());
    };
    
    const intervalId = setInterval(checkSpeakingStatus, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleRestart = () => {
    resetRecording();
    interviewStore.resetInterview();
    cancelSpeech();
    setSpeaking(false);
    setCurrentTranscript('');
    setTranscriptTimestamp('');
    setSessionEnded(false);
    setIsProcessingAnswer(false);
    setHasSpokenQuestion(false);
    // Speak the first question after restart
    speakText(currentQuestion.question);
    setHasSpokenQuestion(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-teal-50 p-4 md:p-8">
      <motion.div 
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center">
          <motion.div 
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-teal-400"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {speaking ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Volume2 className="h-10 w-10 text-white" />
              </motion.div>
            ) : (
              <Brain className="h-10 w-10 text-white" />
            )}
          </motion.div>
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
            {interviewDetails?.company || 'PM'} Interview Assistant
          </h1>
          <button
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className="mt-4 flex items-center justify-center rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Voice Settings
          </button>
        </div>

        {interviewDetails && !sessionEnded && (
          <div className="mb-6">
            <Timer
              duration={interviewDetails.duration_minutes * 60}
              onComplete={handleSessionEnd}
              isCountdown={true}
            />
          </div>
        )}

        {showVoiceSettings && <VoiceSettings />}

        {interviewStore.isComplete ? (
          <InterviewSummary onRestart={handleRestart} />
        ) : (
          <>
            <InterviewQuestion
              question={currentQuestion}
              isActive={recordingState.isRecording}
            />

            <div className="my-8 flex flex-col items-center">
              <div className="flex items-center space-x-4">
                <RecordButton 
                  recordingState={recordingState}
                  onStartRecording={startRecording}
                  onStopRecording={stopRecording}
                />
                
                <motion.button
                  className="flex items-center rounded-full bg-red-500 p-4 text-white shadow-lg hover:bg-red-600"
                  onClick={handleEndInterview}
                  whileTap={{ scale: 0.95 }}
                >
                  <XCircle className="h-8 w-8" />
                </motion.button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {recordingState.isRecording 
                    ? 'Recording your answer... Click to stop' 
                    : recordingState.isProcessing 
                      ? 'Processing your answer...' 
                      : 'Click to start answering'}
                </p>
                
                {recordingState.error && (
                  <motion.p 
                    className="mt-2 text-sm text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {recordingState.error}
                  </motion.p>
                )}
              </div>
            </div>

            <InterviewTranscript
              transcript={currentTranscript}
              timestamp={transcriptTimestamp}
            />

            {interviewStore.feedback[currentQuestion.id] && (
              <InterviewFeedback
                score={interviewStore.scores[currentQuestion.id]}
                feedback={interviewStore.feedback[currentQuestion.id]}
                correction={interviewStore.corrections[currentQuestion.id]}
              />
            )}
          </>
        )}
      </motion.div>
      
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>© 2025 {interviewDetails?.company || 'PM'} Interview Assistant • All rights reserved</p>
      </div>
    </div>
  );
};

export default VoiceAgent;