import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Mail, MessageCircle, FileText, HelpCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-glass-dark backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TansanMediai
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Create amazing audio content with AI-powered tools. Transform text to speech, generate music, create voice covers, and enhance your audio with professional-grade tools.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tts" className="text-gray-400 hover:text-white transition-colors">
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link to="/ai-music" className="text-gray-400 hover:text-white transition-colors">
                  AI Music Generator
                </Link>
              </li>
              <li>
                <Link to="/ai-cover" className="text-gray-400 hover:text-white transition-colors">
                  AI Voice Cover
                </Link>
              </li>
              <li>
                <Link to="/toolbox" className="text-gray-400 hover:text-white transition-colors">
                  Audio Toolbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span>Support Chat</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Documentation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 TansanMediai. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
