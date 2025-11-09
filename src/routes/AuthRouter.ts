import { Router } from "express";
import AuthController from "../controllers/AuthController";


const authRouter = Router()

authRouter.post("/register", AuthController.register)

export { authRouter }