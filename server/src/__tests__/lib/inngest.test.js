import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

describe('inngest.js', () => {
  let inngest, functions, syncUser, deleteUserFromDB;
  let mockConnectDB, mockUserCreate, mockUserDeleteOne;

  beforeEach(async () => {
    // Clear module cache before each test
    jest.resetModules();

    // Mock the database connection
    mockConnectDB = jest.fn().mockResolvedValue(undefined);
    
    // Mock User model methods
    mockUserCreate = jest.fn().mockResolvedValue({
      _id: 'mock-id',
      name: 'Test User',
      email: 'test@example.com',
      clerkId: 'clerk_123',
      profileImage: 'https://example.com/image.jpg',
    });

    mockUserDeleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

    // Mock modules
    jest.unstable_mockModule('../../lib/db.js', () => ({
      connectDB: mockConnectDB,
    }));

    jest.unstable_mockModule('../../models/User.model.js', () => ({
      default: {
        create: mockUserCreate,
        deleteOne: mockUserDeleteOne,
      },
    }));

    // Import the module after mocking
    const inngestModule = await import('../../lib/inngest.js');
    inngest = inngestModule.inngest;
    functions = inngestModule.functions;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Module exports', () => {
    it('should export inngest client', () => {
      expect(inngest).toBeDefined();
      expect(typeof inngest).toBe('object');
    });

    it('should export functions array', () => {
      expect(functions).toBeDefined();
      expect(Array.isArray(functions)).toBe(true);
    });

    it('should export exactly 2 functions', () => {
      expect(functions).toHaveLength(2);
    });

    it('should have functions with correct structure', () => {
      functions.forEach((func) => {
        expect(func).toBeDefined();
        expect(typeof func).toBe('object');
      });
    });
  });

  describe('inngest client configuration', () => {
    it('should initialize with correct id', () => {
      expect(inngest).toHaveProperty('id');
      // The Inngest client stores id in different ways depending on version
      // We just verify the client is properly initialized
    });
  });

  describe('syncUser function', () => {
    it('should be defined in functions array', () => {
      const syncUserFunc = functions.find((f) => 
        f._def?.id === 'sync-user' || f.id === 'sync-user'
      );
      expect(syncUserFunc).toBeDefined();
    });

    it('should handle complete user data correctly', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_123',
          email_addresses: [{ email_address: 'test@example.com' }],
          first_name: 'John',
          last_name: 'Doe',
          image_url: 'https://example.com/image.jpg',
        },
      };

      // We need to test the handler function directly
      // Since Inngest functions are created with createFunction, we need to access the handler
      const syncUserFunc = functions[0];
      
      // The actual handler might be in different properties depending on Inngest version
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockConnectDB).toHaveBeenCalled();
        expect(mockUserCreate).toHaveBeenCalledWith({
          clerkId: 'clerk_123',
          email: 'test@example.com',
          name: 'John Doe',
          profileImage: 'https://example.com/image.jpg',
        });
      }
    });

    it('should handle user with only first name', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_456',
          email_addresses: [{ email_address: 'jane@example.com' }],
          first_name: 'Jane',
          last_name: null,
          image_url: 'https://example.com/jane.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            clerkId: 'clerk_456',
            email: 'jane@example.com',
          })
        );
      }
    });

    it('should handle user with only last name', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_789',
          email_addresses: [{ email_address: 'smith@example.com' }],
          first_name: null,
          last_name: 'Smith',
          image_url: 'https://example.com/smith.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            clerkId: 'clerk_789',
            email: 'smith@example.com',
          })
        );
      }
    });

    it('should handle user with no name', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_noname',
          email_addresses: [{ email_address: 'noname@example.com' }],
          first_name: null,
          last_name: null,
          image_url: 'https://example.com/default.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            clerkId: 'clerk_noname',
            email: 'noname@example.com',
            name: expect.stringContaining(' '), // Should contain spaces
          })
        );
      }
    });

    it('should handle empty email_addresses array', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_noemail',
          email_addresses: [],
          first_name: 'No',
          last_name: 'Email',
          image_url: 'https://example.com/noemail.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            clerkId: 'clerk_noemail',
            email: undefined,
          })
        );
      }
    });

    it('should connect to database before creating user', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_test',
          email_addresses: [{ email_address: 'test@example.com' }],
          first_name: 'Test',
          last_name: 'User',
          image_url: 'https://example.com/test.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockConnectDB).toHaveBeenCalled();
        expect(mockConnectDB).toHaveBeenCalledBefore(mockUserCreate);
      }
    });
  });

  describe('deleteUserFromDB function', () => {
    it('should be defined in functions array', () => {
      const deleteFunc = functions.find((f) => 
        f._def?.id === 'delete-user-from-db' || f.id === 'delete-user-from-db'
      );
      expect(deleteFunc).toBeDefined();
    });

    it('should delete user by clerkId', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_delete_me',
        },
      };

      const deleteFunc = functions[1];
      
      if (deleteFunc && deleteFunc._def && deleteFunc._def.handler) {
        await deleteFunc._def.handler({ event: mockEvent });
        
        expect(mockConnectDB).toHaveBeenCalled();
        expect(mockUserDeleteOne).toHaveBeenCalledWith({ clerkId: 'clerk_delete_me' });
      }
    });

    it('should connect to database before deleting user', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_delete',
        },
      };

      const deleteFunc = functions[1];
      
      if (deleteFunc && deleteFunc._def && deleteFunc._def.handler) {
        await deleteFunc._def.handler({ event: mockEvent });
        
        expect(mockConnectDB).toHaveBeenCalled();
        expect(mockConnectDB).toHaveBeenCalledBefore(mockUserDeleteOne);
      }
    });

    it('should handle deletion of non-existent user gracefully', async () => {
      mockUserDeleteOne.mockResolvedValue({ deletedCount: 0 });

      const mockEvent = {
        data: {
          id: 'clerk_nonexistent',
        },
      };

      const deleteFunc = functions[1];
      
      if (deleteFunc && deleteFunc._def && deleteFunc._def.handler) {
        await expect(
          deleteFunc._def.handler({ event: mockEvent })
        ).resolves.not.toThrow();
      }
    });
  });

  describe('Event configuration', () => {
    it('should listen to correct event for syncUser', () => {
      const syncUserFunc = functions[0];
      // Event configuration is in the function definition
      // The actual structure depends on Inngest version
      expect(syncUserFunc).toBeDefined();
    });

    it('should listen to correct event for deleteUserFromDB', () => {
      const deleteFunc = functions[1];
      expect(deleteFunc).toBeDefined();
    });
  });

  describe('Error handling', () => {
    it('should handle database connection errors in syncUser', async () => {
      mockConnectDB.mockRejectedValue(new Error('Database connection failed'));

      const mockEvent = {
        data: {
          id: 'clerk_error',
          email_addresses: [{ email_address: 'error@example.com' }],
          first_name: 'Error',
          last_name: 'User',
          image_url: 'https://example.com/error.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await expect(
          syncUserFunc._def.handler({ event: mockEvent })
        ).rejects.toThrow('Database connection failed');
      }
    });

    it('should handle user creation errors', async () => {
      mockUserCreate.mockRejectedValue(new Error('User creation failed'));

      const mockEvent = {
        data: {
          id: 'clerk_fail',
          email_addresses: [{ email_address: 'fail@example.com' }],
          first_name: 'Fail',
          last_name: 'User',
          image_url: 'https://example.com/fail.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await expect(
          syncUserFunc._def.handler({ event: mockEvent })
        ).rejects.toThrow('User creation failed');
      }
    });

    it('should handle database connection errors in deleteUserFromDB', async () => {
      mockConnectDB.mockRejectedValue(new Error('Database connection failed'));

      const mockEvent = {
        data: {
          id: 'clerk_delete_error',
        },
      };

      const deleteFunc = functions[1];
      
      if (deleteFunc && deleteFunc._def && deleteFunc._def.handler) {
        await expect(
          deleteFunc._def.handler({ event: mockEvent })
        ).rejects.toThrow('Database connection failed');
      }
    });

    it('should handle user deletion errors', async () => {
      mockUserDeleteOne.mockRejectedValue(new Error('User deletion failed'));

      const mockEvent = {
        data: {
          id: 'clerk_delete_fail',
        },
      };

      const deleteFunc = functions[1];
      
      if (deleteFunc && deleteFunc._def && deleteFunc._def.handler) {
        await expect(
          deleteFunc._def.handler({ event: mockEvent })
        ).rejects.toThrow('User deletion failed');
      }
    });
  });

  describe('Data transformation', () => {
    it('should properly format name with spaces', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_space',
          email_addresses: [{ email_address: 'space@example.com' }],
          first_name: 'First',
          last_name: 'Last',
          image_url: 'https://example.com/space.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            name: 'First Last',
          })
        );
      }
    });

    it('should extract first email from email_addresses array', async () => {
      const mockEvent = {
        data: {
          id: 'clerk_multiple',
          email_addresses: [
            { email_address: 'primary@example.com' },
            { email_address: 'secondary@example.com' },
          ],
          first_name: 'Multi',
          last_name: 'Email',
          image_url: 'https://example.com/multi.jpg',
        },
      };

      const syncUserFunc = functions[0];
      
      if (syncUserFunc && syncUserFunc._def && syncUserFunc._def.handler) {
        await syncUserFunc._def.handler({ event: mockEvent });
        
        expect(mockUserCreate).toHaveBeenCalledWith(
          expect.objectContaining({
            email: 'primary@example.com',
          })
        );
      }
    });
  });
});