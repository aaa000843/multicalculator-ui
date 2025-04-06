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

type CalculationType = 'threeSides' | 'twoSidesAngle' | 'baseHeight' | 'rightTriangle';

interface TriangleResult {
  area: number;
  perimeter: number;
  angles: [number, number, number];
  sides: [number, number, number];
  height: number;
  type: string;
  isRight: boolean;
}

const CALCULATION_TYPES: { value: CalculationType; label: string }[] = [
  { value: 'threeSides', label: 'Three Sides (SSS)' },
  { value: 'twoSidesAngle', label: 'Two Sides and Angle (SAS)' },
  { value: 'baseHeight', label: 'Base and Height' },
  { value: 'rightTriangle', label: 'Right Triangle' }
];

export default function TriangleCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('threeSides');
  const [side1, setSide1] = useState<string>('');
  const [side2, setSide2] = useState<string>('');
  const [side3, setSide3] = useState<string>('');
  const [angle, setAngle] = useState<string>('');
  const [base, setBase] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<TriangleResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateTriangleType = (sides: [number, number, number]): string => {
    const [a, b, c] = sides.sort((x, y) => x - y);
    const tolerance = 0.0001; // For floating-point comparisons

    if (Math.abs(a - b) < tolerance && Math.abs(b - c) < tolerance) {
      return 'Equilateral';
    } else if (
      Math.abs(a - b) < tolerance ||
      Math.abs(b - c) < tolerance ||
      Math.abs(a - c) < tolerance
    ) {
      return 'Isosceles';
    }
    return 'Scalene';
  };

  const isRightTriangle = (sides: [number, number, number]): boolean => {
    const [a, b, c] = sides.sort((x, y) => x - y);
    const tolerance = 0.0001;
    return Math.abs(a * a + b * b - c * c) < tolerance;
  };

  const degreesToRadians = (degrees: number): number => degrees * Math.PI / 180;
  const radiansToDegrees = (radians: number): number => radians * 180 / Math.PI;

  const calculateAngles = (sides: [number, number, number]): [number, number, number] => {
    const [a, b, c] = sides;
    const cosA = (b * b + c * c - a * a) / (2 * b * c);
    const cosB = (a * a + c * c - b * b) / (2 * a * c);
    const cosC = (a * a + b * b - c * c) / (2 * a * b);

    return [
      radiansToDegrees(Math.acos(cosA)),
      radiansToDegrees(Math.acos(cosB)),
      radiansToDegrees(Math.acos(cosC))
    ];
  };

  const calculateArea = (sides: [number, number, number]): number => {
    const [a, b, c] = sides;
    const s = (a + b + c) / 2; // Semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    try {
      let sides: [number, number, number];
      let area: number;
      let angles: [number, number, number];

      switch (calculationType) {
        case 'threeSides': {
          const a = parseFloat(side1);
          const b = parseFloat(side2);
          const c = parseFloat(side3);

          if (isNaN(a) || isNaN(b) || isNaN(c)) {
            throw new Error('Please enter valid numbers for all sides');
          }

          if (a + b <= c || b + c <= a || a + c <= b) {
            throw new Error('The sum of any two sides must be greater than the third side');
          }

          sides = [a, b, c];
          area = calculateArea(sides);
          angles = calculateAngles(sides);
          break;
        }

        case 'twoSidesAngle': {
          const a = parseFloat(side1);
          const b = parseFloat(side2);
          const angleC = parseFloat(angle);

          if (isNaN(a) || isNaN(b) || isNaN(angleC)) {
            throw new Error('Please enter valid numbers for sides and angle');
          }

          if (angleC >= 180 || angleC <= 0) {
            throw new Error('Angle must be between 0 and 180 degrees');
          }

          const c = Math.sqrt(
            a * a + b * b - 2 * a * b * Math.cos(degreesToRadians(angleC))
          );
          sides = [a, b, c];
          area = (a * b * Math.sin(degreesToRadians(angleC))) / 2;
          angles = calculateAngles(sides);
          break;
        }

        case 'baseHeight': {
          const b = parseFloat(base);
          const h = parseFloat(height);

          if (isNaN(b) || isNaN(h)) {
            throw new Error('Please enter valid numbers for base and height');
          }

          area = (b * h) / 2;
          // For base-height, we can only calculate area accurately
          sides = [b, Math.sqrt(b * b + h * h), Math.sqrt(b * b + h * h)];
          angles = [90, 45, 45]; // Approximation for display
          break;
        }

        case 'rightTriangle': {
          const a = parseFloat(side1);
          const b = parseFloat(side2);

          if (isNaN(a) || isNaN(b)) {
            throw new Error('Please enter valid numbers for both sides');
          }

          const c = Math.sqrt(a * a + b * b);
          sides = [a, b, c];
          area = (a * b) / 2;
          angles = [
            90,
            radiansToDegrees(Math.atan(a / b)),
            radiansToDegrees(Math.atan(b / a))
          ];
          break;
        }

        default:
          throw new Error('Invalid calculation type');
      }

      const triangleType = calculateTriangleType(sides);
      const isRight = isRightTriangle(sides);
      const perimeter = sides.reduce((sum, side) => sum + side, 0);
      const triangleHeight = (2 * area) / sides[0]; // Height relative to the first side

      setResult({
        area,
        perimeter,
        angles,
        sides,
        height: triangleHeight,
        type: triangleType,
        isRight
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleReset = () => {
    setSide1('');
    setSide2('');
    setSide3('');
    setAngle('');
    setBase('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Triangle Calculator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Calculate triangle properties using different methods. Supports area, perimeter, angles, and more.
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
                  <Label>Calculation Method</Label>
                  <Select
                    value={calculationType}
                    onValueChange={(value: CalculationType) => {
                      setCalculationType(value);
                      handleReset();
                    }}
                  >
                    <SelectTrigger className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CALCULATION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {calculationType === 'threeSides' && (
                    <>
                      <div>
                        <Label>Side a</Label>
                        <Input
                          type="number"
                          value={side1}
                          onChange={(e) => setSide1(e.target.value)}
                          placeholder="Enter length of side a"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Side b</Label>
                        <Input
                          type="number"
                          value={side2}
                          onChange={(e) => setSide2(e.target.value)}
                          placeholder="Enter length of side b"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Side c</Label>
                        <Input
                          type="number"
                          value={side3}
                          onChange={(e) => setSide3(e.target.value)}
                          placeholder="Enter length of side c"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </>
                  )}

                  {calculationType === 'twoSidesAngle' && (
                    <>
                      <div>
                        <Label>Side a</Label>
                        <Input
                          type="number"
                          value={side1}
                          onChange={(e) => setSide1(e.target.value)}
                          placeholder="Enter length of side a"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Side b</Label>
                        <Input
                          type="number"
                          value={side2}
                          onChange={(e) => setSide2(e.target.value)}
                          placeholder="Enter length of side b"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Included Angle (degrees)</Label>
                        <Input
                          type="number"
                          value={angle}
                          onChange={(e) => setAngle(e.target.value)}
                          placeholder="Enter angle in degrees"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </>
                  )}

                  {calculationType === 'baseHeight' && (
                    <>
                      <div>
                        <Label>Base</Label>
                        <Input
                          type="number"
                          value={base}
                          onChange={(e) => setBase(e.target.value)}
                          placeholder="Enter length of base"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Height</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="Enter height"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </>
                  )}

                  {calculationType === 'rightTriangle' && (
                    <>
                      <div>
                        <Label>Base</Label>
                        <Input
                          type="number"
                          value={side1}
                          onChange={(e) => setSide1(e.target.value)}
                          placeholder="Enter length of base"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div>
                        <Label>Height</Label>
                        <Input
                          type="number"
                          value={side2}
                          onChange={(e) => setSide2(e.target.value)}
                          placeholder="Enter height"
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </>
                  )}
                </div>

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
                        <p className="text-sm text-indigo-600 font-medium mb-1">Area</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.area.toFixed(4)} square units
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Perimeter</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.perimeter.toFixed(4)} units
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Angles</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.angles.map(angle => angle.toFixed(2)).join('°, ')}°
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Sides</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.sides.map(side => side.toFixed(2)).join(', ')} units
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Height</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.height.toFixed(4)} units
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Triangle Type</p>
                        <p className="text-lg font-bold text-indigo-600">
                          {result.type}{result.isRight ? ' (Right Triangle)' : ''}
                        </p>
                      </div>
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