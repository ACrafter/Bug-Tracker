import { UserStore } from "../../src/models/users"

describe("User Model Tests", () => {
    const U = new UserStore();

    describe("CRUD Methods Existance", () => {
        // Default CRUD Operations
        it("Index Method", () => {
            expect(U.index).toBeDefined()
        })

        it("Create Method", () => {
            expect(U.create).toBeDefined()
        })

        it("Show Method", () => {
            expect(U.getOne).toBeDefined()
        })

        it("Update Method", () => {
            expect(U.update).toBeDefined()
        })

        it("Delete Method", () => {
            expect(U.delete).toBeDefined()
        })
    })

    describe("CRUD Methods Functionality", () => {
        let userId: Number;
        let userPass: String;
        it("Index Method", async () => {
            const res = await U.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await U.create({username: "A", user_password:"1234", user_email:"a@b"})
            userId = res.id as Number;
            userPass = res.user_password;
            expect(res).toEqual({id: userId, username: "A", user_password:userPass, user_email:"a@b", user_rank: "Other", department: null})
        })

        it("Show Method", async () => {
            const res = await U.getOne(userId)
            expect(res).toEqual({id: userId, username: "A", user_password:userPass, user_email:"a@b", user_rank: "Other", department: null})
        })

        it("Update Method", async () => {
            const res = await U.update(userId, "user_rank", "Admin")
            expect(res).toEqual({id: userId, username: "A", user_password:userPass, user_email:"a@b", user_rank: "Admin", department: null})
        })

        it("Delete Method", async () => {
            const res = await U.delete(userId)
            expect(res).toEqual({id: userId, username: "A", user_password:userPass, user_email:"a@b", user_rank: "Admin", department: null})
        })
    })
})