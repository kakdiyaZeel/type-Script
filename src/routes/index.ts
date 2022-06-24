import express from "express";

import { router as authRouters } from "./auth.routes";
import { router as userRouters } from "./user.routes";
const app = express();

app.use("/auth", authRouters);

app.use("/user", userRouters);

export { app };
