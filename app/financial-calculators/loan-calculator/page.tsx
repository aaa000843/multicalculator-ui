import { Metadata } from 'next';
import LoanCalculatorClient from './LoanCalculator';

export const metadata: Metadata = {
  title: 'Loan Calculator | Finance Tools & Calculators',
  description: 'Calculate loan payments, total interest costs, and compare different loan terms. Make informed borrowing decisions with our comprehensive loan calculator.',
  keywords: 'loan calculator, personal loan calculator, auto loan calculator, loan payment calculator, loan interest calculator, loan amortization calculator',
  openGraph: {
    title: 'Loan Calculator | Finance Tools & Calculators',
    description: 'Calculate loan payments, total interest costs, and compare different loan terms. Make informed borrowing decisions with our comprehensive loan calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Calculator | Finance Tools & Calculators',
    description: 'Calculate loan payments, total interest costs, and compare different loan terms. Make informed borrowing decisions with our comprehensive loan calculator.'
  }
};

export default function LoanCalculatorPage() {
  return (
    <main>
      <LoanCalculatorClient />
    </main>
  );
}