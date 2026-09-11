import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post(
  "/login",
  AuthController.login
);

router.post(
  "/register",
  AuthController.register
);

router.get(
  "/me",
  auth,
  AuthController.me
);

export default router;