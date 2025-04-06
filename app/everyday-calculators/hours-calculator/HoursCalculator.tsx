"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TimeEntry {
  startTime: string;
  endTime: string;
  breakDuration: string;
}

interface HoursResult {
  regularHours: number;
  overtimeHours: number;
  totalHours: number;
  totalPay: number;
}

export default function HoursCalculator() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { startTime: '', endTime: '', breakDuration: '0' }
  ]);
  const [hourlyRate, setHourlyRate] = useState('');
  const [overtimeRate, setOvertimeRate] = useState('1.5');
  const [overtimeThreshold, setOvertimeThreshold] = useState('40');
  const [result, setResult] = useState<HoursResult | null>(null);
  const [error, setError] = useState('');

  const calculateHours = (start: string, end: string, breakMinutes: number): number => {
    const startTime = new Date(`2000-01-01T${start}`);
    const endTime = new Date(`2000-01-01T${end}`);
    
    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const diffMs = endTime.getTime() - startTime.getTime() - (breakMinutes * 60 * 1000);
    return diffMs / (1000 * 60 * 60);
  };

  const handleAddEntry = () => {
    setEntries([...entries, { startTime: '', endTime: '', breakDuration: '0' }]);
  };

  const handleRemoveEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      let totalHours = 0;

      // Validate and calculate hours for each entry
      for (const entry of entries) {
        if (!entry.startTime || !entry.endTime) {
          throw new Error('Please fill in all time fields');
        }

        const breakMinutes = parseInt(entry.breakDuration) || 0;
        if (breakMinutes < 0) {
          throw new Error('Break duration cannot be negative');
        }

        const hours = calculateHours(entry.startTime, entry.endTime, breakMinutes);
        if (isNaN(hours) || hours < 0) {
          throw new Error('Invalid time range');
        }

        totalHours += hours;
      }

      const rate = parseFloat(hourlyRate);
      if (isNaN(rate) || rate < 0) {
        throw new Error('Please enter a valid hourly rate');
      }

      const otRate = parseFloat(overtimeRate);
      if (isNaN(otRate) || otRate < 1) {
        throw new Error('Overtime rate must be at least 1x');
      }

      const otThreshold = parseFloat(overtimeThreshold);
      if (isNaN(otThreshold) || otThreshold < 0) {
        throw new Error('Please enter a valid overtime threshold');
      }

      const regularHours = Math.min(totalHours, otThreshold);
      const overtimeHours = Math.max(0, totalHours - otThreshold);
      const totalPay = (regularHours * rate) + (overtimeHours * rate * otRate);

      setResult({
        regularHours,
        overtimeHours,
        totalHours,
        totalPay
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setEntries([{ startTime: '', endTime: '', breakDuration: '0' }]);
    setHourlyRate('');
    setOvertimeRate('1.5');
    setOvertimeThreshold('40');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Hours Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate work hours, overtime, and earnings for multiple time periods.
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

              <div className="space-y-6">
                {entries.map((entry, index) => (
                  <div key={index} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-indigo-600">Time Entry {index + 1}</h3>
                      {index > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveEntry(index)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Input
                          type="time"
                          value={entry.startTime}
                          onChange={(e) => {
                            const newEntries = [...entries];
                            newEntries[index].startTime = e.target.value;
                            setEntries(newEntries);
                          }}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>End Time</Label>
                        <Input
                          type="time"
                          value={entry.endTime}
                          onChange={(e) => {
                            const newEntries = [...entries];
                            newEntries[index].endTime = e.target.value;
                            setEntries(newEntries);
                          }}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Break (minutes)</Label>
                        <Input
                          type="number"
                          min="0"
                          value={entry.breakDuration}
                          onChange={(e) => {
                            const newEntries = [...entries];
                            newEntries[index].breakDuration = e.target.value;
                            setEntries(newEntries);
                          }}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={handleAddEntry}
                  className="w-full border-purple-200 text-indigo-600 hover:bg-purple-50"
                >
                  Add Time Entry
                </Button>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <Label>Hourly Rate ($)</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <div>
                    <Label>Overtime Rate (x)</Label>
                    <Input
                      type="number"
                      min="1"
                      step="0.1"
                      value={overtimeRate}
                      onChange={(e) => setOvertimeRate(e.target.value)}
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <div>
                    <Label>OT Threshold (hours)</Label>
                    <Input
                      type="number"
                      min="0"
                      value={overtimeThreshold}
                      onChange={(e) => setOvertimeThreshold(e.target.value)}
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
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

              {result && (
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Regular Hours</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.regularHours.toFixed(2)}h
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Overtime Hours</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.overtimeHours.toFixed(2)}h
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Hours</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalHours.toFixed(2)}h
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Pay</p>
                      <p className="text-lg font-bold text-indigo-600">
                        ${result.totalPay.toFixed(2)}
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