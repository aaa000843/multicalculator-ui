import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';

export const metadata: Metadata = {
  title: 'About Us | MultiCalculator',
  description: 'Learn about MultiCalculator and our mission to provide comprehensive calculation tools for everyone.',
};

export default function About() {
  return (
    <PageLayout title="About Us">
      <div className="max-w-4xl mx-auto">
        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
          <p className="text-gray-600">
            At MultiCalculator, we believe that accurate calculations should be accessible to everyone. 
            Our mission is to provide a comprehensive suite of calculation tools that help people make 
            informed decisions in their daily lives, whether it's managing finances, tracking fitness goals, 
            solving mathematical problems, or handling everyday calculations.
          </p>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">What We Offer</h2>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Financial Calculators for smart money management</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Health & Fitness tools to track your wellness journey</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Mathematical solvers for academic and professional needs</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Everyday calculators for common tasks</span>
            </li>
          </ul>
        </section>

        <section className="mb-8 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Commitment</h2>
          <p className="text-gray-600 mb-4">
            We are committed to providing:
          </p>
          <ul className="list-none pl-0 space-y-2 text-gray-600">
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Accurate and reliable calculations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>User-friendly interfaces</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Regular updates and improvements</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Comprehensive documentation and guides</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              <span>Responsive customer support</span>
            </li>
          </ul>
        </section>

        <section className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-purple-100">
          <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Get in Touch</h2>
          <p className="text-gray-600">
            We value your feedback and suggestions. If you have any questions or comments, 
            please visit our <a href="/contact" className="text-indigo-600 hover:text-purple-600 transition-colors">Contact </a> 
             to get in touch with our team.
          </p>
        </section>
      </div>
    </PageLayout>
  );
} 