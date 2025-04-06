import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MultiCalculator - Your All-in-One Calculator Solution',
  description: 'Access a comprehensive suite of calculators for finance, fitness, mathematics, and everyday calculations. Free online calculator tools for all your needs.',
  keywords: 'calculator, financial calculator, fitness calculator, math solver, unit converter, online calculator',
  openGraph: {
    title: 'MultiCalculator - Your All-in-One Calculator Solution',
    description: 'Comprehensive suite of calculators for finance, fitness, mathematics, and everyday calculations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
        width: 1200,
        height: 630,
        alt: 'MultiCalculator - Online Calculator Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MultiCalculator - Your All-in-One Calculator Solution',
    description: 'Comprehensive suite of calculators for finance, fitness, mathematics, and everyday calculations.',
    images: ['https://images.unsplash.com/photo-1554224155-6726b3ff858f'],
  },
};

export default function Home() {
  const categories = [
    {
      title: 'Finance Tools & Calculators',
      description: 'Comprehensive financial planning tools and calculators for smarter money management',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
      link: '/financial-calculators',
    },
    {
      title: 'Health & Fitness Trackers',
      description: 'Track and monitor your health metrics with our advanced fitness calculators',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200',
      link: '/health-fitness',
    },
    {
      title: 'Math Solver & Calculation Tools',
      description: 'Advanced mathematical tools for solving complex calculations and equations',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200',
      link: '/math-solver-calculation',
    },
    {
      title: 'Everyday Calculators & Converters',
      description: 'Essential tools for daily calculations and unit conversions',
      image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=1200',
      link: '/everyday-calculators',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your All-in-One Calculator Solution
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access a comprehensive suite of calculators for finance, fitness, mathematics, and more.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/financial-calculators"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.link}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-200 transition-colors">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-200 group-hover:text-purple-100 transition-colors">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </section>

        {/* Features Section */}
        <section className="text-center space-y-8 py-8">
          <h2 className="text-3xl font-bold text-indigo-600">Why Choose MultiCalculator?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">Easy to Use</h3>
              <p className="text-gray-600">Simple, intuitive interface for quick calculations</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">Accurate Results</h3>
              <p className="text-gray-600">Precise calculations you can rely on</p>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-purple-600 mb-3">All-in-One</h3>
              <p className="text-gray-600">Every calculator you need in one place</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}