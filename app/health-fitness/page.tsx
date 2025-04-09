import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators | Calcifai',
  description: 'Calculate BMI, calories, body fat, BMR, ideal weight, and pace with our health and fitness calculators. Get accurate measurements for your fitness journey.',
  keywords: 'BMI calculator, calorie calculator, body fat calculator, BMR calculator, ideal weight calculator, pace calculator, fitness calculator, health calculator',
};

const calculators = [
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index (BMI) to assess if you are at a healthy weight',
    href: '/health-fitness/bmi-calculator',
  },
  {
    title: 'Calorie Calculator',
    description: 'Determine your daily caloric needs based on your activity level and goals',
    href: '/health-fitness/calorie-calculator',
  },
  {
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using various measurement methods',
    href: '/health-fitness/body-fat-calculator',
  },
  {
    title: 'BMR Calculator',
    description: 'Calculate your Basal Metabolic Rate to understand your base calorie needs',
    href: '/health-fitness/bmr-calculator',
  },
  {
    title: 'Ideal Weight Calculator',
    description: 'Find your ideal weight range based on height, age, and body frame',
    href: '/health-fitness/ideal-weight-calculator',
  },
  {
    title: 'Pace Calculator',
    description: 'Calculate running pace, speed, time, and distance for your workouts',
    href: '/health-fitness/pace-calculator',
  },
];

const features = [
  'Accurate health metrics calculations',
  'Multiple measurement methods',
  'Personalized recommendations',
  'Progress tracking capabilities',
  'Easy-to-understand results',
];

const benefits = [
  'Track your fitness progress',
  'Set realistic health goals',
  'Make informed fitness decisions',
  'Monitor your nutritional needs',
  'Optimize your workout routine',
];

export default function HealthFitnessCalculators() {
  return (
    <CategoryPage
      title="Health & Fitness Calculators"
      description="Comprehensive tools for tracking your health and fitness metrics"
      introduction="Take control of your health and fitness journey with our suite of calculators. Whether you're tracking your BMI, calculating calories, or planning your workouts, our tools provide accurate measurements and helpful insights to support your wellness goals."
      calculators={calculators}
      features={features}
      benefits={benefits}
    />
  );
} 