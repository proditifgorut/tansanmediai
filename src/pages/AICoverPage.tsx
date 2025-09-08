import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Upload, Play, Download, Mic2, Music, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GeneratedAudioItem from '../components/ui/GeneratedAudioItem';
import Skeleton from '../components/ui/Skeleton';
import toast from 'react-hot-toast';
import { getRandomAudioUrl } from '../lib/mockData';

interface GeneratedCover {
  id: string;
  src: string;
  title: string;
  details: string;
}

const AICoverPage: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('');
  const [pitch, setPitch] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCovers, setGeneratedCovers] = useState<GeneratedCover[]>([]);

  const aiVoices = [
    { id: 'taylor-swift', name: 'Taylor Swift Style', category: 'Pop Singer' },
    { id: 'ed-sheeran', name: 'Ed Sheeran Style', category: 'Singer-Songwriter' },
    { id: 'beyonce', name: 'Beyoncé Style', category: 'R&B Singer' },
    { id: 'john-legend', name: 'John Legend Style', category: 'Soul Singer' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setYoutubeUrl('');
    }
  };

  const handleGenerate = async () => {
    if ((!audioFile && !youtubeUrl) || !selectedVoice) {
      toast.error('Please provide an audio source and select a voice.');
      return;
    }
    
    setIsGenerating(true);
    toast.loading('Generating your AI cover...', { id: 'cover-gen' });
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const newCover: GeneratedCover = {
        id: `cover-${Date.now()}`,
        src: getRandomAudioUrl(),
        title: `AI Cover of ${audioFile?.name || 'YouTube Video'}`,
        details: `Voice: ${aiVoices.find(v => v.id === selectedVoice)?.name || 'AI Voice'} | Pitch: ${pitch > 0 ? '+' : ''}${pitch}`
    };
    setGeneratedCovers(prev => [newCover, ...prev]);
    setIsGenerating(false);
    toast.success('AI cover generated successfully!', { id: 'cover-gen' });
  };

  const handleDeleteCover = (id: string) => {
    setGeneratedCovers(prev => prev.filter(cover => cover.id !== id));
    toast.success('Generated cover removed.');
  };

  const handleClearHistory = () => {
    setGeneratedCovers([]);
    toast.success('Generation history cleared.');
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="AI Voice Cover" subtitle="Transform any song with AI voices and create amazing covers" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4"><Upload className="w-5 h-5 text-purple-400" /><h2 className="text-xl font-semibold text-white">Audio Source</h2></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Upload Audio File</h3>
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input type="file" accept=".mp3,.wav,.m4a" onChange={handleFileUpload} className="hidden" id="audio-upload" />
                    <label htmlFor="audio-upload" className="cursor-pointer"><Music className="w-12 h-12 text-gray-400 mx-auto mb-3" /><p className="text-gray-300 mb-2">Drop your audio file here</p><p className="text-sm text-gray-400">MP3, WAV, M4A (max 50MB)</p></label>
                  </div>
                  {audioFile && (<div className="mt-3 p-3 bg-white/5 rounded-lg"><p className="text-white text-sm">{audioFile.name}</p></div>)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">YouTube URL</h3>
                  <input type="url" value={youtubeUrl} onChange={(e) => { setYoutubeUrl(e.target.value); if (e.target.value) setAudioFile(null); }} placeholder="https://youtube.com/watch?v=..." className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400" />
                  <p className="text-sm text-gray-400 mt-2">Paste a YouTube link to use as source</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6 mb-6">
              <div className="flex items-center space-x-2 mb-4"><Mic2 className="w-5 h-5 text-purple-400" /><h2 className="text-xl font-semibold text-white">Voice Processing</h2></div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Pitch Adjustment</label>
                <input type="range" min="-12" max="12" step="1" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>-12</span><span>0</span><span>+12</span></div>
                <p className="text-sm text-gray-400 mt-2">Current: {pitch > 0 ? '+' : ''}{pitch} semitones</p>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={handleGenerate} disabled={(!audioFile && !youtubeUrl) || !selectedVoice || isGenerating} className="flex items-center space-x-2 px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                  {isGenerating ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Processing...</span></>) : (<><Headphones className="w-4 h-4" /><span>Generate Cover</span></>)}
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2"><Headphones className="w-5 h-5 text-purple-400" /><h2 className="text-xl font-semibold text-white">Generated Covers</h2></div>
                {generatedCovers.length > 0 && (<button onClick={handleClearHistory} className="flex items-center space-x-2 text-sm text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /><span>Clear All</span></button>)}
              </div>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {isGenerating && (<div className="bg-white/5 p-4 rounded-lg"><Skeleton className="w-1/3 h-5 mb-2" /><Skeleton className="w-2/3 h-4 mb-4" /><Skeleton className="w-full h-12" /></div>)}
                <AnimatePresence>
                  {generatedCovers.map((cover) => (
                    <GeneratedAudioItem key={cover.id} id={cover.id} src={cover.src} title={cover.title} details={cover.details} onDelete={handleDeleteCover} />
                  ))}
                </AnimatePresence>
                {!isGenerating && generatedCovers.length === 0 && (<div className="text-center py-10 text-gray-400"><p>Your AI voice covers will appear here.</p></div>)}
              </div>
            </GlassCard>
          </div>

          <div>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Voice Models</h3>
              <div className="space-y-3">
                {aiVoices.map((voice) => (
                  <label key={voice.id} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${selectedVoice === voice.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                    <input type="radio" name="voice" value={voice.id} checked={selectedVoice === voice.id} onChange={(e) => setSelectedVoice(e.target.value)} className="w-4 h-4 text-purple-400 bg-transparent border-gray-500 focus:ring-purple-400" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center"><span className="text-white font-medium">{voice.name}</span><button className="text-purple-400 hover:text-purple-300"><Play className="w-4 h-4" /></button></div>
                      <div className="text-sm text-gray-400">{voice.category}</div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h4 className="text-white font-medium mb-2">Custom Voice Training</h4>
                <p className="text-sm text-gray-400 mb-3">Upload your own voice samples to create a custom AI voice model.</p>
                <button className="w-full py-2 bg-gradient-purple rounded-lg text-white text-sm hover:opacity-90 transition-opacity">Upload Voice Samples</button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoverPage;
