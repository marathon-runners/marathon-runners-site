'use client';

import { CurrencyDollarIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export function CostCalculator() {
  const [estimatedHours, setEstimatedHours] = useState(8);
  const [hourlyRate] = useState(2.40); // This would come from hardware selection
  const [monthlyBudget] = useState(500);
  const [currentMonthSpend] = useState(127.50);

  const totalCost = estimatedHours * hourlyRate;
  const projectedMonthlySpend = currentMonthSpend + totalCost;
  const budgetRemaining = monthlyBudget - projectedMonthlySpend;
  const budgetUsagePercent = (projectedMonthlySpend / monthlyBudget) * 100;

  const isOverBudget = budgetUsagePercent > 100;
  const isNearBudget = budgetUsagePercent > 80;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Cost Estimation</h2>
      </div>

      {/* Estimated Duration Input */}
      <div className="mb-6">
        <label htmlFor="estimated-hours" className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Duration (hours)
        </label>
        <input
          id="estimated-hours"
          type="number"
          min="0.5"
          step="0.5"
          value={estimatedHours}
          onChange={e => setEstimatedHours(Number.parseFloat(e.target.value) || 0)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Cost Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Hourly Rate:</span>
          <span className="font-medium">
            $
            {hourlyRate.toFixed(2)}
            /hr
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">Duration:</span>
          <span className="font-medium">
            {estimatedHours}
            h
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-lg font-medium text-gray-900">Estimated Cost:</span>
          <span className="text-xl font-bold text-gray-900">
            $
            {totalCost.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Budget Tracking */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Monthly Budget Tracking</h3>

        {/* Budget Alert */}
        {(isOverBudget || isNearBudget) && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
            isOverBudget ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
          }`}
          >
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              {isOverBudget
                ? 'This job will exceed your monthly budget!'
                : 'Warning: Approaching budget limit'}
            </span>
          </div>
        )}

        {/* Budget Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Budget Usage</span>
            <span className="font-medium">
              {budgetUsagePercent.toFixed(1)}
              %
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isOverBudget ? 'bg-red-500' : isNearBudget ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
            >
            </div>
          </div>
        </div>

        {/* Budget Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Month Spend:</span>
            <span className="font-medium">
              $
              {currentMonthSpend.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">This Job Cost:</span>
            <span className="font-medium">
              $
              {totalCost.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Projected Total:</span>
            <span className="font-medium">
              $
              {projectedMonthlySpend.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-600">Budget Remaining:</span>
            <span className={`font-semibold ${budgetRemaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
              $
              {budgetRemaining.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Monthly Budget:</span>
            <span className="font-medium">
              $
              {monthlyBudget.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            isOverBudget
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          disabled={isOverBudget}
        >
          {isOverBudget ? 'Budget Exceeded' : 'Start Job'}
        </button>

        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
          Save Estimate
        </button>
      </div>
    </div>
  );
}
