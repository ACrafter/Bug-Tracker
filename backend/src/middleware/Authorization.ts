import Express from "express";
import { verify } from "jsonwebtoken";
import { UserStore } from "../models/users";

const U = new UserStore()

export const userAuth = async (
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

export const LeadAuth =async ( 
req: Express.Request,
res: Express.Response,
next: Express.NextFunction
): Promise<void> => { 
  try {
    const token = String(req.headers.authorization);
    const userId = verify(token, String(process.env.TOKEN));
    const isAdmin = await U.isAdmin(Number(userId))
    const isLead = await U.isLead(Number(userId))
    

    if(isAdmin !== false) {
      next();
    } else if (isLead !== false){
      next()
    } else {
      res.status(403);
      res.json("Access denied, invalid token");
    }
  } catch (err) {
    res.status(401);
    res.json("Access denied, no token");
  }
}

export const DevAuth =async ( 
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
  ): Promise<void> => { 
    try {
      const token = String(req.headers.authorization);
      const userId = verify(token, String(process.env.TOKEN));
      const isAdmin = await U.isAdmin(Number(userId))
      const isDev = await U.isDev(Number(userId))
      
      if(isAdmin !== false) {
        next();
      } else if (isDev !== false){
        console.log(isAdmin, isDev);
        next()
      } else {
        res.status(403);
        res.json("Access denied, invalid token");
      }
    } catch (err) {
      res.status(401);
      res.json("Access denied, no token");
    }
  }