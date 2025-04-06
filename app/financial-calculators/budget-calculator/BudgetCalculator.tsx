"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Income {
  id: string;
  name: string;
  amount: string;
  frequency: string;
}

interface Expense {
  id: string;
  name: string;
  amount: string;
  category: string;
}

interface BudgetResult {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;
  expensesByCategory: {
    [key: string]: number;
  };
  expensePercentages: {
    [key: string]: number;
  };
}

const INCOME_FREQUENCIES = [
  { label: 'Monthly', value: 'monthly', multiplier: 1 },
  { label: 'Bi-Weekly', value: 'biweekly', multiplier: 26/12 },
  { label: 'Weekly', value: 'weekly', multiplier: 52/12 },
  { label: 'Annually', value: 'annual', multiplier: 1/12 }
];

const EXPENSE_CATEGORIES = [
  'Housing',
  'Transportation',
  'Food & Dining',
  'Utilities',
  'Insurance',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Savings & Investments',
  'Debt Payments',
  'Other'
];

export default function BudgetCalculator() {
  // Income Sources
  const [incomes, setIncomes] = useState<Income[]>([
    { id: '1', name: 'Primary Job', amount: '5000', frequency: 'monthly' },
    { id: '2', name: 'Side Hustle', amount: '1000', frequency: 'monthly' }
  ]);
  
  // Expenses
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Rent', amount: '1500', category: 'Housing' },
    { id: '2', name: 'Car Payment', amount: '400', category: 'Transportation' }
  ]);
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<BudgetResult | null>(null);

  const addIncome = () => {
    const newId = (Math.max(...incomes.map(i => parseInt(i.id))) + 1).toString();
    setIncomes([...incomes, {
      id: newId,
      name: `Income ${newId}`,
      amount: '',
      frequency: 'monthly'
    }]);
  };

  const removeIncome = (id: string) => {
    setIncomes(incomes.filter(i => i.id !== id));
  };

  const updateIncome = (id: string, field: keyof Income, value: string) => {
    setIncomes(incomes.map(income => 
      income.id === id ? { ...income, [field]: value } : income
    ));
  };

  const addExpense = () => {
    const newId = (Math.max(...expenses.map(e => parseInt(e.id))) + 1).toString();
    setExpenses([...expenses, {
      id: newId,
      name: `Expense ${newId}`,
      amount: '',
      category: EXPENSE_CATEGORIES[0]
    }]);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id: string, field: keyof Expense, value: string) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  const calculateBudget = () => {
    setError('');
    try {
      // Parse and validate incomes
      const parsedIncomes = incomes.map(income => ({
        ...income,
        amount: parseFloat(income.amount)
      }));

      if (parsedIncomes.some(i => isNaN(i.amount) || i.amount < 0)) {
        throw new Error('Please enter valid positive numbers for all income amounts');
      }

      // Parse and validate expenses
      const parsedExpenses = expenses.map(expense => ({
        ...expense,
        amount: parseFloat(expense.amount)
      }));

      if (parsedExpenses.some(e => isNaN(e.amount) || e.amount < 0)) {
        throw new Error('Please enter valid positive numbers for all expense amounts');
      }

      // Calculate monthly income
      const monthlyIncome = parsedIncomes.reduce((sum, income) => {
        const frequency = INCOME_FREQUENCIES.find(f => f.value === income.frequency);
        return sum + (income.amount * (frequency?.multiplier || 1));
      }, 0);

      // Calculate expenses by category
      const expensesByCategory = parsedExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as { [key: string]: number });

      // Calculate monthly expenses
      const monthlyExpenses = parsedExpenses.reduce((sum, expense) => sum + expense.amount, 0);

      // Calculate monthly savings
      const monthlySavings = monthlyIncome - monthlyExpenses;
      const savingsRate = (monthlySavings / monthlyIncome) * 100;

      // Calculate expense percentages
      const expensePercentages = Object.entries(expensesByCategory).reduce((acc, [category, amount]) => {
        acc[category] = (amount / monthlyExpenses) * 100;
        return acc;
      }, {} as { [key: string]: number });

      setResults({
        monthlyIncome,
        monthlyExpenses,
        monthlySavings,
        savingsRate,
        expensesByCategory,
        expensePercentages
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setIncomes([
      { id: '1', name: 'Primary Job', amount: '5000', frequency: 'monthly' },
      { id: '2', name: 'Side Hustle', amount: '1000', frequency: 'monthly' }
    ]);
    setExpenses([
      { id: '1', name: 'Rent', amount: '1500', category: 'Housing' },
      { id: '2', name: 'Car Payment', amount: '400', category: 'Transportation' }
    ]);
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
              Budget Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Create your personalized monthly budget:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Track all sources of income',
                  'Categorize your expenses',
                  'Calculate your savings rate',
                  'Analyze spending patterns'
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
                    <h3 className="font-semibold text-indigo-600">Income Sources</h3>
                    <Button
                      onClick={addIncome}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Income
                    </Button>
                  </div>
                  
                  {incomes.map((income) => (
                    <div key={income.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Income {income.id}</h4>
                        <Button
                          onClick={() => removeIncome(income.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`income-name-${income.id}`}>Income Source</Label>
                          <Input
                            id={`income-name-${income.id}`}
                            value={income.name}
                            onChange={(e) => updateIncome(income.id, 'name', e.target.value)}
                            placeholder="Enter income source"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`income-amount-${income.id}`}>Amount ($)</Label>
                          <Input
                            id={`income-amount-${income.id}`}
                            type="number"
                            value={income.amount}
                            onChange={(e) => updateIncome(income.id, 'amount', e.target.value)}
                            placeholder="Enter amount"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`income-frequency-${income.id}`}>Frequency</Label>
                          <select
                            id={`income-frequency-${income.id}`}
                            value={income.frequency}
                            onChange={(e) => updateIncome(income.id, 'frequency', e.target.value)}
                            className="w-full rounded-md border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          >
                            {INCOME_FREQUENCIES.map((freq) => (
                              <option key={freq.value} value={freq.value}>
                                {freq.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-indigo-600">Monthly Expenses</h3>
                    <Button
                      onClick={addExpense}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
                  
                  {expenses.map((expense) => (
                    <div key={expense.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Expense {expense.id}</h4>
                        <Button
                          onClick={() => removeExpense(expense.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`expense-name-${expense.id}`}>Expense Name</Label>
                          <Input
                            id={`expense-name-${expense.id}`}
                            value={expense.name}
                            onChange={(e) => updateExpense(expense.id, 'name', e.target.value)}
                            placeholder="Enter expense name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`expense-amount-${expense.id}`}>Amount ($)</Label>
                          <Input
                            id={`expense-amount-${expense.id}`}
                            type="number"
                            value={expense.amount}
                            onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                            placeholder="Enter amount"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`expense-category-${expense.id}`}>Category</Label>
                          <select
                            id={`expense-category-${expense.id}`}
                            value={expense.category}
                            onChange={(e) => updateExpense(expense.id, 'category', e.target.value)}
                            className="w-full rounded-md border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          >
                            {EXPENSE_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateBudget}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Budget
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
                  Budget Summary
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Monthly Savings</p>
                      <p className="text-3xl font-bold">
                        ${results.monthlySavings.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        Savings Rate: {results.savingsRate.toFixed(1)}%
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Monthly Income</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.monthlyIncome.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Monthly Expenses</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.monthlyExpenses.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Expenses by Category</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">% of Expenses</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {Object.entries(results.expensesByCategory).map(([category, amount]) => (
                              <tr key={category} className="hover:bg-purple-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{category}</td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  {results.expensePercentages[category].toFixed(1)}%
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
                  <h3 className="font-semibold text-indigo-600">Understanding Your Budget:</h3>
                  <ul className="space-y-2">
                    {[
                      'Monthly savings = Income - Expenses',
                      'Savings rate shows percentage of income saved',
                      'Aim to keep essential expenses under 50% of income',
                      'Consider the 50/30/20 budgeting rule'
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
                <h3 className="font-semibold text-indigo-600 mb-4">Budgeting Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Track your spending for better awareness',
                    'Set realistic savings goals',
                    'Build an emergency fund',
                    'Review and adjust your budget regularly',
                    'Look for ways to reduce unnecessary expenses'
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