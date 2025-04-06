"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

type GenerationType = 'single' | 'range' | 'sequence' | 'dice';

interface RandomResult {
  numbers: number[];
  stats?: {
    mean?: number;
    min?: number;
    max?: number;
  };
}

const GENERATION_TYPES = [
  { value: 'single', label: 'Single Number' },
  { value: 'range', label: 'Number in Range' },
  { value: 'sequence', label: 'Random Sequence' },
  { value: 'dice', label: 'Dice Roll' }
];

export default function RandomNumberGenerator() {
  const [generationType, setGenerationType] = useState<GenerationType>('single');
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('5');
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [diceType, setDiceType] = useState<string>('6');
  const [diceCount, setDiceCount] = useState<string>('1');
  const [result, setResult] = useState<RandomResult | null>(null);
  const [error, setError] = useState<string>('');

  const generateRandom = () => {
    setError('');
    try {
      let numbers: number[] = [];
      let stats = {};

      switch (generationType) {
        case 'single': {
          const minNum = parseFloat(min);
          const maxNum = parseFloat(max);
          if (isNaN(minNum) || isNaN(maxNum)) {
            throw new Error('Please enter valid numbers');
          }
          const random = allowDecimals
            ? Math.random() * (maxNum - minNum) + minNum
            : Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
          numbers = [random];
          break;
        }

        case 'range': {
          const minNum = parseFloat(min);
          const maxNum = parseFloat(max);
          if (isNaN(minNum) || isNaN(maxNum)) {
            throw new Error('Please enter valid numbers');
          }
          const random = allowDecimals
            ? Math.random() * (maxNum - minNum) + minNum
            : Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
          numbers = [random];
          break;
        }

        case 'sequence': {
          const minNum = parseFloat(min);
          const maxNum = parseFloat(max);
          const seqCount = parseInt(count);
          if (isNaN(minNum) || isNaN(maxNum) || isNaN(seqCount)) {
            throw new Error('Please enter valid numbers');
          }
          numbers = Array.from({ length: seqCount }, () =>
            allowDecimals
              ? Math.random() * (maxNum - minNum) + minNum
              : Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum
          );
          stats = {
            mean: numbers.reduce((a, b) => a + b, 0) / numbers.length,
            min: Math.min(...numbers),
            max: Math.max(...numbers)
          };
          break;
        }

        case 'dice': {
          const sides = parseInt(diceType);
          const numDice = parseInt(diceCount);
          if (isNaN(sides) || isNaN(numDice)) {
            throw new Error('Please enter valid numbers');
          }
          numbers = Array.from({ length: numDice }, () =>
            Math.floor(Math.random() * sides) + 1
          );
          const total = numbers.reduce((a, b) => a + b, 0);
          stats = {
            total,
            average: total / numDice
          };
          break;
        }

        default:
          throw new Error('Invalid generation type');
      }

      setResult({ numbers, stats });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetGenerator = () => {
    setMin('1');
    setMax('100');
    setCount('5');
    setDiceType('6');
    setDiceCount('1');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Random Number Generator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Generate random numbers, sequences, and simulate dice rolls with customizable options.
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
                  <Label>Generation Type</Label>
                  <Select
                    value={generationType}
                    onValueChange={(value: GenerationType) => {
                      setGenerationType(value);
                      resetGenerator();
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {GENERATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(generationType === 'single' || generationType === 'range' || generationType === 'sequence') && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label>Minimum Value</Label>
                        <Input
                          type="number"
                          value={min}
                          onChange={(e) => setMin(e.target.value)}
                          placeholder="Enter minimum value"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Maximum Value</Label>
                        <Input
                          type="number"
                          value={max}
                          onChange={(e) => setMax(e.target.value)}
                          placeholder="Enter maximum value"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      {generationType === 'sequence' && (
                        <div>
                          <Label>Number of Values</Label>
                          <Input
                            type="number"
                            value={count}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="Enter count"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={allowDecimals}
                          onCheckedChange={setAllowDecimals}
                          className="data-[state=checked]:bg-indigo-600"
                        />
                        <Label>Allow Decimal Numbers</Label>
                      </div>
                    </div>
                  </>
                )}

                {generationType === 'dice' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Number of Dice</Label>
                      <Input
                        type="number"
                        value={diceCount}
                        onChange={(e) => setDiceCount(e.target.value)}
                        placeholder="Enter number of dice"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Dice Type (number of sides)</Label>
                      <Select
                        value={diceType}
                        onValueChange={setDiceType}
                      >
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[4, 6, 8, 10, 12, 20, 100].map((sides) => (
                            <SelectItem key={sides} value={sides.toString()}>
                              d{sides}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={generateRandom}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    Generate
                  </Button>
                  <Button
                    onClick={resetGenerator}
                    variant="outline"
                    className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Reset
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                    
                    <div className="grid gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-2">Generated Numbers</p>
                        <div className="flex flex-wrap gap-2">
                          {result.numbers.map((num, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-white rounded-full text-indigo-600 font-semibold shadow-sm"
                            >
                              {allowDecimals ? num.toFixed(2) : num}
                            </span>
                          ))}
                        </div>
                      </div>

                      {result.stats && Object.entries(result.stats).length > 0 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          {Object.entries(result.stats).map(([key, value]) => (
                            <div key={key} className="p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-indigo-600 font-medium mb-1">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </p>
                              <p className="text-lg font-bold text-indigo-600">
                                {typeof value === 'number' ? value.toFixed(2) : value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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