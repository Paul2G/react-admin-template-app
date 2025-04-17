export type JSONValue =
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>;

export type CommonDataRecord = Record<string, JSONValue | Date>;

/**
 * Specifies the type for the fetch request body for getAllItems request.
 */
export type PaginatedResponse<T> = {
  items: Array<T>;
  meta: {
    currentPage: number;
    perPage: number;
    total: number;
    lastPage?: number | null;
    next?: string | null;
    prev?: string | null;
  };
};
