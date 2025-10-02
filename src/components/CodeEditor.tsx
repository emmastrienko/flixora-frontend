'use client'

import React, { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, AlertTriangle, Code } from 'lucide-react'
import { Challenge } from '@/types/lesson'
import { validateChallenge, ValidationResult } from '@/lib/codeValidator'

interface CodeEditorProps {
  challenge: Challenge
  onComplete: (success: boolean, code: string) => void
  onRequestHint: () => void
  onCodeChange?: (code: string) => void
}

export function CodeEditor({ challenge, onComplete, onRequestHint, onCodeChange }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  const handleRun = async () => {
    setIsRunning(true)
    setOutput('🔍 Analyzing your code...')
    
    // Simulate analysis time
    setTimeout(() => {
      try {
        const result = validateChallenge(code, challenge)
        setValidationResult(result)
        
        if (result.allPassed) {
          setOutput(`🎉 Excellent work! All tests passed! Score: ${result.score}/100`)
          setTimeout(() => {
            onComplete(true, code)
          }, 2000)
        } else {
          const passedCount = result.results.filter(r => r.passed).length
          const totalCount = result.results.length
          setOutput(`📊 Tests completed: ${passedCount}/${totalCount} passed. Score: ${result.score}/100`)
        }
      } catch (error) {
        setOutput(`❌ Error analyzing code: ${error}`)
        setValidationResult(null)
      }
      setIsRunning(false)
    }, 1500)
  }

  const handleReset = () => {
    setCode(challenge.starterCode)
    setOutput('')
    setValidationResult(null)
    onCodeChange?.(challenge.starterCode)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Challenge Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold">{challenge.title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestHint}
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Lightbulb className="w-4 h-4" />
              Hint
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </div>
        
        {/* Challenge Description */}
        <div className="bg-white/10 rounded-lg p-4 mb-3">
          <p className="text-white/90 mb-2 font-medium">
            {challenge.description}
          </p>
          <div className="text-white/80 text-sm">
            <strong>📝 Your Task:</strong> {challenge.instructions}
          </div>
        </div>

        {/* Run Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleRun}
            disabled={isRunning}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg px-8"
          >
            <Play className="w-5 h-5 mr-2" />
            {isRunning ? 'Analyzing Code...' : 'Run & Test Code'}
          </Button>
        </div>
      </div>

      {/* Main Content Area - Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor Section */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white dark:bg-gray-800 border-b px-4 py-2">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Code className="w-4 h-4" />
              Code Editor
            </h3>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => handleCodeChange(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>
        </div>

        {/* Results Panel */}
        <div className="w-1/2 bg-white dark:bg-gray-800 border-l flex flex-col">
          <div className="border-b px-4 py-2 bg-gray-50 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Test Results
              {validationResult && (
                <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                  validationResult.allPassed 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
                }`}>
                  Score: {validationResult.score}%
                </span>
              )}
            </h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {!output && !validationResult && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <Play className="w-12 h-12 mb-4 opacity-30" />
                <p className="text-center">
                  Click "Run & Test Code" to see your results here!
                </p>
                <p className="text-sm text-center mt-2 opacity-75">
                  Your code will be tested against multiple test cases
                </p>
              </div>
            )}
            
            {output && (
              <div className={`mb-4 p-4 rounded-lg text-sm font-medium border-l-4 ${
                output.includes('🎉') 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-500'
                  : output.includes('❌')
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-500'
                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-500'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  {output.includes('🎉') ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : output.includes('❌') ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                  <span className="font-semibold">Overall Result</span>
                </div>
                {output}
              </div>
            )}
            
            {validationResult?.results && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2">
                  Detailed Test Results ({validationResult.results.filter(r => r.passed).length}/{validationResult.results.length} passed)
                </h4>
                {validationResult.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      result.passed
                        ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-1 rounded-full ${
                        result.passed 
                          ? 'bg-green-100 dark:bg-green-800' 
                          : 'bg-red-100 dark:bg-red-800'
                      }`}>
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-300" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-300" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium text-sm mb-2 ${
                          result.passed 
                            ? 'text-green-800 dark:text-green-200' 
                            : 'text-red-800 dark:text-red-200'
                        }`}>
                          Test #{index + 1}: {result.message.replace(/[✅❌]/g, '').trim()}
                        </div>
                        
                        {(result.expected || result.actual) && (
                          <div className="space-y-2 text-xs">
                            {result.expected && (
                              <div className="bg-white/50 dark:bg-black/20 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Expected:</span>
                                <code className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                                  {result.expected}
                                </code>
                              </div>
                            )}
                            {result.actual && (
                              <div className="bg-white/50 dark:bg-black/20 p-2 rounded">
                                <span className="font-medium text-gray-700 dark:text-gray-300">Your Output:</span>
                                <code className="ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
                                  {result.actual}
                                </code>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {result.error && (
                          <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded">
                            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 mb-1">
                              <AlertTriangle className="w-3 h-3" />
                              <span className="font-medium text-xs">Error Details:</span>
                            </div>
                            <code className="text-xs text-red-700 dark:text-red-300 font-mono block">
                              {result.error}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}