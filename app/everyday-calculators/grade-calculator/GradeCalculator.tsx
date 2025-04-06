"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Category {
  name: string;
  weight: string;
  score: string;
}

interface GradeResult {
  currentGrade: number;
  neededForA: number | null;
  neededForB: number | null;
  neededForC: number | null;
  neededForD: number | null;
}

const GRADE_THRESHOLDS = {
  A: 90,
  B: 80,
  C: 70,
  D: 60
};

export default function GradeCalculator() {
  const [categories, setCategories] = useState<Category[]>([
    { name: '', weight: '', score: '' }
  ]);
  const [finalExamWeight, setFinalExamWeight] = useState('');
  const [currentScore, setCurrentScore] = useState('');
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const handleAddCategory = () => {
    setCategories([...categories, { name: '', weight: '', score: '' }]);
  };

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const calculateNeededScore = (targetGrade: number, currentTotal: number, remainingWeight: number) => {
    if (remainingWeight === 0) return null;
    const needed = ((targetGrade - (currentTotal * (100 - remainingWeight) / 100)) / remainingWeight) * 100;
    return needed <= 100 ? needed : null;
  };

  const calculateGrade = () => {
    setError('');
    setResult(null);

    try {
      let totalWeight = 0;
      let weightedScore = 0;

      // Validate and calculate for current categories
      for (const category of categories) {
        if (!category.weight || !category.score) {
          throw new Error('Please fill in all weight and score fields');
        }

        const weight = parseFloat(category.weight);
        const score = parseFloat(category.score);

        if (isNaN(weight) || weight < 0 || weight > 100) {
          throw new Error('Weight must be between 0 and 100');
        }

        if (isNaN(score) || score < 0 || score > 100) {
          throw new Error('Score must be between 0 and 100');
        }

        totalWeight += weight;
        weightedScore += (score * weight);
      }

      if (activeTab === 'final') {
        const examWeight = parseFloat(finalExamWeight);
        if (isNaN(examWeight) || examWeight <= 0 || examWeight > 100) {
          throw new Error('Final exam weight must be between 0 and 100');
        }

        totalWeight += examWeight;
      }

      if (totalWeight !== 100) {
        throw new Error('Total weights must equal 100%');
      }

      const currentGrade = weightedScore / 100;

      let result: GradeResult = {
        currentGrade,
        neededForA: null,
        neededForB: null,
        neededForC: null,
        neededForD: null
      };

      if (activeTab === 'final') {
        const examWeight = parseFloat(finalExamWeight);
        Object.entries(GRADE_THRESHOLDS).forEach(([grade, threshold]) => {
          const needed = calculateNeededScore(threshold, currentGrade, examWeight);
          (result[`neededFor${grade}` as keyof GradeResult] as (number | null)) = needed;
        });
      }

      setResult(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCategories([{ name: '', weight: '', score: '' }]);
    setFinalExamWeight('');
    setCurrentScore('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Grade Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate your current grade or determine what you need on the final exam.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="current">Current Grade</TabsTrigger>
                  <TabsTrigger value="final">Final Exam</TabsTrigger>
                </TabsList>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {activeTab === 'final' && (
                  <div className="pt-4 border-t">
                    <Label>Final Exam Weight (%)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={finalExamWeight}
                      onChange={(e) => setFinalExamWeight(e.target.value)}
                      className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                )}

                <div className="space-y-6">
                  {categories.map((category, index) => (
                    <div key={index} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-indigo-600">Category {index + 1}</h3>
                        {index > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveCategory(index)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label>Category Name (Optional)</Label>
                          <Input
                            type="text"
                            value={category.name}
                            onChange={(e) => {
                              const newCategories = [...categories];
                              newCategories[index].name = e.target.value;
                              setCategories(newCategories);
                            }}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        <div>
                          <Label>Weight (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={category.weight}
                            onChange={(e) => {
                              const newCategories = [...categories];
                              newCategories[index].weight = e.target.value;
                              setCategories(newCategories);
                            }}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        <div>
                          <Label>Score (%)</Label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={category.score}
                            onChange={(e) => {
                              const newCategories = [...categories];
                              newCategories[index].score = e.target.value;
                              setCategories(newCategories);
                            }}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={handleAddCategory}
                    className="w-full border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Add Category
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={calculateGrade}
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

                {result && (
                  <div className="space-y-4 pt-4 border-t">
                    <h2 className="text-xl font-semibold text-indigo-600">Results</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Current Grade</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.currentGrade.toFixed(2)}%
                        </p>
                      </div>
                      {activeTab === 'final' && (
                        <>
                          {result.neededForA !== null && (
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-indigo-600 font-medium mb-1">Needed for A</p>
                              <p className="text-lg font-bold text-indigo-600">
                                {result.neededForA.toFixed(2)}%
                              </p>
                            </div>
                          )}
                          {result.neededForB !== null && (
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-indigo-600 font-medium mb-1">Needed for B</p>
                              <p className="text-lg font-bold text-indigo-600">
                                {result.neededForB.toFixed(2)}%
                              </p>
                            </div>
                          )}
                          {result.neededForC !== null && (
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-indigo-600 font-medium mb-1">Needed for C</p>
                              <p className="text-lg font-bold text-indigo-600">
                                {result.neededForC.toFixed(2)}%
                              </p>
                            </div>
                          )}
                          {result.neededForD !== null && (
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-indigo-600 font-medium mb-1">Needed for D</p>
                              <p className="text-lg font-bold text-indigo-600">
                                {result.neededForD.toFixed(2)}%
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 