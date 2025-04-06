import { Metadata } from 'next';
import BinaryConverter from './BinaryConverter';

export const metadata: Metadata = {
  title: 'Binary Converter | Math Tools',
  description: 'Convert numbers between binary, decimal, hexadecimal, and octal. Features binary operations and ASCII text conversion.',
  keywords: 'binary converter, decimal to binary, binary to decimal, hex converter, octal converter, binary calculator',
  openGraph: {
    title: 'Binary Converter | Math Tools',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal. Features binary operations and ASCII text conversion.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Converter | Math Tools',
    description: 'Convert numbers between binary, decimal, hexadecimal, and octal. Features binary operations and ASCII text conversion.'
  }
};

export default function BinaryConverterPage() {
  return (
    <main>
      <BinaryConverter />
    </main>
  );
} 