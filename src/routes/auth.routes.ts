import express from "express";
const router = express.Router();

import { signUp, signIn } from "../controllers/auth.controller";

router.post("/signUp", signUp);

router.post("/login", signIn);

export { router };
