import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import GlassCard from '../components/GlassCard';

const PricingPage: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'IDR'>('USD');
  const USD_TO_IDR_RATE = 16200;

  const plans = [
    {
      name: 'Free',
      priceUSD: 0,
      period: 'forever',
      description: 'Perfect for trying out our AI tools',
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      features: [
        '15,000 TTS characters/month',
        '1 AI Music generation',
        '2 AI Voice covers',
        'Basic voice selection',
        'Standard audio quality',
        'Community support'
      ],
      limitations: [
        'Watermark on generated content',
        'Limited voice options',
        'Standard processing priority'
      ]
    },
    {
      name: 'Starter',
      priceUSD: 9.99,
      period: 'per month',
      description: 'Great for content creators and small projects',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      popular: true,
      features: [
        '100,000 TTS characters/month',
        '10 AI Music generations',
        '20 AI Voice covers',
        'Premium voice collection',
        'High-quality audio (320kbps)',
        'No watermarks',
        'Priority processing',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      priceUSD: 29.99,
      period: 'per month',
      description: 'Perfect for professionals and businesses',
      icon: Crown,
      color: 'from-purple-500 to-pink-500',
      features: [
        '500,000 TTS characters/month',
        '50 AI Music generations',
        '100 AI Voice covers',
        'All premium voices',
        'Studio-quality audio',
        'Voice cloning (3 custom voices)',
        'Video dubbing',
        'Advanced audio effects',
        'API access',
        'Priority support',
        'Commercial license'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can change your plan at any time. Changes take effect immediately for upgrades, or at the next billing cycle for downgrades.'
    },
    {
      question: 'What happens if I exceed my monthly limits?',
      answer: 'If you exceed your limits, you can either upgrade your plan or purchase additional credits at standard rates.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.'
    },
    {
      question: 'Can I use generated content commercially?',
      answer: 'Pro plan users get full commercial rights. Starter plan users have limited commercial usage rights. Free plan content includes watermarks.'
    }
  ];

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the perfect plan for your audio creation needs. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        {/* Currency Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="bg-glass-dark p-1 rounded-full flex items-center space-x-1">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                currency === 'USD' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                currency === 'IDR' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              IDR (Rp)
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = currency === 'USD'
              ? `$${plan.priceUSD.toFixed(2)}`
              : formatRupiah(plan.priceUSD * USD_TO_IDR_RATE);

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-purple px-4 py-1 rounded-full text-white text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <GlassCard className={`p-8 h-full flex flex-col ${plan.popular ? 'border-purple-400' : ''}`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-6 flex-grow">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">{displayPrice}</span>
                    {plan.priceUSD > 0 && (
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Limitations:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="text-sm text-gray-500">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-opacity mt-auto ${
                    plan.popular 
                      ? 'bg-gradient-purple text-white hover:opacity-90' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}>
                    {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                  </button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have questions? We have answers. Contact support if you need more help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <GlassCard className="p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using TansanMediai to create amazing audio content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-purple rounded-xl text-white font-semibold hover:opacity-90 transition-opacity">
                Start Free Trial
              </button>
              <button className="px-8 py-4 bg-glass-light border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-colors">
                Contact Sales
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;
