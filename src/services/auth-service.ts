import { Op } from "sequelize";
import { sequelize } from "../config/conn";
import { Role, ROLES, User } from "../models";

export const createUser = async (
  phoneNumber: any,
  email: string,
  password: string
) => {
  try {
    let createUser = await User.create(<any>{
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    });

    return createUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findRole = async (role: any) => {
  const findRole = await Role.findAll({ where: { name: { [Op.or]: role } } });
  return findRole;
};

export const loginWithPhone = async (
  phoneNumber: any,
  encryptedPassword: any
) => {
  try {
    const loginUser = await User.findOne({
      where: {
        phoneNumber: phoneNumber,
        password: encryptedPassword,
      },
    });
    return loginUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginWithEmail = async (email: any, encryptedPassword: any) => {
  try {
    const loginUser = await User.findOne({
      where: {
        email: email,
        password: encryptedPassword,
      },
    });
    return loginUser;
  } catch (error: any) {
    throw new Error(error);
  }
};
