
import React, { useState, useEffect, useRef, useCallback } from 'react';

function ChatArea({ sidebarExpanded, selectedChatId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatCreated = useRef(false);

  const createNewChat = useCallback(async () => {
    if (chatCreated.current) return;

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/chatui/chats/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: 'New Chat' })
      });

      if (!response.ok) throw new Error('Failed to create chat');

      const data = await response.json();
      setChatId(data.chat.id);
      chatCreated.current = true;
    } catch (error) {
      console.error('Error creating new chat:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
    if (!chatCreated.current) {
      createNewChat();
    }
  }, [createNewChat]);

  useEffect(() => {
    if (selectedChatId) {
      setChatId(selectedChatId);
      fetchMessages(selectedChatId);
    }
  }, [selectedChatId]);

  const fetchMessages = async (chatId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8000/chatui/chats/${chatId}/messages/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch messages');

      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() && chatId) {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:8000/chatui/chats/${chatId}/messages/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            content: inputMessage,
            role: 'user'
          })
        });

        if (!response.ok) throw new Error('Failed to send message');

        const data = await response.json();
        setMessages(prevMessages => [...prevMessages, data.user_message, data.ai_message]);
        setInputMessage('');

        // Update chat title if it's the first message
        if (messages.length === 0) {
          updateChatTitle(inputMessage.substring(0, 50));
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateChatTitle = async (newTitle) => {
    try {
      const response = await fetch(`http://localhost:8000/api/chats/${chatId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title: newTitle })
      });

      if (!response.ok) throw new Error('Failed to update chat title');
    } catch (error) {
      console.error('Error updating chat title:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 flex flex-col bg-white shadow-md transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-0'}`}>
      {/* User Info Section */}
      <div className="p-4 border-b bg-gray-100 flex items-center justify-end">
        <div className="flex mr-4 flex-col items-end text-sm text-gray-600">
          <div className="font-semibold">{user?.username}</div>
          <div>{user?.email}</div>
        </div>
        <img
          src={user?.profilePicture || '/default-profile.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full ml-4"
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-2 mx-auto w-full max-w-4xl">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg transition-opacity duration-200 ${
              message.role === 'user' ? 'bg-gray-200 ml-auto text-right' : 'bg-gray-100'
            }`}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t mx-auto mb-4 w-full max-w-4xl">
        <div className="flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-4 rounded-l-lg focus:outline-none bg-gray-100 shadow-inner"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="bg-gray-800 text-white px-4 py-2 rounded-r-full hover:bg-gray-700 transition-colors duration-200 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;




