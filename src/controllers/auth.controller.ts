import { User, Role } from "../models";
import { Request, Response } from "express";
import {
  changeUserPassword,
  createUser,
  findRole,
  loginWithEmail,
  loginWithPhone,
} from "../services/auth-service";
import { response } from "../common";
import md5 from "md5";
import { token } from "../auth";
import { sendPasswordResetEmail } from "../utils/send-email.utils";

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
      return response.errorResponse(res, 401, "Credential Error");
    }

    const authToken = token(data?.id, data?.email, data?.phoneNumber);

    return response.successResponse(res, "Login Successfully", {
      role: authorities,
      token: (await authToken).toString(),
    });
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

export const changePassword = async (req: any, res: any) => {
  try {
    let { password, confirmPassword } = req.body;
    const { id } = req.token;

    const salt = <any>md5(<any>10);
    password = md5(password, salt);
    confirmPassword = md5(confirmPassword, salt);

    if (confirmPassword !== password) {
      return response.errorResponse(res, 401, "Password Not Matched", "err");
    }

    const changePassword = await changeUserPassword(password, id);

    if (!changePassword) {
      return response.errorResponse(
        res,
        401,
        "Please Try-Again Password Not Changed"
      );
    }

    return response.successResponse(
      res,
      "Password Changed Successful, You Can Now Login With The New Password"
    );
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = req.headers["authorization"];
    const origin = req.header("Origin")?.toString();
    console.log("origin", origin);
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return response.successResponse(res, "Response Ok", "List User");
    }
    await sendPasswordResetEmail(email, resetToken, origin);

    return response.successResponse(
      res,
      "Please check your email for a new password"
    );
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { passWord } = req.body;

  const name = "Reset - Password Template";

  return res.render("reset", {
    Password: passWord,
  });
};
