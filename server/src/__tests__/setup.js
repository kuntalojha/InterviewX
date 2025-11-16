// Global test setup
import { jest } from '@jest/globals';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '4001';
process.env.DB_URL = 'mongodb://localhost:27017/interviewx-test';
process.env.CLIENT_URL = 'http://localhost:3000';

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};