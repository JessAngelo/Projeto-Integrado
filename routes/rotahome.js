const express = require("express");
const HomeController = require("../controller/homecontroller");

const router = express.Router();

let ctrl = new HomeController();
router.get("/", ctrl.home);

module.exports = router;
