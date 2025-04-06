import type { Metadata } from 'next';
import NumberWordsConverter from './NumberWordsConverter';

export const metadata: Metadata = {
  title: 'Number Words Converter | Math Solver',
  description: 'Convert numbers to words and words to numbers. Supports multiple languages and formats for spelling out numbers in text form.',
  keywords: 'number to words converter, words to numbers, number spelling, number text converter, math tools',
  openGraph: {
    title: 'Number Words Converter | Math Solver',
    description: 'Convert numbers to words and words to numbers. Supports multiple languages and formats.',
  },
  twitter: {
    title: 'Number Words Converter | Math Solver',
    description: 'Convert numbers to words and words to numbers. Supports multiple languages and formats.',
  },
};

export default function NumberWordsConverterPage() {
  return (
    <main>
      <NumberWordsConverter />
    </main>
  );
} 