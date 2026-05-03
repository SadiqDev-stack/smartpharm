import { Router } from "express";
import User from "../models/user.js";
import {
    Request,
    Response,
    NextFunction
} from "express";

//import Contact from "../models/contact.js"
import {
  hash,
  compareHashes,
  setCookie,
  getCache,
  setCache,
  checkCache,
  getTokenData,
  createToken,
  generateKey,
  sanitizeInput,
} from "../utilities/helper.js";
import { log } from "../middlewares/logger.js";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { sendMail, templates } from "../services/mail.js";
const { APP_NAME, ADMIN_EMAIL, LOGIN_EXPIRE } = process.env;

const registrationController = async (req: any, res: Response, next: NextFunction) => {
  try {
    for (const field in req.body) {
      if (field !== "password" && req.body[field])
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
    } = req.body;

    if (name.length >= 100)
      return res.json({
        success: false,
        message: "your name is too long",
      });

    if (address.length >= 500)
      return res.json({
        success: false,
        message: "your address is too long",
      });

    if (!name || !email.includes("@")) {
      throw new req.AppError(
        !name ? "invalid user name" : "invalid email address",
      );
    }

    if (!phone || phone.length < 11 || typeof phone !== "string")
      throw new req.AppError("invalid phone number");

    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existing)
      throw new req.AppError(
        existing.email == email
          ? "user with this email already existed"
          : "user with this phone number already existed",
      );

    const hashedPassword = await hash(password);
    req.body.role = email == ADMIN_EMAIL ? "super" : "user";
    const user = await User.create({ ...req.body, password: hashedPassword });
    if (!user)
      throw new req.AppError("fail to create account, check your details");
    await setCache(`users:${user._id}`, user);

    const token = await createToken({
      _id: user._id.toString(),
      email: user.email,
    });
    req.token = token;

    sendMail({ email }, req, (sent: boolean) => {
      setCookie(res, "token", token, LOGIN_EXPIRE);

      res.json({
        success: true,
        message: `Registration Successful, ${sent ? "Wait A Bit!" : "Please Login!"}`,
        redirect: sent
          ? encodeURI(
              `${req.domain}/message?title=Registration Succesfull &description= Registration Succesful, Please Check Your Email  including spam folder For Verification &redirect=false`,
            )
          : false,
      });

      log(user.name + " registered an account");
    });

    // return await updateStat("success", 1, "registration")
  } catch (er) {
    req.err = er;
    next();
  }
};

const authenticationController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { user, token } = req;
    req.token = token;

    if (!user.emailVerified) {
      sendMail({ email: user.email }, req, (sent: boolean) => {
        res.json({
          success: true,
          message: sent
            ? "logged in successfully please wait"
            : "something went wrong, please try again!",
          redirect: sent
            ? encodeURI(
                `/message?title=Logged In Successfully &description=You successfully logged in to your account, Please Check Your Email including spam folder To Verify Your Account &redirect=false`,
              )
            : false,
        });
      });
    } else {
      res.json({
        success: true,
        redirect: `${req.domain}/${user.role == "user" ? "/user" : "/admin"}/dashboard.html`,
        message: "Logged In Successfully, Wait A Bit !",
      });
    }
  } catch (er) {
    req.message = "login failed try again!";
    req.err = er;
    next();
  }
};

interface verificationBody {
  token: string|boolean;
  type: "email" | "reset";
}

const accountVerificationController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { token = false, type = "email" }:verificationBody = req.query;
   

    if (!token) {
      return res.redirect("/auth.html");
    }

    try {
      const {
        email = "",
        _id = "",
        newPassword = "",
      }:any = await getTokenData(token);
      let user = await checkCache(`users:${_id}`, async () => {
        return [await User.findOne({ _id })];
      });
      if (!user) throw new req.AppError("user not found");

      if (type == "email") {
        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              emailVerified: true,
              updatedAt: Date.now(),
            },
          },
          { new: true },
        );

        await setCache(`users:${_id}`, user);
        const destination = encodeURI(
          `${req.domain}/message?title=email verification succesful&description= congratulations ${user.name}, you successfully verified your email address, now your ${APP_NAME} account is ready, please wait a bit while we redirect you to your dashboard &redirect=${user.role == "user" ? "/user" : "/admin"}/dashboard.html`,
        );
        res.redirect(destination); // make it template for message

        // send another email for introducing app

        await sendMail(
          {
            template: "message",
            title: " Overview",
            subject: "Welcome To ",
            spinner: false,
            email: user.email,
            description: `
       <div style="text-align: left">
        congratulations dear ${user.name}, welcome to  <br>
        you have successfully verufied your  account, 
        now what remain ? <hr>
        here is a guide on the   app and how to use it <br> <br>
        here is your  <a href="${url}/${user.role == "user" ? "/user" : "/admin"}/dashboard.html" > dashboard </a>
        <br>
        <h3> detailed overview of the app </h3>
         is a registered telecommunication application that allow you to purchase all your subscription services like
        data airtime electricity cable and more at cheaper prices , we are very reliable and affordable our main focus is to provide 
        a platform that allow users to subscribe at the tip of there hand very fast and reliable, kindly visit your
        <a href="${url}/${user.role == "user" ? "/user" : "/admin"}/dashboard.html" > dashboard </a> to enjoy our services smoothly
        <br> <br>
         thank you for trusting us
        </div>
       `,
          },
          req,
        );
      } else if (type == "reset") {
        const hashedPassword = await hash(newPassword);
        user = await User.findByIdAndUpdate(
          user._id,
          {
            $set: {
              password: hashedPassword,
              updatedAt: Date.now(),
            },
          },
          { new: true },
        );

        await setCache(`users:${_id}`, user);
        const destination = encodeURI(
          `${url}/message?title=password change succesfull&description= congratulations ${user.name}, you successfully changed your password, please wait a bit while we redirect you to your dashboard &redirect=${user.role == "user" ? "/user" : "/admin"}/dashboard.html`,
        );
        res.redirect(destination); // make it template for message
      }
    } catch (er) {
      throw new req.AppError("Invalid Token Or Token Expired");
    }
  } catch (er) {
    log(er, "bad");
    res.redirect("/auth.html");
  }
};

const adminAuthController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    if (!token || typeof token !== "string") return res.redirect("/index.html");
    const userData = await getTokenData(token);
    if (!userData)
      return res.redirect(
        decodeURI(
          `/message?title=expired token &description=the authorisation token has already expired, this happens when the confirmation email wasn't acted upon quickly, please relogin and try again&spinner =true &redirect=/auth.html `,
        ),
      );
    const { userId, isAdmin = false, keepMe = true } = userData;
    setCookie(res, "token", token, keepMe || true);
    res.redirect(
      `/${isAdmin ? "admin/dashboard.html" : "user/dashboard.html"}`,
    );
  } catch (er) {
    console.error(er);
    res.redirect("/index.html");
  }
};

const passwordResetController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { type = "email" } = req.params;
    const { email, newPassword = "", transactionPin = "0000" } = req.body;

    if (
      typeof email !== "string" ||
      typeof newPassword !== "string" ||
      typeof transactionPin !== "string"
    )
      throw new req.AppError("invalid name or transaction pin!");

    if (!email.includes("@") || newPassword.length < 8) {
      throw new req.AppError(
        newPassword.length < 8
          ? "fail to reset, password is short"
          : "fail to reset, invalid email field",
      );
    }

    let query = { email };
    if (type == "info") query = { ...query, transactionPin };

    const user = await User.findOne(query);

    if (!user) {
      throw new req.AppError(`user with this ${type} doesnt exist`);
    }

    const token = await createToken({ email, _id: user._id, newPassword });
    sendMail(
      {
        email,
        subject: `Confirm Password Change For  Account`,
        title: "Confirm Password Change",
        buttonText: "Change Password",
        description: `Click on the link below to reset your password to ${newPassword.slice(0, 5) + "..."}`,
        url: `${req.domain}/api/user/verify?token=${token}&type=reset`,
      },
      req,
      (sent: boolean) => {
        res.json({
          success: sent,
          message: sent
            ? "Successful, Please Wait!"
            : "Something Went Wrong Try Again Later!!",
          redirect: sent
            ? encodeURI(
                `${req.domain}/message?title=Reset Success &description= we sent you a password reset link to your email, please check your email  including spam folder and click on the link to reset your password &redirect=false`,
              )
            : false,
        });
      },
    );
  } catch (er) {
    req.err = er;
    next();
  }
};

const userInfoController = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    delete user.password;
    delete user.transactionPin;
    delete user.kycDetails;
    res.json({ success: true, data: { user } });
  } catch (er) {
    req.err = er;
    console.log(er);
    req.message = "something went wrong!";
    next();
  }
};

const logoutController = async (req: any, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.json({
      success: true,
      message: "you successfully logout!",
    });
  } catch (er) {
    console.log(er);
    req.message = "something went wrong, try again!";
    next();
  }
};

const packageUpgradeController = async (req: any, res: Response, next) => {
//   try {
//     const packages = req.config.packages;
//     const { newPackageName = false } = req.params;
//     const { _id } = req.user;

//     if (typeof newPackageName !== "string")
//       throw new req.AppError("a valid package is required!");

//     const targetPackage = packages.find(
//       (pkg) => pkg.name.toLowerCase() == newPackageName.toLowerCase(),
//     );
//     const oldPackage = packages.find((pkg) => (pkg.name = req.user.package));

//     if (!targetPackage) {
//       return res.json({
//         success: false,
//         message: "the package you request is not available",
//       });
//     }

//     const { name, price, description } = targetPackage;

//     if (newPackageName == oldPackage.name)
//       return res.json({
//         success: false,
//         message: "you cant upgrade to same package",
//       });

//     if (
//       oldPackage.discount >= targetPackage.discount ||
//       targetPackage.price >= newPackageName.price
//     )
//       return res.json({
//         success: false,
//         message: "you can't upgrade to lower packages!",
//       });

//     let transaction = await createPackageTransaction(
//       _id,
//       req.user.balance,
//       req.user.balance,
//       targetPackage,
//       "processing",
//     );
//     let user = await deductUserBalance(_id, price, "packages");

//     if (!user)
//       return res.json({
//         success: false,
//         transaction,
//         message: "insufficient balance",
//       });

//     user = await User.findByIdAndUpdate(req.user._id, {
//       $set: {
//         package: targetPackage.name,
//       },
//       $inc: {
//         notification: 1,
//         "totalSpent.package": targetPackage.price,
//       },
//     });

//     transaction = await updateTransactionStatus(
//       transaction._id,
//       "success",
//       Date.now().toString(),
//       { newBalance: user.balance },
//     );

//     res.json({
//       success: true,
//       transaction,
//       message: `you successfully upgraded your package to ${targetPackage.name}`,
//       newPackage: targetPackage,
//       newPackageName,
//     });

//     await Notification.create({
//       userId: req.user.Id,
//       title: "Package Upgrade",
//       description:
//         transaction.description ||
//         `you successfully upgraded your package to ${targetPackage.name}, ${targetPackage.description}`,
//       type: "normal",
//       from: "system",
//       data: transaction,
//     });

//     await updateStat("success", "purchase", transaction.meta);
//   } catch (er) {
//     req.err = er;
//     next();
//   }
};

const dashboardController = async (req: any, res: Response, next) => {
  try {
  } catch (er) {
    req.er = er;
    console.log(er);
    next();
  }
};

const allowedUpdateFields = [
  "name",
  "phone",
  "transactionPin",
  "state",
  "address",
];

const settingsController = async (req: any, res: Response, next) => {
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
      {
        $set: updates,
      },
      { new: true },
    );

    res.json({
      success: true,
      message: "you successfully updated your settings",
      data: {
        user,
      },
    });
  } catch (er) {
    req.err = er;
    next();
  }
};

export {
  registrationController,
  accountVerificationController,
  authenticationController,
  adminAuthController,
  passwordResetController,
  userInfoController,
  logoutController,
  packageUpgradeController,
  dashboardController,
  settingsController,
};
