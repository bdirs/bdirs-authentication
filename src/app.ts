import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {

    return res.json({
        message: "Welcome To BDIRS",
    });
});

export default app;
