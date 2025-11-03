import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm John's AI assistant. I can answer questions about his education, work experience, projects, and skills. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Education responses
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('college')) {
      return "John has a Master's in Computer Science from Stanford University (2018-2020) specializing in Distributed Systems and Machine Learning, and a Bachelor's in Software Engineering from UC Berkeley (2014-2018). He maintained a GPA of 3.9/4.0 for his Master's and 3.8/4.0 for his Bachelor's. He also published research on microservices architecture!";
    }

    // Experience responses
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return "John is currently a Senior Full Stack Developer at Tech Innovations Inc. (2022-Present), leading development of a cloud-based SaaS platform with 100K+ users. Previously, he worked at Digital Solutions Corp. (2020-2022) as a Full Stack Developer and StartUp Ventures (2018-2020) as a Junior Software Developer. He has experience leading teams, implementing microservices, and optimizing application performance.";
    }

    // Projects responses
    if (lowerMessage.includes('project') || lowerMessage.includes('built') || lowerMessage.includes('created') || lowerMessage.includes('portfolio')) {
      return "John has built impressive projects including: an E-Commerce Platform with real-time inventory (245 GitHub stars), a Task Management App with real-time collaboration, an AI Content Generator using OpenAI, an Analytics Dashboard with D3.js, a Social Media Scheduler, and a Video Streaming Platform similar to Netflix with 567 stars! Each project showcases his full-stack capabilities.";
    }

    // Skills responses
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('know')) {
      return "John is proficient in: Frontend (React, Vue.js, Next.js, TypeScript), Backend (Node.js, Express, Python, Django, FastAPI), Databases (PostgreSQL, MongoDB, Redis), Cloud & DevOps (AWS, Docker, Kubernetes, CI/CD), and various tools like Git, Jest, and Cypress. He's a true full-stack developer!";
    }

    // Frontend specific
    if (lowerMessage.includes('frontend') || lowerMessage.includes('react') || lowerMessage.includes('vue')) {
      return "John excels in frontend development! He's an expert in React, Vue.js, Next.js, and TypeScript. He's proficient with modern styling using Tailwind CSS, state management with Redux and Zustand, and has built numerous responsive, performant web applications.";
    }

    // Backend specific
    if (lowerMessage.includes('backend') || lowerMessage.includes('server') || lowerMessage.includes('api')) {
      return "On the backend, John works with Node.js, Express, Python, Django, and FastAPI. He has extensive experience with PostgreSQL, MongoDB, Redis, and has built both RESTful and GraphQL APIs. He's also implemented microservices architecture at scale!";
    }

    // Contact responses
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return "You can reach John at john.doe@example.com or call +1 (234) 567-890. He's based in San Francisco, CA. Feel free to connect with him on GitHub or LinkedIn - the links are in the footer! He's always open to discussing new opportunities and collaborations.";
    }

    // GitHub/Social
    if (lowerMessage.includes('github') || lowerMessage.includes('linkedin') || lowerMessage.includes('social')) {
      return "You can find John's work on GitHub and connect with him on LinkedIn! His projects have received hundreds of stars. Check out the links in the navigation bar and footer to connect with him.";
    }

    // Current role
    if (lowerMessage.includes('current') || lowerMessage.includes('now') || lowerMessage.includes('doing')) {
      return "Currently, John is a Senior Full Stack Developer at Tech Innovations Inc., where he leads development of a cloud-based SaaS platform serving over 100,000 users. He manages a team of 5 developers and has improved application performance by 40%!";
    }

    // Achievements
    if (lowerMessage.includes('achievement') || lowerMessage.includes('accomplishment') || lowerMessage.includes('award')) {
      return "John has impressive achievements including: improving application performance by 40%, reducing deployment time by 60% with CI/CD, achieving 85% code coverage, being on the Dean's List all semesters, and publishing research on microservices. His projects on GitHub have received over 1,800+ stars combined!";
    }

    // Location
    if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('based')) {
      return "John is based in San Francisco, California, USA. He's worked in the Bay Area throughout his career, including positions in San Jose and Los Angeles.";
    }

    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi' || lowerMessage.includes('hey')) {
      return "Hello! 👋 I'm here to help you learn more about John Doe. You can ask me about his education, work experience, projects, skills, or how to contact him. What interests you?";
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Feel free to ask if you have any other questions about John's background or experience. 😊";
    }

    // Default response
    return "That's a great question! I can tell you about John's education (Master's & Bachelor's degrees), work experience (Senior Full Stack Developer with 7+ years), projects (E-Commerce Platform, AI tools, Video Streaming, etc.), skills (React, Node.js, AWS, Docker, and more), or how to contact him. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's your experience?",
    "Tell me about your projects",
    "What skills do you have?",
    "How can I contact you?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96"
          >
            <Card className="bg-gray-900 border-gray-700 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[80vh]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white">Portfolio Assistant</h3>
                    <p className="text-blue-100 text-xs">Ask me anything!</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-850" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender === 'bot' && (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-200'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      {message.sender === 'user' && (
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5 text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2 justify-start"
                    >
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 bg-gray-850 border-t border-gray-800">
                  <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-full transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-gray-900 border-t border-gray-800">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
