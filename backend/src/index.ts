import Express from "express";
import cors from "cors";
import userRoutes from "./handlers/user";
import ticketRoutes from "./handlers/ticket";
import projectRoutes from "./handlers/project";
import commentRoutes from "./handlers/comment";

const PORT = process.env.PORT ?? 3000;
const app = Express();

app.use(cors({ origin: "*" }));
app.use(Express.json());
app.use(Express.urlencoded());

userRoutes(app).catch(() => {
  console.log("Critical Error: User Routes are down!");
});

ticketRoutes(app).catch(() => {
  console.log("Critical Error: User Routes are down!");
});

projectRoutes(app).catch(() => {
  console.log("Critical Error: User Routes are down!");
});

commentRoutes(app).catch(() => {
  console.log("Critical Error: User Routes are down!");
});

app.listen(PORT, () => {
  console.log("Server Running On Port 3000");
});

export default app;
