import { Router } from "express";
import { expenseFilterSchema, expenseSchema, expenseUpdateSchema, queryValidate, validate } from "../../utils/validation";
import { ExpenseController } from "../../controllers";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", validate(expenseSchema), ExpenseController.create);
router.get("/", queryValidate(expenseFilterSchema), ExpenseController.getAll);
router.get("/:id", ExpenseController.getOne);
router.put("/:id", validate(expenseUpdateSchema), ExpenseController.update);
router.delete("/:id", ExpenseController.delete);
export { router as Expense };