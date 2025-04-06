"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

interface PaceResult {
  pacePerKm: string;
  pacePerMile: string;
  speedKph: number;
  speedMph: number;
  totalSeconds: number;
  splits: {
    distance: number;
    time: string;
  }[];
}

const DISTANCE_PRESETS = [
  { label: '5K', value: '5' },
  { label: '10K', value: '10' },
  { label: 'Half Marathon', value: '21.0975' },
  { label: 'Marathon', value: '42.195' },
];

const UNIT_SYSTEMS = [
  { label: 'Kilometers', value: 'km' },
  { label: 'Miles', value: 'miles' },
];

export default function PaceCalculator() {
  const [distance, setDistance] = useState<string>('5');
  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('25');
  const [seconds, setSeconds] = useState<string>('0');
  const [unit, setUnit] = useState<'km' | 'miles'>('km');
  const [results, setResults] = useState<PaceResult | null>(null);
  const [error, setError] = useState<string>('');

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculatePace = () => {
    setError('');
    try {
      const distanceNum = parseFloat(distance);
      const hoursNum = parseInt(hours) || 0;
      const minutesNum = parseInt(minutes) || 0;
      const secondsNum = parseInt(seconds) || 0;

      if (isNaN(distanceNum) || distanceNum <= 0) {
        throw new Error('Please enter a valid distance');
      }

      if (hoursNum === 0 && minutesNum === 0 && secondsNum === 0) {
        throw new Error('Please enter a valid time');
      }

      const totalSeconds = (hoursNum * 3600) + (minutesNum * 60) + secondsNum;
      let distanceInKm = unit === 'km' ? distanceNum : distanceNum * 1.60934;
      let distanceInMiles = unit === 'miles' ? distanceNum : distanceNum * 0.621371;

      // Calculate pace per km and mile
      const secondsPerKm = totalSeconds / distanceInKm;
      const secondsPerMile = totalSeconds / distanceInMiles;

      // Calculate speed
      const speedKph = (distanceInKm / totalSeconds) * 3600;
      const speedMph = (distanceInMiles / totalSeconds) * 3600;

      // Generate splits (every km or mile based on unit)
      const splits = [];
      const splitDistance = unit === 'km' ? 1 : 1.60934; // 1 km or 1 mile
      let currentDistance = splitDistance;
      
      while (currentDistance <= distanceNum) {
        splits.push({
          distance: currentDistance,
          time: formatTime(Math.round(secondsPerKm * currentDistance))
        });
        currentDistance += splitDistance;
      }

      // Add final split if not exact
      if (currentDistance - splitDistance < distanceNum) {
        splits.push({
          distance: distanceNum,
          time: formatTime(totalSeconds)
        });
      }

      setResults({
        pacePerKm: formatTime(Math.round(secondsPerKm)),
        pacePerMile: formatTime(Math.round(secondsPerMile)),
        speedKph: speedKph,
        speedMph: speedMph,
        totalSeconds,
        splits
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setDistance('5');
    setHours('0');
    setMinutes('25');
    setSeconds('0');
    setUnit('km');
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
              Pace Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Calculate your running pace, speed, and split times. Perfect for planning your training sessions and races.
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'Instant pace calculations',
                  'Common race distance presets',
                  'Detailed split times',
                  'Speed in km/h and mph',
                  'Flexible unit options'
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
                      <Label htmlFor="unit">Distance Unit</Label>
                      <Select
                        value={unit}
                        onValueChange={(value: 'km' | 'miles') => setUnit(value)}
                      >
                        <SelectTrigger id="unit" className="border-purple-100 focus:border-purple-300 focus:ring-purple-200">
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {UNIT_SYSTEMS.map((unitSystem) => (
                            <SelectItem key={unitSystem.value} value={unitSystem.value}>
                              {unitSystem.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="distance">Distance ({unit})</Label>
                      <div className="relative">
                        <Input
                          id="distance"
                          type="number"
                          value={distance}
                          onChange={(e) => setDistance(e.target.value)}
                          placeholder={`Enter distance in ${unit}`}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Common Race Distances</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {DISTANCE_PRESETS.map((preset) => (
                        <Button
                          key={preset.value}
                          type="button"
                          variant="outline"
                          className="border-purple-100 hover:border-purple-300 hover:bg-purple-50"
                          onClick={() => setDistance(preset.value)}
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hours">Hours</Label>
                        <Input
                          id="hours"
                          type="number"
                          min="0"
                          max="99"
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="minutes">Minutes</Label>
                        <Input
                          id="minutes"
                          type="number"
                          min="0"
                          max="59"
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seconds">Seconds</Label>
                        <Input
                          id="seconds"
                          type="number"
                          min="0"
                          max="59"
                          value={seconds}
                          onChange={(e) => setSeconds(e.target.value)}
                          className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button 
                      onClick={calculatePace}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                    >
                      Calculate Pace
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
                      <p className="text-sm text-indigo-600 font-medium mb-1">Pace per km</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.pacePerKm} /km
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Pace per mile</p>
                      <p className="text-lg font-bold text-indigo-600">
                        {results.pacePerMile} /mile
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium mb-1">Speed (km/h)</p>
                      <p className="text-lg font-bold text-blue-600">
                        {results.speedKph.toFixed(2)} km/h
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 font-medium mb-1">Speed (mph)</p>
                      <p className="text-lg font-bold text-blue-600">
                        {results.speedMph.toFixed(2)} mph
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg space-y-4">
                    <h3 className="font-semibold text-green-600">Split Times</h3>
                    <div className="grid gap-2">
                      {results.splits.map((split, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-gray-600">
                            {split.distance} {unit}
                          </span>
                          <span className="font-medium text-green-600">{split.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Training Tips:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Start with a proper warm-up</li>
                      <li>Maintain consistent pacing</li>
                      <li>Use splits to track progress</li>
                      <li>Stay hydrated during longer runs</li>
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