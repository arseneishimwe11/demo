import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ error: errorMessage });
    }
    
    next();
  };
};

export const vehicleEntrySchema = Joi.object({
  plateNumber: Joi.string().required().trim().min(3).max(20)
    .pattern(/^[A-Z0-9]+$/)
    .message('Plate number must contain only uppercase letters and numbers'),
  parkingCode: Joi.string().required().trim(),
  userId: Joi.number().optional()
});

export const vehicleExitSchema = Joi.object({
  id: Joi.number().required().positive()
});