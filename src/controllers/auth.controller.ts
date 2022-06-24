import { User, Role } from "../models";
import { Request, Response } from "express";
import {
  createUser,
  findRole,
  loginWithEmail,
  loginWithPhone,
} from "../services/auth-service";
import { response } from "../common";
import md5 from "md5";
import { Op } from "sequelize";
import { token } from "../auth";

export const signUp = async (req: Request, res: Response) => {
  try {
    let { phoneNumber, email, password, role } = req.body;

    const salt = <any>md5(<any>10);
    password = md5(password, salt);

    let createUsers = await createUser(phoneNumber, email, password)
      .then((user) => {
        if (role) {
          findRole(role).then((roles: any) => {
            user?.setRoles(roles).then(() => {
              return response.successResponse(
                res,
                "User Sign In Successfully",
                createUsers
              );
            });
          });
        } else {
          user?.setRoles([1]).then(() => {
            return response.successResponse(
              res,
              "User Sign In Successfully",
              createUsers
            );
          });
        }
      })
      .catch((err) => {
        return response.errorResponse(res, 500, err.message, err);
      });
  } catch (error: any) {
    console.log(error);
    return response.errorResponse(res, 500, error.message, error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, phoneNumber, password } = req.body;
    const body = phoneNumber;
    const salt = <any>md5(<any>10);
    const encryptedPassword = md5(password, salt);
    const authorities = [];

    const data = body
      ? await loginWithPhone(phoneNumber, encryptedPassword)
      : await loginWithEmail(email, encryptedPassword);

    const roles = await data?.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    if (!data) {
      (err: any) => {
        return response.errorResponse(res, 401, "Credential Error", err);
      };
    }

    const authToken = token(data?.id, data?.email, data?.phoneNumber);

    return response.successResponse(res, "Login Successfully", {
      data,
      role: authorities,
      token: (await authToken).toString(),
    });
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};
