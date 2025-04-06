import type { Metadata } from 'next';
import HoursCalculator from './HoursCalculator';

export const metadata: Metadata = {
  title: 'Hours Calculator | Everyday Calculators',
  description: 'Calculate work hours, overtime, and total hours between time periods. Track time and calculate pay hours.',
  keywords: 'hours calculator, work hours calculator, overtime calculator, time tracking, payroll hours',
  openGraph: {
    title: 'Hours Calculator | Everyday Calculators',
    description: 'Calculate work hours, overtime, and total hours between time periods.',
  },
  twitter: {
    title: 'Hours Calculator | Everyday Calculators',
    description: 'Calculate work hours, overtime, and total hours between time periods.',
  },
};

export default function HoursCalculatorPage() {
  return (
    <main>
      <HoursCalculator />
    </main>
  );
} 