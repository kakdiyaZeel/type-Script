import { User, Role, ROLES } from "../models";
import { NextFunction } from "express";
import { response } from "../common";

const isAdmin = async (req: any, res: any, next: NextFunction) => {
  try {
    const { id } = req.token;
    const checkUser = await User.findByPk(id);
    const roles = await checkUser?.getRoles();

    for (let index = 0; index < roles.length; index++) {
      const checkAdmin = roles[index].name === "admin";

      if (checkAdmin) {
        return next();
      }
    }

    return response.errorResponse(res, 403, "Require Admin Role!");
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

const isModerator = async (req: any, res: any, next: NextFunction) => {
  try {
    const { id } = req.token;
    const checkUser = await User.findByPk(id);
    const roles = await checkUser?.getRoles();

    for (let index = 0; index < roles.length; index++) {
      const checkModerator = roles[index].name === "moderator";

      if (checkModerator) {
        return next();
      }
    }

    return response.errorResponse(res, 403, "Require Moderator Role!");
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

const isUser = async (req: any, res: any, next: NextFunction) => {
  try {
    const { id } = req.token;
    const checkUser = await User.findByPk(id);
    const roles = await checkUser?.getRoles();

    for (let index = 0; index < roles.length; index++) {
      const checkUser = roles[index].name === "user";

      if (checkUser) {
        return next();
      }
    }

    return response.errorResponse(res, 403, "Require User Role!");
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

const isModeratorOrAdmin = async (req: any, res: any, next: NextFunction) => {
  try {
    const { id } = req.token;
    const checkUser = await User.findByPk(id);
    const roles = await checkUser?.getRoles();

    for (let index = 0; index < roles.length; index++) {
      const checkModerator = roles[index].name === "moderator";
      const checkAdmin = roles[index].name === "admin";

      if (checkAdmin) {
        return next();
      }
      if (checkModerator) {
        return next();
      }
    }

    return response.errorResponse(
      res,
      403,
      "Require Moderator And Admin Role!"
    );
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
};

export { isAdmin, isModerator, isUser, isModeratorOrAdmin };
