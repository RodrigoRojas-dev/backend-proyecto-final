import { z } from "zod";

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

const ZObjectID = z.string().refine(
  (val) => ObjectIdRegex.test(val),
  {
    message: "El ID proporcionado es inválido. Debe ser un string hexadecimal de 24 caracteres."
  }
)

const zodBookSchema = z.object({
  _id: ZObjectID.optional(),
  title: z.string().min(3, { message: "El título es obligatorio" }),
  subtitle: z.string().optional(),
  author: z.string().min(3, { message: "El autor es obligatorio" }),
  synopsis: z.string().min(20, { message: "La sinopsis debe ser más descriptiva" }),
  language: z.string().min(2, { message: "El idioma es obligatorio" }),
  publisher: z.string().min(2, { message: "La editorial es obligatoria" }),
  pageCount: z.number().int().positive({ message: "La cantidad de páginas debe ser un número positivo" }),
  price: z.number().gte(0, { message: "El precio no puede ser negativo" }),
  stock: z.number().int().gte(0, { message: "El stock no puede ser negativo" }),
  isAvailable: z.boolean().default(true),
  genre: z.array(z.string().min(1)).min(1, { message: "Se requiere al menos un género" }),
  publicationDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Formato de fecha inválido. Debe ser YYYY-MM-DD." })
    .refine((dateString) => {
      const date = new Date(dateString);
      return date.toISOString().startsWith(dateString)
    }, { message: "Fecha inválida (p.ej. 30 de febrero o 31 de abril)." })
    .transform((dateString) => new Date(dateString)),
  format: z.enum(["Tapa Dura", "Tapa Blanda", "Ebook", "AudioLibro"], {
    message: "Formato de libro inválido"
  }),
})

export { zodBookSchema, ZObjectID }