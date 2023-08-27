const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/news");

router.get("/all-news", ctrl.getAllNews);

module.exports = router;
