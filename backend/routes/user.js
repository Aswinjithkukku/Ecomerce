import express from "express";
const router = express.Router();

import {
  allUsers,
  deleteUser,
  forgotPassword,
  getUserDetails,
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
} from "../controllers/userController.js";

import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js'

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile)
router.route("/password/update").put(isAuthenticatedUser, updatePassword)
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route("/logout").get(logoutUser);

//ADMIN ROUTES
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles('admin'), allUsers)
router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizeRoles('admin'), getUserDetails)
.put(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)


export default router;
