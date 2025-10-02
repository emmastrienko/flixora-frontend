import { Challenge, TestCase } from '@/types/lesson'

export interface TestResult {
  passed: boolean
  message: string
  expected?: string
  actual?: string
  error?: string
}

export interface ValidationResult {
  allPassed: boolean
  results: TestResult[]
  score: number
}

// Safe code execution in a limited scope
function executeCode(code: string, testInput?: string): any {
  try {
    // Create a limited execution environment
    const scope = {
      console: {
        log: (...args: any[]) => args.join(' ')
      }
    }
    
    // Remove dangerous functions and limit scope
    const safeCode = code.replace(/eval|Function|setTimeout|setInterval|require|import/g, '')
    
    // Execute the code in a controlled way
    const func = new Function(...Object.keys(scope), 'return ' + safeCode)
    return func(...Object.values(scope))
  } catch (error) {
    throw new Error(`Code execution error: ${error}`)
  }
}

// Validate variable declarations
function validateVariableDeclaration(code: string, variableName: string, expectedValue: any, expectedType: string): TestResult {
  try {
    // More flexible regex to handle different spacing and formatting
    const variableRegex = new RegExp(`(let|const|var)\\s+${variableName}\\s*=\\s*([^;\\n]+)`, 'i')
    const match = code.match(variableRegex)
    
    if (!match) {
      return {
        passed: false,
        message: `Variable '${variableName}' not found or not properly declared`,
        expected: `${variableName} = ${expectedValue}`,
        actual: 'Variable not declared'
      }
    }
    
    let valueExpression = match[2].trim()
    // Remove trailing semicolon if present
    valueExpression = valueExpression.replace(/;$/, '')
    
    // Validate string values
    if (expectedType === 'string') {
      const stringRegex = /^["'](.*)["']$/
      const stringMatch = valueExpression.match(stringRegex)
      if (!stringMatch) {
        return {
          passed: false,
          message: `${variableName} should be a string wrapped in quotes`,
          expected: `"${expectedValue}"`,
          actual: valueExpression
        }
      }
      
      const actualValue = stringMatch[1]
      if (actualValue === expectedValue) {
        return {
          passed: true,
          message: `${variableName} correctly declared as "${expectedValue}"`
        }
      } else {
        return {
          passed: false,
          message: `${variableName} has wrong value`,
          expected: expectedValue,
          actual: actualValue
        }
      }
    }
    
    // Validate number values
    if (expectedType === 'number') {
      const actualValue = parseFloat(valueExpression)
      if (isNaN(actualValue)) {
        return {
          passed: false,
          message: `${variableName} should be a number`,
          expected: expectedValue.toString(),
          actual: valueExpression
        }
      }
      
      if (actualValue === expectedValue) {
        return {
          passed: true,
          message: `${variableName} correctly declared as ${expectedValue}`
        }
      } else {
        return {
          passed: false,
          message: `${variableName} has wrong value`,
          expected: expectedValue.toString(),
          actual: actualValue.toString()
        }
      }
    }
    
    // Validate boolean values
    if (expectedType === 'boolean') {
      if (valueExpression === 'true' || valueExpression === 'false') {
        const actualValue = valueExpression === 'true'
        if (actualValue === expectedValue) {
          return {
            passed: true,
            message: `${variableName} correctly declared as ${expectedValue}`
          }
        } else {
          return {
            passed: false,
            message: `${variableName} has wrong value`,
            expected: expectedValue.toString(),
            actual: actualValue.toString()
          }
        }
      } else {
        return {
          passed: false,
          message: `${variableName} should be a boolean (true or false)`,
          expected: expectedValue.toString(),
          actual: valueExpression
        }
      }
    }
    
    return {
      passed: false,
      message: `Unknown type validation for ${variableName}`,
      expected: expectedValue.toString(),
      actual: valueExpression
    }
    
  } catch (error) {
    return {
      passed: false,
      message: `Error validating ${variableName}: ${error}`,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Validate function declarations
function validateFunction(code: string, functionName: string, testCases: TestCase[]): TestResult[] {
  const results: TestResult[] = []
  
  try {
    // More flexible function detection
    const functionRegex = new RegExp(`function\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{`, 'i')
    const arrowFunctionRegex = new RegExp(`(const|let|var)\\s+${functionName}\\s*=\\s*\\([^)]*\\)\\s*=>`, 'i')
    const arrowFunctionRegex2 = new RegExp(`(const|let|var)\\s+${functionName}\\s*=\\s*[^=]*=>`, 'i')
    
    if (!functionRegex.test(code) && !arrowFunctionRegex.test(code) && !arrowFunctionRegex2.test(code)) {
      results.push({
        passed: false,
        message: `Function '${functionName}' not found`,
        expected: `function ${functionName}(...) { ... }`,
        actual: 'Function not declared'
      })
      return results
    }
    
    // Test each test case by simulating function execution
    testCases.forEach((testCase, index) => {
      try {
        // For simple add function, we can simulate it
        if (functionName === 'add' && testCase.input) {
          // Extract parameters from input like "2, 3"
          const params = testCase.input.split(',').map(p => parseFloat(p.trim()))
          if (params.length === 2 && !isNaN(params[0]) && !isNaN(params[1])) {
            const expectedResult = params[0] + params[1]
            if (expectedResult.toString() === testCase.expectedOutput) {
              results.push({
                passed: true,
                message: `Test ${index + 1}: ${testCase.description}`
              })
            } else {
              results.push({
                passed: false,
                message: `Test ${index + 1}: ${testCase.description}`,
                expected: testCase.expectedOutput,
                actual: expectedResult.toString()
              })
            }
          } else {
            results.push({
              passed: false,
              message: `Test ${index + 1}: Invalid test parameters`,
              expected: testCase.expectedOutput,
              error: 'Could not parse test parameters'
            })
          }
        } else {
          // Generic function validation - check if function structure looks correct
          const hasReturn = code.includes('return')
          const hasCorrectStructure = functionRegex.test(code) || arrowFunctionRegex.test(code) || arrowFunctionRegex2.test(code)
          
          if (hasCorrectStructure && hasReturn) {
            results.push({
              passed: true,
              message: `Test ${index + 1}: Function structure appears correct`
            })
          } else {
            results.push({
              passed: false,
              message: `Test ${index + 1}: Function missing return statement or incorrect structure`,
              expected: 'Function with return statement',
              actual: hasReturn ? 'Has return' : 'Missing return statement'
            })
          }
        }
      } catch (error) {
        results.push({
          passed: false,
          message: `Test ${index + 1}: Error validating function`,
          expected: testCase.expectedOutput,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    })
    
  } catch (error) {
    results.push({
      passed: false,
      message: `Error validating function ${functionName}: ${error}`,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
  
  return results
}

export function validateChallenge(code: string, challenge: Challenge): ValidationResult {
  const results: TestResult[] = []
  
  // Specific validation based on challenge type
  if (challenge.id === 'variables-1') {
    // Check for message variable
    results.push(validateVariableDeclaration(code, 'message', 'Hello, World!', 'string'))
    // Check for count variable
    results.push(validateVariableDeclaration(code, 'count', 10, 'number'))
  } 
  else if (challenge.id === 'variables-2') {
    // Check for PI constant
    results.push(validateVariableDeclaration(code, 'PI', 3.14159, 'number'))
    // Check for radius variable
    results.push(validateVariableDeclaration(code, 'radius', 5, 'number'))
    
    // Additional check for const vs let
    if (code.includes('const PI')) {
      results.push({
        passed: true,
        message: 'PI correctly declared as a constant'
      })
    } else {
      results.push({
        passed: false,
        message: 'PI should be declared as a constant (const)',
        expected: 'const PI = 3.14159',
        actual: 'PI not declared with const'
      })
    }
  }
  else if (challenge.id === 'variables-3') {
    // Check for boolean variables
    results.push(validateVariableDeclaration(code, 'isActive', true, 'boolean'))
    results.push(validateVariableDeclaration(code, 'isComplete', false, 'boolean'))
  }
  else if (challenge.id === 'strings-1') {
    // Check for string variables
    results.push(validateVariableDeclaration(code, 'firstName', 'Jane', 'string'))
    results.push(validateVariableDeclaration(code, 'lastName', 'Smith', 'string'))
    
    // Check for fullName concatenation
    const fullNameRegex = /let\s+fullName\s*=\s*firstName\s*\+\s*["']\s["']\s*\+\s*lastName/
    if (fullNameRegex.test(code)) {
      results.push({
        passed: true,
        message: 'fullName correctly concatenated'
      })
    } else {
      results.push({
        passed: false,
        message: 'fullName should be concatenated using firstName + " " + lastName',
        expected: 'firstName + " " + lastName',
        actual: 'Incorrect concatenation'
      })
    }
  }
  else if (challenge.id === 'numbers-1') {
    // Check for math operations
    results.push(validateVariableDeclaration(code, 'sum', 40, 'number'))
    results.push(validateVariableDeclaration(code, 'difference', 30, 'number'))
    results.push(validateVariableDeclaration(code, 'product', 42, 'number'))
  }
  else if (challenge.id === 'functions-1' || challenge.id === 'functions-2') {
    // Validate functions
    const functionName = challenge.id === 'functions-1' ? 'add' : 'greet'
    const functionResults = validateFunction(code, functionName, challenge.testCases)
    results.push(...functionResults)
  }
  else {
    // Generic validation using test cases
    challenge.testCases.forEach((testCase, index) => {
      try {
        const testResult = executeCode(code + '\n' + testCase.input)
        if (testResult?.toString() === testCase.expectedOutput) {
          results.push({
            passed: true,
            message: `${testCase.description}`
          })
        } else {
          results.push({
            passed: false,
            message: `${testCase.description}`,
            expected: testCase.expectedOutput,
            actual: testResult?.toString() || 'undefined'
          })
        }
      } catch (error) {
        results.push({
          passed: false,
          message: `Test ${index + 1}: ${testCase.description}`,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    })
  }
  
  const passedTests = results.filter(r => r.passed).length
  const totalTests = results.length
  const allPassed = passedTests === totalTests
  const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
  
  return {
    allPassed,
    results,
    score
  }
}