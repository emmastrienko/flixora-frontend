import { Lesson } from '@/types/lesson'
import { enhancedLessons } from './enhancedLessons'

export const lessons: Lesson[] = enhancedLessons.length > 0 ? enhancedLessons : [
  {
    id: 'js-basics-1',
    title: 'JavaScript Variables and Data Types',
    description: 'Learn the fundamentals of JavaScript variables and different data types',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 15,
    concepts: ['variables', 'data types', 'let', 'const', 'string', 'number', 'boolean'],
    content: `
# JavaScript Variables and Data Types

In JavaScript, variables are containers that store data values. You can think of them as labeled boxes where you put information.

## Variable Declaration

There are three ways to declare variables in JavaScript:

### let
- Used for variables that can be reassigned
- Block-scoped (only available within the block where it's defined)

### const
- Used for variables that won't be reassigned
- Also block-scoped
- Must be initialized when declared

### var (legacy)
- Function-scoped or globally-scoped
- Can be redeclared and updated
- Generally avoided in modern JavaScript

## Data Types

JavaScript has several built-in data types:

### Primitive Types
1. **String** - Text data: "Hello World"
2. **Number** - Numeric data: 42, 3.14
3. **Boolean** - True or false values
4. **Undefined** - Variable declared but not assigned
5. **Null** - Intentionally empty value

### Examples
\`\`\`javascript
let name = "Alice";           // String
const age = 25;               // Number
let isStudent = true;         // Boolean
let address;                  // Undefined
let data = null;              // Null
\`\`\`
    `,
    challenges: [
      {
        id: 'variables-1',
        title: 'Create Your First Variables',
        description: 'Practice creating variables with different data types',
        instructions: 'Create a variable called "message" with the value "Hello, World!" and a variable called "count" with the value 10.',
        starterCode: '// Create your variables here\n\n',
        expectedOutput: 'let message = "Hello, World!";\nlet count = 10;',
        hints: [
          'Use the let keyword to declare variables',
          'Strings should be wrapped in quotes',
          'Numbers don\'t need quotes'
        ],
        testCases: [
          {
            input: 'message',
            expectedOutput: 'Hello, World!',
            description: 'Variable message should contain "Hello, World!"'
          },
          {
            input: 'count',
            expectedOutput: '10',
            description: 'Variable count should contain the number 10'
          }
        ]
      },
      {
        id: 'variables-2',
        title: 'Working with Constants',
        description: 'Learn when to use const vs let',
        instructions: 'Create a constant called "PI" with the value 3.14159 and a variable called "radius" with the value 5.',
        starterCode: '// Create a constant and a variable\n\n',
        expectedOutput: 'const PI = 3.14159;\nlet radius = 5;',
        hints: [
          'Use const for values that won\'t change',
          'Use let for values that might change',
          'PI is a mathematical constant'
        ],
        testCases: [
          {
            input: 'PI',
            expectedOutput: '3.14159',
            description: 'PI should be a constant with value 3.14159'
          },
          {
            input: 'radius',
            expectedOutput: '5',
            description: 'radius should be a variable with value 5'
          }
        ]
      }
    ]
  },
  {
    id: 'js-functions-1',
    title: 'JavaScript Functions',
    description: 'Master the art of creating and using functions in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 20,
    concepts: ['functions', 'parameters', 'return', 'arrow functions', 'scope'],
    content: `
# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks. They're one of the fundamental building blocks of JavaScript.

## Function Declaration

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
\`\`\`

## Function Expression

\`\`\`javascript
const greet = function(name) {
  return "Hello, " + name + "!";
};
\`\`\`

## Arrow Functions (ES6+)

\`\`\`javascript
const greet = (name) => {
  return "Hello, " + name + "!";
};

// Short form for single expressions
const greet = name => "Hello, " + name + "!";
\`\`\`

## Parameters and Arguments

- **Parameters** are the variables listed in the function definition
- **Arguments** are the actual values passed to the function when called

## Return Statement

Functions can return values using the \`return\` statement. If no return statement is used, the function returns \`undefined\`.
    `,
    challenges: [
      {
        id: 'functions-1',
        title: 'Create Your First Function',
        description: 'Write a function that adds two numbers',
        instructions: 'Create a function called "add" that takes two parameters (a and b) and returns their sum.',
        starterCode: '// Write your add function here\n\n',
        expectedOutput: 'function add(a, b) {\n  return a + b;\n}',
        hints: [
          'Use the function keyword',
          'Functions need parameters in parentheses',
          'Use return to send back the result'
        ],
        testCases: [
          {
            input: 'add(2, 3)',
            expectedOutput: '5',
            description: 'add(2, 3) should return 5'
          },
          {
            input: 'add(10, 15)',
            expectedOutput: '25',
            description: 'add(10, 15) should return 25'
          }
        ]
      }
    ]
  }
]

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id)
}

export const getLessonsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Lesson[] => {
  return lessons.filter(lesson => lesson.difficulty === difficulty)
}