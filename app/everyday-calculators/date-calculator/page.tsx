import type { Metadata } from 'next';
import DateCalculator from './DateCalculator';

export const metadata: Metadata = {
  title: 'Date Calculator | Everyday Calculators',
  description: 'Calculate dates by adding or subtracting days, weeks, months, or years. Find the difference between dates and working days.',
  keywords: 'date calculator, add days calculator, subtract dates, working days calculator, date difference',
  openGraph: {
    title: 'Date Calculator | Everyday Calculators',
    description: 'Calculate dates by adding or subtracting days, weeks, months, or years.',
  },
  twitter: {
    title: 'Date Calculator | Everyday Calculators',
    description: 'Calculate dates by adding or subtracting days, weeks, months, or years.',
  },
};

export default function DateCalculatorPage() {
  return (
    <main>
      <DateCalculator />
    </main>
  );
} 