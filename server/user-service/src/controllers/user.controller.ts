import { Request, Response } from 'express';
import { createUser, loginUser, getAllUsers, getUserById } from '../services/user.service';
import { UserInput, LoginInput } from '../types';
import { AuthRequest } from '../middlewares/auth.middleware';
import { verifyToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const userData: UserInput = req.body;
    
    // Check if trying to create an admin
    if (userData.role === 'admin') {
      // Get the authorization header
      const authHeader = req.headers.authorization;
      
      // If no auth header or not an admin, prevent admin creation
      if (!authHeader) {
        return res.status(403).json({ error: 'Only existing admins can create new admin accounts' });
      }
      
      // Verify the token and check if the user is an admin
      try {
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);
        
        if (decoded.role !== 'admin') {
          return res.status(403).json({ error: 'Only existing admins can create new admin accounts' });
        }
      } catch (error) {
        return res.status(403).json({ error: 'Invalid token or insufficient permissions' });
      }
    }
    
    const user = await createUser(userData);
    
    res.status(201).json({
      success: true,
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if ((error as any).code === 'P2002' && (error as any).meta?.target?.includes('email')) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginData: LoginInput = req.body;
    
    const result = await loginUser(loginData);
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Login error:', error);
    
    if ((error as Error).message === 'Invalid email or password') {
      return res.status(401).json({ error: (error as Error).message });
    }
    
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    
    const user = await getUserById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    const user = await getUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Failed to retrieve current user' });
  }
};