"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  totalMonths: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
}

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  const calculateAge = (from: Date, to: Date): AgeResult => {
    const years = differenceInYears(to, from);
    const months = differenceInMonths(to, from) % 12;
    const days = differenceInDays(to, from) % 30;
    const hours = differenceInHours(to, from) % 24;
    const minutes = differenceInMinutes(to, from) % 60;

    return {
      years,
      months,
      days,
      hours,
      minutes,
      totalMonths: differenceInMonths(to, from),
      totalDays: differenceInDays(to, from),
      totalHours: differenceInHours(to, from),
      totalMinutes: differenceInMinutes(to, from)
    };
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      if (!birthDate) {
        throw new Error('Please enter a birth date');
      }

      const birthDateTime = new Date(birthDate);
      const toDateTime = new Date(toDate);

      if (isNaN(birthDateTime.getTime())) {
        throw new Error('Invalid birth date');
      }

      if (isNaN(toDateTime.getTime())) {
        throw new Error('Invalid end date');
      }

      if (toDateTime < birthDateTime) {
        throw new Error('End date must be after birth date');
      }

      setResult(calculateAge(birthDateTime, toDateTime));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setBirthDate('');
    setToDate(new Date().toISOString().split('T')[0]);
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Age Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate exact age or time between two dates, including years, months, days, and more.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label>Birth Date</Label>
                  <Input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>

                <div>
                  <Label>Calculate Age At</Label>
                  <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
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

              {result && (
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Exact Age</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.years} years, {result.months} months, {result.days} days
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Months</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalMonths.toLocaleString()} months
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Days</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalDays.toLocaleString()} days
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Hours</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalHours.toLocaleString()} hours
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg col-span-2">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Minutes</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalMinutes.toLocaleString()} minutes
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 