"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addDays, addWeeks, addMonths, addYears, isWeekend, differenceInDays, differenceInBusinessDays } from 'date-fns';

type DateUnit = 'days' | 'weeks' | 'months' | 'years';
type CalculationType = 'add' | 'subtract' | 'difference';

interface DateResult {
  resultDate?: Date;
  totalDays?: number;
  businessDays?: number;
  weekends?: number;
}

export default function DateCalculator() {
  const [activeTab, setActiveTab] = useState<CalculationType>('add');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [unit, setUnit] = useState<DateUnit>('days');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState<DateResult | null>(null);
  const [error, setError] = useState('');

  const addToDate = (date: Date, value: number, unit: DateUnit): Date => {
    switch (unit) {
      case 'days':
        return addDays(date, value);
      case 'weeks':
        return addWeeks(date, value);
      case 'months':
        return addMonths(date, value);
      case 'years':
        return addYears(date, value);
      default:
        return date;
    }
  };

  const calculateDateDifference = (start: Date, end: Date): DateResult => {
    const totalDays = differenceInDays(end, start);
    const businessDays = differenceInBusinessDays(end, start);
    const weekends = totalDays - businessDays;

    return {
      totalDays,
      businessDays,
      weekends
    };
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      if (activeTab === 'difference') {
        if (!startDate || !endDate) {
          throw new Error('Please enter both start and end dates');
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          throw new Error('Invalid date(s)');
        }

        setResult(calculateDateDifference(start, end));
      } else {
        if (!startDate || !amount) {
          throw new Error('Please enter both date and amount');
        }

        const start = new Date(startDate);
        const value = parseInt(amount);

        if (isNaN(start.getTime())) {
          throw new Error('Invalid date');
        }

        if (isNaN(value)) {
          throw new Error('Invalid amount');
        }

        const resultDate = activeTab === 'add'
          ? addToDate(start, value, unit)
          : addToDate(start, -value, unit);

        setResult({ resultDate });
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setAmount('');
    setUnit('days');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Date Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Add or subtract time from dates, or calculate the difference between dates.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(value) => {
                setActiveTab(value as CalculationType);
                handleReset();
              }}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="add">Add</TabsTrigger>
                  <TabsTrigger value="subtract">Subtract</TabsTrigger>
                  <TabsTrigger value="difference">Difference</TabsTrigger>
                </TabsList>

                <TabsContent value="add" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Amount</Label>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="0"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>

                      <div>
                        <Label>Unit</Label>
                        <Select value={unit} onValueChange={(value: DateUnit) => setUnit(value)}>
                          <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleCalculate}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                      >
                        Calculate
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="subtract" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Amount</Label>
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="0"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>

                      <div>
                        <Label>Unit</Label>
                        <Select value={unit} onValueChange={(value: DateUnit) => setUnit(value)}>
                          <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">Days</SelectItem>
                            <SelectItem value="weeks">Weeks</SelectItem>
                            <SelectItem value="months">Months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleCalculate}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                      >
                        Calculate
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="difference" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleCalculate}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                      >
                        Calculate
                      </Button>
                      <Button
                        onClick={handleReset}
                        variant="outline"
                        className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {result && (
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="text-xl font-semibold text-indigo-600">Result</h2>
                  {result.resultDate ? (
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Result Date</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.resultDate.toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Days</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.totalDays?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Business Days</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.businessDays?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Weekends</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.weekends?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 