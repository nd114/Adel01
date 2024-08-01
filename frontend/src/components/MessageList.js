import React, { useContext } from 'react';
import MessageContext from '../context/MessageContext';

const MessageList = () => {
  const { messages } = useContext(MessageContext);

  return (
    <div className="message-list">
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <p>
              <strong>{message.sender.username}</strong> to{' '}
              <strong>{message.receiver.username}</strong>:
            </p>
            <p>{message.content}</p>
            <p>{new Date(message.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;
