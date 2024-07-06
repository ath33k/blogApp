const authController = require("../controller/authController");
const userController = require("./../controller/userController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/auth", authController.checkLogin);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch("/updateMyPassword", authController.updatePassword);
router.post("/logout", authController.logout);
// router.use(authController.isLoggedIn);
router.use(authController.protect);
router.patch(
  "/updateMe",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router.route("/").get(userController.getAllUser);
router.route("/:id").delete(userController.deleteMe);

module.exports = router;
