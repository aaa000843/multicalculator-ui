"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

export default function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('10000');
  const [finalValue, setFinalValue] = useState<string>('15000');
  const [timeInYears, setTimeInYears] = useState<string>('2');
  const [roi, setRoi] = useState<number | null>(null);
  const [annualizedRoi, setAnnualizedRoi] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const calculateROI = () => {
    setError('');
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const years = parseFloat(timeInYears);

    if (isNaN(initial) || isNaN(final) || isNaN(years)) {
      setError('Please enter valid numbers for all fields');
      return;
    }

    if (initial <= 0 || final < 0 || years <= 0) {
      setError('Values must be greater than zero');
      return;
    }

    const totalReturn = ((final - initial) / initial) * 100;
    const annualized = (Math.pow((final / initial), 1/years) - 1) * 100;

    setRoi(totalReturn);
    setAnnualizedRoi(annualized);
  };

  const resetCalculator = () => {
    setInitialInvestment('10000');
    setFinalValue('15000');
    setTimeInYears('2');
    setRoi(null);
    setAnnualizedRoi(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ROI Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your Return on Investment (ROI) to evaluate the profitability of your investments.
                This calculator helps you:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Measure investment performance',
                  'Compare different investment opportunities',
                  'Calculate both total and annualized ROI',
                  'Make data-driven investment decisions'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6 space-y-4">
                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    placeholder="Enter initial investment"
                    className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="finalValue">Final Value ($)</Label>
                  <Input
                    id="finalValue"
                    type="number"
                    value={finalValue}
                    onChange={(e) => setFinalValue(e.target.value)}
                    placeholder="Enter final value"
                    className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeInYears">Investment Period (Years)</Label>
                  <Input
                    id="timeInYears"
                    type="number"
                    step="0.1"
                    value={timeInYears}
                    onChange={(e) => setTimeInYears(e.target.value)}
                    placeholder="Enter time period"
                    className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateROI}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate ROI
                  </Button>
                  <Button 
                    onClick={resetCalculator}
                    variant="outline"
                    className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Results
                </h2>
                {roi !== null && annualizedRoi !== null && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Total ROI</p>
                      <p className="text-3xl font-bold">
                        {roi.toFixed(2)}%
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Annualized ROI</p>
                      <p className="text-3xl font-bold">
                        {annualizedRoi.toFixed(2)}%
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium">
                        Total Profit/Loss: ${(parseFloat(finalValue) - parseFloat(initialInvestment)).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding ROI:</h3>
                  <ul className="space-y-2">
                    {[
                      'Total ROI measures overall return percentage',
                      'Annualized ROI shows yearly equivalent return',
                      'Higher ROI indicates better investment performance',
                      'Consider risk factors alongside ROI'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h3 className="font-semibold text-indigo-600 mb-4">Investment Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Diversify your investment portfolio',
                    'Consider both short and long-term ROI',
                    'Account for all costs and fees',
                    'Compare ROI with market benchmarks',
                    'Regular monitoring and rebalancing'
                  ].map((tip, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}