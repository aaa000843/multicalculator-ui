import { Metadata } from 'next';
import RandomNumberGenerator from './RandomNumberGenerator';

export const metadata: Metadata = {
  title: 'Random Number Generator | Math Tools',
  description: 'Generate random numbers with customizable ranges, distributions, and sequences. Perfect for statistics, simulations, and games.',
  keywords: 'random number generator, random sequence generator, random integer generator, probability calculator, random sampling',
  openGraph: {
    title: 'Random Number Generator | Math Tools',
    description: 'Generate random numbers with customizable ranges, distributions, and sequences. Perfect for statistics, simulations, and games.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Number Generator | Math Tools',
    description: 'Generate random numbers with customizable ranges, distributions, and sequences. Perfect for statistics, simulations, and games.'
  }
};

export default function RandomNumberGeneratorPage() {
  return (
    <main>
      <RandomNumberGenerator />
    </main>
  );
} 