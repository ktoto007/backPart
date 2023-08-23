const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/user");

const { autentificate } = require("../../middlevares");

router.get("/", autentificate, ctrl.getUserInfo);

module.exports = router;
