import type { Metadata } from 'next';
import GPACalculator from './GPACalculator';

export const metadata: Metadata = {
  title: 'GPA Calculator | Everyday Calculators',
  description: 'Calculate your Grade Point Average (GPA) for semester or cumulative GPA. Support for different grading scales and credit hours.',
  keywords: 'gpa calculator, grade point average, college gpa, semester gpa, cumulative gpa, academic calculator',
  openGraph: {
    title: 'GPA Calculator | Everyday Calculators',
    description: 'Calculate your Grade Point Average (GPA) for semester or cumulative GPA. Support for different grading scales and credit hours.',
  },
  twitter: {
    title: 'GPA Calculator | Everyday Calculators',
    description: 'Calculate your Grade Point Average (GPA) for semester or cumulative GPA. Support for different grading scales and credit hours.',
  },
};

export default function GPACalculatorPage() {
  return (
    <main>
      <GPACalculator />
    </main>
  );
} 