import { Response, Request } from 'express';

import  app from './app';

const port = process.env.PORT || 3000;

app.use('/', (req: Request, res: Response) => {

    return res.json({
        message: 'Welcome To BDIRS'
    })
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
