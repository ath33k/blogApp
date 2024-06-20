const authController = require("../controller/authController");
const userController = require("./../controller/userController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
// router.use(authController.isLoggedIn);
router.get("/auth", authController.checkLogin);
router.use(authController.protect);
router.get("/logout", authController.logout);

router.route("/").get(userController.getAllUser);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
