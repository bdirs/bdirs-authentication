import app from "./app";
import { StartUpHelper } from "./loaders";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await StartUpHelper.createAdmin();
    // tslint:disable-next-line:no-console
    console.log(`Running on ${port}`);
});
