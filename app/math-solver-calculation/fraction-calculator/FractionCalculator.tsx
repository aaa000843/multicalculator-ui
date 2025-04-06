"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface Fraction {
  whole: string;
  numerator: string;
  denominator: string;
}

interface FractionResult {
  whole: number;
  numerator: number;
  denominator: number;
  decimal: number;
  simplified: {
    whole: number;
    numerator: number;
    denominator: number;
  };
}

export default function FractionCalculator() {
  const [fraction1, setFraction1] = useState<Fraction>({
    whole: '0',
    numerator: '1',
    denominator: '2'
  });
  const [fraction2, setFraction2] = useState<Fraction>({
    whole: '0',
    numerator: '1',
    denominator: '2'
  });
  const [operator, setOperator] = useState<'+' | '-' | '×' | '÷'>('+');
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string>('');

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const simplifyFraction = (numerator: number, denominator: number) => {
    if (denominator === 0) throw new Error('Cannot divide by zero');
    
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    numerator = numerator / divisor;
    denominator = denominator / divisor;

    const whole = Math.floor(Math.abs(numerator) / denominator);
    const remainingNumerator = Math.abs(numerator) % denominator;

    return {
      whole: numerator < 0 ? -whole : whole,
      numerator: remainingNumerator,
      denominator: denominator
    };
  };

  const toImproperFraction = (fraction: Fraction) => {
    const whole = parseInt(fraction.whole) || 0;
    const numerator = parseInt(fraction.numerator) || 0;
    const denominator = parseInt(fraction.denominator) || 1;

    const improperNumerator = Math.abs(whole) * denominator + numerator;
    return {
      numerator: whole < 0 ? -improperNumerator : improperNumerator,
      denominator
    };
  };

  const calculate = () => {
    setError('');
    try {
      const f1 = toImproperFraction(fraction1);
      const f2 = toImproperFraction(fraction2);

      let resultNumerator: number;
      let resultDenominator: number;

      switch (operator) {
        case '+':
          resultDenominator = lcm(f1.denominator, f2.denominator);
          resultNumerator = (f1.numerator * (resultDenominator / f1.denominator)) +
                           (f2.numerator * (resultDenominator / f2.denominator));
          break;
        case '-':
          resultDenominator = lcm(f1.denominator, f2.denominator);
          resultNumerator = (f1.numerator * (resultDenominator / f1.denominator)) -
                           (f2.numerator * (resultDenominator / f2.denominator));
          break;
        case '×':
          resultNumerator = f1.numerator * f2.numerator;
          resultDenominator = f1.denominator * f2.denominator;
          break;
        case '÷':
          if (f2.numerator === 0) throw new Error('Cannot divide by zero');
          resultNumerator = f1.numerator * f2.denominator;
          resultDenominator = f1.denominator * f2.numerator;
          break;
        default:
          throw new Error('Invalid operator');
      }

      const simplified = simplifyFraction(resultNumerator, resultDenominator);
      
      setResult({
        ...simplified,
        decimal: resultNumerator / resultDenominator,
        simplified
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const updateFraction = (
    fractionNumber: 1 | 2,
    part: keyof Fraction,
    value: string
  ) => {
    const fraction = fractionNumber === 1 ? fraction1 : fraction2;
    const setFraction = fractionNumber === 1 ? setFraction1 : setFraction2;

    setFraction({
      ...fraction,
      [part]: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Fraction Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate with fractions - add, subtract, multiply, and divide. Convert between fractions and decimals.
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  {/* First Fraction */}
                  <div className="space-y-4">
                    <div>
                      <Label>Whole Number</Label>
                      <Input
                        type="number"
                        value={fraction1.whole}
                        onChange={(e) => updateFraction(1, 'whole', e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Numerator</Label>
                        <Input
                          type="number"
                          value={fraction1.numerator}
                          onChange={(e) => updateFraction(1, 'numerator', e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Denominator</Label>
                        <Input
                          type="number"
                          value={fraction1.denominator}
                          onChange={(e) => updateFraction(1, 'denominator', e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Operator */}
                  <div className="flex justify-center items-center">
                    <Select
                      value={operator}
                      onValueChange={(value: '+' | '-' | '×' | '÷') => setOperator(value)}
                    >
                      <SelectTrigger className="w-20 border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+">+</SelectItem>
                        <SelectItem value="-">-</SelectItem>
                        <SelectItem value="×">×</SelectItem>
                        <SelectItem value="÷">÷</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Second Fraction */}
                  <div className="space-y-4">
                    <div>
                      <Label>Whole Number</Label>
                      <Input
                        type="number"
                        value={fraction2.whole}
                        onChange={(e) => updateFraction(2, 'whole', e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>Numerator</Label>
                        <Input
                          type="number"
                          value={fraction2.numerator}
                          onChange={(e) => updateFraction(2, 'numerator', e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Denominator</Label>
                        <Input
                          type="number"
                          value={fraction2.denominator}
                          onChange={(e) => updateFraction(2, 'denominator', e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={calculate}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    Calculate
                  </Button>
                </div>

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Result</h2>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Mixed Number</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.whole !== 0 && `${result.whole} `}
                          {result.numerator !== 0 && `${result.numerator}/${result.denominator}`}
                          {result.whole === 0 && result.numerator === 0 && '0'}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Decimal</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.decimal.toFixed(4)}
                        </p>
                      </div>
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