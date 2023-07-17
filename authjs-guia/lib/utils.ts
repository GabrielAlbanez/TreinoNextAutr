import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// esse tailwind-merge server para fazer com que vc duplique classes no sue css
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
