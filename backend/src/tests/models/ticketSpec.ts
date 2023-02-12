import { ProjectStore } from "../../models/project";
import { TicketStore } from "../../models/ticket";

describe("Ticket Model Tests", () => {
  const P = new TicketStore();

  describe("CRUD Methods Existance", () => {
    // Default CRUD Operations
    it("Index Method", () => {
      expect(P.index).toBeDefined();
    });

    it("Create Method", () => {
      expect(P.create).toBeDefined();
    });

    it("Show Method", () => {
      expect(P.getOne).toBeDefined();
    });

    it("Update Method", () => {
      expect(P.update).toBeDefined();
    });

    it("Delete Method", () => {
      expect(P.delete).toBeDefined();
    });
  });

  describe("CRUD Methods Functionality", () => {
    let projectId: Number;
    let ticketId: Number;

    beforeAll(async () => {
      const P = new ProjectStore();
      const project = await P.create({
        title: "ticket test project",
        project_lang: "js",
        project_desc: "Projectdesc",
        department: "TTD",
        rating: 4,
        last_mod_by: null,
      });
      projectId = project.id as Number;
    });

    afterAll(async () => {
      const P = new ProjectStore();
      await P.delete(projectId);
    });

    it("Index Method", async () => {
      const res = await P.index();
      expect(res).toEqual([]);
    });

    it("Create Method", async () => {
      const res = await P.create({
        title: "test ticket",
        ticket_type: "new feature",
        ticket_description: "ticketDesc",
        projectid: projectId,
      });
      ticketId = res.id as Number;
      expect(res).toEqual({
        id: ticketId,
        title: "test ticket",
        ticket_type: "new feature",
        ticket_description: "ticketDesc",
        projectid: projectId,
        ticket_status: "Open",
        last_check: null,
      });
    });

    it("Show Method", async () => {
      const res = await P.getOne(ticketId);
      expect(res).toEqual({
        id: ticketId,
        title: "test ticket",
        ticket_type: "new feature",
        ticket_description: "ticketDesc",
        projectid: projectId,
        ticket_status: "Open",
        last_check: null,
      });
    });

    it("Update Method", async () => {
      const res = await P.update(ticketId, "ticket_status", "Closed");
      expect(res).toEqual({
        id: ticketId,
        title: "test ticket",
        ticket_type: "new feature",
        ticket_description: "ticketDesc",
        projectid: projectId,
        ticket_status: "Closed",
        last_check: null,
      });
    });

    it("Delete Method", async () => {
      const res = await P.delete(ticketId);
      expect(res).toEqual({
        id: ticketId,
        title: "test ticket",
        ticket_type: "new feature",
        ticket_description: "ticketDesc",
        projectid: projectId,
        ticket_status: "Closed",
        last_check: null,
      });
    });
  });
});
