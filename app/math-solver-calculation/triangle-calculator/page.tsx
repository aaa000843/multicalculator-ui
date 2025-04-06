import { Metadata } from 'next';
import TriangleCalculator from './TriangleCalculator';

export const metadata: Metadata = {
  title: 'Triangle Calculator | Math Tools',
  description: 'Calculate triangle properties including area, perimeter, angles, and height. Supports multiple calculation methods and triangle classifications.',
  keywords: 'triangle calculator, area calculator, perimeter calculator, triangle angles, triangle height, triangle classification',
  openGraph: {
    title: 'Triangle Calculator | Math Tools',
    description: 'Calculate triangle properties including area, perimeter, angles, and height. Supports multiple calculation methods and triangle classifications.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triangle Calculator | Math Tools',
    description: 'Calculate triangle properties including area, perimeter, angles, and height. Supports multiple calculation methods and triangle classifications.'
  }
};

export default function TriangleCalculatorPage() {
  return (
    <main>
      <TriangleCalculator />
    </main>
  );
} 