
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    error: true,
    message: env.NODE_ENV == "production" 
      ? "Internal Server Error"
      : err.message,
    data: null,
  })
}