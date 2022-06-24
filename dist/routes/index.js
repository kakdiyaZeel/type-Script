"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const app = (0, express_1.default)();
exports.app = app;
app.use("/auth", auth_routes_1.router);
app.use("/user", user_routes_1.router);
