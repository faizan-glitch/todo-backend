import { Router } from "express";
import loginController from "../controllers/auth/login";
import signupController from "../controllers/auth/signup";

const router = Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/forgot");

router.post("/reset");

router.post("/refresh");

export default router;