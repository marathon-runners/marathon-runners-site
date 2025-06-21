declare module 'react-leaflet-heatmap-layer' {
  import type { ComponentType } from 'react';

  type HeatmapLayerProps = {
    points: any[];
    longitudeExtractor: (point: any) => number;
    latitudeExtractor: (point: any) => number;
    intensityExtractor: (point: any) => number;
    fitBoundsOnLoad?: boolean;
    fitBoundsOnUpdate?: boolean;
    max?: number;
    radius?: number;
    maxZoom?: number;
    minOpacity?: number;
    blur?: number;
    gradient?: Record<number, string>;
    onStatsUpdate?: (stats: { min: number; max: number }) => void;
  };

  const HeatmapLayer: ComponentType<HeatmapLayerProps>;
  export default HeatmapLayer;
}
