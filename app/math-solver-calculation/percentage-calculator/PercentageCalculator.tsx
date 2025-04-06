"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

type CalculationType = 'basic' | 'change' | 'markup' | 'distribution';

interface PercentageResult {
  result: number;
  details: {
    [key: string]: number;
  };
}

const CALCULATION_TYPES = [
  { value: 'basic', label: 'Basic Percentage' },
  { value: 'change', label: 'Percentage Change' },
  { value: 'markup', label: 'Markup/Discount' },
  { value: 'distribution', label: 'Percentage Distribution' }
];

export default function PercentageCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('basic');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [value3, setValue3] = useState<string>('');
  const [distribution, setDistribution] = useState<string[]>(['']);
  const [result, setResult] = useState<PercentageResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculate = () => {
    setError('');
    try {
      let calculationResult: PercentageResult;

      switch (calculationType) {
        case 'basic': {
          const number = parseFloat(value1);
          const percentage = parseFloat(value2);
          if (isNaN(number) || isNaN(percentage)) {
            throw new Error('Please enter valid numbers');
          }
          const result = (number * percentage) / 100;
          calculationResult = {
            result,
            details: {
              'Percentage Amount': result,
              'Original Number': number,
              'Total': number + result
            }
          };
          break;
        }

        case 'change': {
          const oldValue = parseFloat(value1);
          const newValue = parseFloat(value2);
          if (isNaN(oldValue) || isNaN(newValue)) {
            throw new Error('Please enter valid numbers');
          }
          const change = newValue - oldValue;
          const percentageChange = (change / Math.abs(oldValue)) * 100;
          calculationResult = {
            result: percentageChange,
            details: {
              'Absolute Change': change,
              'Percentage Change': percentageChange,
              'Original Value': oldValue,
              'New Value': newValue
            }
          };
          break;
        }

        case 'markup': {
          const cost = parseFloat(value1);
          const markup = parseFloat(value2);
          if (isNaN(cost) || isNaN(markup)) {
            throw new Error('Please enter valid numbers');
          }
          const markupAmount = (cost * markup) / 100;
          calculationResult = {
            result: markupAmount,
            details: {
              'Markup Amount': markupAmount,
              'Original Cost': cost,
              'Final Price': cost + markupAmount,
              'Markup Percentage': markup
            }
          };
          break;
        }

        case 'distribution': {
          const numbers = distribution.map(v => {
            const num = parseFloat(v);
            if (isNaN(num)) throw new Error('Please enter valid numbers');
            return num;
          });
          const total = numbers.reduce((a, b) => a + b, 0);
          const percentages = numbers.map(n => (n / total) * 100);
          calculationResult = {
            result: total,
            details: percentages.reduce((acc, p, i) => ({
              ...acc,
              [`Part ${i + 1}`]: p
            }), {})
          };
          break;
        }

        default:
          throw new Error('Invalid calculation type');
      }

      setResult(calculationResult);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const addDistributionField = () => {
    setDistribution([...distribution, '']);
  };

  const updateDistribution = (index: number, value: string) => {
    const newDistribution = [...distribution];
    newDistribution[index] = value;
    setDistribution(newDistribution);
  };

  const removeDistributionField = (index: number) => {
    const newDistribution = distribution.filter((_, i) => i !== index);
    setDistribution(newDistribution);
  };

  const resetCalculator = () => {
    setValue1('');
    setValue2('');
    setValue3('');
    setDistribution(['']);
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Percentage Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate percentages, changes, markups, and distributions with ease.
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
                <div className="space-y-4">
                  <Label>Calculation Type</Label>
                  <Select
                    value={calculationType}
                    onValueChange={(value: CalculationType) => {
                      setCalculationType(value);
                      resetCalculator();
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CALCULATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {calculationType === 'basic' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Number</Label>
                      <Input
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="Enter number"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Percentage</Label>
                      <Input
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="Enter percentage"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                )}

                {calculationType === 'change' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Original Value</Label>
                      <Input
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="Enter original value"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>New Value</Label>
                      <Input
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="Enter new value"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                )}

                {calculationType === 'markup' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Original Cost</Label>
                      <Input
                        type="number"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="Enter original cost"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Markup/Discount Percentage</Label>
                      <Input
                        type="number"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                        placeholder="Enter percentage"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                )}

                {calculationType === 'distribution' && (
                  <div className="space-y-4">
                    {distribution.map((value, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1">
                          <Label>Value {index + 1}</Label>
                          <Input
                            type="number"
                            value={value}
                            onChange={(e) => updateDistribution(index, e.target.value)}
                            placeholder={`Enter value ${index + 1}`}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        {distribution.length > 1 && (
                          <Button
                            variant="outline"
                            onClick={() => removeDistributionField(index)}
                            className="mt-6 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addDistributionField}
                      className="w-full border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      Add Value
                    </Button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={calculate}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    Calculate
                  </Button>
                  <Button
                    onClick={resetCalculator}
                    variant="outline"
                    className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Reset
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Object.entries(result.details).map(([key, value]) => (
                        <div key={key} className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-indigo-600 font-medium mb-1">{key}</p>
                          <p className="text-lg font-bold text-indigo-600">
                            {typeof value === 'number' && key.toLowerCase().includes('percentage')
                              ? `${value.toFixed(2)}%`
                              : value.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 