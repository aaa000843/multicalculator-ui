import { Metadata } from 'next';
import CompoundInterestCalculator from './CompoundInterestCalculator';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Finance Tools & Calculators',
  description: 'Calculate the power of compound interest on your investments. See how your money can grow over time with regular deposits and different interest rates.',
  keywords: 'compound interest calculator, investment calculator, savings growth calculator, interest calculator, investment returns, financial planning tool',
  openGraph: {
    title: 'Compound Interest Calculator | Finance Tools & Calculators',
    description: 'Calculate the power of compound interest on your investments and see how your money can grow over time.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Finance Tools & Calculators',
    description: 'Calculate the power of compound interest on your investments and see how your money can grow over time.'
  }
};

export default function CompoundInterestCalculatorPage() {
  return (
    <main>
      <CompoundInterestCalculator />
    </main>
  );
}
