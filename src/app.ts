import { errors } from "celebrate";
import cors from "cors";
import express, { Request, Response } from "express";
import userRouters from "./api/users";

const app = express();
const apiPrefix = "/api/v1";

app.use(express.json());
app.use(cors());

app.use(`${apiPrefix}/users`, userRouters);

app.get("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome To BDIRS",
  });
});

app.use("*", (req: Request, res: Response) => {
  return res.status(404).send({
    message: "Not Found",
  });
});

app.use((err: Error, req: Request, res: Response) => {
  return res.status(500).send({
    message: err.message || "Internal Server Error",
  });
});

app.use(errors());

export default app;
