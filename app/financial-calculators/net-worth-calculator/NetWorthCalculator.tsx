"use client";

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  value: string;
  category: string;
}

interface Liability {
  id: string;
  name: string;
  amount: string;
  category: string;
}

interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetsByCategory: {
    [key: string]: number;
  };
  liabilitiesByCategory: {
    [key: string]: number;
  };
}

const ASSET_CATEGORIES = [
  'Cash and Bank Accounts',
  'Investments',
  'Real Estate',
  'Vehicles',
  'Personal Property',
  'Business Ownership',
  'Other Assets'
];

const LIABILITY_CATEGORIES = [
  'Mortgages',
  'Car Loans',
  'Student Loans',
  'Credit Cards',
  'Personal Loans',
  'Business Loans',
  'Other Debts'
];

export default function NetWorthCalculator() {
  // Assets
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'Checking Account', value: '5000', category: 'Cash and Bank Accounts' },
    { id: '2', name: 'Investment Portfolio', value: '25000', category: 'Investments' }
  ]);
  
  // Liabilities
  const [liabilities, setLiabilities] = useState<Liability[]>([
    { id: '1', name: 'Credit Card Balance', amount: '2000', category: 'Credit Cards' },
    { id: '2', name: 'Car Loan', amount: '15000', category: 'Car Loans' }
  ]);
  
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<NetWorthResult | null>(null);

  const addAsset = () => {
    const newId = (Math.max(...assets.map(a => parseInt(a.id))) + 1).toString();
    setAssets([...assets, {
      id: newId,
      name: `Asset ${newId}`,
      value: '',
      category: ASSET_CATEGORIES[0]
    }]);
  };

  const removeAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  const updateAsset = (id: string, field: keyof Asset, value: string) => {
    setAssets(assets.map(asset => 
      asset.id === id ? { ...asset, [field]: value } : asset
    ));
  };

  const addLiability = () => {
    const newId = (Math.max(...liabilities.map(l => parseInt(l.id))) + 1).toString();
    setLiabilities([...liabilities, {
      id: newId,
      name: `Liability ${newId}`,
      amount: '',
      category: LIABILITY_CATEGORIES[0]
    }]);
  };

  const removeLiability = (id: string) => {
    setLiabilities(liabilities.filter(l => l.id !== id));
  };

  const updateLiability = (id: string, field: keyof Liability, value: string) => {
    setLiabilities(liabilities.map(liability => 
      liability.id === id ? { ...liability, [field]: value } : liability
    ));
  };

  const calculateNetWorth = () => {
    setError('');
    try {
      // Parse and validate assets
      const parsedAssets = assets.map(asset => ({
        ...asset,
        value: parseFloat(asset.value)
      }));

      if (parsedAssets.some(a => isNaN(a.value) || a.value < 0)) {
        throw new Error('Please enter valid positive numbers for all asset values');
      }

      // Parse and validate liabilities
      const parsedLiabilities = liabilities.map(liability => ({
        ...liability,
        amount: parseFloat(liability.amount)
      }));

      if (parsedLiabilities.some(l => isNaN(l.amount) || l.amount < 0)) {
        throw new Error('Please enter valid positive numbers for all liability amounts');
      }

      // Calculate totals by category
      const assetsByCategory = parsedAssets.reduce((acc, asset) => {
        acc[asset.category] = (acc[asset.category] || 0) + asset.value;
        return acc;
      }, {} as { [key: string]: number });

      const liabilitiesByCategory = parsedLiabilities.reduce((acc, liability) => {
        acc[liability.category] = (acc[liability.category] || 0) + liability.amount;
        return acc;
      }, {} as { [key: string]: number });

      // Calculate totals
      const totalAssets = parsedAssets.reduce((sum, asset) => sum + asset.value, 0);
      const totalLiabilities = parsedLiabilities.reduce((sum, liability) => sum + liability.amount, 0);
      const netWorth = totalAssets - totalLiabilities;

      setResults({
        totalAssets,
        totalLiabilities,
        netWorth,
        assetsByCategory,
        liabilitiesByCategory
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const resetCalculator = () => {
    setAssets([
      { id: '1', name: 'Checking Account', value: '5000', category: 'Cash and Bank Accounts' },
      { id: '2', name: 'Investment Portfolio', value: '25000', category: 'Investments' }
    ]);
    setLiabilities([
      { id: '1', name: 'Credit Card Balance', amount: '2000', category: 'Credit Cards' },
      { id: '2', name: 'Car Loan', amount: '15000', category: 'Car Loans' }
    ]);
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
              Net Worth Calculator
            </h1>
            
            <div className="prose max-w-none mb-6">
              <p className="text-gray-600">
                Track your financial health by calculating your net worth:
              </p>
              <ul className="space-y-2 text-gray-600 list-none pl-0">
                {[
                  'List all your assets and their values',
                  'Track your liabilities and debts',
                  'See your total net worth',
                  'Analyze your wealth by category'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6 space-y-4">
                {error && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-indigo-600">Your Assets</h3>
                    <Button
                      onClick={addAsset}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Asset
                    </Button>
                  </div>
                  
                  {assets.map((asset) => (
                    <div key={asset.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Asset {asset.id}</h4>
                        <Button
                          onClick={() => removeAsset(asset.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`asset-name-${asset.id}`}>Asset Name</Label>
                          <Input
                            id={`asset-name-${asset.id}`}
                            value={asset.name}
                            onChange={(e) => updateAsset(asset.id, 'name', e.target.value)}
                            placeholder="Enter asset name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`asset-value-${asset.id}`}>Value ($)</Label>
                          <Input
                            id={`asset-value-${asset.id}`}
                            type="number"
                            value={asset.value}
                            onChange={(e) => updateAsset(asset.id, 'value', e.target.value)}
                            placeholder="Enter value"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`asset-category-${asset.id}`}>Category</Label>
                          <select
                            id={`asset-category-${asset.id}`}
                            value={asset.category}
                            onChange={(e) => updateAsset(asset.id, 'category', e.target.value)}
                            className="w-full rounded-md border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          >
                            {ASSET_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-indigo-600">Your Liabilities</h3>
                    <Button
                      onClick={addLiability}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 text-indigo-600 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Liability
                    </Button>
                  </div>
                  
                  {liabilities.map((liability) => (
                    <div key={liability.id} className="p-4 border border-purple-100 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-700">Liability {liability.id}</h4>
                        <Button
                          onClick={() => removeLiability(liability.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`liability-name-${liability.id}`}>Liability Name</Label>
                          <Input
                            id={`liability-name-${liability.id}`}
                            value={liability.name}
                            onChange={(e) => updateLiability(liability.id, 'name', e.target.value)}
                            placeholder="Enter liability name"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`liability-amount-${liability.id}`}>Amount ($)</Label>
                          <Input
                            id={`liability-amount-${liability.id}`}
                            type="number"
                            value={liability.amount}
                            onChange={(e) => updateLiability(liability.id, 'amount', e.target.value)}
                            placeholder="Enter amount"
                            className="border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
                          <Label htmlFor={`liability-category-${liability.id}`}>Category</Label>
                          <select
                            id={`liability-category-${liability.id}`}
                            value={liability.category}
                            onChange={(e) => updateLiability(liability.id, 'category', e.target.value)}
                            className="w-full rounded-md border-purple-100 focus:border-purple-300 focus:ring-purple-200"
                          >
                            {LIABILITY_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Button 
                    onClick={calculateNetWorth}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-opacity"
                  >
                    Calculate Net Worth
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
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                  Net Worth Summary
                </h2>
                {results && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
                      <p className="text-sm opacity-90 mb-1">Total Net Worth</p>
                      <p className="text-3xl font-bold">
                        ${results.netWorth.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                      <p className="text-sm opacity-90 mt-2">
                        Assets minus Liabilities
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Assets</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalAssets.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-sm text-indigo-600 font-medium mb-1">Total Liabilities</p>
                        <p className="text-lg font-bold text-indigo-600">
                          ${results.totalLiabilities.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Assets by Category</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">% of Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {Object.entries(results.assetsByCategory).map(([category, amount]) => (
                              <tr key={category} className="hover:bg-purple-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{category}</td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  {((amount / results.totalAssets) * 100).toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold text-indigo-600 mb-4">Liabilities by Category</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-purple-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">Amount</th>
                              <th className="px-4 py-2 text-right text-sm font-semibold text-gray-600">% of Total</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-purple-100">
                            {Object.entries(results.liabilitiesByCategory).map(([category, amount]) => (
                              <tr key={category} className="hover:bg-purple-50">
                                <td className="px-4 py-2 text-sm text-gray-600">{category}</td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  ${amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  })}
                                </td>
                                <td className="px-4 py-2 text-sm text-right text-gray-600">
                                  {((amount / results.totalLiabilities) * 100).toFixed(1)}%
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-4">
                  <h3 className="font-semibold text-indigo-600">Understanding Your Net Worth:</h3>
                  <ul className="space-y-2">
                    {[
                      'Net worth is your total assets minus total liabilities',
                      'Track changes over time to measure financial progress',
                      'Higher net worth indicates stronger financial health',
                      'Consider both liquid and non-liquid assets'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <div className="p-6">
                <h3 className="font-semibold text-indigo-600 mb-4">Financial Health Tips:</h3>
                <ul className="space-y-2">
                  {[
                    'Regularly update your net worth calculation',
                    'Focus on both growing assets and reducing liabilities',
                    'Diversify your assets across different categories',
                    'Maintain an emergency fund for financial security',
                    'Consider long-term investment strategies'
                  ].map((tip, index) => (
                    <li key={index} className="flex items-center space-x-2 text-gray-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 