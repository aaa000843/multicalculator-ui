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

interface Course {
  name: string;
  grade: string;
  credits: string;
}

interface GPAResult {
  gpa: number;
  totalCredits: number;
  qualityPoints: number;
}

const GRADE_POINTS: { [key: string]: number } = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: '', grade: '', credits: '' }
  ]);
  const [cumulativeGPA, setCumulativeGPA] = useState('');
  const [cumulativeCredits, setCumulativeCredits] = useState('');
  const [result, setResult] = useState<GPAResult | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('semester');

  const handleAddCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: '' }]);
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const calculateGPA = () => {
    setError('');
    setResult(null);

    try {
      let totalQualityPoints = 0;
      let totalCredits = 0;

      // Validate and calculate for current courses
      for (const course of courses) {
        if (!course.grade || !course.credits) {
          throw new Error('Please fill in all grade and credit fields');
        }

        const credits = parseFloat(course.credits);
        if (isNaN(credits) || credits <= 0) {
          throw new Error('Credits must be a positive number');
        }

        if (!GRADE_POINTS.hasOwnProperty(course.grade)) {
          throw new Error('Invalid grade entered');
        }

        totalQualityPoints += GRADE_POINTS[course.grade] * credits;
        totalCredits += credits;
      }

      // Include cumulative GPA if in cumulative mode
      if (activeTab === 'cumulative') {
        if (!cumulativeGPA || !cumulativeCredits) {
          throw new Error('Please enter both cumulative GPA and credits');
        }

        const prevGPA = parseFloat(cumulativeGPA);
        const prevCredits = parseFloat(cumulativeCredits);

        if (isNaN(prevGPA) || prevGPA < 0 || prevGPA > 4.0) {
          throw new Error('Cumulative GPA must be between 0.0 and 4.0');
        }

        if (isNaN(prevCredits) || prevCredits <= 0) {
          throw new Error('Cumulative credits must be a positive number');
        }

        totalQualityPoints += prevGPA * prevCredits;
        totalCredits += prevCredits;
      }

      const gpa = totalQualityPoints / totalCredits;

      setResult({
        gpa,
        totalCredits,
        qualityPoints: totalQualityPoints
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setCourses([{ name: '', grade: '', credits: '' }]);
    setCumulativeGPA('');
    setCumulativeCredits('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            GPA Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate your semester or cumulative Grade Point Average (GPA).
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <div className="p-6 space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="semester">Semester GPA</TabsTrigger>
                  <TabsTrigger value="cumulative">Cumulative GPA</TabsTrigger>
                </TabsList>

                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                {activeTab === 'cumulative' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <Label>Previous Cumulative GPA</Label>
                      <Input
                        type="number"
                        min="0"
                        max="4"
                        step="0.01"
                        value={cumulativeGPA}
                        onChange={(e) => setCumulativeGPA(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <Label>Previous Total Credits</Label>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        value={cumulativeCredits}
                        onChange={(e) => setCumulativeCredits(e.target.value)}
                        className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {courses.map((course, index) => (
                    <div key={index} className="space-y-4 pt-4 first:pt-0 border-t first:border-t-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-indigo-600">Course {index + 1}</h3>
                        {index > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRemoveCourse(index)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label>Course Name (Optional)</Label>
                          <Input
                            type="text"
                            value={course.name}
                            onChange={(e) => {
                              const newCourses = [...courses];
                              newCourses[index].name = e.target.value;
                              setCourses(newCourses);
                            }}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                        <div>
                          <Label>Grade</Label>
                          <Select
                            value={course.grade}
                            onValueChange={(value) => {
                              const newCourses = [...courses];
                              newCourses[index].grade = value;
                              setCourses(newCourses);
                            }}
                          >
                            <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(GRADE_POINTS).map((grade) => (
                                <SelectItem key={grade} value={grade}>
                                  {grade}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Credits</Label>
                          <Input
                            type="number"
                            min="0"
                            step="0.5"
                            value={course.credits}
                            onChange={(e) => {
                              const newCourses = [...courses];
                              newCourses[index].credits = e.target.value;
                              setCourses(newCourses);
                            }}
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={handleAddCourse}
                    className="w-full border-purple-200 text-indigo-600 hover:bg-purple-50"
                  >
                    Add Course
                  </Button>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={calculateGPA}
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
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">GPA</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.gpa.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Credits</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.totalCredits.toFixed(1)}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Quality Points</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.qualityPoints.toFixed(1)}
                        </p>
                      </div>
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