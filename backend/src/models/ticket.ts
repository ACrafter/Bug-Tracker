/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Ticket{
    id?: Number,
    ticket_status?: String,
    title: String,
    ticket_type: String,
    ticket_description: String,
    last_check?: String | null,
    projectid: Number
}

export class TicketStore {
    async index(): Promise<Ticket[]> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM tickets"; // Defining the SQL query
          const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive projects => ${err}`);
        }
      }

      async getOne(id: Number): Promise<Ticket> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM tickets WHERE id=$1"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive project whose id=${id} => ${err}`);
        }
      }

      async create(ticketInfo: Ticket): Promise<Ticket> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "INSERT INTO tickets (title, ticket_type, ticket_Description ,projectid) VALUES ($1, $2, $3, $4) RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [ticketInfo.title, ticketInfo.ticket_type, ticketInfo.ticket_description, ticketInfo.projectid]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't create ticket with title=${ticketInfo.title} => ${err}`);
        }
      }

      async update(id:Number, modify: String, value: String | Number): Promise<Ticket> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "UPDATE tickets SET " + modify + "=$2 WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id, value]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't update ticket with id=${id} => ${err}`);
        }
      }

      async delete(id: Number): Promise<Ticket> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "DELETE FROM tickets WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't delete ticket whose id=${id} => ${err}`);
        }
      }
}