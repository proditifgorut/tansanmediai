import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Download, Volume2, Settings, Mic, RotateCcw, Pause, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';
import toast from 'react-hot-toast';
import { getRandomAudioUrl, allVoices, Voice } from '../lib/mockData';
import GeneratedAudioItem from '../components/ui/GeneratedAudioItem';
import Skeleton from '../components/ui/Skeleton';

interface GeneratedTTS {
  id: string;
  src: string;
  voiceName: string;
  textSnippet: string;
}

const TTSPage: React.FC = () => {
  const [text, setText] = useState('Selamat datang di TansanMediai. Silakan tulis teks Anda di sini untuk diubah menjadi suara.');
  const [language, setLanguage] =useState('id');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudios, setGeneratedAudios] = useState<GeneratedTTS[]>([]);
  const [audioSettings, setAudioSettings] = useState({
    speed: 1,
    pitch: 0,
    volume: 80,
  });
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement>(null);

  const languages = [
    { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  ];
  
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');

  useEffect(() => {
    const newAvailableVoices = allVoices.filter(v => v.lang === language);
    setAvailableVoices(newAvailableVoices);
    if (newAvailableVoices.length > 0 && !newAvailableVoices.find(v => v.id === selectedVoice)) {
        setSelectedVoice(newAvailableVoices[0].id);
    }
  }, [language, selectedVoice]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to generate speech.');
      return;
    }
    if (!selectedVoice) {
      toast.error('Please select a voice.');
      return;
    }
    
    setIsGenerating(true);
    toast.loading('Generating your audio...', { id: 'tts-generation' });
    
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (Math.random() < 0.1) {
        setIsGenerating(false);
        toast.error('Generation failed. Please try again.', { id: 'tts-generation' });
    } else {
        const newAudio: GeneratedTTS = {
            id: `tts-${Date.now()}`,
            src: getRandomAudioUrl(),
            voiceName: availableVoices.find(v => v.id === selectedVoice)?.name || 'AI Voice',
            textSnippet: text.substring(0, 50) + '...'
        };
        setGeneratedAudios(prev => [newAudio, ...prev]);
        setIsGenerating(false);
        toast.success('Audio generated successfully!', { id: 'tts-generation' });
    }
  };

  const handleDeleteAudio = (id: string) => {
    setGeneratedAudios(prev => prev.filter(audio => audio.id !== id));
    toast.success('Generated audio removed.');
  };

  const handleClearHistory = () => {
    setGeneratedAudios([]);
    toast.success('Generation history cleared.');
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAudioSettings(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  };

  const handlePreview = (e: React.MouseEvent, voice: Voice) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = previewAudioRef.current;
    if (!audio) return;

    if (playingPreview === voice.id) {
      audio.pause();
      setPlayingPreview(null);
    } else {
      audio.src = voice.sampleUrl;
      audio.play().catch(err => console.error("Audio play failed:", err));
      setPlayingPreview(voice.id);
    }
  };

  useEffect(() => {
    const audio = previewAudioRef.current;
    if (audio) {
      const onEnded = () => setPlayingPreview(null);
      audio.addEventListener('ended', onEnded);
      return () => audio.removeEventListener('ended', onEnded);
    }
  }, []);

  return (
    <div className="min-h-screen py-10">
      <audio ref={previewAudioRef} className="hidden" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="AI Text-to-Speech" 
          subtitle="Transform your text into natural-sounding speech with our advanced AI voices"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-purple-400" />
                  <h2 className="text-xl font-semibold text-white">Your Text</h2>
                </div>
                <button onClick={() => setText('')} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Text</span>
                </button>
              </div>
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here... (up to 5000 characters)"
                className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"
                maxLength={5000}
              />
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">
                  {text.length}/5000 characters
                </span>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Generate Speech</span>
                    </>
                  )}
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5 text-purple-400" />
                    <h2 className="text-xl font-semibold text-white">Generation History</h2>
                </div>
                {generatedAudios.length > 0 && (
                    <button onClick={handleClearHistory} className="flex items-center space-x-2 text-sm text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-4 h-4" />
                        <span>Clear All</span>
                    </button>
                )}
              </div>
              
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {isGenerating && (
                    <div className="bg-white/5 p-4 rounded-lg">
                        <Skeleton className="w-1/3 h-5 mb-2" />
                        <Skeleton className="w-2/3 h-4 mb-4" />
                        <Skeleton className="w-full h-12" />
                    </div>
                )}
                <AnimatePresence>
                    {generatedAudios.map((audio) => (
                        <GeneratedAudioItem
                            key={audio.id}
                            id={audio.id}
                            src={audio.src}
                            title={audio.textSnippet}
                            details={`Voice: ${audio.voiceName}`}
                            onDelete={handleDeleteAudio}
                        />
                    ))}
                </AnimatePresence>
                {!isGenerating && generatedAudios.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <p>Your generated audio will appear here.</p>
                    </div>
                )}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Language</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-gray-800">
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Voice</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {availableVoices.map((voice) => (
                  <label key={voice.id} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${selectedVoice === voice.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <input
                      type="radio"
                      name="voice"
                      value={voice.id}
                      checked={selectedVoice === voice.id}
                      onChange={(e) => setSelectedVoice(e.target.value)}
                      className="w-4 h-4 text-purple-400 bg-transparent border-gray-500 focus:ring-purple-400"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{voice.name}</span>
                        <button onClick={(e) => handlePreview(e, voice)} className="p-1 text-purple-400 hover:text-purple-300">
                          {playingPreview === voice.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                      <div className="text-sm text-gray-400">
                        {voice.gender} • {voice.age} • {voice.style}
                      </div>
                    </div>
                  </label>
                ))}
                 {availableVoices.length === 0 && (
                  <p className="text-gray-400 text-center p-4">No voices available for this language.</p>
                )}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Speed ({audioSettings.speed.toFixed(1)}x)</label>
                  <input type="range" name="speed" min="0.5" max="2" step="0.1" value={audioSettings.speed} onChange={handleSettingsChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Pitch ({audioSettings.pitch > 0 ? '+' : ''}{audioSettings.pitch})</label>
                  <input type="range" name="pitch" min="-10" max="10" step="1" value={audioSettings.pitch} onChange={handleSettingsChange} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Volume ({audioSettings.volume}%)</label>
                  <input type="range" name="volume" min="0" max="100" step="5" value={audioSettings.volume} onChange={handleSettingsChange} className="w-full" />
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TTSPage;
