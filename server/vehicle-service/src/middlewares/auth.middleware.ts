import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, UserRole } from '../types';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
    
    const decoded = jwt.verify(token, secret) as JwtPayload;
    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized - User not authenticated' });
    }
    
    if (!roles.includes(req.user.role as UserRole)) {
      return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
    }
    
    next();
  };
};