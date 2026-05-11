// for jwt
// i use this my code mostly from previous code it help me build faster
import jwt from "jsonwebtoken";
import crypto from "bcryptjs";
import mailer from "nodemailer";
import User from "../models/user.js";
import fs from "fs/promises";
import path from "path";
import { log } from "../middlewares/logger.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import { AppError } from "../middlewares/logger.js";
import rateLimit from "express-rate-limit";

const {
  ENV_TYPE = "development",
  UPSTASH_REDIS_REST_URL,
  APP_ID,
  APP_NAME,
  UPSTASH_REDIS_REST_TOKEN,
  HASH_KEY,
  HASH_ROUNDS,
  SENDER_MAIL,
  MAIL_APP_KEY,
  TOKEN_EXPIRE_TIME,
} = process.env;
const CACHE_EXPIRE_TIME = Number(process.env.CACHE_EXPIRE_TIME || 3600);

// for json web token
const createToken = (data, expiresIn = false) => {
  return expiresIn
    ? jwt.sign(data, HASH_KEY, { expiresIn })
    : jwt.sign(data, HASH_KEY);
};

const getTokenData = (token) => {
  return !token ? new Error() : jwt.verify(token, HASH_KEY);
};

// for cypto
const hash = (data) => crypto.hashSync(data, HASH_KEY, parseInt(HASH_ROUNDS));
const compareHashes = crypto.compareSync;
const randomHash = (HASH_ROUNDS) => crypto.genSalt(parseInt(HASH_ROUNDS));

const composeMail = async (req, receiver, subject, body, other = {}) => {
  const options = {
    subject,
    from: SENDER_MAIL,
    to: receiver,
    html: body,
    ...other,
  };

  // for nodemailer
  const config = {
    port: 587,
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: SENDER_MAIL,
      pass: MAIL_APP_KEY,
    },
  };

  const transporter = mailer.createTransport(config);

  const sent = await transporter.sendMail(options);
  return sent ? true : false;
};

// fs for adding and retrieving files
const readFile = (url, callback) => {
  return fs.readFile(url);
};

function writeFile(path, buffer) {
  return fs.writeFile(path, buffer);
}

const deleteFile = (url, callback) => {
  return fs.unlink(url);
};

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// helper for managing files to upload folder
const getFileData = (file) => {
  const { mimetype, buffer, size } = file;
  const ext = mimetype.split("/")[1];

  return {
    type: mimetype,
    size,
    ext,
    buffer,
  };
};

const uploadFile = async (file, folder) => {
  const { type, size, ext, buffer } = getFileData(file);

  const fileName = `${new ObjectId().toString()}.${ext}`;
  console.log(fileName);
  const savePath = path.join(__dirname, "uploads", folder, fileName); // adjust to your structure
  await fs.writeFile(savePath, buffer);

  return {
    name: fileName,
    type,
    size,
    url: `uploads/${folder}/${fileName}`,
  };
};

const rewriteFile = async (file, location) => {
  const { type, buffer, size, ext } = getFileData(file);
  const savePath = path.join(__dirname, location); // adjust to your structure
  await fs.writeFile(savePath, buffer);
  return {
    name: location,
    type,
    size,
    url: location,
  };
};

process.__dirname = __dirname;

const generateKey = () => "sadiqsharp_" + new ObjectId().toString();

const { NODE_ENV = "development" } = process.env;

const cookieConfig = {
  httpOnly: NODE_ENV === "production" ? true : false,
  sameSite: NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  secure: NODE_ENV === "production" ? true : false,
};

const setCookie = (
  res,
  key = "key",
  value = "value",
  expiresInMs = 1000 * 60 * 60,
) => {
  res.cookie(key, value, cookieConfig);
};

// for input and data
const specialChars = "{}|$[]<>()!?;:*\'\"&`/\\";

function sanitizeInput(input) {
  if (typeof input !== "string") throw new AppError("invalid input data");
  let sanitizedInput = "";
  for (const char of input) {
    if (!specialChars.includes(char)) sanitizedInput += char;
  }
  return sanitizedInput;
}

const useLimiter = (timeString, max, handler = null) => {
  // Convert human-readable time to milliseconds
  const getTimeMs = (timeStr) => {
    const units = {
      s: 1000, // seconds
      m: 60 * 1000, // minutes
      h: 60 * 60 * 1000, // hours
      d: 24 * 60 * 60 * 1000, // days
      w: 7 * 24 * 60 * 60 * 1000, // weeks
    };

    const unit = timeStr.slice(-1);
    const value = parseInt(timeStr.slice(0, -1));

    return value * (units[unit] || 1000); // default to seconds
  };

  const windowMs = getTimeMs(timeString);

  const limiter = rateLimit({
    windowMs: windowMs,
    max: max,
    handler:
      handler ||
      ((req, res) => {
        if (req.method !== "GET" && req.path.includes("/api/")) {
          res.status(429).json({
            success: false,
            message: `Too many requests, please try again in ${timeString}.`,
          });
        } else {
          res.redirect(
            `/message?description=too%20many%20request%20please%20try%20again%20later!%20in%20${timeString}&spinner=false&redirect=false`,
          );
        }
      }),
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: function (req) {
      return req.headers["x-real-ip"];
    },
  });

  return limiter;
};

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateUniqueId = prefix => {
  return `${prefix}${Date.now()}`
}

export {
  createToken,
  getTokenData,
  hash,
  compareHashes,
  composeMail,
  randomHash,
  readFile,
  writeFile,
  deleteFile,
  __dirname,
  path,
  uploadFile,
  rewriteFile,
  generateKey,
  setCookie,
  sanitizeInput,
  useLimiter,
  random,
  generateUniqueId
};
