// ─── Sleep session types ──────────────────────────────────────────────────────

export type SleepStage = 'Awake' | 'REM' | 'Light' | 'Deep';

export interface SleepSegment {
  stage: SleepStage;
  start_min: number;   // minutes from session start (origin = 0)
  end_min: number;     // minutes from session start
  start_ts: string;    // wall-clock "HH:MM"
  end_ts: string;      // wall-clock "HH:MM"
}

export interface SleepSession {
  date: string;               // e.g. "1/16/2026"
  bedtime: string;            // "00:00"
  wakeTime: string;           // "07:00"
  totalMinutes: number;       // 420
  segments: SleepSegment[];
  breakdown: Record<string, number>; // percentages, same shape as existing sleepBreakdown
}

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
  sleepBreakdown?: Record<string, number>;
  sleepSessions?: SleepSession[];
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

  // Extract sleep stage values
  const sleepStageCol = Object.keys(data[0] || {}).find(k => 
    k.toLowerCase().includes('sleep') && (k.toLowerCase().includes('stage') || k.toLowerCase().includes('phase'))
  ) || 'sleep_stage';

  const sleepStages = data
    .map(record => record[sleepStageCol])
    .filter((v): v is string => typeof v === 'string');
    
  // Calculate sleep breakdown
  const sleepBreakdown: Record<string, number> = {};
  if (sleepStages.length > 0) {
      const total = sleepStages.length;
      sleepStages.forEach(stage => {
          const s = stage.toLowerCase();
          let key = 'light'; // default
          if (s.includes('deep')) key = 'deep';
          else if (s.includes('rem')) key = 'rem';
          else if (s.includes('awake') || s.includes('wake')) key = 'awake';
          
          sleepBreakdown[key] = (sleepBreakdown[key] || 0) + 1;
      });
      
      // Convert to percentages
      Object.keys(sleepBreakdown).forEach(key => {
          sleepBreakdown[key] = Math.round((sleepBreakdown[key] / total) * 100);
      });
  } else {
      // Fallback if no sleep data found - maybe generic distribution or empty?
      // Let's leave it empty so UI can handle it or show "No sleep data"
  }

  return {
    avgHeartRate,
    maxHeartRate,
    minHeartRate,
    minSpO2,
    totalSteps,
    recordCount,
    cardiacEvents,
    spo2Events,
    sleepBreakdown,
    sleepSessions: extractSleepSessions(data),
  };
}

// ─── Sleep session extractor ──────────────────────────────────────────────────

const SESSION_GAP_MINUTES = 240; // gaps longer than 4h of Awake = new session

export function extractSleepSessions(
  data: Record<string, unknown>[]
): SleepSession[] {
  if (!data || data.length === 0) return [];

  // Detect column names (same logic as existing calculateDatasetAggregates)
  const sleepStageCol =
    Object.keys(data[0] || {}).find(
      (k) =>
        k.toLowerCase().includes('sleep') &&
        (k.toLowerCase().includes('stage') || k.toLowerCase().includes('phase'))
    ) || 'sleep_stage';

  const tsCol = 'timestamp';

  // Build raw (stage, timestamp) pairs
  const rawRows = data
    .filter((r) => typeof r[sleepStageCol] === 'string' && r[tsCol])
    .map((r) => ({
      stage: r[sleepStageCol] as string,
      ts: new Date(r[tsCol] as string),
    }));

  if (rawRows.length === 0) return [];

  // Run-length encode into blocks: [{stage, start, end}]
  const blocks: { stage: string; start: Date; end: Date }[] = [];
  let cur = { stage: rawRows[0].stage, start: rawRows[0].ts, end: rawRows[0].ts };

  for (let i = 1; i < rawRows.length; i++) {
    const r = rawRows[i];
    if (r.stage === cur.stage) {
      cur.end = r.ts;
    } else {
      blocks.push({ ...cur });
      cur = { stage: r.stage, start: r.ts, end: r.ts };
    }
  }
  blocks.push({ ...cur });

  // Split blocks into sessions on long Awake gaps
  const sessionGroups: (typeof blocks)[] = [];
  let curGroup: typeof blocks = [];

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const durMin = (b.end.getTime() - b.start.getTime()) / 60000;

    if (b.stage === 'Awake' && durMin > SESSION_GAP_MINUTES) {
      // Long daytime Awake block — close current session, skip this block
      if (curGroup.length > 0) {
        sessionGroups.push(curGroup);
        curGroup = [];
      }
    } else {
      curGroup.push(b);
    }
  }
  if (curGroup.length > 0) sessionGroups.push(curGroup);

  // Build SleepSession objects from each group
  return sessionGroups
    .map((group) => buildSleepSession(group))
    .filter((s) => s.totalMinutes > 30); // discard noise < 30min
}

function buildSleepSession(
  blocks: { stage: string; start: Date; end: Date }[]
): SleepSession {
  const origin = blocks[0].start;
  const lastEnd = blocks[blocks.length - 1].end;
  // Add 5 min to last block end (CSV rows are 5-min intervals)
  const totalMinutes =
    Math.round((lastEnd.getTime() - origin.getTime()) / 60000) + 5;

  const fmt = (d: Date) =>
    d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const segments: SleepSegment[] = blocks.map((b) => ({
    stage: b.stage as SleepStage,
    start_min: Math.round((b.start.getTime() - origin.getTime()) / 60000),
    end_min: Math.round((b.end.getTime() - origin.getTime()) / 60000) + 5,
    start_ts: fmt(b.start),
    end_ts: fmt(b.end),
  }));

  // Compute breakdown percentages from segment durations
  const counts: Record<string, number> = {};
  for (const s of segments) {
    const key = s.stage.toLowerCase();
    counts[key] = (counts[key] || 0) + (s.end_min - s.start_min);
  }
  const breakdown: Record<string, number> = {};
  for (const [k, v] of Object.entries(counts)) {
    breakdown[k] = Math.round((v / totalMinutes) * 100);
  }

  return {
    date: origin.toLocaleDateString(),
    bedtime: fmt(origin),
    wakeTime: fmt(lastEnd),
    totalMinutes,
    segments,
    breakdown,
  };
}

/**
 * Extract time-series trends from the dataset
 */
export function calculateTrends(
  data: Record<string, unknown>[]
): {
  heartRate: { time: string; value: number }[];
  spo2: { time: string; value: number }[];
} {
  // We want to downsample to ~24 points if the dataset is large, or use all points if small
  // For simplicity, let's take one point per hour if possible, or just decimate the array

  const heartRate = data
    .filter((r): r is Record<string, unknown> & { timestamp?: string; heart_rate: number } => 
      typeof r.heart_rate === 'number' && !isNaN(r.heart_rate)
    )
    .map(r => ({
      time: r.timestamp ? new Date(r.timestamp as string).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
      value: r.heart_rate
    }));

  const spo2 = data
    .filter((r): r is Record<string, unknown> & { timestamp?: string; spo2: number } => 
      typeof r.spo2 === 'number' && !isNaN(r.spo2)
    )
    .map(r => ({
      time: r.timestamp ? new Date(r.timestamp as string).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '',
      value: r.spo2
    }));

  // Simple decimation to limit data points for the graph (max 24)
  const decimate = <T>(arr: T[], max: number): T[] => {
    if (arr.length <= max) return arr;
    const step = Math.ceil(arr.length / max);
    return arr.filter((_, i) => i % step === 0).slice(0, max);
  };

  return {
    heartRate: decimate(heartRate, 24),
    spo2: decimate(spo2, 24)
  };
}
