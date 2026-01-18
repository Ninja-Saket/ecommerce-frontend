import axios from 'axios';

/**
 * Send a message to the AI Shopping Assistant
 */
export const sendChatMessage = async (query, conversationHistory = []) => {
  const result = await axios.post(
    `${import.meta.env.VITE_APP_API}/product/chat-assistant`,
    { query, conversationHistory }
  );
  return result;
};
