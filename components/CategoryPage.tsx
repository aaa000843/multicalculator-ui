import Link from 'next/link';
import { Calculator } from 'lucide-react';
import Breadcrumb from './Breadcrumb';

interface CategoryPageProps {
  title: string;
  description: string;
  introduction: string;
  calculators: Array<{
    title: string;
    description: string;
    href: string;
  }>;
  features: string[];
  benefits: string[];
}

export default function CategoryPage({
  title,
  description,
  introduction,
  calculators,
  features,
  benefits,
}: CategoryPageProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-purple-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Breadcrumb />
        
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {title}
          </h1>
          
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-600">
              {introduction}
            </p>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <Link
              key={calculator.href}
              href={calculator.href}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-indigo-600 group-hover:text-purple-600 transition-colors">
                    {calculator.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {calculator.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features and Benefits Section */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md border border-purple-100">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Why Use Our {title}?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-600">Features</h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-indigo-600">Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">1</div>
              <h3 className="font-semibold mb-2">Choose a Calculator</h3>
              <p className="text-sm text-purple-100">Select the calculator that best fits your needs from our comprehensive collection.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">2</div>
              <h3 className="font-semibold mb-2">Enter Your Data</h3>
              <p className="text-sm text-purple-100">Input your numbers and select your preferences in the calculator fields.</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-2">3</div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-sm text-purple-100">Receive instant, accurate results with detailed explanations and insights.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 