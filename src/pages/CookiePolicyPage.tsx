import React from 'react';
import GlassCard from '../components/GlassCard';
import PageHeader from '../components/PageHeader';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader 
          title="Cookie Policy"
          subtitle="Last updated: July 26, 2025"
        />
        
        <GlassCard className="p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">1. What are cookies?</h2>
            <p className="text-gray-300">
              Cookies are small text files stored on your device (computer, tablet, mobile) when you are on the internet, including on the TansanMediai website. We use them to enhance your user experience, remember your preferences, and for security purposes.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">2. How we use cookies</h2>
            <p className="text-gray-300">
              We use cookies for several purposes:
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                <li><strong className="text-gray-300">Essential Cookies:</strong> These are necessary for the website to function, such as keeping you logged in.</li>
                <li><strong className="text-gray-300">Preference Cookies:</strong> These remember your settings, like language or theme preferences.</li>
                <li><strong className="text-gray-300">Analytics Cookies:</strong> These help us understand how you use our site, so we can improve it.</li>
                <li><strong className="text-gray-300">Marketing Cookies:</strong> These are used to deliver relevant advertising.</li>
              </ul>
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">3. Your Choices</h2>
            <p className="text-gray-300">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls. If you choose to reject cookies, you may still use our website though your access to some functionality and areas may be restricted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-3">4. Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
          </section>
        </GlassCard>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
