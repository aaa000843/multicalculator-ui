import { Metadata } from 'next';
import CalorieCalculator from './CalorieCalculator';

export const metadata: Metadata = {
  title: 'Calorie Calculator | Health & Fitness Tools',
  description: 'Calculate your daily caloric needs based on your activity level, age, weight, and goals. Get personalized recommendations for weight loss, maintenance, or gain.',
  keywords: 'calorie calculator, daily calorie needs, calorie intake calculator, weight loss calculator, nutrition calculator, diet planner',
  openGraph: {
    title: 'Calorie Calculator | Health & Fitness Tools',
    description: 'Calculate your daily caloric needs based on your activity level, age, weight, and goals. Get personalized recommendations for weight loss, maintenance, or gain.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calorie Calculator | Health & Fitness Tools',
    description: 'Calculate your daily caloric needs based on your activity level, age, weight, and goals. Get personalized recommendations for weight loss, maintenance, or gain.'
  }
};

export default function CalorieCalculatorPage() {
  return (
    <main>
      <CalorieCalculator />
    </main>
  );
} 