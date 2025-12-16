import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSequenceLetter(index: number): string {
  if (index < 0) return "?";

  if (index < 26) return String.fromCharCode(97 + index); // 'a' to 'z'

  if (index < 702) { // 26 + 26*26
    const first = Math.floor((index - 26) / 26);
    const second = (index - 26) % 26;
    return String.fromCharCode(97 + first) + String.fromCharCode(97 + second);
  }
  
  // For indices 702 and above, return a placeholder
  return "?";
}