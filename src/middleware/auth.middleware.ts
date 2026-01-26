import { Request, Response, NextFunction } from "express";
import { rateLimit } from "express-rate-limit";
import { AsyncHandler } from "./async.handler";
import { error } from "../utils/api.response";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayload } from "../interfaces/requests";

export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
  standardHeaders: 'draft-8',
  message: "Too many requests, please try again later"
})

export const authenticate = AsyncHandler(
  async(request:Request, response:Response, next:NextFunction) => {
    const authHeader = request.headers.authorization;
    if(!authHeader || !authHeader?.startsWith('Bearer ')){
      return error(response, "Authentication required", 401)
    }

    const token:any = authHeader.split(" ")[1];
    jwt.verify(token,env.JWT_SECRET, async function(err:any, decoded:any){
      if(err){
        switch (err.name) {
          case "TokenExpiredError":
            return error(response, "Expired authentication token", 401)
            break;
          case "JsonWebTokenError":
            return error(response, "Invalid authentication token", 422)
            break;
          default:
            return error(response, "Invalid authentication token", 401)	
        }
      }

      request.user = {...decoded, id: decoded.userId};

      next();
    })
  }
)