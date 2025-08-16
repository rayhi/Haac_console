import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../types/index.js';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    first_name: user.first_name,
    last_name: user.last_name
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

export const verifyToken = (token: string): User | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as User;
  } catch (error) {
    return null;
  }
};

export const generatePolicyNumber = (): string => {
  const prefix = 'POL';
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp.slice(-8)}-${random}`;
};

export const generateClaimNumber = (): string => {
  const prefix = 'CLM';
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp.slice(-8)}-${random}`;
};