'use client';

import { CircleStackIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

// Mock hardware options
const hardwareOptions = [
  {
    id: 'a100',
    name: 'NVIDIA A100',
    type: 'GPU',
    memory: '80GB',
    cores: '6912 CUDA',
    pricePerHour: 2.4,
    availability: 95,
    popular: true,
  },
  {
    id: 'h100',
    name: 'NVIDIA H100',
    type: 'GPU',
    memory: '80GB',
    cores: '16896 CUDA',
    pricePerHour: 4.2,
    availability: 67,
    popular: false,
  },
  {
    id: 'rtx4090',
    name: 'RTX 4090',
    type: 'GPU',
    memory: '24GB',
    cores: '16384 CUDA',
    pricePerHour: 1.8,
    availability: 89,
    popular: true,
  },
  {
    id: 'cpu-16',
    name: 'Intel Xeon',
    type: 'CPU',
    memory: '64GB',
    cores: '16 cores',
    pricePerHour: 0.8,
    availability: 98,
    popular: false,
  },
];

const regions = [
  { id: 'us-east-1', name: 'US East (Virginia)', multiplier: 1.0 },
  { id: 'us-west-2', name: 'US West (Oregon)', multiplier: 1.1 },
  { id: 'eu-central-1', name: 'EU Central (Frankfurt)', multiplier: 1.3 },
  { id: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', multiplier: 1.15 },
];

export function HardwareSelector() {
  const [selectedHardware, setSelectedHardware] = useState('a100');
  const [selectedRegion, setSelectedRegion] = useState('us-east-1');

  const currentHardware = hardwareOptions.find(
    h => h.id === selectedHardware,
  );
  const currentRegion = regions.find(r => r.id === selectedRegion);
  const adjustedPrice
    = currentHardware && currentRegion
      ? currentHardware.pricePerHour * currentRegion.multiplier
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Hardware Configuration
      </h2>

      {/* Hardware Options */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Select Hardware
        </h3>
        <div className="space-y-3">
          {hardwareOptions.map(hardware => (
            <button
              key={hardware.id}
              type="button"
              className={`relative p-4 border rounded-lg cursor-pointer transition-all w-full text-left ${
                selectedHardware === hardware.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedHardware(hardware.id)}
            >
              {hardware.popular && (
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {hardware.type === 'GPU'
                    ? (
                        <CircleStackIcon className="h-8 w-8 text-blue-600" />
                      )
                    : (
                        <CpuChipIcon className="h-8 w-8 text-green-600" />
                      )}

                  <div>
                    <div className="font-semibold text-gray-900">
                      {hardware.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {hardware.cores}
                      {' '}
                      •
                      {hardware.memory}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    $
                    {hardware.pricePerHour.toFixed(2)}
                    /hr
                  </div>
                  <div className="text-sm text-gray-500">
                    {hardware.availability}
                    % available
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Region Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Select Region
        </h3>
        <select
          value={selectedRegion}
          onChange={e => setSelectedRegion(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {regions.map(region => (
            <option key={region.id} value={region.id}>
              {region.name}
              {' '}
              {region.multiplier !== 1.0
                && `(+${((region.multiplier - 1) * 100).toFixed(0)}%)`}
            </option>
          ))}
        </select>
      </div>

      {/* Configuration Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          Configuration Summary
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Hardware:</span>
            <span className="font-medium">{currentHardware?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Region:</span>
            <span className="font-medium">{currentRegion?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Memory:</span>
            <span className="font-medium">{currentHardware?.memory}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cores:</span>
            <span className="font-medium">{currentHardware?.cores}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="text-gray-600">Price per hour:</span>
            <span className="font-semibold text-lg">
              $
              {adjustedPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
