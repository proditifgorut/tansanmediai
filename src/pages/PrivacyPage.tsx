import React from 'react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Privacy Policy"
          subtitle="Last updated: July 26, 2025"
        />
        
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information you provide directly to us, such as when you create an account (name, email). We also collect information automatically, such as your IP address and usage data. The text and audio you input for processing are temporarily stored to provide the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. How We Use Information</h2>
            <p className="text-gray-300">
              We use your information to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products and services.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Information Sharing</h2>
            <p className="text-gray-300">
              We do not share your personal information with third parties except as necessary to provide our services (e.g., with our AI API partners and payment processors), to comply with the law, or to protect our rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Data Security</h2>
            <p className="text-gray-300">
              We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. However, no electronic transmission or storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Your Choices</h2>
            <p className="text-gray-300">
              You may update, correct, or delete your account information at any time by logging into your account. You may also opt out of receiving promotional emails from us by following the instructions in those emails.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
};

export default PrivacyPage;
