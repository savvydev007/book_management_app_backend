import request from 'supertest';
import { app } from '../../app';
import { connectDB, closeDB } from '../../config/database';
import { User } from '../../models/User';

describe('Authentication Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  afterAll(async () => {
    await closeDB();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testPassword123',
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', userData.email);
      expect(response.body.user).toHaveProperty('name', userData.name);
    });

    it('should not register a user with existing email', async () => {
      // First create a user
      const userData = {
        email: 'test@example.com',
        password: 'testPassword123',
        name: 'Test User'
      };
      
      await User.create(userData);

      // Then try to register with the same email
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create a test user before login tests
      const userData = {
        email: 'test@example.com',
        password: 'testPassword123',
        name: 'Test User'
      };
      
      await User.create(userData);
    });

    it('should login successfully with correct credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'testPassword123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongPassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 