/**
 * Options for data preprocessing
 */
export interface PreprocessOptions {
  removeNulls?: boolean;
  trimStrings?: boolean;
  normalizeKeys?: boolean;
}

/**
 * Result of preprocessing operation
 */
export interface PreprocessResult<T = Record<string, unknown>> {
  data: T[];
  processed: number;
  skipped: number;
}

/**
 * Remove null and undefined values from a record
 */
export function removeNullValues(
  record: Record<string, unknown>
): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    if (value !== null && value !== undefined) {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

/**
 * Trim all string values in a record
 */
export function trimStringValues(
  record: Record<string, unknown>
): Record<string, unknown> {
  const trimmed: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    trimmed[key] = typeof value === "string" ? value.trim() : value;
  }

  return trimmed;
}

/**
 * Normalize object keys (lowercase, replace spaces with underscores)
 */
export function normalizeKeys(
  record: Record<string, unknown>
): Record<string, unknown> {
  const normalized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(record)) {
    const normalizedKey = key
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
    normalized[normalizedKey] = value;
  }

  return normalized;
}

/**
 * Preprocess a single data record
 */
export function preprocessRecord(
  record: Record<string, unknown>,
  options: PreprocessOptions = {}
): Record<string, unknown> {
  let processed = record;

  if (options.removeNulls ?? true) {
    processed = removeNullValues(processed);
  }

  if (options.trimStrings ?? true) {
    processed = trimStringValues(processed);
  }

  if (options.normalizeKeys ?? false) {
    processed = normalizeKeys(processed);
  }

  return processed;
}

/**
 * Preprocess an array of data records
 */
export function preprocessData<T = Record<string, unknown>>(
  data: Record<string, unknown>[],
  options: PreprocessOptions = {}
): PreprocessResult<T> {
  let processed = 0;
  let skipped = 0;

  const processedData = data
    .map((record) => {
  try {
    const result = preprocessRecord(record, options) as T;
    processed++;
    return result;
  } catch {
    skipped++;
    return null;
  }
})

    .filter((record): record is T => record !== null);

  return {
    data: processedData,
    processed,
    skipped,
  };
}

/**
 * Validate data structure against required columns
 */
export function validateDataStructure(
  data: Record<string, unknown>[],
  requiredColumns: string[]
): boolean {
  if (!data || data.length === 0) return false;

  const firstRow = data[0];
  return requiredColumns.every((column) => column in firstRow);
}

/**
 * Calculate basic statistics for numeric columns
 */
export function calculateStats(
  data: Record<string, unknown>[],
  column: string
): { min: number; max: number; mean: number; count: number } | null {
  const values = data
    .map((record) => record[column])
    .filter((value): value is number => typeof value === "number");

  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;

  return { min, max, mean, count: values.length };
}
