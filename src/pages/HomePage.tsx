import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mic, 
  Music, 
  Headphones, 
  Wrench, 
  Star, 
  Play, 
  ArrowRight,
  Zap,
  Users,
  Globe,
  Shield
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Mic,
      title: 'AI Text-to-Speech',
      description: 'Convert text to natural-sounding speech with 110+ voices in multiple languages',
      href: '/tts',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Music,
      title: 'AI Music Generator',
      description: 'Create original music from lyrics, prompts, or just your imagination',
      href: '/ai-music',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Headphones,
      title: 'AI Voice Cover',
      description: 'Transform any song with AI voices and create amazing covers',
      href: '/ai-cover',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Wrench,
      title: 'Audio Toolbox',
      description: 'Professional audio tools for editing, enhancing, and processing',
      href: '/toolbox',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { icon: Users, label: 'Active Users', value: '50K+' },
    { icon: Zap, label: 'Audio Generated', value: '1M+' },
    { icon: Globe, label: 'Languages', value: '110+' },
    { icon: Shield, label: 'Uptime', value: '99.9%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              Create Amazing
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Audio Content
              </span>
              with AI
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transform your ideas into professional audio content with our AI-powered platform. 
              Generate speech, create music, make voice covers, and enhance audio with cutting-edge tools.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                to="/tts"
                className="flex items-center space-x-2 px-8 py-4 bg-gradient-purple rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
              >
                <Play className="w-5 h-5" />
                <span>Start Creating</span>
              </Link>
              <Link 
                to="/pricing"
                className="flex items-center space-x-2 px-8 py-4 bg-glass-light backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors"
              >
                <span>View Pricing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Powerful AI Tools for
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Every Creator
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you're a content creator, musician, podcaster, or business professional, 
              we have the perfect AI-powered tools for your audio needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={feature.href}>
                    <GlassCard className="p-6 h-full group">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300 mb-4">{feature.description}</p>
                      <div className="flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                        <span className="text-sm font-medium">Try it now</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <Icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-12">
              <Star className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of creators who are already using AI to transform their audio content.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/register"
                  className="px-8 py-4 bg-gradient-purple rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/pricing"
                  className="px-8 py-4 bg-glass-light border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
