import { User, Role } from "../models";
import { Request, Response } from "express";
import { response } from "../common";
import { findUser, getUsers } from "../services/user-services";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();

    if (!users.length) {
      return response.errorResponse(res, 403, "User Not-Found");
    }
    res.cookie(
      "USERS",
      { user: users },
      {
        httpOnly: true,
        maxAge: 900000,
      }
    );

    return response.successResponse(res, "List Of Users", users);
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

export const findUserById = async (req: any, res: any) => {
  try {
    const { id } = req.token;

    const user = await findUser(id);

    if (!user) {
      return response.errorResponse(res, 403, "Invalid Id");
    }

    return response.successResponse(res, "Verified User", user);
  } catch (error: any) {
    return response.errorResponse(res, error.message, error);
  }
};
