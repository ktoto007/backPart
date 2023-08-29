const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/notices");

const { validateBody, autentificate, upload } = require("../../middlevares");

const { noticeValidationSchema } = require("../../models/notice");

router.get("/marked", autentificate, ctrl.getFavorites);

router.post(
  "/add",
  upload.single("petAvatar"),
  autentificate,
  validateBody(noticeValidationSchema),
  ctrl.addNotice
);

router.get("/search", ctrl.getNoticesByCategory);

router.get("/added", autentificate, ctrl.getUsersNotices);

router.get("/:noticeId", ctrl.getOneNotice);

router.delete("/delete/:noticeId", autentificate, ctrl.deleteUsersNotice);

router.patch("/mark/:noticeId", autentificate, ctrl.addToFavorites);

router.patch("/unmark/:noticeId", autentificate, ctrl.removeFromFavorites);

module.exports = router;
