import { Router } from "express";
import User from "../models/user.js";
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
} from "../utilities/general.js";
import { log } from "../middlewares/logger.js";
import authenticate from "../middlewares/authentication.js";
import authorize from "../middlewares/authorization.js";
import { sendMail, templates } from "../services/mail.js";
import {
  accountVerificationController,
  adminAuthController,
  authenticationController,
  dashboardController,
  logoutController,
  packageUpgradeController,
  passwordResetController,
  registrationController,
  settingsController,
  userInfoController,
} from "../controllers/user.js";
const { APP_NAME, ADMIN_EMAIL, LOGIN_EXPIRE } = process.env;

const app = Router();

// for account registration
// fix request app error
app.post("/register", registrationController);
// for account confirmation in
app.get("/verify", accountVerificationController);
// for login user
app.post("/authenticate", authenticate, authenticationController);
// admin auth controller
app.get("/admin/authorize/:token", adminAuthController);
// for reseting password , send reset link
app.post("/reset/:type", passwordResetController);
// setting & info
app.get("/info", authorize, userInfoController);
// logout
app.put("/logout", logoutController);
// getting dashboard
app.get("/dashboard", authorize, dashboardController);
// for packages
app.put(
  "/package/upgrade/:newPackageName",
  authorize,
  packageUpgradeController,
);
// user setting
app.put("/setting", authorize, settingsController);

export default app;
