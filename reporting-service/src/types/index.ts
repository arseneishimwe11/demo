// Report types
export interface UsageReport {
    totalEntries: number;
    averageDuration: number;
    peakHours: { hour: number; count: number }[];
    dailyUsage: { date: string; count: number }[];
  }
  
  export interface RevenueReport {
    totalRevenue: number;
    dailyRevenue: { date: string; amount: number }[];
    revenueByVehicleType: { vehicleType: string; amount: number }[];
  }
  
  export interface OccupancyReport {
    currentOccupancy: number;
    totalCapacity: number;
    occupancyRate: number;
    occupancyByHour: { hour: number; rate: number }[];
  }
  
  export interface VehicleTypeReport {
    distribution: { vehicleType: string; count: number; percentage: number }[];
    trend: { date: string; vehicleTypes: { [key: string]: number } }[];
  }