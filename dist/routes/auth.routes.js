"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const middleware_1 = require("../middleware");
const auth_controller_1 = require("../controllers/auth.controller");
router.post("/signUp", auth_controller_1.signUp);
router.post("/login", auth_controller_1.signIn);
router.post("/changePassword", [middleware_1.isVerifyToken], auth_controller_1.changePassword);
router.get("/forgotPassword", auth_controller_1.forgotPassword);
router.get("/resetPassword", auth_controller_1.resetPassword);
router.post("/signOut", auth_controller_1.signOut);
