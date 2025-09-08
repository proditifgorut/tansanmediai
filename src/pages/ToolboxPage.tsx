import React from 'react';
import { motion } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Scissors, 
  AudioWaveform, 
  Filter, 
  Headphones,
  Upload,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import toast from 'react-hot-toast';

const ToolboxPage: React.FC = () => {
  const tools = [
    {
      icon: Volume2,
      title: 'Audio Boost',
      description: 'Increase the volume of your audio files without losing quality',
      category: 'Enhancement',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Filter,
      title: 'Noise Reduction',
      description: 'Remove background noise and improve audio clarity',
      category: 'Enhancement',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: AudioWaveform,
      title: 'Voice Effects',
      description: 'Apply creative effects: chipmunk, robot, monster, and more',
      category: 'Effects',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Scissors,
      title: 'Audio Trimmer',
      description: 'Cut and trim specific parts of your audio files',
      category: 'Editing',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: VolumeX,
      title: 'Vocal Remover',
      description: 'Extract vocals or create karaoke versions from songs',
      category: 'Processing',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Headphones,
      title: 'Audio Converter',
      description: 'Convert between different audio formats (MP3, WAV, FLAC)',
      category: 'Conversion',
      color: 'from-teal-500 to-blue-500'
    }
  ];

  const categories = ['All', 'Enhancement', 'Effects', 'Editing', 'Processing', 'Conversion'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const handleUseTool = (title: string) => {
    toast.success(`Opening the ${title} tool...`);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Audio Toolbox
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional audio tools for editing, enhancing, and processing your audio files
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-purple text-white'
                  : 'bg-glass-light text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-4 self-start group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs font-medium text-purple-400 bg-purple-400/20 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-300 mb-6 flex-grow">{tool.description}</p>
                  
                  <div className="mt-auto">
                    <button 
                      onClick={() => handleUseTool(tool.title)}
                      className="flex items-center justify-center w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors group"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      <span>Use Tool</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolboxPage;
