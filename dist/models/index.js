"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES = exports.User = exports.Role = void 0;
const conn_1 = require("../config/conn");
const role_1 = require("./role");
const user_1 = require("./user");
const syncData = process.env.syncData;
if (syncData === "true") {
    conn_1.sequelize
        .sync({ force: true, match: /a-auth/ })
        .then(() => {
        return console.log("Yes resync Data");
    })
        .catch((err) => {
        return console.log(err);
    });
}
const Role = (0, role_1.Roles)(conn_1.sequelize);
exports.Role = Role;
const User = (0, user_1.Users)(conn_1.sequelize);
exports.User = User;
const ROLES = ["user", "admin", "moderator"];
exports.ROLES = ROLES;
Role.belongsToMany(User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
    as: "users",
});
User.belongsToMany(Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
    as: "roles",
});
