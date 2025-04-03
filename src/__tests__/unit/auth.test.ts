import { hashPassword, comparePassword } from '../../utils/auth';

describe('Authentication Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password correctly', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(typeof hashedPassword).toBe('string');
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      const isMatch = await comparePassword(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching passwords', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      const isMatch = await comparePassword('wrongPassword', hashedPassword);
      expect(isMatch).toBe(false);
    });
  });
}); 