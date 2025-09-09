import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Send,
  Bot,
  User,
  Minimize2,
  Maximize2,
  MessageCircle,
  X
} from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  options?: string[];
}

interface ChatBotProps {
  onPageChange?: (page: string) => void;
}

export default function AdminChatBot({ onPageChange }: ChatBotProps) {
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
    content: "👋 Hi! I'm your admin assistant. I can help you navigate the dashboard, understand analytics, or guide you through management tasks. What would you like to know?",
    timestamp: new Date(),
    options: [
      "Show me blog analytics",
      "How to add new products?",
      "Customer management help",
      "Inventory alerts explanation"
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
      ...(options && { options })
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

    if (lowerMessage.includes('blog') || lowerMessage.includes('analytics')) {
      addMessage(
        "I can help you with blog management! Here's what you can do:\n\n• Create and edit articles with rich text editor\n• Manage categories and tags\n• Track article performance\n• Schedule posts for future publishing\n• Optimize SEO settings\n\nWould you like me to take you to the blog management section?",
        'bot',
        ['Yes, take me there', 'Show me analytics', 'How to create article']
      );
    } else if (lowerMessage.includes('product') || lowerMessage.includes('inventory')) {
      addMessage(
        "Product management is powerful! You can:\n\n• Add new products with full details\n• Manage inventory levels and alerts\n• Track supplier performance\n• Set reorder points\n• Monitor stock analytics\n\nWhat specific area interests you?",
        'bot',
        ['Add new product', 'Check inventory alerts', 'Supplier management', 'View analytics']
      );
    } else if (lowerMessage.includes('customer') || lowerMessage.includes('crm')) {
      addMessage(
        "Customer management helps you:\n\n• Track customer interactions\n• Manage customer segments\n• Monitor lifetime value\n• Schedule follow-ups\n• Analyze customer behavior\n\nWhich aspect would you like to explore?",
        'bot',
        ['View customer profiles', 'Check interactions', 'Segment analysis', 'Go to CRM']
      );
    } else if (lowerMessage.includes('take me there') || lowerMessage.includes('blog management')) {
      addMessage(
        "Perfect! I'll redirect you to the blog management section where you can create, edit, and manage all your articles.",
        'bot'
      );
      setTimeout(() => {
        closeChat();
        // This would trigger navigation to blog section
      }, 1000);
    } else {
      addMessage(
        "I'm here to help you navigate the admin dashboard efficiently. Here are the main areas I can assist with:\n\n• Blog & Content Management\n• Product & Inventory Control\n• Customer Relationship Management\n• Team & Services Management\n• Analytics & Reporting\n\nWhat would you like to explore?",
        'bot',
        ['Blog management', 'Product management', 'Customer management', 'View all features']
      );
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={openChat}
          size="sm"
          className="h-12 w-12 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative group rounded-full"
        >
          <MessageCircle className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 bg-destructive text-destructive-foreground flex items-center justify-center text-xs rounded-full">
              {unreadCount}
            </Badge>
          )}
          <div className="absolute -top-2 -left-32 bg-foreground text-background px-3 py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap rounded-lg">
            Need help? Ask me anything!
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`glass-effect shadow-2xl border border-border/50 transition-all duration-300 rounded-xl overflow-hidden ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/20 bg-gradient-to-r from-primary/5 to-blue-600/5">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Admin Assistant</h4>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Ready to help</span>
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-primary to-blue-600 text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {message.type === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    
                    <div>
                      <div className={`px-3 py-2 rounded-lg text-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-primary to-blue-600 text-white'
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
                              className="block w-full text-left text-xs text-primary hover:text-primary-foreground hover:bg-primary bg-primary/10 rounded-md px-2 py-1 transition-colors"
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
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-muted px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
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
                  placeholder="Ask me anything about the dashboard..."
                  className="flex-1 text-sm"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-9 w-9 bg-gradient-to-r from-primary to-blue-600"
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