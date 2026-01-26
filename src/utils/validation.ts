
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { error } from "./api.response";
import { RequestValidationError } from "../errors";
import { Categories, Periods } from "./constants";

// Auth Validations
export const signupSchema = z.object({
  firstName: z.string().min(2, 'Firstname must be at least 2 characters').max(50, 'Firstname cannot exceed 50 characters'),
  lastName: z.string().min(2, 'Lastname must be at least 2 characters').max(50, 'Lastname cannot exceed 50 characters'),
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,'Password must contain at least one uppercase letter, one lowercase letter, and one number')
})

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100, 'Password cannot exceed 100 characters')
})


// Expense Validations
export const expenseSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  description: z.string().max(500, 'Description too long').optional(),
  category: z.enum(Categories),
  date: z.iso.datetime().optional()
})

export const expenseFilterSchema = z.object({
  period: z.enum(Periods).optional(),
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
  page: z.string().transform(Number).default(1).optional()
})

export const expenseUpdateSchema = expenseSchema.partial();


// Schema Validators
export const validate = (schema: z.ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse(request.body);
    next()
  } catch (err) {
    if(err instanceof z.ZodError){
      const parsed = JSON.parse(err.message);
      throw new RequestValidationError(parsed[0].message);
    }
    next(error);
  }
}

export const queryValidate = (schema: z.ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
  try {
    schema.parse(request.query);
    next()
  } catch (err) {
    if(err instanceof z.ZodError){
      const parsed = JSON.parse(err.message);
      throw new RequestValidationError(parsed[0].message);
    }
    next(error);
  }
}