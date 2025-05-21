import axios, { AxiosRequestConfig } from "axios";

// Define the base URLs for other services
const VEHICLE_SERVICE_URL =
  process.env.VEHICLE_SERVICE_URL || "http://localhost:3004";
const PARKING_SERVICE_URL =
  process.env.PARKING_SERVICE_URL || "http://localhost:3003";

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

// Generic API call function with error handling
async function fetchData<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw new Error(`Failed to fetch data from ${url}`);
  }
}

// Helper functions for data processing
function groupByDate<T>(
  items: T[],
  dateField: keyof T
): { [date: string]: T[] } {
  return items.reduce((acc, item) => {
    const date = new Date(item[dateField] as unknown as string)
      .toISOString()
      .split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as { [date: string]: T[] });
}

function groupByHour<T>(
  items: T[],
  timeField: keyof T
): { [hour: number]: T[] } {
  return items.reduce((acc, item) => {
    const hour = new Date(item[timeField] as unknown as string).getHours();
    if (!acc[hour]) {
      acc[hour] = [];
    }
    acc[hour].push(item);
    return acc;
  }, {} as { [hour: number]: T[] });
}

function calculatePercentage(value: number, total: number): number {
  return total > 0 ? (value / total) * 100 : 0;
}

function sortByCount<T>(items: T[], countField: keyof T, limit?: number): T[] {
  const sorted = [...items].sort(
    (a, b) =>
      (b[countField] as unknown as number) -
      (a[countField] as unknown as number)
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

function calculateDuration(entry: any): number {
  if (!entry.exitTime) return 0;
  const entryTime = new Date(entry.entryTime).getTime();
  const exitTime = new Date(entry.exitTime).getTime();
  return (exitTime - entryTime) / (1000 * 60 * 60); // Convert to hours
}

// Generate usage report
export const generateUsageReport = async (
  startDate: string,
  endDate: string,
  parkingLotId?: string
): Promise<UsageReport> => {
  try {
    // Fetch vehicle entries
    const response = await fetchData<{ data: any[] }>(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      { params: { startDate, endDate, parkingCode: parkingLotId } }
    );

    const entries = response.data;
    const totalEntries = entries.length;

    // Calculate average duration
    const durations = entries
      .map(calculateDuration)
      .filter((duration) => duration > 0);
    const averageDuration =
      durations.length > 0
        ? durations.reduce((sum, duration) => sum + duration, 0) /
          durations.length
        : 0;

    // Calculate peak hours
    const entriesByHour = groupByHour(entries, "entryTime");
    const peakHours = Object.entries(entriesByHour)
      .map(([hour, hourEntries]) => ({
        hour: parseInt(hour),
        count: hourEntries.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate daily usage
    const entriesByDate = groupByDate(entries, "entryTime");
    const dailyUsage = Object.entries(entriesByDate)
      .map(([date, dateEntries]) => ({
        date,
        count: dateEntries.length,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalEntries,
      averageDuration,
      peakHours,
      dailyUsage,
    };
  } catch (error) {
    console.error("Error generating usage report:", error);
    throw new Error("Failed to generate usage report");
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
    const response = await fetchData<{ data: any[] }>(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      {
        params: {
          startDate,
          endDate,
          parkingCode: parkingLotId,
          status: "EXITED",
        },
      }
    );

    const entries = response.data;

    // Filter entries with billing information
    const entriesWithBilling = entries.filter(
      (entry) => entry.billing && typeof entry.billing.amount === "number"
    );

    // Calculate total revenue
    const totalRevenue = entriesWithBilling.reduce(
      (sum, entry) => sum + entry.billing.amount,
      0
    );

    // Calculate daily revenue
    const entriesByDate = groupByDate(entriesWithBilling, "exitTime");
    const dailyRevenue = Object.entries(entriesByDate)
      .map(([date, dateEntries]) => ({
        date,
        amount: dateEntries.reduce(
          (sum, entry) => sum + entry.billing.amount,
          0
        ),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Calculate revenue by vehicle type
    const revenueByType: { [key: string]: number } = {};
    entriesWithBilling.forEach((entry) => {
      const vehicleType = entry.vehicleType || "Unknown";
      revenueByType[vehicleType] =
        (revenueByType[vehicleType] || 0) + entry.billing.amount;
    });

    const revenueByVehicleType = Object.entries(revenueByType)
      .map(([vehicleType, amount]) => ({ vehicleType, amount }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalRevenue,
      dailyRevenue,
      revenueByVehicleType,
    };
  } catch (error) {
    console.error("Error generating revenue report:", error);
    throw new Error("Failed to generate revenue report");
  }
};

// Generate occupancy report
export const generateOccupancyReport = async (
  date: string,
  parkingLotId?: string
): Promise<OccupancyReport> => {
  try {
    // Fetch parking lot information
    const parkingResponse = await fetchData<any>(
      `${PARKING_SERVICE_URL}/api/parking/lots${
        parkingLotId ? `/${parkingLotId}` : ""
      }`
    );

    // Calculate total capacity
    let totalCapacity = 0;
    if (parkingLotId) {
      totalCapacity = parkingResponse.capacity || 0;
    } else {
      const parkingLots = Array.isArray(parkingResponse)
        ? parkingResponse
        : [parkingResponse];
      totalCapacity = parkingLots.reduce(
        (sum, lot) => sum + (lot.capacity || 0),
        0
      );
    }

    // Fetch current occupancy
    const vehicleResponse = await fetchData<{ total: number; data: any[] }>(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      { params: { date, parkingCode: parkingLotId, status: "ACTIVE" } }
    );

    const currentOccupancy = vehicleResponse.total || 0;
    const occupancyRate = calculatePercentage(currentOccupancy, totalCapacity);

    // Get all entries and exits for the day
    const allEntriesResponse = await fetchData<{ data: any[] }>(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      { params: { date, parkingCode: parkingLotId } }
    );

    const entries = allEntriesResponse.data;

    // Calculate occupancy by hour
    const occupancyByHour = calculateHourlyOccupancy(entries, totalCapacity);

    return {
      currentOccupancy,
      totalCapacity,
      occupancyRate,
      occupancyByHour,
    };
  } catch (error) {
    console.error("Error generating occupancy report:", error);
    throw new Error("Failed to generate occupancy report");
  }
};

// Helper function to calculate hourly occupancy
function calculateHourlyOccupancy(
  entries: any[],
  totalCapacity: number
): { hour: number; rate: number }[] {
  // Initialize hourly data
  const hourlyData: { [key: number]: { entries: number; exits: number } } = {};
  for (let i = 0; i < 24; i++) {
    hourlyData[i] = { entries: 0, exits: 0 };
  }

  // Count entries and exits by hour
  entries.forEach((entry) => {
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
    const hourlyRate = calculatePercentage(runningOccupancy, totalCapacity);
    occupancyByHour.push({ hour: i, rate: hourlyRate });
  }

  return occupancyByHour;
}

// Generate vehicle type distribution report
export const generateVehicleTypeReport = async (
  startDate: string,
  endDate: string,
  parkingLotId?: string
): Promise<VehicleTypeReport> => {
  try {
    // Fetch vehicle entries
    const response = await fetchData<{ data: any[] }>(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      { params: { startDate, endDate, parkingCode: parkingLotId } }
    );

    const entries = response.data;

    // Count vehicles by type
    const vehicleTypes: { [key: string]: number } = {};
    entries.forEach((entry) => {
      const vehicleType = entry.vehicleType || "Unknown";
      vehicleTypes[vehicleType] = (vehicleTypes[vehicleType] || 0) + 1;
    });

    const totalVehicles = entries.length;

    // Calculate distribution with percentages
    const distribution = Object.entries(vehicleTypes)
      .map(([vehicleType, count]) => ({
        vehicleType,
        count,
        percentage: calculatePercentage(count, totalVehicles),
      }))
      .sort((a, b) => b.count - a.count);

    // Calculate trend over time
    const entriesByDate = groupByDate(entries, "entryTime");

    const trend = Object.entries(entriesByDate)
      .map(([date, dateEntries]) => {
        const vehicleTypes: { [key: string]: number } = {};
        dateEntries.forEach((entry) => {
          const vehicleType = entry.vehicleType || "Unknown";
          vehicleTypes[vehicleType] = (vehicleTypes[vehicleType] || 0) + 1;
        });
        return { date, vehicleTypes };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      distribution,
      trend,
    };
  } catch (error) {
    console.error("Error generating vehicle type report:", error);
    throw new Error("Failed to generate vehicle type report");
  }
};
