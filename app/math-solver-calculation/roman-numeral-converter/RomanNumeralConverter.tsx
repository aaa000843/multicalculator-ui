"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ConversionType = 'toRoman' | 'toNumber';

const ROMAN_NUMERALS = [
  { value: 1000, symbol: 'M' },
  { value: 900, symbol: 'CM' },
  { value: 500, symbol: 'D' },
  { value: 400, symbol: 'CD' },
  { value: 100, symbol: 'C' },
  { value: 90, symbol: 'XC' },
  { value: 50, symbol: 'L' },
  { value: 40, symbol: 'XL' },
  { value: 10, symbol: 'X' },
  { value: 9, symbol: 'IX' },
  { value: 5, symbol: 'V' },
  { value: 4, symbol: 'IV' },
  { value: 1, symbol: 'I' }
];

export default function RomanNumeralConverter() {
  const [conversionType, setConversionType] = useState<ConversionType>('toRoman');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const convertToRoman = (num: number): string => {
    if (num < 1 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    let result = '';
    let remaining = num;

    for (const { value, symbol } of ROMAN_NUMERALS) {
      while (remaining >= value) {
        result += symbol;
        remaining -= value;
      }
    }

    return result;
  };

  const convertToNumber = (roman: string): number => {
    const romanPattern = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
    if (!romanPattern.test(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    const values: { [key: string]: number } = {
      I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
    };

    let result = 0;
    for (let i = 0; i < roman.length; i++) {
      const current = values[roman[i]];
      const next = values[roman[i + 1]];

      if (next > current) {
        result += next - current;
        i++;
      } else {
        result += current;
      }
    }

    if (result < 1 || result > 3999) {
      throw new Error('Roman numeral must represent a number between 1 and 3999');
    }

    return result;
  };

  const handleConvert = () => {
    setError('');
    setResult('');

    try {
      if (!input.trim()) {
        throw new Error('Please enter a value to convert');
      }

      if (conversionType === 'toRoman') {
        const num = parseInt(input);
        if (isNaN(num)) {
          throw new Error('Please enter a valid number');
        }
        setResult(convertToRoman(num));
      } else {
        const roman = input.trim().toUpperCase();
        setResult(convertToNumber(roman).toString());
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Roman Numeral Converter
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Convert between Roman numerals and decimal numbers. Supports numbers from 1 to 3999.
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
                  <Label>Conversion Type</Label>
                  <Select
                    value={conversionType}
                    onValueChange={(value: ConversionType) => {
                      setConversionType(value);
                      handleReset();
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toRoman">Number to Roman</SelectItem>
                      <SelectItem value="toNumber">Roman to Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>
                      {conversionType === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
                    </Label>
                    <Input
                      type={conversionType === 'toRoman' ? 'number' : 'text'}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        conversionType === 'toRoman'
                          ? 'Enter a number between 1 and 3999'
                          : 'Enter a Roman numeral (e.g., MCMLIV)'
                      }
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      min={conversionType === 'toRoman' ? 1 : undefined}
                      max={conversionType === 'toRoman' ? 3999 : undefined}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleConvert}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    Convert
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Reset
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Result</h2>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-2">
                        {conversionType === 'toRoman' ? 'Roman Numeral' : 'Number'}
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">{result}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold text-indigo-600 mb-3">Quick Guide</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {ROMAN_NUMERALS.filter(n => [1, 5, 10, 50, 100, 500, 1000].includes(n.value)).map(({ value, symbol }) => (
                      <div key={symbol} className="p-2 bg-purple-50 rounded-lg text-center">
                        <p className="text-sm text-indigo-600 font-medium">{symbol}</p>
                        <p className="text-xs text-indigo-500">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 