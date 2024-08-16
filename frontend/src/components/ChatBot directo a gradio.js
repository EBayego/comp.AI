import React, { useState } from 'react';
import { Client } from "@gradio/client";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageSend = async () => {
    if (input.trim()) {
      const newMessage = { sender: 'user', text: input };
      setMessages([...messages, newMessage]);
      setInput('');
      try {
        const client = await Client.connect("EBayego/PCHelper", {hf_token: "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"});
        const result = await client.predict("/chat", {
          message: input,
        });
        const botMessage = { sender: 'bot', text: result.data };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message to Gradio Space:', error);
      }
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleChatbot} className="chatbot-toggle-button">
        {isOpen ? 'Close' : 'Chat'}
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => (e.key === 'Enter' ? handleMessageSend() : null)}
              placeholder="Escribe un mensaje..."
            />
            <button onClick={handleMessageSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;