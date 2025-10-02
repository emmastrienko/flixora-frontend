'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { AIHint, Challenge } from '@/types/lesson'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  challengeContext?: string
  currentCode?: string
  lessonConcepts?: string[]
  currentChallenge?: Challenge
  onHintGenerated?: (hint: AIHint) => void
}

export function AIAssistant({ challengeContext, currentCode, lessonConcepts, currentChallenge, onHintGenerated }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your coding assistant 🤖 I'm here to help you learn and solve challenges. Ask me anything about the code, concepts, or if you need a hint!",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Context-aware responses based on current challenge and code
    if (lowerMessage.includes('hint') || lowerMessage.includes('help')) {
      if (currentChallenge) {
        // Challenge-specific hints
        if (currentChallenge.id === 'variables-1') {
          return "💡 For this challenge, you need to create two variables: 'message' (a string) and 'count' (a number). Remember: strings go in quotes, numbers don't! Try: let message = \"Hello, World!\"; let count = 10;"
        }
        if (currentChallenge.id === 'variables-2') {
          return "💡 This challenge needs a constant PI and a variable radius. Use 'const' for PI since it never changes, and 'let' for radius. Example: const PI = 3.14159; let radius = 5;"
        }
        if (currentChallenge.id === 'functions-1') {
          return "💡 You need to create a function called 'add' that takes two parameters and returns their sum. Try: function add(a, b) { return a + b; }"
        }
        
        // Use challenge hints if available
        if (currentChallenge.hints.length > 0) {
          const randomHint = currentChallenge.hints[Math.floor(Math.random() * currentChallenge.hints.length)]
          return `💡 ${randomHint}`
        }
      }
      
      // General hints based on lesson concepts
      if (lessonConcepts?.includes('variables')) {
        return "💡 Remember: use 'let' for values that change, 'const' for values that stay the same. Strings need quotes, numbers don't!"
      }
      if (lessonConcepts?.includes('functions')) {
        return "💡 Functions have this structure: function name(parameters) { return result; }. Don't forget the return statement!"
      }
      
      return "💡 Break the problem into smaller steps. What's the first thing you need to do? Check the instructions again!"
    }
    
    // Code analysis responses
    if (currentCode && (lowerMessage.includes('code') || lowerMessage.includes('check') || lowerMessage.includes('wrong'))) {
      if (currentCode.trim() === '') {
        return "I see you haven't started coding yet! That's okay - start by reading the instructions carefully and think about what variables or functions you need to create."
      }
      
      // Check for common issues
      if (currentCode.includes('let') || currentCode.includes('const')) {
        if (!currentCode.includes(';')) {
          return "🔍 I notice you might be missing semicolons (;) at the end of your statements. While not always required, they're good practice in JavaScript!"
        }
        return "👀 I can see you're declaring variables! Make sure you're using the right names and values as specified in the challenge."
      }
      
      if (currentCode.includes('function')) {
        if (!currentCode.includes('return')) {
          return "🔍 I see you're working on a function! Don't forget to include a 'return' statement to send back the result."
        }
        return "👀 Your function structure looks good! Make sure the parameter names and logic match what the challenge is asking for."
      }
      
      return "🔍 Looking at your code... Try running it to see the test results! The feedback will help you understand what needs to be fixed."
    }
    
    // Concept explanations
    if (lowerMessage.includes('variable') || lowerMessage.includes('let') || lowerMessage.includes('const')) {
      return "📝 Variables are like labeled boxes that store data! Use 'let variableName = value;' for values that might change, and 'const variableName = value;' for values that stay the same. Strings need quotes: \"text\", numbers don't: 42"
    }
    
    if (lowerMessage.includes('function')) {
      return "🔧 Functions are reusable blocks of code! Basic syntax: function name(param1, param2) { return result; }. They take inputs (parameters), do something with them, and return an output."
    }
    
    if (lowerMessage.includes('string')) {
      return "🔤 Strings are text data in JavaScript! They must be wrapped in quotes: \"Hello\" or 'Hello'. You can use either single or double quotes, just be consistent!"
    }
    
    if (lowerMessage.includes('number')) {
      return "🔢 Numbers in JavaScript don't need quotes! You can use integers (42) or decimals (3.14). JavaScript handles both the same way."
    }
    
    if (lowerMessage.includes('error') || lowerMessage.includes('bug') || lowerMessage.includes('wrong')) {
      return "🐛 Debugging is a normal part of coding! Common issues: missing quotes around strings, typos in variable names, missing semicolons, or using the wrong data type. Check the test results for specific feedback!"
    }
    
    if (lowerMessage.includes('thank')) {
      return "🌟 You're very welcome! I'm here to help you learn. Keep practicing and asking questions - that's how you become a great programmer!"
    }
    
    // Motivational responses
    if (lowerMessage.includes('difficult') || lowerMessage.includes('hard') || lowerMessage.includes('stuck')) {
      return "💪 I understand it can feel challenging! Programming is like learning a new language - it takes practice. Break the problem into tiny steps, and celebrate each small victory. You're doing great!"
    }
    
    if (lowerMessage.includes('confused') || lowerMessage.includes('understand')) {
      return "🤔 That's totally normal! Confusion means you're learning something new. Try re-reading the lesson content, look at the examples, and don't hesitate to ask specific questions about what confuses you."
    }
    
    // Default encouraging responses with context
    const contextualResponses = [
      currentChallenge ? 
        `Great question about "${currentChallenge.title}"! Take your time to understand the requirements and experiment with the code.` :
        "Great question! Keep exploring and experimenting with the code. That's how you learn best!",
      
      lessonConcepts ? 
        `You're learning about ${lessonConcepts.slice(0, 2).join(' and ')} - these are fundamental concepts that you'll use everywhere in programming!` :
        "These concepts you're learning will be the foundation for everything else in programming!",
      
      "🎯 Every expert programmer started exactly where you are now. Keep practicing and asking questions!",
      "💡 Try making small changes to see what happens - experimentation is one of the best ways to learn!",
      "🚀 You're building real programming skills here! Each challenge makes you stronger."
    ]
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 seconds delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-l">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <Bot className="w-5 h-5" />
        <h3 className="font-semibold">AI Assistant</h3>
        <Sparkles className="w-4 h-4 ml-auto" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about coding..."
            className="flex-1 p-2 border rounded-lg resize-none h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            size="icon"
            className="h-10 w-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}