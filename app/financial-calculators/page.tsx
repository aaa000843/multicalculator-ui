import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

export const metadata: Metadata = {
  title: 'Finance Tools & Calculators | MultiCalculator',
  description: 'Access comprehensive financial planning tools including mortgage, loan, investment, retirement, and tax calculators. Make informed financial decisions with our advanced calculators.',
  keywords: 'financial calculator, mortgage calculator, loan calculator, investment calculator, retirement planning, tax calculator, compound interest, debt payoff, ROI calculator',
};

const calculators = [
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments, interest costs, and amortization schedules',
    href: '/financial-calculators/mortgage-calculator',
  },
  {
    title: 'Loan Calculator',
    description: 'Estimate loan payments, total interest, and compare different loan terms',
    href: '/financial-calculators/loan-calculator',
  },
  {
    title: 'Investment Calculator',
    description: 'Project investment growth and analyze returns on your investments',
    href: '/financial-calculators/investment-calculator',
  },
  {
    title: 'Compound Interest Calculator',
    description: 'See how your money grows with compound interest over time',
    href: '/financial-calculators/compound-interest-calculator',
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement savings and estimate future retirement income',
    href: '/financial-calculators/retirement-calculator',
  },
  {
    title: 'Income Tax Calculator',
    description: 'Estimate your tax liability and plan your tax payments',
    href: '/financial-calculators/income-tax-calculator',
  },
  {
    title: 'Debt Payoff Calculator',
    description: 'Create a debt repayment plan and track your progress to becoming debt-free',
    href: '/financial-calculators/debt-payoff-calculator',
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate return on investment for your business or investment projects',
    href: '/financial-calculators/roi-calculator',
  },
  {
    title: 'Net Worth Calculator',
    description: 'Track your assets and liabilities to calculate your total net worth',
    href: '/financial-calculators/net-worth-calculator',
  },
  {
    title: 'Budget Calculator',
    description: 'Plan your monthly budget and track your spending categories',
    href: '/financial-calculators/budget-calculator',
  },
  {
    title: 'Savings Calculator',
    description: 'Set savings goals and calculate how long it will take to reach them',
    href: '/financial-calculators/savings-calculator',
  },
  {
    title: 'Credit Card Payoff Calculator',
    description: 'Plan your credit card debt repayment and calculate interest savings',
    href: '/financial-calculators/credit-card-payoff-calculator',
  },
];

const features = [
  'Real-time financial calculations',
  'Customizable loan and investment scenarios',
  'Detailed amortization schedules',
  'Multiple calculation methods',
  'Save and compare different scenarios',
];

const benefits = [
  'Make informed financial decisions',
  'Plan your investments strategically',
  'Understand loan costs and terms',
  'Optimize your debt repayment',
  'Track your financial progress',
];

export default function FinancialCalculators() {
  return (
    <CategoryPage
      title="Finance Tools & Calculators"
      description="Comprehensive financial planning tools and calculators"
      introduction="Make informed financial decisions with our comprehensive suite of financial calculators and planning tools. Whether you're planning to buy a home, investing for the future, or managing debt, our calculators provide accurate calculations and detailed insights to help you achieve your financial goals."
      calculators={calculators}
      features={features}
      benefits={benefits}
    />
  );
}