import { Router } from "express";
import BookController from "../controllers/BookController";


const bookRouter = Router()

bookRouter.post("/", BookController.addBook)

export { bookRouter }