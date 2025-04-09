import { ReactNode } from 'react';
import Head from 'next/head';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface CalculatorLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  onReset?: () => void;
}

const CalculatorLayout = ({
  children,
  title,
  description,
  onReset
}: CalculatorLayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Calcifai`}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${title} | Calcifai`} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={`${title} | Calcifai`} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                  <p className="mt-2 text-gray-600">{description}</p>
                </div>
                {onReset && (
                  <Button
                    variant="outline"
                    onClick={onReset}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                )}
              </div>
              <div className="space-y-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorLayout; 