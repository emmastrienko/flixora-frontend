import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export function validateCode(code: string, expectedOutput: string): boolean {
  // Simple validation - in a real app, you'd run the code in a sandbox
  try {
    // This is a simplified check - real implementation would use a code execution sandbox
    const trimmedCode = code.trim()
    const trimmedExpected = expectedOutput.trim()
    return trimmedCode.includes(trimmedExpected) || 
           trimmedCode === trimmedExpected
  } catch {
    return false
  }
}