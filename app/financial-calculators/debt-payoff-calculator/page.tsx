import { Metadata } from 'next';
import DebtPayoffCalculator from './DebtPayoffCalculator';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator | Finance Tools & Calculators',
  description: 'Plan your debt repayment strategy with our comprehensive debt payoff calculator. Compare different repayment methods and create a personalized debt-free plan.',
  keywords: 'debt payoff calculator, debt repayment calculator, debt snowball calculator, debt avalanche calculator, loan payoff calculator, credit card payoff calculator',
  openGraph: {
    title: 'Debt Payoff Calculator | Finance Tools & Calculators',
    description: 'Plan your debt repayment strategy with our comprehensive debt payoff calculator. Compare different repayment methods and create a personalized debt-free plan.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator | Finance Tools & Calculators',
    description: 'Plan your debt repayment strategy with our comprehensive debt payoff calculator. Compare different repayment methods and create a personalized debt-free plan.'
  }
};

export default function DebtPayoffCalculatorPage() {
  return (
    <main>
      <DebtPayoffCalculator />
    </main>
  );
} 