const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/notices");

const { validateBody, autentificate, upload } = require("../../middlevares");

const { noticeValidationSchema } = require("../../models/notice");

router.post(
  "/add-notice",
  upload.single("petAvatar"),
  autentificate,
  validateBody(noticeValidationSchema),
  ctrl.addNotice
);

router.get("/", ctrl.getNoticesByCategory);

router.get("/:noticeId", ctrl.getOneNotice);

router.patch("/add-to-favorites/:noticeId", autentificate, ctrl.addToFavorites);

router.patch(
  "/remove-from-favorites/:noticeId",
  autentificate,
  ctrl.removeFromFavorites
);

module.exports = router;
