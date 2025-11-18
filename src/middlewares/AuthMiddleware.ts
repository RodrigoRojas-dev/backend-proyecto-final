import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IUserTokenPayload } from "../interfaces/IUserTokenPayload";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const SECRET_KEY = process.env.JWT_SECRET!

  const header = req.headers.authorization

  try {
    if (!header) {
      const error = new Error("El token es requerido");
      error.name = "notToken";
      throw error;
    }

    const token = header.split(" ")[1]

    const payload = verify(token, SECRET_KEY);

    (req as any).user = payload as IUserTokenPayload

    next()

  } catch (e) {
    const error = e as Error
    switch (error.name) {
      default:
        res.status(401).json({ succes: false, error: error.message })
        break;
      case "notToken":
        res.status(401).json({ success: false, error: error.message })
        break;
    }
  }
}

export { authMiddleware }