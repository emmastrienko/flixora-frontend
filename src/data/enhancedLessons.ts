import { Lesson } from '@/types/lesson'

export const enhancedLessons: Lesson[] = [
  {
    id: 'js-basics-1',
    title: 'JavaScript Variables and Data Types',
    description: 'Learn the fundamentals of JavaScript variables and different data types',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 15,
    concepts: ['variables', 'data types', 'let', 'const', 'string', 'number', 'boolean'],
    content: `# JavaScript Variables and Data Types`,
    challenges: [
      {
        id: 'variables-1',
        title: 'Create Your First Variables',
        description: 'Practice creating variables with different data types',
        instructions: 'Create a variable called "message" with the value "Hello, World!" and a variable called "count" with the value 10.',
        starterCode: '// Create your variables here\nlet message = \nlet count = ',
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
        starterCode: '// Create a constant and a variable\nconst PI = \nlet radius = ',
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
      },
      {
        id: 'variables-3',
        title: 'Boolean Values',
        description: 'Practice with boolean data type',
        instructions: 'Create a variable called "isActive" with the value true and another called "isComplete" with the value false.',
        starterCode: '// Create boolean variables\nlet isActive = \nlet isComplete = ',
        expectedOutput: 'let isActive = true;\nlet isComplete = false;',
        hints: [
          'Boolean values are true or false',
          'No quotes needed for boolean values',
          'Make sure to use lowercase true and false'
        ],
        testCases: [
          {
            input: 'isActive',
            expectedOutput: 'true',
            description: 'isActive should be true'
          },
          {
            input: 'isComplete',
            expectedOutput: 'false',
            description: 'isComplete should be false'
          }
        ]
      }
    ]
  },
  {
    id: 'js-strings',
    title: 'Working with Strings',
    description: 'Master string manipulation and formatting in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 20,
    concepts: ['strings', 'concatenation', 'template literals', 'string methods'],
    content: `# Working with Strings in JavaScript`,
    challenges: [
      {
        id: 'strings-1',
        title: 'String Concatenation',
        description: 'Combine strings together',
        instructions: 'Create variables firstName = "Jane" and lastName = "Smith", then create a fullName variable that combines them with a space.',
        starterCode: '// Create string variables\nlet firstName = \nlet lastName = \nlet fullName = ',
        expectedOutput: 'let firstName = "Jane";\nlet lastName = "Smith";\nlet fullName = firstName + " " + lastName;',
        hints: [
          'Use quotes for string values',
          'Use the + operator to combine strings',
          'Don\'t forget the space between names'
        ],
        testCases: [
          {
            input: 'firstName',
            expectedOutput: 'Jane',
            description: 'firstName should be "Jane"'
          },
          {
            input: 'lastName',
            expectedOutput: 'Smith',
            description: 'lastName should be "Smith"'
          }
        ]
      }
    ]
  },
  {
    id: 'js-functions-basic',
    title: 'JavaScript Functions Basics',
    description: 'Learn to create simple functions in JavaScript',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 20,
    concepts: ['functions', 'parameters', 'return', 'function declaration'],
    content: `# JavaScript Functions Basics`,
    challenges: [
      {
        id: 'functions-1',
        title: 'Create Your First Function',
        description: 'Write a function that adds two numbers',
        instructions: 'Create a function called "add" that takes two parameters (a and b) and returns their sum.',
        starterCode: '// Write your add function here\nfunction add(a, b) {\n  \n}',
        expectedOutput: 'function add(a, b) {\n  return a + b;\n}',
        hints: [
          'Use the return keyword',
          'Add the two parameters together',
          'Use the + operator for addition'
        ],
        testCases: [
          {
            input: '2, 3',
            expectedOutput: '5',
            description: 'add(2, 3) should return 5'
          },
          {
            input: '10, 15',
            expectedOutput: '25',
            description: 'add(10, 15) should return 25'
          }
        ]
      },
      {
        id: 'functions-2',
        title: 'Function with String Return',
        description: 'Create a function that returns a string',
        instructions: 'Create a function called "greet" that takes a name parameter and returns "Hello, [name]!"',
        starterCode: '// Write your greet function here\nfunction greet(name) {\n  \n}',
        expectedOutput: 'function greet(name) {\n  return "Hello, " + name + "!";\n}',
        hints: [
          'Use string concatenation with +',
          'Don\'t forget the return statement',
          'Include the exclamation mark in your string'
        ],
        testCases: [
          {
            input: '"Alice"',
            expectedOutput: 'Hello, Alice!',
            description: 'greet("Alice") should return "Hello, Alice!"'
          },
          {
            input: '"Bob"',
            expectedOutput: 'Hello, Bob!',
            description: 'greet("Bob") should return "Hello, Bob!"'
          }
        ]
      }
    ]
  },
  {
    id: 'js-numbers',
    title: 'Working with Numbers',
    description: 'Learn mathematical operations and number manipulation',
    difficulty: 'beginner',
    language: 'javascript',
    duration: 15,
    concepts: ['numbers', 'arithmetic', 'math operations', 'operators'],
    content: `# Working with Numbers in JavaScript`,
    challenges: [
      {
        id: 'numbers-1',
        title: 'Basic Math Operations',
        description: 'Practice with mathematical operators',
        instructions: 'Create variables: sum = 15 + 25, difference = 50 - 20, product = 6 * 7',
        starterCode: '// Create math operation variables\nlet sum = \nlet difference = \nlet product = ',
        expectedOutput: 'let sum = 15 + 25;\nlet difference = 50 - 20;\nlet product = 6 * 7;',
        hints: [
          'Use + for addition',
          'Use - for subtraction', 
          'Use * for multiplication'
        ],
        testCases: [
          {
            input: 'sum',
            expectedOutput: '40',
            description: 'sum should equal 40'
          },
          {
            input: 'difference',
            expectedOutput: '30',
            description: 'difference should equal 30'
          },
          {
            input: 'product',
            expectedOutput: '42',
            description: 'product should equal 42'
          }
        ]
      }
    ]
  }
]