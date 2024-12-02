import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Header from './Header2';

function ChatArea({ sidebarExpanded, selectedChatId }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        setIsLoading(true);
        setError(''); // Clear any previous errors
  
        let chatToLoad;
        
        // If a specific chat is selected via sidebar, use that
        if (selectedChatId) {
          chatToLoad = selectedChatId;
        } else {
          // Otherwise, fetch the user's chats and use the last one (newest)
          const response = await axios.get('http://localhost:8000/api/chats/', {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}` 
            }
          });
  
          if (response.data && response.data.length > 0) {
            chatToLoad = response.data[response.data.length - 1].id;
            console.log('Loading newest chat:', chatToLoad); // Debug log
          } else {
            throw new Error('No chats found');
          }
        }
  
        setChatId(chatToLoad);
        await fetchMessages(chatToLoad);
      } catch (error) {
        console.error('Error initializing chat:', error);
        setError('Failed to load chat. Please try refreshing the page.');
      } finally {
        setIsLoading(false);
      }
    };
  
    initializeChat();
  }, [selectedChatId]);
  
  const fetchMessages = async (id) => {
    if (!id) return;
  
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8000/api/chats/${id}/messages/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  };
  
  const sendMessage = async () => {
    if (inputMessage.trim() && chatId) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `http://localhost:8000/api/chats/${chatId}/messages/`,
          { content: inputMessage, role: 'user' },
          { 
            headers: { 
              'Content-Type': 'application/json', 
              Authorization: `Bearer ${localStorage.getItem('accessToken') || localStorage.getItem('adminAccessToken')}` 
            } 
          }
        );
        setMessages((prevMessages) => [...prevMessages, response.data.user_message, response.data.ai_message]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message');
      } finally {
        setIsLoading(false);
      }
    }
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show loading state
  if (isLoading && !messages.length) {
    return (
      <div className={`flex-1 flex flex-col bg-white shadow-md transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-0'}`}>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500">Fetching Response...</div>
      </div>
      <div className="p-4 border-t mx-auto mb-20 w-full max-w-4xl">
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

  return (
    <div className={`flex-1 flex flex-col bg-white shadow-md transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-0'}`}>
        {/* Add Header Component Here */}
        <Header toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />
      {error && (
        <div className=" mx-auto w-full max-w-5xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-10" role="alert">
          <span className="block sm:inline ">{error}</span>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-2 mx-auto w-full max-w-4xl">
        {messages.length === 0 && !isLoading ? (
          <div className="text-center bg-gray-100 border border-gray-100 text-black px-4 py-3 rounded relative" >
          <span className="block sm:inline ">Start a new Conversation</span>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg transition-opacity duration-200 ${
                message.role === 'user' ? 'bg-gray-200 ml-auto text-right' : 'bg-gray-100'
              }`}
            >
              {message.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t mx-auto mb-5 w-full max-w-4xl">
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