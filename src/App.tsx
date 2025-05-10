import React, { useState } from 'react';
import VoiceAgent from './components/VoiceAgent';
import InterviewSelection from './components/InterviewSelection';
import HomePage from './components/HomePage';

function App() {
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);
  const [showHomePage, setShowHomePage] = useState(true);

  const handleInterviewStart = (interviewId: string) => {
    setSelectedInterviewId(interviewId);
    setShowHomePage(false);
  };

  const handleStartPracticing = () => {
    setShowHomePage(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-teal-50">
      {showHomePage ? (
        <HomePage onStartPracticing={handleStartPracticing} />
      ) : selectedInterviewId ? (
        <VoiceAgent interviewId={selectedInterviewId} />
      ) : (
        <InterviewSelection onInterviewStart={handleInterviewStart} />
      )}
    </div>
  );
}

export default App;