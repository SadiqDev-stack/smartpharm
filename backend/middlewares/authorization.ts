
import { NextFunction , Response } from "express";
import { getTokenData } from "../utilities/helper.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export default async (req: any, res: Response, next: NextFunction) => {
    try {
        const { token } = req.headers;
        
        if (!token) {
            throw new Error();
        }
        
        const userData:any = await getTokenData(token);
        if(!userData){
            throw new Error()
        }
        
        
        userData.id = new ObjectId(userData.id);
        req.user = userData;
        req.user._id = userData.id.toString()
        
        next();
    } catch (er: any) {
        res.redirect("/login.html");
    }
};
