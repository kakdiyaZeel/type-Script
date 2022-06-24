import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generateToken = async (id: any, email: any, phoneNumber: any) => {
  const payLoad = <any>{
    id: id,
    email: email,
    phoneNumber: phoneNumber,
  };

  const token = jwt.sign(payLoad, <any>process.env.SECRET_KEY, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  return token;
};

export { generateToken };
