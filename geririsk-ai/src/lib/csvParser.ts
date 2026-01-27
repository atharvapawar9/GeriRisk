import Papa from "papaparse";

/**
 * Interface for CSV parsing results
 */
export interface CSVParseResult<T = Record<string, unknown>> {
  data: T[];
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

/**
 * Options for CSV parsing
 */
export interface CSVParseOptions {
  header?: boolean;
  dynamicTyping?: boolean;
  skipEmptyLines?: boolean;
  transformHeader?: (header: string) => string;
}

/**
 * Parse CSV content provided as a STRING
 * (Used for Supabase Storage downloads)
 */
export function parseCSVString<T = Record<string, unknown>>(
  csvString: string,
  options: CSVParseOptions = {}
): CSVParseResult<T> {
  const results = Papa.parse<T>(csvString, {
    header: options.header ?? true,
    dynamicTyping: options.dynamicTyping ?? true,
    skipEmptyLines: options.skipEmptyLines ?? true,
    transformHeader: options.transformHeader,
  });

  return {
    data: results.data,
    errors: results.errors,
    meta: results.meta,
  };
}

/**
 * Validate CSV structure against required columns
 */
export function validateCSVStructure(
  data: Record<string, unknown>[],
  requiredColumns: string[]
): boolean {
  if (!data || data.length === 0) return false;

  const firstRow = data[0];
  return requiredColumns.every((column) => column in firstRow);
}
