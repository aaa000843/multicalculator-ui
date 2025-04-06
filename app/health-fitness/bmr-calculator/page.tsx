import { Metadata } from 'next';
import BMRCalculator from './BMRCalculator';

export const metadata: Metadata = {
  title: 'BMR Calculator | Health & Fitness Tools',
  description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Understand your base caloric needs for effective weight management.',
  keywords: 'BMR calculator, basal metabolic rate calculator, TDEE calculator, metabolism calculator, calorie needs calculator',
  openGraph: {
    title: 'BMR Calculator | Health & Fitness Tools',
    description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Understand your base caloric needs for effective weight management.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMR Calculator | Health & Fitness Tools',
    description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). Understand your base caloric needs for effective weight management.'
  }
};

export default function BMRCalculatorPage() {
  return (
    <main>
      <BMRCalculator />
    </main>
  );
} 