/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Express from "express";
import { UserStore } from "../models/users";

const store = new UserStore();

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
    throw new Error(`Error Couldn't Get Users: ${err}`);
  }
};

const getOne = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const result = await store.getOne(Number(req.params.id));
    res.json(result);
  } catch (err) {
    res.status(203);
    res.send(`Error, Couldn't Get User: ${err}`);
  }
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const newUser = await store.create({
      username: req.body.username,
      user_password: req.body.user_password,
      user_email: req.body.user_email,
    });
    res.json(newUser.id);
  } catch (err) {
    res.status(203);
    res.send(`Error, Couldn't Create User: ${err}`);
  }
};

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
    res.send(`Error, Couldn't Update User: ${err}`);
  }
};

const del = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    await store.delete(Number(req.params.id));
    res.send(`User deleted successfully`);
  } catch (err) {
    res.status(203);
    res.send(`Error, Couldn't Delete User: ${err}`);
  }
};

const userRoutes = async (app: Express.Application): Promise<void> => {
  app.get("/users", index);
  app.post("/users", create);
  app.get("/users/:id", getOne);
  app.patch("/users/:id", update);
  app.delete("/users/:id", del);
};

export default userRoutes;
