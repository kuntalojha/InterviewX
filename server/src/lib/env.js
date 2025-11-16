import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({quiet: true});

export const ENV = {
  PORT: process.env.PORT || 4000,
  DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/interviewx',
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};