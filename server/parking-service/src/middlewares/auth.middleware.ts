import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    
    const decoded = jwt.verify(token, secret) as {
      userId: number;
      email: string;
      role: string;
    };
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized - User not authenticated' });
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
      return;
    }
    
    next();
  };
};