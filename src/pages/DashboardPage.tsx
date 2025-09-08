import React, { useState, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

// A map to get a user-friendly title from the route path
const routeTitleMap: { [key: string]: string } = {
  '/dashboard': 'Overview',
  '/dashboard/projects': 'My Projects',
  '/dashboard/creation-hub': 'Creation Hub',
  '/dashboard/short-video': 'Short Video Generator',
  '/dashboard/video-generator': 'AI Video Generator',
  '/dashboard/speech-to-speech': 'Speech to Speech',
  '/dashboard/voice-cloning': 'Voice Cloning',
  '/dashboard/voiceover-studio': 'Voiceover Studio',
  '/dashboard/music-tools': 'Music Tools',
  '/dashboard/ai-tools': 'AI Tools',
  '/dashboard/tts': 'Text to Speech',
  '/dashboard/ai-music': 'AI Music Generator',
  '/dashboard/ai-cover': 'AI Voice Cover',
};

const DashboardPage: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pageTitle = useMemo(() => {
    return routeTitleMap[location.pathname] || 'Dashboard';
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-900">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuToggle={() => setSidebarOpen(true)} pageTitle={pageTitle} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
