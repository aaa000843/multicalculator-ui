import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Terms of Service | MultiCalculator',
  description: 'Read our Terms of Service to understand the rules and guidelines for using MultiCalculator.',
};

export default function Terms() {
  return (
    <PageLayout title="Terms of Service">
      <section className="mb-8">
        <p className="mb-4">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p className="mb-4">
          Please read these Terms of Service carefully before using MultiCalculator. By accessing or using 
          our website, you agree to be bound by these terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must use our services in accordance with all applicable laws and regulations</li>
          <li>Calculators are provided for informational purposes only</li>
          <li>Results should be verified independently for critical decisions</li>
          <li>You are responsible for the accuracy of input data</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
        <p className="mb-4">
          Our calculators and tools are provided "as is" without any warranties. We do not guarantee:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The accuracy of calculations for all scenarios</li>
          <li>Uninterrupted or error-free service</li>
          <li>The suitability of results for your specific needs</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="mb-4">
          All content, features, and functionality of MultiCalculator are owned by us and are protected 
          by international copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
        <p className="mb-4">You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use our service for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt our services</li>
          <li>Copy or modify our calculator algorithms</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any material 
          changes by posting the new terms on this page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us through our{' '}
          <a href="/contact" className="text-primary hover:underline">Contact page</a>.
        </p>
      </section>
    </PageLayout>
  );
} 