import { Metadata } from 'next';
import PaceCalculator from './PaceCalculator';

export const metadata: Metadata = {
  title: 'Pace Calculator | Health & Fitness Tools',
  description: 'Calculate your running pace, speed, time, and distance. Plan your workouts and races with our comprehensive pace calculator.',
  keywords: 'pace calculator, running calculator, speed calculator, race time calculator, running pace calculator, marathon calculator',
  openGraph: {
    title: 'Pace Calculator | Health & Fitness Tools',
    description: 'Calculate your running pace, speed, time, and distance. Plan your workouts and races with our comprehensive pace calculator.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pace Calculator | Health & Fitness Tools',
    description: 'Calculate your running pace, speed, time, and distance. Plan your workouts and races with our comprehensive pace calculator.'
  }
};

export default function PaceCalculatorPage() {
  return (
    <main>
      <PaceCalculator />
    </main>
  );
} 