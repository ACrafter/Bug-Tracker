import { ProjectStore } from './../../src/models/project';

describe("Project Model Tests", () => {
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
        let projectId:Number;

        it("Index Method", async () => {
            const res = await P.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await P.create({title: "test project", project_lang: "js", project_desc:"Projectdesc",department: "TTD", rating: 4, last_mod_by: null})
            projectId = res.id as Number
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
        })

        it("Show Method", async () => {
            const res = await P.getOne(projectId)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
        })

        it("Update Method", async () => {
            const res = await P.update(projectId, "rating", 6)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
        })

        it("Delete Method", async () => {
            const res = await P.delete(projectId)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
        })
    })
})