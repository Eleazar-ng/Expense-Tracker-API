import { Router } from "express";
import { expenseFilterSchema, expenseSchema, queryValidate, validate } from "../../utils/validation";
import { ExpenseController } from "../../controllers";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", validate(expenseSchema), ExpenseController.create);
router.get("/", queryValidate(expenseFilterSchema), ExpenseController.getAll);

export { router as Expense };