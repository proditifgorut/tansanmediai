import React, { useState } from 'react';
import { FileText, Mic, Play, Save, Upload, Wand2, Plus } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import Timeline, { TimelineTrack } from '../../components/dashboard/Timeline';
import toast from 'react-hot-toast';

const VoiceoverStudioPage: React.FC = () => {
  const [script, setScript] = useState("Welcome to the Voiceover Studio. Here you can type your script, and our AI will generate the audio track for your project. Add more lines to see them appear on the timeline.");
  const [selectedVoice, setSelectedVoice] = useState('professional-male');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [timelineTracks, setTimelineTracks] = useState<TimelineTrack[]>([
    { id: 'video1', type: 'video', name: 'Background Video.mp4', duration: 100, offset: 0, color: 'bg-teal-500' },
    { id: 'music1', type: 'music', name: 'Background Music.mp3', duration: 100, offset: 0, color: 'bg-orange-500' },
  ]);

  const handleGenerateVoiceover = async () => {
    if (!script.trim()) {
      toast.error("Script can't be empty.");
      return;
    }
    setIsGenerating(true);
    toast.loading("Generating voiceover...", { id: 'vo-gen' });

    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTrack: TimelineTrack = {
      id: `vo-${Math.random()}`,
      type: 'audio',
      name: `Voiceover (${selectedVoice})`,
      duration: script.length / 15, // Approximate duration
      offset: 0,
      color: 'bg-blue-500'
    };

    setTimelineTracks(prev => [...prev, newTrack]);
    setIsGenerating(false);
    toast.success("Voiceover added to timeline!", { id: 'vo-gen' });
  };

  return (
    <div>
      <PageHeader title="Voiceover Studio" subtitle="A complete environment for creating and syncing AI voiceovers with your media." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Script and Voice */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <GlassCard className="p-6 flex-grow flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Script</h3>
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full flex-grow bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"
            />
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Voice Selection</h3>
              <Mic className="w-5 h-5 text-purple-400" />
            </div>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="professional-male" className="bg-gray-800">Professional Male</option>
              <option value="warm-female" className="bg-gray-800">Warm Female</option>
              <option value="character-voice" className="bg-gray-800">Character Voice (Cloned)</option>
            </select>
            <button 
              onClick={handleGenerateVoiceover}
              disabled={isGenerating}
              className="w-full mt-4 py-2 bg-gradient-purple rounded-lg text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Generate & Add to Timeline</span>
                </>
              )}
            </button>
          </GlassCard>
        </div>

        {/* Right Panel: Preview and Timeline */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Studio Preview</h3>
              <div className="flex items-center gap-2">
                <button title="Upload Media" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-white"><Upload className="w-4 h-4" /></button>
                <button title="Play" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-white"><Play className="w-4 h-4" /></button>
                <button title="Export Project" className="p-2 bg-gradient-purple rounded-lg text-white"><Save className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Video Preview</p>
            </div>
          </GlassCard>
          <GlassCard className="p-6 flex-grow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Timeline</h3>
              <button title="Add Track" className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-white">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Timeline tracks={timelineTracks} />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default VoiceoverStudioPage;
