import { Metadata } from 'next';
import BMICalculator from './BMICalculator';

export const metadata: Metadata = {
  title: 'BMI Calculator | Health & Fitness Tools',
  description: 'Calculate your Body Mass Index (BMI) with our accurate BMI calculator. Get instant results and understand your weight category for better health management.',
  keywords: 'BMI calculator, body mass index calculator, weight calculator, health calculator, BMI measurement tool, healthy weight calculator',
  openGraph: {
    title: 'BMI Calculator | Health & Fitness Tools',
    description: 'Calculate your Body Mass Index (BMI) with our accurate BMI calculator. Get instant results and understand your weight category for better health management.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BMI Calculator | Health & Fitness Tools',
    description: 'Calculate your Body Mass Index (BMI) with our accurate BMI calculator. Get instant results and understand your weight category for better health management.'
  }
};

export default function BMICalculatorPage() {
  return (
    <main>
      <BMICalculator />
    </main>
  );
} 