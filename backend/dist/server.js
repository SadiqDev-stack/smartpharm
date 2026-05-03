import express from "express";
import { log, logger } from "./middlewares/logger.js";
const app = express();
const { PORT = 8080 } = process.env;
//middlewares 
app.use(logger);
app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: "this server is running healthy"
    });
});
app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
});
export default app;
