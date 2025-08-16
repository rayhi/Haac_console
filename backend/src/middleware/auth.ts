import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/index.js';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Access token required' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
    if (err) {
      res.status(403).json({ success: false, message: 'Invalid or expired token' });
      return;
    }

    req.user = decoded as User;
    next();
  });
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions to access this resource' 
      });
      return;
    }

    next();
  };
};

export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
      if (!err) {
        req.user = decoded as User;
      }
    });
  }

  next();
};