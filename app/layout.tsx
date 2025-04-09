import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import env from '@/constants/env';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { ToastContainer } from '@/lib/toast';

import { GLOBAL_TOAST_ID } from '@/constants/toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(env.APP_URL),
  title: 'Calcifai - All-in-One Calculator Suite',
  description: 'Access a comprehensive suite of calculators for finance, health, math, and everyday calculations. Get accurate results with our easy-to-use tools.',
  openGraph: {
    title: 'Calcifai - All-in-One Calculator Suite',
    description: 'Access a comprehensive suite of calculators for finance, health, math, and everyday calculations. Get accurate results with our easy-to-use tools.',
    url: env.APP_URL,
    siteName: 'Calcifai',
  },
  icons: {
    icon: '/assets/calcifai.jpg',
    shortcut: '/assets/calcifai.jpg',
    apple: '/assets/calcifai.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
          <ToastContainer containerId={GLOBAL_TOAST_ID} />
        </ThemeProvider>
      </body>
    </html>
  );
}