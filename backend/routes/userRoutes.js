const authController = require("../controller/authController");
const userController = require("./../controller/userController");
const express = require("express");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.route("/").get(authController.protect, userController.getAllUser);

router.route("/:id").delete(userController.deleteUser);

module.exports = router;
