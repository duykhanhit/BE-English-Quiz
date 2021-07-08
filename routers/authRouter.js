const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const protect = require("../middlewares/auth");

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", protect.protect, authController.getMe);
router.put(
  "/auth/update-details",
  protect.protect,
  authController.updateDetails
);
router.put(
  "/auth/update-password",
  protect.protect,
  authController.updatePassword
);
router.put("/auth/reset-password/:resetCode", authController.resetPassword);
router.post("/auth/forgot", authController.forgotPassword);
router.post("/auth/verify-code", authController.verifyCode);

module.exports = router;
