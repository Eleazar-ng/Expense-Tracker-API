
import { Router } from "express";
import { signupSchema, validate } from "../../utils/validation";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);

export { router as Auth }