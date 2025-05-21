import { Router } from "express";
import {
  entryVehicle,
  exitVehicle,
  getAllEntries,
  getEntryById,
  getBill,
  deleteVehicleEntry,
} from "../controllers/vehicle.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  validate,
  vehicleEntrySchema,
  vehicleExitSchema,
} from "../middlewares/validation.middleware";
import { UserRole } from "../types";
import { RequestHandler } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     VehicleEntry:
 *       type: object
 *       required:
 *         - plateNumber
 *         - vehicleType
 *         - parkingCode
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the vehicle entry
 *         plateNumber:
 *           type: string
 *           description: Vehicle plate number
 *         vehicleType:
 *           type: string
 *           enum: [CAR, MOTORCYCLE, TRUCK, BUS]
 *           description: Type of vehicle
 *         parkingCode:
 *           type: string
 *           description: Code of the parking location
 *         entryTime:
 *           type: string
 *           format: date-time
 *           description: Time when vehicle entered
 *         exitTime:
 *           type: string
 *           format: date-time
 *           description: Time when vehicle exited (null if still parked)
 *         status:
 *           type: string
 *           enum: [ACTIVE, EXITED]
 *           description: Status of the vehicle entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the entry was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the entry was last updated
 *     VehicleEntryInput:
 *       type: object
 *       required:
 *         - plateNumber
 *         - vehicleType
 *         - parkingCode
 *       properties:
 *         plateNumber:
 *           type: string
 *           description: Vehicle plate number
 *         vehicleType:
 *           type: string
 *           enum: [CAR, MOTORCYCLE, TRUCK, BUS]
 *           description: Type of vehicle
 *         parkingCode:
 *           type: string
 *           description: Code of the parking location
 *     VehicleExitInput:
 *       type: object
 *       required:
 *         - entryId
 *       properties:
 *         entryId:
 *           type: integer
 *           description: ID of the vehicle entry
 *     Bill:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the bill
 *         entryId:
 *           type: integer
 *           description: ID of the vehicle entry
 *         amount:
 *           type: number
 *           format: decimal
 *           description: Total amount to pay
 *         duration:
 *           type: number
 *           description: Duration of stay in hours
 *         status:
 *           type: string
 *           enum: [PENDING, PAID]
 *           description: Payment status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the bill was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the bill was last updated
 */

/**
 * @swagger
 * /entry:
 *   post:
 *     summary: Record a vehicle entry
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleEntryInput'
 *     responses:
 *       201:
 *         description: Vehicle entry recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/VehicleEntry'
 *       400:
 *         description: Validation error or no available spaces
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  "/entry",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN, UserRole.ATTENDANT]) as RequestHandler,
  validate(vehicleEntrySchema) as RequestHandler,
  entryVehicle as RequestHandler
);

/**
 * @swagger
 * /exit:
 *   post:
 *     summary: Record a vehicle exit
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehicleExitInput'
 *     responses:
 *       200:
 *         description: Vehicle exit recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/VehicleEntry'
 *                 bill:
 *                   $ref: '#/components/schemas/Bill'
 *       400:
 *         description: Validation error or vehicle already exited
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Vehicle entry not found
 *       500:
 *         description: Server error
 */
router.post(
  "/exit",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN, UserRole.ATTENDANT]) as RequestHandler,
  validate(vehicleExitSchema) as RequestHandler,
  exitVehicle as RequestHandler
);

/**
 * @swagger
 * /{id}/bill:
 *   get:
 *     summary: Get bill for a vehicle entry
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle entry ID
 *     responses:
 *       200:
 *         description: Bill information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Bill'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bill not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:id/bill",
  authenticate as RequestHandler,
  getBill as RequestHandler
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all vehicle entries
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, EXITED]
 *         description: Filter by status
 *       - in: query
 *         name: parkingCode
 *         schema:
 *           type: string
 *         description: Filter by parking location code
 *       - in: query
 *         name: plateNumber
 *         schema:
 *           type: string
 *         description: Filter by plate number
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of vehicle entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/VehicleEntry'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
  "/",
  authenticate as RequestHandler,
  getAllEntries as RequestHandler
);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get vehicle entry by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle entry ID
 *     responses:
 *       200:
 *         description: Vehicle entry information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/VehicleEntry'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Vehicle entry not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:id",
  authenticate as RequestHandler,
  getEntryById as RequestHandler
);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a vehicle entry by ID
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Vehicle entry ID
 *     responses:
 *       200:
 *         description: Vehicle entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Vehicle entry not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN, UserRole.ATTENDANT]) as RequestHandler,
  deleteVehicleEntry as unknown as RequestHandler
);
export default router;
