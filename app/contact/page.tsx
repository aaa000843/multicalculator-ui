import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'Contact Us | MultiCalculator',
  description: 'Get in touch with the MultiCalculator team. We welcome your feedback, questions, and suggestions.',
};

export default function Contact() {
  return (
    <PageLayout title="Contact Us">
      <div className="max-w-2xl mx-auto">
        <section className="mb-8">
          <p className="mb-6 text-center">
            We value your feedback and are here to help. Please use the form below to get in touch with us, 
            and we'll respond as soon as possible.
          </p>

          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md dark:bg-navy-900 dark:border-gray-700 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md dark:bg-navy-900 dark:border-gray-700 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border rounded-md dark:bg-navy-900 dark:border-gray-700 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border rounded-md dark:bg-navy-900 dark:border-gray-700 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-navy-800 text-white px-8 py-3 rounded-md hover:bg-navy-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="mt-12 bg-gray-50 dark:bg-navy-900 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center">Other Ways to Reach Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Email</h3>
              <p>support@multicalculator.com</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">Response Time</h3>
              <p>We aim to respond to all inquiries within 24-48 hours during business days.</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
} 