"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type NumberSystem = 'binary' | 'decimal' | 'hexadecimal' | 'octal' | 'text';
type Operation = 'AND' | 'OR' | 'XOR' | 'NOT' | 'LEFT_SHIFT' | 'RIGHT_SHIFT';

interface ConversionResult {
  binary: string;
  decimal: string;
  hexadecimal: string;
  octal: string;
  text?: string;
}

const NUMBER_SYSTEMS: { value: NumberSystem; label: string }[] = [
  { value: 'binary', label: 'Binary' },
  { value: 'decimal', label: 'Decimal' },
  { value: 'hexadecimal', label: 'Hexadecimal' },
  { value: 'octal', label: 'Octal' },
  { value: 'text', label: 'ASCII Text' }
];

const OPERATIONS: { value: Operation; label: string }[] = [
  { value: 'AND', label: 'AND' },
  { value: 'OR', label: 'OR' },
  { value: 'XOR', label: 'XOR' },
  { value: 'NOT', label: 'NOT' },
  { value: 'LEFT_SHIFT', label: 'Left Shift' },
  { value: 'RIGHT_SHIFT', label: 'Right Shift' }
];

export default function BinaryConverter() {
  const [activeTab, setActiveTab] = useState<'convert' | 'operate'>('convert');
  const [inputSystem, setInputSystem] = useState<NumberSystem>('decimal');
  const [input, setInput] = useState<string>('');
  const [operation, setOperation] = useState<Operation>('AND');
  const [operand2, setOperand2] = useState<string>('');
  const [shiftAmount, setShiftAmount] = useState<string>('1');
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const validateBinary = (str: string): boolean => /^[01]+$/.test(str);
  const validateDecimal = (str: string): boolean => /^\d+$/.test(str);
  const validateHexadecimal = (str: string): boolean => /^[0-9A-Fa-f]+$/.test(str);
  const validateOctal = (str: string): boolean => /^[0-7]+$/.test(str);

  const convertToDecimal = (value: string, from: NumberSystem): number => {
    switch (from) {
      case 'binary':
        return parseInt(value, 2);
      case 'decimal':
        return parseInt(value, 10);
      case 'hexadecimal':
        return parseInt(value, 16);
      case 'octal':
        return parseInt(value, 8);
      case 'text':
        return value.charCodeAt(0);
      default:
        throw new Error('Invalid number system');
    }
  };

  const convertFromDecimal = (decimal: number): ConversionResult => {
    return {
      binary: decimal.toString(2),
      decimal: decimal.toString(10),
      hexadecimal: decimal.toString(16).toUpperCase(),
      octal: decimal.toString(8)
    };
  };

  const textToBinary = (text: string): string => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (binary: string): string => {
    return binary
      .split(' ')
      .map(byte => String.fromCharCode(parseInt(byte, 2)))
      .join('');
  };

  const handleConvert = () => {
    setError('');
    setResult(null);

    try {
      if (!input.trim()) {
        throw new Error('Please enter a value to convert');
      }

      if (inputSystem === 'text') {
        const binary = textToBinary(input);
        setResult({
          binary,
          decimal: '',
          hexadecimal: '',
          octal: '',
          text: input
        });
        return;
      }

      // Validate input based on number system
      const isValid = {
        binary: validateBinary,
        decimal: validateDecimal,
        hexadecimal: validateHexadecimal,
        octal: validateOctal
      }[inputSystem]?.(input.trim());

      if (!isValid) {
        throw new Error(`Invalid ${inputSystem} number`);
      }

      const decimal = convertToDecimal(input.trim(), inputSystem);
      setResult(convertFromDecimal(decimal));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleOperation = () => {
    setError('');
    setResult(null);

    try {
      if (!input.trim()) {
        throw new Error('Please enter the first operand');
      }

      if (!validateBinary(input)) {
        throw new Error('First operand must be a binary number');
      }

      const num1 = parseInt(input, 2);

      let resultDecimal: number;

      switch (operation) {
        case 'NOT':
          resultDecimal = ~num1;
          break;

        case 'LEFT_SHIFT':
        case 'RIGHT_SHIFT': {
          const amount = parseInt(shiftAmount);
          if (isNaN(amount) || amount < 0) {
            throw new Error('Invalid shift amount');
          }
          resultDecimal = operation === 'LEFT_SHIFT'
            ? num1 << amount
            : num1 >> amount;
          break;
        }

        default: {
          if (!operand2.trim() || !validateBinary(operand2)) {
            throw new Error('Second operand must be a binary number');
          }
          const num2 = parseInt(operand2, 2);

          switch (operation) {
            case 'AND':
              resultDecimal = num1 & num2;
              break;
            case 'OR':
              resultDecimal = num1 | num2;
              break;
            case 'XOR':
              resultDecimal = num1 ^ num2;
              break;
            default:
              throw new Error('Invalid operation');
          }
        }
      }

      setResult(convertFromDecimal(resultDecimal));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setInput('');
    setOperand2('');
    setShiftAmount('1');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Binary Converter
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Convert between different number systems and perform binary operations.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'convert' | 'operate')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="convert">Convert</TabsTrigger>
                  <TabsTrigger value="operate">Binary Operations</TabsTrigger>
                </TabsList>

                <TabsContent value="convert" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Input Type</Label>
                      <Select
                        value={inputSystem}
                        onValueChange={(value: NumberSystem) => {
                          setInputSystem(value);
                          handleReset();
                        }}
                      >
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {NUMBER_SYSTEMS.map((system) => (
                            <SelectItem key={system.value} value={system.value}>
                              {system.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Enter {NUMBER_SYSTEMS.find(s => s.value === inputSystem)?.label}</Label>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Enter ${inputSystem} value`}
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

                <TabsContent value="operate" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>First Binary Number</Label>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter binary number (e.g., 1010)"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div>
                      <Label>Operation</Label>
                      <Select
                        value={operation}
                        onValueChange={(value: Operation) => setOperation(value)}
                      >
                        <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {OPERATIONS.map((op) => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {(operation === 'LEFT_SHIFT' || operation === 'RIGHT_SHIFT') ? (
                      <div>
                        <Label>Shift Amount</Label>
                        <Input
                          type="number"
                          value={shiftAmount}
                          onChange={(e) => setShiftAmount(e.target.value)}
                          min="0"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    ) : operation !== 'NOT' && (
                      <div>
                        <Label>Second Binary Number</Label>
                        <Input
                          value={operand2}
                          onChange={(e) => setOperand2(e.target.value)}
                          placeholder="Enter binary number (e.g., 1100)"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={handleOperation}
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
                  <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                  <div className="grid gap-4">
                    {Object.entries(result).map(([key, value]) => {
                      if (!value) return null;
                      return (
                        <div key={key} className="p-4 bg-purple-50 rounded-lg">
                          <p className="text-sm text-indigo-600 font-medium mb-1">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </p>
                          <p className="text-lg font-bold text-indigo-600 break-all">
                            {value}
                          </p>
                        </div>
                      );
                    })}
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