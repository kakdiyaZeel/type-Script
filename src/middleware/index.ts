import { verifyToken } from "./isVerify";
import { isAdmin, isModerator, isUser } from "./isAuth";

const isVerifyToken = verifyToken;
const isCheckRole = {
  isAdmin,
  isModerator,
  isUser,
};

export { isVerifyToken, isCheckRole };
