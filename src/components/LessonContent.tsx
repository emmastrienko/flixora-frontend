'use client'

import React from 'react'
import { Lesson } from '@/types/lesson'
import { motion } from 'framer-motion'
import { 
  Code, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight, 
  BookOpen,
  Zap,
  Target,
  Star
} from 'lucide-react'

interface LessonContentProps {
  lesson: Lesson
}

export function LessonContent({ lesson }: LessonContentProps) {
  const renderCodeBlock = (code: string, language: string = 'javascript') => (
    <div className="relative group">
      <div className="absolute top-3 right-3 bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-mono">
        {language}
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto border-l-4 border-blue-500">
        <code>{code}</code>
      </pre>
    </div>
  )

  const renderSection = (title: string, content: string, icon: React.ReactNode, color: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r ${color} p-6 rounded-xl shadow-lg mb-6`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <div className="text-white/90 leading-relaxed">
        {content}
      </div>
    </motion.div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 rounded-2xl text-white mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <BookOpen className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-xl opacity-90">{lesson.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-medium">{lesson.difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="font-medium">{lesson.duration} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="font-medium">{lesson.challenges.length} challenges</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-xl shadow-lg mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">What You'll Learn</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          {lesson.concepts.map((concept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center gap-2 bg-white/10 p-3 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-emerald-200" />
              <span className="text-white font-medium">{concept}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content with Enhanced Design */}
      <div className="space-y-8">
        {/* Variables Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
            <div className="flex items-center gap-3">
              <Code className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Variable Declaration</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              In JavaScript, variables are like <strong>labeled containers</strong> that store data values. 
              Think of them as boxes where you put information that you want to use later!
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">let</h4>
                <p className="text-green-700 dark:text-green-400 text-sm">
                  For variables that can change their value
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-4 rounded-lg">
                <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">const</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  For values that stay the same
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 p-4 rounded-lg">
                <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">var</h4>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  Legacy way (avoid in modern JS)
                </p>
              </div>
            </div>

            {renderCodeBlock(`// Modern JavaScript variable declarations
let playerName = "Alice";        // Can be changed later
const maxScore = 100;            // Cannot be changed
let currentScore = 0;            // Will change during game

// Later in the code...
playerName = "Bob";              // ✅ Allowed with let
currentScore = 85;               // ✅ Allowed with let
// maxScore = 200;               // ❌ Error! Cannot change const`)}
          </div>
        </motion.div>

        {/* Data Types Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4">
            <div className="flex items-center gap-3">
              <Target className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Data Types</h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              JavaScript has several built-in data types. Each type serves a different purpose:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-bold text-yellow-800 dark:text-yellow-300">String</h4>
                  <p className="text-yellow-700 dark:text-yellow-400 text-sm mb-2">Text data wrapped in quotes</p>
                  <code className="text-xs bg-yellow-100 dark:bg-yellow-800/30 px-2 py-1 rounded">
                    "Hello World!"
                  </code>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-bold text-blue-800 dark:text-blue-300">Number</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm mb-2">Numeric values (integers or decimals)</p>
                  <code className="text-xs bg-blue-100 dark:bg-blue-800/30 px-2 py-1 rounded">
                    42, 3.14, -7
                  </code>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4 py-2 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-bold text-green-800 dark:text-green-300">Boolean</h4>
                  <p className="text-green-700 dark:text-green-400 text-sm mb-2">True or false values</p>
                  <code className="text-xs bg-green-100 dark:bg-green-800/30 px-2 py-1 rounded">
                    true, false
                  </code>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-gray-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700/20">
                  <h4 className="font-bold text-gray-800 dark:text-gray-300">Undefined</h4>
                  <p className="text-gray-700 dark:text-gray-400 text-sm mb-2">Variable declared but no value assigned</p>
                  <code className="text-xs bg-gray-100 dark:bg-gray-600/30 px-2 py-1 rounded">
                    let x; // x is undefined
                  </code>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 dark:bg-red-900/20">
                  <h4 className="font-bold text-red-800 dark:text-red-300">Null</h4>
                  <p className="text-red-700 dark:text-red-400 text-sm mb-2">Intentionally empty value</p>
                  <code className="text-xs bg-red-100 dark:bg-red-800/30 px-2 py-1 rounded">
                    let data = null;
                  </code>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {renderCodeBlock(`// Real-world examples of data types
let userName = "CodeMaster2024";     // String - user's name
let userAge = 25;                    // Number - user's age  
let isLoggedIn = true;               // Boolean - login status
let profilePicture = null;           // Null - no picture yet
let favoriteColor;                   // Undefined - not set yet

// You can check the type of any variable
console.log(typeof userName);        // "string"
console.log(typeof userAge);         // "number"
console.log(typeof isLoggedIn);      // "boolean"`)}
            </div>
          </div>
        </motion.div>

        {/* Interactive Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-xl text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Try It Yourself!</h3>
          </div>
          <p className="text-white/90 mb-4">
            Ready to write your first JavaScript variables? Click the "Start Coding Challenges" button 
            below to practice what you've learned with interactive exercises!
          </p>
          <div className="flex items-center gap-2 text-white/80">
            <ArrowRight className="w-5 h-5" />
            <span>Complete the challenges to master variables and data types</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}