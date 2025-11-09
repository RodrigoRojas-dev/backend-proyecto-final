import { Request, Response } from "express";
import { Book } from "../models/BookModel";


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
}

export default BookController