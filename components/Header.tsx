"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calculator, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const menuItems = {
    'Financial Tools': [
      'Mortgage Calculator',
      'Loan Calculator',
      'Investment Calculator',
      'Compound Interest Calculator',
      'Retirement Calculator',
      'Income Tax Calculator',
      'Debt Payoff Calculator',
      'ROI Calculator',
      'Net Worth Calculator',
      'Budget Calculator',
      'Savings Calculator',
      'Credit Card Payoff Calculator',
    ],
    'Health & Fitness': [
      'BMI Calculator',
      'Calorie Calculator',
      'Body Fat Calculator',
      'BMR Calculator',
      'Ideal Weight Calculator',
      'Pace Calculator',
    ],
    'Math Solver & Calculation': [
      'Scientific Calculator',
      'Fraction Calculator',
      'Percentage Calculator',
      'Random Number Generator',
      'Number Words Converter',
      'Px Rem Converter',
      'Roman Numeral Converter',
      'Binary Converter',
      'Password Generator',
      'Triangle Calculator',
      'Standard Deviation Calculator',
    ],
    'Everyday Tools': [
      'Age Calculator',
      'Date Calculator',
      'Time Calculator',
      'Hours Calculator',
      'GPA Calculator',
      'Grade Calculator',
    ],
  };

  const categoryRoutes = {
    'Financial Tools': 'financial-calculators',
    'Health & Fitness': 'health-fitness',
    'Math Solver & Calculation': 'math-solver-calculation',
    'Everyday Tools': 'everyday-calculators',
  };

  const getSlug = (text: string) => text.toLowerCase().replace(/\s+/g, '-');

  const isActive = (href: string) => pathname === href;

  const isCategoryActive = (category: string) => {
    const categoryPath = `/${categoryRoutes[category as keyof typeof categoryRoutes]}`;
    return pathname.startsWith(categoryPath);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <Calculator className="h-8 w-8" />
            <span className="text-xl font-bold">MultiCalculator</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-8">
            {Object.entries(menuItems).map(([category, items]) => (
              <div 
                key={category} 
                className="relative group"
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link 
                  href={`/${categoryRoutes[category as keyof typeof categoryRoutes]}`}
                  className={`flex items-center space-x-1 py-2 hover:text-purple-200 transition-colors relative ${
                    isCategoryActive(category) ? 'text-purple-200' : ''
                  }`}
                >
                  <span>{category}</span>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  {isCategoryActive(category) && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-300 rounded-full"></div>
                  )}
                </Link>
                {activeCategory === category && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50">
                    <div className="py-2">
                      {items.map((item) => {
                        const href = `/${categoryRoutes[category as keyof typeof categoryRoutes]}/${getSlug(item)}`;
                        return (
                          <Link
                            key={item}
                            href={href}
                            className={`block px-4 py-2 text-sm transition-colors relative ${
                              isActive(href)
                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                : 'text-gray-700 hover:bg-purple-50'
                            }`}
                          >
                            {item}
                            {isActive(href) && (
                              <div className="absolute left-0 top-0 h-full w-1 bg-purple-300 rounded-r"></div>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden hover:opacity-90 transition-opacity"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4">
            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category} className="mb-6">
                <Link
                  href={`/${categoryRoutes[category as keyof typeof categoryRoutes]}`}
                  className={`font-semibold mb-2 hover:text-purple-200 transition-colors block relative ${
                    isCategoryActive(category) ? 'text-purple-200' : 'text-purple-100'
                  }`}
                >
                  {category}
                  {isCategoryActive(category) && (
                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-purple-300 rounded-full"></div>
                  )}
                </Link>
                <div className="pl-4 space-y-2">
                  {items.map((item) => {
                    const href = `/${categoryRoutes[category as keyof typeof categoryRoutes]}/${getSlug(item)}`;
                    return (
                      <Link
                        key={item}
                        href={href}
                        className={`block py-1 transition-colors relative pl-3 ${
                          isActive(href)
                            ? 'text-purple-200 font-medium'
                            : 'hover:text-purple-300'
                        }`}
                      >
                        {item}
                        {isActive(href) && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-purple-300 rounded-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;