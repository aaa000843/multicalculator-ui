"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface BodyFatResult {
  bodyFatPercentage: number;
  fatMass: number;
  leanMass: number;
  category: string;
  healthyRange: {
    min: number;
    max: number;
  };
  method: string;
}

const MEASUREMENT_METHODS = [
  { value: 'navy', label: 'Navy Method', description: 'Uses body circumference measurements' },
  { value: 'skinfold', label: 'Skinfold Method', description: 'Uses skinfold measurements from specific body parts' },
  { value: 'bmi', label: 'BMI Method', description: 'Estimates based on BMI (less accurate)' }
];

const BODY_FAT_CATEGORIES = {
  male: [
    { range: [2, 5], category: 'Essential Fat' },
    { range: [6, 13], category: 'Athletes' },
    { range: [14, 17], category: 'Fitness' },
    { range: [18, 24], category: 'Average' },
    { range: [25, 100], category: 'Obese' }
  ],
  female: [
    { range: [10, 13], category: 'Essential Fat' },
    { range: [14, 20], category: 'Athletes' },
    { range: [21, 24], category: 'Fitness' },
    { range: [25, 31], category: 'Average' },
    { range: [32, 100], category: 'Obese' }
  ]
};

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [method, setMethod] = useState<'navy' | 'skinfold' | 'bmi'>('navy');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  
  // Basic measurements
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  
  // Navy method measurements
  const [neck, setNeck] = useState<string>('');
  const [waist, setWaist] = useState<string>('');
  const [hip, setHip] = useState<string>(''); // for females
  
  // Skinfold measurements
  const [chest, setChest] = useState<string>('');
  const [abdomen, setAbdomen] = useState<string>('');
  const [thigh, setThigh] = useState<string>('');
  const [tricep, setTricep] = useState<string>('');
  const [suprailiac, setSuprailiac] = useState<string>('');
  
  const [results, setResults] = useState<BodyFatResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateBodyFat = () => {
    setError('');
    try {
      let bodyFatPercentage: number;
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);

      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        weightKg = weightKg * 0.45359237; // lb to kg
        heightCm = heightCm * 2.54; // inches to cm
      }

      if (isNaN(weightKg) || isNaN(heightCm)) {
        throw new Error('Please enter valid numbers for height and weight');
      }

      switch (method) {
        case 'navy': {
          const neckCm = unit === 'metric' ? parseFloat(neck) : parseFloat(neck) * 2.54;
          const waistCm = unit === 'metric' ? parseFloat(waist) : parseFloat(waist) * 2.54;
          
          if (isNaN(neckCm) || isNaN(waistCm)) {
            throw new Error('Please enter valid measurements for neck and waist');
          }

          if (gender === 'male') {
            bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
          } else {
            const hipCm = unit === 'metric' ? parseFloat(hip) : parseFloat(hip) * 2.54;
            if (isNaN(hipCm)) {
              throw new Error('Please enter valid hip measurement');
            }
            bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
          }
          break;
        }
        
        case 'skinfold': {
          // Jackson-Pollock method
          const measurements = [
            parseFloat(chest),
            parseFloat(abdomen),
            parseFloat(thigh)
          ];

          if (measurements.some(isNaN)) {
            throw new Error('Please enter valid skinfold measurements');
          }

          const sum = measurements.reduce((a, b) => a + b, 0);
          
          if (gender === 'male') {
            bodyFatPercentage = 495 / (1.10938 - 0.0008267 * sum + 0.0000016 * sum * sum - 0.0002574 * 25) - 450;
          } else {
            bodyFatPercentage = 495 / (1.089733 - 0.0009245 * sum + 0.0000025 * sum * sum - 0.0000979 * 25) - 450;
          }
          break;
        }
        
        case 'bmi': {
          // BMI method (least accurate)
          const heightM = heightCm / 100;
          const bmi = weightKg / (heightM * heightM);
          bodyFatPercentage = (1.2 * bmi) + (0.23 * 25) - (10.8 * (gender === 'male' ? 1 : 0)) - 5.4;
          break;
        }
        
        default:
          throw new Error('Please select a valid measurement method');
      }

      // Ensure body fat percentage is within reasonable limits
      bodyFatPercentage = Math.max(2, Math.min(bodyFatPercentage, 60));

      // Calculate fat mass and lean mass
      const fatMass = (bodyFatPercentage / 100) * weightKg;
      const leanMass = weightKg - fatMass;

      // Determine category
      const categories = BODY_FAT_CATEGORIES[gender];
      const category = categories.find(cat => 
        bodyFatPercentage >= cat.range[0] && bodyFatPercentage <= cat.range[1]
      )?.category || 'Unknown';

      // Set healthy range based on gender
      const healthyRange = {
        male: { min: 8, max: 19 },
        female: { min: 21, max: 33 }
      }[gender];

      setResults({
        bodyFatPercentage,
        fatMass,
        leanMass,
        category,
        healthyRange,
        method
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setGender('male');
    setMethod('navy');
    setUnit('metric');
    setWeight('70');
    setHeight('170');
    setNeck('');
    setWaist('');
    setHip('');
    setChest('');
    setAbdomen('');
    setThigh('');
    setTricep('');
    setSuprailiac('');
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
              Body Fat Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your body fat percentage using various measurement methods. Get accurate estimates and understand your body composition better.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Multiple measurement methods',
                  'Gender-specific calculations',
                  'Body composition analysis',
                  'Health category classification',
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
                      <Label htmlFor="method">Method</Label>
                      <Select
                        value={method}
                        onValueChange={(value: 'navy' | 'skinfold' | 'bmi') => setMethod(value)}
                      >
                        <SelectTrigger id="method" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {MEASUREMENT_METHODS.map((m) => (
                            <SelectItem key={m.value} value={m.value}>
                              {m.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500">
                        {MEASUREMENT_METHODS.find(m => m.value === method)?.description}
                      </p>
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
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lb'})</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  {method === 'navy' && (
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="neck">Neck ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                        <Input
                          id="neck"
                          type="number"
                          value={neck}
                          onChange={(e) => setNeck(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="waist">Waist ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                        <Input
                          id="waist"
                          type="number"
                          value={waist}
                          onChange={(e) => setWaist(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      {gender === 'female' && (
                        <div className="space-y-2">
                          <Label htmlFor="hip">Hip ({unit === 'metric' ? 'cm' : 'inches'})</Label>
                          <Input
                            id="hip"
                            type="number"
                            value={hip}
                            onChange={(e) => setHip(e.target.value)}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {method === 'skinfold' && (
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="chest">Chest (mm)</Label>
                        <Input
                          id="chest"
                          type="number"
                          value={chest}
                          onChange={(e) => setChest(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="abdomen">Abdomen (mm)</Label>
                        <Input
                          id="abdomen"
                          type="number"
                          value={abdomen}
                          onChange={(e) => setAbdomen(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="thigh">Thigh (mm)</Label>
                        <Input
                          id="thigh"
                          type="number"
                          value={thigh}
                          onChange={(e) => setThigh(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      onClick={calculateBodyFat}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate Body Fat
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
                      <p className="text-sm text-indigo-600 font-medium mb-1">Body Fat Percentage</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.bodyFatPercentage.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Category</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.category}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-blue-600">Body Composition</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Fat Mass</p>
                        <p className="text-gray-600">
                          {results.fatMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Lean Mass</p>
                        <p className="text-gray-600">
                          {results.leanMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lb'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-600 font-medium mb-2">Healthy Range</p>
                    <p className="text-gray-600">
                      For your gender, a healthy body fat percentage range is {results.healthyRange.min}% to {results.healthyRange.max}%
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Results are estimates based on the {results.method} method</li>
                      <li>Body fat percentage can vary throughout the day</li>
                      <li>For most accurate results, take measurements at the same time of day</li>
                      <li>Consult a healthcare provider for professional assessment</li>
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