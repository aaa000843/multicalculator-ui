import { Metadata } from 'next';
import RetirementCalculator from './RetirementCalculator';

export const metadata: Metadata = {
  title: 'Retirement Calculator | Finance Tools & Calculators',
  description: 'Calculate your retirement savings needs, project future income, and create a personalized retirement plan. Account for inflation, investment returns, and life expectancy.',
  keywords: 'retirement calculator, retirement planning, retirement savings, 401k calculator, pension calculator, retirement income, financial planning',
  openGraph: {
    title: 'Retirement Calculator | Finance Tools & Calculators',
    description: 'Calculate your retirement savings needs, project future income, and create a personalized retirement plan.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator | Finance Tools & Calculators',
    description: 'Calculate your retirement savings needs, project future income, and create a personalized retirement plan.'
  }
};

export default function RetirementCalculatorPage() {
  return (
    <main>
      <RetirementCalculator />
    </main>
  );
}
