
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../interfaces/requests";
import { env } from "../config/env";
import { ExpenseCategory } from "../config/prisma/generated/prisma/enums";

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

  static getCategory = (category: string) => {
    let expenseCategory;

    switch(category){
      case 'GROCERIES':
        expenseCategory = ExpenseCategory.GROCERIES;
        break;

      case 'LEISURE':
        expenseCategory = ExpenseCategory.LEISURE;
        break;

      case 'ELECTRONICS': 
        expenseCategory = ExpenseCategory.ELECTRONICS;
        break;

      case 'UTILITIES': 
        expenseCategory = ExpenseCategory.UTILITIES;
        break;

      case 'CLOTHING': 
        expenseCategory = ExpenseCategory.CLOTHING;
        break;

      case 'HEALTH': 
        expenseCategory = ExpenseCategory.HEALTH;
        break;

      case 'OTHERS': 
        expenseCategory = ExpenseCategory.OTHERS;
        break;

      default:
        expenseCategory = ExpenseCategory.OTHERS;
    }

    return expenseCategory;
  }
}