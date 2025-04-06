import { Metadata } from 'next';
import ROICalculatorClient from './ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Calculator | Finance Tools & Calculators',
  description: 'Calculate return on investment (ROI) for your business or investment projects. Our ROI calculator helps you evaluate investment performance and make data-driven decisions.',
  keywords: 'ROI calculator, return on investment, investment calculator, business ROI, project ROI, investment return, profit calculator',
  openGraph: {
    title: 'ROI Calculator | Finance Tools & Calculators',
    description: 'Calculate return on investment (ROI) for your business or investment projects. Our ROI calculator helps you evaluate investment performance and make data-driven decisions.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator | Finance Tools & Calculators',
    description: 'Calculate return on investment (ROI) for your business or investment projects. Our ROI calculator helps you evaluate investment performance and make data-driven decisions.'
  }
};

export default function ROICalculatorPage() {
  return (
    <main>
      <ROICalculatorClient />
    </main>
  );
}