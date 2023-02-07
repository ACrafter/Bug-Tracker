import Client from "../database";

export interface Comment{
    id?:Number,
    userid: Number,
    comment_date: String,
    content: String,
    likes: Number,
    projectid?: Number,
    ticketid?: Number
    parentComment?: Number
}

export class CommentStore{}