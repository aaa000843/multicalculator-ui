import type { Metadata } from 'next';
import TimeCalculator from './TimeCalculator';

export const metadata: Metadata = {
  title: 'Time Calculator | Everyday Calculators',
  description: 'Add or subtract hours, minutes, and seconds. Convert between time formats and calculate time differences.',
  keywords: 'time calculator, add time, subtract time, time difference calculator, time conversion',
  openGraph: {
    title: 'Time Calculator | Everyday Calculators',
    description: 'Add or subtract hours, minutes, and seconds. Calculate time differences.',
  },
  twitter: {
    title: 'Time Calculator | Everyday Calculators',
    description: 'Add or subtract hours, minutes, and seconds. Calculate time differences.',
  },
};

export default function TimeCalculatorPage() {
  return (
    <main>
      <TimeCalculator />
    </main>
  );
} 