import { Metadata } from 'next';
import MortgageCalculatorClient from './MortgageCalculator';

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Finance Tools & Calculators',
  description: 'Calculate your monthly mortgage payments, total interest costs, and amortization schedule. Make informed decisions about home financing with our comprehensive mortgage calculator.',
  keywords: 'mortgage calculator, home loan calculator, mortgage payment calculator, house payment calculator, mortgage interest calculator, amortization calculator',
  openGraph: {
    title: 'Mortgage Calculator | Finance Tools & Calculators',
    description: 'Calculate your monthly mortgage payments, total interest costs, and amortization schedule. Make informed decisions about home financing with our comprehensive mortgage calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator | Finance Tools & Calculators',
    description: 'Calculate your monthly mortgage payments, total interest costs, and amortization schedule. Make informed decisions about home financing with our comprehensive mortgage calculator.'
  }
};

export default function MortgageCalculatorPage() {
  return (
    <main>
      <MortgageCalculatorClient />
    </main>
  );
}