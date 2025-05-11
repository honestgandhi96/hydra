import React from 'react';
import Hero from './components/Hero';
import InterviewList from './components/InterviewList';
import FooterCTA from './components/FooterCTA';

function App() {
  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      <Hero />
      <div className="py-24">
        <InterviewList />
      </div>
      <FooterCTA />
    </div>
  );
}

export default App;