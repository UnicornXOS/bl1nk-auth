/**
 * Search utilities for filtering and finding items
 */

export interface SearchResult<T> {
  items: T[];
  query: string;
  total: number;
}

/**
 * Filters an array of items based on a search query
 * @param items Array of items to search through
 * @param query Search query string
 * @param searchFields Array of field names to search in (for objects) or true for string values
 * @returns Filtered array of items matching the query
 */
export function fuzzySearch<T extends Record<string, any> | string>(
  items: T[],
  query: string,
  searchFields: (keyof T)[] | boolean = true,
): T[] {
  if (!query.trim()) return items;

  const searchTerm = query.toLowerCase().trim();

  return items.filter((item) => {
    if (typeof item === "string") {
      return item.toLowerCase().includes(searchTerm);
    }

    // If searchFields is true, search all string fields
    const fieldsToSearch =
      searchFields === true ? (Object.keys(item) as (keyof T)[]) : (searchFields as (keyof T)[]);

    return fieldsToSome(fieldsToSearch, (field: keyof T) => {
      const value = item[field];
      return typeof value === "string" && value.toLowerCase().includes(searchTerm);
    });
  });
}

/**
 * Helper function to check if some elements in an array pass a test
 */
function fieldsToSome<T>(fields: (keyof T)[], test: (field: keyof T) => boolean): boolean {
  for (const field of fields) {
    if (test(field)) return true;
  }
  return false;
}

/**
 * Simple search that returns both results and metadata
 */
export function search<T extends Record<string, any>>(
  items: T[],
  query: string,
  searchFields: (keyof T)[] | boolean = true,
): SearchResult<T> {
  const results = fuzzySearch(items, query, searchFields);
  return {
    items: results,
    query,
    total: results.length,
  };
}
