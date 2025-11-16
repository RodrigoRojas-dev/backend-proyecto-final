import { Request, Response } from "express";
import { Book } from "../models/BookModel";
import { z, ZodError } from "zod";
import { zodBookSchema, ZObjectID } from "../validators/BookValidator";


class BookController {
  static addBook = async (req: Request, res: Response) => {
    try {
      const { body } = req

      const validatedData = zodBookSchema.parse(body)

      const isAvailable = validatedData.stock > 0;

      const newBook = new Book({
        ...validatedData,
        isAvailable,
      })

      const savedBook = await newBook.save()

      res.status(201).json({ success: true, data: savedBook })

    } catch (e) {
      const error = e as Error

      if (error instanceof z.ZodError) {

        const typedError = e as ZodError

        const errorDetails = z.treeifyError(typedError);

        return res.status(400).json({
          success: false,
          error: errorDetails,
        });
      }

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
      }
    }
  }

  static getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await Book.find()

      res.status(200).json({ success: true, data: books })
    } catch (e) {
      const error = e as Error

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
      }
    }
  }

  static getBookbyID = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const validatedId = ZObjectID.parse(id)

      const book = await Book.findById(validatedId)

      if (!book) {
        const error = new Error("Libro no encontrado")
        error.name = "NotFound"
        throw error
      }

      res.status(200).json({ success: true, data: book })

    }
    catch (e) {

      if (e instanceof ZodError) {

        const typedError = e as ZodError

        const errorDetails = z.treeifyError(typedError);

        return res.status(400).json({
          success: false,
          error: errorDetails,
        });
      }

      const error = e as Error

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
        case "NotFound":
          res.status(404).json({ success: false, error: error.message })
          break;
      }
    }
  }

  static updateBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updateData = req.body

      const validatedId = ZObjectID.parse(id);

      const partialSchema = zodBookSchema.partial();
      const validatedUpdateData = partialSchema.parse(updateData);

      if (validatedUpdateData.stock !== undefined) {
        validatedUpdateData.isAvailable = validatedUpdateData.stock > 0;
      }

      const updatedBook = await Book.findByIdAndUpdate(
        validatedId,
        validatedUpdateData,
        { new: true }
      )

      if (!updatedBook) {
        const error = new Error("Libro a actualizar no encontrado")
        error.name = "NotFound"
        throw error
      }

      res.status(200).json({ success: true, data: updatedBook })

    } catch (e) {
      const error = e as Error

      if (error instanceof z.ZodError) {

        const typedError = e as ZodError

        const errorDetails = z.treeifyError(typedError);

        return res.status(400).json({
          success: false,
          error: errorDetails,
        });
      }

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
        case "NotFound":
          res.status(404).json({ success: false, error: error.message })
          break;
      }
    }
  }

  static deleteBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params

      const validatedId = ZObjectID.parse(id);

      const result = await Book.findByIdAndDelete(validatedId)

      if (!result) {
        const error = new Error("Libro a eliminar no encontrado")
        error.name = "NotFound"
        throw error
      }

      res.status(200).json({ success: true, data: result })
    } catch (e) {
      const error = e as Error

      if (error instanceof z.ZodError) {

        const typedError = e as ZodError

        const errorDetails = z.treeifyError(typedError);

        return res.status(400).json({
          success: false,
          error: errorDetails,
        });
      }

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
        case "InvalidInput":
          res.status(400).json({ success: false, error: error.message })
          break;
        case "NotFound":
          res.status(404).json({ success: false, error: error.message })
          break;
      }
    }
  }
}

export default BookController