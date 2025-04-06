import { Metadata } from 'next';
import BudgetCalculator from './BudgetCalculator';

export const metadata: Metadata = {
  title: 'Budget Calculator | Finance Tools & Calculators',
  description: 'Create a personalized budget plan with our comprehensive budget calculator. Track income, expenses, and savings goals to improve your financial management.',
  keywords: 'budget calculator, expense calculator, income calculator, savings calculator, monthly budget planner, financial planning calculator',
  openGraph: {
    title: 'Budget Calculator | Finance Tools & Calculators',
    description: 'Create a personalized budget plan with our comprehensive budget calculator. Track income, expenses, and savings goals to improve your financial management.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator | Finance Tools & Calculators',
    description: 'Create a personalized budget plan with our comprehensive budget calculator. Track income, expenses, and savings goals to improve your financial management.'
  }
};

export default function BudgetCalculatorPage() {
  return (
    <main>
      <BudgetCalculator />
    </main>
  );
} 