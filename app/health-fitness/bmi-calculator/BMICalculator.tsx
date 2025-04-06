"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface BMIResult {
  bmi: number;
  category: string;
  healthyRangeMin: number;
  healthyRangeMax: number;
  healthyWeightRange: {
    min: number;
    max: number;
  };
}

const BMI_CATEGORIES = [
  { range: [0, 18.5], name: 'Underweight', description: 'You may need to gain some weight' },
  { range: [18.5, 25], name: 'Normal weight', description: 'You are at a healthy weight' },
  { range: [25, 30], name: 'Overweight', description: 'You may need to lose some weight' },
  { range: [30, Infinity], name: 'Obese', description: 'You should consider weight loss for health benefits' }
];

export default function BMICalculator() {
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('70');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateBMI = () => {
    setError('');
    try {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height);

      if (isNaN(weightNum) || isNaN(heightNum)) {
        throw new Error('Please enter valid numbers for height and weight');
      }

      if (weightNum <= 0 || heightNum <= 0) {
        throw new Error('Height and weight must be greater than zero');
      }

      let bmiValue: number;
      let heightInMeters: number;

      if (unit === 'metric') {
        heightInMeters = heightNum / 100;
        bmiValue = weightNum / (heightInMeters * heightInMeters);
      } else {
        // Convert imperial to metric then calculate
        heightInMeters = (heightNum * 2.54) / 100;
        const weightInKg = weightNum * 0.45359237;
        bmiValue = weightInKg / (heightInMeters * heightInMeters);
      }

      const category = BMI_CATEGORIES.find(cat => bmiValue >= cat.range[0] && bmiValue < cat.range[1])!;
      
      // Calculate healthy weight range
      const healthyWeightMin = 18.5 * (heightInMeters * heightInMeters);
      const healthyWeightMax = 24.9 * (heightInMeters * heightInMeters);

      setResults({
        bmi: bmiValue,
        category: category.name,
        healthyRangeMin: 18.5,
        healthyRangeMax: 24.9,
        healthyWeightRange: {
          min: unit === 'metric' ? healthyWeightMin : healthyWeightMin / 0.45359237,
          max: unit === 'metric' ? healthyWeightMax : healthyWeightMax / 0.45359237
        }
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setHeight('170');
    setWeight('70');
    setUnit('metric');
    setResults(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              BMI Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your Body Mass Index (BMI) to assess if you are at a healthy weight. BMI is a simple measure that uses your height and weight to work out if your weight is healthy.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Instant BMI calculation',
                  'Metric and imperial units',
                  'Healthy weight range',
                  'Weight category classification',
                  'Personalized recommendations'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit System</Label>
                    <Select
                      value={unit}
                      onValueChange={(value: 'metric' | 'imperial') => setUnit(value)}
                    >
                      <SelectTrigger id="unit" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                        <SelectValue placeholder="Select unit system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                        <SelectItem value="imperial">Imperial (in, lb)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lb'})</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lb'}`}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      onClick={calculateBMI}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate BMI
                    </Button>
                    <Button 
                      onClick={resetCalculator}
                      variant="outline"
                      className="flex-1 border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {results && (
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <div className="p-6 space-y-6">
                  <h2 className="text-2xl font-semibold text-indigo-600">Your Results</h2>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Your BMI</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.bmi.toFixed(1)}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Category</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium mb-2">Healthy Weight Range</p>
                    <p className="text-gray-600">
                      For your height, a healthy weight range would be:
                      <br />
                      {results.healthyWeightRange.min.toFixed(1)} - {results.healthyWeightRange.max.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>BMI is a general guide and may not be accurate for everyone</li>
                      <li>Athletes may have a high BMI due to muscle mass</li>
                      <li>The elderly may have different healthy BMI ranges</li>
                      <li>BMI is not suitable for pregnant women</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 