import express from "express";
const router = express.Router();

import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} from "../controllers/productController.js";

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js'

router.route("/products").get(getProducts);
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles('admin'),getAdminProducts);
router.route("/product/:id/").get(getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview) 
router.route("/reviews").get(isAuthenticatedUser, getProductReviews) 
router.route("/reviews").delete(isAuthenticatedUser, deleteReview) 

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route("/admin/product/:id/").put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

export default router;
