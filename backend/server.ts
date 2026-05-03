import express from "express";
import {Request, Response} from "express";
import { log, logger } from "./middlewares/logger.js";

// importing routers 
import userRouter from '../routers/userRouter.js';
import { dbHandler } from "./middlewares/dbhandler.js";

const app = express();

const {
    PORT = 8080
} = process.env

//middlewares 
app.use(logger);
app.use(express.json());

// adding routers 
// first connect db
app.use(dbHandler);
app.use('/api/users', userRouter);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "this server is running healthy"
    })
})

app.listen(PORT, () => {
    log(`Server is running on port ${PORT}`);
})


export default app