export const speakText = async (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error('Speech synthesis not supported in this browser.'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configure voice settings
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch
    utterance.volume = 1.0; // Full volume
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to get the saved voice preference
    const savedVoiceURI = localStorage.getItem('selectedVoice');
    const selectedVoice = savedVoiceURI
      ? voices.find(voice => voice.voiceURI === savedVoiceURI)
      : voices.find(
          voice => 
            voice.lang === 'en-US' && 
            voice.name.includes('Google')
        ) || voices.find(
          voice => voice.lang === 'en-US'
        ) || voices.find(
          voice => voice.lang.startsWith('en')
        );
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Add event handlers
    utterance.onend = () => {
      resolve();
    };
    
    utterance.onerror = (event) => {
      reject(new Error(`Speech synthesis error: ${event.error}`));
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  });
};

// Cancel any ongoing speech
export const cancelSpeech = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

// Check if speech is currently being spoken
export const isSpeaking = (): boolean => {
  return window.speechSynthesis ? window.speechSynthesis.speaking : false;
};