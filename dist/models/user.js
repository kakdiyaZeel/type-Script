"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function Users(sequelize) {
    return sequelize.define("user", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.BIGINT,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
}
exports.Users = Users;
