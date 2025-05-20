import { PrismaClient, Prisma } from '@prisma/client';
import { ParkingLocation } from '@prisma/client';

import { ParkingLocationInput, ParkingLocationUpdateInput } from '../types';

const prisma = new PrismaClient();

export const createParkingLocation = async (data: ParkingLocationInput): Promise<ParkingLocation> => {
  return prisma.parkingLocation.create({
    data: {
      code: data.code,
      name: data.name,
      totalSpaces: data.totalSpaces,
      availableSpaces: data.totalSpaces, // Initially all spaces are available
      location: data.location,
      feePerHour: data.feePerHour
    }
  });
};

export const getAllParkingLocations = async (
  page: number = 1,
  limit: number = 10
): Promise<{ parkingLocations: ParkingLocation[]; total: number }> => {
  const skip = (page - 1) * limit;
  
  const [parkingLocations, total] = await Promise.all([
    prisma.parkingLocation.findMany({
      skip,
      take: limit,
      orderBy: { name: 'asc' }
    }),
    prisma.parkingLocation.count()
  ]);
  
  return { parkingLocations, total };
};

export const getParkingLocationByCode = async (code: string): Promise<ParkingLocation | null> => {
  return prisma.parkingLocation.findUnique({
    where: { code }
  });
};

export const updateParkingLocation = async (
  code: string,
  data: ParkingLocationUpdateInput
): Promise<ParkingLocation> => {
  return prisma.parkingLocation.update({
    where: { code },
    data
  });
};

export const deleteParkingLocation = async (code: string): Promise<ParkingLocation> => {
  return prisma.parkingLocation.delete({
    where: { code }
  });
};

export const updateAvailableSpaces = async (
  code: string,
  change: number
): Promise<ParkingLocation> => {
  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const parkingLocation = await tx.parkingLocation.findUnique({
      where: { code }
    });
    
    if (!parkingLocation) {
      throw new Error('Parking location not found');
    }
    
    const newAvailableSpaces = parkingLocation.availableSpaces + change;
    
    if (newAvailableSpaces < 0) {
      throw new Error('No available spaces');
    }
    
    if (newAvailableSpaces > parkingLocation.totalSpaces) {
      throw new Error('Available spaces cannot exceed total spaces');
    }
    
    return tx.parkingLocation.update({
      where: { code },
      data: { availableSpaces: newAvailableSpaces }
    });
  });
};