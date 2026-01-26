import { Request, Response } from "express";
import { AsyncHandler } from "../middleware/async.handler";
import { success } from "../utils/api.response";
import { CreateExpenseRequest, GetExpenseRequest, GetExpensesRequest, UpdateExpenseRequest } from "../interfaces/requests";
import { ExpenseService } from "../services";

export class ExpenseController {
  static create = AsyncHandler(
    async (request:Request<{},{},CreateExpenseRequest,{}>, response:Response) => {
      const payload = request.body;
      const userId:any = request.user?.userId;
      const data = await ExpenseService.create(payload,{userId});
      return success(response, 'Expense created successfully', data, 201);
    }
  )

  static getAll = AsyncHandler(
    async (request:Request<{},{},{},GetExpensesRequest>, response:Response) => {
      const queries = request.query;
      const userId:any = request.user?.userId;
      const data = await ExpenseService.getAll(queries, {userId});
      return success(response, 'Expenses retrieved successfully', data, 200);
    }
  )

  static getOne = AsyncHandler(
    async (request:Request<GetExpenseRequest,{},{},{}>, response:Response) => {
      const pathParam = request.params
      const userId:any = request.user?.userId;
      const data = await ExpenseService.getOne(pathParam, {userId});
      return success(response, 'Expense retrieved successfully', data, 200);
    }
  )

  static update = AsyncHandler(
    async (request:Request<GetExpenseRequest,{},UpdateExpenseRequest,{}>, response:Response) => {
      const payload = request.body;
      const pathParam = request.params
      const userId:any = request.user?.userId;
      const data = await ExpenseService.update(payload,pathParam,{userId});
      return success(response, 'Expense updated successfully', data, 200);
    }
  )

  static delete = AsyncHandler(
    async (request:Request<GetExpenseRequest,{},{},{}>, response:Response) => {
      const pathParam = request.params
      const userId:any = request.user?.userId;
      const data = await ExpenseService.delete(pathParam,{userId});
      return success(response, 'Expense deleted successfully', data, 204);
    }
  )
}