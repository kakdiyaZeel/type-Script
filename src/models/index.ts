import { sequelize } from "../config/conn";

import { Roles } from "./role";
import { Users } from "./user";

const syncData = process.env.syncData;

if (syncData === "true") {
  sequelize
    .sync({ alter: true, match: /a-auth/ })
    .then(() => {
      return console.log("Yes resync Data");
    })
    .catch((err) => {
      return console.log(err);
    });
}

const Role = Roles(sequelize);
const User = Users(sequelize);
const ROLES = ["user", "admin", "moderator"];

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

export { Role, User, ROLES };
