import Express from "express";
import cors from "cors";

const PORT = process.env.PORT ?? 3000;
const app = Express();

app.use(cors({origin: '*',}));
app.use(Express.json());
app.use(Express.urlencoded());

app.listen(PORT, () => {
    console.log("Server Running On Port 3000");
  });
  
export default app;