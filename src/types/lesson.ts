export interface Lesson {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: 'javascript' | 'python' | 'html' | 'css'
  duration: number // in minutes
  concepts: string[]
  content: string
  challenges: Challenge[]
}

export interface Challenge {
  id: string
  title: string
  description: string
  instructions: string
  starterCode: string
  expectedOutput: string
  hints: string[]
  testCases: TestCase[]
}

export interface TestCase {
  input: string
  expectedOutput: string
  description: string
}

export interface UserProgress {
  lessonId: string
  challengeId?: string
  completed: boolean
  score: number
  timeSpent: number // in seconds
  attempts: number
  completedAt?: Date
}

export interface AIHint {
  type: 'syntax' | 'logic' | 'concept' | 'encouragement'
  message: string
  codeSnippet?: string
}