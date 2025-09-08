import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Music, 
  Headphones, 
  Clapperboard, 
  Video, 
  AudioLines, 
  Voicemail, 
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import PageHeader from '../../components/PageHeader';

const creationTools = [
  {
    title: 'Text to Speech',
    description: 'Convert written text into natural-sounding speech.',
    icon: Mic,
    link: '/dashboard/tts',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'AI Music',
    description: 'Generate original, royalty-free music from prompts.',
    icon: Music,
    link: '/dashboard/ai-music',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'AI Cover',
    description: 'Recreate songs with different AI-powered voices.',
    icon: Headphones,
    link: '/dashboard/ai-cover',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Speech to Speech',
    description: 'Transform one voice into another with emotion.',
    icon: AudioLines,
    link: '/dashboard/speech-to-speech',
    color: 'from-orange-500 to-amber-500'
  },
  {
    title: 'Voice Cloning',
    description: 'Create a digital replica of any voice from samples.',
    icon: Voicemail,
    link: '/dashboard/voice-cloning',
    color: 'from-indigo-500 to-violet-500'
  },
  {
    title: 'Short Video',
    description: 'Create engaging short-form videos for social media.',
    icon: Clapperboard,
    link: '/dashboard/short-video',
    color: 'from-red-500 to-rose-500'
  },
  {
    title: 'AI Video Generator',
    description: 'Produce full videos from simple text descriptions.',
    icon: Video,
    link: '/dashboard/video-generator',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    title: 'Music Tools',
    description: 'Access advanced tools for music production.',
    icon: SlidersHorizontal,
    link: '/dashboard/music-tools',
    color: 'from-lime-500 to-green-500'
  }
];

const CreationHubPage: React.FC = () => {
  return (
    <div>
      <PageHeader 
        title="Creation Hub" 
        subtitle="Your starting point for creating amazing AI-powered content. Choose a tool to begin."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {creationTools.map((tool, index) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link to={tool.link}>
                <GlassCard className="p-6 h-full flex flex-col group hover:border-purple-400/50">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${tool.color} mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-gray-400 text-sm flex-grow mb-4">{tool.description}</p>
                  <div className="mt-auto flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span>Start Creating</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CreationHubPage;
