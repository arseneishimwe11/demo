import { Request, Response } from 'express';
import { 
  createParkingLocation, 
  getAllParkingLocations, 
  getParkingLocationByCode,
  updateParkingLocation,
  deleteParkingLocation
} from '../services/parking.service';
import { ParkingLocationInput, ParkingLocationUpdateInput } from '../types';
import { AuthRequest } from '../middlewares/auth.middleware';

export const create = async (req: Request, res: Response) => {
  try {
    const parkingData: ParkingLocationInput = req.body;
    
    const parkingLocation = await createParkingLocation(parkingData);
    
    res.status(201).json({
      success: true,
      data: parkingLocation
    });
  } catch (error) {
    console.error('Create parking location error:', error);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Parking code already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create parking location' });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const { parkingLocations, total } = await getAllParkingLocations(page, limit);
    
    res.status(200).json({
      success: true,
      data: parkingLocations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get parking locations error:', error);
    res.status(500).json({ error: 'Failed to retrieve parking locations' });
  }
};

export const getByCode = async (req: Request, res: Response) => {
  try {
    const code = req.params.code;
    
    const parkingLocation = await getParkingLocationByCode(code);
    
    if (!parkingLocation) {
      return res.status(404).json({ error: 'Parking location not found' });
    }
    
    res.status(200).json({
      success: true,
      data: parkingLocation
    });
  } catch (error) {
    console.error('Get parking location error:', error);
    res.status(500).json({ error: 'Failed to retrieve parking location' });
  }
};

export const update = async (req: AuthRequest, res: Response) => {
  try {
    const code = req.params.code;
    const updateData: ParkingLocationUpdateInput = req.body;
    
    const parkingLocation = await getParkingLocationByCode(code);
    
    if (!parkingLocation) {
      return res.status(404).json({ error: 'Parking location not found' });
    }
    
    const updatedParkingLocation = await updateParkingLocation(code, updateData);
    
    res.status(200).json({
      success: true,
      data: updatedParkingLocation
    });
  } catch (error) {
    console.error('Update parking location error:', error);
    res.status(500).json({ error: 'Failed to update parking location' });
  }
};

export const remove = async (req: AuthRequest, res: Response) => {
  try {
    const code = req.params.code;
    
    const parkingLocation = await getParkingLocationByCode(code);
    
    if (!parkingLocation) {
      return res.status(404).json({ error: 'Parking location not found' });
    }
    
    await deleteParkingLocation(code);
    
    res.status(200).json({
      success: true,
      message: 'Parking location deleted successfully'
    });
  } catch (error) {
    console.error('Delete parking location error:', error);
    
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Cannot delete parking location with associated records' });
    }
    
    res.status(500).json({ error: 'Failed to delete parking location' });
  }
};