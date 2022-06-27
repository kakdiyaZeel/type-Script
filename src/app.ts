import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { app as routerIndex } from "./routes";

import { sequelize } from "./config/conn";
sequelize;
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(routerIndex);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const project = process.env.NAME;
  return res.render("index");
});

export default app;
