import express, { Request, Response } from "express";
import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());

Sentry.init({
    dsn: "https://5ed302e0f47d4935ad60ce898f3ff79a@sentry.io/1521028"
});

app.use("/", (req: Request, res: Response) => {

    return res.json({
        message: "Welcome To BDIRS",
    });
});

export default app;
