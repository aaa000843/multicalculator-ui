import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

export const metadata: Metadata = {
  title: 'Math Solver & Calculation Tools | MultiCalculator',
  description: 'Access powerful mathematical tools including scientific calculator, fraction calculator, percentage calculator, and more. Solve complex math problems with ease.',
  keywords: 'scientific calculator, fraction calculator, percentage calculator, random number generator, triangle calculator, standard deviation calculator, math solver',
};

const calculators = [
  {
    title: 'Scientific Calculator',
    description: 'Perform complex mathematical calculations with advanced functions and operations',
    href: '/math-solver-calculation/scientific-calculator',
  },
  {
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions with step-by-step solutions',
    href: '/math-solver-calculation/fraction-calculator',
  },
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage changes, and proportions easily',
    href: '/math-solver-calculation/percentage-calculator',
  },
  {
    title: 'Random Number Generator',
    description: 'Generate random numbers with custom ranges and distribution options',
    href: '/math-solver-calculation/random-number-generator',
  },
  {
    title: 'Triangle Calculator',
    description: 'Calculate triangle properties including area, angles, and side lengths',
    href: '/math-solver-calculation/triangle-calculator',
  },
  {
    title: 'Standard Deviation Calculator',
    description: 'Calculate statistical measures including mean, variance, and standard deviation',
    href: '/math-solver-calculation/standard-deviation-calculator',
  },
  {
    title: 'Number Words Converter',
    description: 'Convert numbers to words with our easy-to-use converter',
    href: '/math-solver-calculation/number-words-converter',
  },
  {
    title:'Px Rem Converter',
    description: 'Convert pixels to rem units and vice versa',
    href: '/math-solver-calculation/px-rem-converter',
  },
  {
    title: 'Roman Numeral Converter',
    description: 'Convert numbers to Roman numerals and vice versa',
    href: '/math-solver-calculation/roman-numeral-converter',
  },
  {
    title: 'Binary Converter',
    description: 'Convert numbers to binary and vice versa',
    href: '/math-solver-calculation/binary-converter',
  },
  {
    title: 'Password Generator',
    description: 'Generate secure passwords with customizable options',
    href: '/math-solver-calculation/password-generator',
  },
];

const features = [
  'Advanced mathematical functions',
  'Step-by-step solutions',
  'Multiple calculation modes',
  'Precise and accurate results',
  'Scientific notation support',
];

const benefits = [
  'Solve complex math problems quickly',
  'Understand mathematical concepts better',
  'Save time on calculations',
  'Reduce calculation errors',
  'Improve mathematical skills',
];

export default function MathSolverCalculators() {
  return (
    <CategoryPage
      title="Math Solver & Calculation Tools"
      description="Advanced mathematical tools and calculators"
      introduction="Access a comprehensive suite of mathematical tools designed to help you solve complex calculations with ease. From basic arithmetic to advanced statistical analysis, our calculators provide accurate results and step-by-step solutions to support your mathematical needs."
      calculators={calculators}
      features={features}
      benefits={benefits}
    />
  );
} 