import { Metadata } from 'next';
import IdealWeightCalculator from './IdealWeightCalculator';

export const metadata: Metadata = {
  title: 'Ideal Weight Calculator | Health & Fitness Tools',
  description: 'Calculate your ideal weight range based on height, age, gender, and body frame. Get personalized weight recommendations using multiple formulas.',
  keywords: 'ideal weight calculator, healthy weight calculator, weight range calculator, body frame calculator, height weight calculator',
  openGraph: {
    title: 'Ideal Weight Calculator | Health & Fitness Tools',
    description: 'Calculate your ideal weight range based on height, age, gender, and body frame. Get personalized weight recommendations using multiple formulas.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ideal Weight Calculator | Health & Fitness Tools',
    description: 'Calculate your ideal weight range based on height, age, gender, and body frame. Get personalized weight recommendations using multiple formulas.'
  }
};

export default function IdealWeightCalculatorPage() {
  return (
    <main>
      <IdealWeightCalculator />
    </main>
  );
} 