"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("./db.config"));
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    port: parseInt(db_config_1.default.PORT, 10),
    dialect: db_config_1.default.dialect
});
exports.sequelize = sequelize;
sequelize.authenticate().then(() => {
    return console.log("Connection Established");
});
