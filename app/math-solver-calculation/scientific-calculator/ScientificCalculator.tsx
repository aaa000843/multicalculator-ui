"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface CalculatorState {
  display: string;
  memory: number;
  lastNumber: string;
  operator: string | null;
  isNewNumber: boolean;
  angleMode: 'DEG' | 'RAD';
}

export default function ScientificCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    memory: 0,
    lastNumber: '',
    operator: null,
    isNewNumber: true,
    angleMode: 'DEG'
  });

  const [error, setError] = useState<string>('');

  const clearError = () => setError('');

  const appendNumber = (num: string) => {
    clearError();
    setState(prev => ({
      ...prev,
      display: prev.isNewNumber ? num : prev.display === '0' ? num : prev.display + num,
      isNewNumber: false
    }));
  };

  const appendDecimal = () => {
    clearError();
    setState(prev => ({
      ...prev,
      display: prev.isNewNumber ? '0.' : prev.display.includes('.') ? prev.display : prev.display + '.',
      isNewNumber: false
    }));
  };

  const setOperator = (op: string) => {
    clearError();
    try {
      setState(prev => ({
        ...prev,
        lastNumber: prev.display,
        operator: op,
        isNewNumber: true
      }));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const calculate = () => {
    clearError();
    try {
      setState(prev => {
        if (!prev.operator || prev.isNewNumber) return prev;

        const num1 = parseFloat(prev.lastNumber);
        const num2 = parseFloat(prev.display);
        let result: number;

        switch (prev.operator) {
          case '+': result = num1 + num2; break;
          case '-': result = num1 - num2; break;
          case '×': result = num1 * num2; break;
          case '÷': result = num1 / num2; break;
          case 'yˣ': result = Math.pow(num1, num2); break;
          default: return prev;
        }

        if (!isFinite(result)) {
          throw new Error('Math Error');
        }

        return {
          ...prev,
          display: result.toString(),
          lastNumber: '',
          operator: null,
          isNewNumber: true
        };
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const calculateFunction = (func: string) => {
    clearError();
    try {
      setState(prev => {
        const num = parseFloat(prev.display);
        let result: number;

        switch (func) {
          case 'sin':
            result = Math.sin(prev.angleMode === 'DEG' ? (num * Math.PI / 180) : num);
            break;
          case 'cos':
            result = Math.cos(prev.angleMode === 'DEG' ? (num * Math.PI / 180) : num);
            break;
          case 'tan':
            result = Math.tan(prev.angleMode === 'DEG' ? (num * Math.PI / 180) : num);
            break;
          case 'sqrt':
            result = Math.sqrt(num);
            break;
          case 'log':
            result = Math.log10(num);
            break;
          case 'ln':
            result = Math.log(num);
            break;
          case '1/x':
            result = 1 / num;
            break;
          case 'x²':
            result = num * num;
            break;
          default:
            return prev;
        }

        if (!isFinite(result)) {
          throw new Error('Math Error');
        }

        return {
          ...prev,
          display: result.toString(),
          isNewNumber: true
        };
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleSign = () => {
    setState(prev => ({
      ...prev,
      display: prev.display.startsWith('-') ? prev.display.slice(1) : '-' + prev.display
    }));
  };

  const clearDisplay = () => {
    setState({
      display: '0',
      memory: 0,
      lastNumber: '',
      operator: null,
      isNewNumber: true,
      angleMode: state.angleMode
    });
    clearError();
  };

  const toggleAngleMode = () => {
    setState(prev => ({
      ...prev,
      angleMode: prev.angleMode === 'DEG' ? 'RAD' : 'DEG'
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Scientific Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Advanced scientific calculator with trigonometric functions, logarithms, and more.
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
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">
                      {state.angleMode} {state.operator ? `${state.lastNumber} ${state.operator}` : ''}
                    </div>
                    <div className="text-3xl font-mono">{state.display}</div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  <Button
                    variant="outline"
                    onClick={toggleAngleMode}
                    className="text-indigo-600"
                  >
                    {state.angleMode}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('sin')}
                    className="text-indigo-600"
                  >
                    sin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('cos')}
                    className="text-indigo-600"
                  >
                    cos
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('tan')}
                    className="text-indigo-600"
                  >
                    tan
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('sqrt')}
                    className="text-indigo-600"
                  >
                    √
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('log')}
                    className="text-indigo-600"
                  >
                    log
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('ln')}
                    className="text-indigo-600"
                  >
                    ln
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('1/x')}
                    className="text-indigo-600"
                  >
                    1/x
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => calculateFunction('x²')}
                    className="text-indigo-600"
                  >
                    x²
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOperator('yˣ')}
                    className="text-indigo-600"
                  >
                    yˣ
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => appendNumber('7')}
                  >
                    7
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('8')}
                  >
                    8
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('9')}
                  >
                    9
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOperator('÷')}
                    className="text-indigo-600"
                  >
                    ÷
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearDisplay}
                    className="text-red-600"
                  >
                    C
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => appendNumber('4')}
                  >
                    4
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('5')}
                  >
                    5
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('6')}
                  >
                    6
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOperator('×')}
                    className="text-indigo-600"
                  >
                    ×
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOperator('-')}
                    className="text-indigo-600"
                  >
                    -
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => appendNumber('1')}
                  >
                    1
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('2')}
                  >
                    2
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => appendNumber('3')}
                  >
                    3
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOperator('+')}
                    className="text-indigo-600"
                  >
                    +
                  </Button>
                  <Button
                    variant="outline"
                    onClick={toggleSign}
                    className="text-indigo-600"
                  >
                    ±
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => appendNumber('0')}
                    className="col-span-2"
                  >
                    0
                  </Button>
                  <Button
                    variant="outline"
                    onClick={appendDecimal}
                  >
                    .
                  </Button>
                  <Button
                    variant="outline"
                    onClick={calculate}
                    className="col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  >
                    =
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 