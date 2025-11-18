import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";

class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body

      const hash = await bcrypt.hash(password, 10)
      const newUser = new User({ name, email, password: hash })

      await newUser.save()

      res.status(200).json({ succes: true, data: newUser })
    } catch (e) {
      const error = e as Error

      switch (error.name) {
        case "MongoServerError":
          res.status(409).json({ success: false, error: "Usuario ya existe en nuestra base de datos." })
          break;
      }
    }
  }

  static login = async (req: Request, res: Response) => {

    const SECRET_KEY = process.env.JWT_SECRET!
    
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const error = new Error("Debe proporcionar email y contraseña.");
        error.name = "InvalidInput";
        throw error;
      }

      const user = await User.findOne({ email })

      if (!user) {
        const error = new Error("Credenciales no válidas.")

        error.name = "AuthFail"

        throw error
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        const error = new Error("Credenciales no válidas.");
        error.name = "AuthFail";
        throw error;
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" })

      res.status(200).json({ success: true, token })

    } catch (e) {
      const error = e as Error

      switch (error.name) {
        default:
          res.status(500).json({ success: false, error: error.message })
          break;
        case "InvalidInput":
          res.status(400).json({ success: false, error: error.message })
          break;
        case "AuthFail":
          res.status(401).json({ success: false, error: error.message })
          break;
      }
    }
  }
}

export default AuthController