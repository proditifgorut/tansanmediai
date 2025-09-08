import React from 'react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Terms of Service"
          subtitle="Last updated: July 26, 2025"
        />
        
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to TansanMediai. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. User Accounts</h2>
            <p className="text-gray-300">
              You must be at least 13 years old to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Use of Services</h2>
            <p className="text-gray-300">
              You agree not to use our services for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction. Prohibited activities include generating hateful, defamatory, or explicit content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Content Ownership</h2>
            <p className="text-gray-300">
              You retain ownership of the text, lyrics, or other input you provide to the service. We grant you a license to use the AI-generated audio content based on your subscription plan. Pro plan users receive a full commercial license.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">5. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
};

export default TermsPage;
