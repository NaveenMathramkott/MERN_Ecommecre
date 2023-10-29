import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";

// router object
const router = express.Router();

// Method POST || Register
router.post("/register", registerController);

// Method POST || Login

router.post("/login", loginController);

// test controller middleware || Method GET

router.get("/test", requireSignIn, checkAdmin, testController);

export default router;
