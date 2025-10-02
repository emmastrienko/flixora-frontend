'use client'

import React, { useState, useEffect } from 'react'
import { Lesson, Challenge, UserProgress } from '@/types/lesson'
import { CodeEditor } from './CodeEditor'
import { AIAssistant } from './AIAssistant'
import { LessonContent } from './LessonContent'
import { Button } from './ui/button'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Code, Trophy, Clock, Star, ArrowRight, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatTime } from '@/lib/utils'

interface LessonViewerProps {
  lesson: Lesson
  onComplete: (progress: UserProgress) => void
  onExit: () => void
}

export function LessonViewer({ lesson, onComplete, onExit }: LessonViewerProps) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [showContent, setShowContent] = useState(true)
  const [startTime] = useState(Date.now())
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [attempts, setAttempts] = useState(0)

  const currentChallenge = lesson.challenges[currentChallengeIndex]
  const totalChallenges = lesson.challenges.length
  const progressPercentage = (completedChallenges.size / totalChallenges) * 100

  const [currentCode, setCurrentCode] = useState('')

  const handleChallengeComplete = (success: boolean, code: string) => {
    setAttempts(prev => prev + 1)
    
    if (success) {
      setCompletedChallenges(prev => new Set([...prev, currentChallengeIndex]))
      
      // Move to next challenge or complete lesson
      if (currentChallengeIndex < totalChallenges - 1) {
        setTimeout(() => {
          setCurrentChallengeIndex(prev => prev + 1)
          setCurrentCode('') // Reset code for next challenge
        }, 1500)
      } else {
        // Lesson completed
        const timeSpent = Math.floor((Date.now() - startTime) / 1000)
        const progress: UserProgress = {
          lessonId: lesson.id,
          challengeId: currentChallenge.id,
          completed: true,
          score: Math.max(100 - (attempts - totalChallenges) * 10, 50), // Score based on attempts
          timeSpent,
          attempts,
          completedAt: new Date()
        }
        onComplete(progress)
      }
    }
  }

  const handleCodeChange = (code: string) => {
    setCurrentCode(code)
  }

  const handleRequestHint = () => {
    // AI Assistant will handle hint generation
    console.log('Hint requested for challenge:', currentChallenge.id)
  }

  const nextChallenge = () => {
    if (currentChallengeIndex < totalChallenges - 1) {
      setCurrentChallengeIndex(prev => prev + 1)
    }
  }

  const previousChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onExit}>
                ← Back to Lessons
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {lesson.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                {lesson.duration} min
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Trophy className="w-4 h-4" />
                {completedChallenges.size}/{totalChallenges} completed
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Progress: {Math.round(progressPercentage)}%
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex border-t">
          <button
            onClick={() => setShowContent(true)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              showContent
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Lesson Content
          </button>
          <button
            onClick={() => setShowContent(false)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              !showContent
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Code className="w-4 h-4 inline mr-2" />
            Challenge {currentChallengeIndex + 1}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <AnimatePresence mode="wait">
          {showContent ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 overflow-hidden"
            >
              {/* Lesson Content */}
              <div className="h-full flex">
                <div className="flex-1 overflow-y-auto">
                  <LessonContent lesson={lesson} />
                  
                  {/* Start Coding Button */}
                  <div className="text-center p-6">
                    <Button
                      onClick={() => setShowContent(false)}
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Start Coding Challenges
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
                
                {/* AI Assistant */}
                <div className="w-80">
                  <AIAssistant 
                    challengeContext={`Lesson: ${lesson.title} - ${lesson.description}`}
                    currentCode=""
                    lessonConcepts={lesson.concepts}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 flex overflow-hidden"
            >
              {/* Challenge Navigation */}
              <div className="w-80 bg-white dark:bg-gray-800 border-r flex flex-col">
                <div className="p-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <h3 className="font-bold text-lg mb-2">Challenge Progress</h3>
                  <div className="text-sm opacity-90">
                    {completedChallenges.size} of {totalChallenges} completed
                  </div>
                  <div className="mt-2 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {lesson.challenges.map((challenge, index) => (
                      <button
                        key={challenge.id}
                        onClick={() => setCurrentChallengeIndex(index)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${
                          index === currentChallengeIndex
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-500 shadow-md transform scale-[1.02]'
                            : completedChallenges.has(index)
                            ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 hover:border-green-300'
                            : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              completedChallenges.has(index)
                                ? 'bg-green-500 text-white'
                                : index === currentChallengeIndex
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                            }`}>
                              {completedChallenges.has(index) ? '✓' : index + 1}
                            </div>
                            <span className={`font-semibold text-sm ${
                              index === currentChallengeIndex 
                                ? 'text-blue-700 dark:text-blue-300' 
                                : completedChallenges.has(index)
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {challenge.title}
                            </span>
                          </div>
                          {completedChallenges.has(index) && (
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {challenge.description}
                        </p>
                        {index === currentChallengeIndex && (
                          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
                            → Currently Active
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="p-4 border-t bg-gray-50 dark:bg-gray-700/50">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={previousChallenge}
                      disabled={currentChallengeIndex === 0}
                      className="flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      onClick={nextChallenge}
                      disabled={currentChallengeIndex === totalChallenges - 1}
                      className="flex items-center justify-center gap-2"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 text-center">
                    Challenge {currentChallengeIndex + 1} of {totalChallenges}
                  </div>
                </div>
              </div>
              
              {/* Code Editor */}
              <div className="flex-1">
                <CodeEditor
                  challenge={currentChallenge}
                  onComplete={handleChallengeComplete}
                  onRequestHint={handleRequestHint}
                  onCodeChange={handleCodeChange}
                />
              </div>
              
              {/* AI Assistant */}
              <div className="w-96">
                <AIAssistant
                  challengeContext={`Challenge: ${currentChallenge.title} - ${currentChallenge.instructions}`}
                  currentCode={currentCode}
                  lessonConcepts={lesson.concepts}
                  currentChallenge={currentChallenge}
                  onHintGenerated={handleRequestHint}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}