import { StreamChat } from 'stream-chat';
import { StreamClient } from '@stream-io/node-sdk';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('STREAM_API_KEY or STREAM_API_SECRET is missing.');
}

// This is for video call features.
export const streamClient = new StreamClient(apiKey, apiSecret);
// This is for chat features.
export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

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
    await chatClient.upsertUser(userId);
    console.log('Stream user deleted successfully', userId);
  } catch (error) {
    console.error('Error deleting Stream user:', error);
  }
};
