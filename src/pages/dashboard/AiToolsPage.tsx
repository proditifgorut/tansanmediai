import React from 'react';
import { Bot, Type, Podcast, FileAudio, ArrowRight } from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';
import toast from 'react-hot-toast';

const aiTools = [
  {
    title: 'Podcast Intro/Outro Generator',
    description: 'Create professional intros and outros for your podcast with music and voiceover.',
    icon: Podcast,
    color: 'from-red-500 to-orange-500'
  },
  {
    title: 'Ad Copy Generator',
    description: 'Generate compelling ad copy and scripts for audio or video advertisements.',
    icon: Type,
    color: 'from-sky-500 to-blue-500'
  },
  {
    title: 'Audio Description Generator',
    description: 'Create accessibility-focused audio descriptions for your video content.',
    icon: FileAudio,
    color: 'from-emerald-500 to-green-500'
  },
  {
    title: 'AI Lyric Assistant',
    description: 'Get help writing lyrics, finding rhymes, and structuring your songs.',
    icon: Bot,
    color: 'from-fuchsia-500 to-purple-500'
  }
];

const AiToolsPage: React.FC = () => {
    const handleUseTool = (title: string) => {
        toast.success(`Opening the ${title} tool...`);
    };

  return (
    <div>
      <PageHeader title="Miscellaneous AI Tools" subtitle="Explore a variety of other creative and helpful AI tools." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {aiTools.map((tool, index) => {
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

export default AiToolsPage;
