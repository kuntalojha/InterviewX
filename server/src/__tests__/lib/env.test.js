import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('env.js', () => {
  let originalEnv;

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
    // Clear module cache to get fresh imports
    jest.resetModules();
  });

  describe('ENV object structure', () => {
    it('should export an ENV object with all required properties', async () => {
      const { ENV } = await import('../../lib/env.js');
      
      expect(ENV).toBeDefined();
      expect(ENV).toHaveProperty('PORT');
      expect(ENV).toHaveProperty('DB_URL');
      expect(ENV).toHaveProperty('NODE_ENV');
      expect(ENV).toHaveProperty('CLIENT_URL');
      expect(ENV).toHaveProperty('INNGEST_EVENT_KEY');
      expect(ENV).toHaveProperty('INNGEST_SIGNING_KEY');
      expect(ENV).toHaveProperty('STREAM_API_KEY');
      expect(ENV).toHaveProperty('STREAM_API_SECRET');
    });

    it('should have correct property types', async () => {
      const { ENV } = await import('../../lib/env.js');
      
      expect(typeof ENV.PORT === 'string' || typeof ENV.PORT === 'number').toBe(true);
      expect(typeof ENV.DB_URL).toBe('string');
      expect(typeof ENV.NODE_ENV).toBe('string');
      expect(typeof ENV.CLIENT_URL).toBe('string');
    });
  });

  describe('Default values', () => {
    it('should use default PORT when not set in environment', async () => {
      delete process.env.PORT;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.PORT).toBe(4000);
    });

    it('should use default DB_URL when not set in environment', async () => {
      delete process.env.DB_URL;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.DB_URL).toBe('mongodb://127.0.0.1:27017/interviewx');
    });

    it('should use default NODE_ENV when not set in environment', async () => {
      delete process.env.NODE_ENV;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.NODE_ENV).toBe('development');
    });

    it('should use default CLIENT_URL when not set in environment', async () => {
      delete process.env.CLIENT_URL;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.CLIENT_URL).toBe('http://localhost:5173');
    });
  });

  describe('Environment variable override', () => {
    it('should use environment PORT when set', async () => {
      process.env.PORT = '8080';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.PORT).toBe('8080');
    });

    it('should use environment DB_URL when set', async () => {
      process.env.DB_URL = 'mongodb://custom:27017/mydb';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.DB_URL).toBe('mongodb://custom:27017/mydb');
    });

    it('should use environment NODE_ENV when set', async () => {
      process.env.NODE_ENV = 'production';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.NODE_ENV).toBe('production');
    });

    it('should use environment CLIENT_URL when set', async () => {
      process.env.CLIENT_URL = 'https://example.com';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.CLIENT_URL).toBe('https://example.com');
    });
  });

  describe('Optional environment variables', () => {
    it('should handle undefined INNGEST_EVENT_KEY', async () => {
      delete process.env.INNGEST_EVENT_KEY;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.INNGEST_EVENT_KEY).toBeUndefined();
    });

    it('should handle undefined INNGEST_SIGNING_KEY', async () => {
      delete process.env.INNGEST_SIGNING_KEY;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.INNGEST_SIGNING_KEY).toBeUndefined();
    });

    it('should handle undefined STREAM_API_KEY', async () => {
      delete process.env.STREAM_API_KEY;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.STREAM_API_KEY).toBeUndefined();
    });

    it('should handle undefined STREAM_API_SECRET', async () => {
      delete process.env.STREAM_API_SECRET;
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.STREAM_API_SECRET).toBeUndefined();
    });

    it('should use INNGEST_EVENT_KEY when set', async () => {
      process.env.INNGEST_EVENT_KEY = 'test-event-key';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.INNGEST_EVENT_KEY).toBe('test-event-key');
    });

    it('should use INNGEST_SIGNING_KEY when set', async () => {
      process.env.INNGEST_SIGNING_KEY = 'test-signing-key';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.INNGEST_SIGNING_KEY).toBe('test-signing-key');
    });

    it('should use STREAM_API_KEY when set', async () => {
      process.env.STREAM_API_KEY = 'test-stream-key';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.STREAM_API_KEY).toBe('test-stream-key');
    });

    it('should use STREAM_API_SECRET when set', async () => {
      process.env.STREAM_API_SECRET = 'test-stream-secret';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.STREAM_API_SECRET).toBe('test-stream-secret');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string environment variables', async () => {
      process.env.PORT = '';
      process.env.CLIENT_URL = '';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      // Empty strings are falsy, so defaults should be used
      expect(ENV.PORT).toBe(4000);
      expect(ENV.CLIENT_URL).toBe('http://localhost:5173');
    });

    it('should handle whitespace in environment variables', async () => {
      process.env.CLIENT_URL = '  http://localhost:3000  ';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.CLIENT_URL).toBe('  http://localhost:3000  ');
    });

    it('should handle numeric PORT as string', async () => {
      process.env.PORT = '3000';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.PORT).toBe('3000');
    });
  });

  describe('Multiple environment configurations', () => {
    it('should work with development configuration', async () => {
      process.env.NODE_ENV = 'development';
      process.env.PORT = '4000';
      process.env.DB_URL = 'mongodb://localhost:27017/interviewx-dev';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.NODE_ENV).toBe('development');
      expect(ENV.PORT).toBe('4000');
      expect(ENV.DB_URL).toBe('mongodb://localhost:27017/interviewx-dev');
    });

    it('should work with production configuration', async () => {
      process.env.NODE_ENV = 'production';
      process.env.PORT = '8080';
      process.env.DB_URL = 'mongodb://prod-server:27017/interviewx';
      process.env.CLIENT_URL = 'https://interviewx.com';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.NODE_ENV).toBe('production');
      expect(ENV.PORT).toBe('8080');
      expect(ENV.DB_URL).toBe('mongodb://prod-server:27017/interviewx');
      expect(ENV.CLIENT_URL).toBe('https://interviewx.com');
    });

    it('should work with test configuration', async () => {
      process.env.NODE_ENV = 'test';
      process.env.PORT = '4001';
      process.env.DB_URL = 'mongodb://localhost:27017/interviewx-test';
      jest.resetModules();
      
      const { ENV } = await import('../../lib/env.js');
      expect(ENV.NODE_ENV).toBe('test');
      expect(ENV.PORT).toBe('4001');
      expect(ENV.DB_URL).toBe('mongodb://localhost:27017/interviewx-test');
    });
  });
});