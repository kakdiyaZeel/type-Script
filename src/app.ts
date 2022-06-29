import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app as routerIndex } from "./routes";

import { sequelize } from "./config/conn";
sequelize;
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cookieParser("TPG"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routerIndex);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req: any, res: any) => {
  const project = process.env.NAME;
  return res.status(200).json({ data: project });
});

export default app;
