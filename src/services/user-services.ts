import { User, Role } from "../models";

export const findUser = async (id: any) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Role,
        as: "roles",
        attributes: ["name"],
      },
    ],
  });

  return user;
};

export const getUsers = async () => {
  const users = await User.findAll({
    include: [{ model: Role, as: "roles", attributes: ["name"] }],
  });

  return users;
};
