/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Express from "express";
import { TicketStore } from "../models/ticket";


const store = new TicketStore

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
      throw new Error(`Error Couldn't Get Tickets: ${err}`);
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
        res.send(`Error, Couldn't Get Ticket: ${err}`);
    }
}

const create = async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        const newTicket = await store.create({
            title: req.body.title,
            ticket_type: req.body.type,
            ticket_description: req.body.description,
            projectid: req.body.projectId
        })
        res.json(newTicket.id)
    } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Create Ticket: ${err}`);
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
        res.send(`Error, Couldn't Update Ticket: ${err}`);
      }
}

const del = (async (
    req: Express.Request,
    res: Express.Response
): Promise<void> => {
    try {
        await store.delete(Number(req.params.id))
        res.send(`Ticket deleted successfully`)
    } catch (err) {
        res.status(203);
        res.send(`Error, Couldn't Delete Ticket: ${err}`);
    }
})

const ticketRoutes = async (app: Express.Application): Promise<void> => {
    app.get("/tickets", index);
    app.post("/tickets", create);
    app.get("/tickets/:id", getOne);
    app.patch("/tickets/:id", update);
    app.delete("/tickets/:id", del);
  };
  
export default ticketRoutes;