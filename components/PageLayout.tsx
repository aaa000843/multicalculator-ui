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
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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