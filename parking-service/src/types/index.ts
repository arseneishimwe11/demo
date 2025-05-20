export interface ParkingLocationInput {
    code: string;
    name: string;
    totalSpaces: number;
    location: string;
    feePerHour: number;
  }
  
  export interface ParkingLocationUpdateInput {
    name?: string;
    totalSpaces?: number;
    availableSpaces?: number;
    location?: string;
    feePerHour?: number;
  }
  
  export enum UserRole {
    ADMIN = 'admin',
    ATTENDANT = 'attendant',
    DRIVER = 'driver'
  }