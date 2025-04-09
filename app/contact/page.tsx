import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Calcifai',
  description: 'Get in touch with the Calcifai team. We welcome your feedback, questions, and suggestions.',
};

export default function Contact() {
  return (
    <PageLayout title="Contact Us">
      <div className="max-w-2xl mx-auto">
        <section className="mb-8">
          <p className="mb-6 text-center text-gray-600">
            We value your feedback and are here to help. If you have a suggestion for a new calculator, 
            converter, or generator, please let us know! We are always open to new ideas. Please use the form 
            below to get in touch with us, and we&rsquo;ll respond as soon as possible.
          </p>
          <ContactForm />
        </section>
      </div>
    </PageLayout>
  );
} 