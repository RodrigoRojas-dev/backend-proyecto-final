import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/UserModel";



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
}

export default AuthController