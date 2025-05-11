import React, { useState } from 'react';
import Hero from './components/Hero';
import InterviewList from './components/InterviewList';
import FooterCTA from './components/FooterCTA';
import InterviewSelection from './components/InterviewSelection';

function App() {
  const [showInterviewSelection, setShowInterviewSelection] = useState(false);

  const handleStartPracticing = () => {
    setShowInterviewSelection(true);
  };

  if (showInterviewSelection) {
    return <InterviewSelection onInterviewStart={(id) => console.log('Starting interview:', id)} />;
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