import { Router } from "express";
import {
  create,
  getAll,
  getByCode,
  update,
  remove,
} from "../controllers/parking.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { UserRole } from "../types";
import { RequestHandler } from "express";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ParkingLocation:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - totalSpaces
 *         - location
 *         - feePerHour
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the parking location
 *         code:
 *           type: string
 *           description: Unique code for the parking location
 *         name:
 *           type: string
 *           description: Name of the parking location
 *         totalSpaces:
 *           type: integer
 *           description: Total number of parking spaces
 *         availableSpaces:
 *           type: integer
 *           description: Number of available parking spaces
 *         location:
 *           type: string
 *           description: Physical location address
 *         feePerHour:
 *           type: number
 *           format: decimal
 *           description: Parking fee per hour
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the parking location was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the parking location was last updated
 *     ParkingLocationInput:
 *       type: object
 *       required:
 *         - code
 *         - name
 *         - totalSpaces
 *         - location
 *         - feePerHour
 *       properties:
 *         code:
 *           type: string
 *           description: Unique code for the parking location
 *         name:
 *           type: string
 *           description: Name of the parking location
 *         totalSpaces:
 *           type: integer
 *           description: Total number of parking spaces
 *         location:
 *           type: string
 *           description: Physical location address
 *         feePerHour:
 *           type: number
 *           format: decimal
 *           description: Parking fee per hour
 *     ParkingLocationUpdateInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the parking location
 *         totalSpaces:
 *           type: integer
 *           description: Total number of parking spaces
 *         location:
 *           type: string
 *           description: Physical location address
 *         feePerHour:
 *           type: number
 *           format: decimal
 *           description: Parking fee per hour
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all parking locations
 *     tags: [Parking]
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
 *     responses:
 *       200:
 *         description: List of parking locations
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
 *                     $ref: '#/components/schemas/ParkingLocation'
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
 *       500:
 *         description: Server error
 */
router.get("/", getAll as RequestHandler);

/**
 * @swagger
 * /{code}:
 *   get:
 *     summary: Get parking location by code
 *     tags: [Parking]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Parking location code
 *     responses:
 *       200:
 *         description: Parking location information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ParkingLocation'
 *       404:
 *         description: Parking location not found
 *       500:
 *         description: Server error
 */
router.get("/:code", getByCode as RequestHandler);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new parking location
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingLocationInput'
 *     responses:
 *       201:
 *         description: Parking location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ParkingLocation'
 *       400:
 *         description: Parking code already exists
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN]) as RequestHandler,
  create as RequestHandler
);

/**
 * @swagger
 * /{code}:
 *   put:
 *     summary: Update a parking location
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Parking location code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ParkingLocationUpdateInput'
 *     responses:
 *       200:
 *         description: Parking location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ParkingLocation'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Parking location not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:code",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN]) as RequestHandler,
  update as RequestHandler
);

/**
 * @swagger
 * /{code}:
 *   delete:
 *     summary: Delete a parking location
 *     tags: [Parking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Parking location code
 *     responses:
 *       200:
 *         description: Parking location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Cannot delete parking location with associated records
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Parking location not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:code",
  authenticate as RequestHandler,
  authorize([UserRole.ADMIN]) as RequestHandler,
  remove as RequestHandler
);

export default router;
