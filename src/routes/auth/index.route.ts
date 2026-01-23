
import { Router } from "express";
import { loginSchema, signupSchema, validate } from "../../utils/validation";
import { AuthController } from "../../controllers";

const router = Router();

router.post("/signup", validate(signupSchema), AuthController.signup);
router.post("/login", validate(loginSchema), AuthController.login);

export { router as Auth }