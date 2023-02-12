/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Express from "express";
import { CommentStore } from "../models/comment";


const store = new CommentStore()

const index = async (
    req: Express.Request,
    res: Express.Response
  ): Promise<void> => {
    try {
      const result = await store.index();
      res.json(result);
    } catch (err) {
      res.status(203);
      res.send(`Error: ${err}`);
      throw new Error(`Error Couldn't Get Comments: ${err}`);
    }
  };

const getOne = async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        const result = await store.getOne(Number(req.params.id))
        res.json(result)
    } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Get Comment: ${err}`);
    }
}

const create = async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        const newUser = await store.create({
            userid: req.body.id,
            comment_date: req.body.date,
            content: req.body.content,
            likes: 0,
            projectid:req.body.projectId, 
        })
        res.json(newUser.id)
    } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Create Comment: ${err}`);
    }
}

const update = async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        const modify: String = req.body.prop;
        const newValue: String = req.body.value;
        const id: Number = Number(req.params.id);
    
        const result = await store.update(id, modify, newValue);
        res.json(result);
      } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Update Comment: ${err}`);
      }
}

const del = (async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        await store.delete(Number(req.params.id))
        res.send(`Comment deleted successfully`)
    } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Delete Comment: ${err}`);
    }
})

const commentRoutes = async (app: Express.Application): Promise<void> => {
    app.get("/comments", index);
    app.post("/comments", create);
    app.get("/comments/:id", getOne);
    app.patch("/comments/:id", update);
    app.delete("/comments/:id", del);
  };
  
  export default commentRoutes;