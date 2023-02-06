import Client from "../database";

export interface Project{
    id:Number,
    title: String,
    project_lang: String,
    department: String,
    rating: Number,
    last_mod_by: Number | null
}

export class ProjectStore {}