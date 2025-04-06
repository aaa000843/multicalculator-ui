import { Metadata } from 'next';
import RomanNumeralConverter from './RomanNumeralConverter';

export const metadata: Metadata = {
  title: 'Roman Numeral Converter | Math Tools',
  description: 'Convert numbers between Roman numerals and Arabic numerals. Supports numbers from 1 to 3999 with validation and historical context.',
  keywords: 'roman numeral converter, roman to decimal, decimal to roman, number system converter, roman numerals calculator',
  openGraph: {
    title: 'Roman Numeral Converter | Math Tools',
    description: 'Convert numbers between Roman numerals and Arabic numerals. Supports numbers from 1 to 3999 with validation and historical context.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roman Numeral Converter | Math Tools',
    description: 'Convert numbers between Roman numerals and Arabic numerals. Supports numbers from 1 to 3999 with validation and historical context.'
  }
};

export default function RomanNumeralConverterPage() {
  return (
    <main>
      <RomanNumeralConverter />
    </main>
  );
} 