// for jwt
import jwt from "jsonwebtoken";
import crypto from "bcryptjs";
import mailer from "nodemailer";
// import { mailTemplate , messageTemplate} from "./templates.js";
// import User from "./models/user.js";
import fs from "fs/promises";
import path from "path";
// import Redis from "redis";
import {log} from "../middlewares/logger.js"
// import compressor from "lz-string";
import multer from "multer";
import mongoose from "mongoose"
const ObjectId = mongoose.Types.ObjectId

const { HASH_KEY, HASH_ROUNDS, SENDER_MAIL, MAIL_APP_KEY, TOKEN_EXPIRE_TIME, CACHE_EXPIRE_TIME } =
    process.env;

// for json web token
const createToken = (data: any, expiresIn: any = false) => {
    return expiresIn
        ? jwt.sign(data, HASH_KEY || '', { expiresIn })
        : jwt.sign(data, HASH_KEY || '');
};

const getTokenData = (token: string) => {
    return !token ? new Error() : jwt.verify(token, HASH_KEY || '');
}

// for cypto
const hash = (data: string) => crypto.hashSync(data, parseInt(HASH_ROUNDS || '10'));
const compareHashes = crypto.compareSync;
const randomHash = (rounds: string) => crypto.genSalt(parseInt(rounds || '10'));

// for nodemailer
const config = {
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: SENDER_MAIL,
        pass: MAIL_APP_KEY
    }
};

const transporter = mailer.createTransport(config);
const sendMail = (receiver: string, subject: string, body: string) => {
    const options = {
        subject,
        from: SENDER_MAIL,
        to: receiver,
        html: body
    };

    return transporter.sendMail(options);
};

// for confirmation

const sendMailConfirmation = async (email: string, req: any, callback: any, title: string = "Snet Email Confirmation", 
buttonText: string = "Confirm Account", description: string = "Please Click On The Link Below To Confirm Your Account", url: string = '') => {
    try {
        let confirmToken;
        if(!url) confirmToken = await createToken(
            {
                email
            },
            TOKEN_EXPIRE_TIME || '24h'
        );
        
        url = !url ? `${req.protocol}://${req.domain}/api/user/verify?token=${confirmToken}` : url;
        console.log(url)
        
        // const body = mailTemplate(url, title, buttonText, description)
        // await sendMail(email, title, body);
        if (callback) callback(true);
    } catch (er: any) {
        log(String(er), "bad");
        if (callback) callback(false);
    }
};

// fs for adding and retrieving files
const readFile = (url: string, callback?: any) => {
    return fs.readFile(url)
};

function writeFile(path: string, buffer: any) {
    return fs.writeFile(path, buffer)
}

const deleteFile = (url: string, callback?: any) => {
    return fs.unlink(url)
};

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// helper for managing files to upload folder 
const getFileData = (file: any) => {
    const { mimetype, buffer, size } = file;
    const ext = mimetype.split("/")[1];
    
    return {
        type: mimetype, 
        size, 
        ext,
        buffer
    }
}

const uploadFile = async (file: any, folder: string) => {
const {type, size, ext, buffer} = getFileData(file);

const fileName = `${new ObjectId().toString()}.${ext}`;
    console.log(fileName)
    const savePath = path.join(__dirname, "uploads", folder, fileName); // adjust to your structure
    await fs.writeFile(savePath, buffer);

    return {
    name: fileName,
    type,
    size,
    url: `uploads/${folder}/${fileName}`
    }
}

const rewriteFile = async (file: any, location: string) => {
    const {type, buffer, size, ext} = getFileData(file);
    const savePath = path.join(__dirname, location); // adjust to your structure
    await fs.writeFile(savePath, buffer);
    return {
    name: location,
    type,
    size,
    url: location
    }
}

// const cacheMem = Redis.createClient();
const cacheMem: any = {};

const setCache = (key: string, data: any, expiring: any = true) => {
    return true // for testing without redis, just return true to always set cache and get fresh data
    const serializedData = JSON.stringify(data);
    if (expiring === true) {
        return cacheMem.set(key, serializedData, {
            EX: CACHE_EXPIRE_TIME,
        });
    } else if (typeof expiring === "number") {
        return cacheMem.set(key, serializedData, {
            EX: expiring
        });
    } else {
        return cacheMem.set(key, serializedData);
    }
    
    log("cache added/updated: " + expiring, "warning")
};

const getCache = (key: string) => {
    return false // for testing without redis, just return false to always miss cache and get fresh data
    return new Promise((res: any, rej: any) => {
        cacheMem.get(key)
            .then((data: any) => {
                try {
                    res(JSON.parse(data));
                } catch (err) {
                    res(data);
                }
                if(data) log("cache hitted!!")
            })
            .catch((err: any) =>{
            log("cache missed!!!", "bad")
            rej(err)
            })
    });
};

const checkCache = async (key: string, notFoundCb?: any) => {
    // for testing without redis, just return the result of notFoundCb to always miss cache and get fresh data
    const [freshData, expiring = false] = notFoundCb ? await notFoundCb() : [];
    return freshData || false;
    try {
        const data = await getCache(key);
        if (data){
            return data;
        }
        
        if(!notFoundCb) return
        const [freshData, expiring = false] = await notFoundCb();
        await setCache(key, freshData, expiring);
        
        return freshData;
    } catch (err) {
        throw err;
    }
};

// for compressing and decompressing data 
// const compressData = compressor.compress;
// const decompressData = compressor.decompress
const compressData = (data: any) => data;
const decompressData = (data: any) => data;

async function restoreDoc(doc: any, model: any) {
    /*if (!doc) return null;
    if (doc instanceof model) return doc; */
    /*
    const restoredDoc = model.hydrate(doc);
    restoredDoc.$__.wasPopulated = true;
    restoredDoc.isNew = false; // or restoredDoc.markNotNew() doesn't exist but we can manually set isNew to false
    return restoredDoc*/
    return !doc ? false : model.wrapDoc(doc, model)
}

// to tell user something and redirect eg in email confirmation if confirmed
const sendMessage = (res: any, message: string, redirect: string, img: string = "/images/success.png") => {
    // res.send(messageTemplate(message, redirect, img))
    res.send({message, redirect, img})
}

/* for.multer upload files */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});


(process as any).__dirname = __dirname

const generateUniqueId = (prefix = "") => {
    return `${prefix}_${Date.now()}`
}

// for socket io 

export {
    createToken,
    getTokenData,
    hash,
    compareHashes,
    sendMail,
    randomHash,
    sendMailConfirmation,
    readFile,
    writeFile,
    deleteFile,
    __dirname,
    path,
    cacheMem,
    checkCache,
    compressData,
    decompressData,
    getCache,
    setCache,
    restoreDoc,
    sendMessage,
    upload,
    uploadFile,
    rewriteFile,
    generateUniqueId
};
