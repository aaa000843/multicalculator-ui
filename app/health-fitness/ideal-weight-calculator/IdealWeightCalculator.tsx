"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface IdealWeightResult {
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
  average: number;
  healthyRange: {
    min: number;
    max: number;
  };
  bmiRange: {
    min: number;
    max: number;
  };
  frameAdjusted: {
    small: number;
    medium: number;
    large: number;
  };
}

const FRAME_SIZES = [
  { value: 'small', label: 'Small Frame', adjustment: 0.9 },
  { value: 'medium', label: 'Medium Frame', adjustment: 1.0 },
  { value: 'large', label: 'Large Frame', adjustment: 1.1 }
];

export default function IdealWeightCalculator() {
  const [height, setHeight] = useState<string>('170');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [frameSize, setFrameSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<IdealWeightResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateIdealWeight = () => {
    setError('');
    try {
      let heightCm = parseFloat(height);
      
      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        heightCm = heightCm * 2.54; // inches to cm
      }

      if (isNaN(heightCm)) {
        throw new Error('Please enter a valid height');
      }

      if (heightCm < 130 || heightCm > 230) {
        throw new Error('Height should be between 130cm and 230cm (or 51-90 inches)');
      }

      // Convert height to inches for formulas
      const heightInches = heightCm / 2.54;
      const heightInchesOver5Feet = Math.max(0, heightInches - 60);

      // Calculate ideal weight using different formulas (in kg)
      let devine, robinson, miller, hamwi;

      if (gender === 'male') {
        devine = 50.0 + 2.3 * heightInchesOver5Feet;
        robinson = 52.0 + 1.9 * heightInchesOver5Feet;
        miller = 56.2 + 1.41 * heightInchesOver5Feet;
        hamwi = 48.0 + 2.7 * heightInchesOver5Feet;
      } else {
        devine = 45.5 + 2.3 * heightInchesOver5Feet;
        robinson = 49.0 + 1.7 * heightInchesOver5Feet;
        miller = 53.1 + 1.36 * heightInchesOver5Feet;
        hamwi = 45.5 + 2.2 * heightInchesOver5Feet;
      }

      // Calculate average
      const average = (devine + robinson + miller + hamwi) / 4;

      // Calculate BMI-based healthy weight range
      const heightM = heightCm / 100;
      const bmiMin = 18.5 * (heightM * heightM);
      const bmiMax = 24.9 * (heightM * heightM);

      // Calculate frame size adjustments
      const frameAdjustment = FRAME_SIZES.find(f => f.value === frameSize)?.adjustment || 1;
      
      // Convert all weights to imperial if needed
      const convertWeight = (kg: number) => unit === 'metric' ? kg : kg * 2.20462;

      const result: IdealWeightResult = {
        devine: convertWeight(devine),
        robinson: convertWeight(robinson),
        miller: convertWeight(miller),
        hamwi: convertWeight(hamwi),
        average: convertWeight(average),
        healthyRange: {
          min: convertWeight(average * 0.94),
          max: convertWeight(average * 1.06)
        },
        bmiRange: {
          min: convertWeight(bmiMin),
          max: convertWeight(bmiMax)
        },
        frameAdjusted: {
          small: convertWeight(average * 0.9),
          medium: convertWeight(average),
          large: convertWeight(average * 1.1)
        }
      };

      setResults(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setHeight('170');
    setGender('male');
    setFrameSize('medium');
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
              Ideal Weight Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your ideal weight range based on height, gender, and body frame. Get estimates using multiple scientific formulas.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Multiple calculation methods',
                  'Frame size adjustments',
                  'Gender-specific formulas',
                  'Healthy weight ranges',
                  'BMI correlation'
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
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={gender}
                        onValueChange={(value: 'male' | 'female') => setGender(value)}
                      >
                        <SelectTrigger id="gender" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

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

                    <div className="space-y-2">
                      <Label htmlFor="frame">Body Frame</Label>
                      <Select
                        value={frameSize}
                        onValueChange={(value: 'small' | 'medium' | 'large') => setFrameSize(value)}
                      >
                        <SelectTrigger id="frame" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select frame size" />
                        </SelectTrigger>
                        <SelectContent>
                          {FRAME_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      onClick={calculateIdealWeight}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate Ideal Weight
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
                      <p className="text-sm text-indigo-600 font-medium mb-1">Average Ideal Weight</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.average.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Healthy Weight Range</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.healthyRange.min.toFixed(1)} - {results.healthyRange.max.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-blue-600">Results by Formula</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Devine Formula</p>
                        <p className="text-gray-600">
                          {results.devine.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Robinson Formula</p>
                        <p className="text-gray-600">
                          {results.robinson.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Miller Formula</p>
                        <p className="text-gray-600">
                          {results.miller.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Hamwi Formula</p>
                        <p className="text-gray-600">
                          {results.hamwi.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-green-600">Frame Size Adjustments</h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-green-600">Small Frame</p>
                        <p className="text-gray-600">
                          {results.frameAdjusted.small.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600">Medium Frame</p>
                        <p className="text-gray-600">
                          {results.frameAdjusted.medium.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-600">Large Frame</p>
                        <p className="text-gray-600">
                          {results.frameAdjusted.large.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-600 font-medium mb-2">BMI-Based Range</p>
                    <p className="text-gray-600">
                      For your height, a BMI-healthy weight range is:
                      <br />
                      {results.bmiRange.min.toFixed(1)} - {results.bmiRange.max.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>These calculations are estimates based on different formulas</li>
                      <li>Individual factors like muscle mass and body composition aren't considered</li>
                      <li>Age and activity level can affect ideal weight</li>
                      <li>Consult a healthcare provider for personalized recommendations</li>
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