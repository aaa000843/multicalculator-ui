import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Calcifai',
  description: 'Learn about how Calcifai protects and handles your data.',
};

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <p className="mb-4 text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4 text-gray-600">
            At Calcifai, we respect your privacy. This Privacy Policy explains how we handle your information when you use our website.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Information We Collect</h2>
          <p className="mb-4 text-gray-600">We only collect information that you voluntarily provide through our contact form, including:</p>
          <ul className="list-none pl-0 space-y-2 mb-4 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Your name</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Email address</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Your message</span>
            </li>
          </ul>
          <p className="text-gray-600">
            We use Google Analytics to understand how visitors use our website. This helps us improve our services. Google Analytics collects anonymous information about:
          </p>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Pages visited</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Time spent on pages</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Device and browser information</span>
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">How We Use Your Information</h2>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To respond to your inquiries through our contact form</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To improve our website based on anonymous usage data</span>
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your information. However, 
            no method of transmission over the internet is 100% secure, and we cannot guarantee 
            absolute security.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Google Analytics</h2>
          <p className="mb-4 text-gray-600">
            We use Google Analytics to understand how visitors use our website. This service uses cookies to collect anonymous information about your visit. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Rights</h2>
          <p className="mb-4 text-gray-600">You have the right to:</p>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Request access to any personal information we hold about you</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Request correction of any inaccurate information</span>
            </li>
          </ul>
        </section>

        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us through our{' '}
            <a href="/contact" className="text-indigo-600 hover:text-purple-600 transition-colors">Contact page</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
} 