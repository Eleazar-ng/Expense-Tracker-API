
import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";
import { CustomError } from "../errors";
import { error } from "./api.response";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if(err instanceof CustomError){
    return error(res, err.serializeErrors()[0]?.message, err.statusCode);
  }

  const errMessage = env.NODE_ENV == "production" ? "Internal Server Error" : err.message

  return error(res, errMessage, 500);
}