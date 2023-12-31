const express = require("express");

const router = express.Router();

const ctrl = require("../../controlers/pets");

const {
  validateBody,
  isValidId,
  autentificate,
  upload,
} = require("../../middlevares");

const { petValidationSchema } = require("../../models/pet");

router.post(
  "/add",
  upload.single("petAvatar"),
  autentificate,
  validateBody(petValidationSchema),
  ctrl.addPet
);

router.delete("/delete/:petId", autentificate, isValidId, ctrl.deletePet);

module.exports = router;
