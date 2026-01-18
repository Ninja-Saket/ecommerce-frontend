import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../../apiCalls/chatAssistant';
import { Link } from 'react-router-dom';
import './ChatAssistant.css';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sendChatMessage(inputValue);
      
      const assistantMessage = {
        type: 'assistant',
        text: response.data.text,
        products: response.data.products || [],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage = {
        type: 'assistant',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="chat-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="AI Shopping Assistant"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>🤖 AI Shopping Assistant</h4>
            <p>Ask me anything about products!</p>
          </div>

          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <p>👋 Hi! I'm your AI shopping assistant.</p>
                <p>Ask me questions like:</p>
                <ul>
                  <li>"I need a laptop for programming"</li>
                  <li>"Which product has the best battery life?"</li>
                  <li>"Compare MacBook and Dell XPS"</li>
                </ul>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  
                  {/* Product Cards */}
                  {message.products && message.products.length > 0 && (
                    <div className="product-cards">
                      {message.products.map((product) => (
                        <div key={product._id} className="product-card">
                          {product.images && product.images.length > 0 && (
                            <img
                              src={product.images[0].url}
                              alt={product.title}
                              className="product-image"
                            />
                          )}
                          <div className="product-info">
                            <h5>{product.title}</h5>
                            <p className="product-price">Rs. {product.price}</p>
                            <Link
                              to={`/product/${product.slug}`}
                              className="btn btn-sm btn-primary"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about products..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
