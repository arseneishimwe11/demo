import jwt from "jsonwebtoken";
import { JwtPayload } from "../types";

export const generateToken = (payload: JwtPayload): string => {
  const secret = process.env.JWT_SECRET || "jwt_secret_key";
  const expiresIn = process.env.JWT_EXPIRATION || "24h";

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || "jwt_secret_key";
  return jwt.verify(token, secret) as JwtPayload;
};
