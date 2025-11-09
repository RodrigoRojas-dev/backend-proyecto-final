import { Request, Response } from "express";
import { Book } from "../models/BookModel";
import { Types } from "mongoose";


class BookController {
  static addBook = async (req: Request, res: Response) => {
    try {
      const { title, subtitle, author, synopsis, genre, language, publisher, publicationDate, pageCount, format, price, stock } = req.body

      const isAvailable = stock > 0;

      const newBook = new Book({
        title,
        subtitle,
        author,
        synopsis,
        genre,
        language,
        publisher,
        publicationDate,
        pageCount,
        format,
        price,
        stock,
        isAvailable
      })

      const savedBook = await newBook.save()

      res.status(201).json({ success: true, data: savedBook })

    } catch (e) {
      const error = e as Error

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

      res.status(200).json({ succes: true, data: books })
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

      if (!Types.ObjectId.isValid(id)) {
        const error = new Error("ID Invalido.");
        error.name = "InvalidInput";
        throw error;
      }

      const book = await Book.findById(id)

      if (!book) {
        const error = new Error("Libro no encontrado")
        error.name = "NotFound"
        throw error
      }

      res.status(200).json({ success: true, data: book })

    }
    catch (e) {
      const error = e as Error

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
        case "InvalidInput":
          res.status(400).json({ success: false, error: error.message })
          break;
        case "NotFound":
          res.status(404).json({ success: false, error: error.message })
      }
    }
  }
}

export default BookController