import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Mic, Music, Headphones, CreditCard } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { name: 'All', icon: HelpCircle },
    { name: 'TTS', icon: Mic },
    { name: 'AI Music', icon: Music },
    { name: 'AI Cover', icon: Headphones },
    { name: 'Billing', icon: CreditCard }
  ];

  const faqs = [
    {
      category: 'TTS',
      question: 'How many characters can I convert to speech?',
      answer: 'The character limit depends on your plan: Free (15,000/month), Starter (100,000/month), Pro (500,000/month). Characters are counted including spaces and punctuation.'
    },
    {
      category: 'TTS',
      question: 'What languages and voices are available?',
      answer: 'We support 110+ languages with over 500 natural-sounding voices. You can choose from different genders, ages, and speaking styles including narrator, cheerful, professional, and more.'
    },
    {
      category: 'TTS',
      question: 'Can I clone my own voice?',
      answer: 'Yes! Pro plan users can create custom voice models by uploading 15-30 minutes of high-quality voice samples. The training process takes 24-48 hours.'
    },
    {
      category: 'AI Music',
      question: 'How does AI music generation work?',
      answer: 'Our AI analyzes your input (lyrics, description, or genre preferences) and generates original music. You can create songs from lyrics, instrumental tracks, or descriptive prompts.'
    },
    {
      category: 'AI Music',
      question: 'Can I use generated music commercially?',
      answer: 'Pro plan users get full commercial rights. Starter plan has limited commercial usage. Free plan content includes watermarks and is for personal use only.'
    },
    {
      category: 'AI Music',
      question: 'What music genres are supported?',
      answer: 'We support all major genres including Pop, Rock, Jazz, EDM, Hip Hop, Classical, Country, Folk, R&B, and Reggae. You can also specify mood and style preferences.'
    },
    {
      category: 'AI Cover',
      question: 'How do I create an AI voice cover?',
      answer: 'Upload your audio file or provide a YouTube link, select an AI voice model, adjust settings like pitch, and generate your cover. The process typically takes 2-5 minutes.'
    },
    {
      category: 'AI Cover',
      question: 'What audio formats are supported?',
      answer: 'We support MP3, WAV, and M4A files up to 50MB. For best results, use high-quality audio with clear vocals.'
    },
    {
      category: 'AI Cover',
      question: 'Can I train custom voice models?',
      answer: 'Yes, Pro users can upload voice samples to create custom AI voice models. This requires 10-20 minutes of clean vocal recordings.'
    },
    {
      category: 'Billing',
      question: 'How does billing work?',
      answer: 'Billing is monthly or yearly. You can upgrade, downgrade, or cancel anytime. Changes take effect immediately for upgrades or at the next billing cycle for downgrades.'
    },
    {
      category: 'Billing',
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. Contact support within 30 days of purchase for a full refund.'
    },
    {
      category: 'Billing',
      question: 'What happens if I exceed my limits?',
      answer: 'You can upgrade your plan or purchase additional credits. We\'ll notify you when approaching limits and offer upgrade options.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about TansanMediai features, pricing, and more.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category.name
                      ? 'bg-gradient-purple text-white'
                      : 'bg-glass-light text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <GlassCard className="p-8 text-center">
              <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No FAQs Found</h3>
              <p className="text-gray-400">
                Try adjusting your search or selecting a different category.
              </p>
            </GlassCard>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GlassCard className="overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-400/20 text-purple-400 mt-1">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-white pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                        openItems.includes(index) ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openItems.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-300 leading-relaxed pl-20">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <GlassCard className="p-8 text-center">
            <HelpCircle className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-purple rounded-lg text-white font-semibold hover:opacity-90 transition-opacity">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-glass-light border border-white/20 rounded-lg text-white font-semibold hover:bg-white/20 transition-colors">
                Start Live Chat
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
