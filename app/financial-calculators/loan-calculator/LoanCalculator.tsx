"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface PaymentFrequency {
  label: string;
  value: string;
  paymentsPerYear: number;
}

const PAYMENT_FREQUENCIES: PaymentFrequency[] = [
  { label: 'Weekly', value: 'weekly', paymentsPerYear: 52 },
  { label: 'Monthly', value: 'monthly', paymentsPerYear: 12 },
  { label: 'Quarterly', value: 'quarterly', paymentsPerYear: 4 },
  { label: 'Half-Yearly', value: 'half-yearly', paymentsPerYear: 2 },
  { label: 'Yearly', value: 'yearly', paymentsPerYear: 1 }
];

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('10000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [loanTerm, setLoanTerm] = useState<string>('3');
  const [paymentFrequency, setPaymentFrequency] = useState<string>('monthly');
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<{
    payment: number;
    totalInterest: number;
    totalPayments: number;
    numberOfPayments: number;
    paymentFrequencyLabel: string;
  } | null>(null);

  const calculateLoan = () => {
    setError('');
    try {
      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate);
      const term = parseFloat(loanTerm);

      // Input validation
      if ([principal, rate, term].some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (principal <= 0) {
        throw new Error('Loan amount must be greater than zero');
      }
      if (rate <= 0 || rate >= 100) {
        throw new Error('Interest rate must be between 0 and 100');
      }
      if (term <= 0 || term > 50) {
        throw new Error('Loan term must be between 0 and 50 years');
      }

      const frequency = PAYMENT_FREQUENCIES.find(f => f.value === paymentFrequency) || PAYMENT_FREQUENCIES[1]; // Default to monthly
      const paymentsPerYear = frequency.paymentsPerYear;
      const totalPayments = Math.floor(term * paymentsPerYear); // Ensure whole number of payments
      
      const periodicRate = (rate / 100) / paymentsPerYear;
      
      let payment;
      if (rate === 0) {
        payment = principal / totalPayments;
      } else {
        const factor = Math.pow(1 + periodicRate, totalPayments);
        payment = (principal * periodicRate * factor) / (factor - 1);
      }
      
      const totalAmount = payment * totalPayments;
      const totalInterest = Math.max(0, totalAmount - principal);

      setResults({
        payment: Number(payment.toFixed(2)),
        totalInterest: Number(totalInterest.toFixed(2)),
        totalPayments: Number(totalAmount.toFixed(2)),
        numberOfPayments: totalPayments,
        paymentFrequencyLabel: frequency.label.toLowerCase()
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setLoanAmount('10000');
    setInterestRate('5');
    setLoanTerm('3');
    setPaymentFrequency('monthly');
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
              Loan Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your loan payments with flexible payment schedules. This calculator helps you:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Plan personal and business loans',
                  'Compare different payment frequencies',
                  'Understand total interest costs',
                  'Make informed borrowing decisions'
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
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="Enter loan amount"
                    className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  />
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
                    <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      step="0.5"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="Enter loan term"
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                  <Select
                    value={paymentFrequency}
                    onValueChange={setPaymentFrequency}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYMENT_FREQUENCIES.map((freq) => (
                        <SelectItem key={freq.value} value={freq.value}>
                          {freq.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateLoan}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Loan
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
                      <p className="text-sm opacity-90 mb-1">
                        {results.paymentFrequencyLabel.charAt(0).toUpperCase() + results.paymentFrequencyLabel.slice(1)} Payment
                      </p>
                      <p className="text-3xl font-bold">
                        ${results.payment.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        Total payments: {results.numberOfPayments}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Interest</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalInterest.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Amount</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalPayments.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Loan:</h3>
                  <ul className="space-y-2">
                    {[
                      'Regular payments include principal and interest',
                      'More frequent payments can reduce total interest',
                      'Early payments can shorten loan term',
                      'Interest rates affect total cost significantly'
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
                <h3 className="font-semibold text-indigo-600 mb-4">Payment Frequency Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Choose a frequency that matches your income schedule',
                    'More frequent payments can save on interest',
                    'Consider automatic payments to stay on track',
                    'Review terms for any prepayment penalties',
                    'Maintain good credit for better rates'
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