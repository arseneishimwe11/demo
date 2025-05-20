import axios from 'axios';

// Define the base URLs for other services
const VEHICLE_SERVICE_URL = process.env.VEHICLE_SERVICE_URL || 'http://localhost:3004';
const PARKING_SERVICE_URL = process.env.PARKING_SERVICE_URL || 'http://localhost:3003';

// Types for reports
interface UsageReport {
  totalEntries: number;
  averageDuration: number;
  peakHours: { hour: number; count: number }[];
  dailyUsage: { date: string; count: number }[];
}

interface RevenueReport {
  totalRevenue: number;
  dailyRevenue: { date: string; amount: number }[];
  revenueByVehicleType: { vehicleType: string; amount: number }[];
}

interface OccupancyReport {
  currentOccupancy: number;
  totalCapacity: number;
  occupancyRate: number;
  occupancyByHour: { hour: number; rate: number }[];
}

interface VehicleTypeReport {
  distribution: { vehicleType: string; count: number; percentage: number }[];
  trend: { date: string; vehicleTypes: { [key: string]: number } }[];
}

// Generate usage report
export const generateUsageReport = async (
  startDate: string,
  endDate: string,
  parkingLotId?: string
): Promise<UsageReport> => {
  try {
    // Fetch vehicle entries from vehicle service
    const response = await axios.get(`${VEHICLE_SERVICE_URL}/api/vehicles/entries`, {
      params: { startDate, endDate, parkingCode: parkingLotId }
    });
    
    const entries = response.data.data;
    
    // Calculate total entries
    const totalEntries = entries.length;
    
    // Calculate average duration
    let totalDuration = 0;
    entries.forEach((entry: any) => {
      if (entry.exitTime) {
        const duration = new Date(entry.exitTime).getTime() - new Date(entry.entryTime).getTime();
        totalDuration += duration / (1000 * 60 * 60); // Convert to hours
      }
    });
    const averageDuration = totalEntries > 0 ? totalDuration / totalEntries : 0;
    
    // Calculate peak hours
    const hourCounts: { [key: number]: number } = {};
    entries.forEach((entry: any) => {
      const hour = new Date(entry.entryTime).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    const peakHours = Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Calculate daily usage
    const dailyUsage: { [key: string]: number } = {};
    entries.forEach((entry: any) => {
      const date = new Date(entry.entryTime).toISOString().split('T')[0];
      dailyUsage[date] = (dailyUsage[date] || 0) + 1;
    });
    
    const dailyUsageArray = Object.entries(dailyUsage)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      totalEntries,
      averageDuration,
      peakHours,
      dailyUsage: dailyUsageArray
    };
  } catch (error) {
    console.error('Error generating usage report:', error);
    throw new Error('Failed to generate usage report');
  }
};

// Generate revenue report
export const generateRevenueReport = async (
  startDate: string,
  endDate: string,
  parkingLotId?: string
): Promise<RevenueReport> => {
  try {
    // Fetch vehicle entries with billing information
    const response = await axios.get(`${VEHICLE_SERVICE_URL}/api/vehicles/entries`, {
      params: { startDate, endDate, parkingCode: parkingLotId, status: 'EXITED' }
    });
    
    const entries = response.data.data;
    
    // Calculate total revenue
    let totalRevenue = 0;
    entries.forEach((entry: any) => {
      if (entry.billing && entry.billing.amount) {
        totalRevenue += entry.billing.amount;
      }
    });
    
    // Calculate daily revenue
    const dailyRevenue: { [key: string]: number } = {};
    entries.forEach((entry: any) => {
      if (entry.billing && entry.billing.amount) {
        const date = new Date(entry.exitTime).toISOString().split('T')[0];
        dailyRevenue[date] = (dailyRevenue[date] || 0) + entry.billing.amount;
      }
    });
    
    const dailyRevenueArray = Object.entries(dailyRevenue)
      .map(([date, amount]) => ({ date, amount }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate revenue by vehicle type
    const revenueByType: { [key: string]: number } = {};
    entries.forEach((entry: any) => {
      if (entry.billing && entry.billing.amount) {
        const vehicleType = entry.vehicleType || 'Unknown';
        revenueByType[vehicleType] = (revenueByType[vehicleType] || 0) + entry.billing.amount;
      }
    });
    
    const revenueByVehicleType = Object.entries(revenueByType)
      .map(([vehicleType, amount]) => ({ vehicleType, amount }))
      .sort((a, b) => b.amount - a.amount);
    
    return {
      totalRevenue,
      dailyRevenue: dailyRevenueArray,
      revenueByVehicleType
    };
  } catch (error) {
    console.error('Error generating revenue report:', error);
    throw new Error('Failed to generate revenue report');
  }
};

// Generate occupancy report
export const generateOccupancyReport = async (
  date: string,
  parkingLotId?: string
): Promise<OccupancyReport> => {
  try {
    // Fetch parking lot information
    const parkingResponse = await axios.get(`${PARKING_SERVICE_URL}/api/parking/lots${parkingLotId ? `/${parkingLotId}` : ''}`);
    
    // If specific parking lot is requested
    let totalCapacity = 0;
    if (parkingLotId) {
      totalCapacity = parkingResponse.data.capacity || 0;
    } else {
      // Sum capacity of all parking lots
      const parkingLots = parkingResponse.data;
      parkingLots.forEach((lot: any) => {
        totalCapacity += lot.capacity || 0;
      });
    }
    
    // Fetch current occupancy (vehicles that have entered but not exited)
    const vehicleResponse = await axios.get(`${VEHICLE_SERVICE_URL}/api/vehicles/entries`, {
      params: { 
        date,
        parkingCode: parkingLotId,
        status: 'ACTIVE'
      }
    });
    
    const currentOccupancy = vehicleResponse.data.total || 0;
    const occupancyRate = totalCapacity > 0 ? (currentOccupancy / totalCapacity) * 100 : 0;
    
    // Calculate occupancy by hour
    const hourlyData: { [key: number]: { entries: number, exits: number } } = {};
    for (let i = 0; i < 24; i++) {
      hourlyData[i] = { entries: 0, exits: 0 };
    }
    
    // Get all entries and exits for the day
    const allEntriesResponse = await axios.get(`${VEHICLE_SERVICE_URL}/api/vehicles/entries`, {
      params: { date, parkingCode: parkingLotId }
    });
    
    const entries = allEntriesResponse.data.data;
    
    // Count entries and exits by hour
    entries.forEach((entry: any) => {
      const entryHour = new Date(entry.entryTime).getHours();
      hourlyData[entryHour].entries += 1;
      
      if (entry.exitTime) {
        const exitHour = new Date(entry.exitTime).getHours();
        hourlyData[exitHour].exits += 1;
      }
    });
    
    // Calculate occupancy rate by hour
    let runningOccupancy = 0;
    const occupancyByHour = [];
    
    for (let i = 0; i < 24; i++) {
      runningOccupancy += hourlyData[i].entries - hourlyData[i].exits;
      const hourlyRate = totalCapacity > 0 ? (runningOccupancy / totalCapacity) * 100 : 0;
      occupancyByHour.push({ hour: i, rate: hourlyRate });
    }
    
    return {
      currentOccupancy,
      totalCapacity,
      occupancyRate,
      occupancyByHour
    };
  } catch (error) {
    console.error('Error generating occupancy report:', error);
    throw new Error('Failed to generate occupancy report');
  }
};

// Generate vehicle type distribution report
export const generateVehicleTypeReport = async (
  startDate: string,
  endDate: string,
  parkingLotId?: string
): Promise<VehicleTypeReport> => {
  try {
    // Fetch vehicle entries
    const response = await axios.get(`${VEHICLE_SERVICE_URL}/api/vehicles/entries`, {
      params: { startDate, endDate, parkingCode: parkingLotId }
    });
    
    const entries = response.data.data;
    
    // Count vehicles by type
    const vehicleTypes: { [key: string]: number } = {};
    let totalVehicles = 0;
    
    entries.forEach((entry: any) => {
      const vehicleType = entry.vehicleType || 'Unknown';
      vehicleTypes[vehicleType] = (vehicleTypes[vehicleType] || 0) + 1;
      totalVehicles += 1;
    });
    
    // Calculate distribution with percentages
    const distribution = Object.entries(vehicleTypes)
      .map(([vehicleType, count]) => ({
        vehicleType,
        count,
        percentage: totalVehicles > 0 ? (count / totalVehicles) * 100 : 0
      }))
      .sort((a, b) => b.count - a.count);
    
    // Calculate trend over time
    const dailyData: { [key: string]: { [key: string]: number } } = {};
    
    entries.forEach((entry: any) => {
      const date = new Date(entry.entryTime).toISOString().split('T')[0];
      const vehicleType = entry.vehicleType || 'Unknown';
      
      if (!dailyData[date]) {
        dailyData[date] = {};
      }
      
      dailyData[date][vehicleType] = (dailyData[date][vehicleType] || 0) + 1;
    });
    
    const trend = Object.entries(dailyData)
      .map(([date, vehicleTypes]) => ({ date, vehicleTypes }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      distribution,
      trend
    };
  } catch (error) {
    console.error('Error generating vehicle type report:', error);
    throw new Error('Failed to generate vehicle type report');
  }
};