import { Metadata } from 'next';
import StandardDeviationCalculator from './StandardDeviationCalculator';

export const metadata: Metadata = {
  title: 'Standard Deviation Calculator | Math Tools',
  description: 'Calculate standard deviation, variance, mean, and other statistical measures. Supports population and sample calculations with data visualization.',
  keywords: 'standard deviation calculator, variance calculator, statistical calculator, mean calculator, statistics tools',
  openGraph: {
    title: 'Standard Deviation Calculator | Math Tools',
    description: 'Calculate standard deviation, variance, mean, and other statistical measures. Supports population and sample calculations with data visualization.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Standard Deviation Calculator | Math Tools',
    description: 'Calculate standard deviation, variance, mean, and other statistical measures. Supports population and sample calculations with data visualization.'
  }
};

export default function StandardDeviationCalculatorPage() {
  return (
    <main>
      <StandardDeviationCalculator />
    </main>
  );
} 