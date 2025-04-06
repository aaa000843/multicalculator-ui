"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: string;
  currentAmount: string;
  monthlyContribution: string;
  interestRate: string;
  targetDate: string;
}

interface SavingsResult {
  goalId: string;
  monthsToGoal: number;
  totalContributions: number;
  totalInterest: number;
  finalAmount: number;
  monthlyBreakdown: {
    month: number;
    balance: number;
    contributions: number;
    interest: number;
  }[];
}

export default function SavingsCalculator() {
  const [goals, setGoals] = useState<SavingsGoal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: '10000',
      currentAmount: '2000',
      monthlyContribution: '500',
      interestRate: '2',
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ]);
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{ [key: string]: SavingsResult }>({});

  const addGoal = () => {
    const newId = (Math.max(...goals.map(g => parseInt(g.id))) + 1).toString();
    setGoals([...goals, {
      id: newId,
      name: `Goal ${newId}`,
      targetAmount: '',
      currentAmount: '',
      monthlyContribution: '',
      interestRate: '',
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }]);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    const newResults = { ...results };
    delete newResults[id];
    setResults(newResults);
  };

  const updateGoal = (id: string, field: keyof SavingsGoal, value: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  const calculateSavings = () => {
    setError('');
    try {
      const newResults: { [key: string]: SavingsResult } = {};

      for (const goal of goals) {
        // Parse inputs
        const targetAmount = parseFloat(goal.targetAmount);
        const currentAmount = parseFloat(goal.currentAmount);
        const monthlyContribution = parseFloat(goal.monthlyContribution);
        const annualRate = parseFloat(goal.interestRate);
        const targetDate = new Date(goal.targetDate);
        const monthsToTarget = Math.ceil((targetDate.getTime() - Date.now()) / (30 * 24 * 60 * 60 * 1000));

        // Validation
        if ([targetAmount, currentAmount, monthlyContribution, annualRate].some(isNaN)) {
          throw new Error('Please enter valid numbers for all fields');
        }

        if (targetAmount <= 0 || currentAmount < 0 || monthlyContribution <= 0 || annualRate < 0) {
          throw new Error('Please enter valid positive numbers');
        }

        if (monthsToTarget <= 0) {
          throw new Error('Target date must be in the future');
        }

        // Calculate monthly interest rate
        const monthlyRate = annualRate / 100 / 12;

        // Calculate savings growth
        let balance = currentAmount;
        let totalContributions = currentAmount;
        let totalInterest = 0;
        const monthlyBreakdown = [];

        for (let month = 1; month <= monthsToTarget; month++) {
          const monthlyInterest = balance * monthlyRate;
          balance += monthlyContribution + monthlyInterest;
          totalContributions += monthlyContribution;
          totalInterest += monthlyInterest;

          monthlyBreakdown.push({
            month,
            balance,
            contributions: monthlyContribution,
            interest: monthlyInterest
          });

          if (balance >= targetAmount) {
            break;
          }
        }

        newResults[goal.id] = {
          goalId: goal.id,
          monthsToGoal: monthlyBreakdown.length,
          totalContributions,
          totalInterest,
          finalAmount: balance,
          monthlyBreakdown
        };
      }

      setResults(newResults);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setGoals([{
      id: '1',
      name: 'Emergency Fund',
      targetAmount: '10000',
      currentAmount: '2000',
      monthlyContribution: '500',
      interestRate: '2',
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }]);
    setResults({});
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Savings Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Plan and track your savings goals:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Set multiple savings goals',
                  'Track progress towards each goal',
                  'Calculate required monthly contributions',
                  'See the impact of interest rates'
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
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-indigo-600">Savings Goals</h3>
                    <Button
                      onClick={addGoal}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      Add Goal
                    </Button>
                  </div>
                  
                  {goals.map((goal) => (
                    <div key={goal.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Goal {goal.id}</h4>
                        <Button
                          onClick={() => removeGoal(goal.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`goal-name-${goal.id}`}>Goal Name</Label>
                          <Input
                            id={`goal-name-${goal.id}`}
                            value={goal.name}
                            onChange={(e) => updateGoal(goal.id, 'name', e.target.value)}
                            placeholder="Enter goal name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`target-amount-${goal.id}`}>Target Amount ($)</Label>
                          <Input
                            id={`target-amount-${goal.id}`}
                            type="number"
                            value={goal.targetAmount}
                            onChange={(e) => updateGoal(goal.id, 'targetAmount', e.target.value)}
                            placeholder="Enter target amount"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`current-amount-${goal.id}`}>Current Amount ($)</Label>
                          <Input
                            id={`current-amount-${goal.id}`}
                            type="number"
                            value={goal.currentAmount}
                            onChange={(e) => updateGoal(goal.id, 'currentAmount', e.target.value)}
                            placeholder="Enter current amount"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`monthly-contribution-${goal.id}`}>Monthly Contribution ($)</Label>
                          <Input
                            id={`monthly-contribution-${goal.id}`}
                            type="number"
                            value={goal.monthlyContribution}
                            onChange={(e) => updateGoal(goal.id, 'monthlyContribution', e.target.value)}
                            placeholder="Enter monthly contribution"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`interest-rate-${goal.id}`}>Annual Interest Rate (%)</Label>
                          <Input
                            id={`interest-rate-${goal.id}`}
                            type="number"
                            step="0.01"
                            value={goal.interestRate}
                            onChange={(e) => updateGoal(goal.id, 'interestRate', e.target.value)}
                            placeholder="Enter interest rate"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`target-date-${goal.id}`}>Target Date</Label>
                          <Input
                            id={`target-date-${goal.id}`}
                            type="date"
                            value={goal.targetDate}
                            onChange={(e) => updateGoal(goal.id, 'targetDate', e.target.value)}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateSavings}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Savings
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
            {goals.map((goal) => {
              const result = results[goal.id];
              if (!result) return null;

              return (
                <Card key={goal.id} className="bg-white/80 backdrop-blur-sm border-purple-100">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      {goal.name} Summary
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                        <p className="text-sm opacity-90 mb-1">Final Amount</p>
                        <p className="text-3xl font-bold">
                          ${result.finalAmount.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                        <p className="text-sm opacity-90 mt-2">
                          {result.monthsToGoal} months to reach goal
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-indigo-600 font-medium mb-1">Total Contributions</p>
                          <p className="text-lg font-bold text-indigo-600">
                            ${result.totalContributions.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-indigo-600 font-medium mb-1">Total Interest</p>
                          <p className="text-lg font-bold text-indigo-600">
                            ${result.totalInterest.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="font-semibold text-indigo-600 mb-4">Monthly Breakdown</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-purple-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Month</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Balance</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Contribution</th>
                                <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Interest</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-purple-100">
                              {result.monthlyBreakdown.map((month) => (
                                <tr key={month.month} className="hover:bg-purple-50">
                                  <td className="px-4 py-2 text-sm text-gray-600">{month.month}</td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${month.balance.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${month.contributions.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${month.interest.toLocaleString(undefined, {
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
                </Card>
              );
            })}

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h3 className="font-semibold text-indigo-600 mb-4">Savings Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Set specific and measurable savings goals',
                    'Automate your monthly contributions',
                    'Consider high-yield savings accounts',
                    'Review and adjust your goals regularly',
                    'Look for ways to increase your savings rate'
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