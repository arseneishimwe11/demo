import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized - Invalid token" });
    return;
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - User not authenticated" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: "Forbidden - Insufficient permissions" });
      return;
    }

    next();
  };
};
