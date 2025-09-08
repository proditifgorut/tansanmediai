import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Play, Download, Sparkles, FileText, Wand2, Trash2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GeneratedAudioItem from '../components/ui/GeneratedAudioItem';
import Skeleton from '../components/ui/Skeleton';
import toast from 'react-hot-toast';
import { getRandomAudioUrl } from '../lib/mockData';

interface GeneratedSong {
  id: string;
  src: string;
  title: string;
  details: string;
}

const AIMusicPage: React.FC = () => {
  const [mode, setMode] = useState<'lyrics' | 'instrumental' | 'inspiration'>('inspiration');
  const [lyrics, setLyrics] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [genre, setGenre] = useState('pop');
  const [mood, setMood] = useState('happy');
  const [duration, setDuration] = useState('2');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSongs, setGeneratedSongs] = useState<GeneratedSong[]>([]);

  const genres = ['Pop', 'Rock', 'Jazz', 'EDM', 'Hip Hop', 'Classical', 'Country', 'Folk', 'R&B', 'Reggae'];
  const moods = ['Happy', 'Sad', 'Epic', 'Calm', 'Energetic', 'Romantic', 'Mysterious', 'Uplifting'];

  const handleGenerate = async () => {
    setIsGenerating(true);
    toast.loading('Creating your masterpiece...', { id: 'music-gen' });
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newSong: GeneratedSong = {
      id: `music-${Date.now()}`,
      src: getRandomAudioUrl(),
      title: `AI Song (${genre})`,
      details: `Mood: ${mood}, Duration: ${duration} min`,
    };
    setGeneratedSongs(prev => [newSong, ...prev]);
    setIsGenerating(false);
    toast.success('Song created successfully!', { id: 'music-gen' });
  };

  const handleDeleteSong = (id: string) => {
    setGeneratedSongs(prev => prev.filter(song => song.id !== id));
    toast.success('Generated song removed.');
  };

  const handleClearHistory = () => {
    setGeneratedSongs([]);
    toast.success('Generation history cleared.');
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader title="AI Music Generator" subtitle="Create original music from lyrics, inspiration, or generate instrumentals" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GlassCard className="p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">Creation Mode</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Mode Buttons */}
                <button onClick={() => setMode('inspiration')} className={`p-4 rounded-lg border-2 transition-all ${mode === 'inspiration' ? 'border-purple-400 bg-purple-400/20' : 'border-white/10 hover:border-white/20'}`}><Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" /><div className="text-white font-medium">Inspiration</div><div className="text-gray-400 text-sm">Describe</div></button>
                <button onClick={() => setMode('lyrics')} className={`p-4 rounded-lg border-2 transition-all ${mode === 'lyrics' ? 'border-purple-400 bg-purple-400/20' : 'border-white/10 hover:border-white/20'}`}><FileText className="w-6 h-6 text-purple-400 mx-auto mb-2" /><div className="text-white font-medium">Lyrics</div><div className="text-gray-400 text-sm">Provide</div></button>
                <button onClick={() => setMode('instrumental')} className={`p-4 rounded-lg border-2 transition-all ${mode === 'instrumental' ? 'border-purple-400 bg-purple-400/20' : 'border-white/10 hover:border-white/20'}`}><Music className="w-6 h-6 text-purple-400 mx-auto mb-2" /><div className="text-white font-medium">Instrumental</div><div className="text-gray-400 text-sm">Music only</div></button>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              {/* Input Area */}
              {mode === 'inspiration' && (<div><div className="flex items-center space-x-2 mb-4"><Sparkles className="w-5 h-5 text-purple-400" /><h3 className="text-lg font-semibold text-white">Describe Your Song</h3></div><textarea value={inspiration} onChange={(e) => setInspiration(e.target.value)} placeholder="e.g., 'A cheerful pop song about summer vacation...'" className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"/></div>)}
              {mode === 'lyrics' && (<div><div className="flex items-center space-x-2 mb-4"><FileText className="w-5 h-5 text-purple-400" /><h3 className="text-lg font-semibold text-white">Song Lyrics</h3></div><textarea value={lyrics} onChange={(e) => setLyrics(e.target.value)} placeholder="Enter your song lyrics here..." className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"/></div>)}
              {mode === 'instrumental' && (<div><div className="flex items-center space-x-2 mb-4"><Music className="w-5 h-5 text-purple-400" /><h3 className="text-lg font-semibold text-white">Instrumental Music</h3></div><p className="text-gray-400 mb-4">Configure settings in the sidebar to generate music without vocals.</p></div>)}
              
              <div className="flex justify-end mt-6">
                <button onClick={handleGenerate} disabled={isGenerating || (mode === 'lyrics' && !lyrics.trim()) || (mode === 'inspiration' && !inspiration.trim())} className="flex items-center space-x-2 px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity">
                  {isGenerating ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Creating...</span></>) : (<><Wand2 className="w-4 h-4" /><span>Create Song</span></>)}
                </button>
              </div>
            </GlassCard>

            <GlassCard className="p-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2"><Music className="w-5 h-5 text-purple-400" /><h3 className="text-xl font-semibold text-white">Generated Music</h3></div>
                {generatedSongs.length > 0 && (<button onClick={handleClearHistory} className="flex items-center space-x-2 text-sm text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /><span>Clear All</span></button>)}
              </div>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                {isGenerating && (<div className="bg-white/5 p-4 rounded-lg"><Skeleton className="w-1/3 h-5 mb-2" /><Skeleton className="w-2/3 h-4 mb-4" /><Skeleton className="w-full h-12" /></div>)}
                <AnimatePresence>
                  {generatedSongs.map((song) => (
                    <GeneratedAudioItem key={song.id} id={song.id} src={song.src} title={song.title} details={song.details} onDelete={handleDeleteSong} />
                  ))}
                </AnimatePresence>
                {!isGenerating && generatedSongs.length === 0 && (<div className="text-center py-10 text-gray-400"><p>Your AI-generated music will appear here.</p></div>)}
              </div>
            </GlassCard>
          </div>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Genre</h3>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">{genres.map((g) => (<option key={g} value={g.toLowerCase()} className="bg-gray-800">{g}</option>))}</select>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Mood</h3>
              <select value={mood} onChange={(e) => setMood(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">{moods.map((m) => (<option key={m} value={m.toLowerCase()} className="bg-gray-800">{m}</option>))}</select>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Duration</h3>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"><option value="1" className="bg-gray-800">1 minute</option><option value="2" className="bg-gray-800">2 minutes</option><option value="3" className="bg-gray-800">3 minutes</option></select>
            </GlassCard>
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Usage</h3>
              <div className="space-y-3"><div className="flex justify-between"><span className="text-gray-400">Songs this month:</span><span className="text-white">3/10</span></div><div className="w-full bg-white/10 rounded-full h-2"><div className="bg-gradient-purple h-2 rounded-full" style={{ width: '30%' }}></div></div><p className="text-sm text-gray-400">7 songs remaining in your plan</p></div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMusicPage;
