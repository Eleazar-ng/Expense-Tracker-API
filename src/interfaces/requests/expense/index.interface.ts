
export interface CreateExpenseRequest {
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface GetExpenseRequest {
  period?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
}