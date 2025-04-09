"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  takeHomePay: number;
  deductions: number;
  brackets: {
    bracket: TaxBracket;
    taxAmount: number;
  }[];
}

// 2023 US Tax Brackets (Single Filer)
const TAX_BRACKETS: TaxBracket[] = [
  { min: 0, max: 11000, rate: 10 },
  { min: 11000, max: 44725, rate: 12 },
  { min: 44725, max: 95375, rate: 22 },
  { min: 95375, max: 182100, rate: 24 },
  { min: 182100, max: 231250, rate: 32 },
  { min: 231250, max: 578125, rate: 35 },
  { min: 578125, max: null, rate: 37 }
];

const FILING_STATUSES = [
  { label: 'Single', value: 'single', multiplier: 1 },
  { label: 'Married Filing Jointly', value: 'married', multiplier: 2 },
  { label: 'Head of Household', value: 'hoh', multiplier: 1.5 }
];

export default function IncomeTaxCalculator() {
  // Income Details
  const [annualIncome, setAnnualIncome] = useState<string>('60000');
  const [filingStatus, setFilingStatus] = useState<string>('single');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  
  // Deductions
  const [standardDeduction, setStandardDeduction] = useState<string>('13850');
  const [itemizedDeductions, setItemizedDeductions] = useState<string>('0');
  const [useItemized, setUseItemized] = useState<string>('no');
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<TaxResult | null>(null);

  const calculateTax = () => {
    setError('');
    try {
      // Parse inputs
      const income = parseFloat(annualIncome);
      const other = parseFloat(otherIncome);
      const standard = parseFloat(standardDeduction);
      const itemized = parseFloat(itemizedDeductions);
      
      // Validation
      if ([income, other, standard, itemized].some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (income < 0 || other < 0 || standard < 0 || itemized < 0) {
        throw new Error('Values cannot be negative');
      }

      // Calculate gross and taxable income
      const grossIncome = income + other;
      const deductions = useItemized === 'yes' ? itemized : standard;
      const taxableIncome = Math.max(0, grossIncome - deductions);
      
      let totalTax = 0;
      const bracketTaxes = [];

      // Calculate tax for each bracket
      for (let i = 0; i < TAX_BRACKETS.length; i++) {
        const bracket = TAX_BRACKETS[i];
        const nextBracket = TAX_BRACKETS[i + 1];
        
        if (taxableIncome > bracket.min) {
          const bracketMax = bracket.max ?? Infinity;
          const incomeInBracket = Math.min(
            taxableIncome - bracket.min,
            (bracket.max ?? taxableIncome) - bracket.min
          );
          
          const taxForBracket = (incomeInBracket * bracket.rate) / 100;
          totalTax += taxForBracket;
          
          bracketTaxes.push({
            bracket,
            taxAmount: taxForBracket
          });
        }
      }

      setResults({
        grossIncome,
        taxableIncome,
        totalTax,
        effectiveRate: (totalTax / grossIncome) * 100,
        takeHomePay: grossIncome - totalTax,
        deductions,
        brackets: bracketTaxes
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setAnnualIncome('60000');
    setFilingStatus('single');
    setOtherIncome('0');
    setStandardDeduction('13850');
    setItemizedDeductions('0');
    setUseItemized('no');
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
              Income Tax Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Estimate your income tax liability and take-home pay:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Calculate taxes across different brackets',
                  'Compare standard vs. itemized deductions',
                  'See your effective tax rate',
                  'Plan your tax strategy'
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
                  <h3 className="font-semibold text-indigo-600">Income Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="annualIncome">Annual Income ($)</Label>
                      <Input
                        id="annualIncome"
                        type="number"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        placeholder="Enter annual income"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="filingStatus">Filing Status</Label>
                      <Select value={filingStatus} onValueChange={setFilingStatus}>
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {FILING_STATUSES.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherIncome">Other Income ($)</Label>
                      <Input
                        id="otherIncome"
                        type="number"
                        value={otherIncome}
                        onChange={(e) => setOtherIncome(e.target.value)}
                        placeholder="Enter other income"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Deductions</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="standardDeduction">Standard Deduction ($)</Label>
                      <Input
                        id="standardDeduction"
                        type="number"
                        value={standardDeduction}
                        onChange={(e) => setStandardDeduction(e.target.value)}
                        placeholder="Enter standard deduction"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="itemizedDeductions">Itemized Deductions ($)</Label>
                      <Input
                        id="itemizedDeductions"
                        type="number"
                        value={itemizedDeductions}
                        onChange={(e) => setItemizedDeductions(e.target.value)}
                        placeholder="Enter itemized deductions"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="useItemized">Use Itemized Deductions</Label>
                      <Select value={useItemized} onValueChange={setUseItemized}>
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
                    onClick={calculateTax}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Tax
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
                  Tax Summary
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Total Tax</p>
                      <p className="text-3xl font-bold">
                        ${results.totalTax.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        Effective Tax Rate: {results.effectiveRate.toFixed(2)}%
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Take-Home Pay</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.takeHomePay.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Deductions</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.deductions.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Tax Bracket Breakdown</h3>
                      <div className="overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-[600px] px-4 sm:px-0">
                          <table className="min-w-full divide-y divide-purple-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Tax Bracket</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Rate</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Tax Amount</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-100">
                              {results.brackets.map((item, index) => (
                                <tr key={index} className="hover:bg-purple-50">
                                  <td className="px-4 py-2 text-sm text-gray-600">
                                    ${item.bracket.min.toLocaleString()} - {item.bracket.max ? `$${item.bracket.max.toLocaleString()}` : 'and up'}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    {item.bracket.rate}%
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${item.taxAmount.toLocaleString(undefined, {
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
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Results:</h3>
                  <ul className="space-y-2">
                    {[
                      'Tax brackets are progressive - higher rates only apply to income in that bracket',
                      'Effective tax rate is your total tax divided by gross income',
                      'Deductions reduce your taxable income before tax calculation',
                      'Take-home pay is your gross income minus total tax'
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
                <h3 className="font-semibold text-indigo-600 mb-4">Tax Planning Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Consider maximizing tax-advantaged retirement accounts',
                    'Keep records of all potential deductions throughout the year',
                    'Review your withholding to avoid surprises',
                    'Consider bunching itemized deductions in alternate years',
                    'Consult a tax professional for complex situations'
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