const { Pet } = require("../../models/pet");

const { HttpError } = require("../../helpers");

const deletePet = async (req, res) => {
  const { userId } = req.user;
  const { petId } = req.params;
  const result = await Pet.deleteOne({ _id: petId, owner: userId });
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(204).json();
};

module.exports = deletePet;
