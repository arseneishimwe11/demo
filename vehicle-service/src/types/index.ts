export interface VehicleEntryInput {
    plateNumber: string;
    parkingCode: string;
    userId?: number;
  }
  
  export interface VehicleExitInput {
    id: number;
  }
  
  export interface ParkingLocation {
    code: string;
    name: string;
    totalSpaces: number;
    availableSpaces: number;
    location: string;
    feePerHour: number;
  }
  
  export enum TicketStatus {
    ACTIVE = 'active',
    COMPLETED = 'completed'
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    ATTENDANT = 'attendant',
    DRIVER = 'driver'
  }
  
  export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
  }