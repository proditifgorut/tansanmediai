import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Home, 
  Sparkles, 
  Folder, 
  Clapperboard, 
  Video, 
  Mic, 
  AudioLines, 
  Voicemail, 
  SquarePen, 
  Music, 
  Disc, 
  SlidersHorizontal, 
  Bot,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, onClick }) => (
  <NavLink
    to={to}
    end
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-purple-600 text-white font-semibold shadow-inner'
          : 'text-gray-300 hover:bg-slate-700'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </NavLink>
);

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
    {children}
  </h3>
);

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, onClose }) => {
  const mainNav = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/dashboard/creation-hub', icon: Sparkles, label: 'Creation Hub' },
    { to: '/dashboard/projects', icon: Folder, label: 'Projects' },
  ];

  const videoAI = [
    { to: '/dashboard/short-video', icon: Clapperboard, label: 'Short Video' },
    { to: '/dashboard/video-generator', icon: Video, label: 'AI Video Generator' },
  ];

  const voiceoverAI = [
    { to: '/dashboard/tts', icon: Mic, label: 'Text to Speech' },
    { to: '/dashboard/speech-to-speech', icon: AudioLines, label: 'Speech to Speech' },
    { to: '/dashboard/voice-cloning', icon: Voicemail, label: 'Voice Cloning' },
    { to: '/dashboard/voiceover-studio', icon: SquarePen, label: 'Voiceover Studio' },
  ];

  const musicAI = [
    { to: '/dashboard/ai-music', icon: Music, label: 'AI Music' },
    { to: '/dashboard/ai-cover', icon: Disc, label: 'AI Cover' },
    { to: '/dashboard/music-tools', icon: SlidersHorizontal, label: 'Music Tools' },
  ];
  
  const aiTools = [
    { to: '/dashboard/ai-tools', icon: Bot, label: 'AI Tools' },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            TansanMediai
          </span>
        </Link>
        <button onClick={onClose} className="md:hidden p-1 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto">
        {mainNav.map(item => <NavItem key={item.to} {...item} onClick={onClose} />)}
        <SectionTitle>Video AI</SectionTitle>
        {videoAI.map(item => <NavItem key={item.to} {...item} onClick={onClose} />)}
        <SectionTitle>Voiceover AI</SectionTitle>
        {voiceoverAI.map(item => <NavItem key={item.to} {...item} onClick={onClose} />)}
        <SectionTitle>Music AI</SectionTitle>
        {musicAI.map(item => <NavItem key={item.to} {...item} onClick={onClose} />)}
        <SectionTitle>AI Tools</SectionTitle>
        {aiTools.map(item => <NavItem key={item.to} {...item} onClick={onClose} />)}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex-shrink-0 hidden md:block">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={onClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-64 bg-slate-800 text-white z-50 md:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </Fragment>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
