import { CommentStore } from "../../models/comment";
import { ProjectStore } from "../../models/project";
import { UserStore } from "../../models/users";


describe("Comment Model Tests", () => {
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
        let commentId: Number;
        let projectId:Number;
        let userId: Number;
        let date: Date;

        beforeAll(async () => {
            date = new Date()
            date.setHours(0,0,0,0);
            const P = new ProjectStore()
            const U = new UserStore()

            userId = (await U.create({username: "comment test user", user_password:"1234", user_email:"a@b"})).id as Number
            projectId = (await P.create({title: "comment test project", project_lang: "js", project_desc:"Projectdesc",department: "TTD", rating: 4, last_mod_by: null})).id as Number
        })

        afterAll(async () => {
            const P = new ProjectStore()
            const U = new UserStore()

            await U.delete(userId)
            await P.delete(projectId)
        })

        it("Index Method", async () => {
            const res = await C.index()
            expect(res).toEqual([])
        })

        it("Create Method", async () => {
            const res = await C.create({userid: userId, comment_date: date, content:"This is a comment",likes: 100, projectid: projectId})
            commentId = res.id as Number
            expect(res).toEqual({id: commentId, userid: userId, comment_date: date, content:"This is a comment",likes: 100, projectid: projectId, ticketid:null, parent_comment: null})
        })

        it("Show Method", async () => {
            const res = await C.getOne(commentId)
            expect(res).toEqual({id: commentId, userid: userId, comment_date: date, content:"This is a comment",likes: 100, projectid: projectId, ticketid:null, parent_comment: null})
        })

        it("Update Method", async () => {
            const res = await C.update(commentId, "content", "This is new content")
            expect(res).toEqual({id: commentId, userid: userId, comment_date: date, content:"This is new content",likes: 100, projectid: projectId, ticketid:null, parent_comment: null})
        })

        it("Delete Method", async () => {
            const res = await C.delete(commentId)
            expect(res).toEqual({id: commentId, userid: userId, comment_date: date, content:"This is new content",likes: 100, projectid: projectId, ticketid:null, parent_comment: null})
        })
    })
})