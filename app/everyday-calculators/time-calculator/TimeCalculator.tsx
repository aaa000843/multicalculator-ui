"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type CalculationType = 'add' | 'subtract' | 'difference';

interface TimeInput {
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimeResult {
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export default function TimeCalculator() {
  const [activeTab, setActiveTab] = useState<CalculationType>('add');
  const [time1, setTime1] = useState<TimeInput>({ hours: '', minutes: '', seconds: '' });
  const [time2, setTime2] = useState<TimeInput>({ hours: '', minutes: '', seconds: '' });
  const [result, setResult] = useState<TimeResult | null>(null);
  const [error, setError] = useState('');

  const validateTimeInput = (time: TimeInput): boolean => {
    const h = parseInt(time.hours) || 0;
    const m = parseInt(time.minutes) || 0;
    const s = parseInt(time.seconds) || 0;

    return h >= 0 && m >= 0 && m < 60 && s >= 0 && s < 60;
  };

  const timeToSeconds = (time: TimeInput): number => {
    const h = parseInt(time.hours) || 0;
    const m = parseInt(time.minutes) || 0;
    const s = parseInt(time.seconds) || 0;
    return h * 3600 + m * 60 + s;
  };

  const secondsToTime = (totalSeconds: number): TimeResult => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      hours,
      minutes,
      seconds,
      totalHours: totalSeconds / 3600,
      totalMinutes: totalSeconds / 60,
      totalSeconds
    };
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      if (!validateTimeInput(time1)) {
        throw new Error('Invalid first time input');
      }

      if (activeTab !== 'add' && !validateTimeInput(time2)) {
        throw new Error('Invalid second time input');
      }

      const seconds1 = timeToSeconds(time1);
      const seconds2 = timeToSeconds(time2);

      let resultSeconds: number;

      switch (activeTab) {
        case 'add':
          resultSeconds = seconds1 + seconds2;
          break;
        case 'subtract':
          resultSeconds = seconds1 - seconds2;
          if (resultSeconds < 0) {
            throw new Error('Result cannot be negative');
          }
          break;
        case 'difference':
          resultSeconds = Math.abs(seconds1 - seconds2);
          break;
        default:
          throw new Error('Invalid operation');
      }

      setResult(secondsToTime(resultSeconds));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setTime1({ hours: '', minutes: '', seconds: '' });
    setTime2({ hours: '', minutes: '', seconds: '' });
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Time Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Add or subtract times, or calculate the difference between two times.
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

                <TabsContent value={activeTab} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>{activeTab === 'subtract' ? 'From Time' : 'First Time'}</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">Hours</Label>
                          <Input
                            type="number"
                            min="0"
                            value={time1.hours}
                            onChange={(e) => setTime1({ ...time1, hours: e.target.value })}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Minutes</Label>
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            value={time1.minutes}
                            onChange={(e) => setTime1({ ...time1, minutes: e.target.value })}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Seconds</Label>
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            value={time1.seconds}
                            onChange={(e) => setTime1({ ...time1, seconds: e.target.value })}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>

                    {activeTab !== 'add' && (
                      <div>
                        <Label>{activeTab === 'subtract' ? 'Subtract Time' : 'Second Time'}</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-sm">Hours</Label>
                            <Input
                              type="number"
                              min="0"
                              value={time2.hours}
                              onChange={(e) => setTime2({ ...time2, hours: e.target.value })}
                              className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Minutes</Label>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={time2.minutes}
                              onChange={(e) => setTime2({ ...time2, minutes: e.target.value })}
                              className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Seconds</Label>
                            <Input
                              type="number"
                              min="0"
                              max="59"
                              value={time2.seconds}
                              onChange={(e) => setTime2({ ...time2, seconds: e.target.value })}
                              className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                            />
                          </div>
                        </div>
                      </div>
                    )}

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
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Time</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.hours}h {result.minutes}m {result.seconds}s
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Hours</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalHours.toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Minutes</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalMinutes.toFixed(2)}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Total Seconds</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {result.totalSeconds.toFixed(0)}
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