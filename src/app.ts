// tslint:disable-next-line:no-var-requires
import express, { Request, Response } from "express";
import rolesRouter from "./api/roles";
import userRouters from "./api/users";

const app = express();

app.use(express.json());

const apiPrefix = "/api/v1";
app.use(`${apiPrefix}/users`, userRouters);
app.use(`${apiPrefix}/roles`, rolesRouter);

app.use("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome To BDIRS",
  });
});
export default app;
