"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const auth_controller_1 = require("../controllers/auth.controller");
router.post("/signUp", auth_controller_1.signUp);
router.post("/login", auth_controller_1.signIn);