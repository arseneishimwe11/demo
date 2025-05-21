import {
  PrismaClient,
  VehicleEntry,
  Ticket,
  TicketStatus,
} from "@prisma/client";
import axios from "axios";
import { VehicleEntryInput, VehicleExitInput, ParkingLocation } from "../types";
import { generateTicketNumber } from "../utils/ticket";
import { calculateParkingFee } from "../utils/fee";

const prisma = new PrismaClient();

// Get parking location details from the Parking Service
const getParkingLocation = async (
  parkingCode: string
): Promise<ParkingLocation> => {
  try {
    const response = await axios.get(
      `${
        process.env.PARKING_SERVICE_URL || "http://localhost:3003"
      }/api/parking/${parkingCode}`
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error("Failed to fetch parking location");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching parking location: ${error.message}`);
    }
    throw new Error("Error fetching parking location: Unknown error");
  }
};
// Update available spaces in the Parking Service
const updateParkingSpaces = async (
  parkingCode: string,
  change: number
): Promise<void> => {
  try {
    await axios.put(
      `${
        process.env.PARKING_SERVICE_URL || "http://localhost:3003"
      }/api/parking/${parkingCode}/spaces`,
      { change },
      {
        headers: {
          Authorization: `Bearer ${process.env.SERVICE_TOKEN}`,
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating parking spaces: ${error.message}`);
    }
    throw new Error("Error updating parking spaces: Unknown error");
  }
};
// Register a vehicle entry
export const registerVehicleEntry = async (
  data: VehicleEntryInput
): Promise<{ entry: VehicleEntry; ticket: Ticket }> => {
  // Get parking location to check if spaces are available
  const parkingLocation = await getParkingLocation(data.parkingCode);

  if (parkingLocation.availableSpaces <= 0) {
    throw new Error("No available parking spaces");
  }

  return prisma.$transaction(async (tx) => {
    // Create the vehicle entry
    const entry = await tx.vehicleEntry.create({
      data: {
        plateNumber: data.plateNumber,
        parkingCode: data.parkingCode,
        userId: data.userId,
      },
    });

    // Generate a ticket
    const ticket = await tx.ticket.create({
      data: {
        entryId: entry.id,
        ticketNumber: generateTicketNumber(),
        status: "active",
      },
    });

    // Update available spaces in the parking location
    await updateParkingSpaces(data.parkingCode, -1);

    return { entry, ticket };
  });
};

// Register a vehicle exit
export const registerVehicleExit = async (
  data: VehicleExitInput
): Promise<VehicleEntry> => {
  // Get the vehicle entry
  const entry = await prisma.vehicleEntry.findUnique({
    where: { id: data.id },
    include: { tickets: true },
  });

  if (!entry) {
    throw new Error("Vehicle entry not found");
  }

  if (entry.exitDatetime) {
    throw new Error("Vehicle has already exited");
  }

  // Get the parking location to calculate fee
  const parkingLocation = await getParkingLocation(entry.parkingCode);

  // Calculate the fee
  const exitTime = new Date();
  const fee = calculateParkingFee(
    entry.entryDatetime,
    exitTime,
    parkingLocation.feePerHour
  );

  return prisma.$transaction(async (tx) => {
    // Update the vehicle entry
    const updatedEntry = await tx.vehicleEntry.update({
      where: { id: data.id },
      data: {
        exitDatetime: exitTime,
        chargedAmount: fee,
      },
    });

    // Update the ticket status
    await tx.ticket.updateMany({
      where: { entryId: data.id },
      data: { status: "completed" },
    });

    // Update available spaces in the parking location
    await updateParkingSpaces(entry.parkingCode, 1);

    return updatedEntry;
  });
};

// Get all vehicle entries with pagination
export const getAllVehicleEntries = async (
  page: number = 1,
  limit: number = 10,
  filters: any = {}
): Promise<{ entries: VehicleEntry[]; total: number }> => {
  const skip = (page - 1) * limit;

  // Build the where clause based on filters
  const where: any = {};

  if (filters.plateNumber) {
    where.plateNumber = { contains: filters.plateNumber };
  }

  if (filters.parkingCode) {
    where.parkingCode = filters.parkingCode;
  }

  if (filters.startDate && filters.endDate) {
    where.entryDatetime = {
      gte: new Date(filters.startDate),
      lte: new Date(filters.endDate),
    };
  }

  if (filters.status === "active") {
    where.exitDatetime = null;
  } else if (filters.status === "completed") {
    where.exitDatetime = { not: null };
  }

  const [entries, total] = await Promise.all([
    prisma.vehicleEntry.findMany({
      where,
      skip,
      take: limit,
      orderBy: { entryDatetime: "desc" },
      include: { tickets: true },
    }),
    prisma.vehicleEntry.count({ where }),
  ]);

  return { entries, total };
};

// Get a vehicle entry by ID
export const getVehicleEntryById = async (
  id: number
): Promise<VehicleEntry | null> => {
  return prisma.vehicleEntry.findUnique({
    where: { id },
    include: { tickets: true },
  });
};

// Generate a bill for a vehicle entry
export const generateBill = async (
  id: number
): Promise<{
  entry: VehicleEntry;
  parkingDuration: number;
  estimatedFee: number;
}> => {
  const entry = await prisma.vehicleEntry.findUnique({
    where: { id },
    include: { tickets: true },
  });

  if (!entry) {
    throw new Error("Vehicle entry not found");
  }

  // Get the parking location
  const parkingLocation = await getParkingLocation(entry.parkingCode);

  // If the vehicle has already exited, return the actual fee
  if (entry.exitDatetime) {
    return {
      entry,
      parkingDuration: Math.ceil(
        (entry.exitDatetime.getTime() - entry.entryDatetime.getTime()) /
          (1000 * 60 * 60)
      ),
      estimatedFee: Number(entry.chargedAmount),
    };
  }

  // Calculate the current duration and estimated fee
  const currentTime = new Date();
  const parkingDuration = Math.ceil(
    (currentTime.getTime() - entry.entryDatetime.getTime()) / (1000 * 60 * 60)
  );
  const estimatedFee = calculateParkingFee(
    entry.entryDatetime,
    currentTime,
    parkingLocation.feePerHour
  );

  return { entry, parkingDuration, estimatedFee };
};
