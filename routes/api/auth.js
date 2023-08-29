const express = require("express");

const router = express.Router();

const { validateBody, autentificate, upload } = require("../../middlevares");
const { schemas } = require("../../models/user");
const ctrl = require("../../controlers/auth");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.put(
  "/update",
  upload.single("avatar"),
  autentificate,
  validateBody(schemas.userInfoSchema),
  ctrl.updateUser
);

router.get("/current", autentificate, ctrl.current);

router.post("/logout", autentificate, ctrl.logout);

module.exports = router;
