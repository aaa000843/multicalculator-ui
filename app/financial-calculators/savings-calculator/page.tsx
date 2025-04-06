import { Metadata } from 'next';
import SavingsCalculator from './SavingsCalculator';

export const metadata: Metadata = {
  title: 'Savings Calculator | Finance Tools & Calculators',
  description: 'Plan and track your savings goals with our comprehensive savings calculator. Calculate how much you need to save monthly, see the impact of interest rates, and track multiple savings goals.',
  keywords: 'savings calculator, savings goal calculator, savings planner, interest calculator, financial planning calculator',
  openGraph: {
    title: 'Savings Calculator | Finance Tools & Calculators',
    description: 'Plan and track your savings goals with our comprehensive savings calculator. Calculate how much you need to save monthly, see the impact of interest rates, and track multiple savings goals.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings Calculator | Finance Tools & Calculators',
    description: 'Plan and track your savings goals with our comprehensive savings calculator. Calculate how much you need to save monthly, see the impact of interest rates, and track multiple savings goals.'
  }
};

export default function SavingsCalculatorPage() {
  return (
    <main>
      <SavingsCalculator />
    </main>
  );
} 