
import { prisma } from "../config/prisma/prisma";
import { Email, UserCreate } from "../interfaces/models";

export class User {
  static findUnique = async (data: Email) => {
    try {
      return await prisma.user.findUnique({
        where: data
      })
    } catch (error) {
      throw error
    }
  }

  static create = async (data: UserCreate) => {
    try {
      return await prisma.user.create({
        data,
        omit:{
          password: true
        }
      })
    } catch (error) {
      throw error
    }
  }
}