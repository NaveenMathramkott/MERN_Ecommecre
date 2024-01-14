import express from "express";
import { checkAdmin, requireSignIn } from "../middlewares/authMiddleWare.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

// create category || POST Method
router.post(
  "/create-category",
  requireSignIn,
  checkAdmin,
  createCategoryController
);

// update category || PUT Method
router.put(
  "/update-category/:id",
  requireSignIn,
  checkAdmin,
  updateCategoryController
);

// get category || GET Method
router.get("/get-category", getCategoryController);

// get single category || GET Method
router.get("/get-category/:slug", getSingleCategoryController);

// delete category || delete Method
router.delete(
  "/delete-category/:id",
  requireSignIn,
  checkAdmin,
  deleteCategoryController
);

export default router;
