import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

export const metadata: Metadata = {
  title: 'Everyday Calculators & Tools | Calcifai',
  description: 'Simplify your daily calculations with our everyday calculator tools. Calculate age, dates, time, hours, GPA, and grades with ease.',
  keywords: 'age calculator, date calculator, time calculator, hours calculator, GPA calculator, grade calculator, everyday tools',
};

const calculators = [
  {
    title: 'Age Calculator',
    description: 'Calculate exact age between two dates including years, months, and days',
    href: '/everyday-calculators/age-calculator',
  },
  {
    title: 'Date Calculator',
    description: 'Add or subtract days, weeks, months, and years from any date',
    href: '/everyday-calculators/date-calculator',
  },
  {
    title: 'Time Calculator',
    description: 'Calculate time differences and add or subtract time intervals',
    href: '/everyday-calculators/time-calculator',
  },
  {
    title: 'Hours Calculator',
    description: 'Calculate work hours, overtime, and time duration between periods',
    href: '/everyday-calculators/hours-calculator',
  },
  {
    title: 'GPA Calculator',
    description: 'Calculate your Grade Point Average (GPA) and track academic performance',
    href: '/everyday-calculators/gpa-calculator',
  },
  {
    title: 'Grade Calculator',
    description: 'Calculate final grades and required scores for target grades',
    href: '/everyday-calculators/grade-calculator',
  }
];

const features = [
  'Easy-to-use interfaces',
  'Quick and accurate results',
  'Multiple calculation options',
  'Save calculation history',
  'Mobile-friendly design',
];

const benefits = [
  'Save time on daily calculations',
  'Avoid manual calculation errors',
  'Track important dates and times',
  'Plan academic goals effectively',
  'Organize time management better',
];

export default function EverydayCalculators() {
  return (
    <CategoryPage
      title="Everyday Calculators & Tools"
      description="Simple and useful calculators for daily needs"
      introduction="Access a collection of practical calculators designed to help you with everyday calculations. From tracking dates and times to managing academic performance, our tools make daily calculations quick and accurate."
      calculators={calculators}
      features={features}
      benefits={benefits}
    />
  );
} 