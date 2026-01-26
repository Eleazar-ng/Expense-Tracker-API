import { ExpenseCategory } from "../../../config/prisma/generated/prisma/enums";

export interface ExpenseCreate {
  amount: number;
  description?: string;
  category: ExpenseCategory
  date?: Date;
  userId: string;
}

export interface ExpenseFilter {
  userId: string;
  date: DateFilter;
}

export interface DateFilter {
  lte: Date;
  gte: Date;
}

export interface ExpenseFetch {
  id: string;
  userId: string;
}

export type ExpenseUpdate = Partial <ExpenseCreate>;