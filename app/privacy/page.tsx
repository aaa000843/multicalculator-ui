import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | MultiCalculator',
  description: 'Learn about how MultiCalculator protects and handles your data.',
};

export default function Privacy() {
  return (
    <PageLayout title="Privacy Policy">
      <section className="mb-8">
        <p className="mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="mb-4">
          At MultiCalculator, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, and protect your personal information when you use our website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">We collect information that you provide directly to us, including:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Calculation inputs and results</li>
          <li>Contact information when you reach out to us</li>
          <li>Usage data and preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and improve our calculator services</li>
          <li>To respond to your inquiries and support requests</li>
          <li>To analyze and enhance our website performance</li>
          <li>To protect our legal rights and prevent misuse</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information. However, 
          no method of transmission over the internet is 100% secure, and we cannot guarantee 
          absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to improve your experience on our website. 
          You can control cookie settings through your browser preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us through our{' '}
          <a href="/contact" className="text-primary hover:underline">Contact page</a>.
        </p>
      </section>
    </PageLayout>
  );
} 