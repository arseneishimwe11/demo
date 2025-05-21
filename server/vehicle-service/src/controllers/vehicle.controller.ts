import { Request, Response } from "express";
import {
  registerVehicleEntry,
  registerVehicleExit,
  getAllVehicleEntries,
  getVehicleEntryById,
  generateBill,
} from "../services/vehicle.service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { VehicleEntryInput, VehicleExitInput } from "../types";
import { AuthRequest } from "../middlewares/auth.middleware";

// Register a vehicle entry
export const entryVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const entryData: VehicleEntryInput = {
      ...req.body,
      userId: req.user?.userId,
    };

    const result = await registerVehicleEntry(entryData);

    res.status(201).json({
      success: true,
      data: {
        entry: result.entry,
        ticket: result.ticket,
      },
    });
  } catch (error) {
    console.error("Vehicle entry error:", error);

    if (
      error instanceof Error &&
      error.message === "No available parking spaces"
    ) {
      return res.status(400).json({ error: error.message });
    }

    if (
      error instanceof Error &&
      error.message.includes("Error fetching parking location")
    ) {
      return res.status(404).json({ error: "Parking location not found" });
    }

    res.status(500).json({ error: "Failed to register vehicle entry" });
  }
};

// Register a vehicle exit
export const exitVehicle = async (req: Request, res: Response) => {
  try {
    const exitData: VehicleExitInput = req.body;

    const result = await registerVehicleExit(exitData);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Vehicle exit error:", error);

    if (error instanceof Error && error.message === "Vehicle entry not found") {
      return res.status(404).json({ error: error.message });
    }

    if (
      error instanceof Error &&
      error.message === "Vehicle has already exited"
    ) {
      return res.status(400).json({
        error:
          error instanceof Error ? error.message : "Vehicle has already exited",
      });
    }

    res.status(500).json({ error: "Failed to register vehicle exit" });
  }
};

// Get all vehicle entries
export const getAllEntries = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Extract filters from query params
    const filters = {
      plateNumber: req.query.plateNumber as string,
      parkingCode: req.query.parkingCode as string,
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      status: req.query.status as string,
    };

    const { entries, total } = await getAllVehicleEntries(page, limit, filters);

    res.status(200).json({
      success: true,
      data: entries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get entries error:", error);
    res.status(500).json({ error: "Failed to retrieve vehicle entries" });
  }
};

// Get a vehicle entry by ID
export const getEntryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const entry = await getVehicleEntryById(id);

    if (!entry) {
      return res.status(404).json({ error: "Vehicle entry not found" });
    }

    res.status(200).json({
      success: true,
      data: entry,
    });
  } catch (error) {
    console.error("Get entry error:", error);
    res.status(500).json({ error: "Failed to retrieve vehicle entry" });
  }
};

export const deleteVehicleEntry = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid vehicle entry ID" });
    }

    // Use the same prisma import as used elsewhere in the file
    const entry = await prisma.vehicleEntry.findUnique({ where: { id } });
    if (!entry) {
      return res
        .status(404)
        .json({ success: false, message: "Vehicle entry not found" });
    }

    await prisma.vehicleEntry.delete({ where: { id } });

    return res
      .status(200)
      .json({ success: true, message: "Vehicle entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting vehicle entry:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBill = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const bill = await generateBill(id);

    res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    console.error("Generate bill error:", error);

    if (error instanceof Error && error.message === "Vehicle entry not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: "Failed to generate bill" });
  }
};
