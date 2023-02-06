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
        it("Index Method", async () => {
            const res = await U.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await U.create({id: 1})
            expect(res).toEqual({id: 1, user_rank: "Other", department: null})
        })

        it("Show Method", async () => {
            const res = await U.getOne("1")
            expect(res).toEqual({id: 1, user_rank: "Other", department: null})
        })

        it("Update Method", async () => {
            const res = await U.update("1", "user_rank", "Admin")
            expect(res).toEqual({id: 1, user_rank: "Admin", department: null})
        })

        it("Delete Method", async () => {
            const res = await U.delete("1")
            expect(res).toEqual({id: 1, user_rank: "Admin", department: null})
        })
    })
})