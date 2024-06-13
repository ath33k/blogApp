const userController = require("./../controller/userController");
const express = require("express");

const router = express.Router();

router.route("/").get(userController.getAllUser);

router.route("/:id").get((req, res) => {
  res.status(200).json({
    data: "recieved succesfully",
  });
});

module.exports = router;
