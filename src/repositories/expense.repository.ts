import { prisma } from "../config/prisma/prisma";
import { ExpenseCreate } from "../interfaces/models";

export class Expense {
  static create = async (data:ExpenseCreate) => {
    try {
      return await prisma.expense.create({
        data
      })
    } catch (error) {
      throw error
    }
  }
}