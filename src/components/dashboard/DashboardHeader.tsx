import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  pageTitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMenuToggle, pageTitle }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('You have been logged out.');
    navigate('/login');
  };

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <header className="bg-slate-900 sticky top-0 z-10 flex items-center justify-between p-4 border-b border-white/10">
      <div className="flex items-center gap-4">
        <button onClick={onMenuToggle} className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10">
          <Bell className="w-5 h-5" />
        </button>

        <div className="relative">
          <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2">
            <img src={user.avatar} alt="User Avatar" className="w-8 h-8 rounded-full object-cover" />
            <span className="hidden sm:inline text-sm text-white">{user.name}</span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-2">
                  <div className="px-2 py-1 text-xs text-gray-400">Signed in as</div>
                  <div className="px-2 py-1 font-semibold text-white truncate">{user.email}</div>
                </div>
                <div className="border-t border-white/10 my-1"></div>
                <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                  <User className="w-4 h-4" /> Profile
                </Link>
                <button onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <div className="border-t border-white/10 my-1"></div>
                <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/20">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
