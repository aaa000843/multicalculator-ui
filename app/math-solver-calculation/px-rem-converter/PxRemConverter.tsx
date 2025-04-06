"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PxRemConverter() {
  const [activeTab, setActiveTab] = useState<'pxToRem' | 'remToPx'>('pxToRem');
  const [input, setInput] = useState('');
  const [baseSize, setBaseSize] = useState('16');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const pxToRem = (px: number, base: number): number => {
    return px / base;
  };

  const remToPx = (rem: number, base: number): number => {
    return rem * base;
  };

  const handleConvert = () => {
    setError('');
    setResult('');

    try {
      if (!input.trim()) {
        throw new Error('Please enter a value to convert');
      }

      const value = parseFloat(input);
      const base = parseFloat(baseSize);

      if (isNaN(value)) {
        throw new Error('Please enter a valid number');
      }

      if (isNaN(base) || base <= 0) {
        throw new Error('Please enter a valid base font size');
      }

      if (activeTab === 'pxToRem') {
        setResult(pxToRem(value, base).toFixed(4) + 'rem');
      } else {
        setResult(remToPx(value, base).toFixed(2) + 'px');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setInput('');
    setBaseSize('16');
    setResult('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            PX to REM Converter
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Convert between pixels (px) and root em units (rem) for responsive web design.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'pxToRem' | 'remToPx')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pxToRem">PX to REM</TabsTrigger>
                  <TabsTrigger value="remToPx">REM to PX</TabsTrigger>
                </TabsList>

                <TabsContent value="pxToRem" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Enter Pixels</Label>
                      <Input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter px value (e.g., 16)"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div>
                      <Label>Base Font Size (px)</Label>
                      <Input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(e.target.value)}
                        placeholder="Base font size (default: 16)"
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

                <TabsContent value="remToPx" className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label>Enter REM</Label>
                      <Input
                        type="number"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter rem value (e.g., 1.5)"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div>
                      <Label>Base Font Size (px)</Label>
                      <Input
                        type="number"
                        value={baseSize}
                        onChange={(e) => setBaseSize(e.target.value)}
                        placeholder="Base font size (default: 16)"
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
                    <p className="text-lg font-bold text-indigo-600">
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