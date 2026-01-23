
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/requests";
import { env } from "../config/env";

const SALT_ROUNDS = 12;

export class Helper {
  static hashPassword = async (password: string) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  static comparePassword = async (plainPassword:string, hashedPassword:string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: <any>env.JWT_EXPIRES_IN
    });
  }
}