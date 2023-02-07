/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Project{
    id?:Number,
    title: String,
    project_lang: String,
    project_desc: String,
    department: String,
    rating: Number,
    last_mod_by: Number | null
}

export class ProjectStore {
    async index(): Promise<Project[]> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM projects"; // Defining the SQL query
          const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive projects => ${err}`);
        }
      }

      async getOne(id: Number): Promise<Project> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM projects WHERE id=$1"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive project whose id=${id} => ${err}`);
        }
      }

      async create(projectInfo: Project): Promise<Project> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "INSERT INTO projects (title, project_lang, project_desc ,department, rating, last_mod_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [projectInfo.title, projectInfo.project_lang, projectInfo.project_desc,projectInfo.department, projectInfo.rating, projectInfo.last_mod_by]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't create project with id=${projectInfo.id} => ${err}`);
        }
      }

      async update(id:Number, modify: String, value: String | Number): Promise<Project> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "UPDATE projects SET " + modify + "=$2 WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id, value]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't update project with id=${id} => ${err}`);
        }
      }

      async delete(id: Number): Promise<Project> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "DELETE FROM projects WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't delete project whose id=${id} => ${err}`);
        }
      }
}