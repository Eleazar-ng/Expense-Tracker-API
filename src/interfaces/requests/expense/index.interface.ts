
export interface CreateExpenseRequest {
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface GetExpensesRequest {
  period?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}

export interface GetExpenseRequest {
  id: string;
}