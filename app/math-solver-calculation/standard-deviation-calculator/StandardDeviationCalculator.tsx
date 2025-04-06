"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface StatisticalResult {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  variance: number;
  standardDeviation: number;
  sampleSize: number;
  sum: number;
  min: number;
  max: number;
  quartiles: {
    q1: number;
    q2: number;
    q3: number;
  };
  outliers: number[];
}

type DataInputType = 'manual' | 'paste' | 'random';

export default function StandardDeviationCalculator() {
  const [dataInputType, setDataInputType] = useState<DataInputType>('manual');
  const [manualInput, setManualInput] = useState<string>('');
  const [sampleSize, setSampleSize] = useState<string>('10');
  const [minValue, setMinValue] = useState<string>('1');
  const [maxValue, setMaxValue] = useState<string>('100');
  const [isPopulation, setIsPopulation] = useState(false);
  const [result, setResult] = useState<StatisticalResult | null>(null);
  const [error, setError] = useState<string>('');

  const parseData = (input: string): number[] => {
    return input
      .split(/[,\n\t\s]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => {
        const num = parseFloat(s);
        if (isNaN(num)) {
          throw new Error(`Invalid number: ${s}`);
        }
        return num;
      });
  };

  const calculateMean = (data: number[]): number => {
    return data.reduce((sum, value) => sum + value, 0) / data.length;
  };

  const calculateMedian = (data: number[]): number => {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  const calculateMode = (data: number[]): number[] => {
    const frequency: { [key: number]: number } = {};
    data.forEach(value => {
      frequency[value] = (frequency[value] || 0) + 1;
    });

    const maxFrequency = Math.max(...Object.values(frequency));
    return Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFrequency)
      .map(([value]) => parseFloat(value));
  };

  const calculateQuartiles = (data: number[]): { q1: number; q2: number; q3: number } => {
    const sorted = [...data].sort((a, b) => a - b);
    const q2 = calculateMedian(sorted);
    
    const lowerHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    const upperHalf = sorted.slice(Math.ceil(sorted.length / 2));
    
    return {
      q1: calculateMedian(lowerHalf),
      q2,
      q3: calculateMedian(upperHalf)
    };
  };

  const findOutliers = (data: number[], q1: number, q3: number): number[] => {
    const iqr = q3 - q1;
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    return data.filter(value => value < lowerBound || value > upperBound);
  };

  const calculateStatistics = (data: number[]): StatisticalResult => {
    const mean = calculateMean(data);
    const variance = data.reduce((sum, value) => {
      const diff = value - mean;
      return sum + (diff * diff);
    }, 0) / (isPopulation ? data.length : data.length - 1);

    const quartiles = calculateQuartiles(data);
    const outliers = findOutliers(data, quartiles.q1, quartiles.q3);

    return {
      mean,
      median: calculateMedian(data),
      mode: calculateMode(data),
      range: Math.max(...data) - Math.min(...data),
      variance,
      standardDeviation: Math.sqrt(variance),
      sampleSize: data.length,
      sum: data.reduce((sum, value) => sum + value, 0),
      min: Math.min(...data),
      max: Math.max(...data),
      quartiles,
      outliers
    };
  };

  const generateRandomData = () => {
    const size = parseInt(sampleSize);
    const min = parseFloat(minValue);
    const max = parseFloat(maxValue);

    if (isNaN(size) || isNaN(min) || isNaN(max)) {
      throw new Error('Please enter valid numbers');
    }

    if (size < 1) {
      throw new Error('Sample size must be at least 1');
    }

    if (min >= max) {
      throw new Error('Maximum value must be greater than minimum value');
    }

    return Array.from({ length: size }, () =>
      Math.round((Math.random() * (max - min) + min) * 100) / 100
    );
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      let data: number[];

      if (dataInputType === 'random') {
        data = generateRandomData();
      } else {
        if (!manualInput.trim()) {
          throw new Error('Please enter some numbers');
        }
        data = parseData(manualInput);
      }

      if (data.length < 2 && !isPopulation) {
        throw new Error('Sample size must be at least 2 for sample calculations');
      }

      setResult(calculateStatistics(data));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setManualInput('');
    setSampleSize('10');
    setMinValue('1');
    setMaxValue('100');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Standard Deviation Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate standard deviation and other statistical measures from your data.
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
                <div>
                  <Label>Data Input Method</Label>
                  <Select
                    value={dataInputType}
                    onValueChange={(value: DataInputType) => {
                      setDataInputType(value);
                      handleReset();
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Enter Numbers</SelectItem>
                      <SelectItem value="paste">Paste Data</SelectItem>
                      <SelectItem value="random">Generate Random Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Population Calculation</Label>
                  <Switch
                    checked={isPopulation}
                    onCheckedChange={setIsPopulation}
                    className="data-[state=checked]:bg-indigo-600"
                  />
                </div>

                {(dataInputType === 'manual' || dataInputType === 'paste') && (
                  <div>
                    <Label>Enter Numbers (separated by commas, spaces, or new lines)</Label>
                    <Textarea
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="Example: 1, 2, 3, 4, 5"
                      className="h-32 border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                )}

                {dataInputType === 'random' && (
                  <div className="space-y-4">
                    <div>
                      <Label>Sample Size</Label>
                      <Input
                        type="number"
                        value={sampleSize}
                        onChange={(e) => setSampleSize(e.target.value)}
                        min="1"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Minimum Value</Label>
                      <Input
                        type="number"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Maximum Value</Label>
                      <Input
                        type="number"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
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

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">
                          Standard Deviation ({isPopulation ? 'Population' : 'Sample'})
                        </p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.standardDeviation.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Variance</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.variance.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Mean</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.mean.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Median</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.median.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Mode</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.mode.map(m => m.toFixed(4)).join(', ')}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Range</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.range.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Sample Size</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.sampleSize}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Sum</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.sum.toFixed(4)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg col-span-2">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Quartiles</p>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-indigo-500">Q1</p>
                            <p className="text-lg font-bold text-indigo-600">
                              {result.quartiles.q1.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-indigo-500">Q2 (Median)</p>
                            <p className="text-lg font-bold text-indigo-600">
                              {result.quartiles.q2.toFixed(4)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-indigo-500">Q3</p>
                            <p className="text-lg font-bold text-indigo-600">
                              {result.quartiles.q3.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </div>
                      {result.outliers.length > 0 && (
                        <div className="p-4 bg-purple-50 rounded-lg col-span-2">
                          <p className="text-sm text-indigo-600 font-medium mb-1">Outliers</p>
                          <p className="text-lg font-bold text-indigo-600">
                            {result.outliers.map(o => o.toFixed(4)).join(', ')}
                          </p>
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