import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Calendar,
  ArrowRight,
  Clock,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
}

interface ChatBotProps {
  onPageChange: (page: string) => void;
}

export default function ChatBot({ onPageChange }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show initial message after 30 seconds
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 0) {
        setUnreadCount(1);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const initialMessage: Message = {
    id: '1',
    type: 'bot',
    content: "👋 Hi! I'm Alex, your technology consultant assistant. I'm here to help you find the perfect solution for your business needs. What brings you here today?",
    timestamp: new Date(),
    options: [
      "I need help with network security",
      "Looking for cloud migration",
      "Hardware recommendations",
      "General consultation"
    ]
  };

  const openChat = () => {
    setIsOpen(true);
    setUnreadCount(0);
    if (messages.length === 0) {
      setMessages([initialMessage]);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const addMessage = (content: string, type: 'bot' | 'user', options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || currentMessage.trim();
    if (!messageToSend) return;

    addMessage(messageToSend, 'user');
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      generateBotResponse(messageToSend);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('security') || lowerMessage.includes('network')) {
      addMessage(
        "Great choice! Network security is crucial for business protection. Based on your needs, I'd recommend our comprehensive security audit that includes:\n\n• Zero-trust architecture assessment\n• Vulnerability scanning\n• Compliance review\n\nWould you like to schedule a free security consultation?",
        'bot',
        ['Yes, book consultation', 'Learn more about services', 'Get pricing info']
      );
    } else if (lowerMessage.includes('cloud') || lowerMessage.includes('migration')) {
      addMessage(
        "Cloud migration is a smart move! We can help you:\n\n• Assess your current infrastructure\n• Design a migration strategy\n• Ensure minimal downtime\n• Optimize costs\n\nWhat's your current setup like?",
        'bot',
        ['On-premise servers', 'Hybrid environment', 'Legacy systems', 'Start fresh']
      );
    } else if (lowerMessage.includes('hardware') || lowerMessage.includes('equipment')) {
      addMessage(
        "I can help you find the perfect hardware! We offer:\n\n• Enterprise workstations\n• Server solutions\n• Networking equipment\n• Security devices\n\nWhat type of hardware are you looking for?",
        'bot',
        ['View hardware catalog', 'Get custom quote', 'Speak with expert']
      );
    } else if (lowerMessage.includes('yes') || lowerMessage.includes('book') || lowerMessage.includes('consultation')) {
      addMessage(
        "Perfect! I'll connect you with one of our senior consultants. They'll be able to:\n\n• Assess your specific needs\n• Provide custom recommendations\n• Discuss pricing and timelines\n\nShall I redirect you to our contact page to schedule?",
        'bot',
        ['Yes, take me there', 'Tell me more first', 'Get contact info']
      );
    } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost')) {
      addMessage(
        "Our pricing is always customized to your specific needs, but here are some starting points:\n\n• Security audit: From $2,500\n• Cloud migration: From $5,000\n• Hardware solutions: Custom quotes\n• Ongoing support: From $500/month\n\nWant a detailed quote for your situation?",
        'bot',
        ['Get custom quote', 'Learn about financing', 'Speak with sales']
      );
    } else {
      addMessage(
        "I understand you're looking for technology solutions. Let me help you find exactly what you need. Our most popular services include:\n\n• Network security & architecture\n• Cloud infrastructure\n• Hardware solutions\n• Data protection\n\nWhich area interests you most?",
        'bot',
        ['Security solutions', 'Cloud services', 'Hardware needs', 'Speak with expert']
      );
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);

    // Handle specific navigation
    if (option.includes('take me there') || option.includes('contact')) {
      setTimeout(() => {
        closeChat();
        onPageChange('contact');
      }, 1000);
    } else if (option.includes('hardware catalog')) {
      setTimeout(() => {
        closeChat();
        onPageChange('hardware');
      }, 1000);
    } else if (option.includes('services')) {
      setTimeout(() => {
        closeChat();
        onPageChange('services');
      }, 1000);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          size="sm"
          className="h-10 w-10 bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative group"
        >
          <MessageCircle className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
          <div className="absolute -top-2 -left-20 bg-foreground text-background px-3 py-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Need help? Chat with us!
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`glass-effect shadow-2xl border border-border/50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Alex - Technology Assistant</h4>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500"></div>
                <span className="text-xs text-muted-foreground">Online now</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMinimize}
              className="h-6 w-6"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeChat}
              className="h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    
                    <div>
                      <div className={`px-3 py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}>
                        <div className="whitespace-pre-line">{message.content}</div>
                      </div>
                      
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="block w-full text-left text-xs text-primary hover:text-primary-foreground hover:bg-primary bg-primary/10 px-2 py-1 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-muted flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-muted px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground animate-pulse"></div>
                      <div className="w-2 h-2 bg-muted-foreground animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-muted-foreground animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-2"
              >
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9"
                  disabled={!currentMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}