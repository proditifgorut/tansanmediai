import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TTSPage from './pages/TTSPage';
import AIMusicPage from './pages/AIMusicPage';
import AICoverPage from './pages/AICoverPage';
import ToolboxPage from './pages/ToolboxPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import OverviewPage from './pages/dashboard/OverviewPage';
import ProjectsPage from './pages/dashboard/ProjectsPage';
import CreationHubPage from './pages/dashboard/CreationHubPage';
import ShortVideoPage from './pages/dashboard/ShortVideoPage';
import VideoGeneratorPage from './pages/dashboard/VideoGeneratorPage';
import SpeechToSpeechPage from './pages/dashboard/SpeechToSpeechPage';
import VoiceCloningPage from './pages/dashboard/VoiceCloningPage';
import VoiceoverStudioPage from './pages/dashboard/VoiceoverStudioPage';
import MusicToolsPage from './pages/dashboard/MusicToolsPage';
import AiToolsPage from './pages/dashboard/AiToolsPage';
import { UserProvider } from './context/UserContext';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <div className={`min-h-screen ${!isDashboardRoute ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-slate-900'} text-white`}>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'bg-glass-dark text-white border border-white/20',
          style: {
            background: 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#34d399',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#f87171',
              secondary: '#fff',
            },
          },
        }}
      />
      {!isDashboardRoute && <Header />}
      <main className={!isDashboardRoute ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tts" element={<TTSPage />} />
          <Route path="/ai-music" element={<AIMusicPage />} />
          <Route path="/ai-cover" element={<AICoverPage />} />
          <Route path="/toolbox" element={<ToolboxPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          
          {/* Dashboard Nested Routes */}
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<OverviewPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="creation-hub" element={<CreationHubPage />} />
            <Route path="short-video" element={<ShortVideoPage />} />
            <Route path="video-generator" element={<VideoGeneratorPage />} />
            <Route path="speech-to-speech" element={<SpeechToSpeechPage />} />
            <Route path="voice-cloning" element={<VoiceCloningPage />} />
            <Route path="voiceover-studio" element={<VoiceoverStudioPage />} />
            <Route path="music-tools" element={<MusicToolsPage />} />
            <Route path="ai-tools" element={<AiToolsPage />} />
            {/* The routes below point to existing pages */}
            <Route path="tts" element={<TTSPage />} />
            <Route path="ai-music" element={<AIMusicPage />} />
            <Route path="ai-cover" element={<AICoverPage />} />
          </Route>
        </Routes>
      </main>
      {!isDashboardRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
}

export default App;
