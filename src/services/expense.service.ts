import { ExpenseCategory } from "../config/prisma/generated/prisma/enums";
import { ForbiddenError, NotFoundError } from "../errors";
import { ExpenseFilter, UserId } from "../interfaces/models";
import { CreateExpenseRequest, GetExpenseRequest, GetExpensesRequest, UpdateExpenseRequest } from "../interfaces/requests";
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

  static getAll = async (data:GetExpensesRequest, user:UserId) => {
    try {
      const { period, page = 1} = data;

      const filters:any = {userId: user.userId};

      if(period){
        const {startDate, endDate} = Helper.getTimeRange(period);

        filters.date = {
          gte: startDate,
          lte: endDate
        }

        if(data.startDate && data.endDate){
          filters.date = {
            gte: new Date(data.startDate),
            lte: new Date(data.endDate)
          }
        }
      }

      const expenses = await Expense.getAll(filters, Number(page))

      return {
        expenses: expenses.expenses,
        pagination: expenses.pagination
      }
    } catch (error) {
      throw error
    }
  }

  static getOne = async (data:GetExpenseRequest, user:UserId) => {
    try {
      const expense = await Expense.getOne({id:data.id, userId:user.userId});
      if(!expense){
        throw new NotFoundError("Expense not found");
      }
      return expense;
    } catch (error) {
      throw error
    }
  }

  static update = async (data:UpdateExpenseRequest, param:GetExpenseRequest, user:UserId) => {
    try {
      const expenseData:any = {...data};
      if(data.category){
        const category = Helper.getCategory(data.category);
        expenseData.category = category;
      }

      const expense = await Expense.getOne({id:param.id, userId:user.userId});
      if(!expense){
        throw new NotFoundError("Expense not found");
      }

      const updateExpense = await Expense.update(expenseData, {id:param.id, userId:user.userId});
      return updateExpense;
    } catch (error) {
      throw error
    }
  }
}