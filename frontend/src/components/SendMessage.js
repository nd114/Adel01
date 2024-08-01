import React, { useState, useContext } from 'react';
import MessageContext from '../context/MessageContext';
import UserContext from '../context/UserContext'; // Assuming there's a UserContext for user info

const SendMessage = ({ receiverId }) => {
  const { sendMessage } = useContext(MessageContext);
  const { user } = useContext(UserContext); // Assuming the current user info is in UserContext
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({ receiver: receiverId, content });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="content"
        value={content}
        onChange={handleChange}
        placeholder="Type your message here..."
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};

export default SendMessage;
