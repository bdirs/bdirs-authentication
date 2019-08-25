import app from "./app";
import { StartUpHelper } from "./loaders";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await StartUpHelper.createAdmin();
    console.log(`Running on ${port}`);
});
