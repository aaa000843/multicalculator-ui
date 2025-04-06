"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface CompoundFrequency {
  label: string;
  value: string;
  timesPerYear: number;
}

const COMPOUND_FREQUENCIES: CompoundFrequency[] = [
  { label: 'Daily', value: 'daily', timesPerYear: 365 },
  { label: 'Weekly', value: 'weekly', timesPerYear: 52 },
  { label: 'Monthly', value: 'monthly', timesPerYear: 12 },
  { label: 'Quarterly', value: 'quarterly', timesPerYear: 4 },
  { label: 'Half-Yearly', value: 'half-yearly', timesPerYear: 2 },
  { label: 'Yearly', value: 'yearly', timesPerYear: 1 }
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [timeYears, setTimeYears] = useState<string>('5');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('100');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('monthly');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{
    finalAmount: number;
    totalInterest: number;
    totalContributions: number;
    effectiveRate: number;
    compoundFrequencyLabel: string;
  } | null>(null);

  const calculateCompoundInterest = () => {
    setError('');
    try {
      const P = parseFloat(principal);
      const r = parseFloat(interestRate) / 100;
      const t = parseFloat(timeYears);
      const PMT = parseFloat(monthlyContribution);

      // Input validation
      if ([P, r, t, PMT].some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (P < 0) {
        throw new Error('Initial principal cannot be negative');
      }
      if (r <= 0 || r >= 100) {
        throw new Error('Interest rate must be between 0 and 100');
      }
      if (t <= 0 || t > 100) {
        throw new Error('Time period must be between 0 and 100 years');
      }
      if (PMT < 0) {
        throw new Error('Monthly contribution cannot be negative');
      }

      const frequency = COMPOUND_FREQUENCIES.find(f => f.value === compoundFrequency) || COMPOUND_FREQUENCIES[2];
      const n = frequency.timesPerYear;
      
      // Calculate compound interest with regular contributions
      const monthlyRate = r / 12;
      const totalMonths = t * 12;
      
      // Calculate future value of initial principal
      const principalFV = P * Math.pow(1 + r/n, n * t);
      
      // Calculate future value of regular contributions
      let contributionFV = 0;
      if (PMT > 0) {
        contributionFV = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      }
      
      const finalAmount = principalFV + contributionFV;
      const totalContributions = P + (PMT * totalMonths);
      const totalInterest = finalAmount - totalContributions;
      const effectiveRate = ((finalAmount / totalContributions) - 1) * 100;

      setResults({
        finalAmount: Number(finalAmount.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
        totalContributions: Number(totalContributions.toFixed(2)),
        effectiveRate: Number(effectiveRate.toFixed(2)),
        compoundFrequencyLabel: frequency.label.toLowerCase()
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setPrincipal('10000');
    setInterestRate('5');
    setTimeYears('5');
    setMonthlyContribution('100');
    setCompoundFrequency('monthly');
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
              Compound Interest Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate how your investments grow with compound interest and regular contributions. This calculator helps you:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Project investment growth over time',
                  'Compare different compound frequencies',
                  'See the impact of regular contributions',
                  'Understand the power of compound interest'
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="principal">Initial Principal ($)</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="Enter initial amount"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                    <Input
                      id="monthlyContribution"
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(e.target.value)}
                      placeholder="Enter monthly contribution"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Enter interest rate"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeYears">Time Period (Years)</Label>
                    <Input
                      id="timeYears"
                      type="number"
                      step="0.5"
                      value={timeYears}
                      onChange={(e) => setTimeYears(e.target.value)}
                      placeholder="Enter time period"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                  <Select
                    value={compoundFrequency}
                    onValueChange={setCompoundFrequency}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMPOUND_FREQUENCIES.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateCompoundInterest}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Growth
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
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Final Amount</p>
                      <p className="text-3xl font-bold">
                        ${results.finalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        Effective Annual Rate: {results.effectiveRate}%
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
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Compound Interest:</h3>
                  <ul className="space-y-2">
                    {[
                      'Interest is earned on both principal and previous interest',
                      'More frequent compounding increases returns',
                      'Regular contributions accelerate growth',
                      'Time is a crucial factor in compound growth'
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
                    'Start investing early to maximize compound growth',
                    'Make regular contributions to accelerate wealth building',
                    'Consider tax-advantaged accounts for better returns',
                    'Diversify investments to manage risk',
                    'Reinvest dividends to enhance compound effects'
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