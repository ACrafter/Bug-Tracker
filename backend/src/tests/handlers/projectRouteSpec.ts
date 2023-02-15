import { sign } from 'jsonwebtoken';
import supertest from "supertest";
import app from "../..";
import { ProjectStore } from '../../models/project';
import { UserStore } from '../../models/users';


const request = supertest(app)
const P = new ProjectStore()
const U = new UserStore()


describe("Project Route Tests", () => {
    let pid:Number;

    beforeAll( async () => {
        const project = await P.create({
            title: "test project",
            project_lang: "js",
            project_desc: "Projectdesc",
            department: "TTD",
            rating: 4,
            last_mod_by: null,
          })
        
        pid = Number(project.id);
    })

    afterAll(async () => {
        await P.delete(pid)
    })

    describe("Normal User", () => {
        let uid:Number;
        let token:String;

        beforeAll(async () => {
            const user = await U.create({
                username: "User",
                user_password: "1234",
                user_email: "a@b",
              })
            
            uid = Number(user.id)
            token = sign(String(user.id), String(process.env.TOKEN))
        })

        afterAll(async () => {
            await U.delete(uid)
        })


        it("Index Route",async () => {
            const res = await request.get("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Route",async () => {
            const res = await request.get(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Create Route",async () => {
            const res = await request.post("/projects").set({authorization: token})
            expect(res.status).toBe(403)
        })

        it("Update Route",async () => {
            const res = await request.patch(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(403)
        })

        it("Delete Route",async () => {
            const res = await request.delete(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(403)
        })
    })

    describe("Dev User", () => {
        let uid:Number;
        let token:String;

        beforeAll(async () => {
            const user = await U.create({
                username: "User",
                user_password: "1234",
                user_email: "a@b",
              })
            
            uid = Number(user.id)
            token = sign(String(user.id), String(process.env.TOKEN))
            await U.update(uid, "user_rank", "Dev")
        })

        afterAll(async () => {
            await U.delete(uid)
        })
        
        it("Index Route",async () => {
            const res = await request.get("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Own Projects Route",async () => {
            const res = await request.get(`/projects/user/${uid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Route",async () => {
            const res = await request.get(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Create Route",async () => {
            const res = await request.post("/projects").set({authorization: token})
            expect(res.status).toBe(403)
        })

        it("Update Route",async () => {
            const res = await request.patch(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Delete Route",async () => {
            const res = await request.delete(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(403)
        })
    })

    describe("Lead User", () => {
        let uid:Number;
        let token:String;

        beforeAll(async () => {
            const user = await U.create({
                username: "Lead",
                user_password: "1234",
                user_email: "a@b",
              })
            
            uid = Number(user.id)
            token = sign(String(user.id), String(process.env.TOKEN))
            await U.update(uid, "user_rank", "Lead")
        })

        afterAll(async () => {
            await U.delete(uid)
        })
        
        it("Index Route",async () => {
            const res = await request.get("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Own Projects Route",async () => {
            const res = await request.get(`/projects/user/${uid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Route",async () => {
            const res = await request.get(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Create Route",async () => {
            const res = await request.post("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Update Route",async () => {
            const res = await request.patch(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Delete Route",async () => {
            const res = await request.delete(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(403)
        })
    })

    describe("Admin User", () => {
        let uid:Number;
        let token:String;

        beforeAll(async () => {
            const user = await U.create({
                username: "Admin",
                user_password: "1234",
                user_email: "a@b",
              })
            
            uid = Number(user.id)
            token = sign(String(user.id), String(process.env.TOKEN))
            await U.update(uid, "user_rank", "Admin")
        })

        afterAll(async () => {
            await U.delete(uid)
        })
        
        it("Index Route",async () => {
            const res = await request.get("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Own Projects Route",async () => {
            const res = await request.get(`/projects/user/${uid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Show Route",async () => {
            const res = await request.get(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Create Route",async () => {
            const res = await request.post("/projects").set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Update Route",async () => {
            const res = await request.patch(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Delete Route",async () => {
            const res = await request.delete(`/projects${pid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })
    })
})