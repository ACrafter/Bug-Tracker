import { ProjectStore } from './../../src/models/project';

describe("User Model Tests", () => {
    const P = new ProjectStore();

    describe("CRUD Methods Existance", () => {
        // Default CRUD Operations
        it("Index Method", () => {
            expect(P.index).toBeDefined()
        })

        it("Create Method", () => {
            expect(P.create).toBeDefined()
        })

        it("Show Method", () => {
            expect(P.getOne).toBeDefined()
        })

        it("Update Method", () => {
            expect(P.update).toBeDefined()
        })

        it("Delete Method", () => {
            expect(P.delete).toBeDefined()
        })
    })

    describe("CRUD Methods Functionality", () => {
        it("Index Method", async () => {
            const res = await P.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await P.create({id: 1})
            expect(res).toEqual({id: 1, user_rank: "Other", department: null})
        })

        it("Show Method", async () => {
            const res = await P.getOne("1")
            expect(res).toEqual({id: 1, user_rank: "Other", department: null})
        })

        it("Update Method", async () => {
            const res = await P.update("1", "user_rank", "Admin")
            expect(res).toEqual({id: 1, user_rank: "Admin", department: null})
        })

        it("Delete Method", async () => {
            const res = await P.delete("1")
            expect(res).toEqual({id: 1, user_rank: "Admin", department: null})
        })
    })
})