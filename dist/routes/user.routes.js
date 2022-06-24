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
const user_controller_1 = require("../controllers/user.controller");
router.get("/All", user_controller_1.getAllUsers);
router.get("/findUser", [middleware_1.isVerifyToken], [middleware_1.isCheckRole.isUser], user_controller_1.findUserById);
router.get("/findAdmin", [middleware_1.isVerifyToken], [middleware_1.isCheckRole.isAdmin], user_controller_1.findUserById);
router.get("/findModerator", [middleware_1.isVerifyToken], [middleware_1.isCheckRole.isModerator], user_controller_1.findUserById);
