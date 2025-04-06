import { Metadata } from 'next';
import BodyFatCalculator from './BodyFatCalculator';

export const metadata: Metadata = {
  title: 'Body Fat Calculator | Health & Fitness Tools',
  description: 'Calculate your body fat percentage using various measurement methods. Get accurate estimates and understand your body composition better.',
  keywords: 'body fat calculator, body fat percentage calculator, body composition calculator, skinfold calculator, navy method calculator',
  openGraph: {
    title: 'Body Fat Calculator | Health & Fitness Tools',
    description: 'Calculate your body fat percentage using various measurement methods. Get accurate estimates and understand your body composition better.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Body Fat Calculator | Health & Fitness Tools',
    description: 'Calculate your body fat percentage using various measurement methods. Get accurate estimates and understand your body composition better.'
  }
};

export default function BodyFatCalculatorPage() {
  return (
    <main>
      <BodyFatCalculator />
    </main>
  );
} 