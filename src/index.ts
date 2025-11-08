import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()

const PORT = process.env.PORT!

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (__: Request, res: Response) => {
  try {
    res.status(200).json({success: true, data: "✅ ¡conexion exitosa!"})
  } catch (e) {
    const error = e as Error
    res.status(500).json({success: false, data: `Error en el servidor: ${error.name}`})
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
})