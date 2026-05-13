// controllers/userController.js
import User from "../models/user.js";
import {
  hash,
  compareHashes,
  setCookie,
  getTokenData,
  createToken,
  sanitizeInput,
} from "../utilities/general.js";
import { log } from "../middlewares/logger.js";
import { sendMail } from "../services/mail.js";

const { ADMIN_EMAIL, LOGIN_EXPIRE } = process.env;

export const userController = {
  // Register new user
  async register(req, res, next) {
    try {
      for (const field in req.body) {
        if (!["password", 'shopDescription', "stat"].includes(field) && req.body[field])
          req.body[field] = sanitizeInput(req.body[field]);
      }


      let {
        name,
        email,
        address,
        password,
        phone,
        gender = "male",
        country = "nigeria",
        shopDescription
      } = req.body;

      if (name && name.length >= 100) {
        return res
          .status(400)
          .json({ success: false, message: "your name is too long" });
      }

      if (address && address.length >= 500) {
        return res.status(400).json({
          success: false,
          message: "your address is too long",
        });
      }

      if(!address){
        throw new req.AppError("address is invalid")
      }

      if (!name ||  !email || !email.includes("@")) {
        throw new req.AppError(
          !name ? "invalid user name" : "invalid email address",
        );
      }

      if (!phone || phone.length < 11 || typeof phone !== "string") {
        throw new req.AppError("invalid phone number");
      }

      if(
        !shopDescription ||
        !shopDescription.name ||
        !shopDescription.description ||
        !shopDescription.type
      ){
        throw new req.AppError("invalid shop description")
      }

      if(!password){
        throw new req.AppError("please provide a password")
      }

      const existing = await User.findOne({ $or: [{ email }, { phone }] });

      if (existing) {
        throw new req.AppError(
          existing.email == email
            ? "user with this email already existed"
            : "user with this phone number already existed",
        );
      }

      const hashedPassword = await hash(password);
      const user = await User.create({
        ...req.body,
        role: email == ADMIN_EMAIL ? "admin" : "user",
        password: hashedPassword,
      });

      if (!user)
        throw new req.AppError("fail to create account, check your details");

      const token = await createToken({
        _id: user._id.toString(),
        email: user.email,
      });
      req.token = token;

      sendMail({ email }, req, (sent) => {
        setCookie(res, "token", token, LOGIN_EXPIRE);
        res.status(201).json({
          success: true,
          message: `Registration Successful, ${sent ? "Wait A Bit!" : "Please Login!"}`,
          redirect: sent
            ? encodeURI(
                `/message?title=Registration Successful&description=Registration Successful, Please Check Your Email including spam folder For Verification&redirect=false`,
              )
            : false,
        });
        log(user.name + " registered an account");
      });
    } catch (er) {
      req.err = er;
      next();
    }
  },

  // Verify email or reset password
  async verify(req, res) {
    try {
      const { token = false, type = "email" } = req.query;

      if (!token) {
        return res
          .status(400)
          .redirect(
            `${req.domain}/message?title=invalid token&description=the token provided is invalid, please relogin and try again&spinner=true&redirect=/login`,
          );
      }

      try {
        const {
          email = "",
          _id = "",
          newPassword = "",
        } = await getTokenData(token);
        let user = await User.findOne({ _id });
        if (!user) throw new req.AppError("user not found");

        if (type == "email") {
          user = await User.findByIdAndUpdate(
            user._id,
            { $set: { emailVerified: true, updatedAt: Date.now() } },
            { new: true },
          );

          const destination = encodeURI(
            `${req.domain}/message?title=email verification successful&description=congratulations ${user.name}, you successfully verified your email address, now your account is ready, please wait a bit while we redirect you to your dashboard&redirect=${user.role == "user" ? "/user" : "/admin"}/dashboard`,
          );
          res.redirect(destination);
        } else if (type == "reset") {
          const hashedPassword = await hash(newPassword);
          user = await User.findByIdAndUpdate(
            user._id,
            { $set: { password: hashedPassword, updatedAt: Date.now() } },
            { new: true },
          );

          const destination = encodeURI(
            `${req.domain}/message?title=password change successful&description=congratulations ${user.name}, you successfully changed your password, please wait a bit while we redirect you to your dashboard&redirect=${user.role == "user" ? "/user" : "/admin"}/dashboard`,
          );
          res.redirect(destination);
        }
      } catch (er) {
        throw new req.AppError("Invalid Token Or Token Expired");
      }
    } catch (er) {
      log(er, "bad");
      res.redirect("/login");
    }
  },

  // Login user
  async authenticate(req, res, next) {
    try {
      const { user } = req;
      const token = await createToken({
        _id: user._id.toString(),
        email: user.email,
      });

      setCookie(res, "token", token, LOGIN_EXPIRE);

      delete user.password;
      delete user.passCode;

      if (!user.emailVerified) {
        req.token = token;
        sendMail({ email: user.email, token }, req, (sent) => {
          res.status(200).json({
            success: true,
            user,
            message: sent
              ? "logged in successfully please wait"
              : "something went wrong, please try again!",
            redirect: sent
              ? encodeURI(
                  `/message?title=Logged In Successfully&description=You successfully logged in to your account, Please Check Your Email including spam folder To Verify Your Account&redirect=false`,
                )
              : false,
          });
        });
      } else {
        delete user.password;
        delete user.passCode;
        res.status(200).json({
          success: true,
          redirect: `/${user.role}/dashboard`,
          user,
          message: "Logged In Successfully, Wait A Bit!",
        });
      }
    } catch (er) {
      req.message = "login failed try again!";
      req.err = er;
      next();
    }
  },

  // Get user profile
  async getProfile(req, res, next) {
    try {
      const { user } = req;
      delete user.password;
      delete user.passCode;
      res.status(200).json({ success: true, user });
    } catch (er) {
      req.err = er;
      console.log(er);
      next();
    }
  },

  // Get user info
  async getUserInfo(req, res, next) {
    try {
      const { user } = req;
      delete user.password;
      delete user.passCode;
      delete user.kycDetails;
      res.status(200).json({ success: true, data: { user } });
    } catch (er) {
      req.err = er;
      console.log(er);
      req.message = "something went wrong!";
      next();
    }
  },

  // Logout user
  async logout(req, res, next) {
    try {
      res.clearCookie("token");
      res
        .status(200)
        .json({ success: true, message: "you successfully logged out!" });
    } catch (er) {
      console.log(er);
      req.message = "something went wrong, try again!";
      next();
    }
  },

  // Reset password
  async resetPassword(req, res, next) {
    try {
      const { type = "email" } = req.params;
      const { email, newPassword = "", passCode = "0000" } = req.body;

      if (
        typeof email !== "string" ||
        typeof newPassword !== "string" ||
        typeof passCode !== "string"
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message: "invalid name or transaction pin!",
          });
      }

      if (!email.includes("@") || newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message:
            newPassword.length < 8
              ? "fail to reset, password is short"
              : "fail to reset, invalid email field",
        });
      }

      let query = { email };
      if (type == "info") query = { ...query, passCode };

      const user = await User.findOne(query);

      if (!user) {
        throw new req.AppError(`user with this ${type} doesnt exist`);
      }

      const token = await createToken({ email, _id: user._id, newPassword });
      sendMail(
        {
          email,
          subject: `Confirm Password Change For Smart Pharm Account`,
          title: "Confirm Password Change",
          buttonText: "Change Password",
          description: `Click on the link below to reset your password to ${newPassword.slice(0, 5) + "..."}`,
          url: `${req.domain}/api/user/verify?token=${token}&type=reset`,
        },
        req,
        (sent) => {
          res.status(sent ? 200 : 500).json({
            success: sent,
            message: sent
              ? "Successful, Please Wait!"
              : "Something Went Wrong Try Again Later!!",
            redirect: sent
              ? encodeURI(
                  `${req.domain}/message?title=Reset Success&description=we sent you a password reset link to your email, please check your email including spam folder and click on the link to reset your password&redirect=false`,
                )
              : false,
          });
        },
      );
    } catch (er) {
      req.err = er;
      next();
    }
  },

  // Update user settings
  async updateSettings(req, res, next) {
    const allowedUpdateFields = [
      "name",
      "phone",
      "passCode",
      "state",
      "address",
    ];

    try {
      const { updates, password } = req.body;
      if (typeof password !== "string")
        throw new req.AppError("invalid password");

      const isCorrect = await compareHashes(password, req.user.password);
      if (!isCorrect) throw new req.AppError("incorrect password try again!");

      for (const field in updates) {
        if (!allowedUpdateFields.includes(field)) {
          delete updates[field];
        } else {
          updates[field] = sanitizeInput(updates[field]);
        }
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: updates },
        { new: true },
      );

      delete user.password;
      delete user.passCode;
      delete user.apiKey;
      delete user.webhook;
      delete user.kycDetails;

      res.status(200).json({
        success: true,
        message: "you successfully updated your settings",
        data: { user },
      });
    } catch (er) {
      req.err = er;
      next();
    }
  },

  // Admin authorize
  async adminAuthorize(req, res, next) {
    try {
      const { token } = req.params;
      if (!token || typeof token !== "string") return res.redirect("/login");

      const userData = await getTokenData(token);
      if (!userData) {
        return res.redirect(
          decodeURI(
            `/message?title=expired token&description=the authorisation token has already expired, this happens when the confirmation email wasn't acted upon quickly, please relogin and try again&spinner=true&redirect=/login`,
          ),
        );
      }

      const { userId, isAdmin = false, keepMe = true } = userData;
      setCookie(res, "token", token, keepMe || true);
      res.redirect(
        `/${isAdmin ? "admin/dashboard/login" : "user/dashboard/login"}`,
      );
    } catch (er) {
      console.error(er);
      res.redirect("/login");
    }
  },
};
