import React, { useState } from 'react';
import { Video, FileText, Palette, Mic, Wand2, Download, Play } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

const VideoGeneratorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('cinematic');
  const [voice, setVoice] = useState('male-narrator');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate a video.');
      return;
    }
    setIsGenerating(true);
    setGeneratedVideo(null);
    toast.loading('Generating your cinematic video...', { id: 'video-gen' });

    await new Promise(resolve => setTimeout(resolve, 8000));

    setGeneratedVideo('https://img-wrapper.vercel.app/image?url=https://placehold.co/1920x1080.mp4?text=Your+AI+Video');
    setIsGenerating(false);
    toast.success('Video generated successfully!', { id: 'video-gen' });
  };

  return (
    <div>
      <PageHeader title="AI Video Generator" subtitle="Produce high-quality, full-length videos from a simple text prompt." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Video Prompt</h3>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your video in detail. For example: 'A documentary-style video about the history of space exploration, starting with the space race and ending with future mars missions. Use epic orchestral music and a deep male narrator voice.'"
              className="w-full h-40 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"
            />
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Play className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Generated Video</h3>
            </div>
            <div className="w-full aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              {generatedVideo ? (
                <video src={generatedVideo} controls className="w-full h-full rounded-lg" />
              ) : (
                <div className="text-center text-gray-400">
                  <Video className="w-16 h-16 mx-auto mb-4" />
                  <p>Your generated video will appear here.</p>
                </div>
              )}
            </div>
            {generatedVideo && (
              <div className="flex justify-end mt-4">
                <a href={generatedVideo} download="tansanmediai-video.mp4" className="flex items-center space-x-2 px-6 py-2 bg-gradient-purple rounded-lg text-white text-sm hover:opacity-90 transition-opacity">
                  <Download className="w-4 h-4" />
                  <span>Download Video</span>
                </a>
              </div>
            )}
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Visual Style</h3>
            </div>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="cinematic" className="bg-gray-800">Cinematic</option>
              <option value="documentary" className="bg-gray-800">Documentary</option>
              <option value="animated" className="bg-gray-800">Animated Explainer</option>
              <option value="vibrant" className="bg-gray-800">Vibrant & Modern</option>
              <option value="vintage" className="bg-gray-800">Vintage Film</option>
            </select>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mic className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Voiceover</h3>
            </div>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="male-narrator" className="bg-gray-800">Deep Male Narrator</option>
              <option value="female-presenter" className="bg-gray-800">Clear Female Presenter</option>
              <option value="energetic-male" className="bg-gray-800">Energetic Male</option>
              <option value="calm-female" className="bg-gray-800">Calm Female</option>
              <option value="no-voiceover" className="bg-gray-800">No Voiceover</option>
            </select>
          </GlassCard>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Generate Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoGeneratorPage;
