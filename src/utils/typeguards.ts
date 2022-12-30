export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Typeguard which filters out non-nulls
 */
export const isNull = <T>(x: T | null): x is null => x === null;

/**
 * Typeguard which filters out null
 */
export const isNotNull = <T>(x: T | null): x is T => x !== null;

/**
 * Typeguard which filters out undefined
 */
export const isDefined = <T>(value: T | undefined): value is T => value !== undefined;

/**
 * Typeguard which filters out undefined and null
 */
export const hasValue = <T>(value: T | undefined | null): value is T => value !== undefined && value !== null;

/**
 * Typeguard which checks if array is not empty
 */
export const isNotEmptyArray = <T>(value: T[]): value is NonEmptyArray<T> => value.length > 0;

/**
 * Typeguard which checks if array is empty
 */
export const isEmptyArray = <T>(value: T[]): value is Array<never> => value.length === 0;

/**
 * Filter out whitespaced or nullish strings
 */
export const isNullOrWhiteSpace = (value: string | null) => !hasValue(value) || value.trim().length === 0;

/**
 * Filters out non-blobs
 */
export const isBlobUrl = (url: string) => url.startsWith('blob:');

/**
 * Filters out blobs
 */
export const isNotBlobUrl = (url: string) => !url.startsWith('blob:');
