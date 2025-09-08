import React from 'react';
import { motion } from 'framer-motion';
import { Video, Music, Mic, GripVertical, Volume2, VolumeX } from 'lucide-react';

export interface TimelineTrack {
  id: string;
  type: 'video' | 'audio' | 'music';
  name: string;
  duration: number; // as a percentage of total
  offset: number; // as a percentage of total
  color: string;
}

interface TimelineProps {
  tracks: TimelineTrack[];
}

const trackIcons = {
  video: Video,
  audio: Mic,
  music: Music,
};

const Timeline: React.FC<TimelineProps> = ({ tracks }) => {
  return (
    <div className="w-full h-64 bg-slate-800 rounded-lg p-4 overflow-x-auto overflow-y-hidden relative">
      {/* Time markers */}
      <div className="absolute top-0 left-0 right-0 h-6 flex items-center">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-[10%] h-full flex flex-col items-start justify-end border-l border-white/10">
            <span className="text-xs text-gray-500 pl-1">{i * 10}s</span>
          </div>
        ))}
      </div>
      
      <div className="pt-6 space-y-2">
        {tracks.map((track, index) => {
          const Icon = trackIcons[track.type];
          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 h-12"
            >
              {/* Track Controls */}
              <div className="w-40 flex-shrink-0 bg-slate-700/50 rounded-l-lg h-full flex items-center p-2 justify-between">
                <div className="flex items-center gap-2 truncate">
                  <Icon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs text-white truncate">{track.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-white"><Volume2 className="w-3 h-3" /></button>
                  <button className="p-1 text-gray-400 hover:text-white"><VolumeX className="w-3 h-3" /></button>
                </div>
              </div>

              {/* Track Lane */}
              <div className="flex-1 h-full bg-slate-700/50 rounded-r-lg relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${track.duration}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`absolute h-full ${track.color} rounded-md flex items-center p-2 cursor-pointer group`}
                  style={{ left: `${track.offset}%` }}
                >
                  <GripVertical className="w-4 h-4 text-white/30 absolute left-0 top-1/2 -translate-y-1/2 group-hover:text-white/60" />
                  <span className="text-xs text-white font-medium truncate pl-2">{track.name}</span>
                  <GripVertical className="w-4 h-4 text-white/30 absolute right-0 top-1/2 -translate-y-1/2 group-hover:text-white/60" />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
