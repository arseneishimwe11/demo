import { Router } from "express";
import * as reportController from "../controllers/report.controller";
import { RequestHandler } from 'express';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UsageReport:
 *       type: object
 *       properties:
 *         totalEntries:
 *           type: integer
 *           description: Total number of vehicle entries
 *         averageDuration:
 *           type: number
 *           description: Average parking duration in hours
 *         peakHours:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               hour:
 *                 type: integer
 *               count:
 *                 type: integer
 *           description: Peak hours with highest entry counts
 *         dailyUsage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               count:
 *                 type: integer
 *           description: Daily usage counts
 *     RevenueReport:
 *       type: object
 *       properties:
 *         totalRevenue:
 *           type: number
 *           description: Total revenue generated
 *         dailyRevenue:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               amount:
 *                 type: number
 *           description: Daily revenue amounts
 *         revenueByVehicleType:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               vehicleType:
 *                 type: string
 *               amount:
 *                 type: number
 *           description: Revenue breakdown by vehicle type
 *     OccupancyReport:
 *       type: object
 *       properties:
 *         currentOccupancy:
 *           type: integer
 *           description: Current number of vehicles parked
 *         totalCapacity:
 *           type: integer
 *           description: Total parking capacity
 *         occupancyRate:
 *           type: number
 *           description: Current occupancy rate as percentage
 *         occupancyByHour:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               hour:
 *                 type: integer
 *               rate:
 *                 type: number
 *           description: Occupancy rate by hour
 *     VehicleTypeReport:
 *       type: object
 *       properties:
 *         distribution:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               vehicleType:
 *                 type: string
 *               count:
 *                 type: integer
 *               percentage:
 *                 type: number
 *           description: Distribution of vehicle types
 *         trend:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               vehicleTypes:
 *                 type: object
 *                 additionalProperties:
 *                   type: integer
 *           description: Trend of vehicle types over time
 */

/**
 * @swagger
 * /usage:
 *   get:
 *     summary: Get usage report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: parkingLotId
 *         schema:
 *           type: string
 *         description: Parking location code (optional)
 *     responses:
 *       200:
 *         description: Usage report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UsageReport'
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/usage", reportController.getUsageReport as RequestHandler);

/**
 * @swagger
 * /revenue:
 *   get:
 *     summary: Get revenue report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: parkingLotId
 *         schema:
 *           type: string
 *         description: Parking location code (optional)
 *     responses:
 *       200:
 *         description: Revenue report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/RevenueReport'
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/revenue", reportController.getRevenueReport as RequestHandler);

/**
 * @swagger
 * /occupancy:
 *   get:
 *     summary: Get occupancy report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date (YYYY-MM-DD)
 *       - in: query
 *         name: parkingLotId
 *         schema:
 *           type: string
 *         description: Parking location code (optional)
 *     responses:
 *       200:
 *         description: Occupancy report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/OccupancyReport'
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/occupancy", reportController.getOccupancyReport as RequestHandler);

/**
 * @swagger
 * /vehicle-types:
 *   get:
 *     summary: Get vehicle type distribution report
 *     tags: [Reports]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *       - in: query
 *         name: parkingLotId
 *         schema:
 *           type: string
 *         description: Parking location code (optional)
 *     responses:
 *       200:
 *         description: Vehicle type report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/VehicleTypeReport'
 *       400:
 *         description: Invalid parameters
 *       500:
 *         description: Server error
 */
router.get("/vehicle-types", reportController.getVehicleTypeReport as RequestHandler);

export default router;
