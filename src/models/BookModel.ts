import { model, Schema } from "mongoose";
import { z } from "zod"
import { zodBookSchema } from "../validators/BookValidator";

export type IBook = z.infer<typeof zodBookSchema>

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  author: { type: String, required: true },
  synopsis: { type: String, required: true },
  genre: { type: [String], required: true },
  language: { type: String, required: true },
  publisher: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  pageCount: { type: Number, required: true, min: 1 },
  format: { type: String, required: true, enum: ["Tapa Dura", "Tapa Blanda", "Ebook", "AudioLibro"] },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, default: 0, min: 0 },
  isAvailable: { type: Boolean, required: true }
},
  {
    versionKey: false
  })

const Book = model<IBook>("Book", bookSchema)

export { Book }