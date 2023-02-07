import { CommentStore } from "../../src/models/comment";



describe("Project Model Tests", () => {
    const C = new CommentStore();

    describe("CRUD Methods Existance", () => {
        // Default CRUD Operations
        it("Index Method", () => {
            expect(C.index).toBeDefined()
        })

        it("Create Method", () => {
            expect(C.create).toBeDefined()
        })

        it("Show Method", () => {
            expect(C.getOne).toBeDefined()
        })

        it("Update Method", () => {
            expect(C.update).toBeDefined()
        })

        it("Delete Method", () => {
            expect(C.delete).toBeDefined()
        })
    })

    describe("CRUD Methods Functionality", () => {
        let projectId:Number;

        it("Index Method", async () => {
            const res = await C.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await C.create({title: "test project", project_lang: "js", project_desc:"Projectdesc",department: "TTD", rating: 4, last_mod_by: null})
            projectId = res.id as Number
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
        })

        it("Show Method", async () => {
            const res = await C.getOne(projectId)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
        })

        it("Update Method", async () => {
            const res = await C.update(projectId, "rating", 6)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
        })

        it("Delete Method", async () => {
            const res = await C.delete(projectId)
            expect(res).toEqual({id: projectId, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
        })
    })
})