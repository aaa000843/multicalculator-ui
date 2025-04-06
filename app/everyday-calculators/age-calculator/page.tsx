import type { Metadata } from 'next';
import AgeCalculator from './AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator | Everyday Calculators',
  description: 'Calculate exact age between two dates, including years, months, days, hours, and more. Find age at a specific date or time elapsed.',
  keywords: 'age calculator, date of birth calculator, calculate years between dates, age difference calculator',
  openGraph: {
    title: 'Age Calculator | Everyday Calculators',
    description: 'Calculate exact age between two dates, including years, months, and days.',
  },
  twitter: {
    title: 'Age Calculator | Everyday Calculators',
    description: 'Calculate exact age between two dates, including years, months, and days.',
  },
};

export default function AgeCalculatorPage() {
  return (
    <main>
      <AgeCalculator />
    </main>
  );
} 