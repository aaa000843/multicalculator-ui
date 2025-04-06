import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | MultiCalculator',
  description: 'Read our terms of service for using MultiCalculator.',
};

export default function Terms() {
  return (
    <PageLayout title="Terms of Service">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <p className="mb-4 text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="mb-4 text-gray-600">
            Please read these Terms of Service carefully before using MultiCalculator. By accessing or using our website, 
            you agree to be bound by these terms.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using MultiCalculator, you agree to be bound by these Terms of Service and all applicable 
            laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
            accessing this site.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Use License</h2>
          <p className="mb-4 text-gray-600">Permission is granted to temporarily use MultiCalculator for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
            this license you may not:</p>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Modify or copy the materials</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Use the materials for any commercial purpose</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Attempt to decompile or reverse engineer any software</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Remove any copyright or other proprietary notations</span>
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Disclaimer</h2>
          <p className="text-gray-600">
            The materials on MultiCalculator are provided on an 'as is' basis. We make no warranties, expressed or implied, 
            and hereby disclaim and negate all other warranties including, without limitation, implied warranties or 
            conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
            or other violation of rights.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Limitations</h2>
          <p className="text-gray-600">
            In no event shall MultiCalculator or its suppliers be liable for any damages (including, without limitation, 
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to 
            use the materials on our website.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Accuracy of Materials</h2>
          <p className="text-gray-600">
            The materials appearing on MultiCalculator could include technical, typographical, or photographic errors. 
            We do not warrant that any of the materials on our website are accurate, complete, or current. We may make 
            changes to the materials contained on our website at any time without notice.
          </p>
        </section>

        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about these Terms of Service, please contact us through our{' '}
            <a href="/contact" className="text-indigo-600 hover:text-purple-600 transition-colors">Contact page</a>.
          </p>
        </section>
      </div>
    </PageLayout>
  );
} 