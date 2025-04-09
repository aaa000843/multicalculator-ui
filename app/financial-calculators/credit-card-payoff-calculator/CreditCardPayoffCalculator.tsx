"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface CreditCard {
  id: string;
  name: string;
  balance: string;
  interestRate: string;
  minimumPayment: string;
  minimumPaymentType: 'fixed' | 'percentage';
}

interface PayoffResult {
  totalPayoff: number;
  monthsToPayoff: number;
  totalInterest: number;
  monthlyPayment: number;
  payoffDate: Date;
  amortizationSchedule: {
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remainingBalance: number;
  }[];
}

const MINIMUM_PAYMENT_TYPES = [
  { label: 'Fixed Amount', value: 'fixed' },
  { label: 'Percentage of Balance', value: 'percentage' }
];

export default function CreditCardPayoffCalculator() {
  const [cards, setCards] = useState<CreditCard[]>([
    {
      id: '1',
      name: 'Credit Card 1',
      balance: '5000',
      interestRate: '18.99',
      minimumPayment: '100',
      minimumPaymentType: 'fixed'
    }
  ]);
  
  const [extraPayment, setExtraPayment] = useState<string>('0');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{ [key: string]: PayoffResult }>({});

  const addCard = () => {
    const newId = (Math.max(...cards.map(c => parseInt(c.id))) + 1).toString();
    setCards([...cards, {
      id: newId,
      name: `Credit Card ${newId}`,
      balance: '',
      interestRate: '',
      minimumPayment: '',
      minimumPaymentType: 'fixed'
    }]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
    const newResults = { ...results };
    delete newResults[id];
    setResults(newResults);
  };

  const updateCard = (id: string, field: keyof CreditCard, value: string | 'fixed' | 'percentage') => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const calculatePayoff = () => {
    setError('');
    try {
      const newResults: { [key: string]: PayoffResult } = {};
      const parsedExtraPayment = parseFloat(extraPayment) || 0;

      if (parsedExtraPayment < 0) {
        throw new Error('Extra payment cannot be negative');
      }

      for (const card of cards) {
        // Parse inputs
        const balance = parseFloat(card.balance);
        const annualRate = parseFloat(card.interestRate);
        const minimumPayment = parseFloat(card.minimumPayment);

        // Validation
        if ([balance, annualRate, minimumPayment].some(isNaN)) {
          throw new Error('Please enter valid numbers for all fields');
        }

        if (balance <= 0 || annualRate < 0 || minimumPayment <= 0) {
          throw new Error('Please enter valid positive numbers');
        }

        // Calculate monthly values
        const monthlyRate = annualRate / 100 / 12;
        let remainingBalance = balance;
        let month = 0;
        let totalInterest = 0;
        const amortizationSchedule = [];
        const extraPerCard = parsedExtraPayment / cards.length; // Distribute extra payment equally

        while (remainingBalance > 0 && month < 600) { // 50 years max to prevent infinite loops
          month++;
          const monthlyInterest = remainingBalance * monthlyRate;
          totalInterest += monthlyInterest;

          // Calculate minimum payment based on type
          let requiredPayment = card.minimumPaymentType === 'percentage' 
            ? Math.max(remainingBalance * (minimumPayment / 100), 25) // Minimum $25 payment
            : Math.min(minimumPayment, remainingBalance + monthlyInterest);

          const totalMonthlyPayment = Math.min(
            requiredPayment + extraPerCard,
            remainingBalance + monthlyInterest
          );

          const principalPayment = totalMonthlyPayment - monthlyInterest;
          remainingBalance -= principalPayment;

          amortizationSchedule.push({
            month,
            payment: totalMonthlyPayment,
            principal: principalPayment,
            interest: monthlyInterest,
            remainingBalance
          });
        }

        if (month >= 600) {
          throw new Error('Debt will take too long to pay off with current payments');
        }

        const payoffDate = new Date();
        payoffDate.setMonth(payoffDate.getMonth() + month);

        newResults[card.id] = {
          totalPayoff: balance + totalInterest,
          monthsToPayoff: month,
          totalInterest,
          monthlyPayment: amortizationSchedule[0].payment,
          payoffDate,
          amortizationSchedule
        };
      }

      setResults(newResults);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setCards([{
      id: '1',
      name: 'Credit Card 1',
      balance: '5000',
      interestRate: '18.99',
      minimumPayment: '100',
      minimumPaymentType: 'fixed'
    }]);
    setExtraPayment('0');
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
              Credit Card Payoff Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Plan your credit card debt payoff strategy:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Calculate payoff timeline for multiple cards',
                  'See the impact of extra payments',
                  'View complete amortization schedules',
                  'Compare different payment strategies'
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
                    <h3 className="font-semibold text-indigo-600">Credit Cards</h3>
                    <Button
                      onClick={addCard}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Card
                    </Button>
                  </div>
                  
                  {cards.map((card) => (
                    <div key={card.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Card {card.id}</h4>
                        <Button
                          onClick={() => removeCard(card.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`card-name-${card.id}`}>Card Name</Label>
                          <Input
                            id={`card-name-${card.id}`}
                            value={card.name}
                            onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                            placeholder="Enter card name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`card-balance-${card.id}`}>Current Balance ($)</Label>
                          <Input
                            id={`card-balance-${card.id}`}
                            type="number"
                            value={card.balance}
                            onChange={(e) => updateCard(card.id, 'balance', e.target.value)}
                            placeholder="Enter balance"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`card-rate-${card.id}`}>Interest Rate (%)</Label>
                          <Input
                            id={`card-rate-${card.id}`}
                            type="number"
                            step="0.01"
                            value={card.interestRate}
                            onChange={(e) => updateCard(card.id, 'interestRate', e.target.value)}
                            placeholder="Enter APR"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`minimum-payment-type-${card.id}`}>Minimum Payment Type</Label>
                          <select
                            id={`minimum-payment-type-${card.id}`}
                            value={card.minimumPaymentType}
                            onChange={(e) => updateCard(card.id, 'minimumPaymentType', e.target.value as 'fixed' | 'percentage')}
                            className="w-full rounded-md border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          >
                            {MINIMUM_PAYMENT_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`minimum-payment-${card.id}`}>
                            {card.minimumPaymentType === 'fixed' ? 'Minimum Payment ($)' : 'Minimum Payment (%)'}
                          </Label>
                          <Input
                            id={`minimum-payment-${card.id}`}
                            type="number"
                            step={card.minimumPaymentType === 'percentage' ? '0.01' : '1'}
                            value={card.minimumPayment}
                            onChange={(e) => updateCard(card.id, 'minimumPayment', e.target.value)}
                            placeholder={`Enter minimum ${card.minimumPaymentType === 'fixed' ? 'amount' : 'percentage'}`}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="extra-payment">Extra Monthly Payment ($)</Label>
                    <Input
                      id="extra-payment"
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      placeholder="Enter additional payment"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                    <p className="text-sm text-gray-500">
                      Additional amount to pay each month (distributed across all cards)
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculatePayoff}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Payoff
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
            {cards.map((card) => {
              const result = results[card.id];
              if (!result) return null;

              return (
                <Card key={card.id} className="bg-white/80 backdrop-blur-sm border-purple-100">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                      {card.name} Payoff Plan
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                        <p className="text-sm opacity-90 mb-1">Total Payoff Amount</p>
                        <p className="text-3xl font-bold">
                          ${result.totalPayoff.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                        <p className="text-sm opacity-90 mt-2">
                          {result.monthsToPayoff} months to debt-free
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-indigo-600 font-medium mb-1">Monthly Payment</p>
                          <p className="text-lg font-bold text-indigo-600">
                            ${result.monthlyPayment.toLocaleString(undefined, {
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
                        <h3 className="font-semibold text-indigo-600 mb-4">Payment Schedule</h3>
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                          <div className="min-w-[800px] px-4 sm:px-0">
                            <table className="min-w-full divide-y divide-purple-200">
                              <thead>
                                <tr>
                                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Month</th>
                                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Payment</th>
                                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Principal</th>
                                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Interest</th>
                                  <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Balance</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-purple-100">
                                {result.amortizationSchedule.map((month) => (
                                  <tr key={month.month} className="hover:bg-purple-50">
                                    <td className="px-4 py-2 text-sm text-gray-600">{month.month}</td>
                                    <td className="px-4 py-2 text-sm text-right text-gray-600">
                                      ${month.payment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-right text-gray-600">
                                      ${month.principal.toLocaleString(undefined, {
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
                                    <td className="px-4 py-2 text-sm text-right text-gray-600">
                                      ${month.remainingBalance.toLocaleString(undefined, {
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
                  </div>
                </Card>
              );
            })}

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h3 className="font-semibold text-indigo-600 mb-4">Debt Payoff Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Pay more than the minimum payment when possible',
                    'Consider debt consolidation for lower interest rates',
                    'Focus on high-interest cards first (Debt Avalanche)',
                    'Avoid new credit card charges while paying off debt',
                    'Create a realistic budget to maximize payments'
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