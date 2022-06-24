"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_HOST, USER, PASSWORD, DATABASE, DB_PORT } = process.env;
exports.default = {
    HOST: DB_HOST,
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DATABASE,
    dialect: 'mysql',
    PORT: DB_PORT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
