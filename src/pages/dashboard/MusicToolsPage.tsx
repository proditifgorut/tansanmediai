import React from 'react';
import { SlidersHorizontal, Music, GitMerge, Wand2, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

const musicTools = [
  {
    title: 'Stem Splitter',
    description: 'Separate any song into vocals, drums, bass, and other instruments.',
    icon: GitMerge,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'AI Mastering',
    description: 'Automatically master your tracks to commercial loudness and clarity.',
    icon: Wand2,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Pitch Correction',
    description: 'Fine-tune vocals and instruments with our auto-pitch tool.',
    icon: Music,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Chord Progression Generator',
    description: 'Get inspired with unique and catchy chord progressions for your songs.',
    icon: SlidersHorizontal,
    color: 'from-orange-500 to-amber-500'
  }
];

const MusicToolsPage: React.FC = () => {
  const handleUseTool = (title: string) => {
    toast.success(`Opening the ${title} tool...`);
  };

  return (
    <div>
      <PageHeader title="Advanced Music Tools" subtitle="Elevate your music production with our suite of AI-powered tools." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {musicTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <GlassCard key={index} className="p-6 flex flex-col group hover:border-purple-400/50">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${tool.color} mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-gray-400 text-sm flex-grow mb-4">{tool.description}</p>
              <button 
                onClick={() => handleUseTool(tool.title)}
                className="mt-auto flex items-center justify-center w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
              >
                <span>Use Tool</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default MusicToolsPage;
