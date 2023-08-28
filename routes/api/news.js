const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/news");

router.get("/", ctrl.getAllNews);

module.exports = router;
