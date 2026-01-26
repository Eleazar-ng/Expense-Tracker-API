import { prisma } from "../config/prisma/prisma";
import { ExpenseCreate, ExpenseFetch, ExpenseFilter, ExpenseUpdate } from "../interfaces/models";
import { PAGE_LIMIT } from "../utils/constants";

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

  static getAll = async (filters:ExpenseFilter, page:number) => {
    const skip = (page - 1) * PAGE_LIMIT
    try {
      const [expenses, total] = await prisma.$transaction([
        prisma.expense.findMany({
          where:filters,
          orderBy:{
            date: 'desc'
          },
          skip,
          take:PAGE_LIMIT
        }),
        prisma.expense.count({ where:filters })
      ]);

      return {
        expenses,
        pagination: {
          page,
          limit: PAGE_LIMIT,
          totalExpenses: total,
          totalPages: Math.ceil(total / PAGE_LIMIT)
        }
      }
    } catch (error) {
      throw error
    }
  }

  static getOne = async (data:ExpenseFetch) => {
    try {
      return await prisma.expense.findFirst({
        where:data
      })
    } catch (error) {
      throw error
    }
  }

  static update = async (data:ExpenseUpdate, req:ExpenseFetch) => {
    try {
      return await prisma.expense.update({
        where:req,
        data
      })
    } catch (error) {
      throw error
    }
  }

  static delete = async (data:ExpenseFetch) => {
    try {
      return await prisma.expense.delete({
        where:data
      })
    } catch (error) {
      throw error
    }
  }
}