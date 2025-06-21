'use client';

import {
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
};

type ChatBoxProps = {
  className?: string;
};

export function ChatBox({ className = '' }: ChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsOpen(false);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const simulateAssistantResponse = (_userMessage: string) => {
    setIsTyping(true);

    setTimeout(
      () => {
        const responses = [
          'That\'s a great question! Let me help you with that.',
          'I understand what you\'re looking for. Here\'s what I suggest...',
          'Thanks for asking! Based on your query, I recommend...',
          'I can definitely help with that. Let me provide some guidance...',
          'That\'s an interesting point. Here\'s my perspective on it...',
        ];

        const randomResponse
          = responses[Math.floor(Math.random() * responses.length)]
            || 'I\'m here to help!';

        const assistantMessage: Message = {
          id: Date.now().toString(),
          text: randomResponse,
          sender: 'assistant',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000,
    ); // Random delay between 1-3 seconds
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Auto-open and expand if user starts chatting
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else if (isMinimized) {
      setIsMinimized(false);
    }

    // Simulate assistant response
    simulateAssistantResponse(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <button
          onClick={handleToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div
        className={`bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-14' : 'w-96 h-[500px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center space-x-2">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            <h3 className="font-semibold">AI Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-blue-700 rounded p-1 transition-colors"
              aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-blue-700 rounded p-1 transition-colors"
              aria-label="Close chat"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[380px]">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-blue-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      >
                      </div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      >
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg px-3 py-2 transition-colors"
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
