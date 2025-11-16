import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('STREAM_API_KEY or STREAM_API_SECRET is missing.');
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    log('Stream user upserted successfully', userData);
  } catch (error) {
    console.error('Error upserting Stream user:', error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await streamClient.upsertUser(userId);
    console.log('Stream user deleted successfully', userId);
  } catch (error) {
    console.error('Error deleting Stream user:', error);
  }
};

// todo: add another method to generate Token
