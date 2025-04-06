import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | MultiCalculator',
  description: 'Learn about how MultiCalculator protects and handles your data.',
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
            At MultiCalculator, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, and protect your personal information when you use our website.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Information We Collect</h2>
          <p className="mb-4 text-gray-600">We collect information that you provide directly to us, including:</p>
          <ul className="list-none pl-0 space-y-2 mb-4 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Calculation inputs and results</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Contact information when you reach out to us</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Usage data and preferences</span>
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">How We Use Your Information</h2>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To provide and improve our calculator services</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To respond to your inquiries and support requests</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To analyze and enhance our website performance</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>To protect our legal rights and prevent misuse</span>
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
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Cookies and Tracking</h2>
          <p className="text-gray-600">
            We use cookies and similar tracking technologies to improve your experience on our website. 
            You can control cookie settings through your browser preferences.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your Rights</h2>
          <p className="mb-4 text-gray-600">You have the right to:</p>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Access your personal information</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Correct inaccurate data</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Request deletion of your data</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Opt-out of marketing communications</span>
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