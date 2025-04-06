"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const TEENS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const SCALES = ['', 'thousand', 'million', 'billion', 'trillion'];

export default function NumberWordsConverter() {
  const [activeTab, setActiveTab] = useState<'toWords' | 'toNumbers'>('toWords');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const convertChunkToWords = (chunk: number): string => {
    if (chunk === 0) return '';

    const hundreds = Math.floor(chunk / 100);
    const remainder = chunk % 100;
    const tens = Math.floor(remainder / 10);
    const ones = remainder % 10;

    let words = '';

    if (hundreds > 0) {
      words += ONES[hundreds] + ' hundred ';
    }

    if (tens === 1) {
      words += TEENS[ones] + ' ';
    } else {
      if (tens > 1) {
        words += TENS[tens] + ' ';
      }
      if (ones > 0) {
        words += ONES[ones] + ' ';
      }
    }

    return words;
  };

  const numberToWords = (num: number): string => {
    if (num === 0) return 'zero';
    if (num < 0) return 'negative ' + numberToWords(Math.abs(num));

    let words = '';
    let scaleIndex = 0;

    while (num > 0) {
      const chunk = num % 1000;
      if (chunk !== 0) {
        const chunkWords = convertChunkToWords(chunk);
        words = chunkWords + SCALES[scaleIndex] + ' ' + words;
      }
      num = Math.floor(num / 1000);
      scaleIndex++;
    }

    return words.trim();
  };

  const wordsToNumber = (words: string): number => {
    const normalized = words.toLowerCase().trim();
    if (normalized === 'zero') return 0;

    let isNegative = false;
    let text = normalized;

    if (text.startsWith('negative ')) {
      isNegative = true;
      text = text.slice(9);
    }

    const wordToValue: { [key: string]: number } = {
      ...ONES.reduce((acc, word, i) => ({ ...acc, [word]: i }), {}),
      ...TEENS.reduce((acc, word, i) => ({ ...acc, [word]: i + 10 }), {}),
      ...TENS.reduce((acc, word, i) => ({ ...acc, [word]: i * 10 }), {}),
      hundred: 100,
      thousand: 1000,
      million: 1000000,
      billion: 1000000000,
      trillion: 1000000000000
    };

    const parts = text.split(' ').filter(Boolean);
    let result = 0;
    let currentNumber = 0;

    for (let i = 0; i < parts.length; i++) {
      const word = parts[i];
      const value = wordToValue[word];

      if (value === undefined) {
        throw new Error(`Invalid word: ${word}`);
      }

      if (value === 100) {
        currentNumber = (currentNumber || 1) * value;
      } else if (value >= 1000) {
        currentNumber = (currentNumber || 1) * value;
        result += currentNumber;
        currentNumber = 0;
      } else {
        currentNumber += value;
      }
    }

    result += currentNumber;
    return isNegative ? -result : result;
  };

  const handleConvert = () => {
    setError('');
    setResult('');

    try {
      if (!input.trim()) {
        throw new Error('Please enter a value to convert');
      }

      if (activeTab === 'toWords') {
        const num = parseFloat(input);
        if (isNaN(num)) {
          throw new Error('Please enter a valid number');
        }
        if (Math.abs(num) > 999999999999999) {
          throw new Error('Number is too large to convert');
        }
        setResult(numberToWords(Math.round(num)));
      } else {
        setResult(wordsToNumber(input).toString());
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
            Number Words Converter
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Convert numbers to words and vice versa. Supports numbers up to trillions.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'toWords' | 'toNumbers')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="toWords">Number to Words</TabsTrigger>
                  <TabsTrigger value="toNumbers">Words to Number</TabsTrigger>
                </TabsList>

                <TabsContent value="toWords" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Enter Number</Label>
                      <Input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a number (e.g., 42)"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
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
                  </div>
                </TabsContent>

                <TabsContent value="toNumbers" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Enter Words</Label>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter number in words (e.g., forty two)"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
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
                  </div>
                </TabsContent>
              </Tabs>

              {result && (
                <div className="space-y-4 pt-4 border-t">
                  <h2 className="text-xl font-semibold text-indigo-600">Result</h2>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-lg font-bold text-indigo-600 break-all">
                      {result}
                    </p>
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