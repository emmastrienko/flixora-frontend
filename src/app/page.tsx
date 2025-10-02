'use client'

import React, { useState, useEffect } from 'react'
import { lessons, getLessonsByDifficulty } from '@/data/lessons'
import { Lesson, UserProgress } from '@/types/lesson'
import { LessonViewer } from '@/components/LessonViewer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Trophy, 
  Clock, 
  Star, 
  PlayCircle,
  Sparkles,
  Zap,
  Target,
  Brain,
  Rocket,
  Crown
} from 'lucide-react'

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')

  const filteredLessons = selectedDifficulty === 'all' 
    ? lessons 
    : getLessonsByDifficulty(selectedDifficulty)

  const handleLessonComplete = (progress: UserProgress) => {
    setUserProgress(prev => [...prev, progress])
    setSelectedLesson(null)
  }

  const getLessonProgress = (lessonId: string) => {
    return userProgress.find(p => p.lessonId === lessonId)
  }

  const completedLessons = userProgress.filter(p => p.completed).length
  const totalScore = userProgress.reduce((sum, p) => sum + p.score, 0)

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onComplete={handleLessonComplete}
        onExit={() => setSelectedLesson(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Professional Header */}
      <header className="border-b border-gray-800/50">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-md flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Flixora</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-300 hover:text-white smooth-hover">Courses</a>
              <a href="#" className="text-gray-300 hover:text-white smooth-hover">Progress</a>
              <a href="#" className="text-gray-300 hover:text-white smooth-hover">Support</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean and professional */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Professional heading */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Master Programming
                <span className="block text-purple-400">Through Practice</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Professional coding education with interactive lessons, AI guidance, and real-world projects. 
                Build skills that matter in today's tech industry.
              </p>
            </motion.div>
            
            {/* Professional stats */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
            >
              <div className="text-center py-6 border border-gray-800 rounded-lg bg-[#111111]">
                <div className="text-2xl font-bold text-white mb-2">{completedLessons}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
              <div className="text-center py-6 border border-purple-600/30 rounded-lg bg-purple-600/5">
                <div className="text-2xl font-bold text-purple-400 mb-2">{totalScore}</div>
                <div className="text-sm text-gray-400">Points Earned</div>
              </div>
              <div className="text-center py-6 border border-gray-800 rounded-lg bg-[#111111]">
                <div className="text-2xl font-bold text-white mb-2">{lessons.length}</div>
                <div className="text-sm text-gray-400">Modules</div>
              </div>
            </motion.div>

            {/* Professional CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg font-medium smooth-hover">
                Start Learning
                <PlayCircle className="w-4 h-4 ml-2" />
              </Button>
              <Button className="border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white px-8 py-3 rounded-lg font-medium smooth-hover bg-transparent">
                View Curriculum
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Professional layout */}
      <section className="bg-[#111111] py-20 border-y border-gray-800/50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Professional Learning Experience
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Industry-standard tools and methodologies designed for serious developers
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-lg flex items-center justify-center">
                <Code className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Interactive Learning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Hands-on coding with instant feedback. Practice in a real development environment 
                with syntax highlighting and error detection.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-600/10 rounded-lg flex items-center justify-center border border-purple-600/20">
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                AI-Powered Guidance
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Smart assistance that adapts to your learning style. Get personalized hints 
                and explanations when you need them most.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-800 rounded-lg flex items-center justify-center">
                <Target className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                Real-World Projects
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Build portfolio-ready applications. Learn through practical projects 
                that mirror actual industry development practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning Modules Section */}
      <section className="bg-[#0a0a0a] py-20">
        <div className="container mx-auto px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-4 text-white"
            >
              Learning Modules
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
            >
              Structured curriculum designed to take you from fundamentals to advanced concepts
            </motion.p>
            
            {/* Filter Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-3 mb-12"
            >
              {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty as any)}
                  className={`capitalize px-6 py-2 rounded-lg text-sm font-medium smooth-hover ${
                    selectedDifficulty === difficulty
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Modules Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => {
              const progress = getLessonProgress(lesson.id)
              const isCompleted = progress?.completed || false
              
              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden smooth-hover hover:border-gray-700"
                >
                  {/* Module Header */}
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-gray-300" />
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            lesson.difficulty === 'beginner' 
                              ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                              : lesson.difficulty === 'intermediate'
                              ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                              : 'bg-red-600/20 text-red-400 border border-red-600/30'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-2 bg-purple-600/10 px-3 py-1 rounded-full border border-purple-600/30">
                          <Star className="w-4 h-4 fill-current text-purple-400" />
                          <span className="text-sm font-medium text-purple-400">{progress?.score}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>
                  
                  {/* Module Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{lesson.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        <span>{lesson.challenges.length} exercises</span>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {lesson.concepts.slice(0, 3).map((concept, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                          >
                            {concept}
                          </span>
                        ))}
                        {lesson.concepts.length > 3 && (
                          <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                            +{lesson.concepts.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full py-3 px-4 text-sm font-medium rounded-lg smooth-hover flex items-center justify-center gap-2 ${
                        isCompleted 
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                          : 'bg-purple-600 hover:bg-purple-500 text-white'
                      }`}
                    >
                      <PlayCircle className="w-4 h-4" />
                      {isCompleted ? 'Review Module' : 'Start Learning'}
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-[#111111] border-t border-gray-800">
        <div className="container mx-auto px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-md flex items-center justify-center">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-semibold text-white">Flixora</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Professional coding education platform designed to help developers master programming through practice.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Learning</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white smooth-hover">Courses</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Challenges</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Projects</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Certificates</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white smooth-hover">Help Center</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Community</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Contact</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white smooth-hover">About</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Blog</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Careers</a></li>
                <li><a href="#" className="hover:text-white smooth-hover">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 Flixora. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white smooth-hover">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white smooth-hover">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white smooth-hover">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
