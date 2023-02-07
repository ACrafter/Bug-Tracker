import Client from "../database";

export interface Ticket{
    id: Number,
    ticket_status: String,
    title: String,
    ticket_type: String,
    ticket_description: String,
    last_check: String,
    projectid: Number
}

export class TicketStore {}