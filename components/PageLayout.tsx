import { ReactNode } from 'react';
import Breadcrumb from './Breadcrumb';

interface PageLayoutProps {
  title: string;
  children: ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <>
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-navy-800 dark:text-white">
          {title}
        </h1>
        <Breadcrumb />
      </div>
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </>
  );
} 