import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'About Us | MultiCalculator',
  description: 'Learn about MultiCalculator and our mission to provide comprehensive calculation tools for everyone.',
};

export default function About() {
  return (
    <PageLayout title="About Us">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p>
          At MultiCalculator, we believe that accurate calculations should be accessible to everyone. 
          Our mission is to provide a comprehensive suite of calculation tools that help people make 
          informed decisions in their daily lives, whether it's managing finances, tracking fitness goals, 
          solving mathematical problems, or handling everyday calculations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Financial Calculators for smart money management</li>
          <li>Health & Fitness tools to track your wellness journey</li>
          <li>Mathematical solvers for academic and professional needs</li>
          <li>Everyday calculators for common tasks</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p>
          We are committed to providing:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accurate and reliable calculations</li>
          <li>User-friendly interfaces</li>
          <li>Regular updates and improvements</li>
          <li>Comprehensive documentation and guides</li>
          <li>Responsive customer support</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <p>
          We value your feedback and suggestions. If you have any questions or comments, 
          please visit our <a href="/contact" className="text-primary hover:underline">Contact page</a> 
          to get in touch with our team.
        </p>
      </section>
    </PageLayout>
  );
} 