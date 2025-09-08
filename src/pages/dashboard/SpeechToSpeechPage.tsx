import React, { useState } from 'react';
import { AudioLines, Upload, Mic, Play, Download, Wand2 } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

const SpeechToSpeechPage: React.FC = () => {
  const [sourceAudio, setSourceAudio] = useState<File | null>(null);
  const [targetVoice, setTargetVoice] = useState('professional-male');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);

  const aiVoices = [
    { id: 'professional-male', name: 'Professional Male', category: 'Corporate' },
    { id: 'cheerful-female', name: 'Cheerful Female', category: 'Advertisement' },
    { id: 'old-storyteller', name: 'Old Storyteller', category: 'Narration' },
    { id: 'energetic-youth', name: 'Energetic Youth', category: 'Podcast' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSourceAudio(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!sourceAudio) {
      toast.error('Please upload a source audio file.');
      return;
    }
    setIsGenerating(true);
    setGeneratedAudio(null);
    toast.loading('Transforming speech...', { id: 's2s' });

    await new Promise(resolve => setTimeout(resolve, 4000));

    setGeneratedAudio('https://archive.org/download/test-mp3-file/test.mp3');
    setIsGenerating(false);
    toast.success('Speech transformed successfully!', { id: 's2s' });
  };

  return (
    <div>
      <PageHeader title="Speech to Speech" subtitle="Transform the style and character of any voice recording." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Upload className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Source Audio</h3>
            </div>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
              <input type="file" id="s2s-upload" className="hidden" accept="audio/*" onChange={handleFileChange} />
              <label htmlFor="s2s-upload" className="cursor-pointer">
                <AudioLines className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-300 mb-2">Drop your audio file here or click to upload</p>
                <p className="text-sm text-gray-400">MP3, WAV, M4A (max 25MB)</p>
              </label>
            </div>
            {sourceAudio && (
              <div className="mt-4 p-3 bg-white/5 rounded-lg flex justify-between items-center">
                <p className="text-white text-sm">{sourceAudio.name}</p>
                <audio src={URL.createObjectURL(sourceAudio)} controls className="h-8" />
              </div>
            )}
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Transformed Audio</h3>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 flex items-center justify-center">
              {generatedAudio ? (
                <div className="w-full">
                  <audio controls src={generatedAudio} className="w-full" />
                  <div className="flex justify-end mt-4">
                    <a href={generatedAudio} download="tansanmediai-s2s.mp3" className="flex items-center space-x-2 px-4 py-2 bg-gradient-purple rounded-lg text-white text-sm hover:opacity-90">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>Your transformed audio will appear here.</p>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mic className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Target Voice</h3>
            </div>
            <div className="space-y-3">
              {aiVoices.map(voice => (
                <label key={voice.id} className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${targetVoice === voice.id ? 'bg-white/10' : 'hover:bg-white/5'}`}>
                  <input
                    type="radio"
                    name="voice"
                    value={voice.id}
                    checked={targetVoice === voice.id}
                    onChange={(e) => setTargetVoice(e.target.value)}
                    className="w-4 h-4 text-purple-400 bg-transparent border-gray-500 focus:ring-purple-400"
                  />
                  <div className="flex-1">
                    <span className="text-white font-medium">{voice.name}</span>
                    <p className="text-sm text-gray-400">{voice.category}</p>
                  </div>
                </label>
              ))}
            </div>
          </GlassCard>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !sourceAudio}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Transforming...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Transform Speech</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechToSpeechPage;
