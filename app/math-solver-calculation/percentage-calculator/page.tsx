import { Metadata } from 'next';
import PercentageCalculator from './PercentageCalculator';

export const metadata: Metadata = {
  title: 'Percentage Calculator | Math Tools',
  description: 'Calculate percentages, percentage changes, markups, discounts, and more with our comprehensive percentage calculator.',
  keywords: 'percentage calculator, percent change calculator, markup calculator, discount calculator, percentage math',
  openGraph: {
    title: 'Percentage Calculator | Math Tools',
    description: 'Calculate percentages, percentage changes, markups, discounts, and more with our comprehensive percentage calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator | Math Tools',
    description: 'Calculate percentages, percentage changes, markups, discounts, and more with our comprehensive percentage calculator.'
  }
};

export default function PercentageCalculatorPage() {
  return (
    <main>
      <PercentageCalculator />
    </main>
  );
} 