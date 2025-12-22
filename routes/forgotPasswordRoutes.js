import express from "express";
import { forgotPassword, validateOTP, changePassword } from "../controllers/forgotPasswordController.js";

const router = express.Router();
// Route to request OTP for password reset
router.post('/forgot-password', forgotPassword);

// Route to validate OTP
router.post('/validate-otp', validateOTP);

// Route to change password after OTP validation
router.post('/change-password', changePassword);

export default router;
