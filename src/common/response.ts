import { Response } from "express";
const successResponse = async (res: Response, message: any, data?: any) => {
  return res.status(200).json({ status: true, message, data });
};

const errorResponse = async (
  res: Response,
  code: any,
  message: any,
  error?: any
) => {
  return res.status(code).json({ status: false, message: message, error });
};

export { successResponse, errorResponse };
