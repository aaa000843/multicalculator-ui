"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(path => path);

  return (
    <nav className="flex justify-end items-center space-x-2 text-sm text-gray-600 mb-6 bg-white/50 backdrop-blur-sm py-2 px-4 rounded-lg shadow-sm">
      <Link 
        href="/" 
        className="flex items-center text-indigo-600 hover:text-purple-600 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`;
        const isLast = index === paths.length - 1;
        const title = path.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');

        return (
          <div key={path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-purple-400" />
            {isLast ? (
              <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {title}
              </span>
            ) : (
              <Link
                href={href}
                className="text-indigo-600 hover:text-purple-600 transition-colors"
              >
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;