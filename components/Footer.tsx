import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-100">About Us</h3>
            <p className="text-sm text-purple-200">
              MultiCalculator provides a comprehensive suite of calculators and tools for all your needs,
              from financial planning to fitness tracking.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-purple-200 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm text-purple-200 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-purple-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-purple-200 hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-100">Explore Links</h3>
            <ul className="space-y-2">
              <li><Link href="/financial-calculators" className="text-sm text-purple-200 hover:text-white transition-colors">Financial Tools</Link></li>
              <li><Link href="/health-fitness" className="text-sm text-purple-200 hover:text-white transition-colors">Health & Fitness</Link></li>
              <li><Link href="/math-solver-calculation" className="text-sm text-purple-200 hover:text-white transition-colors">Math & Calculations</Link></li>
              <li><Link href="/everyday-calculators" className="text-sm text-purple-200 hover:text-white transition-colors">Everyday Tools</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-100">Popular Tools</h3>
            <ul className="space-y-2">
              <li><Link href="/financial-calculators/mortgage-calculator" className="text-sm text-purple-200 hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/health-fitness/bmi-calculator" className="text-sm text-purple-200 hover:text-white transition-colors">BMI Calculator</Link></li>
              <li><Link href="/math-solver-calculation/scientific-calculator" className="text-sm text-purple-200 hover:text-white transition-colors">Scientific Calculator</Link></li>
              <li><Link href="/everyday-calculators/age-calculator" className="text-sm text-purple-200 hover:text-white transition-colors">Age Calculator</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-purple-400/30 flex items-center justify-center">
          <p className="text-sm text-purple-200">
            © {new Date().getFullYear()} MultiCalculator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;