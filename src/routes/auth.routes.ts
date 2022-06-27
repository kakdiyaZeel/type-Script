import express from "express";
const router = express.Router();

import { isVerifyToken } from "../middleware";
import {
  signUp,
  signIn,
  changePassword,
  forgotPassword,
  resetPassword,
  signOut,
} from "../controllers/auth.controller";

router.post("/signUp", signUp);

router.post("/login", signIn);

router.post("/changePassword", [isVerifyToken], changePassword);

router.get("/forgotPassword", forgotPassword);

router.get("/resetPassword", resetPassword);

router.post("/signOut", signOut);

export { router };
