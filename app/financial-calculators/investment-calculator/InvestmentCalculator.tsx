"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface InvestmentScenario {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  yearlyBreakdown: {
    year: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

interface InvestmentFrequency {
  label: string;
  value: string;
  multiplier: number;
}

const INVESTMENT_FREQUENCIES: InvestmentFrequency[] = [
  { label: 'Monthly', value: 'monthly', multiplier: 12 },
  { label: 'Quarterly', value: 'quarterly', multiplier: 4 },
  { label: 'Half-Yearly', value: 'half-yearly', multiplier: 2 },
  { label: 'Yearly', value: 'yearly', multiplier: 1 }
];

export default function InvestmentCalculator() {
  // Initial Investment
  const [initialAmount, setInitialAmount] = useState<string>('10000');
  const [regularContribution, setRegularContribution] = useState<string>('500');
  const [investmentFrequency, setInvestmentFrequency] = useState<string>('monthly');
  
  // Investment Details
  const [annualReturn, setAnnualReturn] = useState<string>('8');
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('10');
  const [reinvestDividends, setReinvestDividends] = useState<string>('yes');
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<InvestmentScenario | null>(null);

  const calculateInvestment = () => {
    setError('');
    try {
      // Parse inputs
      const initial = parseFloat(initialAmount);
      const contribution = parseFloat(regularContribution);
      const returnRate = parseFloat(annualReturn) / 100;
      const years = parseFloat(investmentPeriod);
      const frequency = INVESTMENT_FREQUENCIES.find(f => f.value === investmentFrequency)?.multiplier || 12;

      // Validation
      if ([initial, contribution, returnRate, years].some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (initial < 0 || contribution < 0) {
        throw new Error('Investment amounts cannot be negative');
      }
      if (returnRate < -100 || returnRate > 100) {
        throw new Error('Return rate must be between -100% and 100%');
      }
      if (years <= 0 || years > 50) {
        throw new Error('Investment period must be between 1 and 50 years');
      }

      // Calculate periodic rate
      const periodicRate = returnRate / frequency;
      
      // Initialize results
      let balance = initial;
      let totalContributions = initial;
      const yearlyBreakdown = [];
      
      // Calculate year by year
      for (let year = 1; year <= years; year++) {
        let yearStartBalance = balance;
        let yearContributions = 0;
        
        // Calculate compounding for each period in the year
        for (let period = 1; period <= frequency; period++) {
          // Add contribution
          balance += contribution;
          yearContributions += contribution;
          
          // Apply interest
          balance *= (1 + periodicRate);
        }
        
        totalContributions += yearContributions;
        const yearInterest = balance - yearStartBalance - yearContributions;
        
        yearlyBreakdown.push({
          year,
          balance: Number(balance.toFixed(2)),
          contributions: Number(yearContributions.toFixed(2)),
          interest: Number(yearInterest.toFixed(2))
        });
      }

      setResults({
        futureValue: Number(balance.toFixed(2)),
        totalContributions: Number(totalContributions.toFixed(2)),
        totalInterest: Number((balance - totalContributions).toFixed(2)),
        yearlyBreakdown
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setInitialAmount('10000');
    setRegularContribution('500');
    setInvestmentFrequency('monthly');
    setAnnualReturn('8');
    setInvestmentPeriod('10');
    setReinvestDividends('yes');
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Investment Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Plan your investment strategy and visualize your potential returns:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Calculate future investment value',
                  'Analyze different contribution frequencies',
                  'See year-by-year breakdown',
                  'Compare different investment scenarios'
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

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Initial Investment</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="initialAmount">Initial Amount ($)</Label>
                      <Input
                        id="initialAmount"
                        type="number"
                        value={initialAmount}
                        onChange={(e) => setInitialAmount(e.target.value)}
                        placeholder="Enter initial amount"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="regularContribution">Regular Contribution ($)</Label>
                      <Input
                        id="regularContribution"
                        type="number"
                        value={regularContribution}
                        onChange={(e) => setRegularContribution(e.target.value)}
                        placeholder="Enter contribution amount"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentFrequency">Contribution Frequency</Label>
                      <Select value={investmentFrequency} onValueChange={setInvestmentFrequency}>
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          {INVESTMENT_FREQUENCIES.map((freq) => (
                            <SelectItem key={freq.value} value={freq.value}>
                              {freq.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Investment Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="annualReturn">Annual Return (%)</Label>
                      <Input
                        id="annualReturn"
                        type="number"
                        step="0.1"
                        value={annualReturn}
                        onChange={(e) => setAnnualReturn(e.target.value)}
                        placeholder="Enter expected return"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                      <Input
                        id="investmentPeriod"
                        type="number"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        placeholder="Enter investment period"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reinvestDividends">Reinvest Dividends</Label>
                      <Select value={reinvestDividends} onValueChange={setReinvestDividends}>
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateInvestment}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Investment
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
                  Investment Projection
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Future Investment Value</p>
                      <p className="text-3xl font-bold">
                        ${results.futureValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Contributions</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalContributions.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Interest Earned</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalInterest.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Yearly Breakdown</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Year</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Balance</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Contributions</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Interest</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {results.yearlyBreakdown.map((year) => (
                              <tr key={year.year} className="hover:bg-purple-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{year.year}</td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${year.balance.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${year.contributions.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${year.interest.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Results:</h3>
                  <ul className="space-y-2">
                    {[
                      'Future Value includes all contributions and compound interest',
                      'Calculations assume consistent returns and contributions',
                      'Regular contributions help accelerate wealth building',
                      'Compound interest grows exponentially over time'
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
                    'Diversify your investment portfolio to manage risk',
                    'Consider your risk tolerance and time horizon',
                    'Review and rebalance your investments regularly',
                    'Account for inflation in long-term planning',
                    'Maximize tax-advantaged investment accounts'
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