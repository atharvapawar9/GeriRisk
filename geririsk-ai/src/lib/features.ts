/**
 * Feature engineering utilities for GeriRisk data processing
 */

export interface FeatureExtractionOptions {
  includeStatistics?: boolean;
  includeDerived?: boolean;
}

export interface ExtractedFeatures {
  [key: string]: number | string | boolean;
}

/**
 * Extract features from a data record
 */
export function extractFeatures(
  record: Record<string, unknown>,
  options: FeatureExtractionOptions = {}
): ExtractedFeatures {
  const features: ExtractedFeatures = {};

  // Extract basic features from the record
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
      features[key] = value;
    }
  }

  // Add statistics if requested
  if (options.includeStatistics) {
    const numericValues = Object.values(record).filter(
      (v): v is number => typeof v === 'number' && !isNaN(v)
    );
    
    if (numericValues.length > 0) {
      features.mean = numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length;
      features.max = Math.max(...numericValues);
      features.min = Math.min(...numericValues);
    }
  }

  // Add derived features if requested
  if (options.includeDerived) {
    // Example: Add feature count
    features.featureCount = Object.keys(features).length;
  }

  return features;
}

/**
 * Calculate derived features from raw data
 */
export function calculateDerivedFeatures(
  data: Record<string, unknown>[]
): Record<string, unknown>[] {
  // Add your derived feature calculation logic here
  return data;
}

/**
 * Dataset-level aggregation results
 */
export interface DatasetAggregates {
  avgHeartRate: number | null;
  maxHeartRate: number | null;
  minHeartRate: number | null;
  minSpO2: number | null;
  totalSteps: number;
  recordCount: number;
  cardiacEvents: number;
  spo2Events: number;
}

/**
 * Calculate dataset-level aggregations for health metrics
 * Supports flexible column naming (e.g., 'heart_rate', 'heartRate', 'Heart Rate')
 */
export function calculateDatasetAggregates(
  data: Record<string, unknown>[],
  columnMapping?: {
    heartRate?: string;
    spO2?: string;
    steps?: string;
  }
): DatasetAggregates {
  const recordCount = data.length;

  // Default column names (can be overridden)
  const heartRateCol = columnMapping?.heartRate || 'heart_rate';
  const spO2Col = columnMapping?.spO2 || 'spo2';
  const stepsCol = columnMapping?.steps || 'steps';

  // Extract heart rate values
  const heartRates = data
    .map((record) => record[heartRateCol])
    .filter((value): value is number => typeof value === 'number' && !isNaN(value));

  // Extract SpO2 values
  const spO2Values = data
    .map((record) => record[spO2Col])
    .filter((value): value is number => typeof value === 'number' && !isNaN(value));

  // Extract steps values
  const stepsValues = data
    .map((record) => record[stepsCol])
    .filter((value): value is number => typeof value === 'number' && !isNaN(value));

  // Calculate aggregates
  const avgHeartRate = heartRates.length > 0
    ? heartRates.reduce((sum, val) => sum + val, 0) / heartRates.length
    : null;

  const maxHeartRate = heartRates.length > 0
    ? Math.max(...heartRates)
    : null;

  const minHeartRate = heartRates.length > 0
    ? Math.min(...heartRates)
    : null;

  const minSpO2 = spO2Values.length > 0
    ? Math.min(...spO2Values)
    : null;

  const totalSteps = stepsValues.reduce((sum, val) => sum + val, 0);

  // Calculate event counts
  const cardiacEvents = heartRates.filter(hr => hr > 100).length;
  const spo2Events = spO2Values.filter(val => val < 95).length;

  return {
    avgHeartRate,
    maxHeartRate,
    minHeartRate,
    minSpO2,
    totalSteps,
    recordCount,
    cardiacEvents,
    spo2Events
  };
}
