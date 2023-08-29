const { Pet } = require("../../models/pet");

const { HttpError } = require("../../helpers");

const deletePet = async (req, res) => {
  const { petId } = req.params;
  const result = await Pet.findByIdAndRemove(petId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(204).json();
};

module.exports = deletePet;
