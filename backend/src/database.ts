import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { HOST, DB, TESTDB, USER, PASS, ENV } = process.env;

let Client: any;

if (ENV === "test") {
  Client = new Pool({
    host: HOST,
    database: TESTDB,
    user: USER,
    password: PASS,
  });
} else {
  Client = new Pool({
    host: HOST,
    database: DB,
    user: USER,
    password: PASS,
  });
}

export default Client;
