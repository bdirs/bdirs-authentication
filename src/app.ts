// tslint:disable-next-line:no-var-requires
import cors from "cors";
import express, { Request, Response } from "express";
import rolesRouter from "./api/roles";
import userRouters from "./api/users";

const app = express();
const apiPrefix = "/api/v1";

app.use(express.json());
app.use(cors());

app.use(`${apiPrefix}/users`, userRouters);
app.use(`${apiPrefix}/roles`, rolesRouter);

app.use("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome To BDIRS",
  });
});
export default app;
