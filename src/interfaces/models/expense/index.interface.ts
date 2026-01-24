import { ExpenseCategory } from "../../../config/prisma/generated/prisma/enums";

export interface ExpenseCreate {
  amount: number;
  description?: string;
  category: ExpenseCategory
  date?: Date;
  userId: string;
}