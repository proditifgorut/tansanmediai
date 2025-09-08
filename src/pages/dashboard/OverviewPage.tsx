import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Music, 
  Headphones, 
  Download,
  Play,
  Crown,
  Settings,
  BarChart3,
  KeyRound,
  CreditCard,
  FileText,
  User as UserIcon
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { faker } from '@faker-js/faker';
import EditProfileModal from '../../components/modals/EditProfileModal';
import AccountSettingsModal from '../../components/modals/AccountSettingsModal';
import ApiKeyModal from '../../components/modals/ApiKeyModal';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';

interface Activity {
  type: 'tts' | 'music' | 'cover';
  title: string;
  description: string;
  date: string;
  icon: React.ElementType;
  color: string;
}

const OverviewPage: React.FC = () => {
  const { user } = useUser();
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isApiModalOpen, setApiModalOpen] = useState(false);

  useEffect(() => {
    const generateFakeActivity = (): Activity[] => {
      const activities: Activity[] = [];
      const activityTypes: Activity['type'][] = ['tts', 'music', 'cover'];
      const icons = { tts: Mic, music: Music, cover: Headphones };
      const colors = { tts: 'text-blue-400', music: 'text-purple-400', cover: 'text-green-400' };

      for (let i = 0; i < 5; i++) {
        const type = faker.helpers.arrayElement(activityTypes);
        activities.push({
          type,
          title: faker.lorem.words(3),
          description: `Generated on ${faker.location.city()}`,
          date: faker.date.recent({ days: 7 }).toLocaleDateString(),
          icon: icons[type],
          color: colors[type]
        });
      }
      return activities;
    };
    setRecentActivity(generateFakeActivity());
  }, []);

  if (!user) {
    return <div>Loading user data...</div>; // Or a proper loading component
  }

  const userStats = [
    { label: 'TTS Characters Used', value: '45,230', total: '100,000', color: 'from-blue-500 to-cyan-500' },
    { label: 'AI Music Generated', value: '7', total: '10', color: 'from-purple-500 to-pink-500' },
    { label: 'AI Covers Created', value: '15', total: '20', color: 'from-green-500 to-emerald-500' },
    { label: 'Days Remaining', value: '18', total: '30', color: 'from-orange-500 to-red-500' }
  ];
  
  const billingHistory = [
    { id: faker.string.uuid(), date: '2025-07-15', amount: '$9.99', status: 'Paid' },
    { id: faker.string.uuid(), date: '2025-06-15', amount: '$9.99', status: 'Paid' },
    { id: faker.string.uuid(), date: '2025-05-15', amount: '$9.99', status: 'Paid' },
  ];

  return (
    <>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
              <p className="text-gray-400">Here's your activity overview.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/pricing" className="flex items-center space-x-2 px-6 py-3 bg-gradient-purple rounded-lg text-white hover:opacity-90 transition-opacity">
                <Crown className="w-5 h-5" />
                <span>Upgrade Plan</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {userStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mb-3">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className="text-gray-400 ml-1">/ {stat.total}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${(parseInt(stat.value.replace(',', '')) / parseInt(stat.total.replace(',', ''))) * 100}%` }}
                  ></div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                  <Link to="/dashboard/projects" className="text-purple-400 hover:text-purple-300 text-sm">
                    View All
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <div className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-medium capitalize">{activity.title}</h3>
                          <p className="text-gray-400 text-sm">{activity.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">{activity.date}</span>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="text-purple-400 hover:text-purple-300">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <img src={user.avatar} alt="User Avatar" className="rounded-full w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
                  <p className="text-gray-400 mb-2">{user.email}</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-400/20 text-purple-400">
                    <Crown className="w-3 h-3 mr-1" />
                    {user.plan} Plan
                  </span>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button onClick={() => setProfileModalOpen(true)} className="flex items-center justify-center w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <UserIcon className="w-4 h-4 mr-2" />
                    Edit Profile
                  </button>
                  <button onClick={() => setSettingsModalOpen(true)} className="flex items-center justify-center w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </button>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/dashboard/tts" className="flex items-center space-x-3 w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Mic className="w-5 h-5 text-blue-400" />
                    <span className="text-white">New TTS</span>
                  </Link>
                  <Link to="/dashboard/ai-music" className="flex items-center space-x-3 w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Music className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Generate Music</span>
                  </Link>
                  <Link to="/dashboard/ai-cover" className="flex items-center space-x-3 w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Headphones className="w-5 h-5 text-green-400" />
                    <span className="text-white">Create Cover</span>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Billing</h3>
                  <CreditCard className="w-5 h-5 text-purple-400"/>
                </div>
                <div className="space-y-3">
                  {billingHistory.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white">Invoice #{item.id.substring(0, 6)}</p>
                        <p className="text-gray-400">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{item.amount}</p>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="flex items-center justify-center w-full py-2 mt-4 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <FileText className="w-4 h-4 mr-2" />
                  View Billing History
                </button>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GlassCard className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">API Access</h3>
                  <KeyRound className="w-5 h-5 text-purple-400"/>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Integrate TansanMediai into your own applications.
                </p>
                <button onClick={() => setApiModalOpen(true)} className="flex items-center justify-center w-full py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
                  <KeyRound className="w-4 h-4 mr-2" />
                  Manage API Keys
                </button>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setProfileModalOpen(false)} 
        user={user}
      />
      <AccountSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setSettingsModalOpen(false)} 
      />
      <ApiKeyModal
        isOpen={isApiModalOpen}
        onClose={() => setApiModalOpen(false)}
      />
    </>
  );
};

export default OverviewPage;
