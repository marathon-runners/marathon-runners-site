'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false },
);

// Mock data for compute provider metrics across different regions
const computeProviderData = [
  // North America
  {
    lat: 37.7749,
    lng: -122.4194,
    intensity: 0.9,
    region: 'US-West-1',
    provider: 'AWS',
    cost: 2.4,
    availability: 95,
  },
  {
    lat: 39.0458,
    lng: -76.6413,
    intensity: 0.8,
    region: 'US-East-1',
    provider: 'AWS',
    cost: 2.2,
    availability: 98,
  },
  {
    lat: 41.8781,
    lng: -87.6298,
    intensity: 0.7,
    region: 'US-Central-1',
    provider: 'Azure',
    cost: 2.15,
    availability: 92,
  },
  {
    lat: 43.6532,
    lng: -79.3832,
    intensity: 0.6,
    region: 'Canada-Central',
    provider: 'GCP',
    cost: 2.35,
    availability: 89,
  },

  // Europe
  {
    lat: 53.3498,
    lng: -6.2603,
    intensity: 0.8,
    region: 'EU-West-1',
    provider: 'AWS',
    cost: 2.6,
    availability: 94,
  },
  {
    lat: 52.52,
    lng: 13.405,
    intensity: 0.9,
    region: 'EU-Central-1',
    provider: 'Azure',
    cost: 2.45,
    availability: 96,
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    intensity: 0.7,
    region: 'EU-West-2',
    provider: 'GCP',
    cost: 2.7,
    availability: 91,
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    intensity: 0.6,
    region: 'EU-West-3',
    provider: 'AWS',
    cost: 2.55,
    availability: 88,
  },

  // Asia Pacific
  {
    lat: 35.6762,
    lng: 139.6503,
    intensity: 0.9,
    region: 'AP-Northeast-1',
    provider: 'AWS',
    cost: 2.8,
    availability: 97,
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    intensity: 0.8,
    region: 'AP-Southeast-1',
    provider: 'Azure',
    cost: 2.65,
    availability: 93,
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    intensity: 0.7,
    region: 'AP-Southeast-2',
    provider: 'GCP',
    cost: 2.9,
    availability: 90,
  },
  {
    lat: 19.076,
    lng: 72.8777,
    intensity: 0.6,
    region: 'AP-South-1',
    provider: 'AWS',
    cost: 1.8,
    availability: 85,
  },

  // Additional high-density regions
  {
    lat: 37.5665,
    lng: 126.978,
    intensity: 0.8,
    region: 'AP-Northeast-2',
    provider: 'Azure',
    cost: 2.75,
    availability: 94,
  },
  {
    lat: 31.2304,
    lng: 121.4737,
    intensity: 0.7,
    region: 'AP-East-1',
    provider: 'Alibaba',
    cost: 1.95,
    availability: 87,
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    intensity: 0.6,
    region: 'ME-South-1',
    provider: 'AWS',
    cost: 3.1,
    availability: 82,
  },

  // South America
  {
    lat: -23.5505,
    lng: -46.6333,
    intensity: 0.5,
    region: 'SA-East-1',
    provider: 'AWS',
    cost: 2.95,
    availability: 78,
  },

  // Africa
  {
    lat: -26.2041,
    lng: 28.0473,
    intensity: 0.4,
    region: 'AF-South-1',
    provider: 'Azure',
    cost: 3.2,
    availability: 75,
  },
];

export function ComputeProviderHeatmap() {
  const [isClient, setIsClient] = useState(false);
  const [HeatmapLayer, setHeatmapLayer] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import the heatmap layer to avoid SSR issues
    import('react-leaflet-heatmap-layer').then((mod) => {
      setHeatmapLayer(() => mod.default);
    });
  }, []);

  if (!isClient || !HeatmapLayer) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading heatmap...</div>
      </div>
    );
  }

  // Transform data for heatmap layer
  const heatmapPoints = computeProviderData.map(point => [
    point.lat,
    point.lng,
    point.intensity,
  ]);

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>High Demand/Cost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Medium Demand/Cost</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Low Demand/Cost</span>
        </div>
      </div>

      {/* Map */}
      <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <HeatmapLayer
            points={heatmapPoints}
            longitudeExtractor={(point: number[]) => point[1]}
            latitudeExtractor={(point: number[]) => point[0]}
            intensityExtractor={(point: number[]) => point[2]}
            max={1.0}
            radius={25}
            blur={15}
            gradient={{
              0.2: 'blue',
              0.4: 'cyan',
              0.6: 'lime',
              0.8: 'yellow',
              1.0: 'red',
            }}
          />
        </MapContainer>
      </div>

      {/* Regional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Lowest Cost Region</h4>
          <div className="text-lg font-bold text-green-600">AP-South-1</div>
          <p className="text-sm text-gray-600">$1.80/hour • 85% availability</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">
            Highest Availability
          </h4>
          <div className="text-lg font-bold text-blue-600">US-East-1</div>
          <p className="text-sm text-gray-600">98% availability • $2.20/hour</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">Recommended</h4>
          <div className="text-lg font-bold text-purple-600">EU-Central-1</div>
          <p className="text-sm text-gray-600">Best price/performance ratio</p>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Region
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost/Hour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Availability
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {computeProviderData
              .sort((a, b) => a.cost - b.cost)
              .slice(0, 8)
              .map((region, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {region.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {region.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $
                    {region.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              region.availability >= 95
                                ? 'bg-green-500'
                                : region.availability >= 90
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${region.availability}%` }}
                          />
                        </div>
                      </div>
                      <span className="ml-2">
                        {region.availability}
                        %
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
