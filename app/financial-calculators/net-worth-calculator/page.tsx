import { Metadata } from 'next';
import NetWorthCalculator from './NetWorthCalculator';

export const metadata: Metadata = {
  title: 'Net Worth Calculator | Finance Tools & Calculators',
  description: 'Calculate your total net worth by tracking your assets and liabilities. Get a clear picture of your financial health with our comprehensive net worth calculator.',
  keywords: 'net worth calculator, asset calculator, liability calculator, financial health calculator, wealth calculator, personal finance calculator',
  openGraph: {
    title: 'Net Worth Calculator | Finance Tools & Calculators',
    description: 'Calculate your total net worth by tracking your assets and liabilities. Get a clear picture of your financial health with our comprehensive net worth calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator | Finance Tools & Calculators',
    description: 'Calculate your total net worth by tracking your assets and liabilities. Get a clear picture of your financial health with our comprehensive net worth calculator.'
  }
};

export default function NetWorthCalculatorPage() {
  return (
    <main>
      <NetWorthCalculator />
    </main>
  );
} 