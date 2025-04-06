import { Metadata } from 'next';
import InvestmentCalculator from './InvestmentCalculator';

export const metadata: Metadata = {
  title: 'Investment Calculator | Finance Tools & Calculators',
  description: 'Plan your investment strategy with our comprehensive investment calculator. Calculate potential returns, analyze different investment scenarios, and make informed investment decisions.',
  keywords: 'investment calculator, portfolio calculator, investment returns, investment growth calculator, stock investment calculator, mutual fund calculator, investment planning tool',
  openGraph: {
    title: 'Investment Calculator | Finance Tools & Calculators',
    description: 'Plan your investment strategy with our comprehensive investment calculator. Calculate potential returns, analyze different investment scenarios, and make informed investment decisions.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Calculator | Finance Tools & Calculators',
    description: 'Plan your investment strategy with our comprehensive investment calculator. Calculate potential returns, analyze different investment scenarios, and make informed investment decisions.'
  }
};

export default function InvestmentCalculatorPage() {
  return (
    <main>
      <InvestmentCalculator />
    </main>
  );
} 