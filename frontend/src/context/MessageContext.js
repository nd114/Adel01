import { createContext, useState, useEffect } from 'react';
import api from '../api';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const res = await api.get('/messages', {
          headers: { 'x-auth-token': token },
        });
        setMessages(res.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const sendMessage = async (messageData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    try {
      const res = await api.post('/messages', messageData, {
        headers: { 'x-auth-token': token },
      });
      setMessages((prevMessages) => [res.data, ...prevMessages]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
