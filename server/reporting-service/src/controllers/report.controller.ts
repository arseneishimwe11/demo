import { Request, Response } from "express";
import axios from "axios";

// Environment variables for service URLs
const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || "http://localhost:3004";
const PARKING_SERVICE_URL =
  process.env.PARKING_SERVICE_URL || "http://localhost:3002";
const VEHICLE_SERVICE_URL =
  process.env.VEHICLE_SERVICE_URL || "http://localhost:3005";

/**
 * Get usage report - shows parking usage statistics over time
 */
export const getUsageReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "Start date and end date are required",
      });
    }

    // Fetch vehicle entries from vehicle service
    const entriesResponse = await axios.get(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      {
        params: { startDate, endDate },
      }
    );

    // Process the data to generate usage statistics
    const usageData = processUsageData(entriesResponse.data.data);

    res.status(200).json({
      success: true,
      data: {
        timeframe: {
          startDate,
          endDate,
        },
        totalEntries: usageData.totalEntries,
        dailyUsage: usageData.dailyUsage,
        peakHours: usageData.peakHours,
        averageDuration: usageData.averageDuration,
      },
    });
  } catch (error) {
    console.error("Error generating usage report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate usage report",
    });
  }
};

/**
 * Get revenue report - shows revenue statistics over time
 */
export const getRevenueReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "Start date and end date are required",
      });
    }

    // Fetch vehicle exits with payment data
    const revenueResponse = await axios.get(
      `${VEHICLE_SERVICE_URL}/api/vehicles/exits-with-charges`,
      {
        params: { startDate, endDate },
      }
    );

    // Process the data to generate revenue statistics
    const revenueData = processRevenueData(revenueResponse.data.data);

    res.status(200).json({
      success: true,
      data: {
        timeframe: {
          startDate,
          endDate,
        },
        totalRevenue: revenueData.totalRevenue,
        dailyRevenue: revenueData.dailyRevenue,
        revenueByParkingLot: revenueData.revenueByParkingLot,
        revenueByVehicleType: revenueData.revenueByVehicleType,
      },
    });
  } catch (error) {
    console.error("Error generating revenue report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate revenue report",
    });
  }
};

/**
 * Get occupancy report - shows parking lot occupancy statistics
 */
export const getOccupancyReport = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        error: "Date parameter is required",
      });
    }

    // Fetch parking lots data
    const parkingLotsResponse = await axios.get(
      `${PARKING_SERVICE_URL}/api/parking`
    );

    // Fetch current occupancy data
    const occupancyResponse = await axios.get(
      `${PARKING_SERVICE_URL}/api/parking/occupancy`,
      {
        params: { date },
      }
    );

    // Process the data to generate occupancy statistics
    const occupancyData = processOccupancyData(
      parkingLotsResponse.data.data,
      occupancyResponse.data.data
    );

    res.status(200).json({
      success: true,
      data: {
        date,
        overallOccupancy: occupancyData.overallOccupancy,
        occupancyByParkingLot: occupancyData.occupancyByParkingLot,
        peakOccupancyTime: occupancyData.peakOccupancyTime,
        availableSpaces: occupancyData.availableSpaces,
      },
    });
  } catch (error) {
    console.error("Error generating occupancy report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate occupancy report",
    });
  }
};

/**
 * Get vehicle type distribution report
 */
export const getVehicleTypeReport = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "Start date and end date are required",
      });
    }

    // Fetch vehicle entries data
    const vehiclesResponse = await axios.get(
      `${VEHICLE_SERVICE_URL}/api/vehicles/entries`,
      {
        params: { startDate, endDate },
      }
    );

    // Process the data to generate vehicle type distribution
    const vehicleTypeData = processVehicleTypeData(vehiclesResponse.data.data);

    res.status(200).json({
      success: true,
      data: {
        timeframe: {
          startDate,
          endDate,
        },
        totalVehicles: vehicleTypeData.totalVehicles,
        typeDistribution: vehicleTypeData.typeDistribution,
        popularVehicleTypes: vehicleTypeData.popularVehicleTypes,
        trendOverTime: vehicleTypeData.trendOverTime,
      },
    });
  } catch (error) {
    console.error("Error generating vehicle type report:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate vehicle type report",
    });
  }
};

// Helper functions to process data
function processUsageData(entries: any[]) {
  // This would normally process real data, but for demo purposes we'll return mock data
  return {
    totalEntries: entries.length,
    dailyUsage: [
      { date: "2023-05-01", count: 45 },
      { date: "2023-05-02", count: 52 },
      { date: "2023-05-03", count: 38 },
    ],
    peakHours: [
      { hour: "08:00-09:00", count: 15 },
      { hour: "17:00-18:00", count: 18 },
      { hour: "12:00-13:00", count: 12 },
    ],
    averageDuration: "2.5 hours",
  };
}

function processRevenueData(payments: any[]) {
  // This would normally process real data, but for demo purposes we'll return mock data
  return {
    totalRevenue: payments.reduce(
      (sum, payment) => sum + (payment.amount || 0),
      0
    ),
    dailyRevenue: [
      { date: "2023-05-01", amount: 1250 },
      { date: "2023-05-02", amount: 1420 },
      { date: "2023-05-03", amount: 980 },
    ],
    revenueByParkingLot: [
      { parkingLot: "Downtown Garage", amount: 2200 },
      { parkingLot: "Airport Parking", amount: 1450 },
    ],
    revenueByVehicleType: [
      { type: "Car", amount: 2800 },
      { type: "Motorcycle", amount: 350 },
      { type: "Truck", amount: 500 },
    ],
  };
}

function processOccupancyData(parkingLots: any[], occupancyData: any[]) {
  // This would normally process real data, but for demo purposes we'll return mock data
  return {
    overallOccupancy: "68%",
    occupancyByParkingLot: [
      {
        parkingLot: "Downtown Garage",
        occupancy: "75%",
        total: 100,
        occupied: 75,
      },
      {
        parkingLot: "Airport Parking",
        occupancy: "60%",
        total: 200,
        occupied: 120,
      },
    ],
    peakOccupancyTime: "17:30",
    availableSpaces: 105,
  };
}

function processVehicleTypeData(vehicles: any[]) {
  // This would normally process real data, but for demo purposes we'll return mock data
  return {
    totalVehicles: vehicles.length,
    typeDistribution: [
      { type: "Car", count: 320, percentage: "80%" },
      { type: "Motorcycle", count: 40, percentage: "10%" },
      { type: "Truck", count: 40, percentage: "10%" },
    ],
    popularVehicleTypes: [
      { type: "Sedan", count: 180 },
      { type: "SUV", count: 120 },
      { type: "Motorcycle", count: 40 },
    ],
    trendOverTime: [
      { date: "2023-05-01", car: 105, motorcycle: 12, truck: 15 },
      { date: "2023-05-02", car: 115, motorcycle: 14, truck: 12 },
      { date: "2023-05-03", car: 100, motorcycle: 14, truck: 13 },
    ],
  };
}
