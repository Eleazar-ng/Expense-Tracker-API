
import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/async.handler";
import { LoginRequest, SignupRequest } from "../interfaces/requests";
import { AuthService } from "../services";
import { success } from "../utils/api.response";

export class AuthController {
  static signup = AsyncHandler(
    async (request:Request<{},{},SignupRequest,{}>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.signup(payload);
      return success(response, "User created successfully", data, 201);
    }
  )

  static login = AsyncHandler(
    async (request:Request<{},{},LoginRequest,{}>, response:Response) => {
      const payload = request.body;
      const data = await AuthService.login(payload);
      return success(response, "Login successful", data, 200);
    }
  )
}