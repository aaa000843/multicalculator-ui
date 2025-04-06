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
          <p className="mb-6 text-center text-gray-600">
            We value your feedback and are here to help. Please use the form below to get in touch with us, 
            and we'll respond as soon as possible.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-2 border rounded-md bg-white text-gray-700 border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </PageLayout>
  );
} 