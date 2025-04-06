"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface CalorieResult {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  extremeWeightLoss: number;
  weightGain: number;
  extremeWeightGain: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

const ACTIVITY_LEVELS = [
  { value: '1.2', label: 'Sedentary (little or no exercise)', description: 'Office job, desk work' },
  { value: '1.375', label: 'Lightly Active (light exercise 1-3 days/week)', description: 'Light walks, yoga, casual cycling' },
  { value: '1.55', label: 'Moderately Active (moderate exercise 3-5 days/week)', description: 'Running, swimming, sports' },
  { value: '1.725', label: 'Very Active (hard exercise 6-7 days/week)', description: 'Daily intense workouts' },
  { value: '1.9', label: 'Extremely Active (very hard exercise, physical job)', description: 'Athletes, construction workers' }
];

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('170');
  const [activityLevel, setActivityLevel] = useState<string>('1.2');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [results, setResults] = useState<CalorieResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateCalories = () => {
    setError('');
    try {
      const ageNum = parseInt(age);
      let weightKg = parseFloat(weight);
      let heightCm = parseFloat(height);
      const activity = parseFloat(activityLevel);

      // Convert imperial to metric if needed
      if (unit === 'imperial') {
        weightKg = weightKg * 0.45359237; // lb to kg
        heightCm = heightCm * 2.54; // inches to cm
      }

      if (isNaN(ageNum) || isNaN(weightKg) || isNaN(heightCm) || isNaN(activity)) {
        throw new Error('Please enter valid numbers for all fields');
      }

      if (ageNum < 15 || ageNum > 80) {
        throw new Error('Age should be between 15 and 80 years');
      }

      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr;
      if (gender === 'male') {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
      } else {
        bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
      }

      const maintenance = bmr * activity;
      
      // Calculate different calorie goals
      const result: CalorieResult = {
        bmr: Math.round(bmr),
        maintenance: Math.round(maintenance),
        weightLoss: Math.round(maintenance - 500), // 500 calorie deficit
        extremeWeightLoss: Math.round(maintenance - 1000), // 1000 calorie deficit
        weightGain: Math.round(maintenance + 500), // 500 calorie surplus
        extremeWeightGain: Math.round(maintenance + 1000), // 1000 calorie surplus
        macros: {
          protein: Math.round(weightKg * 2.2), // 2.2g per kg of body weight
          carbs: Math.round((maintenance * 0.45) / 4), // 45% of calories from carbs
          fats: Math.round((maintenance * 0.25) / 9) // 25% of calories from fats
        }
      };

      setResults(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setAge('30');
    setGender('male');
    setWeight('70');
    setHeight('170');
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
              Calorie Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your daily caloric needs based on your activity level and personal characteristics. Get personalized recommendations for weight loss, maintenance, or gain.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Daily calorie requirements',
                  'Personalized macro breakdown',
                  'Multiple activity levels',
                  'Weight management goals',
                  'Scientific calculations'
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

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age (years)</Label>
                      <Input
                        id="age"
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter age"
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
                        placeholder="Enter height"
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
                        placeholder="Enter weight"
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
                      onClick={calculateCalories}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate Calories
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
                  
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Base Metabolic Rate</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {results.bmr.toLocaleString()} calories/day
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Maintenance Calories</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {results.maintenance.toLocaleString()} calories/day
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg space-y-4">
                      <h3 className="font-semibold text-blue-600">Weight Management Goals</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Weight Loss</p>
                          <p className="text-gray-600">{results.weightLoss.toLocaleString()} calories/day</p>
                          <p className="text-sm text-gray-500">(-500 calories/day)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">Extreme Weight Loss</p>
                          <p className="text-gray-600">{results.extremeWeightLoss.toLocaleString()} calories/day</p>
                          <p className="text-sm text-gray-500">(-1000 calories/day)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">Weight Gain</p>
                          <p className="text-gray-600">{results.weightGain.toLocaleString()} calories/day</p>
                          <p className="text-sm text-gray-500">(+500 calories/day)</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">Extreme Weight Gain</p>
                          <p className="text-gray-600">{results.extremeWeightGain.toLocaleString()} calories/day</p>
                          <p className="text-sm text-gray-500">(+1000 calories/day)</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg space-y-4">
                      <h3 className="font-semibold text-green-600">Recommended Macronutrients</h3>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium text-green-600">Protein</p>
                          <p className="text-gray-600">{results.macros.protein}g</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600">Carbohydrates</p>
                          <p className="text-gray-600">{results.macros.carbs}g</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-600">Fats</p>
                          <p className="text-gray-600">{results.macros.fats}g</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p className="font-medium mb-2">Important Notes:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>These calculations are estimates based on averages</li>
                        <li>Consult a healthcare provider before starting any diet</li>
                        <li>Adjust intake based on your progress and goals</li>
                        <li>Stay hydrated and maintain a balanced diet</li>
                      </ul>
                    </div>
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