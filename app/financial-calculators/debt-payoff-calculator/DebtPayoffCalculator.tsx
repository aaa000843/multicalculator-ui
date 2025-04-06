"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  balance: string;
  rate: string;
  minPayment: string;
}

interface PaymentPlan {
  totalPaid: number;
  totalInterest: number;
  months: number;
  payoffDate: Date;
  debtPayoff: {
    debtId: string;
    payoffMonth: number;
    totalPaid: number;
    totalInterest: number;
  }[];
}

const PAYMENT_STRATEGIES = [
  { label: 'Debt Avalanche (Highest Interest First)', value: 'avalanche' },
  { label: 'Debt Snowball (Lowest Balance First)', value: 'snowball' }
];

export default function DebtPayoffCalculator() {
  // Debts
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: '5000', rate: '18.99', minPayment: '150' },
    { id: '2', name: 'Personal Loan', balance: '10000', rate: '12.5', minPayment: '250' }
  ]);
  
  // Payment Strategy
  const [monthlyPayment, setMonthlyPayment] = useState<string>('500');
  const [strategy, setStrategy] = useState<string>('avalanche');
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<PaymentPlan | null>(null);

  const addDebt = () => {
    const newId = (Math.max(...debts.map(d => parseInt(d.id))) + 1).toString();
    setDebts([...debts, {
      id: newId,
      name: `Debt ${newId}`,
      balance: '',
      rate: '',
      minPayment: ''
    }]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculatePayoff = () => {
    setError('');
    try {
      // Parse inputs
      const payment = parseFloat(monthlyPayment);
      const parsedDebts = debts.map(debt => ({
        ...debt,
        balance: parseFloat(debt.balance),
        rate: parseFloat(debt.rate),
        minPayment: parseFloat(debt.minPayment)
      }));

      // Validation
      if (isNaN(payment) || payment <= 0) {
        throw new Error('Please enter a valid monthly payment amount');
      }

      if (parsedDebts.some(d => 
        isNaN(d.balance) || isNaN(d.rate) || isNaN(d.minPayment) ||
        d.balance <= 0 || d.rate < 0 || d.minPayment <= 0
      )) {
        throw new Error('Please enter valid numbers for all debts');
      }

      const totalMinPayment = parsedDebts.reduce((sum, debt) => sum + debt.minPayment, 0);
      if (payment < totalMinPayment) {
        throw new Error(`Monthly payment must be at least $${totalMinPayment} to cover minimum payments`);
      }

      // Sort debts based on strategy
      const sortedDebts = [...parsedDebts].sort((a, b) => {
        if (strategy === 'avalanche') {
          return b.rate - a.rate;
        } else {
          return a.balance - b.balance;
        }
      });

      // Calculate payoff plan
      let remainingDebts = sortedDebts.map(d => ({
        ...d,
        paid: 0,
        interest: 0,
        payoffMonth: 0
      }));
      let month = 0;
      let totalPaid = 0;
      let totalInterest = 0;
      const debtPayoff = [];

      while (remainingDebts.length > 0) {
        month++;
        let remainingPayment = payment;

        // Pay minimum on all debts
        remainingDebts = remainingDebts.map(debt => {
          const monthlyRate = debt.rate / 100 / 12;
          const interest = debt.balance * monthlyRate;
          const minPayment = Math.min(debt.minPayment, debt.balance + interest);
          
          remainingPayment -= minPayment;
          totalPaid += minPayment;
          totalInterest += interest;

          return {
            ...debt,
            balance: debt.balance + interest - minPayment,
            paid: debt.paid + minPayment,
            interest: debt.interest + interest
          };
        });

        // Apply remaining payment to highest priority debt
        if (remainingPayment > 0 && remainingDebts.length > 0) {
          const targetDebt = remainingDebts[0];
          const extraPayment = Math.min(remainingPayment, targetDebt.balance);
          
          remainingDebts[0] = {
            ...targetDebt,
            balance: targetDebt.balance - extraPayment,
            paid: targetDebt.paid + extraPayment
          };
          
          totalPaid += extraPayment;
        }

        // Check for paid off debts
        const newPayoffs = remainingDebts.filter(d => d.balance <= 0.01);
        if (newPayoffs.length > 0) {
          debtPayoff.push(...newPayoffs.map(d => ({
            debtId: d.id,
            payoffMonth: month,
            totalPaid: d.paid,
            totalInterest: d.interest
          })));
        }
        
        remainingDebts = remainingDebts.filter(d => d.balance > 0.01);
      }

      setResults({
        totalPaid,
        totalInterest,
        months: month,
        payoffDate: new Date(Date.now() + month * 30 * 24 * 60 * 60 * 1000),
        debtPayoff
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setDebts([
      { id: '1', name: 'Credit Card 1', balance: '5000', rate: '18.99', minPayment: '150' },
      { id: '2', name: 'Personal Loan', balance: '10000', rate: '12.5', minPayment: '250' }
    ]);
    setMonthlyPayment('500');
    setStrategy('avalanche');
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
              Debt Payoff Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Create your personalized debt payoff plan:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Compare different debt payoff strategies',
                  'See your debt-free date',
                  'Track interest savings',
                  'Optimize your monthly payments'
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
                    <h3 className="font-semibold text-indigo-600">Your Debts</h3>
                    <Button
                      onClick={addDebt}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Debt
                    </Button>
                  </div>
                  
                  {debts.map((debt) => (
                    <div key={debt.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Debt {debt.id}</h4>
                        <Button
                          onClick={() => removeDebt(debt.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`name-${debt.id}`}>Debt Name</Label>
                          <Input
                            id={`name-${debt.id}`}
                            value={debt.name}
                            onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                            placeholder="Enter debt name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`balance-${debt.id}`}>Current Balance ($)</Label>
                          <Input
                            id={`balance-${debt.id}`}
                            type="number"
                            value={debt.balance}
                            onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                            placeholder="Enter balance"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`rate-${debt.id}`}>Interest Rate (%)</Label>
                          <Input
                            id={`rate-${debt.id}`}
                            type="number"
                            step="0.01"
                            value={debt.rate}
                            onChange={(e) => updateDebt(debt.id, 'rate', e.target.value)}
                            placeholder="Enter interest rate"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`minPayment-${debt.id}`}>Minimum Payment ($)</Label>
                          <Input
                            id={`minPayment-${debt.id}`}
                            type="number"
                            value={debt.minPayment}
                            onChange={(e) => updateDebt(debt.id, 'minPayment', e.target.value)}
                            placeholder="Enter minimum payment"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-indigo-600">Payment Strategy</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="monthlyPayment">Total Monthly Payment ($)</Label>
                      <Input
                        id="monthlyPayment"
                        type="number"
                        value={monthlyPayment}
                        onChange={(e) => setMonthlyPayment(e.target.value)}
                        placeholder="Enter monthly payment"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="strategy">Payoff Strategy</Label>
                      <Select value={strategy} onValueChange={setStrategy}>
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_STRATEGIES.map((s) => (
                            <SelectItem key={s.value} value={s.value}>
                              {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculatePayoff}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Payoff Plan
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
                  Payoff Summary
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Debt-Free Date</p>
                      <p className="text-3xl font-bold">
                        {results.payoffDate.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        {results.months} months to debt freedom
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Amount Paid</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalPaid.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Interest Paid</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalInterest.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Debt Payoff Timeline</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Debt</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Payoff Date</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Total Paid</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Interest Paid</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {results.debtPayoff.map((debt) => {
                              const debtInfo = debts.find(d => d.id === debt.debtId);
                              const payoffDate = new Date(Date.now() + debt.payoffMonth * 30 * 24 * 60 * 60 * 1000);
                              
                              return (
                                <tr key={debt.debtId} className="hover:bg-purple-50">
                                  <td className="px-4 py-2 text-sm text-gray-600">
                                    {debtInfo?.name}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    {payoffDate.toLocaleDateString('en-US', {
                                      month: 'long',
                                      year: 'numeric'
                                    })}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${debt.totalPaid.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                  <td className="px-4 py-2 text-sm text-right text-gray-600">
                                    ${debt.totalInterest.toLocaleString(undefined, {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2
                                    })}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Plan:</h3>
                  <ul className="space-y-2">
                    {[
                      'Debt Avalanche prioritizes highest interest rates first',
                      'Debt Snowball prioritizes lowest balances first',
                      'Extra payments are applied to the priority debt',
                      'Interest is calculated monthly on remaining balances'
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
                <h3 className="font-semibold text-indigo-600 mb-4">Debt Payoff Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Stop taking on new debt while paying off existing debt',
                    'Consider balance transfer options for high-interest debt',
                    'Build an emergency fund to avoid new debt',
                    'Look for ways to increase your income',
                    'Track your progress and celebrate milestones'
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