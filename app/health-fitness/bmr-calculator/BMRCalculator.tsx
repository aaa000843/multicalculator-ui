"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface BMRResult {
  bmr: number;
  tdee: number;
  formulas: {
    harrisBenedict: number;
    mifflinStJeor: number;
    katchMcArdle?: number;
  };
  dailyCalories: {
    sedentary: number;
    light: number;
    moderate: number;
    active: number;
    veryActive: number;
  };
}

const ACTIVITY_LEVELS = [
  { value: '1.2', label: 'Sedentary', description: 'Little or no exercise' },
  { value: '1.375', label: 'Lightly Active', description: '1-3 days/week' },
  { value: '1.55', label: 'Moderately Active', description: '3-5 days/week' },
  { value: '1.725', label: 'Very Active', description: '6-7 days/week' },
  { value: '1.9', label: 'Extremely Active', description: 'Very intense daily exercise/sports' }
];

export default function BMRCalculator() {
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [bodyFat, setBodyFat] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<BMRResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateBMR = () => {
    setError('');
    try {
      const ageNum = parseInt(age);
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);
      const bodyFatPercentage = bodyFat ? parseFloat(bodyFat) : null;
      const activity = parseFloat(activityLevel);

      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        weightKg = weightKg * 0.45359237; // lb to kg
        heightCm = heightCm * 2.54; // inches to cm
      }

      if (isNaN(ageNum) || isNaN(weightKg) || isNaN(heightCm) || isNaN(activity)) {
        throw new Error('Please enter valid numbers');
      }

      // Calculate BMR using different formulas
      // 1. Harris-Benedict Formula
      let harrisBenedict;
      if (gender === 'male') {
        harrisBenedict = 66.47 + (13.75 * weightKg) + (5.003 * heightCm) - (6.755 * ageNum);
      } else {
        harrisBenedict = 655.1 + (9.563 * weightKg) + (1.850 * heightCm) - (4.676 * ageNum);
      }

      // 2. Mifflin-St Jeor Formula
      let mifflinStJeor;
      if (gender === 'male') {
        mifflinStJeor = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) + 5;
      } else {
        mifflinStJeor = (10 * weightKg) + (6.25 * heightCm) - (5 * ageNum) - 161;
      }

      // 3. Katch-McArdle Formula (if body fat is provided)
      let katchMcArdle;
      if (bodyFatPercentage !== null && !isNaN(bodyFatPercentage)) {
        const leanMass = weightKg * (1 - (bodyFatPercentage / 100));
        katchMcArdle = 370 + (21.6 * leanMass);
      }

      // Use Mifflin-St Jeor as the primary BMR
      const bmr = mifflinStJeor;
      const tdee = bmr * activity;

      setResults({
        bmr,
        tdee,
        formulas: {
          harrisBenedict,
          mifflinStJeor,
          ...(katchMcArdle && { katchMcArdle })
        },
        dailyCalories: {
          sedentary: Math.round(bmr * 1.2),
          light: Math.round(bmr * 1.375),
          moderate: Math.round(bmr * 1.55),
          active: Math.round(bmr * 1.725),
          veryActive: Math.round(bmr * 1.9)
        }
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setAge('30');
    setGender('male');
    setWeight('70');
    setHeight('170');
    setBodyFat('');
    setActivityLevel('1.2');
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
              BMR Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using multiple scientific formulas.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Multiple calculation methods',
                  'Activity level adjustments',
                  'Optional body fat input',
                  'Daily calorie recommendations',
                  'Detailed energy expenditure'
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
                  <div className="grid gap-4 sm:grid-cols-2">
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
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age (years)</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
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
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
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

                    <div className="space-y-2">
                      <Label htmlFor="bodyFat">Body Fat % (optional)</Label>
                      <Input
                        id="bodyFat"
                        type="number"
                        value={bodyFat}
                        onChange={(e) => setBodyFat(e.target.value)}
                        placeholder="Enter if known"
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select
                      value={activityLevel}
                      onValueChange={setActivityLevel}
                    >
                      <SelectTrigger id="activity" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {ACTIVITY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      {ACTIVITY_LEVELS.find(level => level.value === activityLevel)?.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      onClick={calculateBMR}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate BMR
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
                      <p className="text-sm text-indigo-600 font-medium mb-1">Base BMR</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {Math.round(results.bmr)} calories/day
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">TDEE</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {Math.round(results.tdee)} calories/day
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-blue-600">BMR by Formula</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Harris-Benedict</p>
                        <p className="text-gray-600">{Math.round(results.formulas.harrisBenedict)} calories/day</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600">Mifflin-St Jeor</p>
                        <p className="text-gray-600">{Math.round(results.formulas.mifflinStJeor)} calories/day</p>
                      </div>
                      {results.formulas.katchMcArdle && (
                        <div>
                          <p className="text-sm font-medium text-blue-600">Katch-McArdle</p>
                          <p className="text-gray-600">{Math.round(results.formulas.katchMcArdle)} calories/day</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-green-600">Daily Calories by Activity Level</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sedentary</span>
                        <span className="font-medium text-green-600">{results.dailyCalories.sedentary} calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Light Exercise</span>
                        <span className="font-medium text-green-600">{results.dailyCalories.light} calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moderate Exercise</span>
                        <span className="font-medium text-green-600">{results.dailyCalories.moderate} calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active</span>
                        <span className="font-medium text-green-600">{results.dailyCalories.active} calories</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Very Active</span>
                        <span className="font-medium text-green-600">{results.dailyCalories.veryActive} calories</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Important Notes:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>BMR calculations are estimates based on averages</li>
                      <li>Results may vary based on individual factors</li>
                      <li>Consult a healthcare provider for personalized advice</li>
                      <li>Regular exercise and proper nutrition are essential</li>
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