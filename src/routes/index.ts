import express from "express";

import { router as authRouters } from "./auth.routes";
const app = express();

app.use("/auth", authRouters);

export { app };
