const express = require("express");

const router = express.Router();

const ctrl = require('../../controlers/pets');

const { validateBody, isValidId, autentificate } = require('../../middlevares');

const { petValidationSchema } = require('../../models/pet');

router.post('/', autentificate, validateBody(petValidationSchema), ctrl.addPet);

router.delete('/:petId', autentificate, isValidId, ctrl.deletePet);

module.exports = router;