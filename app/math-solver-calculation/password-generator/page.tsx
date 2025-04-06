import { Metadata } from 'next';
import PasswordGenerator from './PasswordGenerator';

export const metadata: Metadata = {
  title: 'Password Generator | Math Tools',
  description: 'Generate secure passwords with customizable length and character types. Features password strength analysis and secure storage tips.',
  keywords: 'password generator, secure password, random password, password strength checker, password security',
  openGraph: {
    title: 'Password Generator | Math Tools',
    description: 'Generate secure passwords with customizable length and character types. Features password strength analysis and secure storage tips.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Password Generator | Math Tools',
    description: 'Generate secure passwords with customizable length and character types. Features password strength analysis and secure storage tips.'
  }
};

export default function PasswordGeneratorPage() {
  return (
    <main>
      <PasswordGenerator />
    </main>
  );
} 