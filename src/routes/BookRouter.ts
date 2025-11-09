import { Router } from "express";
import BookController from "../controllers/BookController";


const bookRouter = Router()

bookRouter.post("/", BookController.addBook)
bookRouter.get("/", BookController.getAllBooks)
bookRouter.get("/:id", BookController.getBookbyID)
bookRouter.patch("/:id", BookController.updateBook)
bookRouter.delete("/:id", BookController.deleteBook)

export { bookRouter }