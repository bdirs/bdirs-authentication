import app from "./app";
import { PORT } from "./config";
import { StartUpHelper } from "./loaders";

const port = PORT || 4000;
app.listen(port, async () => {
    await StartUpHelper.createAdmin();
    // TODO improve on this functionality
    // StartUpHelper.loadSentry();
    StartUpHelper.loadEvents();
    console.log(`Running on ${port}`);
});
