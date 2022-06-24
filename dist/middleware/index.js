"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCheckRole = exports.isVerifyToken = void 0;
const isVerify_1 = require("./isVerify");
const isAuth_1 = require("./isAuth");
const isVerifyToken = isVerify_1.verifyToken;
exports.isVerifyToken = isVerifyToken;
const isCheckRole = {
    isAdmin: isAuth_1.isAdmin,
    isModerator: isAuth_1.isModerator,
    isUser: isAuth_1.isUser,
};
exports.isCheckRole = isCheckRole;
