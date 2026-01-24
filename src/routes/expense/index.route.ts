import { Router } from "express";
import { expenseSchema, validate } from "../../utils/validation";
import { ExpenseController } from "../../controllers";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", validate(expenseSchema), ExpenseController.create);

export { router as Expense };