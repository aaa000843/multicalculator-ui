import { Metadata } from 'next';
import FractionCalculator from './FractionCalculator';

export const metadata: Metadata = {
  title: 'Fraction Calculator | Math Tools',
  description: 'Calculate with fractions - add, subtract, multiply, and divide. Convert between fractions, decimals, and mixed numbers.',
  keywords: 'fraction calculator, mixed number calculator, decimal to fraction, fraction math, fraction converter',
  openGraph: {
    title: 'Fraction Calculator | Math Tools',
    description: 'Calculate with fractions - add, subtract, multiply, and divide. Convert between fractions, decimals, and mixed numbers.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fraction Calculator | Math Tools',
    description: 'Calculate with fractions - add, subtract, multiply, and divide. Convert between fractions, decimals, and mixed numbers.'
  }
};

export default function FractionCalculatorPage() {
  return (
    <main>
      <FractionCalculator />
    </main>
  );
} 