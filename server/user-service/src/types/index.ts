export enum UserRole {
    ADMIN = 'admin',
    ATTENDANT = 'attendant',
    DRIVER = 'driver'
  }
  
  export interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: UserRole;
  }
  
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
  }