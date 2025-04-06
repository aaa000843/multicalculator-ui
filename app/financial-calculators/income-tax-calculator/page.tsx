import { Metadata } from 'next';
import IncomeTaxCalculator from './IncomeTaxCalculator';

export const metadata: Metadata = {
  title: 'Income Tax Calculator | Finance Tools & Calculators',
  description: 'Calculate your estimated income tax liability with our comprehensive tax calculator. Account for different tax brackets, deductions, and credits to plan your finances effectively.',
  keywords: 'income tax calculator, tax bracket calculator, tax estimation, tax deduction calculator, salary tax calculator, annual tax calculator, take home pay calculator',
  openGraph: {
    title: 'Income Tax Calculator | Finance Tools & Calculators',
    description: 'Calculate your estimated income tax liability with our comprehensive tax calculator. Account for different tax brackets, deductions, and credits to plan your finances effectively.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Calculator | Finance Tools & Calculators',
    description: 'Calculate your estimated income tax liability with our comprehensive tax calculator. Account for different tax brackets, deductions, and credits to plan your finances effectively.'
  }
};

export default function IncomeTaxCalculatorPage() {
  return (
    <main>
      <IncomeTaxCalculator />
    </main>
  );
} 