import { Metadata } from 'next';
import ScientificCalculator from './ScientificCalculator';

export const metadata: Metadata = {
  title: 'Scientific Calculator | Math Tools',
  description: 'Advanced scientific calculator with trigonometric functions, logarithms, exponentials, and more. Perfect for complex mathematical calculations.',
  keywords: 'scientific calculator, trigonometry calculator, logarithm calculator, exponential calculator, math calculator',
  openGraph: {
    title: 'Scientific Calculator | Math Tools',
    description: 'Advanced scientific calculator with trigonometric functions, logarithms, exponentials, and more. Perfect for complex mathematical calculations.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scientific Calculator | Math Tools',
    description: 'Advanced scientific calculator with trigonometric functions, logarithms, exponentials, and more. Perfect for complex mathematical calculations.'
  }
};

export default function ScientificCalculatorPage() {
  return (
    <main>
      <ScientificCalculator />
    </main>
  );
} 