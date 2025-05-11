import React, { useState } from 'react';
import Hero from './components/Hero';
import InterviewList from './components/InterviewList';
import FooterCTA from './components/FooterCTA';
import InterviewSelection from './components/InterviewSelection';
import VoiceAgent from './components/VoiceAgent';

function App() {
  const [showInterviewSelection, setShowInterviewSelection] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);

  const handleStartPracticing = () => {
    setShowInterviewSelection(true);
  };

  const handleInterviewStart = (id: string) => {
    setSelectedInterviewId(id);
  };

  if (selectedInterviewId) {
    return <VoiceAgent interviewId={selectedInterviewId} />;
  }

  if (showInterviewSelection) {
    return <InterviewSelection onInterviewStart={handleInterviewStart} />;
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Hero />
      <div className="py-24">
        <InterviewList />
      </div>
      <FooterCTA onBeginPractice={handleStartPracticing} />
    </div>
  );
}

export default App;