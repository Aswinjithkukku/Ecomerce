import express from "express";
const router = express.Router();

import {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js'

router.route("/products").get(getProducts);
router.route("/product/:id/").get(getSingleProduct);

router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);
router.route("/admin/product/:id/").put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

export default router;
