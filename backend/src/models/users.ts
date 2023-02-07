/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

dotenv.config();
const pepper = String(process.env.SECRET);
const salt = Number(process.env.SALT_ROUNDS);

// User Interface
export interface User {
  id?: Number;
  username: String;
  user_password: String;
  user_email: String;
  user_rank?: String;
  department?: String | null;
}

// Create User Store (to interface the DB)
export class UserStore {
  // Basic CRUD Operations
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM users"; // Defining the SQL query
      const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive users => ${err}`);
    }
  }

  async getOne(id: Number): Promise<User> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "SELECT * FROM users WHERE id=$1"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't retrive user whose id=${id} => ${err}`);
    }
  }

  async create(userInfo: User): Promise<User> {
    try {
      const newPassword = bcryptjs.hashSync(
        `${userInfo.user_password}${pepper}`,
        salt
      );
      const connection = await Client.connect(); // Opening the connection
      const sql =
        "INSERT INTO users (username, user_password, user_email) VALUES ($1, $2, $3) RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [
        userInfo.username,
        newPassword,
        userInfo.user_email,
      ]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(
        `Couldn't create default user with username=${userInfo.username} => ${err}`
      );
    }
  }

  async update(id: Number, modify: String, value: String): Promise<User> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "UPDATE users SET " + modify + "=$2 WHERE id=$1 RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [id, value]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't update user with id=${id} => ${err}`);
    }
  }

  async delete(id: Number): Promise<User> {
    try {
      const connection = await Client.connect(); // Opening the connection
      const sql = "DELETE FROM users WHERE id=$1 RETURNING *"; // Defining the SQL query
      const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
      connection.release(); // Closing the connection
      return result.rows[0]; // Returning the result
    } catch (err) {
      throw new Error(`Couldn't delete user whose id=${id} => ${err}`);
    }
  }
}

// Special Model Operations
