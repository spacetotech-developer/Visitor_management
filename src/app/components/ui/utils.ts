import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// // `cn` merges conditional classes and handles Tailwind conflicts
// export function cn(...inputs: (string | undefined | null | boolean)[]) {
//   return twMerge(clsx(inputs))
// }