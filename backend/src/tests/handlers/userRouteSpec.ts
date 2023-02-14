import { sign } from 'jsonwebtoken';
import supertest from "supertest";
import app from "../..";
import { UserStore } from "../../models/users";


const request = supertest(app)

describe("User Routes", () => {
    let uid:Number;
    let token:String;

    beforeAll( async () => {
        const U = new UserStore();
        const user = await U.create({
            username: "A",
            user_password: "1234",
            user_email: "a@b",
          });
        
        token = sign(String(user.id), String(process.env.TOKEN))
        uid = user.id as Number;
    })

    describe("Signed Out User", () => {
        it("Index Route",async () => {
            const res = await request.get("/users")
            expect(res.status).toBe(401)
        })
    
        it("Show Route",async () => {
            const res = await request.get(`/users/3`)
            expect(res.status).toBe(200)
        })
    
        it("Update Route",async () => {
            const res = await request.patch(`/users/${uid.toString()}`)
            expect(res.status).toBe(401)
        })
    
        it("Delete Route",async () => {
            const res = await request.delete(`/users/${uid.toString()}`)
            expect(res.status).toBe(401)
        })
    })

    describe("Signed In User", () => {
        it("Index Route",async () => {
            const res = await request.get("/users").set({authorization: token})
            expect(res.status).toBe(403)
        })
    
        it("Show Any User",async () => {
            const res = await request.get(`/users/3`).set({authorization: token})
            expect(res.status).toBe(200)
        })
    
        it("Update MyUser",async () => {
            const res = await request.patch(`/users/${uid.toString()}`).set({authorization: token}).send({prop:"username", value:"B"})
            expect(res.status).toBe(200)
        })

        it("Update Another User",async () => {
            const res = await request.patch(`/users/3`).set({authorization: token})
            expect(res.status).toBe(403)
        })
    
        it("Delete MyUser",async () => {
            const res = await request.delete(`/users/${uid.toString()}`).set({authorization: token})
            expect(res.status).toBe(200)
        })

        it("Delete Another User",async () => {
            const res = await request.delete(`/users/3`).set({authorization: token})
            expect(res.status).toBe(403)
        })
    })
})

describe("Admin Account", () => {
    let uid:Number, token:String;
    beforeAll( async () => {
        const U = new UserStore();
        const user = await U.create({
            username: "A",
            user_password: "1234",
            user_email: "a@b",
          });
        
        token = sign(String(user.id), String(process.env.TOKEN))
        uid = user.id as Number;
    })

    afterAll(async () => {
        const U = new UserStore();
        await U.delete(uid)
    })

    it("Index Route",async () => {
       await request.patch(`/users/${uid.toString()}`).set({authorization: token}).send({prop:"user_rank", value:"Admin"})
       const res = await request.get('/users').set({authorization: token})
       expect(res.status).toBe(200)
    })
})