"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.Role = void 0;
const sequelize_1 = require("sequelize");
class Role extends sequelize_1.Model {
}
exports.Role = Role;
function Roles(sequelize) {
    return sequelize.define("role", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
}
exports.Roles = Roles;
