import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check } from 'lucide-react';

interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
}

const VoiceSettings: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
        .filter(voice => voice.lang.startsWith('en'))
        .map(voice => ({
          name: voice.name,
          lang: voice.lang,
          voiceURI: voice.voiceURI
        }));
      setVoices(availableVoices);

      // Set default voice from localStorage or first available voice
      const savedVoice = localStorage.getItem('selectedVoice');
      if (savedVoice && availableVoices.some(v => v.voiceURI === savedVoice)) {
        setSelectedVoice(savedVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].voiceURI);
        localStorage.setItem('selectedVoice', availableVoices[0].voiceURI);
      }
    };

    // Load voices initially
    loadVoices();

    // Add event listener for when voices change
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleVoiceChange = (voiceURI: string) => {
    setSelectedVoice(voiceURI);
    localStorage.setItem('selectedVoice', voiceURI);
  };

  return (
    <motion.div
      className="mb-6 rounded-lg bg-white p-4 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-3 flex items-center">
        <Volume2 className="mr-2 h-5 w-5 text-purple-600" />
        <h3 className="text-lg font-medium text-gray-900">Voice Settings</h3>
      </div>
      
      <div className="grid gap-2">
        {voices.map((voice) => (
          <button
            key={voice.voiceURI}
            onClick={() => handleVoiceChange(voice.voiceURI)}
            className={`flex items-center justify-between rounded-lg p-3 text-left transition-colors ${
              selectedVoice === voice.voiceURI
                ? 'bg-purple-50 text-purple-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div>
              <div className="font-medium">{voice.name}</div>
              <div className="text-sm text-gray-500">{voice.lang}</div>
            </div>
            {selectedVoice === voice.voiceURI && (
              <Check className="h-5 w-5 text-purple-600" />
            )}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default VoiceSettings;