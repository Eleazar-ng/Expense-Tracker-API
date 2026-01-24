import { ExpenseCategory } from "../config/prisma/generated/prisma/enums";
import { ForbiddenError } from "../errors";
import { UserId } from "../interfaces/models";
import { CreateExpenseRequest } from "../interfaces/requests";
import { Expense } from "../repositories/expense.repository";
import { Categories } from "../utils/constants";
import { Helper } from "../utils/helper";


export class ExpenseService {
  static create = async (data:CreateExpenseRequest, user:UserId) => {
    try {
      const category = Helper.getCategory(data.category);
      const expenseData = {...data, category, userId:user.userId};
      const expense = await Expense.create(expenseData);
      return expense;
    } catch (error) {
      throw error
    }
  }
}