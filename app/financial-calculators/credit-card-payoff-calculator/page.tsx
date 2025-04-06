import { Metadata } from 'next';
import CreditCardPayoffCalculator from './CreditCardPayoffCalculator';

export const metadata: Metadata = {
  title: 'Credit Card Payoff Calculator | Finance Tools & Calculators',
  description: 'Calculate how long it will take to pay off your credit card debt and understand the impact of different payment strategies with our comprehensive credit card payoff calculator.',
  keywords: 'credit card payoff calculator, debt payoff calculator, credit card debt calculator, minimum payment calculator, debt free calculator',
  openGraph: {
    title: 'Credit Card Payoff Calculator | Finance Tools & Calculators',
    description: 'Calculate how long it will take to pay off your credit card debt and understand the impact of different payment strategies with our comprehensive credit card payoff calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Payoff Calculator | Finance Tools & Calculators',
    description: 'Calculate how long it will take to pay off your credit card debt and understand the impact of different payment strategies with our comprehensive credit card payoff calculator.'
  }
};

export default function CreditCardPayoffCalculatorPage() {
  return (
    <main>
      <CreditCardPayoffCalculator />
    </main>
  );
} 