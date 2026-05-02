import express from "express";
import {Request, Response} from "express";
const app = express();

const {
    PORT = 8080
} = process.env

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: "this server is running healthy"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})