import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  const expiresIn = process.env.JWT_EXPIRATION || '24h';
  
  return jwt.sign(payload, secret as jwt.Secret, { expiresIn });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';
  return jwt.verify(token, secret) as JwtPayload;
};