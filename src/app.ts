// tslint:disable-next-line:no-var-requires
require("dotenv").config();
import * as Sentry from "@sentry/node";
import express, { Request, Response } from "express";

import routes from './api';
import userRouters from './api/users';

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://5ed302e0f47d4935ad60ce898f3ff79a@sentry.io/1521028",
});
}

// routes(app);
const apiV = '/api/v1';
app.use(`${apiV}/auth`, userRouters);

app.use("/", (req: Request, res: Response) => {
  return res.json({
    message: "Welcome To BDIRS",
  });
});

export default app;
