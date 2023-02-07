// import { TicketStore } from "../../src/models/ticket";


// describe("Ticket Model Tests", () => {
//     const P = new TicketStore();

//     describe("CRUD Methods Existance", () => {
//         // Default CRUD Operations
//         it("Index Method", () => {
//             expect(P.index).toBeDefined()
//         })

//         it("Create Method", () => {
//             expect(P.create).toBeDefined()
//         })

//         it("Show Method", () => {
//             expect(P.getOne).toBeDefined()
//         })

//         it("Update Method", () => {
//             expect(P.update).toBeDefined()
//         })

//         it("Delete Method", () => {
//             expect(P.delete).toBeDefined()
//         })
//     })

//     describe("CRUD Methods Functionality", () => {
//         it("Index Method", async () => {
//             const res = await P.index()
//             expect(res).toEqual([])
//         })

//         it("Create Method", async () => {
//             const res = await P.create({id: 1, title: "test project", project_lang: "js", project_desc:"Projectdesc",department: "TTD", rating: 4, last_mod_by: null})
//             expect(res).toEqual({id: 1, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
//         })

//         it("Show Method", async () => {
//             const res = await P.getOne("1")
//             expect(res).toEqual({id: 1, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 4, last_mod_by: null})
//         })

//         it("Update Method", async () => {
//             const res = await P.update("1", "rating", 6)
//             expect(res).toEqual({id: 1, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
//         })

//         it("Delete Method", async () => {
//             const res = await P.delete("1")
//             expect(res).toEqual({id: 1, title: "test project", project_lang: "js", project_desc:"Projectdesc", department: "TTD", rating: 6, last_mod_by: null})
//         })
//     })
// })