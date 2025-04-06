import type { Metadata } from 'next';
import GradeCalculator from './GradeCalculator';

export const metadata: Metadata = {
  title: 'Grade Calculator | Everyday Calculators',
  description: 'Calculate your final grade based on assignments, exams, and weighted categories. Find out what score you need on your final exam.',
  keywords: 'grade calculator, final grade calculator, weighted grade calculator, final exam calculator, grade percentage calculator',
  openGraph: {
    title: 'Grade Calculator | Everyday Calculators',
    description: 'Calculate your final grade based on assignments, exams, and weighted categories. Find out what score you need on your final exam.',
  },
  twitter: {
    title: 'Grade Calculator | Everyday Calculators',
    description: 'Calculate your final grade based on assignments, exams, and weighted categories. Find out what score you need on your final exam.',
  },
};

export default function GradeCalculatorPage() {
  return (
    <main>
      <GradeCalculator />
    </main>
  );
} 