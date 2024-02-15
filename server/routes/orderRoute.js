import express from "express";
import {
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";

// router object
const router = express.Router();

//  get all the orders
router.get("/orders", requireSignIn, getOrdersController);

//  all orders for the users
router.get("/all-orders", requireSignIn, checkAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  checkAdmin,
  orderStatusController
);

export default router;
