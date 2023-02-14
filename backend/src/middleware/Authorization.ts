import Express from "express";
import { verify } from "jsonwebtoken";
import { UserStore } from "../models/users";

const U = new UserStore()

export const Auth = async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
): Promise<void> => {  
  try {
    const token = String(req.headers.authorization);
    const id = typeof req.params.id === 'undefined' ? 0 : Number(req.params.id)
    const userId = verify(token, String(process.env.TOKEN));
    const isAdmin = await U.isAdmin(Number(userId))
    

    if(isAdmin !== false) {
      next();
    } else if (id === Number(userId)){
      next()
    } else {
      res.status(403);
      res.json("Access denied, invalid token");
    }
  } catch (err) {
    res.status(401);
    res.json("Access denied, no token");
  }
};

export default Auth

