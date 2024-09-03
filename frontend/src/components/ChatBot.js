import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageSend = async () => {
    if (input.trim()) {
      const newMessage = { sender: 'user', text: input };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch('http://localhost:8000/api/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        const botMessage = { sender: 'bot', text: data.reply };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message to backend:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    const chatbotWindow = document.querySelector('.chatbot-window');
    if (chatbotWindow) {
      if (isOpen) {
        setTimeout(() => {
          chatbotWindow.classList.add('active');
        }, 100);
      } else {
        chatbotWindow.classList.remove('active');
      }
    }
  }, [isOpen]);

  return (
    <div className="chatbot-container">
      <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
        <button onClick={toggleChatbot} className="chatbot-close-button">✖️</button>
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="chatbot-message typing">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>
        <div className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === 'Enter' ? handleMessageSend() : null)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={handleMessageSend}>➤</button>
        </div>
      </div>
      <button onClick={toggleChatbot} className="chatbot-toggle-button">
        {isOpen ? '⇩' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
