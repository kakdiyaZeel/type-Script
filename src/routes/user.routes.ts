import express from "express";
const router = express.Router();
import { isVerifyToken, isCheckRole } from "../middleware";
import { getAllUsers, findUserById } from "../controllers/user.controller";

router.get("/All", getAllUsers);

router.get("/findUser", [isVerifyToken], [isCheckRole.isUser], findUserById);

router.get("/findAdmin", [isVerifyToken], [isCheckRole.isAdmin], findUserById);

router.get(
  "/findModerator",
  [isVerifyToken],
  [isCheckRole.isModerator],
  findUserById
);

export { router };
