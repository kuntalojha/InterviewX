import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../models/User.model.js';

describe('User Model', () => {
  let mongoServer;

  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear all test data before each test
    await User.deleteMany({});
  });

  afterEach(async () => {
    // Clean up after each test
    await User.deleteMany({});
  });

  describe('Schema validation', () => {
    it('should create a valid user with all required fields', async () => {
      const validUser = {
        name: 'John Doe',
        email: 'john@example.com',
        clerkId: 'clerk_123456',
        profileImage: 'https://example.com/image.jpg',
      };

      const user = await User.create(validUser);

      expect(user._id).toBeDefined();
      expect(user.name).toBe(validUser.name);
      expect(user.email).toBe(validUser.email);
      expect(user.clerkId).toBe(validUser.clerkId);
      expect(user.profileImage).toBe(validUser.profileImage);
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should create a user with default profileImage', async () => {
      const userWithoutImage = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        clerkId: 'clerk_789012',
      };

      const user = await User.create(userWithoutImage);

      expect(user.profileImage).toBe('');
    });

    it('should fail when name is missing', async () => {
      const userWithoutName = {
        email: 'test@example.com',
        clerkId: 'clerk_test',
      };

      await expect(User.create(userWithoutName)).rejects.toThrow();
    });

    it('should fail when email is missing', async () => {
      const userWithoutEmail = {
        name: 'Test User',
        clerkId: 'clerk_test',
      };

      await expect(User.create(userWithoutEmail)).rejects.toThrow();
    });

    it('should fail when clerkId is missing', async () => {
      const userWithoutClerkId = {
        name: 'Test User',
        email: 'test@example.com',
      };

      await expect(User.create(userWithoutClerkId)).rejects.toThrow();
    });
  });

  describe('Unique constraints', () => {
    it('should not allow duplicate emails', async () => {
      const user1 = {
        name: 'User One',
        email: 'duplicate@example.com',
        clerkId: 'clerk_001',
      };

      const user2 = {
        name: 'User Two',
        email: 'duplicate@example.com',
        clerkId: 'clerk_002',
      };

      await User.create(user1);
      await expect(User.create(user2)).rejects.toThrow();
    });

    it('should not allow duplicate clerkIds', async () => {
      const user1 = {
        name: 'User One',
        email: 'user1@example.com',
        clerkId: 'clerk_duplicate',
      };

      const user2 = {
        name: 'User Two',
        email: 'user2@example.com',
        clerkId: 'clerk_duplicate',
      };

      await User.create(user1);
      await expect(User.create(user2)).rejects.toThrow();
    });

    it('should allow same name for different users', async () => {
      const user1 = {
        name: 'John Doe',
        email: 'john1@example.com',
        clerkId: 'clerk_john1',
      };

      const user2 = {
        name: 'John Doe',
        email: 'john2@example.com',
        clerkId: 'clerk_john2',
      };

      const createdUser1 = await User.create(user1);
      const createdUser2 = await User.create(user2);

      expect(createdUser1.name).toBe(createdUser2.name);
      expect(createdUser1.email).not.toBe(createdUser2.email);
    });
  });

  describe('Timestamps', () => {
    it('should automatically add createdAt timestamp', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should automatically add updatedAt timestamp', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      expect(user.updatedAt).toBeInstanceOf(Date);
      expect(user.updatedAt.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should update updatedAt when user is modified', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      const originalUpdatedAt = user.updatedAt;

      // Wait a bit to ensure timestamp difference
      await new Promise((resolve) => setTimeout(resolve, 10));

      user.name = 'Updated Name';
      await user.save();

      expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
    });

    it('should not change createdAt when user is updated', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      const originalCreatedAt = user.createdAt;

      user.name = 'Updated Name';
      await user.save();

      expect(user.createdAt.getTime()).toBe(originalCreatedAt.getTime());
    });
  });

  describe('Field types and validations', () => {
    it('should store name as string', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      expect(typeof user.name).toBe('string');
    });

    it('should store email as string', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      expect(typeof user.email).toBe('string');
    });

    it('should store clerkId as string', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
      });

      expect(typeof user.clerkId).toBe('string');
    });

    it('should store profileImage as string', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
        profileImage: 'https://example.com/image.jpg',
      });

      expect(typeof user.profileImage).toBe('string');
    });

    it('should handle special characters in name', async () => {
      const user = await User.create({
        name: "O'Brien-Smith Jr.",
        email: 'special@example.com',
        clerkId: 'clerk_special',
      });

      expect(user.name).toBe("O'Brien-Smith Jr.");
    });

    it('should handle international characters in name', async () => {
      const user = await User.create({
        name: 'José García',
        email: 'jose@example.com',
        clerkId: 'clerk_jose',
      });

      expect(user.name).toBe('José García');
    });

    it('should handle plus sign in email', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test+tag@example.com',
        clerkId: 'clerk_test',
      });

      expect(user.email).toBe('test+tag@example.com');
    });

    it('should handle long URLs in profileImage', async () => {
      const longUrl = 'https://example.com/very/long/path/to/image.jpg?query=param&another=value';
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
        profileImage: longUrl,
      });

      expect(user.profileImage).toBe(longUrl);
    });
  });

  describe('CRUD operations', () => {
    it('should find user by email', async () => {
      await User.create({
        name: 'Find Me',
        email: 'findme@example.com',
        clerkId: 'clerk_findme',
      });

      const user = await User.findOne({ email: 'findme@example.com' });

      expect(user).not.toBeNull();
      expect(user.name).toBe('Find Me');
    });

    it('should find user by clerkId', async () => {
      await User.create({
        name: 'Find Me',
        email: 'findme@example.com',
        clerkId: 'clerk_findme',
      });

      const user = await User.findOne({ clerkId: 'clerk_findme' });

      expect(user).not.toBeNull();
      expect(user.email).toBe('findme@example.com');
    });

    it('should update user fields', async () => {
      const user = await User.create({
        name: 'Original Name',
        email: 'original@example.com',
        clerkId: 'clerk_update',
      });

      user.name = 'Updated Name';
      user.profileImage = 'https://example.com/new-image.jpg';
      await user.save();

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.name).toBe('Updated Name');
      expect(updatedUser.profileImage).toBe('https://example.com/new-image.jpg');
    });

    it('should delete user by clerkId', async () => {
      await User.create({
        name: 'Delete Me',
        email: 'deleteme@example.com',
        clerkId: 'clerk_deleteme',
      });

      await User.deleteOne({ clerkId: 'clerk_deleteme' });

      const user = await User.findOne({ clerkId: 'clerk_deleteme' });
      expect(user).toBeNull();
    });

    it('should count users', async () => {
      await User.create({
        name: 'User 1',
        email: 'user1@example.com',
        clerkId: 'clerk_1',
      });

      await User.create({
        name: 'User 2',
        email: 'user2@example.com',
        clerkId: 'clerk_2',
      });

      const count = await User.countDocuments();
      expect(count).toBe(2);
    });

    it('should find multiple users', async () => {
      await User.create({
        name: 'User 1',
        email: 'user1@example.com',
        clerkId: 'clerk_1',
      });

      await User.create({
        name: 'User 2',
        email: 'user2@example.com',
        clerkId: 'clerk_2',
      });

      const users = await User.find();
      expect(users).toHaveLength(2);
    });
  });

  describe('Edge cases', () => {
    it('should handle very long names', async () => {
      const longName = 'A'.repeat(200);
      const user = await User.create({
        name: longName,
        email: 'long@example.com',
        clerkId: 'clerk_long',
      });

      expect(user.name).toBe(longName);
      expect(user.name.length).toBe(200);
    });

    it('should handle empty string for profileImage', async () => {
      const user = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        clerkId: 'clerk_test',
        profileImage: '',
      });

      expect(user.profileImage).toBe('');
    });

    it('should handle names with only spaces', async () => {
      const user = await User.create({
        name: '   ',
        email: 'spaces@example.com',
        clerkId: 'clerk_spaces',
      });

      expect(user.name).toBe('   ');
    });

    it('should trim spaces from fields if needed', async () => {
      // Note: Mongoose does not trim by default unless specified in schema
      const user = await User.create({
        name: '  Trimmed Name  ',
        email: '  trimmed@example.com  ',
        clerkId: '  clerk_trimmed  ',
      });

      // These should preserve spaces as schema doesn't have trim: true
      expect(user.name).toBe('  Trimmed Name  ');
      expect(user.email).toBe('  trimmed@example.com  ');
      expect(user.clerkId).toBe('  clerk_trimmed  ');
    });
  });

  describe('Model methods', () => {
    it('should convert to JSON', async () => {
      const user = await User.create({
        name: 'JSON User',
        email: 'json@example.com',
        clerkId: 'clerk_json',
      });

      const json = user.toJSON();

      expect(json).toHaveProperty('name');
      expect(json).toHaveProperty('email');
      expect(json).toHaveProperty('clerkId');
      expect(json).toHaveProperty('_id');
      expect(json).toHaveProperty('createdAt');
      expect(json).toHaveProperty('updatedAt');
    });

    it('should convert to object', async () => {
      const user = await User.create({
        name: 'Object User',
        email: 'object@example.com',
        clerkId: 'clerk_object',
      });

      const obj = user.toObject();

      expect(obj).toHaveProperty('name');
      expect(obj).toHaveProperty('email');
      expect(obj).toHaveProperty('clerkId');
      expect(obj).toHaveProperty('_id');
    });
  });
});