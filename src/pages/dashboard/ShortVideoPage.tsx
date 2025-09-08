import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, FileText, Film, Ratio, Wand2, Download, Play, Link as LinkIcon, Mic, Music } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

const ShortVideoPage: React.FC = () => {
  const [inputType, setInputType] = useState<'script' | 'url'>('script');
  const [script, setScript] = useState('');
  const [url, setUrl] = useState('');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [videoStyle, setVideoStyle] = useState('engaging');
  const [voice, setVoice] = useState('male-energetic');
  const [music, setMusic] = useState('upbeat-pop');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (inputType === 'script' && !script.trim()) {
      toast.error('Please provide a script for the video.');
      return;
    }
    if (inputType === 'url' && !url.trim()) {
      toast.error('Please provide a URL to summarize.');
      return;
    }
    setIsGenerating(true);
    setGeneratedVideo(null);
    toast.loading('Generating your short video...', { id: 'short-video' });

    await new Promise(resolve => setTimeout(resolve, 5000));

    setGeneratedVideo('https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/1080x1920.mp4?text=Your+Video');
    setIsGenerating(false);
    toast.success('Video generated successfully!', { id: 'short-video' });
  };

  return (
    <div>
      <PageHeader title="AI Short Video Generator" subtitle="Create engaging, short-form videos for social media in seconds." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            <div className="flex border-b border-white/10 mb-4">
              <button onClick={() => setInputType('script')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${inputType === 'script' ? 'border-b-2 border-purple-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                <FileText className="w-4 h-4" /> Script
              </button>
              <button onClick={() => setInputType('url')} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${inputType === 'url' ? 'border-b-2 border-purple-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                <LinkIcon className="w-4 h-4" /> Article URL
              </button>
            </div>
            
            {inputType === 'script' ? (
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Enter your video script here. The AI will generate scenes, voiceover, and captions based on your text."
                className="w-full h-48 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-purple-400"
              />
            ) : (
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article-to-summarize"
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating Video...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Video</span>
                  </>
                )}
              </button>
            </div>
          </GlassCard>
        </div>
        <div className="space-y-6">
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Ratio className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Aspect Ratio</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['9:16', '1:1', '16:9'].map(ratio => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 rounded-lg border-2 text-sm transition-colors ${
                    aspectRatio === ratio ? 'border-purple-400 bg-purple-400/20 text-white' : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Video Style</h3>
            </div>
            <select value={videoStyle} onChange={(e) => setVideoStyle(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">
              <option value="engaging" className="bg-gray-800">Engaging & Fast-Paced</option>
              <option value="cinematic" className="bg-gray-800">Cinematic Story</option>
              <option value="minimalist" className="bg-gray-800">Minimalist & Clean</option>
              <option value="corporate" className="bg-gray-800">Professional & Corporate</option>
            </select>
          </GlassCard>
           <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Mic className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Voice</h3>
            </div>
            <select value={voice} onChange={(e) => setVoice(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">
              <option value="male-energetic" className="bg-gray-800">Male (Energetic)</option>
              <option value="female-calm" className="bg-gray-800">Female (Calm)</option>
              <option value="male-deep" className="bg-gray-800">Male (Deep)</option>
              <option value="female-professional" className="bg-gray-800">Female (Professional)</option>
            </select>
          </GlassCard>
           <GlassCard className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Background Music</h3>
            </div>
            <select value={music} onChange={(e) => setMusic(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-purple-400">
              <option value="upbeat-pop" className="bg-gray-800">Upbeat Pop</option>
              <option value="cinematic-orchestral" className="bg-gray-800">Cinematic Orchestral</option>
              <option value="lofi-hiphop" className="bg-gray-800">Lofi Hiphop</option>
              <option value="corporate-ambient" className="bg-gray-800">Corporate Ambient</option>
            </select>
          </GlassCard>
        </div>
      </div>
      <div className="mt-8">
        <GlassCard className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Play className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Preview</h3>
          </div>
          <div className="w-full aspect-[9/16] max-w-sm mx-auto bg-slate-800 rounded-lg flex items-center justify-center">
            {generatedVideo ? (
              <video src={generatedVideo} controls className="w-full h-full rounded-lg" />
            ) : (
              <div className="text-center text-gray-400">
                <Clapperboard className="w-16 h-16 mx-auto mb-4" />
                <p>Your generated video will appear here.</p>
              </div>
            )}
          </div>
          {generatedVideo && (
            <div className="flex justify-center mt-4">
              <a href={generatedVideo} download="tansanmediai-short-video.mp4" className="flex items-center space-x-2 px-6 py-2 bg-gradient-purple rounded-lg text-white text-sm hover:opacity-90 transition-opacity">
                <Download className="w-4 h-4" />
                <span>Download Video</span>
              </a>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default ShortVideoPage;
