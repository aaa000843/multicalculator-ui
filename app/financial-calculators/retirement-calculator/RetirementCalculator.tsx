"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface RetirementScenario {
  monthlyIncome: number;
  totalSavings: number;
  additionalNeeded: number;
  monthlySavingsNeeded: number;
  yearsToRetirement: number;
  retirementAge: number;
}

export default function RetirementCalculator() {
  // Current Status
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [currentSavings, setCurrentSavings] = useState<string>('50000');
  const [monthlySavings, setMonthlySavings] = useState<string>('500');
  const [currentIncome, setCurrentIncome] = useState<string>('60000');
  
  // Retirement Goals
  const [retirementAge, setRetirementAge] = useState<string>('65');
  const [desiredIncome, setDesiredIncome] = useState<string>('48000');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('85');
  
  // Investment Assumptions
  const [preReturnRate, setPreReturnRate] = useState<string>('7');
  const [postReturnRate, setPostReturnRate] = useState<string>('5');
  const [inflationRate, setInflationRate] = useState<string>('2.5');
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<RetirementScenario | null>(null);

  const calculateRetirement = () => {
    setError('');
    try {
      // Parse inputs
      const age = parseFloat(currentAge);
      const savings = parseFloat(currentSavings);
      const monthly = parseFloat(monthlySavings);
      const income = parseFloat(currentIncome);
      const targetAge = parseFloat(retirementAge);
      const targetIncome = parseFloat(desiredIncome);
      const lifeSpan = parseFloat(lifeExpectancy);
      const preReturn = parseFloat(preReturnRate) / 100;
      const postReturn = parseFloat(postReturnRate) / 100;
      const inflation = parseFloat(inflationRate) / 100;

      // Validation
      if ([age, savings, monthly, income, targetAge, targetIncome, lifeSpan, preReturn, postReturn, inflation].some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (age < 18 || age > 100) {
        throw new Error('Current age must be between 18 and 100');
      }
      if (targetAge <= age) {
        throw new Error('Retirement age must be greater than current age');
      }
      if (lifeSpan <= targetAge) {
        throw new Error('Life expectancy must be greater than retirement age');
      }
      if (savings < 0 || monthly < 0 || income < 0 || targetIncome < 0) {
        throw new Error('Financial values cannot be negative');
      }

      // Calculate years until and during retirement
      const yearsToRetirement = targetAge - age;
      const yearsInRetirement = lifeSpan - targetAge;

      // Calculate future value of current savings and monthly contributions
      const monthlyRate = preReturn / 12;
      const totalMonths = yearsToRetirement * 12;
      
      // Future value of current savings
      const futureSavings = savings * Math.pow(1 + preReturn, yearsToRetirement);
      
      // Future value of monthly contributions
      const futureContributions = monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
      
      // Total savings at retirement
      const totalSavings = futureSavings + futureContributions;

      // Calculate required retirement savings
      const inflatedIncome = targetIncome * Math.pow(1 + inflation, yearsToRetirement);
      const withdrawalRate = 0.04; // 4% rule
      const requiredSavings = inflatedIncome / withdrawalRate;
      
      // Calculate additional savings needed
      const additionalNeeded = Math.max(0, requiredSavings - totalSavings);
      
      // Calculate required monthly savings to meet goal
      const requiredMonthlyRate = preReturn / 12;
      const monthlySavingsNeeded = additionalNeeded > 0 
        ? (additionalNeeded * requiredMonthlyRate) / (Math.pow(1 + requiredMonthlyRate, totalMonths) - 1)
        : 0;

      // Calculate expected monthly retirement income
      const monthlyIncome = (totalSavings * withdrawalRate) / 12;

      setResults({
        monthlyIncome: Number(monthlyIncome.toFixed(2)),
        totalSavings: Number(totalSavings.toFixed(2)),
        additionalNeeded: Number(additionalNeeded.toFixed(2)),
        monthlySavingsNeeded: Number(monthlySavingsNeeded.toFixed(2)),
        yearsToRetirement,
        retirementAge: targetAge
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setCurrentAge('30');
    setCurrentSavings('50000');
    setMonthlySavings('500');
    setCurrentIncome('60000');
    setRetirementAge('65');
    setDesiredIncome('48000');
    setLifeExpectancy('85');
    setPreReturnRate('7');
    setPostReturnRate('5');
    setInflationRate('2.5');
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
              Retirement Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Plan your retirement with confidence. This calculator helps you:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Estimate required retirement savings',
                  'Calculate monthly savings needed',
                  'Project retirement income',
                  'Account for inflation and returns'
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
                  <h3 className="font-semibold text-indigo-600">Current Status</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="currentAge">Current Age</Label>
                      <Input
                        id="currentAge"
                        type="number"
                        value={currentAge}
                        onChange={(e) => setCurrentAge(e.target.value)}
                        placeholder="Enter your age"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentSavings">Current Savings ($)</Label>
                      <Input
                        id="currentSavings"
                        type="number"
                        value={currentSavings}
                        onChange={(e) => setCurrentSavings(e.target.value)}
                        placeholder="Enter current savings"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlySavings">Monthly Savings ($)</Label>
                      <Input
                        id="monthlySavings"
                        type="number"
                        value={monthlySavings}
                        onChange={(e) => setMonthlySavings(e.target.value)}
                        placeholder="Enter monthly savings"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentIncome">Current Annual Income ($)</Label>
                      <Input
                        id="currentIncome"
                        type="number"
                        value={currentIncome}
                        onChange={(e) => setCurrentIncome(e.target.value)}
                        placeholder="Enter current income"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Retirement Goals</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="retirementAge">Retirement Age</Label>
                      <Input
                        id="retirementAge"
                        type="number"
                        value={retirementAge}
                        onChange={(e) => setRetirementAge(e.target.value)}
                        placeholder="Enter retirement age"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="desiredIncome">Desired Annual Income ($)</Label>
                      <Input
                        id="desiredIncome"
                        type="number"
                        value={desiredIncome}
                        onChange={(e) => setDesiredIncome(e.target.value)}
                        placeholder="Enter desired income"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lifeExpectancy">Life Expectancy</Label>
                      <Input
                        id="lifeExpectancy"
                        type="number"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        placeholder="Enter life expectancy"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Investment Assumptions</h3>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="preReturnRate">Pre-Retirement Return (%)</Label>
                      <Input
                        id="preReturnRate"
                        type="number"
                        step="0.1"
                        value={preReturnRate}
                        onChange={(e) => setPreReturnRate(e.target.value)}
                        placeholder="Enter return rate"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postReturnRate">Post-Retirement Return (%)</Label>
                      <Input
                        id="postReturnRate"
                        type="number"
                        step="0.1"
                        value={postReturnRate}
                        onChange={(e) => setPostReturnRate(e.target.value)}
                        placeholder="Enter return rate"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                      <Input
                        id="inflationRate"
                        type="number"
                        step="0.1"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(e.target.value)}
                        placeholder="Enter inflation rate"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateRetirement}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Retirement
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
                  Retirement Projection
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Expected Monthly Income</p>
                      <p className="text-3xl font-bold">
                        ${results.monthlyIncome.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        At age {results.retirementAge} ({results.yearsToRetirement} years to retirement)
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Projected Savings</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalSavings.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Additional Savings Needed</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.additionalNeeded.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    {results.additionalNeeded > 0 && (
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium mb-1">Required Additional Monthly Savings</p>
                        <p className="text-lg font-bold text-amber-800">
                          ${results.monthlySavingsNeeded.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Results:</h3>
                  <ul className="space-y-2">
                    {[
                      'Based on the 4% withdrawal rule for retirement',
                      'Accounts for inflation impact on future expenses',
                      'Considers different pre and post-retirement returns',
                      'Projects savings needed for your desired lifestyle'
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
                <h3 className="font-semibold text-indigo-600 mb-4">Retirement Planning Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Start saving early to benefit from compound growth',
                    'Diversify investments across different asset classes',
                    'Consider tax-advantaged retirement accounts',
                    'Review and adjust your plan regularly',
                    'Account for healthcare costs in retirement'
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