import React from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2 } from 'lucide-react';
import CustomAudioPlayer from './CustomAudioPlayer';
import toast from 'react-hot-toast';

interface GeneratedAudioItemProps {
  id: string;
  src: string;
  title: string;
  details: string;
  onDelete: (id: string) => void;
}

const GeneratedAudioItem: React.FC<GeneratedAudioItemProps> = ({ id, src, title, details, onDelete }) => {
  
  const handleSave = () => {
    toast.success(`"${title}" saved to My Projects!`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="bg-white/5 p-4 rounded-lg"
    >
      <CustomAudioPlayer src={src} title={title} artist={details} />
      <div className="flex justify-end items-center gap-2 mt-3">
        <button 
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 rounded-md transition-colors"
        >
          <Save className="w-3 h-3" />
          Save to Projects
        </button>
        <button 
            onClick={() => onDelete(id)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-md transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default GeneratedAudioItem;
