import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { response } from "../common";

const verifyToken = async (req: any, res: any, next: NextFunction) => {
  const token =
    req.cookies.TPG || req.query.token || req.headers["authorization"];

  if (!token) {
    (err: any) => {
      return response.errorResponse(res, 401, "Unauthorized User", err);
    };
  }

  try {
    const decodedToken = jwt.verify(token, <any>process.env.SECRET_KEY);
    req.token = decodedToken;
  } catch (error: any) {
    return response.errorResponse(res, 500, error.message, error);
  }
  return next();
};

export { verifyToken };
