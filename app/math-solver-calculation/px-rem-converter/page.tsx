import type { Metadata } from 'next';
import PxRemConverter from './PxRemConverter';

export const metadata: Metadata = {
  title: 'PX to REM Converter | Math Solver',
  description: 'Convert between pixels (px) and root em units (rem). Calculate responsive font sizes and spacing for web development.',
  keywords: 'px to rem converter, rem to px, pixel converter, responsive design, web development tools',
  openGraph: {
    title: 'PX to REM Converter | Math Solver',
    description: 'Convert between pixels (px) and root em units (rem). Calculate responsive font sizes and spacing.',
  },
  twitter: {
    title: 'PX to REM Converter | Math Solver',
    description: 'Convert between pixels (px) and root em units (rem). Calculate responsive font sizes and spacing.',
  },
};

export default function PxRemConverterPage() {
  return (
    <main>
      <PxRemConverter />
    </main>
  );
} 