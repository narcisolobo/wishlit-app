import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClassnames(...values: ClassValue[]) {
  return twMerge(clsx(values));
}
