// tslint:disable-next-line:no-var-requires
import cors from "cors";
import express, { Request, Response } from "express";
import userRouters from "./api/users";

const app = express();
const apiPrefix = "/api/v1";

app.use(express.json());
app.use(cors());

app.use(`${apiPrefix}/users`, userRouters);

app.use("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome To BDIRS",
  });
});
export default app;
