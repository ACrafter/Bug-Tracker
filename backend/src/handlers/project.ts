/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Express from "express";
import { ProjectStore } from "../models/project";

const store = new ProjectStore();

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
    throw new Error(`Error Couldn't Get Projects: ${err}`);
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
    res.send(`Error, Couldn't Get Project: ${err}`);
  }
};

const create = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    const newUser = await store.create({
      title: req.body.title,
      project_lang: req.body.language,
      project_desc: req.body.description,
      department: req.body.department,
      rating: 0,
      last_mod_by: null,
    });
    res.json(newUser.id);
  } catch (err) {
    res.status(203);
    res.send(`Error, Couldn't Create Project: ${err}`);
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
    res.send(`Error, Couldn't Update Project: ${err}`);
  }
};

const del = async (
  req: Express.Request,
  res: Express.Response
): Promise<void> => {
  try {
    await store.delete(Number(req.params.id));
    res.send(`Project deleted successfully`);
  } catch (err) {
    res.status(203);
    res.send(`Error, Couldn't Delete Project: ${err}`);
  }
};

const projectRoutes = async (app: Express.Application): Promise<void> => {
  app.get("/projects", index);
  app.post("/projects", create);
  app.get("/projects/:id", getOne);
  app.patch("/projects/:id", update);
  app.delete("/projects/:id", del);
};

export default projectRoutes;
