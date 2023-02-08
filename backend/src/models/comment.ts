/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Client from "../database";

export interface Comment{
    id?:Number,
    userid: Number,
    comment_date: Date,
    content: String,
    likes: Number,
    projectid?: Number | null,
    ticketid?: Number | null,
    parent_comment?: Number | null
}

export class CommentStore{
    async index(): Promise<Comment[]> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM comments"; // Defining the SQL query
          const result = await connection.query(sql); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive comments => ${err}`);
        }
      }
    
      async getOne(id: Number): Promise<Comment> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "SELECT * FROM comments WHERE id=$1"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't retrive comment whose id=${id} => ${err}`);
        }
      }
    
      async create(commentInfo: Comment): Promise<Comment> {
        try {
          const connection = await Client.connect(); // Opening the connection
            if(commentInfo.projectid !== undefined){ // if the comment is on a project 
            const sql =
                "INSERT INTO comments (userid, comment_date, content , likes, projectid) VALUES ($1, $2, $3, $4, $5) RETURNING *"; // Defining the SQL query
                const result = await connection.query(sql, [
                    commentInfo.userid,
                    commentInfo.comment_date,
                    commentInfo.content,
                    commentInfo.likes,
                    commentInfo.projectid,
                ]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            } else if(commentInfo.ticketid !== undefined) {
                const sql =
                "INSERT INTO comments (userid, comment_date, content , likes, ticketid) VALUES ($1, $2, $3, $4, $5) RETURNING *"; // Defining the SQL query
                const result = await connection.query(sql, [
                    commentInfo.userid,
                    commentInfo.comment_date,
                    commentInfo.content,
                    commentInfo.likes,
                    commentInfo.ticketid,
                    commentInfo.parent_comment,
                ]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            } else {
                const sql =
                "INSERT INTO comments (userid, comment_date, content , likes, parent_comment) VALUES ($1, $2, $3, $4, $5) RETURNING *"; // Defining the SQL query
                const result = await connection.query(sql, [
                    commentInfo.userid,
                    commentInfo.comment_date,
                    commentInfo.content,
                    commentInfo.likes,
                    commentInfo.parent_comment,
                ]); // Running the SQL query on the DB & storing the result
                connection.release(); // Closing the connection
                return result.rows[0]; // Returning the result
            }

        } catch (err) {
          throw new Error(
            `Couldn't create comment with title=${commentInfo.userid} and date ${commentInfo.comment_date} => ${err}`
          );
        }
      }
    
      async update(
        id: Number,
        modify: String,
        value: String | Number
      ): Promise<Comment> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql =
            "UPDATE comments SET " + modify + "=$2 WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id, value]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't update comment with id=${id} => ${err}`);
        }
      }
    
      async delete(id: Number): Promise<Comment> {
        try {
          const connection = await Client.connect(); // Opening the connection
          const sql = "DELETE FROM comments WHERE id=$1 RETURNING *"; // Defining the SQL query
          const result = await connection.query(sql, [id]); // Running the SQL query on the DB & storing the result
          connection.release(); // Closing the connection
          return result.rows[0]; // Returning the result
        } catch (err) {
          throw new Error(`Couldn't delete project whose id=${id} => ${err}`);
        }
      }
}