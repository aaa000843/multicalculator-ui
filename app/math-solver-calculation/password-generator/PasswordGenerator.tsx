"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export default function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true
  });

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string>('');

  const generatePassword = () => {
    setError('');
    setCopied(false);

    try {
      let chars = '';
      if (options.includeUppercase) chars += CHAR_SETS.uppercase;
      if (options.includeLowercase) chars += CHAR_SETS.lowercase;
      if (options.includeNumbers) chars += CHAR_SETS.numbers;
      if (options.includeSymbols) chars += CHAR_SETS.symbols;

      if (!chars) {
        throw new Error('Please select at least one character type');
      }

      let result = '';
      const array = new Uint32Array(options.length);
      // crypto.getRandomValues(array);

      for (let i = 0; i < options.length; i++) {
        result += chars[array[i] % chars.length];
      }

      // Ensure at least one character from each selected type
      const requirements: { type: keyof typeof CHAR_SETS; include: boolean }[] = [
        { type: 'uppercase', include: options.includeUppercase },
        { type: 'lowercase', include: options.includeLowercase },
        { type: 'numbers', include: options.includeNumbers },
        { type: 'symbols', include: options.includeSymbols }
      ];

      for (const { type, include } of requirements) {
        if (include && !new RegExp(`[${CHAR_SETS[type]}]`).test(result)) {
          const pos = Math.floor(Math.random() * options.length);
          const char = CHAR_SETS[type][Math.floor(Math.random() * CHAR_SETS[type].length)];
          result = result.substring(0, pos) + char + result.substring(pos + 1);
        }
      }

      setPassword(result);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy password');
    }
  };

  const calculateStrength = (pwd: string): PasswordStrength => {
    if (!pwd) return { score: 0, label: 'None', color: 'bg-gray-200' };

    let score = 0;
    const checks = [
      { regex: /[A-Z]/, points: 1 }, // Uppercase
      { regex: /[a-z]/, points: 1 }, // Lowercase
      { regex: /[0-9]/, points: 1 }, // Numbers
      { regex: /[^A-Za-z0-9]/, points: 1 }, // Symbols
      { regex: /.{8,}/, points: 1 }, // Length >= 8
      { regex: /.{12,}/, points: 1 }, // Length >= 12
      { regex: /.{16,}/, points: 1 }, // Length >= 16
      { regex: /^(?!.*(.)\1{2,}).*$/, points: 1 } // No character repeated 3+ times
    ];

    for (const { regex, points } of checks) {
      if (regex.test(pwd)) score += points;
    }

    const strength: { [key: number]: PasswordStrength } = {
      0: { score: 0, label: 'Very Weak', color: 'bg-red-500' },
      1: { score: 20, label: 'Very Weak', color: 'bg-red-500' },
      2: { score: 40, label: 'Weak', color: 'bg-orange-500' },
      3: { score: 60, label: 'Medium', color: 'bg-yellow-500' },
      4: { score: 80, label: 'Strong', color: 'bg-green-500' },
      5: { score: 100, label: 'Very Strong', color: 'bg-green-600' }
    };

    return strength[Math.min(Math.floor(score / 2), 5)];
  };

  const strength = calculateStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumb />
        
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Password Generator
          </h1>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-600">
              Generate secure passwords with customizable options and check their strength.
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
                  <Label>Password Length: {options.length}</Label>
                  <Slider
                    value={[options.length]}
                    onValueChange={([value]) => setOptions({ ...options, length: value })}
                    min={8}
                    max={32}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Include Uppercase Letters</Label>
                    <Switch
                      checked={options.includeUppercase}
                      onCheckedChange={(checked) => setOptions({ ...options, includeUppercase: checked })}
                      className="data-[state=checked]:bg-indigo-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Lowercase Letters</Label>
                    <Switch
                      checked={options.includeLowercase}
                      onCheckedChange={(checked) => setOptions({ ...options, includeLowercase: checked })}
                      className="data-[state=checked]:bg-indigo-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Numbers</Label>
                    <Switch
                      checked={options.includeNumbers}
                      onCheckedChange={(checked) => setOptions({ ...options, includeNumbers: checked })}
                      className="data-[state=checked]:bg-indigo-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Include Symbols</Label>
                    <Switch
                      checked={options.includeSymbols}
                      onCheckedChange={(checked) => setOptions({ ...options, includeSymbols: checked })}
                      className="data-[state=checked]:bg-indigo-600"
                    />
                  </div>
                </div>

                <Button
                  onClick={generatePassword}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate Password
                </Button>

                {password && (
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        value={password}
                        readOnly
                        className="pr-24 font-mono text-lg border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                      />
                      <Button
                        onClick={copyToClipboard}
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Password Strength</span>
                        <span className={strength.color.replace('bg-', 'text-')}>
                          {strength.label}
                        </span>
                      </div>
                      <Progress value={strength.score} className={`h-2 ${strength.color}`} />
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t space-y-4">
                  <h3 className="text-lg font-semibold text-indigo-600">Password Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Use a minimum length of 12 characters</li>
                    <li>• Include a mix of uppercase and lowercase letters</li>
                    <li>• Add numbers and special characters</li>
                    <li>• Avoid using personal information</li>
                    <li>• Use different passwords for different accounts</li>
                    <li>• Consider using a password manager</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 