import { Router } from "express";
import { login, signup, verifyUserAccount } from "./auth.controller.js";
import { validation } from "../../middleware/validation.middleware.js";
import { loginValidation, signupValidation, verifyAccountValidation } from "./auth.validation.js";

const authRouter = Router()

authRouter.post('/signup' ,validation(signupValidation),  signup)
authRouter.post('/verify-account' ,validation(verifyAccountValidation),  verifyUserAccount)
authRouter.post('/login' ,validation(loginValidation),  login)


export default authRouter