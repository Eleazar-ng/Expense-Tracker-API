
export interface CreateExpenseRequest {
  amount: number;
  description: string;
  category: string;
  date: Date;
}