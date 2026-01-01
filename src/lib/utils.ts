import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
console.log("hello world 123")
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
