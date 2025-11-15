import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({quiet: true});

export const ENV = {
  PORT: process.env.PORT || 4000,
  DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/interviewx',
  NODE_ENV: process.env.NODE_ENV || 'development',
}